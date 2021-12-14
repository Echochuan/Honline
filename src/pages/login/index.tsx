import { Layout } from "antd";
import "./index.css";

import LoginBox from "../../components/loginBox/index";

const { Header, Footer, Content } = Layout;

const Login = () => {
  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Header>Header</Header>
        <Layout>
          <Content>
            {" "}
            <LoginBox />
          </Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
};

export default Login;
