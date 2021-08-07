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
subCtx.lineWidth = 1;

const draw = (time: number) => {
    subCtx.fillStyle = 'rgb(240, 240, 240)';
    subCtx.fillRect(0, 0, 640, 360);

    const theta = time / 700;
    const xA = 150;
    const yA = 180;
    const xB = 250;
    const yB = 180;

    const xC = (xB - xA) * Math.cos(theta) - (yB - yA) * Math.sin(theta) + xA;
    const yC = (yB - yA) * Math.cos(theta) + (xB - xA) * Math.sin(theta) + yA;

    subCtx.fillStyle = 'rgb(0, 0, 0)';
    subCtx.beginPath();
    subCtx.arc(xA, yA, 100, 0, 2 * Math.PI);
    subCtx.stroke();

    subCtx.beginPath();
    subCtx.arc(xC, yC, 5, 0, 2 * Math.PI);
    subCtx.fill();

    ctx.putImageData(subCtx.getImageData(0, 0, 640, 360), 0, 0);

    requestAnimationFrame(draw);
};

draw(0);
