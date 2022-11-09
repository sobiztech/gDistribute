import React, { useEffect } from "react";
import { NAVIGATION } from "../../../utils/Paths";
import HeaderAdd from "../../../components/header/HeaderAdd";
import { useState } from "react";
import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import axios from "axios";
import {
  ACTION,
  DELETEICON,
  EDITICON,
  style1,
  TABLES,
  TD,
  TH,
  THEAD,
  TR,
  VICON
} from "../../../components/tableComponents/TableStyle";
import { MyContext } from "../../../contex/Contex";
import DeleteConfirm from "../../../components/dialog/DeleteConfirm";
import { GETAPI } from "../../../api/getApi";
import { Link } from "react-router-dom";
import { SButton } from "../../../components/button";

function Discount() {
  const { setpop } = useContext(MyContext);
  const [names, setnames] = useState([]);

  function visible(name) {
    setnames(name);
    setOpen(true);
  }
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState([]);

  useEffect(() => {
    getAllApi();
  }, []);

  function getAllApi() {
    axios
      .get("http://localhost:5000/discount/discount")
      .then((response) => {
        setContent(response.data.discount);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function deleteItem(id) {
    // axios
    //   .delete(`http://localhost:5000/roles/${id}`)
    //   .then((response) => {
    //     console.log(response);
    //     getAllApi();
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
    // console.log(id);
  }
  function Modaling() {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            kdfsdf
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    );
  }

  return (
    <React.Fragment>
      <HeaderAdd
        btn="ADD"
        name={NAVIGATION.DISCOUNT}
        to={NAVIGATION.ADDDISCOUNT}
      />
      <div style={{ padding: "10px" }}>
        <TABLES>
          <THEAD>
            <TR>
              <TH scope="col">id</TH>
              <TH scope="col">Name</TH>
              <TH scope="col">Discount type</TH>
              <TH scope="col">Discount Percentage</TH>
              <TH scope="col">date to</TH>
              <TH scope="col">date end</TH>
              <TH scope="col">status</TH>
              <TH scope="col">description</TH>
              <TH scope="col">action</TH>
            </TR>
          </THEAD>
          <tbody>
            {content.map((item) => {
              return (
                <TR key={item.id}>
                  <TD data-label="id">{item.id}</TD>
                  <TD data-label="Name">{item.discount_name}</TD>
                  <TD data-label="Discount type">{item.discount_type_name}</TD>
                  <TD data-label="Discount percentage">{item.discount_percentage}%</TD>
                  <TD data-label="Date to">{item.date_to}</TD>
                  <TD data-label="Date end">{item.date_from}</TD>
                  <TD data-label="status">
                    <SButton status={item.status} />
                  </TD>
                  <TD data-label="description">{item.description}</TD>
                  <TD data-label="action">
                    <ACTION>
                      <Link to={`/discount/discounts/edit/${item.id}`}>
                        <EDITICON />
                      </Link>
                      <div>
                        <VICON onClick={() => visible(1)} />
                      </div>
                      <div>
                        {/* <DELETEICON onClick={() => deleteItem(item.id)} /> */}
                      </div>
                    </ACTION>
                  </TD>
                </TR>
              );
            })}
          </tbody>
        </TABLES>
      </div>
      <Modaling />
      <DeleteConfirm />
    </React.Fragment>
  );
}

export default Discount;
