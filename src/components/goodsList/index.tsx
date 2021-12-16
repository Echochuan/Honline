import goods from '../../mock/goods.json'

interface dataList  {
    img: string;
    context: string;
    price: string;
}

const List = (goodsList:dataList[]) => {
    return (
         <div>
             {/* 当 goods 不是对象数组的时候能渲染 */}
         {goodsList.map((goods) => {
             <img src={goods.img}></img>
        })} 
        </div>
    )
}

const GoodsList = () => {
    const goodsList:dataList[] = goods.goodsList;
    console.log(goodsList)
    const imgList: string[] = [];
    const contextList: string[] = [];
    for(const i in goodsList) {
         imgList.push(goodsList[i].img)
         contextList.push(goodsList[i].context)
    }
    return(
        <div>
            {List(goodsList)}
        </div>
    )
}

export default GoodsList;