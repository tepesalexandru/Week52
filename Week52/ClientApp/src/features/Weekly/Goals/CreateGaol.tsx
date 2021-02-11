import { Button, TextField } from "@material-ui/core";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import InputWithValidation from "../../../shared/InputWithValidation";
import { createTask } from "./taskService";
import { Goal } from "./weeklyGoalsSlice";
import { makeStyles } from "@material-ui/core";
import { createGoal } from "./goalService";

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

export default function CreateGoal({}: Props): ReactElement {
  const history = useHistory();
  const formHook = useForm<Goal>();
  const classes = useStyles();
  const onSubmit = (formValues: Goal) => {
    createGoal(formValues).then(history.goBack);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <p className={classes.title}>Create a goal</p>
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
