import { IconButton, Menu, MenuItem } from "@material-ui/core";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useToken from "../components/App/useToken";

function MenuItems() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { EmpName } = useToken();
  // console.log(token);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = () => {
    localStorage.clear();
    // navigate.push('/login');
    window.location.reload();
  };
  return (
    <div>
      <IconButton
        color="inherit"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>user {EmpName}</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default MenuItems;
