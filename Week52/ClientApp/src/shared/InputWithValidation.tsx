import { TextField } from "@material-ui/core";
import React, { ReactElement } from "react";
import { Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  inputField: {
    margin: "4px 0",
    width: 300,
  },
  label: {
    color: theme.palette.secondary.contrastText,
  },
  input: {
    color: theme.palette.secondary.contrastText,
  },
}));

interface Props {
  name: string;
  formHook: any;
  type?: string;
  label?: string;
  validation?: {
    required?: boolean;
    pattern?: RegExp;
    maxLength?: number;
    minLength?: number;
  };
}

export default function InputWithValidation(props: Props): ReactElement {
  const classes = useStyles();
  const capitalize = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const getLabel = () => {
    if (props.label) return capitalize(props.label);
    return capitalize(props.name);
  };

  return (
    <Controller
      control={props.formHook.control}
      name={props.name}
      rules={props.validation}
      render={({ ref, value, onChange }) => (
        <TextField
          label={getLabel()}
          inputRef={ref}
          color="primary"
          InputLabelProps={{
            className: classes.label,
          }}
          inputProps={{
            className: classes.input,
          }}
          className={classes.inputField}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={props.type || "text"}
        />
      )}
    />
  );
}
