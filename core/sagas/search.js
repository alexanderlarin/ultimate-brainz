import { call, put, takeLatest } from 'redux-saga/effects';

import {
    SEARCH_ALBUMS_REQUEST,

    searchAlbumsSuccess, searchAlbumsFailure
} from '../actions/search';


function* fetchSearchAlbums(api, action) {
    try {
        const {} = action.payload;
        yield call([api, api.searchAlbums], );
        yield put(searchAlbumsSuccess());
    }
    catch ({ message, status }) {
        yield put(searchAlbumsFailure(message, status));
    }
}

function* watchFetchSearchAlbums(...args) {
    yield takeLatest(SEARCH_ALBUMS_REQUEST, fetchSearchAlbums, ...args);
}

export default function* (...args) {
    return yield [
        call(watchFetchSearchAlbums, ...args),
    ];
}