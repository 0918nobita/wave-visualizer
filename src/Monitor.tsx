import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { Action } from './store';

interface CanvasElement extends HTMLCanvasElement {
    captureStream?(frameRate: number): MediaStream;
}

const sin = (x: number, t: number) => Math.sin(x * 0.01 + t) * 150 + 250;

export const Monitor: React.VFC = () => {
    const ref = useRef<CanvasElement>(null);
    const dispatch = useDispatch<Dispatch<Action>>();

    useEffect(() => {
        if (!ref.current) return;
        const ctx = ref.current.getContext('2d');
        if (!ctx) return;

        const draw = (time: number) => {
            const t = time * 0.003;

            ctx.fillStyle = 'rgb(240, 240, 240)';
            ctx.fillRect(0, 0, 500, 500);

            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.beginPath();
            ctx.moveTo(0, sin(0, t));

            for (let x = 1; x <= 500; x++) ctx.lineTo(x, sin(x, t));

            ctx.stroke();
            requestAnimationFrame(draw);
        };

        draw(0);

        // DEBUG
        dispatch({ type: 'enableRecordingFeature' });
    }, [ref, dispatch]);

    return <canvas ref={ref} width="500" height="500" />;
};
