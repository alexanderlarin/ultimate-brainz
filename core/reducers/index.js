import { combineReducers } from 'redux-immutable';

import album from './album';
import albums from './albums';
import search from './search';


export const makeReducers = () => combineReducers({
    album,
    albums,
    search,
});

export const persistPaths = [
    'albums'
];
