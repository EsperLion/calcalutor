const axios = require('axios');

module.exports = {

  getGeocode (address) {
    return axios.get(
      `${process.env.GOOGLE_SERVICE}/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API_KEY}`
    );
  },

  getReverseGeocode (latitude, longitude) {
    return axios.get(
      `${process.env.GOOGLE_SERVICE}/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_API_KEY}`
    );
  }

}