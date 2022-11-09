import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import HeaderAdd from "../../../components/header/HeaderAdd";
import { GridStyle } from "../../../components/Style";
import { NAVIGATION } from "../../../utils/Paths";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  FormInputLongText,
  FormInputText
} from "../../../components/forms";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
function AddRoutes() {
  const history = useHistory();
  const [dublicate, setdublicate] = useState("");
  // yub validation
  const formSchema = Yup.object().shape({
    route_name: Yup.string().required("category is mendatory"),
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
        .get(`http://localhost:5000/shops/route/${id}`)
        .then((response) => {
          console.log(response.data);
          setallvalue(response.data);
          methods.reset({
            route_name: response.data.rRoutes.route_name,
            description: response.data.rRoutes.description
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    // console.log(typeof id !== "undefined");
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    if (typeof id === "undefined") {
      axios
        .post("http://localhost:5000/shops/route", data)
        .then((response) => {
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
        .patch(`http://localhost:5000/shops/route/${id}`, data)
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
            ? NAVIGATION.ADDROUTES
            : NAVIGATION.EDITROUTES
        }
        to={NAVIGATION.ROUTES}
      />
      <Card sx={{ maxWidth: "100%", minHeight: "100vh" }}>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <GridStyle>
                <FormInputText
                  name="route_name"
                  lable="ADD Routes "
                  errors={errors.category_name?.message}
                />
                <FormInputLongText
                  name="description"
                  lable="Discription"
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

export default AddRoutes;
