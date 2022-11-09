import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { MyContext } from "../../contex/Contex";
import { useContext } from "react";
import { FormInputPw } from "../forms";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteConfirm() {
  const { pop, setpop } = useContext(MyContext);
  const formSchema = Yup.object().shape({
    password: Yup.string().required("Role is mendatory")
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const methods = useForm(formOptions);
  const handleClose = () => setpop(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Dialog
        open={pop}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <DialogTitle>Please type Admin Password</DialogTitle>
            <DialogContent>
              <FormInputPw
                style={{ marginTop: "10px" }}
                name="password"
                lable="password"
                errors="You need To Type Paaword"
              />
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" color="error" type="submit">
                DELETE
              </Button>
              <Button variant="contained" color="success" onClick={handleClose}>
                CANCEL
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
    </div>
  );
}
