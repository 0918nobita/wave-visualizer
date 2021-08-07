import 'ress';

interface CanvasElement extends HTMLCanvasElement {
    captureStream?(frameRate: number): MediaStream;
}

const canvas = document.getElementById('canvas') as CanvasElement;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const ctx = canvas.getContext('2d')!;

const subCanvas = document.getElementById('sub-canvas') as HTMLCanvasElement;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const subCtx = subCanvas.getContext('2d')!;

const sin = (x: number, t: number) => Math.sin(x * 0.02 + t) * 80 + 180;

subCtx.lineWidth = 1;

const draw = (time: number) => {
    const t = time * 0.005;

    subCtx.fillStyle = 'rgb(240, 240, 240)';
    subCtx.fillRect(0, 0, 640, 360);

    subCtx.fillStyle = 'rgb(0, 0, 0)';
    subCtx.beginPath();
    subCtx.moveTo(0, sin(0, t));

    for (let x = 1; x <= 640; x++) subCtx.lineTo(x, sin(x, t));

    subCtx.stroke();
    ctx.putImageData(subCtx.getImageData(0, 0, 640, 360), 0, 0);
    requestAnimationFrame(draw);
};

draw(0);
