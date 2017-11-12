import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Grid, Col, Row,
    FormGroup, InputGroup, FormControl, Button, Glyphicon
} from 'react-bootstrap';


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
    render() {
        return (
            <Grid>
                <Row>
                    <Col>
                        <p>Search, Hard and Deep Search</p>
                        <InputComponent delay={ 500 } />
                    </Col>
                </Row>
            </Grid>
        );
    }
}


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


export const Search = connect(
    (state, ownProps) => ({
    }),
    (dispatch, ownProps) => bindActionCreators({
    }, dispatch)
)(SearchComponent);