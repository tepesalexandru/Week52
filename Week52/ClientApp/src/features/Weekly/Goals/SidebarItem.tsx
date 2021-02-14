import React, { ReactElement, useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.secondary.contrastText,
    padding: "2px 24px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      cursor: "pointer",
      opacity: 0.8,
    },
  },
  selected: {
    backgroundColor: theme.palette.primary.main,
    fontWeight: "bold",
    "&:hover": {
      opacity: 1,
    },
  },
}));

interface Props {
  label: string;
  onClick?: any;
  selectedItem?: any;
}

export default function SidebarItem(props: Props): ReactElement {
  const classes = useStyles();
  const myRef = useRef(null);

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (props.selectedItem) {
      if (props.selectedItem === myRef) {
        setIsSelected(true);
      } else setIsSelected(false);
    }
  }, [props.selectedItem]);

  const handleClick = () => {
    if (props.onClick) props.onClick(myRef);
  };

  const getRootClasses = () => {
    if (isSelected) return classes.root + " " + classes.selected;
    return classes.root;
  };

  return (
    <div ref={myRef} className={getRootClasses()} onClick={handleClick}>
      {props.label}
    </div>
  );
}
