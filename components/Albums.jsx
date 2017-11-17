import React, { Component } from 'react';
import {
    Grid, Row, Col
} from 'react-bootstrap';

import { AlbumsCollectionComponent } from './Bricks';


export class AlbumsComponent extends Component {
    render() {
        const { items } = this.props;
        return (
            <Grid fluid={ true }>
                <Row>
                    <Col>
                        <p>Your albums collection</p>
                    </Col>
                </Row>
                <AlbumsCollectionComponent items={ items } />
            </Grid>
        );
    }
}


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


export const Albums = connect(
    (state, ownProps) => ({
        items: state.getIn(['albums', 'items'])
    }),
    (dispatch, ownProps) => bindActionCreators({

    }, dispatch)
)(AlbumsComponent);
