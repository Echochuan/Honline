import { Layout, message } from "antd";
import "./index.css";

import ShoppingList from "../../components/shoppingList/index";
import store from "../../redux/store";

const { Header, Footer, Content } = Layout;

const ShoppingCar = () => {
  store.subscribe(() => {
    console.log("subscribe", store.getState());
  });

  if (localStorage.getItem('token') === null) {
    message.error("请先登陆")
    window.location.href="/login"
  } else {
    message.success("Welcome!")
  }

  return (
    <div>
      <Layout style={{ height: "100vh", display: "block" }}>
        <Header className="header-init">
          <a href="/init">
            <div className="logo-init"></div>
          </a>
          <div className="welcome1">购物车</div>
        </Header>
        <Layout>
          <Content>
            <ShoppingList />
          </Content>
        </Layout>
        <Footer>Copyright © 2021 Created by 524 & 525</Footer>
      </Layout>
    </div>
  );
};

export default ShoppingCar;
