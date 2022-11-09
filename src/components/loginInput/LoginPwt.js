import React from "react";
import { TextField } from "@material-ui/core";

import { Controller, useFormContext } from "react-hook-form";

function LoginPwt(props) {
  const { control } = useFormContext();

  const { name, lable, errors, ...others } = props;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          {...field}
          {...others}
          fullWidth
          required
        />
      )}
    />
  );
}

export default LoginPwt;
