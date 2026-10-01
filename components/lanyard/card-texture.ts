import * as THREE from "three";
import { CARD_TEXTURE_VERTICAL_OFFSET } from "./constants";

export function createCardTexture(
  sourceCardTexture: THREE.Texture
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 1152;
  const context = canvas.getContext("2d")!;
  context.fillStyle = "#141618";
  context.fillRect(0, 0, 768, 1152);

  // Use a clean monochrome gradient behind the portrait instead of letting
  // compression/noise from the original navy backdrop show through.
  const portraitBackground = context.createLinearGradient(0, 110, 0, 976);
  portraitBackground.addColorStop(0, "#595959");
  portraitBackground.addColorStop(0.38, "#858585");
  portraitBackground.addColorStop(0.72, "#252525");
  portraitBackground.addColorStop(1, "#080808");
  context.fillStyle = portraitBackground;
  context.fillRect(20, 110, 728, 866);

  // Remove the navy backdrop while preserving the portrait's original colors.
  // Keeping an alpha silhouette lets the outline follow hair and shoulders.
  const portrait = document.createElement("canvas");
  portrait.width = 688;
  portrait.height = 1032;
  const photo = portrait.getContext("2d")!;
  photo.drawImage(sourceCardTexture.image, 0, 0, 688, 1032);
  const pixels = photo.getImageData(0, 0, 688, 1032);
  for (let i = 0; i < pixels.data.length; i += 4) {
    const r = pixels.data[i]!;
    const g = pixels.data[i + 1]!;
    const b = pixels.data[i + 2]!;
    const navy = THREE.MathUtils.smoothstep(b - Math.max(r, g), 8, 20);
    pixels.data[i + 3] = Math.round(pixels.data[i + 3]! * (1 - navy));
  }
  photo.putImageData(pixels, 0, 0);

  context.font = "22px monospace";
  context.fillStyle = "rgba(255,255,255,0.065)";
  for (let y = 154; y < 950; y += 100) {
    context.fillText("{}", 28, y);
    context.fillText(";", 718, y + 42);
  }
  context.font = "600 64px monospace";
  context.fillStyle = "rgba(255,255,255,0.42)";
  for (const [x, y, rotation, icon] of [
    [66, 180, -0.18, "{}"],
    [578, 280, 0.16, "</>"],
  ] as const) {
    context.save();
    context.translate(x, y);
    context.rotate(rotation);
    context.fillText(icon, 0, 0);
    context.restore();
  }

  const silhouette = document.createElement("canvas");
  silhouette.width = portrait.width;
  silhouette.height = portrait.height;
  const outline = silhouette.getContext("2d")!;
  outline.drawImage(portrait, 0, 0);
  outline.globalCompositeOperation = "source-in";
  outline.fillStyle = "#e4e5e5";
  outline.fillRect(0, 0, silhouette.width, silhouette.height);
  context.save();
  context.beginPath();
  context.rect(20, 110, 728, 866);
  context.clip();
  for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 6) {
    context.drawImage(
      silhouette,
      40 + Math.cos(angle) * 11,
      20 + Math.sin(angle) * 11
    );
  }
  context.drawImage(portrait, 40, 20);
  context.restore();

  context.fillStyle = "#141618";
  context.fillRect(20, 976, 728, 156);
  context.fillStyle = "rgba(255,255,255,0.15)";
  context.fillRect(46, 976, 676, 1);
  context.font = "500 30px Arial, sans-serif";
  context.fillStyle = "#f5f5f5";
  context.fillText("Muhamad Hilal Fakhri", 46, 1036);
  context.font = "23px Arial, sans-serif";
  context.fillStyle = "#a7abad";
  context.fillText("Web Developer", 46, 1077);
  context.beginPath();
  context.arc(706, 1070, 7, 0, Math.PI * 2);
  context.fillStyle = "#76b88b";
  context.fill();

  context.beginPath();
  context.roundRect(638, 46, 84, 40, 20);
  context.fillStyle = "#222527";
  context.fill();
  context.strokeStyle = "rgba(255,255,255,0.22)";
  context.lineWidth = 1.5;
  context.stroke();
  context.fillStyle = "#d6d8d9";
  for (const x of [666, 680, 694]) {
    context.beginPath();
    context.arc(x, 66, 2, 0, Math.PI * 2);
    context.fill();
  }
  context.beginPath();
  context.roundRect(12, 12, 744, 1128, 34);
  context.strokeStyle = "rgba(255,255,255,0.42)";
  context.lineWidth = 3.5;
  context.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  // The GLB atlas gives each card face half the texture width and three
  // quarters of its height. Expand that UV region so the portrait fills
  // both faces without being stretched or cut in half.
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(2, 4 / 3);
  texture.offset.set(0, CARD_TEXTURE_VERTICAL_OFFSET);
  texture.anisotropy = 8;
  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
