//用于判断调用的方法，相当于是一个中介？用户调用他，然后他判断我们要使用哪一种操作，匹配之后通知action运行相对应的操作

import { stringify } from "querystring";

//初始化状态，这里存放的是store里会存储的数据
const defaultState = {
  name: "",
  list: []
};

function delObj(obj) {
  var uniques = [];
  var stringify = {};
  for (var i = 0; i < obj.length; i++) {
    var keys = Object.keys(obj[i]);
    keys.splice(1);
    keys.sort(function(a, b) {
      return Number(a) - Number(b);
    });
    var str = "";
    for (var j = 0; j < keys.length; j++) {
      str += JSON.stringify(keys[j]);
      str += JSON.stringify(obj[i][keys[j]]);
    }
    if (!stringify.hasOwnProperty(str)) {
      uniques.push(obj[i]);
      stringify[str] = true;
    }
  }
  return uniques;
}

// eslint-disable-next-line
export default (state = defaultState, action) => {
  //在这里对type进行判断，从而更新store中存放的数据
  if (action["type"] === "get_name") {
    return Object.assign({}, state, action);
  } else if (action["type"] === "get_goods") {
    state.list = delObj(state.list);
    console.log(action.value)
    let checkList = state.list;
    //eslint-disable-next-line
    checkList.map(item => {
      item.check = false;
    });
    return Object.assign({}, state, { list: [...checkList] , check: false});
    if (state.list.check !== undefined) {
      return Object.assign({}, state, { list: [...checkList] });
    } else {
      return Object.assign({}, state, {
        list: [...state.list, { list: action.value, check: false }]
      });
    }
  } else if (action["type"] === "check_goods") {
    let checkList = state.list;
    // eslint-disable-next-line
    checkList.map(item => {
      if (item.list.id === action.value) {
        item.check = !item.check;
      }
    });
    checkList = delObj(checkList);
    return Object.assign({}, state, { list: [...checkList] });
  } else if (action["type"] === "delete_goods") {
    //也许可以尝试从 local 里面拿和修改数据
    let newState = JSON.parse(
      JSON.parse(localStorage.getItem("persist:root") || "0").list
    );
    const goodList = [];

    for (let i = 0; i < newState.length; i++) {
      goodList.push(newState[i].list);
    }
    console.log(goodList);
    console.log(action.value);
    goodList.splice(action.index,1)  //删除数组中对应的值
    console.log(goodList)
    window.localStorage["persist:root"] = stringify(goodList);
    return goodList;
  }

  return state;
};
