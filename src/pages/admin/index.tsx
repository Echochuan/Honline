import { Layout, message } from "antd";
import "./index.css";

import StoreMaster from "../../components/storeMaster";

const { Header, Footer, Content } = Layout;

const Admin = () => {

  if (localStorage.getItem('token') === null) {
    message.error("请先登陆")
    window.location.href="/login"
  } else {
    // message.success("Welcome!")
  }
  
  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Header className="header-login">
          <div className="logo">
            <div className="welcome1">管理员</div>
          </div>
        </Header>
        <Layout>
          <Content className="content-list">
            <StoreMaster />
          </Content>
        </Layout>
        <Footer>Copyright © 2021 Created by 524 & 525</Footer>
      </Layout>
    </div>
  );
};

export default Admin;
