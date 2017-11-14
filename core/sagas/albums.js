import { call, put, takeEvery } from 'redux-saga/effects';

import {
    GET_ALBUM_REQUEST,

    getAlbumSuccess, getAlbumFailure
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

export default function* (...args) {
    return yield [
        call(watchFetchAlbum, ...args),
    ];
}