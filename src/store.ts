import produce from 'immer';
import { Reducer } from 'redux';

export type State = {
    recording: 'loading' | 'unsupported' | 'inactive' | 'active';
};

export type Action =
    | { type: 'disableRecordingFeature' }
    | { type: 'enableRecordingFeature' }
    | { type: 'startRecording' }
    | { type: 'startRecording/success' }
    | { type: 'startRecording/failure' }
    | { type: 'stopRecording' };

const initialState: State = {
    recording: 'loading',
};

export const reducer: Reducer<State, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case 'disableRecordingFeature':
            return produce(state, (draft) => {
                draft.recording = 'unsupported';
            });
        case 'enableRecordingFeature':
            return produce(state, (draft) => {
                draft.recording = 'inactive';
            });
        case 'startRecording':
            return produce(state, (draft) => {
                draft.recording = 'active';
            });
        case 'stopRecording':
            return produce(state, (draft) => {
                draft.recording = 'inactive';
            });
        default:
            return state;
    }
};
