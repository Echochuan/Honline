import goods from '../../mock/goods.json'

interface dataList  {
    goodsList: any;
    img: Array<string>;
    context: Array<string>;
    price: Array<string>;
    i: number;
}

const List = (img:Array<string>) => {
    return (
        <div>
        {img.map(item => (
            <img src={item} ></img>
        ))}
        </div>
    )
}

const GoodsList = () => {
    const goodsList = goods.goodsList;
    const img: string[] = [];
    for(const i in goodsList) {
         img.push(goodsList[i].img)
    }
    console.log(img);
    return(
        <div>
            {List(img)}
        </div>
    )
}

export default GoodsList;