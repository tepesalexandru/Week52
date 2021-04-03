import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "./Drawer";
import { useSelector } from "react-redux";
import { ApplicationState } from "../app/store";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function MenuAppBar(props: Props) {
  const classes = useStyles();
  const navbarTitle = useSelector(
    (state: ApplicationState) => state.metadata.navbarTitle
  );
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Drawer />
          <Typography variant="h6" className={classes.title}>
            {navbarTitle}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
