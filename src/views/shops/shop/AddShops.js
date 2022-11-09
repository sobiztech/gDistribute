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
  FormInputSelect,
  FormInputText
} from "../../../components/forms";
import { GETAPI } from "../../../api/getApi";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
function AddShops() {
  const history = useHistory();
  const [dublicate, setdublicate] = useState("");
  // yub validation
  const formSchema = Yup.object().shape({
    shop_number: Yup.string().required("category is mendatory"),
    shop_name: Yup.string().required("category is mendatory"),
    shop_registration_number: Yup.string().required("category is mendatory"),
    route_id: Yup.number().required("Role is mendatory"),
    gps_location: Yup.number().required("Role is mendatory"),
    phone_number: Yup.number().required("Role is mendatory"),
    email: Yup.string().email().required("Role is mendatory"),
    address: Yup.string().required("Discription is mendatory"),
    image: Yup.string().required("Discription is mendatory"),
    description: Yup.string().required("Discription is mendatory")
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const methods = useForm(formOptions);
  const { errors } = methods.formState;

  const [allvalue, setallvalue] = useState([]);
  const [scale, setscale] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    getScale();

    if (typeof id !== "undefined") {
      axios
        .get(`http://localhost:5000/shops/shop/${id}`)
        .then((response) => {
          console.log(response.data.shops);
          setallvalue(response.data);
          methods.reset({
            shop_number: response.data.shops.shop_number,
            shop_name: response.data.shops.shop_name,
            shop_registration_number: response.data.shops.shop_registration_number,
            route_id: response.data.shops.route_id,
            gps_location: response.data.shops.gps_location,
            phone_number: response.data.shops.phone_number,
            email: response.data.shops.email,
            address: response.data.shops.address,
            // image: response.data.shops.property_id,
            description: response.data.shops.description
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
      .get(`http://localhost:5000/shops/routes`)
      .then((response) => {
        setscale(response.data.rRoutes);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  const onSubmit = (data) => {
    console.log(data);
    if (typeof id === "undefined") {
      axios
        .post("http://localhost:5000/shops/shop", data)
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
        .patch(`http://localhost:5000/shops/shop/${id}`, data)
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
          typeof id === "undefined" ? NAVIGATION.ADDSHOPS : NAVIGATION.EDITSHOPS
        }
        to={NAVIGATION.SHOPS}
      />
      <Card sx={{ maxWidth: "100%", minHeight: "100vh" }}>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <GridStyle>
                <FormInputText
                  name="shop_number"
                  lable="shop_number "
                  errors={errors.category_name?.message}
                />
                <FormInputText
                  name="shop_name"
                  lable="shop_name "
                  errors={errors.category_name?.message}
                />
                <FormInputText
                  name="shop_registration_number"
                  lable="shop_registration_number"
                  errors={errors.category_name?.message}
                />

                <FormInputSelect
                  name="route_id"
                  lable="route_id"
                  item={scale}
                />
                <FormInputNumber
                  name="phone_number"
                  lable="phone_number "
                  errors={errors.category_name?.message}
                />
                <FormInputEmail
                  name="email"
                  lable="email"
                  errors={errors.category_name?.message}
                />
                <FormInputLongText
                  name="address"
                  lable="address"
                  errors={errors.role_name?.message}
                />
                <FormInputNumber
                  name="gps_location"
                  lable="gps_location"
                  errors={errors.category_name?.message}
                />
                <FormInputText
                  name="image"
                  lable="image"
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

export default AddShops;
