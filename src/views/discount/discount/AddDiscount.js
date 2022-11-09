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
  FormInputLongText,
  FormInputNumber,
  FormInputSelect,
  FormInputText
} from "../../../components/forms";
import { GETAPI } from "../../../api/getApi";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
function AddDiscount() {
  const history = useHistory();
  const [dublicate, setdublicate] = useState("");
  // yub validation
  const formSchema = Yup.object().shape({
    discount_name: Yup.string().required("category is mendatory"),
    discount_type_id: Yup.number().required("Role is mendatory"),
    discount_percentage: Yup.number().required("Role is mendatory"),
    date_to: Yup.date().required("Role is mendatory"),
    date_from: Yup.date().required("Role is mendatory"),
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
        .get(`http://localhost:5000/discount/discount/${id}`)
        .then((response) => {
          console.log(response.data.discount);
          setallvalue(response.data);
          methods.reset({
            discount_name: response.data.discount.discount_name,
            discount_type_id: response.data.discount.discount_type_id,
            date_to: response.data.discount.date_to,
            date_from: response.data.discount.date_from,
            discount_percentage: response.data.discount.discount_percentage,
            description: response.data.discount.description
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
      .get(`http://localhost:5000/discount/discountType`)
      .then((response) => {
        setscale(response.data.discountType);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  const onSubmit = (data) => {
    console.log(data);
    if (typeof id === "undefined") {
      axios
        .post("http://localhost:5000/discount/discount", data)
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
        .patch(`http://localhost:5000/discount/discount/${id}`, data)
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
            ? NAVIGATION.ADDDISCOUNT
            : NAVIGATION.EDITDISCOUNT
        }
        to={NAVIGATION.DISCOUNT}
      />
      <Card sx={{ maxWidth: "100%", minHeight: "100vh" }}>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <GridStyle>
                <FormInputText
                  name="discount_name"
                  lable="Discount "
                  errors={errors.category_name?.message}
                />
                <FormInputNumber
                  name="discount_percentage"
                  lable="percentage"
                  errors={errors.category_name?.message}
                />
                <FormInputSelect
                  name="discount_type_id"
                  lable="Discount type"
                  item={scale}
                />
                <FormInputDate
                  name="date_to"
                  lable="date to"
                  errors={errors.role_name?.message}
                />
                 <FormInputDate
                  name="date_from"
                  lable="date From"
                  errors={errors.role_name?.message}
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

export default AddDiscount;
