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
  storeName: string;
  img: string;
  context: string;
  price: string;
}

const userId = store.getState().name;

const enterCar = (item: dataList) => {
  axios({
    method: "POST",
    headers: { "Content-type": "application/json" },
    url: "http://101.132.145.198:8080/homepage",
    data: {
      gid: item.id,
      uid: userId
    }
  }).then(function(response) {
    if (response.data.code === 200) {
      message.success("添加成功");
    } else {
      message.error("添加失败");
    }
  });
};

const List = (goodsList: dataList[]) => {
  let stageList: any = [];
  //eslint-disable-next-line
  {
    goodsList.map((item, i) => {
      console.log(item)
      console.log("111")
      stageList.push(
        <Col span={4.8}>
          <div key={i} className="eachGood">
            <Card
              hoverable
              style={{ width: 190, height: 266 }}
              cover={<img alt="" src={"https://img10.360buyimg.com/jdcms/s150x150_jfs/t1/143777/37/12455/76388/5f9a55c1Ebcda14fa/1e09524ec6ab713b.jpg.webp"} />}
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
              <Meta
                title={item.context}
                description={item.storeName + "¥" +item.price}
              />
            </Card>
          </div>
        </Col>
      );
      return 0;
    });
  }
  return <Row className="row-goodsList">{stageList}</Row>;
};

var goodsList :dataList[] = [];
axios({
  method: "GET",
  headers: { "Content-type": "application/json" },
  url: "http://101.132.145.198:8080/homepage",
}).then(function(response) {
  console.log(response);
  goodsList = response.data.goodsList;
  console.log(goodsList);
})

const GoodsList = () => {

  // console.log(goodsList);
  console.log(goodsList);
  console.log(goods.goodsList);
  return (
    <div>
      <div className="goodsList">{List(goodsList)}</div>
    </div>
  );
};

export default GoodsList;
