import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Grid, Col, Row,
    Alert
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { className, classJoin } from 'css-classname';

import Cover from '../images/Cover.png';

const classNames = (...args) => className(require('./Bricks.scss'), ...args);

export class CoverComponent extends Component {
    static propTypes = {
        className: PropTypes.string,
        image: PropTypes.string,
    };

    state = {
        failed: false
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.image !== nextProps.image)
            this.setState({ failed: false });
    }

    handleError() {
        this.setState({ failed: true });
    }

    render() {
        const { image, className } = this.props;
        const { failed } = this.state;
        return (
            <div className={ classJoin(classNames('cover'), className) }>
                <img src={ failed ? Cover : image } onError={ ::this.handleError } />
            </div>
        );
    }
}

export class LoadingComponent extends Component {
    static propTypes = {
        loading: PropTypes.bool
    };

    static defaultProps = {
        loading: false
    };

    render() {
        const { loading, children } = this.props;
        return !loading ? null : (
            <Alert bsStyle={ 'warning' }>{ children }</Alert>
        );
    }
}

export class ErrorComponent extends Component {
    static propTypes = {
        error: PropTypes.object
    };

    render() {
        const { error, children } = this.props;
        return !error ? null : (
            <Alert bsStyle={ 'danger' }>
                { children }
                <p>{ error.get('message') }</p>
            </Alert>
        );
    }
}

export class InfoComponent extends Component {
    render() {
        const { children } = this.props;
        return !children ? null : (
            <Alert bsStyle={ 'warning' }>
                { children }
            </Alert>
        );
    }
}

export class AlbumsCollectionComponent extends Component {
    static propTypes = {
        items: PropTypes.object
    };

    render() {
        const { items } = this.props;
        return (
            <Grid fluid={ true }>
                <Row>
                    {
                        !items ? null : items.map((item, key) =>
                            <Col key={ item.get('id') } lg={ 3 } md={ 6 } sm={ 12 }>
                                <div className={ classNames('album') }>
                                    <div className={ classNames('content') }>
                                        <Link to={ `/album/${item.get('id')}` }>
                                            <CoverComponent image={ item.getIn(['cover', 'image']) } />
                                            <div className={ classNames('title') }>
                                                { item.get('title') }
                                            </div>
                                            <div className={ classNames('artist') }>
                                                {
                                                    !item.has('artist-credit') ? null :
                                                        item.get('artist-credit').map((credit) => credit.getIn(['artist', 'name'])).join(', ')
                                                }
                                            </div>
                                            <div className={ classNames('year') }>
                                                {
                                                    !item.has('date') ? null :
                                                        new Date(item.get('date')).getFullYear() }
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                        )
                    }
                </Row>
            </Grid>
        );
    }
}
