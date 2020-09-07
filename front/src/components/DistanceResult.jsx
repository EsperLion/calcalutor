import React from "react";
import { Typography} from "@material-ui/core";

export const DistanceResult = React.memo(({ distance, unit }) => {
  return (
    <Typography>
      Result: {distance} {unit}
    </Typography>
  );
});
