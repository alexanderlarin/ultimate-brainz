import { combineReducers } from 'redux-immutable';

import albums from './albums'
import search from './search';


export const makeReducers = () => combineReducers({
    albums,
    search,
});

export const persistPaths = [
    'albums'
];
