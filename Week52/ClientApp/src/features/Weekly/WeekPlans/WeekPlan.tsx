import { Button } from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { ApplicationState } from "../../../app/store";
import { makeStyles } from "@material-ui/core";
import { deleteGoal } from "../Services/goalService";
import { Goal, Task } from "../../../shared/Interfaces";
import { _deleteGoal, _deleteTask, _fetchWeek } from "../Slices/weekSlice";

const useStyles = makeStyles((theme) => ({
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
    marginBottom: 36,
  },
  body: {
    width: "80%",
    margin: "auto",
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

export default function WeekPlan({}: Props): ReactElement {
  const dispatch = useDispatch();
  const params: any = useParams();
  const history = useHistory();
  const classes = useStyles();
  const weekNumber = useSelector(
    (state: ApplicationState) => state.metadata.weekSelected
  );
  const userId = useSelector(
    (state: ApplicationState) => state.metadata.userId
  );
  const goals = useSelector((state: ApplicationState) => state.week.goals);
  const [totalMinutes, setTotalMinutes] = useState<number>(0);
  const [totalHours, setTotalHours] = useState<number>(0);
  useEffect(() => {
    dispatch(
      _fetchWeek({
        userId: userId,
        weekNumber: weekNumber || params.weekNumber,
      })
    );
  }, [userId]);

  useEffect(() => {
    let neededMinutes = 0;
    goals.map((goal: Goal) => {
      goal.tasks.map((task: Task) => {
        neededMinutes += task.duration;
      });
    });
    setTotalMinutes(neededMinutes);
    setTotalHours(+(neededMinutes / 60).toFixed(2));
  }, [JSON.stringify(goals)]);

  const renderTasks = (tasks: Task[]) => {
    return tasks.map((task) => {
      return (
        <div key={task.id} className={classes.taskRoot}>
          <div className={classes.taskBody}>
            <span>{task.name}</span>
            <div>
              <span>{task.duration} minutes</span>
              <Button
                variant="contained"
                color="primary"
                onClick={() => dispatch(_deleteTask(task.id))}
                style={{ marginLeft: 16 }}
              >
                Delete Task
              </Button>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderGoals = () => {
    return goals.map((goal: Goal) => {
      return (
        <React.Fragment key={goal.id}>
          <div className={classes.goalRoot}>
            <span>{goal.name}</span>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push(`/create-task/${goal.id}`)}
              >
                Add Task
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => dispatch(_deleteGoal(goal.id))}
                style={{ marginLeft: 16 }}
              >
                Delete Goal
              </Button>
            </div>
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
            onClick={() => history.push("/create-goal")}
          >
            Create Goal
          </Button>
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
      <div className={classes.body}>{renderGoals()}</div>
    </div>
  );
}
