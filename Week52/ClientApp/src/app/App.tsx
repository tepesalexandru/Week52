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
import { useLocation } from "react-router";
import NavigationBar from "../shared/NavigationBar";
import {useHistory} from 'react-router';
const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    height: "auto",
  },
}));

export default () => {
  const location = useLocation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(
    (state: ApplicationState) => state.auth?.user?.id
  ) || "";

  useEffect(() => {
    if (userId == "") {
      history.push("/");
      return;
    }
    
    const currentWeek = getWeekNumber(new Date());
    if (currentWeek !== 0 && userId) {
      dispatch(_fetchWeek({ userId: userId, weekNumber: currentWeek }));
      dispatch(setCurrentWeek(currentWeek));
    }
  }, [userId]);

  const renderNavigationBar = () => {
    if (location.pathname !== "/") {
      return <NavigationBar />;
    }
  };

  return (
    <div className={classes.root}>
      <Layout>
        {renderNavigationBar()}
        {RenderComponentRoutes(routes)}
      </Layout>
    </div>
  );
};
