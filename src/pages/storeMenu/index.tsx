import { Layout } from "antd";
import "./index.css";

import StoreList from "../../components/storeList";

const { Header, Footer, Content } = Layout;

const StoreMenu = () => {
  return (
    <div>
      <Layout style={{ height: "auto", display: "block" }}>
        <Header className="header-storeMenu">
          <a href="/init">
            <div className="logo-init"></div>
          </a>
          <div className="welcome1">我的商铺</div>
        </Header>
        <Layout>
          <Content>
            {" "}
            <StoreList />
          </Content>
        </Layout>
        <Footer>Copyright © 2021 Created by 524 & 525</Footer>
      </Layout>
    </div>
  );
};

export default StoreMenu;
