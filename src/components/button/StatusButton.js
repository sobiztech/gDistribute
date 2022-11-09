import Button from "@mui/material/Button";
import React from "react";

function StatusButton(props) {
  // error
  //   const status = 1;
    if (props.status == 1) {
      var ccolr = "success";
      var name = "ACTIVE";
    } else {
      var ccolr = "error";
      var name = "DEACTIVE";
    }
  return (
    <Button
      variant="contained"
      color={ccolr}
      size="small"
      style={{ fontSize: "10px", padding: "0" }}
    >
      {name}
    </Button>
  );
}

export default StatusButton;
