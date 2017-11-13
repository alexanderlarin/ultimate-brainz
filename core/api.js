import Promise from 'bluebird';
import Client from 'superagent';
import HttpError from 'http-errors';


export class Api {
    constructor() {
    }

    searchAlbums(title, limit, offset) {
        return new Promise((resolve, reject) => {
                Client
                    .get('http://musicbrainz.org/ws/2/release-group/')
                    .query({ fmt: 'json', limit, offset })
                    .query(`query=release:${encodeURIComponent(title)}`)
                    .end((err, res) => {
                        if (!err && res.ok)
                            return resolve(res.body);
                        return reject(new HttpError(err.status, res ? (res.body && res.body.error) : err.message));
                    });
            })
            .then((response) => ({ count: response.count, items: response['release-groups'] }));
    }

    getAlbumCover(id) {
        return Promise.resolve({ cover: 'http://www.ambilogo.com/wp-content/uploads/2012/03/muse-absolution-cover-7506.jpg' });
    }
}
