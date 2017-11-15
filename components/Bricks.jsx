import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';
import { className } from 'css-classname';

const classNames = (...args) => className(require('./Bricks.scss'), ...args);


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
                                        <div className={ classNames('cover') }>
                                            <img src={ item.getIn(['cover', 'image']) }/>
                                        </div>
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
