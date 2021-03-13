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
import { Week } from "../../../shared/Interfaces";
import {
  getDayOffset,
  getProgressOnDay,
  getProgressUntilDay,
} from "./Helpers/_taskHelpers";

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

  console.log("active progress on day 5", getProgressOnDay(props.week, 5, false));
  console.log("offset on day 5", getDayOffset(props.week, 5));

  const getRemainingTime = (day: number) => {
    return Math.max(
      0,
      props.totalMinutes -
        getProgressUntilDay(props.week, day, false)
    );
  };

  const getRemainingPercentage = (day: number) => {
    return ((getRemainingTime(day) / props.totalMinutes) * 100).toFixed(2);
  };

  const renderOverview = () => {
    return (
      <TableContainer component={Paper} style={{ borderRadius: 0 }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Day of the Week</StyledTableCell>
              <StyledTableCell align="left">Progress</StyledTableCell>
              <StyledTableCell align="left">Remaining</StyledTableCell>
              <StyledTableCell align="left">Remaining%</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 2, 3, 4, 5, 6, 7].map((day: number) => (
              <StyledTableRow key={`day-${day}`}>
                <StyledTableCell component="th" scope="row">
                  Day {day}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {getProgressOnDay(props.week, day, false)} minutes
                </StyledTableCell>
                <StyledTableCell align="left">
                  {getRemainingTime(day)} minutes
                </StyledTableCell>
                <StyledTableCell align="left">
                  {getRemainingPercentage(day)}%
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
