import { useState } from "react";

export default function useEmpId() {
  const getEmpId = () => {
    const EmpIdString = localStorage.getItem("EmpId");
    const userEmpId = JSON.parse(EmpIdString);
    return userEmpId;
  };

  const [EmpId, setEmpId] = useState(getEmpId());

  const saveEmpId = (userEmpId) => {
    localStorage.setItem("EmpId", JSON.stringify(userEmpId));
  };

  return {
    setEmpId: saveEmpId,
    EmpId: EmpId
  };
}
