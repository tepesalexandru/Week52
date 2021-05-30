import { Theme, makeStyles } from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router";
import { ApplicationState } from "../../app/store";
import { WeekProgress } from "../../shared/Interfaces";
import { getProgressOnWeeks } from "../../shared/services/analyticsService";
import ProgressOnWeeks from "./ProgressOnWeeks";
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

  const [progressOnWeeks, setProgressOnWeeks] = useState<WeekProgress[]>([]);

  const tags =
    useSelector((state: ApplicationState) => state.analytics.tags) || [];

  const userId =
    useSelector((state: ApplicationState) => state.auth?.user?.id) || "";

  useEffect(() => {
    dispatch(_getTags(userId));
    getProgressOnWeeks(userId).then((data: WeekProgress[]) => {
      setProgressOnWeeks(data);
    });
  }, []);

  return (
    <div className={classes.root}>
      <Route path="/dashboard/analytics">
        <TagsBarChart tags={tags} userId={userId} />
        <ProgressOnWeeks progressOnWeeks={progressOnWeeks} />
      </Route>
      <Route path="/dashboard/tags">
        <Tags tags={tags} />
      </Route>
    </div>
  );
}
