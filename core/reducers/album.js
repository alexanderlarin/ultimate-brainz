import { Map } from 'immutable';

import { GET_ALBUM_REQUEST, GET_ALBUM_SUCCESS, GET_ALBUM_FAILURE } from '../actions/albums';


export default function(state = new Map(), action) {
    switch (action.type) {
        case GET_ALBUM_REQUEST: {
            const { id } = action.payload;
            return state.updateIn(['items', id], new Map(), (value) => value.set('loading', true).remove('error'));
        }
        case GET_ALBUM_SUCCESS: {
            const { id, item } = action.payload;
            return state.updateIn(['items', id], new Map(), (value) => value.remove('loading').remove('error').mergeDeep(item));
        }
        case GET_ALBUM_FAILURE: {
            const { id, ...error } = action.error;
            return state.updateIn(['items', id], new Map(), (value) => value.remove('loading').set('error', new Map(error)));
        }

        default:
            return state;
    }
}