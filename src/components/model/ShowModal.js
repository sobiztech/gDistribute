import React, { useContext } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { style1 } from "../tableComponents/TableStyle";
import { MyContext } from "../../contex/Contex";
import "./showmodal.css";

function ShowModal({ name, details }) {
  const { openmodel, setopenmodel } = useContext(MyContext);
  const handleClose = () => setopenmodel(false);
  console.log(details);
  function Trow({name,value}) {
    return <tr>
      <td>{name}</td>
    <td>{value}</td>
    </tr>;
  }
  return (
    <Modal
      open={openmodel}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style1}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {name}
        </Typography>
        <table className="tmodal">
          <thead>
            <tr>
              <th>name</th>
              <th>detail</th>
            </tr>
          </thead>
          <tbody>
            {details.map((item,index) => {
              return <Trow name={item.name} value={item.value} key={index} />
            })}

          </tbody>
        </table>
      </Box>
    </Modal>
  );
}

export default ShowModal;
