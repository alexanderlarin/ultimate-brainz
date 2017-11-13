import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';

import { getAlbumCover } from "../actions/covers";
import {
    SEARCH_ALBUMS_REQUEST, SEARCH_ALBUMS_SUCCESS,

    searchAlbumsSuccess, searchAlbumsFailure
} from '../actions/search';


function* fetchSearchAlbums(api, action) {
    const { query, limit, offset } = action.payload;
    try {
        const { items } = yield call([api, api.searchAlbums], query, limit, offset);
        yield put(searchAlbumsSuccess(query, offset, items));
    }
    catch ({ message, status }) {
        yield put(searchAlbumsFailure(query, offset, message, status));
    }
}

function* watchFetchSearchAlbums(...args) {
    yield takeLatest(SEARCH_ALBUMS_REQUEST, fetchSearchAlbums, ...args);
}

function* waitSearchAlbums(api, action) {
    const { items } = action.payload;
    yield items.map(({ id }) => put(getAlbumCover(id)));
}

function* watchWaitSearchAlbums(...args) {
    yield takeEvery(SEARCH_ALBUMS_SUCCESS, waitSearchAlbums, ...args);
}

export default function* (...args) {
    return yield [
        call(watchFetchSearchAlbums, ...args),
        call(watchWaitSearchAlbums, ...args)
    ];
}