import React from "react";
import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useCallback } from "react";
const styles = makeStyles(() => ({
  field: {
    width: "100%",
  },
}));

export const Address = React.memo(
  ({
    address,
    lat,
    long,
    geoType,
    onAddressChange,
    onLatChange,
    onLongChange,
    onTypeChange,
  }) => {
    const classes = styles();
    const _onAddressChange = useCallback((e) => onAddressChange(e.target.value), [onAddressChange]);
    const _onLatChange = useCallback((e) => onLatChange(e.target.value), [onLatChange]);
    const _onLongChange = useCallback((e) => onLongChange(e.target.value), [onLongChange]);
    const _onTypeChange = useCallback((e) => onTypeChange(e.target.value), [onTypeChange]);

    return (
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.field}>
              <InputLabel id="demo-simple-select-outlined-label">
                Geolocation Type
              </InputLabel>
              <Select
                label="Geolocation Type"
                value={geoType}
                onChange={_onTypeChange}
              >
                <MenuItem value="address">Address</MenuItem>
                <MenuItem value="cords">Cords</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {geoType === "address" && (
            <Grid item xs={12}>
              <TextField
                className={classes.field}
                label="Address"
                variant="outlined"
                value={address}
                onChange={_onAddressChange}
              />
            </Grid>
          )}
          {geoType === "cords" && (
            <>
              <Grid item xs={6}>
                <TextField
                  className={classes.field}
                  label="Latitude"
                  variant="outlined"
                  value={lat}
                  onChange={_onLatChange}
                  type="number"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  className={classes.textField}
                  label="Longitude"
                  variant="outlined"
                  value={long}
                  type="number"
                  onChange={_onLongChange}
                />
              </Grid>{" "}
            </>
          )}
        </Grid>
      </form>
    );
  }
);
