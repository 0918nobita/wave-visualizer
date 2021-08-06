import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { Action } from './store';

const sin = (x: number, t: number) => Math.sin(x * 0.01 + t) * 150 + 250;

interface CanvasElement extends HTMLCanvasElement {
    captureStream?(frameRate: number): MediaStream;
}

export const App: React.VFC = () => {
    const ref = useRef<CanvasElement>(null);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
        null
    );
    const [recording, setRecording] = useState(false);
    const dispatch = useDispatch<Dispatch<Action>>();

    useEffect(() => {
        if (ref.current === null) return;

        const ctx = ref.current.getContext('2d');
        if (ctx === null) return;

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

        if (!ref.current.captureStream) return;
        const mediaRecorder = new MediaRecorder(ref.current.captureStream(60), {
            mimeType: 'video/webm',
        });
        const blobParts: BlobPart[] = [];
        let blobType = '';
        mediaRecorder.addEventListener('dataavailable', (e) => {
            blobParts.push(e.data);
            blobType = e.type;
        });
        mediaRecorder.addEventListener('stop', () => {
            const blob = new Blob(blobParts, { type: blobType });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.download = 'movie.webm';
            a.href = url;
            a.click();
        });
        mediaRecorder.addEventListener('error', () => {
            setRecording(false);
        });
        setMediaRecorder(mediaRecorder);
    }, [ref, setMediaRecorder, setRecording]);

    const onStart = useCallback(() => {
        mediaRecorder?.start();
        setRecording(true);
    }, [mediaRecorder, setRecording]);

    const onStop = useCallback(() => {
        mediaRecorder?.stop();
        setRecording(false);
    }, [mediaRecorder, setRecording]);

    const ping = useCallback(() => {
        dispatch({ type: 'ping' });
    }, [dispatch]);

    return (
        <>
            <div>
                <button onClick={ping}>PING</button>
            </div>
            <p>Wave Visualizer</p>
            <canvas ref={ref} width="500" height="500" />
            <div>
                <button
                    onClick={recording ? onStop : onStart}
                    style={{
                        backgroundColor: recording ? 'red' : 'gray',
                        color: 'white',
                        padding: '0.25rem',
                    }}
                >
                    {recording ? 'Stop recording' : 'Start recording'}
                </button>
            </div>
        </>
    );
};
