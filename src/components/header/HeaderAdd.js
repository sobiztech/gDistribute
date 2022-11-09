import React, { useContext } from "react";
import styled from "styled-components";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { MyContext } from "../../contex/Contex";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Div = styled.div`
  height: 50px;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #bebed7;
`;
const mystyle = {
  backgroundColor: "DodgerBlue",
  margin: "0 20px"
};
function HeaderAdd(props) {
  const title = props.name ? props.name.substring(1) : "";
  const last3 = title.slice(-3);
  if (last3 === ":id") {
    var text = title.replace("/:id", "");
  } else {
    var text = title;
  }

  return (
    <Div>
      <div style={{ margin: "0 20px", textTransform: "uppercase" }}>
        {text ? text : ""}
      </div>
      <Link to={props.to ? props.to : "/dashboard"}>
        <Button
          variant="contained"
          style={mystyle}
          endIcon={props.btn === "BACK" ? <ArrowBackIcon /> : <AddBoxIcon />}
        >
          {props.btn ? props.btn : "BUTTON"}
        </Button>
      </Link>
    </Div>
  );
}

export default HeaderAdd;
