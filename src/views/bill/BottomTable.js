import React from "react";
import { useStateValue } from "../../contex/StateProvider";
import "./bill.css";

function BottomTable(props) {
  const [{ tableRow }, dispatch] = useStateValue();
  var total =
  tableRow?.length > 0
    ? tableRow
        .map((bill) => parseInt(bill.price_discount))
        .reduce((acc, amount) => acc + amount)
    : 0;
    
var discount =
  tableRow?.length > 0
    ? tableRow
        .map((bill) => parseInt(bill.price_discount))
        .reduce((acc, amount) => acc + amount)
    : 0;

  return (
    <table className="table_botttom">
      <thead>
        <tr>
          <th>detail</th>
          <th>rs</th>
          <th>value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>total</td>
          <td>rs</td>
          <td>{total}</td>
        </tr>
        <tr>
          <td>discount</td>
          <td>rs</td>
          <td>{discount}</td>
        </tr>
        <tr>
          <td>net total</td>
          <td>rs</td>
          <td>{10000}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default BottomTable;
