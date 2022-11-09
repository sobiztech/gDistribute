import { useState } from "react";

export default function useToken() {
  const getToken = (name) => {
    const tokenString = localStorage.getItem(name);
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [token, settoken] = useState(getToken("token"));
  const [EmpId, setEmpId] = useState(getToken("EmpId"));
  const [EmpName, setEmpName] = useState(getToken("EmpName"));

  const saveToken = (userToken, userEmpId, userEmpNmae) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    localStorage.setItem("EmpId", JSON.stringify(userEmpId));
    localStorage.setItem("EmpName", JSON.stringify(userEmpNmae));
  };
  // const getEmpId = () => {
  //   const EmpIdString = localStorage.getItem("EmpId");
  //   const userEmpId = JSON.parse(EmpIdString);
  //   return userEmpId;
  // };

  // const saveEmpId = (userEmpId) => {
  //   localStorage.setItem("EmpId", JSON.stringify(userEmpId));
  // };

  return {
    setToken: saveToken,
    token: token,
    EmpId: EmpId,
    EmpName: EmpName
  };
}
