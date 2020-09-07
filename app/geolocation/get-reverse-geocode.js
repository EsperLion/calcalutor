const geoService = require('../service/geo.service')

module.exports = async ({ latitude, longitude }) => {
  if (typeof latitude === "undefined") {
    throw new Error("latitude should not be undefined");
  }

  if (typeof longitude === "undefined") {
    throw new Error("longitude should not be undefined");
  }

  try {
    const response = await geoService.getReverseGeocode(latitude, longitude);
    if (response.status !== 200) {
      throw new Error("Some error");
    }

    const { results, status, error_message } = response.data;
    if (status !== "OK") {
      throw new Error(error_message || "Provide a valid longitude/latitude");
    }

    const info = results.map((info) => ({
      location: info.geometry.location,
      fullAddress: info.formatted_address,
    }));

    return info;
  } catch (error) {
    throw new Error(error || "Google Api Error");
  }
};
