import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: "calc(100vh - 68px)",
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
