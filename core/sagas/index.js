import { call } from 'redux-saga/effects';

import covers from './covers';
import search from './search';


export const makeSagas = () => function* (...args) {
    return yield [
        call(covers, ...args),
        call(search, ...args),
    ];
};
