import "./index.css";

import {
  Layout,
  Button,
  Row,
  Col,
  message,
  Input,
  Form,
  Modal,
  Carousel
} from "antd";
import { ShoppingCartOutlined, SmileOutlined } from "@ant-design/icons";

import Search from "../../components/search/index";
import GoodsList from "../../components/goodsList/index";
import FeedTab from "../../components/feedTab/index";
import store from "../../redux/store";
import { useState } from "react";
import axios from "axios";

const { Header, Footer, Content } = Layout;

// interface dataList {
//   id: string;
//   img: string;
//   context: string;
//   price: string;
// }

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="我要开店"
      okText="确认"
      cancelText="再想想"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="storeName"
          label="您的商铺名"
          rules={[{ required: true, message: "店铺名不能为空" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Init = () => {
  const [visible, setVisible] = useState(false);
  const [haveStore, setHaveStore] = useState(false);

  if (localStorage.getItem("token") === null) {
    message.error("请先登陆");
    window.location.href = "/login";
  } else {
    // message.success("Welcome!")
  }

  //开店确认后的函数
  const onCreate = (values: any) => {
    console.log(
      typeof values.storeName,
      typeof Number(localStorage.getItem("id"))
    );
    axios({
      method: "POST",
      headers: { "Content-type": "application/json" },
      url: "http://101.132.145.198:8080/manage/create_store",
      data: {
        storeName: values.storeName,
        userKey: Number(localStorage.getItem("id"))
      }
    }).then(function(response) {
      if (response.data.code === 200) {
        message.success("创建成功");
        window.location.href = "/storeMenu";
        setVisible(false);
      } else {
        message.error("创建失败");
      }
    });
  };

  const onClick = () => {
    // window.location.href = "/shoppingCar";
    window.location.href = "http://127.0.0.1:5500/src/pages/jiesuan/index.html";
  };

  store.subscribe(() => {
    console.log("subscribe", store.getState());
  });

  //头部栏
  const topMenu = () => {
    axios({
      method: "POST",
      headers: { "Content-type": "application/json" },
      url: "http://101.132.145.198:8080/manage/is_open_store",
      data: {
        userId: localStorage.getItem("id")
      }
    }).then(function(response) {
      setHaveStore(response.data.toOpenStore);
    });
    //向后端发送请求，询问该用户是不是已经有商店
    // const donthave = false;
    if (haveStore) {
      return (
        <div className="shortcut">
          {/* <a href="/storeMenu" className="btn-store"> */}
          <a href="/webwork" className="btn-store">
            我的店铺
          </a>
        </div>
      );
    } else {
      return (
        <div className="shortcut">
          <div>
            <a
              href="# "
              className="btn-store"
              type="primary"
              onClick={() => {
                setVisible(true);
              }}
            >
              我要开店
            </a>
            <CollectionCreateForm
              visible={visible}
              onCreate={onCreate}
              onCancel={() => {
                setVisible(false);
              }}
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div>
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
            <div className="banner">
              <Row>
                <Col span={6}>
                  <div className="banner-left"></div>
                </Col>
                <Col span={12}>
                  <Carousel autoplay>
                    <div>
                      <h3 className="banneritem">
                        <img
                          onClick={e =>
                            (window.location.href =
                              "http://127.0.0.1:5500/src/pages/xiangqing/index.html")
                          }
                          width="500px"
                          alt="1"
                          src="https://img10.360buyimg.com/pop/s1180x940_jfs/t1/169365/40/26675/52069/61c5bbf9Ef1471228/faa5b81f7d65fd21.jpg.webp"
                        ></img>
                      </h3>
                    </div>
                    <div>
                      <h3 className="banneritem">
                        <img
                          onClick={e =>
                            (window.location.href =
                              "http://127.0.0.1:5500/src/pages/xiangqing/index.html")
                          }
                          width="500px"
                          alt="2"
                          src="https://img30.360buyimg.com/pop/s1180x940_jfs/t1/131845/14/20897/83634/61cab273Ebd0fec46/8405a8e5bd168565.jpg.webp"
                        ></img>
                      </h3>
                    </div>
                    <div>
                      <h3 className="banneritem">
                        <img
                          onClick={e =>
                            (window.location.href =
                              "http://127.0.0.1:5500/src/pages/xiangqing/index.html")
                          }
                          width="500px"
                          alt="3"
                          src="https://imgcps.jd.com/ling4/100008631911/5bCP5a6255S15pqW5Yas5a2j/5Y-W5pqW54iG5qy-55u06ZmN/p-5bd8253082acdd181d02f9fa/f471380f/cr/s/q.jpg"
                        ></img>
                      </h3>
                    </div>
                    <div>
                      <h3 className="banneritem">
                        <img
                          onClick={e =>
                            (window.location.href =
                              "http://127.0.0.1:5500/src/pages/xiangqing/index.html")
                          }
                          width="500px"
                          alt="4"
                          src="https://img30.360buyimg.com/pop/s1180x940_jfs/t1/216211/29/7199/81887/61b30f8dE3c9c8dc9/06a14751ba10a2b2.jpg.webp"
                        ></img>
                      </h3>
                    </div>
                  </Carousel>
                </Col>
                <Col span={6}>
                  <div className="banner-right"></div>
                </Col>
              </Row>
            </div>
            <div className="under-search">
              <Button className="button-item">秒杀</Button>
              <Button className="button-item">优惠劵</Button>
              <Button className="button-item">品牌闪购</Button>
              <Button className="button-item">限时拍卖</Button>
              <Button className="button-item">家电机器</Button>
              <Button className="button-item">活力生鲜</Button>
            </div>
            <div
              className="fourAd"
              style={{ width: "60vw", margin: "0 auto" }}
            >
            </div>
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
            {/* <GoodsList /> */}
          </Content>
        </Layout>
        <Footer>Copyright © 2021 Created by 524 & 525</Footer>
      </Layout>
    </div>
  );
};

export default Init;
