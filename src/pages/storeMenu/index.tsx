import { Layout } from "antd";
import "./index.css"

const { Header, Footer, Content } = Layout;

const StoreMenu = () => {
  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Header className="header-storeMenu">
        <a href="/init"><div className="logo-init"></div></a>
        </Header>
        <Layout>
          <Content>
            {" "}
          </Content>
        </Layout>
        <Footer>Copyright © 2021  Created by 524 & 525</Footer>
      </Layout>
    </div>
  );
};

export default StoreMenu;
