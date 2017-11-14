import { call, put, takeEvery } from 'redux-saga/effects';

import { GET_ALBUM_SUCCESS } from '../actions/albums';
import {
    GET_ALBUM_COVER_REQUEST,

    getAlbumCover, getAlbumCoverSuccess, getAlbumCoverFailure
} from '../actions/covers';
import { SEARCH_ALBUMS_SUCCESS } from '../actions/search';


function* fetchCover(api, action) {
    const { id } = action.payload;
    try {
        const { cover } = yield call([api, api.getAlbumCover], id);
        yield put(getAlbumCoverSuccess(id, cover));
    }
    catch ({ message, status }) {
        yield put(getAlbumCoverFailure(id, message, status));
    }
}

function* watchFetchCover(...args) {
    yield takeEvery(GET_ALBUM_COVER_REQUEST, fetchCover, ...args);
}

function* waitFetchAlbums(api, action) {
    const { item=[], items=[] } = action.payload;
    yield items.concat(item).map(({ id }) => put(getAlbumCover(id)));
}

function* watchWaitFetchAlbums(...args) {
    yield takeEvery([GET_ALBUM_SUCCESS, SEARCH_ALBUMS_SUCCESS], waitFetchAlbums, ...args);
}

export default function* (...args) {
    return yield [
        call(watchFetchCover, ...args),
        call(watchWaitFetchAlbums, ...args)
    ];
}