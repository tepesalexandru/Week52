import { Button, TextField } from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import InputWithValidation from "../../../shared/InputWithValidation";
import { createTask } from "../Services/taskService";
import { makeStyles } from "@material-ui/core";
import { ApplicationState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import SelectWithValidation from "../../../shared/SelectWithValidation";
import { getTasksForGoal } from "../Services/lookupService";
import { Day, Goal, Progress, Task, Week } from "../../../shared/Interfaces";
import { addProgress, getWeek } from "../Services/weekService";
import { _addProgress } from "../Slices/weekSlice";

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

interface Props {
  daySelected: Day,
  goals: Goal[],
  onClick?: any;
}

export default function AddProgress(props: Props): ReactElement {
  const history = useHistory();
  const dispatch = useDispatch();
  const formHook = useForm<Task>();
  const currentWeek = useSelector(
    (state: ApplicationState) => state.metadata.currentWeek
  );
  const [goals, setGoals] = useState<Goal[]>(props.goals);
  const [tasks, setTasks] = useState([]);
  const classes = useStyles();
  const onSubmit = (formValues: Progress) => {
    dispatch(_addProgress({dayId: props.daySelected.id, progress:{
      taskId: formValues.taskId,
      goalId: formValues.goalId,
      progress: +formValues.progress
    }}));
    props.onClick();
  };

  useEffect(() => {
    const goalId = formHook.getValues('goalId');
    const foundGoal: any =  props.goals.find(x => x.id === goalId);
    if (foundGoal != null) {
      setTasks(foundGoal.tasks);
    }
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
            name="progress"
            label="Minutes"
            type="number"
          />
        </div>
        <Button
          color="primary"
          variant="contained"
          onClick={formHook.handleSubmit(onSubmit)}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
