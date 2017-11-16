import { Map, List, fromJS } from 'immutable';

import {
    GET_ALBUM_REQUEST, GET_ALBUM_SUCCESS, GET_ALBUM_FAILURE,
    ADD_ALBUM_REQUEST, REMOVE_ALBUM_REQUEST
} from '../actions/albums';


export default function(state = new Map(), action) {
    switch (action.type) {
        case GET_ALBUM_REQUEST: {
            const { id } = action.payload;
            return state.update('items', new List(), (items) => {
                const idx = items.findIndex((item) => item.get('id') === id);
                return idx === -1 ? items : items.update(idx, new Map(),
                    (value) => value.remove('loading').remove('error')
                );

            });
        }
        case GET_ALBUM_SUCCESS: {
            const { id, item } = action.payload;
            return state.update('items', new List(), (items) => {
                const idx = items.findIndex((item) => item.get('id') === id);
                return idx === -1 ? items : items.update(idx, new Map(),
                    (value) => value.remove('loading').remove('error').mergeDeep(fromJS(item))
                );
            });
        }
        case GET_ALBUM_FAILURE: {
            const { id, ...error } = action.error;
            return state.update('items', new List(), (items) => {
                const idx = items.findIndex((item) => item.get('id') === id);
                return idx === -1 ? items : items.update(idx, new Map(),
                    (value) => value.remove('loading').set('error', new Map(error))
                );
            });
        }

        case ADD_ALBUM_REQUEST: {
            const { id } = action.payload;
            return state.update('items', new List(), (items) => {
                const idx = items.findIndex((item) => item.get('id') === id);
                return idx !== -1 ? items : items.push(new Map({ id }));
            });
        }
        case REMOVE_ALBUM_REQUEST: {
            const { id } = action.payload;
            return state.update('items', new List(), (items) => {
                const idx = items.findIndex((item) => item.get('id') === id);
                return idx === -1 ? items : items.remove(idx);
            });
        }

        default:
            return state;
    }
}