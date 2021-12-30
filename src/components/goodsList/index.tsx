import { ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Col, message, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import { Button } from "antd";
import "./index.css";
import axios from "axios";
import store from "../../redux/store";
import { useEffect, useState } from "react";

interface dataList {
  id: number;
  storeName: string;
  img: string;
  context: string;
  price: string;
}

const userId = store.getState().name;

const enterCar = (item: dataList) => {
  console.log(userId, item.id);
  console.log(typeof item.id, typeof userId);
  axios({
    method: "POST",
    headers: { "Content-type": "application/json" },
    url: "http://101.132.145.198:8080/homepage",
    data: {
      "gid": userId,
      "uid": item.id
    }
  }).then(function(response) {
    if (response.data.code === 200) {
      message.success("添加成功");
      console.log(response);
    } else {
      message.error("添加失败");
    }
  });
};

const List = (goodsList: dataList[]) => {
  let stageList: any = [];
  console.log(goodsList);

  //eslint-disable-next-line
  {
    goodsList.map((item, i) => {
      console.log(item);
      stageList.push(
        <Col span={4.8}>
          <div key={i} className="eachGood">
            <Card
              hoverable
              style={{ width: 190, height: 266 }}
              cover={
                <img
                  alt=""
                  src={
                    "https://lh3.googleusercontent.com/proxy/N7ay9W_Fc358b40cEZ4xU-BfRoSxZySFWU8fn2xe5_wEt6JLZyTXEwXHfFaMBX78_y0-ylwN4Jrvw6jXhrTu07reSznUfKCxXj0Q0Q"
                  }
                />
              }
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
                description={item.storeName + "¥" + item.price}
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


const GoodsList = () => {
  const [goodsList, setstate] = useState<dataList[]>([
    {
      id: 1,
      storeName: "1",
      img: "1",
      context: "1",
      price: "1"
    }
  ]);

  // var goodsList: dataList[] = [];
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "GET",
        headers: { "Content-type": "application/json" },
        url: "http://101.132.145.198:8080/homepage"
      });
      console.log(result)
      setstate(result.data.goodsList);
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="goodsList">{List(goodsList)}</div>
    </div>
  );
};

export default GoodsList;
