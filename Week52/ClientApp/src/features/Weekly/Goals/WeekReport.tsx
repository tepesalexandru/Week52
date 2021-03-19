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
import React, { ReactElement, useEffect, useState } from "react";
import { Week } from "../../../shared/Interfaces";
import { getProgressOnDay, getRemainingTime } from "./Helpers/_taskHelpers";

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
  const [remainingByDay, setRemainingByDay] = useState<number[]>([
    props.totalMinutes,
    ...[1, 2, 3, 4, 5, 6, 7].map((day: number): number => {
      return getRemainingTime(props.week, day, props.totalMinutes);
    }),
  ]);

  const getRemainingPercentage = (day: number) => {
    return (
      (getRemainingTime(props.week, day, props.totalMinutes) /
        props.totalMinutes) *
      100
    ).toFixed(2);
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
                  {remainingByDay[day]} minutes
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
