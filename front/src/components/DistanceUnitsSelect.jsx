import React, { useCallback } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(() => ({
  selectField: {
    width: "100%",
  },
}));

export const DistanceUnitsSelect = React.memo(({ unit, onUnitChange }) => {
  const classes = styles();
  const _onUnitChange = useCallback((e) => onUnitChange(e.target.value), [onUnitChange]);
  return (
    <FormControl variant="outlined" className={classes.selectField}>
      <InputLabel>Unit</InputLabel>
      <Select
        label="Unit"
        value={unit}
        onChange={_onUnitChange}
      >
        <MenuItem value="km">km</MenuItem>
        <MenuItem value="meters">meters</MenuItem>
      </Select>
    </FormControl>
  );
});
