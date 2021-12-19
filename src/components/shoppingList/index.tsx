import { Checkbox } from "antd";
import goods from "../../mock/goods.json";
import { checkGoods, getGoods } from "../../redux/action";
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
  // console.log(goodsList);

  const onFinish = (values: any) => {
    //用户点击商品 改变商品的是否被选中的状态
    const action_check = checkGoods(values.id);
    store.dispatch(action_check);

    console.log(store.getState().list);
    
  };

  //eslint-disable-next-line
  {
      //eslint-disable-next-line
    goodsList.map((item, i) => {
      stageList.push(
        <li key={i} className="each-shopping-good">
          <div className="checkBox">
            <Checkbox  className="checkBox" onChange={() => onFinish(item)} />
          </div>
          <div>
            <img src={item.img} style={{ width:"100px",height:"100px" }} alt=""/>
          </div>
          <div className="shopping-content">
            {item.context}
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

  // eslint-disable-next-line
  {
    // eslint-disable-next-line
    goodsList.map((item, i) => {
      const action_list = getGoods(item);
      store.dispatch(action_list);
    });
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
