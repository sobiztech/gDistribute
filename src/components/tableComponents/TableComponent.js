import React from "react";
import { empdata } from "../../utils/empdata";
import { useState } from "react";
import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DeleteConfirm from "../dialog/DeleteConfirm";
import { MyContext } from "../../contex/Contex";
import { useContext } from "react";
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
} from "./TableStyle";

function TableComponent() {
  const { setpop } = useContext(MyContext);
  const [names, setnames] = useState([]);

  function visible(name) {
    setnames(name);
    setOpen(true);
    console.log(names);
  }
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

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
    <>
      <TABLES>
        <THEAD>
          <TR>
            <TH scope="col">id</TH>
            <TH scope="col">name</TH>
            <TH scope="col">age</TH>
            <TH scope="col">action</TH>
          </TR>
        </THEAD>
        <tbody>
          <TR>
            <TD data-label="id">1</TD>
            <TD data-label="name">kali</TD>
            <TD data-label="age">15</TD>
            <TD data-label="action">
              <ACTION>
                <div>
                  <EDITICON />
                </div>
                <div>
                  <VICON onClick={() => visible(1)} />
                </div>
                <div>
                  <DELETEICON onClick={() => setpop(true)} />
                </div>
              </ACTION>
            </TD>
          </TR>
        </tbody>
      </TABLES>
      <Modaling />
      <DeleteConfirm />
    </>
  );
}

export default TableComponent;
