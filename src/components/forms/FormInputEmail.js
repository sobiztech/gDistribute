import React from "react";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

function FormInputEmail(props) {
    const { control } = useFormContext();

    const { name, lable,errors, ...others } = props;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...others}
          label={lable}
          type="email"
          {...field}
          error={!!error}
          helperText={error ? error.message : null}
        />
      )}
      rules={{ required: errors }}
    />
  )
}

export default FormInputEmail