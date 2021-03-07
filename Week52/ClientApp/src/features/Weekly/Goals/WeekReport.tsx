import {
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
import React, { ReactElement } from "react";
import { useParams } from "react-router";
import { Day, Goal, Progress, Task, Week } from "../../../shared/Interfaces";
import { getTaskRequiredTime } from "./Helpers/taskHelpers";

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

interface Props {
  week: Week;
  totalMinutes: number;
}

export default function WeekReport(props: Props): ReactElement {
  const params: any = useParams();
  const dayNumber = params.dayNumber;

  const getDayProgress = (idx: number): number => {
    let totalProgress = 0;
    props.week.days[idx].overview.forEach((progress: Progress) => {
      totalProgress += progress.progress;
    });
    return totalProgress;
  };

  const getPreviousDaysProgress = (idx: number): number => {
    let previousProgress = 0;
    for (let i = 0; i < idx; i++) {
      previousProgress += getDayProgress(i);
    }
    return previousProgress;
  };

  const renderOverview = () => {
    return (
      <TableContainer component={Paper} style={{ borderRadius: 0 }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Day of the Week</StyledTableCell>
              <StyledTableCell align="left">Start of Day</StyledTableCell>
              <StyledTableCell align="left">End of Day</StyledTableCell>
              <StyledTableCell align="left">Progress</StyledTableCell>
              <StyledTableCell align="left">Remaining%</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.week.days.map((day: Day) => (
              <StyledTableRow key={day.id}>
                <StyledTableCell component="th" scope="row">
                  Day {day.dayNumber}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {Math.max(
                    props.totalMinutes -
                      getPreviousDaysProgress(day.dayNumber - 1),
                    0
                  )}{" "}
                  minutes
                </StyledTableCell>
                <StyledTableCell align="left">
                  {Math.max(
                    props.totalMinutes -
                      getPreviousDaysProgress(day.dayNumber - 1) -
                      getDayProgress(day.dayNumber - 1),
                    0
                  )}{" "}
                  minutes
                </StyledTableCell>
                <StyledTableCell align="left">
                  {getDayProgress(day.dayNumber - 1)} minutes
                </StyledTableCell>
                <StyledTableCell align="left">
                  {(
                    ((props.totalMinutes -
                      getPreviousDaysProgress(day.dayNumber - 1) -
                      getDayProgress(day.dayNumber - 1)) /
                      props.totalMinutes) *
                    100
                  ).toFixed(2)}
                  %
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return <div>{renderOverview()}</div>;
}
