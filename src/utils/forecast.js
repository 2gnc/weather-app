const request = require('request');

const forecast = (lat, long, calback) => {
    const url = `https://api.darksky.net/forecast/671f265757bcc4daf71e0baff04408b8/${long},${lat}?lang=ru&units=si`;
    request({
        url,
        json: true,
    }, (err, data) => {
        if (err) {
            return calback('Unable to connect to DarkSkyAPI');
        }
        const { error, currently } = data.body;
        if (error) {
            return calback(error);
        } 
        calback(undefined, `it is currentley ${currently.temperature} degrees`)
    })
}

module.exports = forecast;