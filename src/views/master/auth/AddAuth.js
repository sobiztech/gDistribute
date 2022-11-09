import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import HeaderAdd from "../../../components/header/HeaderAdd";
import { GridStyle } from "../../../components/Style";
import { NAVIGATION } from "../../../utils/Paths";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FormInputLongText, FormInputText } from "../../../components/forms";
import { GETAPI } from "../../../api/getApi";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
function AddAuth() {
  const history = useHistory();
  const [dublicate, setdublicate] = useState("");
  const formSchema = Yup.object().shape({
    role_name: Yup.string().required("Role is mendatory"),
    description: Yup.string().required("Discription is mendatory")
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const methods = useForm(formOptions);
  const { errors } = methods.formState;

  const [allvalue, setallvalue] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    if (typeof id !== "undefined") {
      axios
        .get(`http://localhost:5000/master/role/${id}`)
        .then((response) => {
          console.log(response.data.roles);
          setallvalue(response.data.roles);
          methods.reset({
            role_name: id ? response.data.roles.role_name : "",
            description: id ? response.data.roles.description : ""
          });
        })
        .catch((error) => {
          // console.log(error.message);
        });
    }
    console.log(typeof id === "undefined");
  }, []);

  const onSubmit = (data) => {
    if (typeof id === "undefined") {
      axios
        .post("http://localhost:5000/master/role", data)
        .then((response) => {
          if (response.data.status === 1) {
            methods.reset();
            setdublicate("");
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.data.error.code === "ER_DUP_ENTRY") {
              setdublicate("THis Role Already exist");
            }
          }
        });
    } else {
      axios
        .patch(`http://localhost:5000/master/role/${id}`, data)
        .then((response) => {
          if (response.data.status === 1) {
            methods.reset();
            setdublicate("");
            history.goBack();
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.data.error.code === "ER_DUP_ENTRY") {
              setdublicate("THis Role Already exist");
            }
          }
        });
    }
  };
  return (
    <div style={{ padding: "0px" }}>
      <HeaderAdd
        btn="BACK"
        name={
          typeof id === "undefined" ? NAVIGATION.ADDAUTH : NAVIGATION.EDITAUTH
        }
        to={NAVIGATION.AUTH}
      />
      <Card sx={{ maxWidth: "100%", minHeight: "100vh" }}>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <GridStyle>
                <FormInputText
                  name="name"
                  lable="path Name"
                  errors={errors.role_name?.message || dublicate}
                />
                <FormInputText
                  name="path"
                  lable="path"
                  errors={errors.role_name?.message}
                />
                <FormInputText
                  name="color"
                  lable="color"
                  errors={errors.role_name?.message}
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

export default AddAuth;
