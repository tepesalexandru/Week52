import React, { ReactElement, useState } from "react";
import { makeStyles } from "@material-ui/core";
import SidebarItem from "./SidebarItem";

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
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const renderDays = () => {
    const days: any[] = [];

    for (let i = 0; i < 7; i++) {
      days.push(
        <SidebarItem
        key={`sidebar-day-${i + 1}`}
          label={`Day ${i + 1}`}
          selectedItem={selectedMenuItem}
          onClick={setSelectedMenuItem}
        />
      );
    }
    return days;
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
