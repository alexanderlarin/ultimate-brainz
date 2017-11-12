import { combineReducers } from 'redux-immutable';

import search from './search';


export const makeReducers = () => combineReducers({
    search,
});
