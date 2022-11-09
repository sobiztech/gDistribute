import React from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import ReactDOM from "react-dom";
import { Button, TextField } from "@mui/material";
import { DELETEICON } from "../../components/tableComponents/TableStyle";



function Test() {
  const { register, control, handleSubmit} = useForm({
    defaultValues: {
      test: [{ firstName: "Bill", lastName: "Luo" }]
    }
  });
  const {
    fields,
    append,
    remove
  } = useFieldArray({
    control,
    name: "test"
  });

  const onSubmit = (data) => console.log("data", data);

 

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <TextField {...register(`test.${index}.firstName`)} />

              <Controller
                render={({ field }) => <TextField {...field} />}
                name={`test.${index}.lastName`}
                control={control}
              />
              <DELETEICON onClick={() => remove(index)} />
            </li>
          );
        })}
      </ul>
      <section>
        <Button
          type="button"
          onClick={() => {
            append({ firstName: "", lastName: "" });
          }}
        >
          append
        </Button>
       
      </section>

      <Button type="submit" >submit</Button>
    </form>
  );
}
export default Test;

