//action.js
//action是用于存放操作类型的文件

//getName被触发时会读取输入进来的value值，并把它赋值给name
const getName = (value) => ({
    type: 'get_name',
    name: value
  });
  

  
  //将getName方法暴露出去
  module.exports = {
    getName,
  }