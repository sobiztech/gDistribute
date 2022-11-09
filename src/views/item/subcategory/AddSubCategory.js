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
  FormInputSelect,
  FormInputText
} from "../../../components/forms";
import { GETAPI } from "../../../api/getApi";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
function AddSubCategory() {
  const history = useHistory();
  const [dublicate, setdublicate] = useState("");
  // yub validation
  const formSchema = Yup.object().shape({
    sub_category_name: Yup.string().required("category is mendatory"),
    category_id: Yup.number().required("Role is mendatory"),
    description: Yup.string().required("Discription is mendatory")
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const methods = useForm(formOptions);
  const { errors } = methods.formState;

  const [allvalue, setallvalue] = useState([]);
  const [scale, setscale] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    getCategory();

    if (typeof id !== "undefined") {
      axios
        .get(GETAPI.CRUDSUBCATEGORY+'/'+id)
        .then((response) => {
          console.log(response.data);
          setallvalue(response.data);
            methods.reset({
              sub_category_name: response.data.subCategory.name,
              category_id: response.data.subCategory.category_id,
              description: response.data.subCategory.description
            });
         
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, []);


  function getCategory(){
    axios.get(`http://localhost:5000/items/category`)
    .then((response) => {
      setscale(response.data.categories);
      })
    .catch((error) => {
      console.log(error.message);
    });

  }

  const onSubmit = (data) => {
    if (typeof id === "undefined") {
      axios
        .post(GETAPI.CRUDSUBCATEGORY, data)
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
        .patch(GETAPI.CRUDSUBCATEGORY + "/" + id, data)
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
          typeof id === "undefined"
            ? NAVIGATION.ADDSUBCATEGORY
            : NAVIGATION.EDITSUBCATEGORY
        }
        to={NAVIGATION.SUBCATEGORY}
      />
      <Card sx={{ maxWidth: "100%", minHeight: "100vh" }}>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <GridStyle>
                <FormInputText
                  name="sub_category_name"
                  lable="Sub Category Name"
                  errors={errors.category_name?.message}
                />
                <FormInputSelect
                  name="category_id"
                  lable="Category Name"
                  item={scale}
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

export default AddSubCategory;
