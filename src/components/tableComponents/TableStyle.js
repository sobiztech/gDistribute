import styled from "styled-components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";

export const TABLES = styled.table`
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
  @media (max-width: 600px) {
    border: 0;
  }
`;
export const TR = styled.tr`
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: 0.35em;
  @media (max-width: 600px) {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }
`;
export const TH = styled.th`
  padding: 0.625em;
  text-align: center;
  font-size: 0.85em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  @media (max-width: 600px) {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
`;
export const TD = styled.td`
  padding: 0.625em;
  text-align: center;
  @media (max-width: 600px) {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    text-align: right;
    &:before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }
  }
`;
export const ACTION = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  @media (max-width: 600px) {
    justify-content: end;
  }
`;
export const THEAD = styled.thead`
  @media (max-width: 600px) {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
`;
export const VICON = styled(VisibilityIcon)`
  color: green;
  cursor: pointer;

`;
export const EDITICON = styled(BorderColorIcon)`
  color: yellow;
  cursor: pointer;

`;
export const DELETEICON = styled(DeleteIcon)`
  color: red;
  cursor: pointer;
`;

export const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    p: 4,
    border:0
  };