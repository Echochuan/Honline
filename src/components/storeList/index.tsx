import { BankOutlined } from "@ant-design/icons";
import { Button, List, Modal, Typography } from "antd";
import axios from "axios";
import { useState } from "react";
import shopping from "../../mock/storeMenu.json";
import store from "../../redux/store";
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

const StoreList = () => {

  // console.log(getData());
  const goodList = shopping;
  const userid = shopping.userId;
  const storeName = shopping.storeName;
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

  const onWrapCheckedAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkAll = e.target.checked;
    onCheckedAllChange(checkAll);
  };

  console.log(goodsList);

  return (
    <div>
      <List
        className="goodsList"
        header={<div><BankOutlined />{storeName}</div>}
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
    </div>
  );
};

export default StoreList;
