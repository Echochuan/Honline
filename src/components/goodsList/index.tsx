import { ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import { Button } from "antd";
import goods from "../../mock/goods.json";
import './index.css';

interface dataList {
  id: string;
  img: string;
  context: string;
  price: string;
}

const enterCar = (item:dataList) => {
  console.log({item})
}

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
              extra={<Button type="text" className="btn-enter" icon={<ShoppingCartOutlined />} onClick={(ev) => {enterCar(item)}}></Button>}
            >
              <Meta title={item.context} description={item.price} />

            </Card>
          </div>
        </Col>
      );
      return 0;
    });
  }
  return <Row>{stageList}</Row>;
};

const GoodsList = () => {
  const goodsList: dataList[] = goods.goodsList;
  console.log(goodsList);
  const imgList: string[] = [];
  const contextList: string[] = [];
  for (const i in goodsList) {
    imgList.push(goodsList[i].img);
    contextList.push(goodsList[i].context);
  }
  return (
    <div>
      <div className="goodsList">{List(goodsList)}</div>
    </div>
  );
};

export default GoodsList;
