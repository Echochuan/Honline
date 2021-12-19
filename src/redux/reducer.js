//用于判断调用的方法，相当于是一个中介？用户调用他，然后他判断我们要使用哪一种操作，匹配之后通知action运行相对应的操作
//初始化状态，这里存放的是store里会存储的数据
const defaultState = {
  name: "",
  list: []
};

// eslint-disable-next-line
export default (state = defaultState, action) => {
  //在这里对type进行判断，从而更新store中存放的数据
  if (action["type"] === "get_name") {
    return Object.assign({}, state, action);
  } else if (action["type"] === "get_goods") {
    return Object.assign({}, state, {
      list: [...state.list, { id: action.value.id }]  //用对应的键值对在 store 里存储对应的信息
    });
  }

  return state;
};
