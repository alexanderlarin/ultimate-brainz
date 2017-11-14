import React, { Component } from 'react';
import { className } from 'css-classname';
import { NavLink, Route, Switch } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, Grid } from 'react-bootstrap';

import { Home } from './Home';
import { Albums } from './Albums';
import { Search } from './Search';

const classNames = (...args) => className(require('./App.scss'), ...args);


export class AppComponent extends Component {
    render () {
        return (
            <div>
                <Navbar inverse={ true } fixedTop={ true } collapseOnSelect={ true }>
                    <Navbar.Header>
                        <NavLink to={ '/' }>
                            <Navbar.Brand>
                                ultimate-brainz
                            </Navbar.Brand>
                        </NavLink>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <LinkContainer to={ '/albums' }>
                                <NavItem eventKey={ 1 }> My Albums</NavItem>
                            </LinkContainer>
                            <LinkContainer to={ '/search' }>
                                <NavItem eventKey={ 2 }>Search</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Grid className={ classNames('content') }>
                    <main>
                        <Switch>
                            <Route path='/' exact={ true } component={ Home } />
                            <Route path='/albums' component={ Albums } />
                            <Route path='/search' component={ Search } />
                        </Switch>
                    </main>
                    <hr />
                    <footer>
                        <p>All Rights Reserved. Alexander Larin. 2017 =)</p>
                    </footer>
                </Grid>
            </div>
        );
    }
}

export const App = AppComponent;
