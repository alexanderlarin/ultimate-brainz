import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Grid, Row, Col,
    Alert, Button, Glyphicon,
    Table
} from 'react-bootstrap';
import { className } from 'css-classname';

import  { CoverComponent } from './Bricks';

const classNames = (...args) => className(require('./Album.scss'), ...args);


class MediaComponent extends Component {
    static propTypes = {
        media: PropTypes.object
    };

    render() {
        const { media } = this.props;
        return !media ? null : (
            <Table>
                <thead>
                    <tr>
                        <th colSpan={ 2 }>{ media.get('title') || `Media #${media.get('position')}` }</th>
                    </tr>
                </thead>
                <tbody>
                {
                    media.get('tracks').map((track) =>
                        <tr key={ track.get('id') }>
                            <td>{ track.get('position') }.</td>
                            <td>{ track.get('title') }</td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
        );
    }
}

export class AlbumComponent extends Component {
    componentDidMount() {
        const { id, getAlbum } = this.props;
        if (id)
            getAlbum(id);
    }

    componentWillReceiveProps(nextProps) {
        const { id, getAlbum } = nextProps;
        if (this.props.id !== id)
            getAlbum(id);
    }

    render() {
        const {
            id, item, collected,
            addAlbum, removeAlbum
        } = this.props;
        return (
            <Grid fluid={ true }>
                {
                    !item ? <p>Album, but not for me, ID={ id }</p> :
                        <Row>
                            <Col md={ 4 }>
                                <CoverComponent image={ item.getIn(['cover', 'image']) } />
                            </Col>
                            <Col md={ 8 }>
                                <div className={ classNames('album-info') }>
                                    <div className={ classNames('stamp') }>Album</div>
                                    <h1 className={ classNames('title') }>
                                        { item.get('title') }
                                    </h1>
                                    <div className={ classNames('summary') }>
                                        <div>
                                            <span>Artist: </span>
                                            <span className={ classNames('artist') }>
                                                {
                                                    !item.has('artist-credit') ? 'Unknown' :
                                                        item.get('artist-credit').map((credit) => credit.getIn(['artist', 'name'])).join(', ')
                                                }
                                            </span>
                                        </div>
                                        <div>
                                            {
                                                !item.has('date') ? null :
                                                    new Date(item.get('date')).getFullYear() }
                                        </div>
                                    </div>
                                </div>
                                <Alert bsStyle={ 'warning' }>
                                    {
                                        collected ?
                                            'In My Albums collection' :
                                            'Not in My Albums collection'
                                    }
                                    { ': ' }
                                    <Button className={ 'pull-right'} bsSize={ 'small' } bsStyle={ collected ? 'danger': 'success'}
                                            onClick={ () => (collected ? removeAlbum : addAlbum)(item.get('id')) }
                                    >
                                        { collected ? 'Remove from My Albums' : 'Add to My Albums' }
                                    </Button>
                                </Alert>
                            </Col>
                        </Row>
                }
                {
                    !item || !item.has('media') ? null : item.get('media').map((media, key) =>
                        <Row key={ key }>
                            <Col md={ 8 } mdPush={ 4 }>
                                <MediaComponent media={ media } />
                            </Col>
                        </Row>
                    )
                }
            </Grid>
        );
    }
}


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getAlbum, addAlbum, removeAlbum } from '../core/actions/albums';


export const Album = connect(
    (state, ownProps) => {
        const albums = state.getIn(['albums', 'items']);
        const id = ownProps.match.params.id;
        return {
            id,
            item: state.getIn(['album', 'items', id]),
            collected: albums && albums.find((album) => album.get('id') === id)
        };
    },
    (dispatch, ownProps) => bindActionCreators({
        getAlbum, addAlbum, removeAlbum
    }, dispatch)
)(AlbumComponent);
