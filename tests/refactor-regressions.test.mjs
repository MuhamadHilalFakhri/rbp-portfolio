import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadModule(file, overrides = {}) {
  const filename = path.resolve(root, file);
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
  });
  const loaded = { exports: {} };
  const localRequire = (id) => {
    if (Object.hasOwn(overrides, id)) return overrides[id];
    if (id.startsWith(".") || id.startsWith("@/")) {
      const target = id.startsWith("@/")
        ? path.resolve(root, id.slice(2))
        : path.resolve(path.dirname(filename), id);
      const extension = fs.existsSync(`${target}.ts`) ? ".ts" : ".tsx";
      return loadModule(target + extension, overrides);
    }
    return require(id);
  };
  new Function("require", "module", "exports", outputText)(
    localRequire,
    loaded,
    loaded.exports
  );
  return loaded.exports;
}

test("smooth scroll cancels its latest frame and ignores callbacks after cleanup", () => {
  const effects = [];
  const frames = new Map();
  const cancelled = [];
  let nextId = 0;
  let ticks = 0;
  let destroyed = false;
  class MockLenis {
    raf() {
      ticks++;
    }
    destroy() {
      destroyed = true;
    }
  }
  const overrides = {
    react: { useEffect: (effect) => effects.push(effect) },
    lenis: { __esModule: true, default: MockLenis },
    "@/lib/config": { features: { smoothScroll: true } },
    "@/lib/smooth-scroll": { registerLenis: () => {} },
  };
  const { SmoothScroll } = loadModule(
    "components/layout/smooth-scroll.tsx",
    overrides
  );
  const saved = new Map(
    ["window", "document", "requestAnimationFrame", "cancelAnimationFrame"].map(
      (name) => [name, Object.getOwnPropertyDescriptor(globalThis, name)]
    )
  );
  try {
    globalThis.window = { matchMedia: () => ({ matches: false }) };
    globalThis.document = {
      addEventListener: () => {},
      removeEventListener: () => {},
    };
    globalThis.requestAnimationFrame = (callback) => {
      frames.set(++nextId, callback);
      return nextId;
    };
    globalThis.cancelAnimationFrame = (id) => {
      cancelled.push(id);
      frames.delete(id);
    };
    SmoothScroll({ children: null });
    const cleanup = effects[0]();
    const firstFrame = frames.get(1);
    frames.delete(1);
    firstFrame(16);
    const pendingFrame = frames.get(2);
    cleanup();
    assert.deepEqual(cancelled, [2]);
    assert.equal(frames.size, 0);
    assert.equal(destroyed, true);
    pendingFrame(32);
    assert.equal(ticks, 1);
    assert.equal(frames.size, 0);
  } finally {
    for (const [name, descriptor] of saved) {
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else delete globalThis[name];
    }
  }
});

test("extracted contribution calendar preserves leap days and UTC week alignment", () => {
  const { buildCalendar } = loadModule(
    "components/github/contribution-calendar.ts"
  );
  const days = Array.from({ length: 366 }, (_, index) => ({
    date: new Date(Date.UTC(2024, 0, index + 1)).toISOString().slice(0, 10),
    count: 0,
    level: 0,
  }));
  const calendar = buildCalendar({ year: 2024, days });
  const actualDays = calendar.weeks.flat().filter(Boolean);
  assert.equal(actualDays.length, 366);
  assert.equal(calendar.weeks[0][0], null);
  assert.equal(calendar.weeks[0][1].date, "2024-01-01");
  assert.ok(actualDays.some((day) => day.date === "2024-02-29"));
  assert.equal(calendar.monthMarkers.length, 12);
  assert.equal(calendar.monthMarkers[1].label, "Feb");
});
