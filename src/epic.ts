import { Epic, ofType } from 'redux-observable';
import { delay, mapTo } from 'rxjs/operators';

import { Action } from './store';

export const pingEpic: Epic<Action> = (action$) =>
    action$.pipe(ofType('ping'), delay(1000), mapTo({ type: 'pong' }));
