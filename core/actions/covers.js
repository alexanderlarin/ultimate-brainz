export const GET_ALBUM_COVER_REQUEST = 'GET_ALBUM_COVER_REQUEST';
export const GET_ALBUM_COVER_SUCCESS = 'GET_ALBUM_COVER_SUCCESS';
export const GET_ALBUM_COVER_FAILURE = 'GET_ALBUM_COVER_FAILURE';

export function getAlbumCover(id) {
    return {
        type: GET_ALBUM_COVER_REQUEST,
        payload: { id }
    };
}

export function getAlbumCoverSuccess(id, cover) {
    return {
        type: GET_ALBUM_COVER_SUCCESS,
        payload: { id, cover }
    };
}

export function getAlbumCoverFailure(id, message, status) {
    return {
        type: GET_ALBUM_COVER_FAILURE,
        error: { id, message, status }
    };
}
