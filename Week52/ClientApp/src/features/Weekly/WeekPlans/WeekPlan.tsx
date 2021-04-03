import { Button, Fab, Tooltip } from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { ApplicationState } from "../../../app/store";
import { useStyles } from "./Styles/WeekPlanStyles";
import { Goal, Tag, Task } from "../../../shared/Interfaces";
import {
  _deleteGoal,
  _deleteTask,
  _fetchWeek,
  _removeTag,
} from "../Slices/weekSlice";
import AddIcon from "@material-ui/icons/Add";
import { getTags } from "../Services/tagService";
import TagChip from "../../../shared/TagChip";
import TagTooltip from "./TagTooltip";
import { setNavbarTitle } from "../Slices/metadataSlice";

interface Props {}

export default function WeekPlan({}: Props): ReactElement {
  const dispatch = useDispatch();
  const params: any = useParams();
  const history = useHistory();
  const classes = useStyles();
  const weekNumber = useSelector(
    (state: ApplicationState) => state.metadata.weekSelected
  );
  const userId = useSelector(
    (state: ApplicationState) => state.metadata.userId
  );
  const goals = useSelector((state: ApplicationState) => state.week.goals);
  const [totalMinutes, setTotalMinutes] = useState<number>(0);
  const [totalHours, setTotalHours] = useState<number>(0);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  useEffect(() => {
    dispatch(
      _fetchWeek({
        userId: userId,
        weekNumber: weekNumber || params.weekNumber,
      })
    );
    getTags(userId).then((data: Tag[]) => {
      setAllTags(data);
    });
  }, [userId]);

  useEffect(() => {
    let neededMinutes = 0;
    goals.map((goal: Goal) => {
      goal.tasks.map((task: Task) => {
        neededMinutes += task.estimation;
      });
    });
    setTotalMinutes(neededMinutes);
    setTotalHours(+(neededMinutes / 60).toFixed(2));
  }, [JSON.stringify(goals)]);

  useEffect(() => {
    dispatch(
      setNavbarTitle({
        title: `Week ${weekNumber} - ${totalMinutes} minutes (${totalHours} hours)`,
      })
    );
  }, [totalMinutes]);

  const renderAddTag = (task: Task) => {
    return <TagTooltip allTags={allTags} taskId={task.id} />;
  };

  const renderTags = (task: Task) => {
    return task.tags.map((tag: Tag) => {
      return (
        <TagChip
          key={`${task.id}-${tag.id}`}
          color={tag.color}
          name={tag.name}
          styles={{ margin: "0 8px" }}
          onDelete={() => {
            dispatch(_removeTag({ taskId: task.id, tag: tag }));
          }}
        />
      );
    });
  };

  const renderTasks = (tasks: Task[]) => {
    return tasks.map((task) => {
      return (
        <div key={task.id} className={classes.taskRoot}>
          <div className={classes.taskBody}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>{task.name}</span>
              {renderTags(task)}
              {renderAddTag(task)}
            </div>
            <div>
              <span>{task.estimation} minutes</span>
              <Button
                variant="contained"
                color="primary"
                onClick={() => dispatch(_deleteTask(task.id))}
                style={{ marginLeft: 16 }}
              >
                Delete Task
              </Button>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderGoals = () => {
    return goals.map((goal: Goal) => {
      return (
        <React.Fragment key={goal.id}>
          <div className={classes.goalRoot}>
            <span>{goal.name}</span>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push(`/create-task/${goal.id}`)}
              >
                Add Task
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => dispatch(_deleteGoal(goal.id))}
                style={{ marginLeft: 16 }}
              >
                Delete Goal
              </Button>
            </div>
          </div>
          {renderTasks(goal.tasks)}
        </React.Fragment>
      );
    });
  };

  return (
    <div style={{ marginTop: 24 }}>
      <div className={classes.body}>{renderGoals()}</div>
      <div
        style={{ position: "fixed", bottom: 24, right: 24 }}
        onClick={() => history.push("/create-goal")}
      >
        <Tooltip title="Add Goal">
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
    </div>
  );
}
