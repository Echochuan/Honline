import { Layout } from "antd";
import "./index.css";

import ShoppingList from "../../components/shoppingList/index";
import store from "../../redux/store";

const { Header, Footer, Content } = Layout;

const ShoppingCar = () => {
  store.subscribe(() => {
    console.log("subscribe", store.getState());
  });
  
  return ( 
    <div>
      <Layout style={{ height: "100vh" , display: "block"}}>
        <Header className="header-init">
          <div className="logo-init"></div>
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
