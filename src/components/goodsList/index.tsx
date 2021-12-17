import goods from "../../mock/goods.json";

interface dataList {
  img: string;
  context: string;
  price: string;
}

const List = (goodsList: dataList[]) => {
  let stageList: any = [];
  //eslint-disable-next-line
  {
    goodsList.map((item, i) => {
      stageList.push(
        <div key={i}>
          <div className="imgBox">
            <img src={item.img} alt="" />
          </div>
          <div className="contextBox" >
            {item.context}
          </div>
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
