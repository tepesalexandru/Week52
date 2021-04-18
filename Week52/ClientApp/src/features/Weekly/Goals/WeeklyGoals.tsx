import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useLocation } from "react-router";
import { ApplicationState } from "../../../app/store";
import { Goal, Task, Week } from "../../../shared/Interfaces";
import DayOverview from "./DayOverview";
import WeekReport from "./WeekReport";
import { useStyles } from "./Styles/WeeklyGoals";
import { getRemainingTime } from "./Helpers/_taskHelpers";
import Burndown from "./Burndown";
import { setNavbarTitle } from "../Slices/metadataSlice";
import GoalAccordion from "./GoalAccordion";

interface Props {}

export default function WeeklyGoals(props: Props): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentWeek: Week = useSelector(
    (state: ApplicationState) => state.week
  );
  const [totalMinutes, setTotalMinutes] = useState<number>(0);
  const [remainingByDay, setRemainingByDay] = useState<number[]>([]);

  useEffect(() => {
    setRemainingByDay([
      totalMinutes,
      ...[1, 2, 3, 4, 5, 6, 7].map((day: number): number => {
        return getRemainingTime(currentWeek, day, totalMinutes);
      }),
    ]);
  }, [totalMinutes]);

  useEffect(() => {
    let minutes = 0;
    currentWeek.goals.forEach((goal: Goal) => {
      goal.tasks.forEach((task: Task) => {
        minutes += task.estimation;
      });
    });
    setTotalMinutes(minutes);
    setRemainingByDay([
      minutes,
      ...[1, 2, 3, 4, 5, 6, 7].map((day: number): number => {
        return getRemainingTime(currentWeek, day, totalMinutes);
      }),
    ]);
  }, [JSON.stringify(currentWeek.goals)]);

  useEffect(() => {
    if (location.pathname !== "/week/overview") return;
    dispatch(
      setNavbarTitle({
        title: `Week Overview - ${totalMinutes} minutes (${(
          totalMinutes / 60
        ).toFixed(2)} hours)`,
      })
    );
  }, [location.pathname, totalMinutes]);

  const renderGoals = () => {
    return currentWeek.goals.map((goal: Goal) => {
      return (
        <React.Fragment key={goal.id}>
          <GoalAccordion goal={goal} />
        </React.Fragment>
      );
    });
  };

  return (
    <div>
      <div className={classes.bodyRoot}>
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
      <Burndown totalMinutes={totalMinutes} remainingByDay={remainingByDay} />
    </div>
  );
}
