import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      width: "100%"
    },
    summary: {
      background: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    details: {
      background: "#121212",
      padding: "8px 0px",
      display: "block !important",
    },
    expandIcon: {
      color: "#fff",
    },
    content: {
      margin: 0
    }
  })
);
