import { Button } from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ApplicationState } from "../../../app/store";
import { makeStyles } from "@material-ui/core";
import { deleteGoal } from "../Services/goalService";
import WeekSidebar from "./WeekSidebar";
import { _fetchWeek } from "../Slices/weekSlice";
import { Goal, Task, Week } from "../../../shared/Interfaces";

const useStyles = makeStyles((theme) => ({
  bodyRoot: {
    display: "flex",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.palette.secondary.contrastText,
    marginBottom: 0,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    background: theme.palette.secondary.main,
  },
  body: {
    width: "80%",
    margin: "auto",
    marginTop: 36,
    marginLeft: 30,
  },
  goalRoot: {
    background: theme.palette.secondary.main,
    borderRadius: 12,
    padding: "12px 24px",
    margin: "8px 0",
    color: theme.palette.secondary.contrastText,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskRoot: {
    display: "flex",
    justifyContent: "flex-end",
  },
  taskBody: {
    background: theme.palette.secondary.main,
    borderRadius: 12,
    padding: "12px 24px",
    margin: "8px 0",
    color: theme.palette.secondary.contrastText,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
  },
}));

interface Props {}

export default function WeeklyGoals({}: Props): ReactElement {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const currentWeek: Week = useSelector(
    (state: ApplicationState) => state.week
  );
  const [totalMinutes, setTotalMinutes] = useState<number>(0);
  const [totalHours, setTotalHours] = useState<number>(0);

  useEffect(() => {
    let neededMinutes = 0;
    let totalProgress = 0;
    currentWeek.goals.map((goal: Goal) => {
      goal.tasks.map((task: Task) => {
        neededMinutes += task.duration;
        // totalProgress += task.progress;
      });
    });
    let remainingMinutes = neededMinutes - totalProgress;
    remainingMinutes = Math.max(0, remainingMinutes);
    setTotalMinutes(remainingMinutes);
    setTotalHours(+(remainingMinutes / 60).toFixed(2));
  }, [JSON.stringify(currentWeek.goals)]);

  const getOvertime = (initial: number, progress: number) => {
    if (progress > initial)
      return " | " + (progress - initial).toString() + " minutes overtime.";
    return "";
  };

  const renderTasks = (tasks: Task[]) => {
    return tasks.map((task) => {
      return (
        <div key={task.id} className={classes.taskRoot}>
          <div
            className={classes.taskBody}
            // style={{ opacity: task.completed ? 0.4 : 1 }}
          >
            <span>{task.name}</span>
            <span>
              {task.duration} minutes
            </span>
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
          Your tasks for this Week - {totalMinutes} minutes ({totalHours} hours)
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push(`/add-progress`)}
            style={{ marginLeft: 16 }}
          >
            Add Progress
          </Button>
        </div>
      </div>
      <div className={classes.bodyRoot}>
        <WeekSidebar />
        <div className={classes.body}>{renderGoals()}</div>
      </div>
    </div>
  );
}
