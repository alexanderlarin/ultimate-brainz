import Promise from 'bluebird';
import Client from 'superagent';
import HttpError from 'http-errors';


export class Api {
    constructor() {
    }

    cover(id) { return `http://coverartarchive.org/release/${id}/front`; }

    searchAlbums(title, limit, offset) {
        return new Promise((resolve, reject) => {
                Client
                    .get('http://musicbrainz.org/ws/2/release/')
                    .query({ fmt: 'json', limit, offset })
                    .query(`query=release:${encodeURIComponent(title)}`)
                    .end((err, res) => {
                        if (!err && res.ok)
                            return resolve(res.body);
                        return reject(new HttpError(err.status, res ? (res.body && res.body.error) : err.message));
                    });
            })
            .then((response) => ({
                count: response.count,
                items: response.releases.map(({ id, ...item }) => ({ id, cover: { image: this.cover(id) }, ...item }))
            }));
    }

    getAlbum(id) {
        return new Promise((resolve, reject) => {
            Client
                .get(`http://musicbrainz.org/ws/2/release/${id}`)
                .query({ fmt: 'json' })
                .query(`inc=artist-credits+recordings`)
                .end((err, res) => {
                    if (!err && res.ok)
                        return resolve(res.body);
                    return reject(new HttpError(err.status, res ? (res.body && res.body.error) : err.message));
                });
            })
            .then(({ id, ...item }) => ({ item: { id, cover: { image: this.cover(id) }, ...item } }));
    }
}
