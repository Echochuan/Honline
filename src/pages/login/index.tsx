import { Layout } from "antd";
import "./index.css";

import LoginBox from "../../components/loginBox/index";

const { Header, Footer, Content } = Layout;

const Login = () => {
  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Header>
          <div className="logo">
            <div className="welcome"></div>
          </div>
        </Header>
        <Layout>
          <Content className="content">
            {" "}
            <LoginBox />
          </Content>
        </Layout>
        <Footer>Copyright © 2021 Created by 524 & 525</Footer>
      </Layout>
    </div>
  );
};

export default Login;
