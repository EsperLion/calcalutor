import { useState, useEffect, useCallback } from "react";
import {
  getGeocode,
  getReverseGeocode,
} from "../../../api/geocode.api";
import { useSnackbar } from "notistack";

export const useGetGeocode = ({ geoType, latitude, longitude, address }) => {
  const [result, setResult] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const snackbar = useSnackbar();

  const requestMap = {
    address: ({ address }) => {
      if (!address) {
        return;
      }
      return getGeocode({ address });
    },
    cords: async ({ latitude, longitude }) => {
      if (!latitude || !longitude) {
        return;
      }
      return getReverseGeocode({ latitude, longitude });
    },
  };

  const requestFunc = useCallback(requestMap[geoType], [geoType]);

  useEffect(() => {
    const id = setTimeout(async () => {
      try {
        setLoading(true);
        const result = await requestFunc({ latitude, longitude, address });
        setLoading(false);
        setResult(result);
      } catch (error) {
        setLoading(false);
        snackbar.enqueueSnackbar(error.message, {
          variant: "error",
        });
      }
    }, 300);
    return () => clearTimeout(id);
  }, [geoType, latitude, longitude, address, requestFunc, snackbar]);

  return [result, isLoading];
};
