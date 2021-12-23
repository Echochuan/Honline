import { Layout } from "antd";
import "./index.css";

const { Header, Footer, Content } = Layout;

const InSafeguard = () => {
  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Header className="header-storeMenu">
          <div className="logo"></div>
        </Header>
        <Layout>
          <Content>
            {" "}
            <div className="error-message">系统维护中</div>{" "}
          </Content>
        </Layout>
        <Footer>Copyright © 2021 Created by 524 & 525</Footer>
      </Layout>
    </div>
  );
};

export default InSafeguard;
