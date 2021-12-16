import { Layout } from "antd";
import "./index.css";

const { Header, Footer, Content } = Layout;

const Init = () => {
  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Header>
          <div className="logo"></div>
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
