import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Compile the TypeScript modules in memory using the project's existing compiler.
function loadModule(file, overrides = {}) {
  const filename = path.resolve(__dirname, "..", file);
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
  });
  const loadedModule = { exports: {} };
  const localRequire = (id) => {
    if (Object.hasOwn(overrides, id)) return overrides[id];
    if (id.startsWith(".") || id.startsWith("@/")) {
      const target = id.startsWith("@/")
        ? path.resolve(__dirname, "..", id.slice(2))
        : path.resolve(path.dirname(filename), id);
      return loadModule(target + ".ts", overrides);
    }
    return require(id);
  };
  new Function("require", "module", "exports", outputText)(
    localRequire,
    loadedModule,
    loadedModule.exports
  );
  return loadedModule.exports;
}

const { parseGitHubActivity } = loadModule("lib/github-activity.ts");
const { isGitHubActivityData } = loadModule("lib/github-activity-data.ts");
const { GitHubActivityClient } = loadModule(
  "components/github/github-activity-client.tsx"
);
const fetchedAt = "2025-01-01T00:00:00.000Z";

function fixture(count = 0) {
  const cells = [];
  const tooltips = [];
  for (let i = 0; i < 366; i++) {
    const date = new Date(Date.UTC(2024, 0, 1 + i)).toISOString().slice(0, 10);
    cells.push(
      `<td data-level='${count ? 1 : 0}' id='day-${i}' data-date='${date}'> <span></span> </td>`
    );
    tooltips.push(
      `<tool-tip for='day-${i}'>${count ? `<strong>${count}</strong> contributions` : "No contributions"} on this day.</tool-tip>`
    );
  }
  return cells.join("\n") + tooltips.reverse().join("\n");
}

test("matches relocated tooltips by ID; handles nested labels, single quotes and leap years", () => {
  const data = parseGitHubActivity(fixture(2), 2024, fetchedAt);
  assert.equal(data.days.length, 366);
  assert.equal(data.total, 732);
  assert.equal(data.days[59].date, "2024-02-29");
  assert.equal(isGitHubActivityData(data, 2024), true);
});

test("accepts a genuinely empty contribution year", () => {
  const data = parseGitHubActivity(fixture(), 2024, fetchedAt);
  assert.equal(data.total, 0);
  assert.equal(data.days.length, 366);
});

test("fails closed for changed counts, missing dates, duplicates and invalid levels", () => {
  const html = fixture();
  for (const broken of [
    "<html>Temporarily unavailable</html>",
    html.replace("No contributions", "Unknown count"),
    html.replace(/<td[^>]*>[\s\S]*?<\/td>/, ""),
    html.replace("2024-01-02", "2024-01-01"),
    html.replace("data-level='0'", "data-level='7'"),
  ])
    assert.throws(() => parseGitHubActivity(broken, 2024, fetchedAt));
});

test("client rejects malformed payloads and mismatched years or totals", () => {
  const data = parseGitHubActivity(fixture(), 2024, fetchedAt);
  for (const invalid of [
    null,
    {},
    { ...data, days: [] },
    { ...data, year: 2023 },
    { ...data, total: 1 },
  ]) {
    assert.equal(isGitHubActivityData(invalid, 2024), false);
  }
});

test("unavailable UI has retry and no fabricated zero total or calendar", () => {
  const html = renderToStaticMarkup(
    React.createElement(GitHubActivityClient, {
      initialData: null,
      initialYear: 2024,
    })
  );
  assert.match(html, /Could not load activity/);
  assert.match(html, /Try again/);
  assert.doesNotMatch(html, /0 contributions in/);
  assert.doesNotMatch(html, /<figure/);
});

test("valid zero contributions still renders the actual calendar", () => {
  const data = parseGitHubActivity(fixture(), 2024, fetchedAt);
  const html = renderToStaticMarkup(
    React.createElement(GitHubActivityClient, {
      initialData: data,
      initialYear: 2024,
    })
  );
  assert.match(html, /0 contributions in 2024/);
  assert.match(html, /<figure/);
  assert.match(html, /role="img"/);
  assert.match(html, /GitHub contribution heatmap with 0 total contributions/);
  assert.doesNotMatch(html, /View daily contributions|<details|<table/);
  assert.doesNotMatch(html, /role="grid(cell)?"/);
  assert.doesNotMatch(html, /Try again/);
});

test("API rejects malformed year and avoids caching upstream failures", async () => {
  const { NextRequest } = require("next/server");
  const { GET } = loadModule("app/api/github-activity/route.ts", {
    "@/lib/github-activity": {
      getGitHubActivity: async () => {
        throw new Error("upstream unavailable");
      },
    },
  });
  const year = new Date().getUTCFullYear();
  for (const input of [`${year}junk`, "", String(year + 1), String(year - 4)]) {
    const response = await GET(
      new NextRequest(`http://localhost/api/github-activity?year=${input}`)
    );
    assert.equal(response.status, 400);
  }
  const response = await GET(
    new NextRequest(`http://localhost/api/github-activity?year=${year}`)
  );
  assert.equal(response.status, 502);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.doesNotMatch(JSON.stringify(await response.json()), /total|days/);
});
