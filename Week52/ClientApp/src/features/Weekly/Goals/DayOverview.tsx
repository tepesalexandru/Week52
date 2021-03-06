import {
  Button,
  createStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  withStyles,
} from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { ApplicationState } from "../../../app/store";
import { Day, Goal, Progress, Task, Week } from "../../../shared/Interfaces";
import AddProgress from "./AddProgress";
import { makeStyles } from "@material-ui/core";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const useStyles = makeStyles((theme) => ({
  singleProgressRoot: {
    display: "flex",
  },
  progressPieceContainer: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    padding: "8px 50px",
    borderRadius: 12,
    margin: "4px 2px",
  },
  arrowContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    "& svg": {
      height: 45,
      width: 45,
    },
  },
  editModeContainer: {
    marginBottom: 20,
  },
}));

interface Props {
  week: Week;
}

export default function DayOverview(props: Props): ReactElement {
  const params: any = useParams();
  const classes = useStyles();
  const dayNumber = +params.dayNumber;
  const [editMode, setEditMode] = useState(false);
  const [tasksProgress, setTasksProgress] = useState<any>([]);
  const daySelected = useSelector(
    (state: ApplicationState) => state.week.days[dayNumber - 1]
  );

  useEffect(() => {
    const baseTasks: any = [];
    const appearedTasks: string[] = [];
    const hasAppeared = (taskId: string) => { 
      return appearedTasks.indexOf(taskId) !== -1;
    }
    if (daySelected)
    daySelected.overview.forEach((progress: Progress) => {
      if (!hasAppeared(progress.taskId)) {
        let newTask: any = {
          id: progress.taskId,
          goalId: progress.goalId,
          progress: progress.progress,
        };
        baseTasks.push(newTask);
        appearedTasks.push(progress.taskId);
      } else {
        let idx = appearedTasks.indexOf(progress.taskId);
        baseTasks[idx].progress += progress.progress;
      }
    });
    setTasksProgress(baseTasks);
  }, [JSON.stringify(daySelected)])

  useEffect(() => {
    setEditMode(false);
  }, [params.dayNumber]);

  const getTaskById = (taskId: string, progress?: Progress): Task => {
    if (progress) {
      const goal = props.week.goals.find((x) => x.id === progress.goalId);
      if (goal != undefined) {
        const task = goal.tasks.find((x) => x.id === progress.taskId);
        if (task != undefined) {
          return task;
        }
      }
    } else {
      let taskToReturn: Task = {} as Task;
      props.week.goals.forEach((goal: Goal) => {
        goal.tasks.forEach((task: Task) => {
          if (task.id === taskId) taskToReturn = task;
        });
      });
      return taskToReturn;
    }
    return {} as Task;
  };

  const getTaskRequiredTime = (taskId: string): number => {
    const task = getTaskById(taskId);
    if (task) {
      return task.duration;
    }
    return 0;
  };

  const getGoalNameById = (goalId: string) => {
    const goal = props.week.goals.find((x) => x.id === goalId);
    if (goal != undefined) return goal.name;
  };

  const getTaskProgressByDay = (taskId: string, dayNumber: number): number => {
    let taskProgress = 0;
    props.week.days[dayNumber].overview.forEach((progress: Progress) => {
      if (progress.taskId === taskId) {
        taskProgress += progress.progress;
      }
    });
    return taskProgress;
  };

  const getPreviousTaskProgress = (taskId: string): number => {
    let previousProgress = 0;
    props.week.days.forEach((day: Day, idx: number) => {
      if (idx < dayNumber - 1) {
        previousProgress += getTaskProgressByDay(taskId, idx);
      }
    });
    return Math.min(previousProgress, getTaskRequiredTime(taskId));
  };

  const calculateRemainingTaskTime = (taskId: string, progress: number) => {
    return Math.max(getTaskRequiredTime(taskId) - getPreviousTaskProgress(taskId) - progress, 0);
  }

  const renderOverview = () => {
    if (daySelected === undefined) return <div></div>;
    if (daySelected.overview.length === 0) {
      return <div style={{ color: "white" }}>No registered progress.</div>;
    } else {
      return (
        <TableContainer component={Paper} style={{ borderRadius: 0 }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Goal Name</StyledTableCell>
                <StyledTableCell align="left">Task</StyledTableCell>
                <StyledTableCell align="left">Start of Day</StyledTableCell>
                <StyledTableCell align="left">Remaining</StyledTableCell>
                <StyledTableCell align="left">Progress</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasksProgress.map((taskProgress: {id: string, progress: number, goalId: string}) => {
                
                  return (
                    <StyledTableRow key={taskProgress.id}>
                      <StyledTableCell component="th" scope="row">
                        {getGoalNameById(taskProgress.goalId)}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {getTaskById(taskProgress.id).name}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {getTaskRequiredTime(taskProgress.id) - getPreviousTaskProgress(taskProgress.id)}{" "}
                        minutes
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculateRemainingTaskTime(taskProgress.id, taskProgress.progress)}{" "}
                        minutes
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {taskProgress.progress}{" "}
                        minutes
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
  };

  const renderEditMode = () => {
    if (!editMode) {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setEditMode(true)}
        >
          Add Progress
        </Button>
      );
    } else {
      return (
        <React.Fragment>
          <AddProgress
            daySelected={daySelected}
            goals={props.week.goals}
            onClick={() => setEditMode(false)}
          />
        </React.Fragment>
      );
    }
  };

  return (
    <div>
      <div className={classes.editModeContainer}>{renderEditMode()}</div>
      {renderOverview()}
    </div>
  );
}
