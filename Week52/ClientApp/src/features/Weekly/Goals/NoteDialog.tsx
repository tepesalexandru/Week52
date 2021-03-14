import React, { ReactElement } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import NoteIcon from "@material-ui/icons/Info";
import { TextField, Tooltip } from "@material-ui/core";
import { Task } from "../../../shared/Interfaces";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { _updateNote } from "../Slices/weekSlice";

interface Props {
  task: Task;
}

export default function NoteDialog(props: Props): ReactElement {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const formHook = useForm();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (formValues: { note: string }) => {
    dispatch(_updateNote({ taskId: props.task.id, note: formValues.note }));
    handleClose();
  };

  return (
    <React.Fragment>
      <Tooltip title={props.task.note || "Click to add note"}>
        <span onClick={handleClickOpen}>
          <NoteIcon />
        </span>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">
          {`Edit Your Task's Note`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Controller
              control={formHook.control}
              name="note"
              render={({ ref, onChange }) => (
                <TextField
                  id="standard-multiline-static"
                  multiline
                  rows={6}
                  defaultValue={props.task.note}
                  inputRef={ref}
                  placeholder="Start typing here..."
                  onChange={(e) => onChange(e.target.value)}
                  InputProps={{ disableUnderline: true }}
                  style={{ width: "100%" }}
                />
              )}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={formHook.handleSubmit(onSubmit)}
            color="primary"
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
