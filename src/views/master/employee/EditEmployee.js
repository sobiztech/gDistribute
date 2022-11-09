import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import HeaderAdd from "../../../components/header/HeaderAdd";
import { GridStyle } from "../../../components/Style";
import { NAVIGATION } from "../../../utils/Paths";
import {
  FormInputDate,
  FormInputNumber,
  FormInputPw,
  FormInputSelect,
  FormInputText
} from "../../../components/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

function AddEmployee() {
  const onSubmit = (data) => console.log(data);
  const gender = [
    { value: "male", name: "male" },
    { value: "Female", name: "Female" }
  ];
  const role = [
    { value: "Manager", name: "Manager" },
    { value: "Staff", name: "Staff" }
  ];
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is mendatory")
      .min(3, "Password must be at 3 char long"),
    confirmPwd: Yup.string()
      .required("Password is mendatory")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
    FirstName: Yup.string().required("First Name is mendatory"),
    LastName: Yup.string().required("Last Name is mendatory"),
    NicNumber: Yup.string().required("Nic number  is mendatory"),
    address: Yup.string().required("Address is mendatory"),
    date: Yup.string().required("Date is mendatory"),
    gender: Yup.string().required("Gender is mendatory"),
    phonenumber: Yup.string().required("Phone Number is mendatory"),
    role: Yup.string().required("Password is mendatory")
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const methods = useForm(formOptions);
  const { errors } = methods.formState;

  return (
    <div style={{ padding: "0px" }}>
      <HeaderAdd
        btn="BACK"
        name={NAVIGATION.ADDEMPLOYEE}
        to={NAVIGATION.EMPLOYEE}
      />
      <Card sx={{ maxWidth: "100%", minHeight: "100vh" }}>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <GridStyle>
                <FormInputText
                  name="FirstName"
                  lable="First Name"
                  errors={errors.password?.message}
                />
                <FormInputText
                  name="LastName"
                  lable="Last Name"
                  errors={errors.password?.message}
                />
                <FormInputText
                  name="NicNumber"
                  lable="NIC Number"
                  errors={errors.password?.message}
                />
                <FormInputText
                  name="address"
                  lable="Address"
                  errors={errors.password?.message}
                />
                <FormInputDate
                  name="date"
                  lable="DOB"
                  errors={errors.password?.message}
                />
                <FormInputSelect
                  name="gender"
                  lable="Gender"
                  item={gender}
                  errors={errors.password?.message}
                />
                <FormInputSelect
                  name="role"
                  lable="ROLE"
                  item={role}
                  errors={errors.password?.message}
                />
                <FormInputNumber
                  name="phonenumber"
                  lable="Phone Number"
                  errors={errors.password?.message}
                />
                <FormInputPw
                  name="password"
                  lable="password"
                  errors={errors.password?.message}
                />
                <FormInputPw
                  name="confirmPwd"
                  lable="Confirm Password"
                  errors={errors.confirmPwd?.message}
                />
              </GridStyle>
              <CardActions style={{ display: "flex", justifyContent: "end" }}>
                <Button
                  size="mdium"
                  variant="contained"
                  color="primary"
                  style={{ width: "100%" }}
                  type="submit"
                >
                  SAVE
                </Button>
              </CardActions>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddEmployee;
