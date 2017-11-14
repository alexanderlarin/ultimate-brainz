import React from 'react';
import PropTypes from 'prop-types';
import {
    Grid, Col, Row, Clearfix,
    Button, Glyphicon
} from 'react-bootstrap';
import { className } from 'css-classname';

const classNames = (...args) => className(require('./Bricks.scss'), ...args);


export class AlbumsCollectionComponent extends React.Component {
    static propTypes = {
        items: PropTypes.object,
        addAlbum: PropTypes.func,
        removeAlbum: PropTypes.func
    };

    render() {
        const { items, addAlbum, removeAlbum } = this.props;
        return (
            <Grid fluid={ true }>
                <Row>
                    {
                        !items ? null : items.reduce((items, item, key) => {
                            if (key && !((key % 4)))
                                items.push(<Clearfix key={ key } />);
                            items.push(
                                <Col key={ item.get('id') } lg={ 3 }>
                                    <div className={classNames('cover')}>
                                        <img src={ item.getIn(['cover', 'image']) }/>
                                    </div>
                                    <p>{ item.get('title') }</p>
                                    <p>
                                        <Button bsSize={ 'xsmall' } bsStyle={ 'success' }
                                                onClick={ () => addAlbum(item.get('id')) }
                                        >
                                            <Glyphicon glyph="plus" />
                                        </Button>
                                        { ' ' }
                                        <Button bsSize={ 'xsmall' } bsStyle={ 'danger' }
                                                onClick={ () => removeAlbum(item.get('id')) }
                                        >
                                            <Glyphicon glyph="remove" />
                                        </Button>
                                    </p>
                                </Col>
                            );
                            return items;
                        }, [])
                    }
                </Row>
            </Grid>
        );
    }
}
