import { all, fork } from 'redux-saga/effects';

import albums from './albums';
import search from './search';


export const makeSagas = () => function* (...args) {
    return yield all([
        fork(albums, ...args),
        fork(search, ...args),
    ]);
};
