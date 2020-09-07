import React, { useState } from "react";
import { Paper, Grid, Button, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Address } from "../../components/Address";
import { DistanceUnitsSelect } from "../../components/DistanceUnitsSelect";
import { DistanceResult } from "../../components/DistanceResult";
import { useGetGeocode } from "./hooks/useGetGeocode";
import { SearchResult } from "../../components/SearchResult";
import { useSubmit } from "./hooks/useSubmit";
import { useEffect } from "react";

const styles = makeStyles(() => ({
  container: {
    position: "relative",
    width: "800px",
    margin: "100px auto 0",
    padding: "25px",
    overflow: "hidden",
  },
}));

export const DistancePage = React.memo(() => {
  const classes = styles();
  const [addressA, setAddressA] = useState("");
  const [addressB, setAddressB] = useState("");

  const [latitudeA, setLatitudeA] = useState("");
  const [latitudeB, setLatitudeB] = useState("");

  const [longitudeA, setLongitudeA] = useState("");
  const [longitudeB, setLongitudeB] = useState("");

  const [geoTypeA, setTypeA] = useState("address");
  const [geoTypeB, setTypeB] = useState("address");

  const [selectedLocA, setLocA] = useState(null);
  const [selectedLocB, setLocB] = useState(null);

  const [unit, setUnit] = useState("km");

  const [searchResultA, isALoading] = useGetGeocode({
    address: addressA,
    latitude: latitudeA,
    longitude: longitudeA,
    geoType: geoTypeA,
  });
  const [searchResultB, isBLoading] = useGetGeocode({
    address: addressB,
    latitude: latitudeB,
    longitude: longitudeB,
    geoType: geoTypeB,
  });

  const locA =
    searchResultA && typeof selectedLocA === "number"
      ? searchResultA[selectedLocA]
      : null;
  const locB =
    searchResultB && typeof selectedLocB === "number"
      ? searchResultB[selectedLocB]
      : null;

  const [distance, getDistance, isLoading] = useSubmit(locA, locB, unit);

  const showLoader = isALoading || isBLoading || isLoading;

  useEffect(() => {
    if (distance) {
      getDistance();
    }
  }, [unit])

  return (
    <Paper className={classes.container}>
      {showLoader && (
        <LinearProgress
          style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
        />
      )}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Address
            address={addressA}
            lat={latitudeA}
            long={longitudeA}
            geoType={geoTypeA}
            onAddressChange={setAddressA}
            onLatChange={setLatitudeA}
            onLongChange={setLongitudeA}
            onTypeChange={setTypeA}
          />
          {searchResultA && (
            <SearchResult
              locations={searchResultA}
              selectedLocation={selectedLocA}
              onLocationSelect={setLocA}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          <Address
            address={addressB}
            lat={latitudeB}
            long={longitudeB}
            geoType={geoTypeB}
            onAddressChange={setAddressB}
            onLatChange={setLatitudeB}
            onLongChange={setLongitudeB}
            onTypeChange={setTypeB}
          />
          {searchResultB && (
            <SearchResult
              locations={searchResultB}
              selectedLocation={selectedLocB}
              onLocationSelect={setLocB}
            />
          )}
        </Grid>
        <Grid item xs={2}>
          <DistanceUnitsSelect unit={unit} onUnitChange={setUnit} />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={getDistance}>
            Get Distance
          </Button>
        </Grid>
        <Grid item xs={12}>
          <DistanceResult distance={distance} unit={unit} />
        </Grid>
      </Grid>
    </Paper>
  );
});
