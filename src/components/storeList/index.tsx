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
  const [visible, setVisible] = useState(false);

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


  const deleteBtn = () => {
    //把商品的 ID 和用户的 id 发送给后端
    //获取商品的 id 
    const checkedGoodId = filterChecked().map((item) => {return item.id})
    //获取用户的 id
    const userId = store.getState().name;
    //将两者一起发送给后端
    //如果成功则刷新页面
    // console.log(checkedGoodId,userId);
    window.location.href="/storeMenu"
  };

  const Footer = (
    <div className="footer-check">
      <Modal
        visible={visible}
        title="被选中的商品将被下架"
        okText="确认"
        cancelText="再想想"
        onCancel={() => {setVisible(false)}}
        onOk={() => {
          deleteBtn();
        }}
      ></Modal>
      <div>
        <input
          className="checkBox"
          checked={checkedAll}
          onChange={onWrapCheckedAllChange}
          type="checkbox"
        />
        <div className="check-all-box">全选</div>
      </div>
      <Button
      className="btn-pay"
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >下架</Button>
    </div>
  );

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
      <div className="footer">{Footer}</div>
    </div>
  );
};

export default StoreList;
