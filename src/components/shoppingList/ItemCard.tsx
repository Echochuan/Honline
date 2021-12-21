import React from "react";
import { CartItem } from "./";
import { OnCheckedChange } from "./use-check";
import { Typography } from "antd";
import "./index.css";

interface Props {
  item: CartItem;
  checked: boolean;
  onCheckedChange: OnCheckedChange<CartItem>;
}

// memo优化策略
function areEqual(prevProps: Props, nextProps: Props) {
  return prevProps.checked === nextProps.checked;
}

const ItemCard = React.memo((props: Props) => {
  console.log("cart item rerender");
  const { item, checked, onCheckedChange } = props;
  const { goodsTitle, goodsPrice, goodsSrc, goodsSubtitle } = item;

  const onWrapCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    onCheckedChange(item, checked);
  };

  return (
    <div className="each-shopping-good">
      <div className="checkbox-wrap">
        <input
          className="checkBox"
          type="checkBox"
          checked={checked}
          onChange={onWrapCheckedChange}
        />
      </div>
      <p>
        <div>
          <img
          className="shopping-img"
            src={goodsSrc}
            style={{ width: "100px", height: "100px" }}
            alt=""
          />
        </div>
        <div className="shopping-title">{goodsTitle}</div>
        <div className="shopping-content">{goodsSubtitle}</div>
        <Typography.Text mark className="shopping-price">
          ${goodsPrice}
        </Typography.Text>
      </p>
    </div>
  );
}, areEqual);

export default ItemCard;
