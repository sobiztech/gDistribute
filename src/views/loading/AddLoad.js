import React, { useEffect, useState } from "react";
import {
  useForm,
  FormProvider,
  Controller,
  useFieldArray
} from "react-hook-form";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HeaderAdd from "../../components/header/HeaderAdd";
import { GridStyle } from "../../components/Style";
import { NAVIGATION } from "../../utils/Paths";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  FormInputAutoComplete,
  FormInputDate,
  FormInputEmail,
  FormInputLongText,
  FormInputNumber,
  FormInputSelect,
  FormInputText
} from "../../components/forms";
import { GETAPI } from "../../api/getApi";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { DELETEICON } from "../../components/tableComponents/TableStyle";
import useToken from "../../components/App/useToken";
function AddLoad() {
  const history = useHistory();
  const [dublicate, setdublicate] = useState("");
  // yub validation
  const formSchema = Yup.object().shape({
    // Item_id: Yup.number().required("category is mendatory"),
    phone_number: Yup.number().required("category is mendatory"),
    vehicle_id: Yup.number().required("Role is mendatory")
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const methods = useForm({
    formOptions,
    defaultValues: {
      data: [{ item_id: "", qty: 1 }]
    }
  });
  const { errors } = methods.formState;

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "data"
  });

  const [allvalue, setallvalue] = useState([]);
  const [scale, setscale] = useState([]);
  const [items, setitems] = useState([]);

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
      .get(`http://localhost:5000/vehicle/vehicles`)
      .then((response) => {
        setscale(response.data.vehicles);
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
  }
  const onSubmit = (data) => {
    data.employee_id = EmpId;
    console.log(data);

    if (typeof id === "undefined") {
      axios
        .post("http://localhost:5000/load/load", data)
        .then((response) => {
          console.log(response.data.message);
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
  const { EmpId } = useToken();

 

  return (
    <div style={{ padding: "0px" }}>
      <HeaderAdd
        btn="BACK"
        name={
          typeof id === "undefined"
            ? NAVIGATION.ADDLOADING
            : NAVIGATION.EDITLOADING
        }
        to={NAVIGATION.LOADING}
      />
      <Card sx={{ maxWidth: "100%", minHeight: "100vh" }}>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <GridStyle>
                <div>
                  <ul>
                    {fields.map((item, index) => {
                      return (
                        <li
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                          }}
                          key={item.id}
                        >
                          <FormInputAutoComplete
                            name={`data.${index}.item_id`}
                            lable="item"
                            options={items}
                          />
                          <FormInputNumber
                            name={`data.${index}.qty`}
                            lable="qty"
                            errors={errors.category_name?.message}
                          />
                          <DELETEICON onClick={() => remove(index)} />
                        </li>
                      );
                    })}
                  </ul>
                  <section>
                    <Button
                      variant="contained"
                      onClick={() => {
                        append({ item_id: "", qty: "" });
                      }}
                    >
                      <AddIcon />
                    </Button>
                  </section>
                </div>

                {/* <FormInputText
                  name="employee_id"
                  lable="employee name"
                  defaultValue={3}
                  errors={errors.category_name?.message}
                /> */}
                <FormInputText
                  name="route_id"
                  lable="route name"
                  defaultValue={2}
                  errors={errors.category_name?.message}
                />
                <FormInputSelect
                  name="vehicle_id"
                  lable="Vehicle"
                  item={scale}
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

export default AddLoad;
