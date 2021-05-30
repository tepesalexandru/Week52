import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    taskRoot: {
      display: "flex",
      justifyContent: "flex-end",
    },
    taskBody: {
      background: theme.palette.secondary.main,
      padding: "12px 24px",
      margin: "8px 0",
      color: theme.palette.secondary.contrastText,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "95%",
    },
    noteIcon: {
      opacity: 0.65,
      cursor: "pointer",
      marginLeft: 12,
      "&:hover": {
        opacity: 1,
      },
    },
    tasksRemainingCount: {
      marginLeft: 18,
      color: "rgba(255, 255, 255, 0.56)",
    },
  })
);
