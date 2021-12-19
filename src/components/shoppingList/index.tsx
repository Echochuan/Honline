import { message, Form, Button, Checkbox } from "antd";
import goods from "../../mock/goods.json";
import "./index.css";

interface dataList {
  id: string;
  img: string;
  context: string;
  price: string;
}

const List = (goodsList: dataList[]) => {
  let stageList: any = [];

  const onFinish = (values: any) => {
    //将
    console.log(values.id);
    console.log();
  };

  //eslint-disable-next-line
  {
    goodsList.map((item, i) => {
      stageList.push(
        <li key={i} className="eachGood" >
          <div onClick={() => onFinish(item)}>
            <img src={item.img} />
          </div>
        </li>
      );
      return 0;
    });
  }
  return (
    <div className="row-goodsList">
      {stageList}
    </div>
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
 