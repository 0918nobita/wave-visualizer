import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { Monitor } from './Monitor';
import { Action, State } from './store';

export const App: React.VFC = () => {
    const recordingState = useSelector((state: State) => state.recording);
    const dispatch = useDispatch<Dispatch<Action>>();

    const onStart = useCallback(() => {
        dispatch({ type: 'startRecording' });
    }, [dispatch]);

    const onStop = useCallback(() => {
        dispatch({ type: 'stopRecording' });
    }, [dispatch]);

    return (
        <>
            <Monitor />
            <div>
                {recordingState === 'loading' && 'Loading'}
                {recordingState === 'unsupported' && 'Unsupported'}
                {recordingState === 'inactive' && (
                    <button onClick={onStart}>Start recording</button>
                )}
                {recordingState === 'active' && (
                    <button onClick={onStop}>Stop recording</button>
                )}
            </div>
        </>
    );
};
