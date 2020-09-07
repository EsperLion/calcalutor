import {
  getDistance,
} from "../../../api/geocode.api";
import { useState } from "react";
import {  useSnackbar} from 'notistack';

const createPayload = ({ location: { lat, lng } }) => {
  return { lat, lng };
}


export const useSubmit = (geoInfoA, geoInfoB, unit) => {
  const [distance, setDistance] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const snackbar = useSnackbar();

  const onSubmit = async () => {
    setLoading(true);
    try {
      const result = await getDistance(unit, [createPayload(geoInfoA), createPayload(geoInfoB)]);
      setDistance(result.distance);
      setLoading(false);
    } catch(error) {
      setLoading(false);
      snackbar.enqueueSnackbar(error.message, {
        variant: 'error',
      })
    }
  };

  return [distance, onSubmit, isLoading];
};
