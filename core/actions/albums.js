export const GET_ALBUM_REQUEST = 'GET_ALBUM_REQUEST';
export const GET_ALBUM_SUCCESS = 'GET_ALBUM_SUCCESS';
export const GET_ALBUM_FAILURE = 'GET_ALBUM_FAILURE';

export const ADD_ALBUM_REQUEST = 'ADD_ALBUM_REQUEST';
export const REMOVE_ALBUM_REQUEST = 'REMOVE_ALBUM_REQUEST';

export function getAlbum(id) {
    return {
        type: GET_ALBUM_REQUEST,
        payload: { id }
    };
}

export function getAlbumSuccess(id, item) {
    return {
        type: GET_ALBUM_SUCCESS,
        payload: { id, item }
    };
}

export function getAlbumFailure(id, message, status) {
    return {
        type: GET_ALBUM_FAILURE,
        error: { id, message, status }
    };
}

export function addAlbum(id) {
    return {
        type: ADD_ALBUM_REQUEST,
        payload: { id }
    };
}

export function removeAlbum(id) {
    return {
        type: REMOVE_ALBUM_REQUEST,
        payload: { id }
    };
}
