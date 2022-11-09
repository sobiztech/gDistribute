import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import HeaderAdd from "../../../components/header/HeaderAdd";
import { GridStyle } from "../../../components/Style";
import { NAVIGATION } from "../../../utils/Paths";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  FormInputDate,
  FormInputEmail,
  FormInputLongText,
  FormInputNumber,
  FormInputPw,
  FormInputSelect,
  FormInputText
} from "../../../components/forms";
import { GETAPI } from "../../../api/getApi";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import useToken from "../../../components/App/useToken";
function AddEmployee() {
  const history = useHistory();
  const gender = [
    { value: "male", name: "male" },
    { value: "Female", name: "Female" }
  ];
  const { token } = useToken();

  const [dublicate, setdublicate] = useState("");
  // yub validation
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is mendatory")
      .min(3, "Password must be at 3 char long"),
    confirmPwd: Yup.string()
      .required("Password is mendatory")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
    employee_first_name: Yup.string().required("First Name is mendatory"),
    employee_sur_name: Yup.string().required("Last Name is mendatory"),
    employee_number: Yup.number().required("Password is mendatory"),
    branch_id: Yup.number().required("Password is mendatory"),
    date_of_birth: Yup.date().required("Password is mendatory"),
    gender: Yup.string().required("Gender is mendatory"),
    nic: Yup.string().required("Nic number  is mendatory"),
    address: Yup.string().required("Address is mendatory"),
    phone_number: Yup.number().required("Address is mendatory"),
    email: Yup.string().required("Address is mendatory"),
    address: Yup.string().required("Address is mendatory"),
    employee_number: Yup.number().required("Phone Number is mendatory"),
    contract_start_date: Yup.date().required("Date is mendatory"),
    contract_end_date: Yup.date().required("Date is mendatory"),
    description: Yup.string().required("Date is mendatory"),
    role_id: Yup.number().required("Password is mendatory")
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const methods = useForm(formOptions);
  const { errors } = methods.formState;

  const [allvalue, setallvalue] = useState([]);
  const [scale, setscale] = useState([]);
  const [branch, setbranch] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    getScale();

    if (typeof id !== "undefined") {
      axios
        .get(`http://localhost:5000/master/employee/${id}`)
        .then((response) => {
          console.log(response.data.employee);
          setallvalue(response.data);
          methods.reset({
            employee_first_name: response.data.employee.employee_first_name,
            employee_sur_name: response.data.employee.employee_sur_name,
            employee_number: response.data.employee.employee_number,
            role_id: response.data.employee.role_id,
            branch_id: response.data.employee.branch_id,
            date_of_birth: response.data.employee.date_of_birth,
            gender: response.data.employee.gender,
            nic: response.data.employee.nic,
            phone_number: response.data.employee.phone_number,
            email: response.data.employee.email,
            address: response.data.employee.address,
            // image: response.data.employee.image,
            contract_start_date: response.data.employee.contract_start_date,
            contract_end_date: response.data.employee.contract_end_date,
            description: response.data.employee.description
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    // console.log(typeof id !== "undefined");
  }, []);

  function getScale() {
    axios
      .get(`http://localhost:5000/master/roles`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        setscale(response.data.roles);
      })
      .catch((error) => {
        console.log(error.message);
      });
    axios
      .get(`http://localhost:5000/properties/branches`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        setbranch(response.data.branches);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  const onSubmit = (data) => {
    console.log(data);
    if (typeof id === "undefined") {
      axios
        .post("http://localhost:5000/master/employee", data, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.status === 1) {
            methods.reset();
            setdublicate("");
          }
        })
        .catch((error) => {
          console.log(error.response.data.error);
          if (error.response) {
            if (error.response.data.error.code === "ER_DUP_ENTRY") {
              setdublicate("THis Role Already exist");
            }
          }
        });
    } else {
      axios
        .patch(`http://localhost:5000/master/employee/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          if (response.data.status === 1) {
            methods.reset();
            setdublicate("");
            history.goBack();
          }
        })
        .catch((error) => {
          console.log(error.response.data.error);
          if (error.response) {
            if (error.response.data.error.code === "ER_DUP_ENTRY") {
              setdublicate("THis Role Already exist");
            }
          }
        });
    }
  };
  const itemss = [
    {
      name: "kkalistan",
      value: "1"
    },
    {
      name: "listan",
      value: "2"
    }
  ];
  return (
    <div style={{ padding: "0px" }}>
      <HeaderAdd
        btn="BACK"
        name={
          typeof id === "undefined"
            ? NAVIGATION.ADDDEPARTMENT
            : NAVIGATION.EDITDEPARTMENT
        }
        to={NAVIGATION.DEPARTMENT}
      />
      <Card sx={{ maxWidth: "100%", minHeight: "100vh" }}>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <GridStyle>
                <FormInputText name="employee_first_name" lable="First Name" />
                <FormInputText name="employee_sur_name" lable="Last Name" />
                <FormInputNumber
                  name="employee_number"
                  lable="employee Number"
                />

                <FormInputSelect name="role_id" lable="ROLE" item={scale} />
                <FormInputSelect
                  name="branch_id"
                  lable="branch"
                  item={branch}
                />

                <FormInputDate name="date_of_birth" lable="DOB" />
                <FormInputSelect name="gender" lable="Gender" item={gender} />
                <FormInputText name="nic" lable="nic" />
                <FormInputNumber name="phone_number" lable="phone number" />
                <FormInputEmail name="email" lable="email" />
                <FormInputLongText name="address" lable="address" />
                <FormInputLongText name="image" lable="image" />
                <FormInputDate name="contract_start_date" lable="start dat" />
                <FormInputDate
                  name="contract_end_date"
                  lable="contract_end_date"
                />
                <FormInputLongText name="description" lable="description" />

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
