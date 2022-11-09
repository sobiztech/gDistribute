import { Button, Card, CardActions, CardContent } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormInputNumber,
  FormInputSelect,
  FormInputText
} from "../../components/forms";
import { GridStyle } from "../../components/Style";
import { useStateValue } from "../../contex/StateProvider";

function AddToBill() {
  const methods = useForm();
  const [{ basket }, dispatch] = useStateValue();
  const [counter, setcounter] = useState(100);
  const [itemDrop, setitemDrop] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/bill/bill/3`)
      .then((response) => {
        setitemDrop(response.data.bill);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  
  const onSubmit = (data) => {
    data.id = counter;
    let itemArray = itemDrop.find((item) => item.value === data.item_id);
    data.name = itemArray.name;
    data.price = itemArray.price;
    dispatch({ type: "ADD_TO_TABLEROW", item: data });
    setcounter(counter + 1);
    console.log(data);
  };
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <GridStyle>
              <FormInputSelect name="item_id" lable="item" item={itemDrop} />
              <FormInputNumber name="qty" lable="QTY" />
              <FormInputNumber name="price_discount" lable="price Discount" />
              <FormInputNumber name="oty_discount" lable="qty Discount" />
            </GridStyle>
            <CardActions style={{ display: "flex", justifyContent: "end" }}>
              <Button
                size="mdium"
                variant="contained"
                color="primary"
                style={{ width: "100%" }}
                type="submit"
              >
                Add
              </Button>
            </CardActions>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}

export default AddToBill;
