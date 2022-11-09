import React from "react";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext
} from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormHelperText } from "@mui/material";

function FormInputSelect(props) {
  const { control } = useFormContext();

  const { name, lable, errors, item, defaultValue, ...others } = props;
  return (
    <Controller
      control={control}
      defaultValue={defaultValue ? defaultValue : ""}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl {...others} error={!!error}>
          <InputLabel htmlFor="trinity-select">{lable}</InputLabel>
          <Select id="demo-simple-select-helpe" {...field} value={field.value}>
        
            {item.map((person) => (
              <MenuItem key={person.value} value={person.value}>
                {person.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error ? error.message : null}</FormHelperText>
        </FormControl>
      )}
      rules={{ required: errors }}
    />
  );
}

export default FormInputSelect;
