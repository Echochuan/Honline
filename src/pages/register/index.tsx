import { Layout } from "antd";
import "./index.css";

import RegisterBox from "../../components/registerBox";

const { Header, Footer, Content } = Layout;

const Register = () => {
  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Header className="header-storeMenu">
          <div className="logo">
            <div className="welcome1">欢迎注册</div>
          </div>
          <a href="/login" className="to-login">已有账号，去登陆</a>
        </Header>
        <Layout>
          <Content>
            {" "}
            <RegisterBox />
          </Content>
        </Layout>
        <Footer>Copyright © 2021 Created by 524 & 525</Footer>
      </Layout>
    </div>
  );
};

export default Register;
