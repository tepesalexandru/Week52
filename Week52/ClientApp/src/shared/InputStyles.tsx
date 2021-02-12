import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "fit-content",
    width: (props: any) => props.width || "100%",
    display: (props: any) => {
      if (props.invisible) return 'none';
    }
  },
  errorMessage: {
    color: "#f00",
  },
  inputContainer: {
    width: (props: any) => props.width || 300,
    // padding: "0 12px 14px",
    // background: "#F5F5F5",
    // borderRadius: 12,
    // "& svg": {
    //   height: 29,
    // },
  },
  input: {
    background: "#F5F5F5",
    appearance: "none",
    border: "none",
    fontFamily: "Raleway",
    width: "100%",
    marginLeft: 12,
    "&:focus": {
      outline: "none",
    },
  },
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
  iconContainer: {
    padding: "8px !important",
  },
  redBorder: {
    border: "2px solid red",
  },
  flex1: {
    flex: 1,
    width: 'inherit'
  },
  textField: {
    width: "100%",
  },
  error: {
    height: "fit-content",
    marginTop: 4,
  },
  select: {
    width: "100%",
    // "&:focus": {
    //   background: "#f5f5f5",
    // },
  },
  label: {
    color: theme.palette.secondary.contrastText,
  }
}));
