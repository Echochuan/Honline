import "./index.css";
import goods from "../../mock/goods.json";

import { Layout, Button, Row, Col } from "antd";
import { ShoppingCartOutlined, SmileOutlined } from "@ant-design/icons";

import Search from "../../components/search/index";
import GoodsList from "../../components/goodsList/index";
import FeedTab from "../../components/feedTab/index";
import { getGoods } from "../../redux/action";
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

  const goodsList: dataList[] = goods.goodsList;

  // eslint-disable-next-line
  {
    // eslint-disable-next-line
    goodsList.map((item, i) => {
      const action_list = getGoods(item);
      store.dispatch(action_list);
    });
  }

  console.log("111")

  store.subscribe(() => {
    console.log("subscribe", store.getState());
  });

  return (
    <div>
      <Layout style={{ height: "100vh", display: "block" }}>
        <Header className="header-init">
          <div className="logo-init"></div>
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
                <Col span={8} className="floorhd"><SmileOutlined /> <b>为您推荐</b></Col>
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
