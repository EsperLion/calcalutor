import React from "react";
import { List, ListItem, ListItemText, ListSubheader } from "@material-ui/core";

export const SearchResult = React.memo(({ locations, selectedLocation, onLocationSelect }) => {
  return (
    <List
      component="div"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Select one of the results
        </ListSubheader>
      }
    >
      {locations &&
        locations.map(({ location: { lat, lng }, fullAddress }, index) => (
          <ListItem key={fullAddress} button selected={selectedLocation === index} onClick={() => onLocationSelect(index)}>
            <ListItemText primary={`${fullAddress} (${lat}, ${lng})`} />
          </ListItem>
        ))}
    </List>
  );
});
