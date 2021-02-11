import * as React from "react";
import Layout from "../shared/Layout";

import { RenderComponentRoutes } from "./routes/routeHelper";
import { routes } from "./routes/routes";
import {makeStyles, useTheme} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        // background: 
        background: theme.palette.background.default,
        height: 'auto'
    }
}));

export default () => {
    const classes = useStyles();
  return (
    <div className={classes.root}>
      <Layout>{RenderComponentRoutes(routes)}</Layout>
    </div>
  );
};
