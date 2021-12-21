import React, { useState } from "react";
import { CartItem } from "./";
import { OnCheckedChange } from "./use-check";
import { Modal, Typography, Popconfirm, message } from "antd";
import "./index.css";
import store from "../../redux/store";

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
  const [visible, setVisible] = useState(false);

  console.log("cart item rerender");
  const { item, checked, onCheckedChange } = props;
  const { id, goodsTitle, goodsPrice, goodsSrc, goodsSubtitle } = item;

  const onWrapCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    onCheckedChange(item, checked);
  };

  const deleteGood = () => {
    //获取商品的 id
    console.log(id);
    //获取用户的 id
    const userId = store.getState().name;
    //将数据发给后端，后端返回正确的状态码之后刷新页面
    window.location.href = "/shoppingCar";
  };

  function confirm() {
    deleteGood()
  }

  function cancel() {
    console.log("click no")
  }

  return (
    <div className="each-shopping-good">
      <Modal
        visible={visible}
        title="确认删除吗？"
        okText="确认"
        cancelText="再想想"
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          deleteGood();
        }}
      ></Modal>
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
        <div className="btn-delete">
          <Popconfirm
            title="确认要从购物车中删除吗？"
            onConfirm={confirm}
            onCancel={cancel}
            okText="是的"
            cancelText="再想想"
          >
            <a href="#">删除</a>
          </Popconfirm>
        </div>
      </p>
    </div>
  );
}, areEqual);

export default ItemCard;
