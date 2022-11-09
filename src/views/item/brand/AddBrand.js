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
  FormInputNumber,
  FormInputSelect,
  FormInputText
} from "../../../components/forms";
import { GETAPI } from "../../../api/getApi";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
function AddBrand() {
  const history = useHistory();
  const [dublicate, setdublicate] = useState("");
  // yub validation
  const formSchema = Yup.object().shape({
    brand_name: Yup.string().required("category is mendatory"),
    brand_number: Yup.number().required("Role is mendatory"),
    sub_category_id: Yup.number().required("Role is mendatory"),
    description: Yup.string().required("Discription is mendatory")
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const methods = useForm(formOptions);
  const { errors } = methods.formState;

  const [allvalue, setallvalue] = useState([]);
  const [categories, setcategories] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    getCategory();

    if (typeof id !== "undefined") {
      axios
        .get(GETAPI.CRUDBRAND + "/" + id)
        .then((response) => {
          console.log(response.data);
          setallvalue(response.data);
          methods.reset({
            brand_name: response.data.brands.brand_name,
            brand_number: response.data.brands.brand_number,
            category_id: response.data.brands.category_id,
            // sub_category_id: response.data.brands.sub_category_id,
            description: response.data.brands.description
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, []);

  function getCategory() {
    axios
      .get(`http://localhost:5000/items/category`)
      .then((response) => {
        setcategories(response.data.categories);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const onSubmit = (data) => {
    console.log(data);
    if (typeof id === "undefined") {
      axios
        .post(GETAPI.CRUDBRAND, data)
        .then((response) => {
          // console.log(response);
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
        .patch(GETAPI.CRUDBRAND + "/" + id, data)
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
  const [subCategoryes, setsubCategoryes] = useState([]);

  const categoryName = methods.watch("category_id");
  useEffect(() => {
    if (categoryName) {
      methods.resetField("sub_category_id");
      axios
        .get(`http://localhost:5000/items/subcategories/${categoryName}`)
        .then((response) => {
          console.log(response.data.subCategory);
          setsubCategoryes(response.data.subCategory);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [categoryName]);

  return (
    <div style={{ padding: "0px" }}>
      <HeaderAdd
        btn="BACK"
        name={
          typeof id === "undefined" ? NAVIGATION.ADDBRAND : NAVIGATION.EDITBRAND
        }
        to={NAVIGATION.BRAND}
      />
      <Card sx={{ maxWidth: "100%", minHeight: "100vh" }}>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <GridStyle>
                <FormInputText
                  name="brand_name"
                  lable="brand"
                  errors={errors.brand_name?.message}
                />
                <FormInputNumber
                  name="brand_number"
                  lable="Brand number"
                  errors={errors.brand_number?.message}
                />
                <FormInputSelect
                  name="category_id"
                  lable="Select Category"
                  item={categories}
                />
                <FormInputSelect
                  name="sub_category_id"
                  lable="Select Sub Category"
                  item={subCategoryes}
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
export default AddBrand;
