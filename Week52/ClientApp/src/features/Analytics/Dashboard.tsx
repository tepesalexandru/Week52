import { Theme, makeStyles } from "@material-ui/core";
import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router";
import { ApplicationState } from "../../app/store";
import { _getTags } from "./slices/analyticSlice";
import Tags from "./Tags";
import TagsBarChart from "./TagsBarChart";

interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: "0 60px",
    marginTop: 24,
  },
}));

export default function Dashboard({}: Props): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tags =
    useSelector((state: ApplicationState) => state.analytics.tags) || [];
  const userId = useSelector(
    (state: ApplicationState) => state.metadata.userId
  );
  useEffect(() => {
    dispatch(_getTags(userId));
  }, []);

  return (
    <div className={classes.root}>
      <Route path="/dashboard/analytics">
        <TagsBarChart tags={tags} userId={userId} />
      </Route>
      <Route path="/dashboard/tags">
        <Tags tags={tags} />
      </Route>
    </div>
  );
}
