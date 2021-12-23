import "./index.css";

import {
  Layout,
  Button,
  Row,
  Col,
  message,
  Input,
  Form,
  Modal
} from "antd";
import { ShoppingCartOutlined, SmileOutlined } from "@ant-design/icons";

import Search from "../../components/search/index";
import GoodsList from "../../components/goodsList/index";
import FeedTab from "../../components/feedTab/index";
import store from "../../redux/store";
import { useState } from "react";

const { Header, Footer, Content } = Layout;

interface dataList {
  id: string;
  img: string;
  context: string;
  price: string;
}

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

  //开店确认后的函数
  const onCreate = (values: any) => {
    //获取店铺的名称
    console.log(values.storeName);
    const userId = store.getState().name;
    console.log(userId);
    //向后端发送店铺的名称，用户的 Id 告诉后端该用户开启了商店
    message.success("注册成功");
    window.location.href = "/init";
    setVisible(false);
  };

  const onClick = () => {
    window.location.href = "/shoppingCar";
  };

  store.subscribe(() => {
    console.log("subscribe", store.getState());
  });

  //头部栏
  const topMenu = () => {
    //向后端发送请求，询问该用户是不是已经有商店
    const haveStore = true;
    // const donthave = false;
    if (haveStore) {
      return (
        <div className="shortcut">
          <a href="/storeMenu" className="btn-store">
            我的店铺
          </a>
        </div>
      );
    } else {
      return (
        <div className="shortcut">
          {" "}
          <div>
            <a
              href="#"
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
