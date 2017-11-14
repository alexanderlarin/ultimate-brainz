import Immutable from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import persistState from 'redux-localstorage';

import { Api } from './api';
import { makeReducers, persistPaths } from './reducers';
import { makeSagas } from './sagas';

const storageConfig = {
    slicer: (paths) => (state) => state.filter((v,k) => paths.indexOf(k) > -1),
    serialize: (subset) => JSON.stringify(subset.toJS()),
    deserialize: (serializedData) => Immutable.fromJS(JSON.parse(serializedData)),
    merge: (initialState, persistedState) => initialState.mergeDeep(persistedState)
};

export function makeStore(initialState = Immutable.Map()) {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(makeReducers(), initialState, compose(
        applyMiddleware(sagaMiddleware),
        persistState(persistPaths, storageConfig),

        // (global.window && window.devToolsExtension) ? window.devToolsExtension() : f => f
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
