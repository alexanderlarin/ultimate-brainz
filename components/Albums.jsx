import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Grid, Row, Col
} from 'react-bootstrap';

import { InfoComponent, AlbumsCollectionComponent } from './Bricks';


export class AlbumsComponent extends Component {
    render() {
        const { items } = this.props;
        return (
            <Grid fluid={ true }>
                <AlbumsCollectionComponent items={ items } />
                <Row>
                    <Col>
                        <InfoComponent>
                            {
                                !items || items.size ? null :
                                    <p>
                                        My Albums collection is empty. Try to <Link to={ '/search' }>search</Link> something
                                    </p>
                            }
                        </InfoComponent>
                    </Col>
                </Row>
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
