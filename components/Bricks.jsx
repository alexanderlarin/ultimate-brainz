import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { className, classJoin } from 'css-classname';

import Cover from '../images/Cover.png';

const classNames = (...args) => className(require('./Bricks.scss'), ...args);

export class CoverComponent extends React.Component {
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

export class AlbumsCollectionComponent extends React.Component {
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
                                            <CoverComponent image={ item.getIn(['cover', 'image']) }/>
                                            <div className={ classNames('title') }>
                                                { item.get('title') }
                                            </div>
                                            <div className={ classNames('artist') }>
                                                {
                                                    !item.has('artist-credit') ? null :
                                                        item.get('artist-credit').map((credit) => credit.getIn(['artist', 'name']))
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
