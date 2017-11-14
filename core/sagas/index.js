import { call } from 'redux-saga/effects';

import albums from './albums';
import covers from './covers';
import search from './search';


export const makeSagas = () => function* (...args) {
    return yield [
        call(albums, ...args),
        call(covers, ...args),
        call(search, ...args),
    ];
};
