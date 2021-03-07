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
import { Progress, Week } from "../../../shared/Interfaces";
import AddProgress from "./AddProgress";
import { makeStyles } from "@material-ui/core";
import {
  calculateRemainingTaskTime,
  getPreviousTaskProgress,
  getTaskById,
  getTaskRequiredTime,
} from "./Helpers/taskHelpers";

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
    };
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
  }, [JSON.stringify(daySelected)]);

  useEffect(() => {
    setEditMode(false);
  }, [params.dayNumber]);

  const getGoalNameById = (goalId: string) => {
    const goal = props.week.goals.find((x) => x.id === goalId);
    if (goal != undefined) return goal.name;
  };

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
              {tasksProgress.map(
                (taskProgress: {
                  id: string;
                  progress: number;
                  goalId: string;
                }) => {
                  return (
                    <StyledTableRow key={taskProgress.id}>
                      <StyledTableCell component="th" scope="row">
                        {getGoalNameById(taskProgress.goalId)}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {getTaskById(props.week, taskProgress.id).name}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {getTaskRequiredTime(props.week, taskProgress.id) -
                          getPreviousTaskProgress(
                            props.week,
                            taskProgress.id,
                            dayNumber
                          )}{" "}
                        minutes
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculateRemainingTaskTime(
                          props.week,
                          dayNumber,
                          taskProgress.id,
                          taskProgress.progress
                        )}{" "}
                        minutes
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {taskProgress.progress} minutes
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
