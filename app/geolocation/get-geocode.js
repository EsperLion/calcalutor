const geoService = require('../service/geo.service')

module.exports = async ({ address }) => {
  if (typeof address === "undefined") {
    throw new Error("address should not be undefined");
  }

  try {
    const response = await geoService.getGeocode(address);
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
