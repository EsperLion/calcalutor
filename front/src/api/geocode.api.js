import { get, post } from "./api";

export const getGeocode = async ({ address }) => {
  const { data } = await get("/geolocation/getGeocode", { address });
  return data;
};

export const getReverseGeocode = async ({ latitude, longitude }) => {
  const { data } = await get("/geolocation/getReverseGeocode", {
    latitude,
    longitude,
  });
  return data;
};

export const getDistance = async (unit, cords) => {
  const { data } = await post("/geolocation/calculateDistance", {
    unit,
    cords,
  });
  return data;
};
