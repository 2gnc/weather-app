const request = require('request');

const getGeoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidGduYyIsImEiOiJjanR3cTFnYmUyM3N5NGRwY2FqNmJ6NWt1In0.FS3Wy1am9HngPkD0uY1y1A&limit=1`;

    request({
        url,
        json: true
    }, (error, data) => {
        if (error) {
            return callback('Unable to connect to location services');
        }
        const { features } = data.body;
        if (!features.length) {
            return callback('No location found');
        } 
        const { center, place_name: location } = features[0] 
        const [longitude, latitude] = center;
            callback(undefined, {
                longitude,
                latitude,
                location
            });
    })
}

module.exports = getGeoCode;