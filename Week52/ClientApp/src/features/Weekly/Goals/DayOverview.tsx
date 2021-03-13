import {
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Overview, Week } from "../../../shared/Interfaces";
import AddProgress from "./AddProgress";
import { getOverviewOnDay } from "./Helpers/_taskHelpers";
import {
  StyledTableCell,
  StyledTableRow,
  useStyles,
} from "./Styles/DayOverviewStyles";
import CheckIcon from "@material-ui/icons/CheckCircle";

interface Props {
  week: Week;
}

export default function DayOverview(props: Props): ReactElement {
  const params: any = useParams();
  const classes = useStyles();
  const dayNumber = +params.dayNumber;
  const [editMode, setEditMode] = useState(false);
  const [dayOverview, setDayOverview] = useState<Overview[]>(
    getOverviewOnDay(props.week, dayNumber)
  );

  useEffect(() => {
    setDayOverview(getOverviewOnDay(props.week, dayNumber));
  }, [dayNumber, JSON.stringify(props.week.goals)]);

  useEffect(() => {
    setEditMode(false);
  }, [params.dayNumber]);

  const renderCompletedMark = (dayCompleted: number, currentDay: number) => {
    if (dayCompleted <= currentDay)
      return <CheckIcon style={{ fill: "#6D9F71", marginLeft: 12 }} />;
    return <div style={{ marginLeft: 12 }}></div>;
  };

  const renderOverview = () => {
    if (dayNumber === undefined) return <div></div>;
    if (dayOverview.length === 0) {
      return <div style={{ color: "white" }}>No registered progress.</div>;
    } else {
      return (
        <TableContainer component={Paper} style={{ borderRadius: 0 }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Goal Name</StyledTableCell>
                <StyledTableCell align="left">Task</StyledTableCell>
                <StyledTableCell align="left">Progress</StyledTableCell>
                <StyledTableCell align="left">Remaining</StyledTableCell>
                <StyledTableCell align="left">Completed</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dayOverview.map((overview: Overview) => {
                return (
                  <StyledTableRow key={overview.task.id}>
                    <StyledTableCell component="th" scope="row">
                      {overview.goalName}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {overview.task.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {overview.progress} minutes
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {overview.remaining} minutes
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {renderCompletedMark(
                        overview.task.dayCompleted,
                        dayNumber
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
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
            day={dayNumber}
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
