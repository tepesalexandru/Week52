import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "./Drawer";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../app/store";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Menu, MenuItem } from "@material-ui/core";
import { logout } from "../app/auth/authSlice";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    userContainer: {
      display: "flex",
      alignItems: "center",
      fontWeight: 400,
    },
  })
);

export default function MenuAppBar(props: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state: ApplicationState) => state.auth?.user);
  const [auth, setAuth] = React.useState(true);
  const navbarTitle = useSelector(
    (state: ApplicationState) => state.metadata.navbarTitle
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOutClick = () => {
    dispatch(logout());
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Drawer />
          <Typography variant="h6" className={classes.title}>
            {navbarTitle}
          </Typography>
          {auth && (
            <div className={classes.userContainer}>
              {user?.username || ""}
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogOutClick}>Log out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
