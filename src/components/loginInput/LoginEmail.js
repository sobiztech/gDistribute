import React from "react";
import {TextField } from "@material-ui/core";

import { Controller, useFormContext } from "react-hook-form";

function LoginEmail(props) {
  const { control } = useFormContext();

  const { name, lable, errors, ...others } = props;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <TextField
          label="User Email"
          type="email"
          {...field}
          {...others}
          placeholder="Enter User Id"
          fullWidth
          required
        />
      )}
    />
  );
}

export default LoginEmail;
