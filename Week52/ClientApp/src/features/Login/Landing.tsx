import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import SelectWithValidation from "../../shared/SelectWithValidation";
import { Button, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";

interface Props {}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 42,
    marginBottom: 32,
    color: "white",
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 32,
    marginBottom: 16,
    color: "white",
  },
  confirm: {
    marginTop: 32,
  },
});

const users = [
  {
    id: "1",
    name: "Alex",
  },
  {
    id: "2",
    name: "Paula",
  },
];

export default function Landing({}: Props): ReactElement {
  const classes = useStyles();
  const formHook = useForm();
  const history = useHistory();

  const handleSubmit = formHook.handleSubmit((data) => {
    console.log(data);
    history.push("/week");
  });

  return (
    <div className={classes.root}>
      <div className={classes.title}>Welcome to Week52</div>
      <div className={classes.subtitle}>Choose your user</div>

      <SelectWithValidation
        name="user"
        formHook={formHook}
        values={users}
        validation={{ required: true }}
      />
      <Button
        color="primary"
        variant="contained"
        onClick={handleSubmit}
        className={classes.confirm}
      >
        Confirm
      </Button>
    </div>
  );
}
