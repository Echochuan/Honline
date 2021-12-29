import { ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Col, message, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import { Button } from "antd";
import goods from "../../mock/goods.json";
import "./index.css";
import axios from "axios";
import store from "../../redux/store";

interface dataList {
  id: number;
  storeName: string,
  img: string;
  context: string;
  price: string;
}

const userId = store.getState().name;

//	

const abc = () => {axios({
  method: "GET",
  headers: { "Content-type": "application/json" },
  url: "http://101.132.145.198:8080/comment" + "?gId=1"
})
.then(function (response) {
  console.log(response);
})
}

abc();

const enterCar = (item: dataList) => {axios({
  method: "POST",
  headers: { "Content-type": "application/json" },
  url: "http://101.132.145.198:8080/homepage",
  data: {
    "gid" : item.id.toString(),
    "uid" : userId.toString(),
  },
})
.then(function (response) {
  console.log(response);
  return 0;
})
.catch(function (error) {
  console.log(error);
})
}
  //点击后将商品的 id ，用户的id，发送给后端
  //获取用户的 ID 

  // console.log(userId);
  // 获取商品的 id 
  // const goodId = item.id
  //将他们作为参数发送给后端
  //如果成功则弹出 message.success 
//   const enter = (item: dataList) => {axios({
//     method: "POST",
//     headers: { "Content-type": "application/json" },
//     url: "http://101.132.145.198:8080/homepage",
//     data: {
//       "gid" : item.id,
//       "uid" : userId,
//     },
//   })

//   message.success("添加成功");
//   enter(item);
//   //如果失败则弹出 message.error
// };

const List = (goodsList: dataList[]) => {
  let stageList: any = [];
  //可以给每一个商品卡片套一层栅格
  //eslint-disable-next-line
  {
    goodsList.map((item, i) => {
      stageList.push(
        <Col span={4.8}>
          <div key={i} className="eachGood">
            <Card
              hoverable
              style={{ width: 190, height: 266 }}
              cover={<img alt="" src={item.img} />}
              extra={
                <Button
                  type="text"
                  className="btn-enter"
                  icon={<ShoppingCartOutlined />}
                  onClick={ev => {
                    enterCar(item);
                  }}
                ></Button>
              }
            >
              <Meta title={item.context} description={item.storeName+item.price} />
            </Card>
          </div>
        </Col>
      );
      return 0;
    });
  }
  return <Row className="row-goodsList">{stageList}</Row>;
};

const GoodsList = () => {
  const goodsList: dataList[] = goods.goodsList;
  // console.log(goodsList);
  return (
    <div>
      <div className="goodsList">{List(goodsList)}</div>
    </div>
  );
};

export default GoodsList;
