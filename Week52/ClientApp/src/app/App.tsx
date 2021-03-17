import React, { useEffect } from "react";
import Layout from "../shared/Layout";

import { RenderComponentRoutes } from "./routes/routeHelper";
import { routes } from "./routes/routes";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getWeekNumber } from "../features/Helpers";
import { setCurrentWeek } from "../features/Weekly/Slices/metadataSlice";
import { _fetchWeek } from "../features/Weekly/Slices/weekSlice";
import { ApplicationState } from "./store";
const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    height: "auto",
  },
}));

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userId = useSelector(
    (state: ApplicationState) => state.metadata.userId
  );

  useEffect(() => {
    const currentWeek = getWeekNumber(new Date());
    if (currentWeek !== 0 && userId) {
      dispatch(_fetchWeek({ userId: userId, weekNumber: currentWeek }));
      dispatch(setCurrentWeek(currentWeek));
    }
  }, [userId]);

  return (
    <div className={classes.root}>
      <Layout>{RenderComponentRoutes(routes)}</Layout>
    </div>
  );
};
