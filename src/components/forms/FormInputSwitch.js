import React, { useState } from "react";
import { useForm, Controller, useFormContext } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

function FormInputSwitch(props) {
  const { control } = useFormContext();
  const { name, checked, lable, errors, item, defaultValue, ...others } = props;

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          defaultValue={checked ? (checked === "true" ? true : false) : false}
          control={control}
          render={({ field }) => <Switch {...field} checked={field.value} />}
        />
      }
      {...others}
    />
  );
}

export default FormInputSwitch;
