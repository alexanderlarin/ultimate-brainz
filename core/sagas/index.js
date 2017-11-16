import { call } from 'redux-saga/effects';

import albums from './albums';
import search from './search';


export const makeSagas = () => function* (...args) {
    return yield [
        call(albums, ...args),
        call(search, ...args),
    ];
};
