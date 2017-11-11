import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom'
import { className } from 'css-classname';

import { Home } from './Home';
import { Search } from './Search';

import styles from './App.scss';


export class AppComponent extends Component {
    render () {
        return (
            <div className={ className(styles, 'container') }>
                <header>
                    <h1>Ultimate Guitar, Brainz and <span>Skillzzz</span></h1>
                    <nav>
                        <NavLink to={ '/' }>Home</NavLink>>
                        <NavLink to={ '/search' }>Search</NavLink>
                    </nav>
                </header>
                <main>
                    <Switch>
                        <Route path='/' exact={ true } component={ Home } />
                        <Route path='/search' component={ Search } />
                    </Switch>
                </main>
            </div>
        );
    }
}

export const App = AppComponent;
