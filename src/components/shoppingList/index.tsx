import { message, Form, Button, Checkbox } from "antd";
import goods from "../../mock/goods.json";
import { getGoods } from "../../redux/action";
import store from "../../redux/store";
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
    console.log(values.id);
    //先使用 redux 获取用户的信息，把这个信息加入在 values 中，一并再作为  的参数

    //存储商品有关的信息，但是真正传进去的应该包括用户的信息
    
  };

  //eslint-disable-next-line
  {
    goodsList.map((item, i) => {
      stageList.push(
        <li key={i} className="eachGood">
          <div onClick={() => onFinish(item)}>
            <img src={item.img} />
          </div>
        </li>
      );
      return 0;
    });
  }
  return <div className="row-goodsList">{stageList}</div>;
};

const ShoppingList = () => {
  //获取用户购物车的所有信息，存入 store 的 list 中
  const goodsList: dataList[] = goods.goodsList;


  {
    goodsList.map((item, i) => {
      const action_list = getGoods(item);
      store.dispatch(action_list);
    })
  }

  console.log(store.getState().list);
  // console.log(goodsList);
  return (
    <div>
      <div className="goodsList">{List(goodsList)}</div>
    </div>
  );
};

export default ShoppingList;
