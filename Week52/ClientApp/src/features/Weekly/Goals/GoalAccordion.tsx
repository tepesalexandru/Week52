import React from "react";
import { useStyles } from "./Styles/GoalAccordion";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Goal, Tag, Task } from "../../../shared/Interfaces";
import NoteDialog from "./NoteDialog";
import CheckIcon from "@material-ui/icons/CheckCircle";
import TagChip from "../../../shared/TagChip";
import { getAllTaskProgress } from "./Helpers/_taskHelpers";
import { Badge } from "@material-ui/core";

interface Props {
  goal: Goal;
}

export default function GoalAccordion(props: Props) {
  const classes = useStyles();

  const renderCompletedMark = (dayCompleted: number) => {
    if (dayCompleted > 0)
      return <CheckIcon style={{ fill: "#6D9F71", marginLeft: 12 }} />;
    return <div style={{ marginLeft: 12 }}></div>;
  };

  const renderNoteIcon = (task: Task) => {
    return <NoteDialog task={task} />;
  };

  const renderTags = (task: Task) => {
    return task.tags.map((tag: Tag) => {
      return (
        <TagChip
          key={`${task.id}-${tag.id}`}
          color={tag.color}
          name={tag.name}
          styles={{ margin: "0 8px" }}
        />
      );
    });
  };

  const renderTasks = () => {
    return props.goal.tasks.map((task: Task) => {
      return (
        <div key={task.id} className={classes.taskRoot}>
          <div className={classes.taskBody}>
            <div>
              <span>{task.name}</span>
              <span className={classes.noteIcon}>{renderNoteIcon(task)}</span>
              {renderTags(task)}
            </div>
            <div>
              <span>
                {getAllTaskProgress(task)} / {task.estimation} minutes
              </span>
              {renderCompletedMark(task.dayCompleted)}
            </div>
          </div>
        </div>
      );
    });
  };

  const countCompletedTasks = (): number => {
    return props.goal.tasks.filter((x: Task) => x.dayCompleted > 0).length;
  };

  return (
    <Accordion style={{ boxShadow: "none" }}>
      <Badge
        color="primary"
        badgeContent={props.goal.tasks.length - countCompletedTasks()}
        style={{ width: "100%" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        showZero={false}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          classes={{ root: classes.summary, expandIcon: classes.expandIcon }}
        >
          <Typography className={classes.heading}>{props.goal.name}</Typography>
        </AccordionSummary>
      </Badge>
      <AccordionDetails classes={{ root: classes.details }}>
        {renderTasks()}
      </AccordionDetails>
    </Accordion>
  );
}
