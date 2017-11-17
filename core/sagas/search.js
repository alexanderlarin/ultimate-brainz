import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
    SEARCH_ALBUMS_REQUEST,

    searchAlbumsSuccess, searchAlbumsFailure
} from '../actions/search';


function* fetchSearchAlbums(api, action) {
    const { query, limit, offset } = action.payload;
    try {
        const { count, items } = yield call([api, api.searchAlbums], query, limit, offset);
        yield put(searchAlbumsSuccess(query, offset, count, items));
    }
    catch ({ message, status }) {
        yield put(searchAlbumsFailure(query, offset, message, status));
    }
}

function* watchFetchSearchAlbums(...args) {
    yield takeLatest(SEARCH_ALBUMS_REQUEST, fetchSearchAlbums, ...args);
}

export default function* (...args) {
    return yield all([
        call(watchFetchSearchAlbums, ...args)
    ]);
}