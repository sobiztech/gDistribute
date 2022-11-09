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
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
function AddItem() {
  const history = useHistory();
  const [dublicate, setdublicate] = useState("");
  // yub validation
  const formSchema = Yup.object().shape({
    category_id: Yup.number().required("category is mendatory"),
    sub_category_id: Yup.number().required("category is mendatory"),
    brand_id: Yup.number().required("category is mendatory"),
    Scale: Yup.string().required("category is mendatory"),
    item_name: Yup.string().required("category is mendatory"),
    item_number: Yup.number().required("Role is mendatory"),
    description: Yup.string().required("Discription is mendatory")
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const methods = useForm(formOptions);
  const { errors } = methods.formState;

  const { id } = useParams();
  useEffect(() => {
    getCategory();

    if (typeof id !== "undefined") {
      axios
        .get(`http://localhost:5000/items/items/${id}`)
        .then((response) => {

          methods.reset({
            category_id: response.data.items.category_id,
            item_name: response.data.items.item_name,
            item_number: response.data.items.item_number,
            description: response.data.items.description
          });
          setTimeout(() => {
            methods.setValue(
              "sub_category_id",
              response.data.items.sub_category_id
            );
            setTimeout(() => {
              methods.setValue("brand_id", response.data.items.brand_id);
            }, 500);
          }, 500);
          
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, []);
  const [scale, setscale] = useState("scale");
  const [category, setcategory] = useState([]);
  const [subCategory, setsubCategory] = useState([]);
  const [Brand, setBrand] = useState([]);

  function getCategory() {
    axios
      .get(`http://localhost:5000/items/category`)
      .then((response) => {
        setcategory(response.data.categories);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const categoryName = methods.watch(["category_id", "sub_category_id"]);
  useEffect(() => {
    if (categoryName[0]) {
      methods.resetField("sub_category_id");
      methods.resetField("brand_id");
      axios
        .get(`http://localhost:5000/items/subcategories/${categoryName[0]}`)
        .then((response) => {
          setsubCategory(response.data.subCategory);
        })
        .catch((error) => {
          console.log(error.message);
        });
      axios
        .get(`http://localhost:5000/items/categories-scale/${categoryName[0]}`)
        .then((response) => {
          methods.setValue("Scale", response.data.scale.scale_name);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [categoryName[0]]);

  useEffect(() => {
    if (categoryName[1]) {
      methods.resetField("brand_id");
      axios
        .get(
          `http://localhost:5000/items/brands-subcategory/${categoryName[1]}`
        )
        .then((response) => {
          setBrand(response.data.brands);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [categoryName[1]]);
  const onSubmit = (data) => {
    if (typeof id === "undefined") {
      axios
        .post("http://localhost:5000/items/items", data)
        .then((response) => {
          // console.log(response);
          if (response.data.status === 1) {
            methods.reset();
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
        .patch(`http://localhost:5000/items/items/${id}`, data)
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
          typeof id === "undefined" ? NAVIGATION.ADDITEM : NAVIGATION.EDITITEM
        }
        to={NAVIGATION.ITEM}
      />
      <Card sx={{ maxWidth: "100%", minHeight: "100vh" }}>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <GridStyle>
                <FormInputSelect
                  name="category_id"
                  lable="Category Name"
                  item={category}
                />
                <FormInputSelect
                  name="sub_category_id"
                  lable="Sub Category Name"
                  item={subCategory}
                />
                <FormInputSelect
                  name="brand_id"
                  lable="Brand Name"
                  item={Brand}
                />
                <FormInputText
                  name="Scale"
                  lable="Scale"
                  defaultValue={scale}
                  InputProps={{
                    readOnly: true
                  }}
                  errors={errors.brand_name?.message}
                />
                <FormInputText
                  name="item_name"
                  lable="Item Name"
                  errors={errors.brand_number?.message}
                />
                <FormInputNumber
                  name="item_number"
                  lable="Item Number"
                  errors={errors.brand_number?.message}
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
export default AddItem;
