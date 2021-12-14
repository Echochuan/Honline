import { Layout } from "antd";
import "./index.css";

import LoginBox from "../../components/loginBox/index";

const { Header, Footer, Sider, Content } = Layout;

const Login = () => {
  return (
    <div>
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Content>Content</Content>
          <Sider>
            <LoginBox />
          </Sider>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
};

export default Login;
