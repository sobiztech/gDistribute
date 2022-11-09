import React from "react";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

function FormInputText(props) {
  const { control } = useFormContext();

  const { name, lable, errors, defaultValue, ...others } = props;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ? defaultValue : ""}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...others}
          label={lable}
          type="text"
          {...field}
          error={!!error}
          helperText={error ? error.message : null}
        />
      )}
      rules={{ required: errors }}
    />
  );
}

export default FormInputText;
