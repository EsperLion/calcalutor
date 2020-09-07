const distanceService = require('../service/distance.service');

module.exports = ({ unit, cords }) => {
  const [cordA, cordB] = cords;
  const distanceInMeters = distanceService.getDistance(cordA, cordB);

  if (unit === distanceService.UNITS.meter) {
    return distanceInMeters;
  }

  return distanceInMeters/ distanceService.METERS_IN_KM;
};

