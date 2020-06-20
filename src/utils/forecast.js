const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=6fffc99deb7f2ee59b1b7ca4a904f7ac&query=${latitude},${longitude}&units=f`;

  // 'http://api.weatherstack.com/current?access_key=6fffc99deb7f2ee59b1b7ca4a904f7ac&query=' +
  // latitude +
  // ',' +
  // longitude +
  // '&units=f';

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      const description = body.current.weather_descriptions[0];
      const realTemp = body.current.temperature;
      const precip = body.current.precip * 100;
      callback(
        undefined,
        `${description}. It is currently ${realTemp} degrees out. There is ${precip}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
