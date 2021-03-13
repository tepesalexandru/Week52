import { Button } from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory } from "react-router";
import { ApplicationState } from "../../../app/store";
import WeekSidebar from "./WeekSidebar";
import { _fetchWeek } from "../Slices/weekSlice";
import { Goal, Task, Week } from "../../../shared/Interfaces";
import DayOverview from "./DayOverview";
import WeekReport from "./WeekReport";
import { useStyles } from "./Styles/WeeklyGoals";
import CheckIcon from "@material-ui/icons/CheckCircle";
import { getAllTaskProgress } from "./Helpers/_taskHelpers";

interface Props {}

export default function WeeklyGoals({}: Props): ReactElement {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const currentWeek: Week = useSelector(
    (state: ApplicationState) => state.week
  );
  const [totalMinutes, setTotalMinutes] = useState<number>(0);

  useEffect(() => {
    let minutes = 0;
    currentWeek.goals.forEach((goal: Goal) => {
      goal.tasks.forEach((task: Task) => {
        minutes += task.estimation;
      });
    });
    setTotalMinutes(minutes);
  }, [JSON.stringify(currentWeek.goals)]);

  const renderTasks = (tasks: Task[]) => {
    const renderCompletedMark = (dayCompleted: number) => {
      if (dayCompleted > 0)
        return <CheckIcon style={{ fill: "#6D9F71", marginLeft: 12 }} />;
      return <div style={{ marginLeft: 12 }}></div>;
    };

    return tasks.map((task) => {
      return (
        <div key={task.id} className={classes.taskRoot}>
          <div className={classes.taskBody}>
            <span>{task.name}</span>
            <div>
              <span>
                {getAllTaskProgress(task)} / {task.estimation} minutes
              </span>
              {renderCompletedMark(task.dayCompleted)}
            </div>
          </div>
        </div>
      );
    });
  };

  const renderGoals = () => {
    return currentWeek.goals.map((goal: Goal) => {
      return (
        <React.Fragment key={goal.id}>
          <div className={classes.goalRoot}>
            <span>{goal.name}</span>
            <div></div>
          </div>
          {renderTasks(goal.tasks)}
        </React.Fragment>
      );
    });
  };

  return (
    <div>
      <div className={classes.header}>
        <p className={classes.title}>
          Your tasks for this Week - {totalMinutes} minutes (
          {(totalMinutes / 60).toFixed(2)} hours)
        </p>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/year-overview")}
            style={{ marginLeft: 16 }}
          >
            Year Overview
          </Button>
        </div>
      </div>
      <div className={classes.bodyRoot}>
        <WeekSidebar />
        <div className={classes.view}>
          <Route path="/week/overview">
            <div>{renderGoals()}</div>
          </Route>
          <Route path="/week/day/:dayNumber">
            <DayOverview week={currentWeek} />
          </Route>
          <Route path="/week/report">
            <WeekReport week={currentWeek} totalMinutes={totalMinutes} />
          </Route>
        </div>
      </div>
    </div>
  );
}
