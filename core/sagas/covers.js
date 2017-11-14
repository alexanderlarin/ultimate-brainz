import { call, put, takeEvery } from 'redux-saga/effects';

import {
    GET_ALBUM_COVER_REQUEST,

    getAlbumCoverSuccess, getAlbumCoverFailure
} from '../actions/covers';


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

export default function* (...args) {
    return yield [
        call(watchFetchCover, ...args),
    ];
}