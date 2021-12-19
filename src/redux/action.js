//action.js
//action是用于存放操作类型的文件

//getName被触发时会读取输入进来的value值，并把它赋值给name
const getName = (value) => ({
    type: 'get_name',
    name: value
  });

const getGoods = (value) => ({
  type: 'get_goods',
  value
})

const checkGoods = (value) => ({
  type: 'check_goods',
  value
})

  
  //将getName方法暴露出去
  module.exports = {
    getName,
    getGoods,
    checkGoods,
  }