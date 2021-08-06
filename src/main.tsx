import 'ress';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware, Epic, ofType } from 'redux-observable';
import { delay, mapTo } from 'rxjs/operators';

import { App } from './App';
import { Action, reducer } from './store';

const composeEnhancers =
    (
        window as {
            __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
        }
    ).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware();
const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
);

export const pingEpic: Epic<Action> = (action$) =>
    action$.pipe(
        ofType('startRecording'),
        delay(1000),
        mapTo({ type: 'stopRecording' })
    );

epicMiddleware.run(pingEpic);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
