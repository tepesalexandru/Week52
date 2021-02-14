import React, { ReactElement, useState } from "react";
import { makeStyles } from "@material-ui/core";
import SidebarItem from "./SidebarItem";
import { useDispatch, useSelector } from "react-redux";
import { setDayIdSelected } from "../Slices/metadataSlice";
import { ApplicationState } from "../../../app/store";
import { Day } from "../../../shared/Interfaces";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    backgroundColor: "#1e1e1e",
    color: "#dddddd",
  },
  header: {
    padding: "12px 24px",
    fontSize: 20,
    fontWeight: "bold",
  },
  dayRoot: {
    color: theme.palette.secondary.contrastText,
    padding: "2px 24px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      cursor: "pointer",
      opacity: 0.8,
    },
  },
  selectedDay: {
    backgroundColor: theme.palette.primary.main,
    fontWeight: "bold",
    "&:hover": {
      opacity: 1,
    },
  },
}));

interface Props {}

export default function WeekSidebar({}: Props): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const days = useSelector((state: ApplicationState) => state.week.days);

  const selectDay = (ref: any, dayId: string) => {
    setSelectedMenuItem(ref);
    dispatch(setDayIdSelected(dayId));
  };

  const renderDays = () => {
    return days.map((day: Day) => {
      return (
        <SidebarItem
          key={day.id}
          onClick={(ref: any) => selectDay(ref, day.id)}
          label={`Day ${day.dayNumber}`}
        />
      );
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <span>Days</span>
      </div>
      <div>{renderDays()}</div>
      <div className={classes.header}>
        <span>Overview</span>
      </div>
      <div>
        <SidebarItem
          label={`Week Overview`}
          selectedItem={selectedMenuItem}
          onClick={setSelectedMenuItem}
        />
        <SidebarItem
          label={`Week Report`}
          selectedItem={selectedMenuItem}
          onClick={setSelectedMenuItem}
        />
        <SidebarItem
          label={`Retrospectives`}
          selectedItem={selectedMenuItem}
          onClick={setSelectedMenuItem}
        />
      </div>
    </div>
  );
}
