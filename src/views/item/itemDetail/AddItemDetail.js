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
function AddItemDetail() {
  const history = useHistory();
  const [dublicate, setdublicate] = useState("");
  // yub validation
  const formSchema = Yup.object().shape({
    category_id: Yup.number().required("category is mendatory"),
    sub_category_id: Yup.number().required("category is mendatory"),
    brand_id: Yup.number().required("category is mendatory"),
    item_id: Yup.number().required("category is mendatory"),
    unit_price: Yup.number().required("category is mendatory"),
    discount_id: Yup.number().required("category is mendatory"),
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
        .get(`http://localhost:5000/items/item-detail/${id}`)
        .then((response) => {
          methods.reset({
            category_id: response.data.itemDetail.category_id,
            unit_price: response.data.itemDetail.unit_price,
            discount_id: response.data.itemDetail.discount_id,
            description: response.data.itemDetail.description
          });
          setTimeout(() => {
            methods.setValue(
              "sub_category_id",
              response.data.itemDetail.sub_category_id
            );
            setTimeout(() => {
              methods.setValue("brand_id", response.data.itemDetail.brand_id);
              setTimeout(() => {
                methods.setValue("item_id", response.data.itemDetail.item_id);
              }, 500);
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
  const [Items, setItems] = useState([]);
  const [discount, setdiscount] = useState([]);

  function getCategory() {
    axios
      .get(`http://localhost:5000/items/category`)
      .then((response) => {
        setcategory(response.data.categories);
      })
      .catch((error) => {
        console.log(error.message);
      });
    axios
      .get(`http://localhost:5000/discount/discounts`)
      .then((response) => {
        setdiscount(response.data.discount);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const categoryName = methods.watch([
    "category_id",
    "sub_category_id",
    "brand_id"
  ]);
  useEffect(() => {
    if (categoryName[0]) {
      methods.resetField("sub_category_id");
      methods.resetField("brand_id");
      methods.resetField("item_id");

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
      methods.resetField("item_id");

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
  useEffect(() => {
    if (categoryName[2]) {
      methods.resetField("item_id");

      axios
        .get(`http://localhost:5000/items/item-brand/${categoryName[2]}`)
        .then((response) => {
          setItems(response.data.items);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [categoryName[2]]);
  const onSubmit = (data) => {
    console.log(data);
    if (typeof id === "undefined") {
      axios
        .post("http://localhost:5000/items/item-detail", data)
        .then((response) => {
          console.log(response);
          if (response.data.status === 1) {
            methods.reset();
          }
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response) {
            if (error.response.data.error.code === "ER_DUP_ENTRY") {
              setdublicate("THis Role Already exist");
            }
          }
        });
    } else {
      axios
        .patch(`http://localhost:5000/items/item-detail/${id}`, data)
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
            ? NAVIGATION.ADDITEMDETAIL
            : NAVIGATION.EDITITEMDETAIL
        }
        to={NAVIGATION.ITEMDETAIL}
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
                <FormInputSelect
                  name="item_id"
                  lable="item Name"
                  item={Items}
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
                <FormInputNumber
                  name="unit_price"
                  lable="Unit Price"
                  errors={errors.brand_number?.message}
                />
                <FormInputSelect
                  name="discount_id"
                  lable="Discount Name"
                  item={discount}
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
export default AddItemDetail;
