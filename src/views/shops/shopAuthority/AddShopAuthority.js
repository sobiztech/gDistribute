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
function AddShopAuth() {
  const history = useHistory();
  const [dublicate, setdublicate] = useState("");
  // yub validation
  const formSchema = Yup.object().shape({
    authority_first_name: Yup.string().required("category is mendatory"),
    authority_sur_name: Yup.string().required("category is mendatory"),
    shop_id: Yup.number().required("Role is mendatory"),
    authority_type: Yup.string().required("Role is mendatory"),
    date_of_birth: Yup.date().required("Role is mendatory"),
    gender: Yup.string().required("Role is mendatory"),
    nic: Yup.string().required("Role is mendatory"),
    phone_number: Yup.number().required("Discription is mendatory"),
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
        .get(`http://localhost:5000/shops/shop-auth/${id}`)
        .then((response) => {
          console.log(response.data.shopAuth);
          setallvalue(response.data);
          methods.reset({
            authority_first_name: response.data.shopAuth.authority_first_name,
            authority_sur_name: response.data.shopAuth.authority_sur_name,
            authority_type: response.data.shopAuth.authority_type,
            shop_id: response.data.shopAuth.shop_id,
            date_of_birth: response.data.shopAuth.date_of_birth,
            phone_number: response.data.shopAuth.phone_number,
            gender: response.data.shopAuth.gender,
            nic: response.data.shopAuth.nic,
            description: response.data.shopAuth.description
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
      .get(`http://localhost:5000/shops/shops`)
      .then((response) => {
        setscale(response.data.shops);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  const onSubmit = (data) => {
    console.log(data);
    if (typeof id === "undefined") {
      axios
        .post("http://localhost:5000/shops/shop-auth", data)
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
        .patch(`http://localhost:5000/shops/shop-auth/${id}`, data)
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
  const authoritytype = [
    {
      name: "Owner",
      value: "Owner"
    },
    {
      name: "Manager",
      value: "Manager"
    },
    {
      name: "Staff",
      value: "Staff"
    }
  ];
  const gender = [
    { value: "male", name: "male" },
    { value: "Female", name: "Female" }
  ];
  return (
    <div style={{ padding: "0px" }}>
      <HeaderAdd
        btn="BACK"
        name={
          typeof id === "undefined"
            ? NAVIGATION.ADDSHOPAUTH
            : NAVIGATION.EDITSHOPAUTH
        }
        to={NAVIGATION.SHOPAUTH}
      />
      <Card sx={{ maxWidth: "100%", minHeight: "100vh" }}>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <GridStyle>
                <FormInputText
                  name="authority_first_name"
                  lable="authority_first_name "
                  errors={errors.category_name?.message}
                />
                <FormInputText
                  name="authority_sur_name"
                  lable="authority_sur_name "
                  errors={errors.category_name?.message}
                />

                <FormInputSelect name="shop_id" lable="shop_id" item={scale} />
                <FormInputSelect
                  name="authority_type"
                  lable="authority_type"
                  item={authoritytype}
                />
                <FormInputDate
                  name="date_of_birth"
                  lable="date_of_birth "
                  errors={errors.category_name?.message}
                />
                <FormInputSelect name="gender" lable="gender" item={gender} />

                <FormInputText
                  name="nic"
                  lable="nic"
                  errors={errors.category_name?.message}
                />
                <FormInputNumber
                  name="phone_number"
                  lable="phone_number"
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

export default AddShopAuth;
