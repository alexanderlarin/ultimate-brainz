import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import {
    Grid, Col, Row,
    FormGroup, InputGroup, FormControl, Button, Glyphicon
} from 'react-bootstrap';
import { className } from 'css-classname';

import { AlbumsCollectionComponent } from './Bricks';

const classNames = (...args) => className(require('./Search.scss'), ...args);


class InputComponent extends Component {
    static propTypes = {
        value: PropTypes.string,
        delay: PropTypes.number,
        onQuery: PropTypes.func
    };

    static defaultProps = {
        value: '',
        delay: 0
    };

    state = {
        value: '',
        timer: undefined
    };

    componentDidMount() {
        const { value } = this.props;
        this.setState({ value });
    }

    componentWillReceiveProps(nextProps) {
        const { value } = nextProps;
        if (this.props.value !== value)
            this.setState({ value });
    }

    componentWillUnmount() {
        clearTimeout(this.state.timer);
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({ value });
        this.query(value, this.props.delay);
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.query(this.state.value)
        }
    }

    handleClick() {
        this.query(this.state.value);
    }

    query(value, delay) {
        const { onQuery } = this.props;
        clearTimeout(this.state.timer);
        if (onQuery)
            !delay ? onQuery(value) : this.setState({
                timer: setTimeout(() => onQuery(value), delay)
            });
    }

    render() {
        return (
            <form>
                <FormGroup>
                    <InputGroup>
                        <FormControl type="text" value={ this.state.value }
                                     onChange={ ::this.handleChange } onKeyPress={ ::this.handleKeyPress } />
                        <InputGroup.Button>
                            <Button onClick={ ::this.handleClick }><Glyphicon glyph="search" /></Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </form>
        );
    }
}


export class SearchComponent extends Component {
    componentDidMount() {
        this.search(this.props.query);
    }

    componentWillReceiveProps(nextProps) {
        const { query } = nextProps;
        if (this.props.query !== query)
            this.search(query);
    }

    handleQuery(query) {
        const { history } = this.props;
        history.replace({ ...history.location, search: new URLSearchParams({ query }).toString() });
    }

    handleMore() {
        const { query, items, searchAlbums } = this.props;
        searchAlbums(query, 8, !items ? 0 : items.size);
    }

    search(query) {
        const { searchAlbums, clearSearch } = this.props;
        clearSearch();
        if (query)
            searchAlbums(query, 16);
    }

    render() {
        const { query, more, items, addAlbum, removeAlbum } = this.props;
        return (
            <Grid fluid={ true }>
                <Row>
                    <Col>
                        <p>Search, Hard and Deep Search</p>
                        <InputComponent value={ query } delay={ 500 } onQuery={ ::this.handleQuery }/>
                    </Col>
                </Row>
                <InfiniteScroll element='div' initialLoad={ false } hasMore={ more } loadMore={ ::this.handleMore } loader={ <div>Loading...</div> }>
                    <AlbumsCollectionComponent items={ items } addAlbum={ addAlbum } removeAlbum={ removeAlbum } />
                </InfiniteScroll>
            </Grid>
        );
    }
}


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { addAlbum, removeAlbum } from '../core/actions/albums';
import { searchAlbums, clearSearch } from '../core/actions/search';


export const Search = withRouter(connect(
    (state, ownProps) => {
        return {
            query: new URLSearchParams(ownProps.location.search).get('query') || '',
            more: state.getIn(['search', 'more']),
            items: state.getIn(['search', 'items'])
        };
    },
    (dispatch, ownProps) => bindActionCreators({
        addAlbum, removeAlbum,
        searchAlbums, clearSearch
    }, dispatch)
)(SearchComponent));
