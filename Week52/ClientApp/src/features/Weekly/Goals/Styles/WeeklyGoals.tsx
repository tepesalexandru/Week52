import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  bodyRoot: {
    display: "flex",
  },
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
  },
  view: {
    width: "80%",
    margin: "auto",
    marginTop: 36,
    marginLeft: 30,
    marginRight: 30
  },
  goalRoot: {
    background: theme.palette.secondary.main,
    borderRadius: 12,
    padding: "12px 24px",
    margin: "8px 0",
    color: theme.palette.secondary.contrastText,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskRoot: {
    display: "flex",
    justifyContent: "flex-end",
  },
  taskBody: {
    background: theme.palette.secondary.main,
    borderRadius: 12,
    padding: "12px 24px",
    margin: "8px 0",
    color: theme.palette.secondary.contrastText,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
  },
}));
