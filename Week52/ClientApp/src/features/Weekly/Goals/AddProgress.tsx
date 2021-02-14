import { Button, TextField } from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import InputWithValidation from "../../../shared/InputWithValidation";
import { createTask } from "../Services/taskService";
import { makeStyles } from "@material-ui/core";
import { ApplicationState } from "../../../app/store";
import { useSelector } from "react-redux";
import SelectWithValidation from "../../../shared/SelectWithValidation";
import { getTasksForGoal } from "../Services/lookupService";
import { Goal, Task, Week } from "../../../shared/Interfaces";
import { addProgress, getWeek } from "../Services/weekService";

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
    "& > div": {
      marginBottom: 8,
    },
  },
}));

interface Props {}

export default function AddProgress({}: Props): ReactElement {
  const history = useHistory();
  const formHook = useForm<Task>();
  const currentWeek = useSelector(
    (state: ApplicationState) => state.metadata.currentWeek
  );
  const [goals, setGoals] = useState<Goal[]>([]);
  const [tasks, setTasks] = useState([]);
  const classes = useStyles();
  const onSubmit = (formValues: { taskId: string; minutes: number }) => {
    // addProgress(formValues.taskId, formValues.minutes).then(history.goBack);
  };

  useEffect(() => {
    const fetchGoals = async () => {
      const week: Week = await getWeek(currentWeek);
      setGoals(week.goals);
    };
    fetchGoals();
  }, [currentWeek]);

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasksForGoal(formHook.getValues("goalId"));
      setTasks(fetchedTasks);
    };
    fetchTasks();
  }, [formHook.watch("goalId")]);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <p className={classes.title}>Add Progress</p>
        <div className={classes.inputsContainer}>
          <SelectWithValidation
            formHook={formHook}
            name="goalId"
            label="goal"
            values={goals}
            defaultValue={""}
          />
          <SelectWithValidation
            formHook={formHook}
            name="taskId"
            label="task"
            values={tasks}
          />
          <InputWithValidation
            formHook={formHook}
            name="minutes"
            type="number"
          />
        </div>
        <Button
          color="primary"
          variant="contained"
          onClick={formHook.handleSubmit(onSubmit)}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
