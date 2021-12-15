//store.js
//redux的基础文件，在这里创建store

import { creatStore } from "redux";
import reducer from "./reducer";

const store = creatStore(reducer);

export default store;