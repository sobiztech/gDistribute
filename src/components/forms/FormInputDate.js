import * as React from "react";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

function FormInputDate(props) {
  const { control } = useFormContext();

  const { name, lable,errors, ...others } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DesktopDatePicker
            {...others}
            label={lable}
            {...field}
            inputFormat="dd/MM/yyyy"
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
        )}
        rules={{ required: errors }}
      />
    </LocalizationProvider>
  );
}

export default FormInputDate;
