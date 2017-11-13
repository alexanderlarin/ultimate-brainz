import { Map, fromJS } from 'immutable';

import {
    SEARCH_ALBUMS_REQUEST, SEARCH_ALBUMS_SUCCESS, SEARCH_ALBUMS_FAILURE
} from '../actions/search';


export default function(state = new Map(), action) {
    switch (action.type) {
        case SEARCH_ALBUMS_REQUEST:
            return state.set('loading', true).remove('error');
        case SEARCH_ALBUMS_SUCCESS: {
            const { items } = action.payload;
            return state.remove('loading').remove('error').set('items', fromJS(items));
        }
        case SEARCH_ALBUMS_FAILURE:
            return state.remove('loading').set('error', new Map(action.error));
        default:
            return state;
    }
}