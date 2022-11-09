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
function AddVehicle() {
  const history = useHistory();
  const [dublicate, setdublicate] = useState("");
  // yub validation
  const formSchema = Yup.object().shape({
    vehicle_number: Yup.string().required("category is mendatory"),
    vehicle_ownership: Yup.string().required("category is mendatory"),
    vehicle_type_id: Yup.number().required("Role is mendatory"),
    branch_id: Yup.number().required("Role is mendatory"),
    description: Yup.string().required("Discription is mendatory")
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const methods = useForm(formOptions);
  const { errors } = methods.formState;

  const [allvalue, setallvalue] = useState([]);
  const [scale, setscale] = useState([]);
  const [Branch, setBranch] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    getScale();

    if (typeof id !== "undefined") {
      axios
        .get(`http://localhost:5000/vehicle/vehicle/${id}`)
        .then((response) => {
          console.log(response.data.vehicles);
          setallvalue(response.data);
          methods.reset({
            vehicle_number: response.data.vehicles.vehicle_number,
            vehicle_type_id: response.data.vehicles.vehicle_type_id,
            vehicle_ownership: response.data.vehicles.vehicle_ownership,
            branch_id: response.data.vehicles.branch_id,
            description: response.data.vehicles.description
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
      .get(`http://localhost:5000/vehicle/vehicle-types`)
      .then((response) => {
        setscale(response.data.vehicleType);
      })
      .catch((error) => {
        console.log(error.message);
      });
    axios
      .get(`http://localhost:5000/properties/branches`)
      .then((response) => {
        setBranch(response.data.branches);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  const onSubmit = (data) => {
    console.log(data);
    if (typeof id === "undefined") {
      axios
        .post("http://localhost:5000/vehicle/vehicle", data)
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
        .patch(`http://localhost:5000/vehicle/vehicle/${id}`, data)
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
  const vouwner = [
    {
      name: "Own",
      value: "Own"
    },
    {
      name: "Hire",
      value: "Hire"
    }
  ];
  return (
    <div style={{ padding: "0px" }}>
      <HeaderAdd
        btn="BACK"
        name={
          typeof id === "undefined"
            ? NAVIGATION.ADDVEHICLE
            : NAVIGATION.EDITVEHICLE
        }
        to={NAVIGATION.VEHICLE}
      />
      <Card sx={{ maxWidth: "100%", minHeight: "100vh" }}>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <GridStyle>
                <FormInputText
                  name="vehicle_number"
                  lable="vehicle_number "
                  errors={errors.category_name?.message}
                />
                <FormInputSelect
                  name="vehicle_type_id"
                  lable="vehicle_type_id"
                  item={scale}
                />
                <FormInputSelect
                  name="vehicle_ownership"
                  lable="vehicle_ownership"
                  item={vouwner}
                />

                <FormInputSelect
                  name="branch_id"
                  lable="branch_id"
                  item={Branch}
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

export default AddVehicle;
