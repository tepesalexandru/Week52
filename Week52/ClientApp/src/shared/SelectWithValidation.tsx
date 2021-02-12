import React, { ReactElement } from "react";
import { useStyles } from "./InputStyles";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Controller } from "react-hook-form";
import { capitalize, getIcon, getLabel } from "./InputHelpers";

interface Props {
  placeholder?: string;
  icon?: any;
  name: string;
  values: any;
  disableNone?: boolean;
  label?: string;
  defaultValue?: string;
  width?: number;
  type?: string;
  formHook: any;
  customErrors?: any;
  onChange?: any;
  validation?: {
    required?: boolean;
    pattern?: RegExp;
    maxLength?: number;
    minLength?: number;
  };
}

export default function InputWithValidation(props: Props): ReactElement {
  const classes = useStyles(props);

  return (
    <div>
      <Grid
        container
        item
        spacing={1}
        alignItems="flex-end"
        className={classes.inputContainer}
      >
        {getIcon(props)}
        <Grid item className={classes.flex1}>
          <FormControl className={classes.select}>
            <InputLabel
              id="profession-label"
              color="primary"
              style={{ color: "white" }}
            >
              {getLabel(props)}
            </InputLabel>
            <Controller
              control={props.formHook.control}
              rules={props.validation}
              name={props.name}
              required
              defaultValue={props.defaultValue || ""}
              render={({ ref, onChange, value }) => (
                <Select
                  labelId="profession-label"
                  id="select-with-icon-grid"
                  label={`${capitalize(props.name)}`}
                  inputRef={ref}
                  required={true}
                  inputProps={{
                    className: classes.label,
                  }}
                  color="primary"
                  //   className={classes.select}
                  onChange={(e: any) => {
                    onChange(e.target.value);
                    if (props.onChange) {
                      props.onChange(e.target.value);
                    }
                  }}
                  value={value}
                >
                  {!props.disableNone && (
                    <MenuItem value="" selected>
                      <em>None</em>
                    </MenuItem>
                  )}
                  {props.values.map((value: any) => {
                    return (
                      <MenuItem key={value.id} value={value.id}>
                        {value.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}
