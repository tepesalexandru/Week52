import { Button, TextField } from "@material-ui/core";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import InputWithValidation from "../../../shared/InputWithValidation";
import { createTask } from "../Services/taskService";
import { makeStyles } from "@material-ui/core";
import { Task } from "../../../shared/Interfaces";

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
    margin: 'auto',
    padding: "36px 48px",
    borderRadius: 12,
  },
  inputsContainer: {
    marginBottom: 24,
  },
}));

interface Props {}

export default function CreateTask({}: Props): ReactElement {
  const history = useHistory();
  const params: any = useParams();
  const formHook = useForm<Task>();
  const classes = useStyles();
  const onSubmit = (formValues: Task) => {
    createTask(params.id, formValues).then(history.goBack);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <p className={classes.title}>Create a task</p>
        <div className={classes.inputsContainer}>
          <InputWithValidation
            formHook={formHook}
            name="name"
            validation={{ required: true }}
          />
          <InputWithValidation
            formHook={formHook}
            name="estimation"
            type="number"
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
