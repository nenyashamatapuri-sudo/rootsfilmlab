import * as THREE from "three";

const INK = "#120f0a";
const PAPER = "#ece0c4";
const RED = "#c92e13";
const GOLD = "#c0922f";
const CYAN = "#1aa3ad";

const DISPLAY = "900 1em Arial Black, Arial, sans-serif";
const MONO = "600 1em 'Courier New', monospace";

function canvas2d(w: number, h: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  return { canvas, ctx };
}

function grain(ctx: CanvasRenderingContext2D, w: number, h: number, amount = 10) {
  const data = ctx.getImageData(0, 0, w, h);
  for (let i = 0; i < data.data.length; i += 4) {
    const n = (Math.random() - 0.5) * amount;
    data.data[i] += n;
    data.data[i + 1] += n;
    data.data[i + 2] += n;
  }
  ctx.putImageData(data, 0, 0);
}

function diagonalStripe(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  x0: number,
  skew: number
) {
  const grad = ctx.createLinearGradient(x0, 0, w, h);
  grad.addColorStop(0, RED);
  grad.addColorStop(0.55, GOLD);
  grad.addColorStop(1, CYAN);
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x0, 0);
  ctx.lineTo(w, 0);
  ctx.lineTo(w, h);
  ctx.lineTo(x0 - skew, h);
  ctx.closePath();
  ctx.clip();
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}

function dashedFrame(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.strokeStyle = "rgba(236,224,196,0.4)";
  ctx.setLineDash([7, 7]);
  ctx.lineWidth = 2;
  ctx.strokeRect(14, 14, w - 28, h - 28);
  ctx.setLineDash([]);
}

function makeTexture(canvas: HTMLCanvasElement) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function front() {
  const w = 640,
    h = 400;
  const { canvas, ctx } = canvas2d(w, h);
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, w, h);
  diagonalStripe(ctx, w, h, w * 0.6, 70);
  grain(ctx, w, h, 8);

  ctx.fillStyle = PAPER;
  ctx.textBaseline = "top";
  ctx.font = `76px ${DISPLAY}`;
  ctx.fillText("GRIOT", 34, 34);

  ctx.font = `20px ${MONO}`;
  ctx.fillStyle = "rgba(236,224,196,0.75)";
  ctx.fillText("ISO 100/21°", 38, 128);

  ctx.font = `26px ${MONO}`;
  ctx.fillStyle = GOLD;
  ctx.fillText("CHROMATIC FILM", 38, 164);

  ctx.font = "italic 400 22px Georgia, serif";
  ctx.fillStyle = PAPER;
  ctx.globalAlpha = 0.9;
  ctx.fillText("every roll, a story", 38, 206);
  ctx.globalAlpha = 1;

  ctx.font = `15px ${MONO}`;
  ctx.fillStyle = "rgba(236,224,196,0.65)";
  ctx.fillText("FILM LAB — AMSTERDAM", 38, h - 46);

  dashedFrame(ctx, w, h);
  return makeTexture(canvas);
}

function side(label: string) {
  const w = 360,
    h = 400;
  const { canvas, ctx } = canvas2d(w, h);
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, w, h);
  diagonalStripe(ctx, w, h, w * 0.35, 40);
  grain(ctx, w, h, 8);

  ctx.fillStyle = PAPER;
  ctx.textBaseline = "top";
  ctx.font = `30px ${DISPLAY}`;
  ctx.fillText("GRIOT", 24, 24);

  ctx.font = `17px ${MONO}`;
  ctx.fillStyle = "rgba(236,224,196,0.7)";
  ctx.fillText("CHROMATICFILM", 24, 64);

  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.font = `64px ${DISPLAY}`;
  ctx.translate(w / 2, h / 2);
  ctx.textAlign = "center";
  ctx.fillText("STORY", 0, -30);
  ctx.restore();

  ctx.font = `15px ${MONO}`;
  ctx.fillStyle = "rgba(236,224,196,0.75)";
  ctx.fillText("GA 135-25", 24, h - 86);

  ctx.font = `34px ${DISPLAY}`;
  ctx.fillStyle = PAPER;
  ctx.fillText(label, 24, h - 58);

  dashedFrame(ctx, w, h);
  return makeTexture(canvas);
}

function back() {
  const w = 640,
    h = 400;
  const { canvas, ctx } = canvas2d(w, h);
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, w, h);
  grain(ctx, w, h, 8);

  ctx.fillStyle = PAPER;
  ctx.textBaseline = "top";
  ctx.font = `22px ${MONO}`;
  ctx.fillText("ISO 100/21°", 38, 34);

  ctx.font = `20px ${MONO}`;
  ctx.fillStyle = GOLD;
  ctx.fillText("CHROMATIC FILM", 38, 66);

  ctx.font = "italic 400 18px Georgia, serif";
  ctx.fillStyle = "rgba(236,224,196,0.8)";
  const lines = [
    "A griot keeps the stories so they're",
    "never lost. We do the same for your",
    "film — developed, scanned and kept.",
  ];
  lines.forEach((l, i) => ctx.fillText(l, 38, 108 + i * 26));

  // barcode
  let x = 38;
  const by = h - 120;
  ctx.fillStyle = PAPER;
  for (let i = 0; i < 46; i++) {
    const bw = 1 + ((i * 7) % 3);
    if (i % 2 === 0) ctx.fillRect(x, by, bw, 60);
    x += bw + 3;
  }
  ctx.font = `16px ${MONO}`;
  ctx.fillText("9 783161 484100", 38, by + 70);

  ctx.font = `14px ${MONO}`;
  ctx.fillStyle = "rgba(236,224,196,0.6)";
  ctx.fillText("MADE WITH CARE IN AMSTERDAM", 38, h - 34);

  dashedFrame(ctx, w, h);
  return makeTexture(canvas);
}

function top() {
  const w = 640,
    h = 360;
  const { canvas, ctx } = canvas2d(w, h);
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, w, h);
  grain(ctx, w, h, 8);

  // arch
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(w * 0.3, h);
  ctx.lineTo(w * 0.3, h * 0.42);
  ctx.quadraticCurveTo(w * 0.5, h * 0.1, w * 0.7, h * 0.42);
  ctx.lineTo(w * 0.7, h);
  ctx.closePath();
  ctx.clip();
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, RED);
  grad.addColorStop(0.5, GOLD);
  grad.addColorStop(1, CYAN);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();

  ctx.textAlign = "center";
  ctx.fillStyle = PAPER;
  ctx.font = `64px ${DISPLAY}`;
  ctx.textBaseline = "middle";
  ctx.fillText("GRIOT", w / 2, h * 0.68);

  ctx.font = `16px ${MONO}`;
  ctx.fillStyle = "rgba(236,224,196,0.75)";
  ctx.fillText("STORYTELLERS SINCE 2026", w / 2, h * 0.84);

  dashedFrame(ctx, w, h);
  return makeTexture(canvas);
}

function plain(color: string) {
  const { canvas, ctx } = canvas2d(32, 32);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 32, 32);
  return makeTexture(canvas);
}

export function createFilmBoxTextures() {
  return {
    front: front(),
    back: back(),
    left: side("24"),
    right: side("EXP"),
    top: top(),
    bottom: plain(INK),
  };
}
