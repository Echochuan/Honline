import { createStore } from "redux";
import reducer from "./reducer";

// const persistedState = localStorage.getItem('persist:root') 
//                        ? JSON.parse(localStorage.getItem('persist:root'))
//                        : {}
// console.log(JSON.parse(JSON.parse(localStorage.getItem('persist:root')).list));

const store = createStore(reducer);

export default store;