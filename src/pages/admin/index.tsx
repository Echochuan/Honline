import { Layout } from "antd";
import "./index.css";

const { Header, Footer, Content } = Layout;

const Admin = () => {
  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Header className="header-login">
          <div className="logo">
          </div>
        </Header>
        <Layout>
          <Content className="">
              这里是管理员模块
          </Content>
        </Layout>
        <Footer>Copyright © 2021 Created by 524 & 525</Footer>
      </Layout>
    </div>
  );
};

export default Admin;
