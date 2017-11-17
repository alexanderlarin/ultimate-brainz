import { Map } from 'immutable';

import { GET_ALBUM_REQUEST, GET_ALBUM_SUCCESS, GET_ALBUM_FAILURE } from '../actions/albums';


export default function(state = new Map(), action) {
    const update = (id, updater) => state.updateIn(['items', id], new Map(), (value) => updater(value));

    switch (action.type) {
        case GET_ALBUM_REQUEST: {
            const { id } = action.payload;
            return update(id, (value) => value.set('loading', true).remove('error'));
        }
        case GET_ALBUM_SUCCESS: {
            const { id, item } = action.payload;
            return update(id, (value) => value.remove('loading').remove('error').mergeDeep(item));
        }
        case GET_ALBUM_FAILURE: {
            const { id, ...error } = action.error;
            return update(id, (value) => value.remove('loading').set('error', new Map(error)));
        }

        default:
            return state;
    }
}