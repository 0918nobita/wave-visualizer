import { Reducer } from 'redux';

export type State = {
    isPinging: boolean;
};

export type Action = { type: 'ping' } | { type: 'pong' };

const initialState: State = {
    isPinging: false,
};

export const reducer: Reducer<State, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case 'ping':
            return { isPinging: true };
        case 'pong':
            return { isPinging: false };
        default:
            return state;
    }
};
