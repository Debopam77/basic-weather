const request = require('request');

const geocode = (address, callback) => {
    const mapBoxPK = 'pk.eyJ1IjoiZGVib3BhbTc3IiwiYSI6ImNrZjZ3dHoyNjA0bWYyc3Btc3lucjVnZ28ifQ.6Repc1fCKDLHxvveKNsIOw';
    const latLongURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?types=address&access_token=${mapBoxPK}&limit=1`;

    request({ url: latLongURL, json : true}, (err, response) => {
        if(err) {
            callback('Unable to connect to location services', undefined);
        } else if(response.body.features.length === 0){
            callback('Unable to find location..', undefined);
        }else{
            callback(undefined, {
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;