import React, { ReactElement, useState } from "react";
import SidebarItem from "./SidebarItem";
import { useDispatch } from "react-redux";
import { setDaySelected } from "../Slices/metadataSlice";
import { useHistory } from "react-router";
import { useStyles } from "./Styles/WeekSidebarStyles";

interface Props {}

export default function WeekSidebar({}: Props): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const selectDay = (ref: any, dayNumber: number) => {
    setSelectedMenuItem(ref);
    dispatch(setDaySelected(dayNumber));
    history.push(`/week/day/${dayNumber}`);
  };

  const selectOverview = (ref: any) => {
    setSelectedMenuItem(ref);
    history.push("/week/overview");
  };

  const selectReport = (ref: any) => {
    setSelectedMenuItem(ref);
    history.push("/week/report");
  };

  const selectRetrospectives = (ref: any) => {
    setSelectedMenuItem(ref);
    history.push("/week/retrospectives");
  };

  const renderDays = () => {
    return [1, 2, 3, 4, 5, 6, 7].map((day: number) => {
      return (
        <SidebarItem
          key={`day-${day}`}
          onClick={(ref: any) => selectDay(ref, day)}
          label={`Day ${day}`}
          selectedItem={selectedMenuItem}
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
          onClick={selectOverview}
        />
        <SidebarItem
          label={`Week Report`}
          selectedItem={selectedMenuItem}
          onClick={selectReport}
        />
        <SidebarItem
          label={`Retrospectives`}
          selectedItem={selectedMenuItem}
          onClick={selectRetrospectives}
        />
      </div>
    </div>
  );
}
