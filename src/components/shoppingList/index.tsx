import { Button, Checkbox, Form, List, Typography } from "antd";
import axios from "axios";
import shopping from "../../mock/shopping.json";
import "./index.css";
import ItemCard from "./ItemCard";
import { useChecked } from "./use-check";

export interface CartItem {
  id: number;
  goodsSrc: string;
  goodsTitle: string;
  goodsSubtitle: string;
  goodsPrice: string;
  goodsNum: string;
}

const getData = () => {
  return axios("../../mock/shopping.json");
};

const ShoppingList = () => {
  // console.log(getData());
  const goodList = shopping;
  const userid = shopping.userId;
  const goodsList = goodList.list;
  // console.log(userid);
  // console.log(goodsList);

  const {
    checkedAll,
    checkedMap,
    onCheckedAllChange,
    onCheckedChange,
    filterChecked
  } = useChecked(goodsList);

  // cartItems的积分总和
  const sumPrice = (cartItems: CartItem[]) => {
    return cartItems.reduce((sum, cur) => sum + Number(cur.goodsPrice), 0)
  }

  const onWrapCheckedAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkAll = e.target.checked
    onCheckedAllChange(checkAll)
  }

  const total = sumPrice(filterChecked())

  const Footer = (
    <div className="footer-check">
      <div>
        <input
         className="checkBox"
          checked={checkedAll}
          onChange={onWrapCheckedAllChange}
          type="checkbox"
        />
        <div className="check-all-box">全选</div>
      </div>
      <div className="checked-price">
        价格总计 <Typography.Text mark>${total}</Typography.Text>
      </div>
    </div>
  )

  return (
    <div>
      <List
        className="goodsList"
        header={<div>购物车</div>}
        // footer={Footer}
        bordered
        dataSource={goodsList}
        renderItem={item => {
          const checked = checkedMap[item.id] || false;
          // console.log(checked)
          return (
            <List.Item>
              <ItemCard
                item={item}
                checked={checked}
                onCheckedChange={onCheckedChange}
              />
            </List.Item>
          );
        }}
      />
      <div className="footer">{Footer}</div>
    </div>
  );
};

export default ShoppingList;
