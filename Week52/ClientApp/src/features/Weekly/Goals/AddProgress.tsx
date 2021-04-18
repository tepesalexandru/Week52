import { Button } from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputWithValidation from "../../../shared/InputWithValidation";
import { useDispatch } from "react-redux";
import SelectWithValidation from "../../../shared/SelectWithValidation";
import { Goal, Progress, Task } from "../../../shared/Interfaces";
import { _addProgress, _completeTask } from "../Slices/weekSlice";
import { useStyles, MainCheckbox } from "./Styles/AddProgressStyles";

interface Props {
  goals: Goal[];
  onClick?: any;
  day: number;
}

export default function AddProgress(props: Props): ReactElement {
  const dispatch = useDispatch();
  const formHook = useForm<Task>();
  const [tasks, setTasks] = useState([]);
  const classes = useStyles();
  const onSubmit = (formValues: Progress) => {
    dispatch(
      _addProgress({
        day: props.day,
        minutes: +formValues.minutes,
        taskId: formValues.taskId,
      })
    );
    if (formHook.getValues("complete") === true) {
      dispatch(_completeTask({ taskId: formValues.taskId, day: props.day }));
    }
    props.onClick();
  };

  useEffect(() => {
    const goalId = formHook.getValues("goalId");
    const foundGoal: any = props.goals.find((x) => x.id === goalId);
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
            values={props.goals}
            defaultValue={""}
            validation={{ required: true }}
          />
          <SelectWithValidation
            formHook={formHook}
            name="taskId"
            label="task"
            // values={tasks.filter(
            //   (task: Task) => task.dayCompleted <= props.day
            // )}
            values={tasks}
            validation={{ required: true }}
          />
          <InputWithValidation
            formHook={formHook}
            name="minutes"
            label="Minutes"
            type="number"
            validation={{ required: true }}
          />
          <Controller
            name="complete"
            control={formHook.control}
            render={({ ref, value, onChange }) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                <MainCheckbox
                  title="Mark as completed"
                  checked={value}
                  ref={ref}
                  onChange={(e) => onChange(e.target.checked)}
                />
                <div className={classes.subtitle}>Mark as complete</div>
              </div>
            )}
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
