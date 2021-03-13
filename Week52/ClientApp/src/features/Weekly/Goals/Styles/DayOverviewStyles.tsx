import {
  createStyles,
  makeStyles,
  TableCell,
  TableRow,
  Theme,
  withStyles,
} from "@material-ui/core";

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

export const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

export const useStyles = makeStyles((theme) => ({
  singleProgressRoot: {
    display: "flex",
  },
  progressPieceContainer: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    padding: "8px 50px",
    borderRadius: 12,
    margin: "4px 2px",
  },
  arrowContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    "& svg": {
      height: 45,
      width: 45,
    },
  },
  editModeContainer: {
    marginBottom: 20,
  },
}));
