import { Button, CardActions, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormInputSelect } from "../../components/forms";
import { GridStyle1 } from "../../components/Style";
import { MyContext } from "../../contex/Contex";
import { useStateValue } from "../../contex/StateProvider";
import "./bill.css";
import BillBar from "./BillBar";
import BillTableHeader from "./BillTableHeader";
import BottomTable from "./BottomTable";
import PaymentMethod from "./PaymentMethod";
import useMediaQuery from "./useMediaQuery";
const itemsample = [
  {
    name: "cash",
    value: "cash"
  },
  {
    name: "credit",
    value: "credit"
  },
  {
    name: "cheque",
    value: "cheque"
  }
];
function BillTable() {
  const methods = useForm();
  const [{ tableRow }] = useStateValue();
  const onSubmit = (data) => {
    data.items = tableRow;
    console.log(data);
  };
  const [payment, setpayment] = useState("");
  const watch = methods.watch("method");
  useEffect(() => {
    setpayment(watch);
  }, [watch]);
  const { setpop } = React.useContext(MyContext);
  const toggleDrawer = (newOpen) => () => {
    setpop(newOpen);
  };
  const isDesktop = useMediaQuery("(min-width: 600px)");
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="bill">
            <BillTableHeader />
            {tableRow.map((item, index) => (
              <BillBar
                key={index}
                title={item.name}
                qty={item.qty}
                price={5000}
                unitPrice={item.price}
                dqty={item.oty_discount}
                itemId={item.id}
                dprice={item.price_discount}
              />
            ))}
          </div>
          <CardActions>
            <BottomTable />
          </CardActions>
          <CardActions>
            <GridStyle1>
              <FormInputSelect
                name="method"
                lable="payment Method"
                defaultValue="cash"
                item={itemsample}
              />
            </GridStyle1>
          </CardActions>
          <CardActions>
            <GridStyle1>
              <PaymentMethod pm={payment} />
            </GridStyle1>
          </CardActions>
          <CardActions>
            <Button variant="contained" type="submit" size="small">
              save
            </Button>
            <Button variant="contained" size="small">
              Print
            </Button>
            <Button variant="contained" size="small">
              Cancel
            </Button>
            {!isDesktop && (
              <Button
                onClick={toggleDrawer(true)}
                variant="contained"
                size="small"
              >
                add
              </Button>
            )}
          </CardActions>
          <Typography sx={{ p: 2, color: "text.secondary" }}></Typography>
        </form>
      </FormProvider>
    </>
  );
}

export default BillTable;
