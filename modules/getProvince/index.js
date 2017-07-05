const promise = require('promise');
const co = require('co');
const request = require('request');
exports.getProvince = function (url) {
    return new promise((resolve, reject) => {
        request.get(url, {
            json: true,
        }, (err, res, body) => {
            if (err) {
                reject(err);
            }
            console.log(body);
            resolve(body);
        })
    })
}

exports.gen = function* (url) {
    const res = yield _getProvince(url);
    console.log(res);
    return res;
}

function _getProvince(url) {
    return new promise((resolve, reject) => {
        request.get(url, {
            json: true,
        }, (err, res, body) => {
            if (err) {
                reject(err);
            }
            resolve(body);
        })
    })
}