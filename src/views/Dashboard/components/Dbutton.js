import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./dashboard.css";

function Dbutton() {
  return (
    <div className="d-card">
      <div className="d-top">
        <div className="line1">CREDIT</div>
        <div className="amount">2000000</div>
      </div>
      <div className="d-bottom">
        <div className="line2">GOTO</div>
        <div className="line2_icon"><ArrowBackIcon /></div>
      </div>
    </div>
  );
}

export default Dbutton;
