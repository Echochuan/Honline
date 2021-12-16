import { Layout, Button } from "antd";
import "./index.css";

import Search from "../../components/search/index";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Header, Footer, Content } = Layout;

const Init = () => {

  const onClick = () => {
    window.location.href = "/shoppingCar"
  }

  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Header className="header-init">
          <div className="logo-init"></div>
          <Search />
          <Button type="primary" size="large" className="Button-Car" icon={<ShoppingCartOutlined /> } onClick={ onClick }>我的购物车</Button>
        </Header>
        <Layout>
          <Content> </Content>
        </Layout>
        <Footer>Copyright © 2021 Created by 524 & 525</Footer>
      </Layout>
    </div>
  );
};

export default Init;
