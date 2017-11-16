import React, { Component } from 'react';
import { className } from 'css-classname';

const classNames = (...args) => className(require('./Album.scss'), ...args);


export class AlbumComponent extends Component {
    render() {
        const { id } = this.props;
        return (
            <p>Album, but not for me, ID={ id }</p>
        );
    }
}


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getAlbum, addAlbum, removeAlbum } from '../core/actions/albums';


export const Album = connect(
    (state, ownProps) => {
        const id = ownProps.match.params.id;
        return {
            id, item: state.getIn(['album', 'items', id])
        };
    },
    (dispatch, ownProps) => bindActionCreators({
        getAlbum, addAlbum, removeAlbum
    }, dispatch)
)(AlbumComponent);