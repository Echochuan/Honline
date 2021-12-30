import React from "react";
import { CartItem } from ".";
import { OnCheckedChange } from "./use-check";
import { Popconfirm, Button, message } from "antd";
import "./index.css";
import store from "../../redux/store";
import axios from "axios";

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
    axios({
      method: "POST",
      headers: { "Content-type": "application/json" },
      url: "http://101.132.145.198:8080/manage/close_store",
      data: {
        storeIds: [id]
      }
    }).then(function(response) {
      console.log(response);
      if (response.data.code === 200) {
        message.success("删除成功");
        window.location.href = "/admin";
      } else {
        message.error("删除失败");
      }
    });
    //获取商品的 id
    // console.log(id);
    // const arr: any[] = [id]
    // console.log(arr)
    //将数据发给后端，后端返回正确的状态码之后刷新页面
  };

  //气泡确认框的相关函数
  const confirm = () => {
    deleteGood();
  };

  const cancel = () => {
    console.log("click no");
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
            <Button type="primary" danger>
              关停
            </Button>
          </Popconfirm>
        </div>
      </p>
    </div>
  );
}, areEqual);

export default ItemCard;
