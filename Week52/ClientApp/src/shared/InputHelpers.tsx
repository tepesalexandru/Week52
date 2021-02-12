import { Grid } from "@material-ui/core";
import React from "react";

export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const showError = (errorMessage: string) => {
  return <p style={{ color: "#f00" }}>{errorMessage}</p>;
};

export const getLabel = (props: any) => {
  let label = "";
  if (props.label) {
    label += capitalize(props.label);
  } else {
    label += capitalize(props.name);
  }
  return label;
};

export const getIcon = (props: any) => {
  if (props.icon) {
    return <Grid item>{props.icon}</Grid>;
  }
};
