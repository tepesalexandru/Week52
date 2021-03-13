import { Checkbox, CheckboxProps, makeStyles, withStyles } from "@material-ui/core";
import React from "react";

export const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.palette.secondary.contrastText,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.palette.secondary.contrastText,
  },
  container: {
    background: theme.palette.secondary.main,
    margin: "auto",
    padding: "36px 48px",
    borderRadius: 12,
  },
  inputsContainer: {
    marginBottom: 24,
    "& > div": {
      marginBottom: 8,
    },
  },
}));

export const MainCheckbox = withStyles({
  root: {
    color: "#bb86fc",
    paddingLeft: 0,
    "&$checked": {
      color: "#bb86fc",
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);
