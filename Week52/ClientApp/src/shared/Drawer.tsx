import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import MenuIcon from "@material-ui/icons/Menu";
import SidebarItem from "../features/Weekly/Goals/SidebarItem";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  setDaySelected,
  setNavbarTitle,
} from "../features/Weekly/Slices/metadataSlice";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  sidebarHeader: {
    padding: "6px 24px",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 0,
  },
});

type Anchor = "top" | "left" | "bottom" | "right";

export default function TemporaryDrawer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const changeNavigationBarTitleTo = (newTitle: string) => {
    dispatch(setNavbarTitle({ title: newTitle }));
  };
  const selectDay = (ref: any, dayNumber: number) => {
    dispatch(setDaySelected(dayNumber));
    dispatch(setNavbarTitle({ title: `Week Overview - Day ${dayNumber}` }));
    history.push(`/week/day/${dayNumber}`);
  };
  const renderDays = () => {
    return [1, 2, 3, 4, 5, 6, 7].map((day: number) => {
      return (
        <SidebarItem
          key={`day-${day}`}
          onClick={(ref: any) => selectDay(ref, day)}
          label={`Day ${day}`}
        />
      );
    });
  };

  const navigateAndUpdateNavigationBarTitle = (
    destination: string,
    newTitle: string
  ) => {
    dispatch(setNavbarTitle({ title: newTitle }));
    history.push(destination);
  };

  const renderWeekOverviewItems = () => {
    return (
      <React.Fragment>
        <Divider />
        <p className={classes.sidebarHeader}>Week Overview</p>
        {renderDays()}
        <SidebarItem
          label={`Week Report`}
          onClick={() =>
            navigateAndUpdateNavigationBarTitle("/week/report", "Week Report")
          }
        />
        <SidebarItem
          label={`Retrospectives`}
          onClick={() =>
            navigateAndUpdateNavigationBarTitle(
              "/week/retrospective",
              "Week Retrospective"
            )
          }
        />
      </React.Fragment>
    );
  };

  const renderDashboardItems = () => {
    return (
      <React.Fragment>
        <Divider />
        <p className={classes.sidebarHeader}>Dashboard</p>
        <SidebarItem
          label={`Tags`}
          onClick={() =>
            navigateAndUpdateNavigationBarTitle("/dashboard/tags", "Your Tags")
          }
        />
      </React.Fragment>
    );
  };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <p className={classes.sidebarHeader}>General</p>
        <SidebarItem
          label={`Current Week`}
          onClick={() => {
            history.push("/week/overview");
          }}
        />
        <SidebarItem
          label={`Year Overview`}
          onClick={() => {
            history.push("/year-overview");
            changeNavigationBarTitleTo("Year Overview");
          }}
        />
        <SidebarItem
          label={`Analytics`}
          onClick={() => {
            history.push("/dashboard/analytics");
            changeNavigationBarTitleTo("Analytics Dashboard");
          }}
        />
      </List>
      {renderWeekOverviewItems()}
      {renderDashboardItems()}
    </div>
  );

  return (
    <div>
      {(["left"] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
