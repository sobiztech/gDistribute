import React, { useEffect } from "react";
import { NAVIGATION } from "../../utils/Paths";
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
} from "../../components/tableComponents/TableStyle";
import { MyContext } from "../../contex/Contex";
import DeleteConfirm from "../../components/dialog/DeleteConfirm";
import { GETAPI } from "../../api/getApi";
import { Link } from "react-router-dom";
import { SButton } from "../../components/button";
import HeaderAdd from "../../components/header/HeaderAdd";
import useToken from "../../components/App/useToken";

function Load() {
  const { setpop } = useContext(MyContext);
  const [names, setnames] = useState([]);
  const { EmpId } = useToken();


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
      .get(`http://localhost:5000/load/load/${EmpId}`)
      .then((response) => {
        console.log(response.data.load);
        setContent(response.data.load);
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
        name={NAVIGATION.LOADING}
        to={NAVIGATION.ADDLOADING}
      />
      <div style={{ padding: "10px" }}>
        <TABLES>
          <THEAD>
            <TR>
              <TH scope="col">name</TH>
              <TH scope="col">Qty</TH>
              <TH scope="col">Available qty</TH>
              <TH scope="col">unit price</TH>
              <TH scope="col">action</TH>
            </TR>
          </THEAD>
          <tbody>
            {content.map((item) => {
              return (
                <TR key={item.id}>
                  <TD data-label="name">{item.id}</TD>
                  <TD data-label="Qty">{item.nmae}</TD>
                  <TD data-label="Available qty">{item.qty}</TD>
                  <TD data-label="unit price">{item.price}</TD>
                  <TD data-label="action">
                    <ACTION>
                      <Link to={`/shop/shopAuth/edit/${item.id}`}>
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

export default Load;
