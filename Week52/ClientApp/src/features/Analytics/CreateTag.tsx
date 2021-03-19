import React, { ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Tag } from "../../shared/Interfaces";
import { ApplicationState } from "../../app/store";
import { createTag } from "../Weekly/Services/tagService";
import InputWithValidation from "../../shared/InputWithValidation";
import { CirclePicker } from "react-color";
import { Button, Chip, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { _createTag } from "./slices/analyticSlice";

interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    padding: 36,
    display: "flex",
    width: "70%",
    margin: "auto",
  },
  section: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  colorPicker: {
    margin: "16px 0",
  },
}));

export default function CreateTag({}: Props): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const formHook = useForm();
  const [colorPicked, setColorPicked] = useState<string>("");
  const [tagLabel, setTagLabel] = useState<string>("");
  const userId = useSelector(
    (state: ApplicationState) => state.metadata.userId
  );

  useEffect(() => {
    setTagLabel(formHook.getValues("name"));
  }, [formHook.watch("name")]);

  const onSubmit = (formValues: Tag) => {
    if (!colorPicked) return;
    dispatch(_createTag({ ...formValues, color: colorPicked, userId }));
    formHook.reset();
    setColorPicked("");
  };

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <InputWithValidation
          formHook={formHook}
          name="name"
          validation={{ required: true }}
        />
        <div className={classes.colorPicker}>
          <CirclePicker
            onChange={(color, event) => setColorPicked(color.hex)}
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
      <div className={classes.section}>
        {/* Tag preview */}
        <p style={{ color: "white" }}>Tag Preview</p>
        <Chip
          label={tagLabel}
          variant="outlined"
          style={{
            backgroundColor: colorPicked,
            color: "white",
            fontWeight: "bold",
          }}
        />
      </div>
    </div>
  );
}
