import React, { useEffect } from "react";
import { NAVIGATION } from "../../../utils/Paths";
import HeaderAdd from "../../../components/header/HeaderAdd";
import { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import {
  ACTION,
  DELETEICON,
  EDITICON,
  TABLES,
  TD,
  TH,
  THEAD,
  TR,
  VICON
} from "../../../components/tableComponents/TableStyle";
import { MyContext } from "../../../contex/Contex";
import DeleteConfirm from "../../../components/dialog/DeleteConfirm";
import { Link } from "react-router-dom";
import useToken from "../../../components/App/useToken";
import ShowModal from "../../../components/model/ShowModal";

function Role() {
  const { setpop, setopenmodel } = useContext(MyContext);
  const [names, setnames] = useState([]);
  const { token } = useToken();
  const [content, setContent] = useState([]);

  function visible(name) {
    console.log(name);
    let items = [
      {
        name: "id",
        value: name.id
      },
      {
        name: "name",
        value: name.role_name
      },
      {
        name: "name",
        value: name.description
      },
    ];
    setnames(items);
    setopenmodel(true);
  }

  useEffect(() => {
    getAllApi();
  }, []);

  function getAllApi() {
    axios
      .get("http://localhost:5000/master/role", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        setContent(response.data.roles);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function deleteItem(id) {
    setpop(true)
    // axios
    //   .delete(`http://localhost:5000/roles/${id}`,{
    // headers: { Authorization: `Bearer ${token}` }})
    //   .then((response) => {
    //     console.log(response);
    //     getAllApi();
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
    // console.log(id);
  }
  

  return (
    <React.Fragment>
      <HeaderAdd btn="ADD" name={NAVIGATION.ROLE} to={NAVIGATION.ADDROLE} />
      <div style={{ padding: "10px" }}>
        <TABLES>
          <THEAD>
            <TR>
              <TH scope="col">id</TH>
              <TH scope="col">Role Name</TH>
              <TH scope="col">description</TH>
              <TH scope="col">action</TH>
            </TR>
          </THEAD>
          <tbody>
            {content.map((item) => {
              return (
                <TR key={item.id}>
                  <TD data-label="id">{item.id}</TD>
                  <TD data-label="Role Name">{item.role_name}</TD>
                  <TD data-label="description">{item.description}</TD>
                  <TD data-label="action">
                    <ACTION>
                      <Link to={`/master/role/edit/${item.id}`}>
                        <EDITICON />
                      </Link>
                      <div>
                        <VICON onClick={() => visible(item)} />
                      </div>
                      <div>
                        <DELETEICON onClick={() => deleteItem(item.id)} />
                      </div>
                    </ACTION>
                  </TD>
                </TR>
              );
            })}
          </tbody>
        </TABLES>
      </div>
      <ShowModal name="Role" details={names}/>
      <DeleteConfirm />
    </React.Fragment>
  );
}

export default Role;
