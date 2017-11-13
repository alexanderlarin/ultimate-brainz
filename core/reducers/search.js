import { Map, List, fromJS } from 'immutable';

import { GET_ALBUM_COVER_SUCCESS } from "../actions/covers";
import { SEARCH_ALBUMS_REQUEST, SEARCH_ALBUMS_SUCCESS, SEARCH_ALBUMS_FAILURE } from '../actions/search';


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

        case GET_ALBUM_COVER_SUCCESS: {
            const { id, cover } = action.payload;
            return state.update('items', new List(), (items) => {
                const idx = items.findIndex((item) => item.get('id') === id);
                return idx === -1 ? items : items.update(idx, new Map(), (item) => item.setIn(['cover', 'image'], cover));
            });
        }

        default:
            return state;
    }
}