import { TextField } from "@material-ui/core";
import React from "react";
import { Controller,  useFormContext } from "react-hook-form";

function TextFields({ name }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField onChange={onChange} value={value} label={"Text Value"} />
      )}
    />
    // <TextField/>
  );
}

export default TextFields;
