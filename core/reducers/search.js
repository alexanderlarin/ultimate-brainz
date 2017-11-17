import { Map, List, fromJS } from 'immutable';

import {
    UPDATE_SEARCH_REQUEST,
    SEARCH_ALBUMS_REQUEST, SEARCH_ALBUMS_SUCCESS, SEARCH_ALBUMS_FAILURE
} from '../actions/search';


export default function(state = new Map(), action) {
    switch (action.type) {
        case UPDATE_SEARCH_REQUEST: {
            const { query } = action.payload;
            return state.remove('loading').remove('error').remove('more')
                .set('query', query).update('items', new List(), (items) => state.get('query') === query ? items : items.clear());
        }
        case SEARCH_ALBUMS_REQUEST: {
            return state.set('loading', true).remove('error').remove('more');
        }
        case SEARCH_ALBUMS_SUCCESS: {
            const { offset, count, items } = action.payload;
            return state.remove('loading').remove('error')
                .set('more', offset + items.length < count)
                .update('items', new List(), (value) => value.concat(fromJS(items)));
        }
        case SEARCH_ALBUMS_FAILURE:
            return state.remove('loading').remove('more').set('error', new Map(action.error));

        default:
            return state;
    }
}