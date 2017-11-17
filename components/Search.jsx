import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import {
    Grid, Col, Row,
    FormGroup, InputGroup, FormControl, Button, Glyphicon
} from 'react-bootstrap';
import { className } from 'css-classname';

import { LoadingComponent, ErrorComponent, InfoComponent, AlbumsCollectionComponent } from './Bricks';

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
        const { history } = this.props;
        const query = new URLSearchParams(history.location.search).get('query') || '';
        if (query)
            this.search(query);
        else {
            const { query } = this.props;
            if (query)
                this.handleQuery(query);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { query } = nextProps;
        this.search(query);
    }

    handleQuery(query) {
        const { history } = this.props;
        history.replace({ ...history.location, search: new URLSearchParams({ query }).toString() });
        this.search(query);
    }

    handleMore() {
        const { query, items, searchAlbums } = this.props;
        if (items)
            searchAlbums(query, 8, items.size);
    }

    search(query) {
        const { searchAlbums, updateSearch } = this.props;
        if (this.props.query !== query) {
            updateSearch(query);
            searchAlbums(query, 16);
        }
    }

    render() {
        const {
            loading, error,
            query, more, items
        } = this.props;
        return (
            <Grid fluid={ true }>
                <Row>
                    <Col>
                        <p>Search, Hard and Deep Search</p>
                        <InputComponent value={ query } delay={ 500 } onQuery={ ::this.handleQuery }/>
                    </Col>
                </Row>
                <InfiniteScroll element='div' initialLoad={ false }
                                hasMore={ more } loadMore={ ::this.handleMore }
                >
                    <AlbumsCollectionComponent items={ items } />
                </InfiniteScroll>
                <Row>
                    <Col>
                        <LoadingComponent loading={ loading }>Loading...</LoadingComponent>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ErrorComponent error={ error }>Error has been occurred:</ErrorComponent>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InfoComponent>
                            { !error && items && !items.size ? 'No items found. Please try another search query' : null }
                        </InfoComponent>
                    </Col>
                </Row>
            </Grid>
        );
    }
}


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { searchAlbums, updateSearch } from '../core/actions/search';


export const Search = withRouter(connect(
    (state, ownProps) => {
        return {
            loading: state.getIn(['search', 'loading'], false),
            error: state.getIn(['search', 'error']),
            query: state.getIn(['search', 'query'], ''),
            more: state.getIn(['search', 'more']),
            items: state.getIn(['search', 'items'])
        };
    },
    (dispatch, ownProps) => bindActionCreators({
        searchAlbums, updateSearch
    }, dispatch)
)(SearchComponent));
