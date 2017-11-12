export const SEARCH_ALBUMS_REQUEST = 'SEARCH_ALBUMS_REQUEST';
export const SEARCH_ALBUMS_SUCCESS = 'SEARCH_ALBUMS_SUCCESS';
export const SEARCH_ALBUMS_FAILURE = 'SEARCH_ALBUMS_FAILURE';

export function searchAlbums() {
    return {
        type: SEARCH_ALBUMS_REQUEST,
        payload: {}
    };
}

export function searchAlbumsSuccess() {
    return {
        type: SEARCH_ALBUMS_SUCCESS,
        payload: {}
    };
}

export function searchAlbumsFailure() {
    return {
        type: SEARCH_ALBUMS_FAILURE,
        error: {}
    };
}
