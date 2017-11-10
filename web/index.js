import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';

import { App } from '../components/App';
import { makeStore } from '../core/store';


const AppElementId = 'app';

const store = makeStore(fromJS(window.__INITIAL_STATE__));

const getElement = () => {
    let element = document.getElementById(AppElementId);
    if (!element) {
        element = document.createElement('div');
        element.setAttribute('id', AppElementId);
        document.body.appendChild(element);
    }
    return element;
};

const render = () => ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    getElement()
);

render();

if (module.hot) {
    module.hot.accept('../components/App', () => render())
}