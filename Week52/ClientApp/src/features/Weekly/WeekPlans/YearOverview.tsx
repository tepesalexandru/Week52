import React, { ReactElement } from "react";
import { useHistory } from "react-router";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getWeekNumber } from "../../Helpers";
import { setSelectedWeek } from "../Slices/metadataSlice";

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
  week: {
    width: "80%",
    margin: "4px 16px",
    padding: 16,
  },
}));

interface Props {}

export default function YearOverview({}: Props): ReactElement {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const generateWeeks = () => {
    const currentWeek = getWeekNumber(new Date());
    const weeks = [];
    const getColor = (weekNumber: number) => {
      if (currentWeek >= weekNumber) return "primary";
      else if (currentWeek < weekNumber) return "secondary";
    };
    for (let i = 0; i < 52; i++) {
      weeks.push(
        <Grid item xs={3}>
          <Button
            color={getColor(i + 1)}
            variant="contained"
            className={classes.week}
            onClick={() => {
              dispatch(setSelectedWeek({ weekSelected: i + 1, weekId: "" }));
              history.push(`/week-plan/${i + 1}`);
            }}
          >
            Week {i + 1}
          </Button>
        </Grid>
      );
    }
    return weeks;
  };

  return (
    <div>
      <div className={classes.header}>
        <p className={classes.title}>Year overview</p>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/dashboard")}
            style={{ marginRight: 16 }}
          >
            Analytics
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/week")}
          >
            Current Week
          </Button>
        </div>
      </div>
      <div>
        <Grid container>{generateWeeks()}</Grid>
      </div>
    </div>
  );
}
