import { call } from 'redux-saga/effects';

import search from './search';


export const makeSagas = () => function* (...args) {
    return yield [
        call(search, ...args),
    ];
};
