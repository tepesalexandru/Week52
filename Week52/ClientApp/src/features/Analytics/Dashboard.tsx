import { Chip, Theme, makeStyles } from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../app/store";
import { Tag } from "../../shared/Interfaces";
import { getTags } from "../Weekly/Services/tagService";
import CreateTag from "./CreateTag";
import { _getTags } from "./slices/analyticSlice";

interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: "0 60px",
    paddingTop: 14,
  },
  chip: {
    color: "white",
    fontWeight: "bold",
    marginRight: 14,
  },
}));

export default function Dashboard({}: Props): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  //   const [tags, setTags] = useState<Tag[]>([]);
  const tags =
    useSelector((state: ApplicationState) => state.analytics.tags) || [];
  const userId = useSelector(
    (state: ApplicationState) => state.metadata.userId
  );
  useEffect(() => {
    dispatch(_getTags(userId));
  }, []);

  const renderTags = () => {
    return tags.map((tag: Tag) => {
      return (
        <Chip
          key={`tag-${tag.name}`}
          label={tag.name}
          variant="outlined"
          className={classes.chip}
          style={{
            backgroundColor: tag.color,
          }}
        />
      );
    });
  };

  return (
    <div className={classes.root}>
      <CreateTag />
      <p style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>
        Your Tags:
      </p>
      {renderTags()}
    </div>
  );
}
