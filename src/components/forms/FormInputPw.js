import React from "react";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

function FormInputPw(props) {
  const { control } = useFormContext();
  const [values, setValues] = React.useState({
    showPassword: false
  });
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { name, lable,errors, ...others } = props;
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };
 
 
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <FormControl variant="outlined" {...others} error={!!error} 
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            {...field}
            // id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={field.value}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
         <FormHelperText>{error ? error.message : null}</FormHelperText>

        </FormControl>
      )}
      rules={{ required: errors }}
    />
  );
}

export default FormInputPw;
