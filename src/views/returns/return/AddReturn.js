import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import HeaderAdd from "../../../components/header/HeaderAdd";
import { GridStyle } from "../../../components/Style";
import { NAVIGATION } from "../../../utils/Paths";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  FormInputAutoComplete,
  FormInputDate,
  FormInputLongText,
  FormInputNumber,
  FormInputSelect,
  FormInputText
} from "../../../components/forms";
import { GETAPI } from "../../../api/getApi";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
function AddReturn() {
  const history = useHistory();
  const [dublicate, setdublicate] = useState("");
  // yub validation
  const formSchema = Yup.object().shape({
    // branch_name: Yup.string().required("category is mendatory"),
    // branch_number: Yup.number().required("Role is mendatory"),
    // department_id: Yup.number().required("Role is mendatory"),
    // description: Yup.string().required("Discription is mendatory")
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
        .get(`http://localhost:5000/properties/branch/${id}`)
        .then((response) => {
          console.log(response.data.branches);
          setallvalue(response.data);
          methods.reset({
            // branch_name: response.data.branches.branch_name,
            // branch_number: response.data.branches.branch_number,
            // department_id: response.data.branches.department_id,
            // description: response.data.branches.description
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    // console.log(typeof id !== "undefined");
  }, []);
  const [items, setitems] = useState([]);
  const [shops, setshops] = useState([]);

  function getScale() {
    axios
      .get(`http://localhost:5000/return/return-status`)
      .then((response) => {
        setscale(response.data.returnStatus);
      })
      .catch((error) => {
        console.log(error.message);
      });
    axios
      .get(`http://localhost:5000/items/item`)
      .then((response) => {
        setitems(response.data.items);
      })
      .catch((error) => {
        console.log(error.message);
      });
      axios
      .get(`http://localhost:5000/shops/shops`)
      .then((response) => {
        setshops(response.data.shops);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  const onSubmit = (data) => {
    console.log(data);
    if (typeof id === "undefined") {
      axios
        .post("http://localhost:5000/return/return", data)
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
        .patch(`http://localhost:5000/properties/branch/${id}`, data)
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
            ? NAVIGATION.ADDBRANCH
            : NAVIGATION.EDITBRANCH
        }
        to={NAVIGATION.BRANCH}
      />
      <Card sx={{ maxWidth: "100%", minHeight: "100vh" }}>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <GridStyle>
               
                <FormInputAutoComplete
                  name="item_id"
                  lable="item name"
                  options={items}
                />
                <FormInputSelect
                  name="shop_id"
                  lable="Shop Name"
                  item={shops}
                />
                <FormInputSelect
                  name="return_status_id"
                  lable="Return Status"
                  item={scale}
                />
                <FormInputNumber
                  name="qty"
                  lable="Retrn Qty"
                  errors={errors.role_name?.message}
                />
                <FormInputNumber
                  name="return_price"
                  lable="Return Price"
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

export default AddReturn;
