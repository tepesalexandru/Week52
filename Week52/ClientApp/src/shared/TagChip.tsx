import { Chip, makeStyles } from "@material-ui/core";
import React, { ReactElement } from "react";

interface Props {
  name: string;
  color: string;
  onClick?: Function;
  styles?: any;
  onDelete?: Function
}

const useStyles = makeStyles({
  chip: {
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
});

export default function TagChip(props: Props): ReactElement {
  const classes = useStyles();
  return (
    <Chip
      label={props.name}
      variant="outlined"
      className={classes.chip}
      style={{
        backgroundColor: props.color,
        ...props.styles
      }}
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        }
      }}
      {...props.onDelete}
    />
  );
}
