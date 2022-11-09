import * as React from "react";
import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import useMediaQuery from "./useMediaQuery";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import {
  FormInputDate,
  FormInputLongText,
  FormInputNumber,
  FormInputSelect,
  FormInputText
} from "../../components/forms";
import { NAVIGATION } from "../../utils/Paths";
import HeaderAdd from "../../components/header/HeaderAdd";
import { FormProvider, useForm } from "react-hook-form";
import { GridStyle } from "../../components/Style";
import { Calculate } from "@mui/icons-material";
import BillTable from "./BillTable";
import { useStateValue } from "../../contex/StateProvider";
import AddToBill from "./AddToBill";
import ContextProvider, { MyContext } from "../../contex/Contex";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800]
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)"
}));

function Bill(props) {
  const [{ basket }, dispatch] = useStateValue();

  const { pop,setpop } = React.useContext(MyContext);

  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setpop(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const isDesktop = useMediaQuery("(min-width: 600px)");
  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiModal-root > .MuiPaper-root": {
            overflow: "visible"
          }
        }}
      />
      <div style={{ padding: "0px" }}>
        {/* <HeaderAdd
          btn="BACK"
          name={
            typeof id === "undefined"
              ? NAVIGATION.ADDBRANCH
              : NAVIGATION.EDITBRANCH
          }
          to={NAVIGATION.BRANCH}
        /> */}
       
        <GridStyle>
          <Card sx={{ width: "100%" }}>
            <CardContent>
              <BillTable />
            </CardContent>
          </Card>
          {isDesktop && <AddToBill />}
        </GridStyle>
      </div>
      {!isDesktop && (
        <SwipeableDrawer
          container={container}
          anchor="bottom"
          open={pop}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true
          }}
        >
          <StyledBox
            sx={{
              position: "absolute",
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: "visible",
              right: 0,
              left: 0,
              background: "red"
            }}
          >
            <Puller />

            <Typography onClick={toggleDrawer(true)} sx={{ p: 2 }}>
              45
            </Typography>
          </StyledBox>
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              height: "100%",
              overflow: "auto"
            }}
          >
            <AddToBill />
          </StyledBox>
        </SwipeableDrawer>
      )}
    </Root>
  );
}


export default Bill;
