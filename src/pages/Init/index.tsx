import { Layout } from "antd";
import "./index.css";

import  Search  from "../../components/search/index";

const { Header, Footer, Content } = Layout;

const Init = () => {
  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Header className="header-init">
          <div className="logo-init"></div>
         <Search />
        </Header>
        <Layout>
          <Content >
            {" "}
          </Content>
        </Layout>
        <Footer>Copyright © 2021 Created by 524 & 525</Footer>
      </Layout>
    </div>
  );
};

export default Init;
