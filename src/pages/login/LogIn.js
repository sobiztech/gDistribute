import React, { useState } from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { LoginEmail, LoginPwt } from "../../components/loginInput";
import axios from "axios";
import useToken from "../../components/App/useToken";
import useEmpId from "../../components/App/useEmpId";
import { useHistory } from "react-router-dom";

const paperStyle = {
  padding: 20,
  height: "auto",
  width: 280,
  margin: "150px auto"
};
const errormsg = {
  color: "red",
  fontFamily: "sans"
};
const btnstyle = { margin: "8px 0" };

const LogIn = () => {
  const {token,setToken } = useToken();
  // const {setEmpId } = useEmpId();
  const methods = useForm();
  const [errormesage, seterrormesage] = useState(false);
  const navigate = useHistory();
  const onSubmit = (data) => {
    axios
    .post("http://localhost:5000/login", data)
    .then((response) => {
      console.log(response.data);
      if(response.data.status===0){
        seterrormesage(true)
      }
      if(response.data.status===1){

      setToken(response.data.token,response.data.empId,response.data.empName)
      methods.reset();
      // return <Redirect to='/dashboard'  />;
      navigate.push('/dashboard')
      }
    })
    .catch((error) => {
      console.log(error);
    });
    console.log(token);

  };
  return (
    <Grid align="center">
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <h2>Sign In to SOBIZTECH</h2>
        </Grid>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <LoginEmail name="email" />
            <LoginPwt name="password" />
            {errormesage && (
              <div style={errormsg}>incorrect email or password </div>
            )}
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
            >
              Sign in
            </Button>
          </form>
        </FormProvider>
      </Paper>
    </Grid>
  );
};

export default LogIn;
