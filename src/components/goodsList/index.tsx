import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import goods from "../../mock/goods.json";

interface dataList {
  img: string;
  context: string;
  price: string;
}

const List = (goodsList: dataList[]) => {
  let stageList: any = [];
  //可以给每一个商品卡片套一层栅格
  //eslint-disable-next-line
  {
    goodsList.map((item, i) => {
      stageList.push(
        <div key={i}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt=""
                src={item.img}
              />
            }
          >
            <Meta title={item.context} description={item.price} />
          </Card>
        </div>
      );
      return 0;
    });
  }
  return <div>{stageList}</div>;
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
  return <div>{List(goodsList)}</div>;
};

export default GoodsList;
