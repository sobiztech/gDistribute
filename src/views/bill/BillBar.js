import React from "react";
import { DELETEICON } from "../../components/tableComponents/TableStyle";
import { useStateValue } from "../../contex/StateProvider";
import "./bill.css";

function BillBar(props) {
  const { title, dqty, qty, dprice, itemId, unitPrice } = props;
  const [{ basket }, dispatch] = useStateValue();

  const removeButton = () => {
    // remove the item from the basket
    dispatch({
      type: "REMOVE_FROM_TABLEROW",
      id: itemId
    });
  };
  var qty1 = qty ? qty : 0;
  var dqty1 = dqty ? dqty : 0;
  var dprice1 = dprice ? dprice : 0;
  const totalprice = unitPrice * qty1 - dprice1;
  const price = unitPrice * qty1;
  return (
    <div className="bill_body">
      <div className="bill_detail">
        <div className="detail">It</div>
        <div className="detail">dis</div>
      </div>
      <div className="bill_item">
        <div>{title}</div>
        <div>{unitPrice}</div>
      </div>
      <div className="qty">
        <div className="Quantity">{qty}</div>
        <div className="Quantity">{dqty}</div>
      </div>
      <div className="price">
        <div className="item_price">{price}</div>
        <div className="item_price">{dprice}</div>
      </div>
      <div className="total">{totalprice}</div>
      <div className="delete">
        <DELETEICON onClick={removeButton} />
      </div>
    </div>
  );
}

export default BillBar;
