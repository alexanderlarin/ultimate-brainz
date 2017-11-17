import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
    ADD_ALBUM_REQUEST,
    GET_ALBUM_REQUEST,

    getAlbum, getAlbumSuccess, getAlbumFailure
} from '../actions/albums';


function* fetchAlbum(api, action) {
    const { id } = action.payload;
    try {
        const { item } = yield call([api, api.getAlbum], id);
        yield put(getAlbumSuccess(id, item));
    }
    catch ({ message, status }) {
        yield put(getAlbumFailure(id, message, status));
    }
}

function* watchFetchAlbum(...args) {
    yield takeEvery(GET_ALBUM_REQUEST, fetchAlbum, ...args);
}


function* waitAddAlbum(api, action) {
    const { id } = action.payload;
    yield put(getAlbum(id));
}

function* watchWaitAddAlbum(...args) {
    yield takeEvery(ADD_ALBUM_REQUEST, waitAddAlbum, ...args);
}

export default function* (...args) {
    return yield all([
        call(watchFetchAlbum, ...args),
        call(watchWaitAddAlbum, ...args)
    ]);
}