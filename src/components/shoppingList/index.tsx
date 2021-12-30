import { Button, List, Modal, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import shopping from "../../mock/shopping.json";
import store from "../../redux/store";
import "./index.css";
import ItemCard from "./ItemCard";
import { useChecked } from "./use-check";

export interface CartItem {
  id: number;
  storeName: string;
  goodsSrc: string;
  goodsTitle: string;
  goodsSubtitle: string;
  goodsPrice: string;
  goodsNum: string;
}

const ShoppingList = () => {
  const [visible, setVisible] = useState(false);

  const userId = store.getState().name;

  const [goodsList, setstate] = useState<CartItem[]>([
    {
      id: 1,
      storeName: "string",
      goodsSrc: "string",
      goodsTitle: "string",
      goodsSubtitle: "string",
      goodsPrice: "string",
      goodsNum: "string",
    }
  ]);

  // var goodsList: dataList[] = [];
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "GET",
        headers: { "Content-type": "application/json" },
        url: "http://101.132.145.198:8080/cart/get?uId=" + userId
      });
      console.log(result);
      setstate(result.data.list);
    };

    fetchData();
  }, []);

  // const goodList = shopping;
  // const userid = shopping.userId;
  // const goodsList = goodList.list;
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
    return cartItems.reduce((sum, cur) => sum + Number(cur.goodsPrice), 0);
  };

  const onWrapCheckedAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkAll = e.target.checked;
    onCheckedAllChange(checkAll);
  };

  const total = sumPrice(filterChecked());

  const payBtn = () => {
    //把商品的 ID 和用户的 id 发送给后端
    //获取商品的 id 
    const checkedGoodId = filterChecked().map((item) => {return item.id})
    //获取用户的 id
    // const userId = store.getState().name;
    //将两者一起发送给后端
    //如果成功则刷新页面
    // window.location.href="/shoppingCar"
    // console.log(checkedGoodId)
  };

  const Footer = (
    <div className="footer-check">
      <Modal
        visible={visible}
        title="确认支付吗？"
        okText="确认"
        cancelText="再想想"
        onCancel={() => {setVisible(false)}}
        onOk={() => {
          payBtn();
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
      <div className="checked-price">
        价格总计 <Typography.Text mark>${total}</Typography.Text>
      </div>
      <Button
      className="btn-pay"
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >去支付</Button>
    </div>
  );

  return (
    <div>
      <List
        className="goodsList"
        header={<div>购物车</div>}
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
