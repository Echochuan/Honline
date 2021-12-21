import { Button, Checkbox, Form, List, Typography } from "antd";
import axios from "axios";
import shopping from "../../mock/shopping.json";
import "./index.css";
import ItemCard from "./ItemCard";
import { useChecked } from "./use-check";

export interface CartItem {
  goodsId: string;
  goodsSrc: string;
  goodsTitle: string;
  goodsSubtitle: string;
  goodsPrice: string;
  goodsNum: string;
}

const getData = () => {
  return axios("../../mock/shopping.json");
};

// const List = (goodsList:any) => {
//   return (
//     <Form className="row-goodsList" onFinish={(values) => {console.log(values)}}>
//       <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
//         <Checkbox></Checkbox>
//       </Form.Item>
//       <Form.Item>
//         <Button type="primary" htmlType="submit">1</Button>
//       </Form.Item>
//     </Form>
//   );
// };

const ShoppingList = () => {
  // console.log(getData());
  const goodList = shopping;
  const userid = shopping.userId;
  const goodsList = goodList.list;
  console.log(userid);
  console.log(goodsList);

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
    <div className="footer">
      <div className="check-all">
        <input
          checked={checkedAll}
          onChange={onWrapCheckedAllChange}
          type="checkbox"
        />
        全选
      </div>
      <div>
        价格总计 <Typography.Text mark>${total}</Typography.Text>
      </div>
    </div>
  )

  return (
    <div>
      <List
        header={<div>购物车</div>}
        footer={Footer}
        bordered
        dataSource={goodsList}
        renderItem={item => {
          const checked = checkedMap[item.goodsId] || false;
          console.log(checked)
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

export default ShoppingList;
