import React from "react";
import { CartItem } from ".";
import { OnCheckedChange } from "./use-check";
import {
  Popconfirm,
  Button,
} from "antd";
import "./index.css";
// import store from "../../redux/store";

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
  // const [visible, setVisible] = useState(false);

  // const [form] = Form.useForm();

  console.log("cart item rerender");
  const { item, checked, onCheckedChange } = props;
  const { id, storeName } = item;

  const onWrapCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    onCheckedChange(item, checked);
  };

  const deleteGood = () => {
    //获取商品的 id
    console.log(id);
    //获取用户的 id
    // const userId = store.getState().name;
    //将数据发给后端，后端返回正确的状态码之后刷新页面
    window.location.href = "/admin";
  };

  //气泡确认框的相关函数
  const confirm = () => {
    deleteGood();
  };

  const cancel = () => {
    console.log("click no");
  };

  // //抽屉的相关函数
  // const showDrawer = () => {
  //   setVisible(true);
  // };

  // const onClose = () => {
  //   setVisible(false);
  // };

  // const update = (values: any) => {
  //   //用户更新的内容
  //   console.log(values);
  //   //商品的 id 
  //   console.log(id);
  //   //用户的 id
  //   console.log(store.getState().name);
  //   //将用户的 id , 商品的 id , 用户更新的内容传输给后端
  //   //若成功则刷新页面
  //   window.location.href="/storeMenu"
  // };

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
      <div className="each-store-name">{storeName}</div>
      <p>
        <div className="btn-store-delete">
          <Popconfirm
            title="确认要关停该店铺吗？"
            onConfirm={confirm}
            onCancel={cancel}
            okText="是的"
            cancelText="再想想"
          >
            <Button type="primary" danger>关停</Button>
          </Popconfirm>
        </div>
      </p>
    </div>
  );
}, areEqual);

export default ItemCard;
