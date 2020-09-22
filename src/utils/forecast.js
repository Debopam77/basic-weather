const request = require('request');

const forecast = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=307bee84a9e1c8181737c48905a42464&query=${encodeURIComponent(address)}`;
    request({ url, json : true }, (err, response) => {
        if(err) {
            callback('Unable to connect to the weather api', undefined);
        } 
        if(response.body.error){
            callback('Cant find location for the given latitudes', undefined);
        }else{
            const data = {current : response.body.current,
                            location : response.body.location};
            callback(undefined, data);
        }
    });
}

module.exports = forecast;