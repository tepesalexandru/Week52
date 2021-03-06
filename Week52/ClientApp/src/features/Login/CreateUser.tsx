import React, { ReactElement } from "react";
import { Button, makeStyles } from "@material-ui/core";
import InputWithValidation from "../../shared/InputWithValidation";
import { useForm } from "react-hook-form";
import { createUser } from "./userService";
import { User } from "../../shared/Interfaces";
import { useHistory } from "react-router";

interface Props {}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.palette.secondary.contrastText,
  },
  container: {
    background: theme.palette.secondary.main,
    width: "80%",
    margin: "auto",
    padding: "36px 48px",
    borderRadius: 12,
  },
  inputsContainer: {
    marginBottom: 24,
  },
}));

export default function CreateUser({}: Props): ReactElement {
  const classes = useStyles();
  const formHook = useForm<User>();
  const history = useHistory();

  const onSubmit = (formValues: User) => {
    console.log(formValues);
    createUser(formValues.name).then(history.goBack);
  } 

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <p className={classes.title}>Create a user</p>
        <div className={classes.inputsContainer}>
          <InputWithValidation
            formHook={formHook}
            name="name"
            validation={{ required: true }}
          />
        </div>
        <Button
          color="primary"
          variant="contained"
          onClick={formHook.handleSubmit(onSubmit)}
        >
          Create
        </Button>
      </div>
    </div>
  );
}
