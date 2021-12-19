import { message, Form, Button } from "antd";
import goods from "../../mock/goods.json";
import "./index.css";

interface dataList {
  id: string;
  img: string;
  context: string;
  price: string;
}

const enterCar = (item: dataList) => {
  //点击后将商品的 id ，用户的id，发送给后端
  message.success(item.id);
};

const List = (goodsList: dataList[]) => {
  let stageList: any = [];

  const onFinish = (values: any) => {
    console.log(values);
  };

  //eslint-disable-next-line
  {
    goodsList.map((item, i) => {
      stageList.push(
        <li key={i} className="eachGood">
          <div>
            <img src={item.img} />
            {item.context}
            <Form.Item name="id-goods" initialValue={item.context}>
              <button></button>
            </Form.Item>
          </div>
        </li>
      );
      return 0;
    });
  }
  return (
    <Form onFinish={onFinish} className="row-goodsList">
      {stageList}
    </Form>
  );
};

const ShoppingList = () => {
  const goodsList: dataList[] = goods.goodsList;
  // console.log(goodsList);
  return (
    <div>
      <div className="goodsList">{List(goodsList)}</div>
    </div>
  );
};

export default ShoppingList;
