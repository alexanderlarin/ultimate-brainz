import React, { Component } from 'react';
import {
    Grid, Row, Col
} from 'react-bootstrap';

import { AlbumsCollectionComponent } from './Bricks';


export class AlbumsComponent extends Component {
    render() {
        const { items, addAlbum, removeAlbum } = this.props;
        return (
            <Grid fluid={ true }>
                <Row>
                    <Col>
                        <p>Your albums collection</p>
                    </Col>
                </Row>
                <AlbumsCollectionComponent items={ items } addAlbum={ addAlbum } removeAlbum={ removeAlbum } />
            </Grid>
        );
    }
}


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addAlbum, removeAlbum } from '../core/actions/albums';


export const Albums = connect(
    (state, ownProps) => ({
        items: state.getIn(['albums', 'items'])
    }),
    (dispatch, ownProps) => bindActionCreators({
        addAlbum, removeAlbum
    }, dispatch)
)(AlbumsComponent);
