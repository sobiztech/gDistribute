import React from "react";
import { FormInputDate, FormInputNumber } from "../../components/forms";

function PaymentMethod(props) {
  switch (props.pm) {
    case "cash":
      return <FormInputNumber name="Cash" lable="Cash" />;
    case "cheque":
      return (
        <>
          <FormInputNumber name="Amount" lable="Amount" />
          <FormInputNumber name="Cheque_number" lable="Cheque number" />
          <FormInputDate name="Expire_date" lable="Expire Date" />
          <FormInputDate name="deposit_date" lable="deposit" />{" "}
        </>
      );

    case "credit":
      return (
        <>
          <FormInputNumber name="Cheque" lable="Credit" />
          <FormInputDate name="Credit_date" lable="credit date" />
        </>
      );

    default:
      return <FormInputNumber name="Cash" lable="Cash" />;
  }
}

export default PaymentMethod;
