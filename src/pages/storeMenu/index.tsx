import { Layout } from "antd";
import "./index.css"

import RegisterBox from "../../components/registerBox";

const { Header, Footer, Content } = Layout;

const storeMenu = () => {
  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Header>
            <div className="logo" >
            <div className="welcome1">欢迎注册
            </div>
            </div>
        </Header>
        <Layout>
          <Content>
            {" "}
            <RegisterBox />
          </Content>
        </Layout>
        <Footer>Copyright © 2021  Created by 524 & 525</Footer>
      </Layout>
    </div>
  );
};

export default storeMenu;
