import Promise from 'bluebird';
import Client from 'superagent';
import HttpError from 'http-errors';


export class Api {
    constructor() {
    }

    cover({ id, ...item }) {
        return { id, cover: { image: `http://coverartarchive.org/release/${id}/front` }, ...item };
    }

    get(query, id) {
        return new Promise((resolve, reject) => {
            Client
                .get(`http://musicbrainz.org/ws/2/release/${id || ''}`)
                .query({ fmt: 'json' })
                .query(query)
                .end((err, res) => {
                    if (!err && res.ok)
                        return resolve(res.body);
                    return reject(new HttpError(err.status, res ? (res.body && res.body.error) : err.message));
                });
        });
    }


    getAlbum(id) {
        return this.get(`inc=artist-credits+recordings`, id)
            .then((item) => ({ item: this.cover(item) }));
    }

    searchAlbums(title, limit, offset) {
        return this.get(`limit=${limit}&offset=${offset}&query=release:${encodeURIComponent(title)}`)
            .then(({ count, releases }) => ({
                count,
                items: releases.map((item) => this.cover(item))
            }));
    }
}
