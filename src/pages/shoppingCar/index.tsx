import { Layout, Button } from "antd";
import "./index.css";

const { Header, Footer, Content } = Layout;

const ShoppingCar = () => {
  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Header className="header-init">
          <div className="logo-init"></div>
        </Header>
        <Layout>
          <Content> 这里是购物车页面 </Content>
        </Layout>
        <Footer>Copyright © 2021 Created by 524 & 525</Footer>
      </Layout>
    </div>
  );
};

export default ShoppingCar;
