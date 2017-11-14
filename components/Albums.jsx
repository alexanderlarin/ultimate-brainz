import React, { Component } from 'react';


export class AlbumsComponent extends Component {
    render() {
        return (
            <p>Your album collection</p>
        );
    }
}


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


export const Albums = connect(
    (state, ownProps) => ({}),
    (dispatch, ownProps) => bindActionCreators({
    }, dispatch)
)(AlbumsComponent);
