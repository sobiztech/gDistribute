import React from 'react'
import Button from "@mui/material/Button";


function ColectedStatus({colectestatus}) {
  return (
    <Button
      variant="contained"
      size="small"
      style={{ fontSize: "10px", padding: "0" }}
      color={"success"}
    >
      {colectestatus}
    </Button>
  )
}

export default ColectedStatus