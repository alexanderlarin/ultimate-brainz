import Immutable from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';

import { Api } from './api';
import { makeReducers } from './reducers';
import { makeSagas } from './sagas';


export function makeStore(initialState = Immutable.Map()) {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(makeReducers(), initialState, compose(
        applyMiddleware(sagaMiddleware),
    ));

    const api = new Api();

    let sagaTask = sagaMiddleware.run(makeSagas(), api);

    if (module.hot) {
        // const red = require('./reducers').makeReducers;
        module.hot.accept('./reducers', () => store.replaceReducer(makeReducers()));

        module.hot.accept('./sagas', () => {
            sagaTask.cancel();
            sagaTask.done.then(() => sagaTask = sagaMiddleware.run(makeSagas(), api));
        });
    }

    return store;
}
