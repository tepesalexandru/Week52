import { Popover } from "@material-ui/core";
import React, { ReactElement } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Tag } from "../../../shared/Interfaces";
import TagChip from "../../../shared/TagChip";
import { makeStyles } from "@material-ui/core";
import { assignTag } from "../Services/tagService";
import { useDispatch } from "react-redux";
import { _assignTag } from "../Slices/weekSlice";

interface Props {
  allTags: Tag[];
  taskId: string;
}

const useStyles = makeStyles((theme) => ({
  tagsContainer: {
    padding: "12px 24px",
    paddingBottom: 0,
    maxWidth: 400,
    background: theme.palette.secondary.main,
  },
  paperRoot: {
    background: "transparent",
  },
}));

export default function TagTooltip(props: Props): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddTag = (tag: Tag) => {
    dispatch(_assignTag({ taskId: props.taskId, tag }));
  };

  const renderTagPicker = () => {
    return props.allTags.map((tag: Tag) => {
      return (
        <TagChip
          name={tag.name}
          color={tag.color}
          onClick={() => handleAddTag(tag)}
          styles={{ marginBottom: 12, marginRight: 12 }}
        />
      );
    });
  };

  return (
    <div>
      <div style={{ cursor: "pointer" }} onClick={handleClick}>
        <AddIcon />
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        style={{ background: "transparent" }}
        classes={{
          paper: classes.paperRoot,
        }}
      >
        <div className={classes.tagsContainer}>{renderTagPicker()}</div>
      </Popover>
    </div>
  );
}
