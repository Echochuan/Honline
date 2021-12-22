import "./index.css";

import { Layout, Button, Row, Col, Popconfirm, message } from "antd";
import { ShoppingCartOutlined, SmileOutlined } from "@ant-design/icons";

import Search from "../../components/search/index";
import GoodsList from "../../components/goodsList/index";
import FeedTab from "../../components/feedTab/index";
import store from "../../redux/store";

const { Header, Footer, Content } = Layout;

interface dataList {
  id: string;
  img: string;
  context: string;
  price: string;
}

const Init = () => {
  const onClick = () => {
    window.location.href = "/shoppingCar";
  };

  store.subscribe(() => {
    console.log("subscribe", store.getState());
  });

  const openStore = () => {
    console.log("111");
  };

  const confirm = () => {
    message.success('注册成功');
  }
  
  const cancel = () => {
    message.error('下次一定');
  }

  const topMenu = () => {
    console.log("111");
    //向后端发送请求，询问该用户是不是已经有商店
    const haveStore = false;
    // const donthave = false;
    if (haveStore) {
      return <div className="shortcut">111</div>;
    } else {
      return (
        <div className="shortcut">
          {" "}
          <Popconfirm
            title="确定要开店吗?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="是的"
            cancelText="再想想"
          >
            <a href="#" className="btn-store" onClick={openStore}>
              我要开店
            </a>
          </Popconfirm>
        </div>
      );
    }
  };

  return (
    <div>
      {/* <button>111</button> */}
      {topMenu()}
      <Layout style={{ height: "100vh", display: "block" }}>
        <Header className="header-init">
          <a href="/init">
            <div className="logo-init"></div>
          </a>
          <Search />
          <Button
            type="primary"
            size="large"
            className="Button-Car"
            icon={<ShoppingCartOutlined />}
            onClick={onClick}
          >
            我的购物车
          </Button>
        </Header>
        <Layout style={{ height: "auto", display: "block" }}>
          <Content className="content-list">
            <div className="banner"></div>
            <div className="floor">
              <Row>
                <Col span={8}></Col>
                <Col span={8} className="floorhd">
                  <SmileOutlined /> <b>为您推荐</b>
                </Col>
                <Col span={8}></Col>
              </Row>
            </div>
            <FeedTab />
            <GoodsList />
          </Content>
        </Layout>
        <Footer>Copyright © 2021 Created by 524 & 525</Footer>
      </Layout>
    </div>
  );
};

export default Init;
