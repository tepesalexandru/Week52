import { Chip, makeStyles, Theme } from "@material-ui/core";
import React, { ReactElement } from "react";
import { Tag } from "../../shared/Interfaces";
import CreateTag from "./CreateTag";

interface Props {
  tags: Tag[];
}

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

export default function Tags(props: Props): ReactElement {
  const classes = useStyles();
  const renderTags = () => {
    return props.tags.map((tag: Tag) => {
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
    <div>
      <CreateTag />
      <p style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>
        Your Tags:
      </p>
      {renderTags()}
    </div>
  );
}
