import { Button, Checkbox } from "antd";
import goods from "../../mock/goods.json";
import { checkGoods, DeleteGoods, getGoods } from "../../redux/action";
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

  const changeCheck = (values: any) => {
    //用户点击商品 改变商品的是否被选中的状态
    const action_check = checkGoods(values.id);
    store.dispatch(action_check);

    console.log(store.getState().list);
    
  };

  const deleteGood = (values: any) => {
    const action_delete = DeleteGoods(values);
    store.dispatch(action_delete);

    console.log(store.getState().list);
    //调用接口 删除
  }

  //eslint-disable-next-line
  {
      //eslint-disable-next-line
    goodsList.map((item, i) => {
      stageList.push(
        <li key={i} className="each-shopping-good">
          <div className="checkBox">
            <Checkbox  className="checkBox" onChange={() => changeCheck(item)} />
          </div>
          <div>
            <img src={item.img} style={{ width:"100px",height:"100px" }} alt=""/>
          </div>
          <div className="shopping-content">
            {item.context}
          </div>
          <div className="shopping-price">
            {item.price}
          </div>
          <div className="shopping-delete">
            <Button type="primary" danger onClick={() => deleteGood(item)}>删除</Button>
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
  const list = JSON.parse(JSON.parse(localStorage.getItem('persist:root') || "0").list);
  console.log(list)
const goodList = [];

  for (let i = 0;i < list.length; i++) {
    goodList.push(list[i].list)
  }

  return (
    <div>
      <div className="goodsList">{List(goodList)}</div>
    </div>
  );
};

export default ShoppingList;
