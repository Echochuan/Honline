import {
  Avatar,
  Card,
  Col,
  Form,
  Input,
  Layout,
  Menu,
  Modal,
  Progress,
  Row,
  Statistic,
  Timeline
} from "antd";
import {
  ClockCircleOutlined,
  DesktopOutlined,
  EditOutlined,
  EllipsisOutlined,
  PieChartOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { useState } from "react";

import "./index.css";
import Meta from "antd/lib/card/Meta";

const { Header, Content, Footer, Sider } = Layout;
const { Countdown } = Statistic;

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

const Webwork = () => {
  const [collapsed, setcollapsed] = useState(false);
  const [name, setName] = useState("解忧杂货铺");
  const [title, setTitle] = useState("所有过往，皆为序章");
  const [visible, setVisible] = useState(false);
  const [keyItem, setkey] = useState("1");

  const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    visible,
    onCreate,
    onCancel
  }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="更改商铺信息"
        okText="确认更改"
        cancelText="取消更改"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              onCreate(values);
              setName(values.title);
              setTitle(values.description);
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
            name="title"
            label="店铺名称"
            rules={[{ required: true, message: "请输入修改后的商铺名称" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="店铺描述 / slogan">
            <Input type="textarea" />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

  const toggle = () => {
    setcollapsed(!collapsed);
  };

  const change = (values: any) => {
    console.log(values);
    setkey(values.key);
  };

  const show = () => {
    console.log(keyItem);
    if (keyItem === "1") {
      return (
        <>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <div>
              <Row gutter={16} className="count">
                <Col span={8} style={{ marginTop: 12 }}>
                  <Statistic
                    title="订单成交数"
                    value={112893}
                    style={{ margin: "auto" }}
                  />
                </Col>
                <Col span={8} style={{ marginTop: 12 }}>
                  <Statistic title="营业营收额" value={112893} precision={2} />
                </Col>
                <Col span={8} style={{ marginTop: 12 }}>
                  <Countdown
                    title="距离 2022 春节还有"
                    value={1643718548333}
                    format="D 天 H 时 m 分 s 秒"
                  />
                </Col>
              </Row>
            </div>
            <div>
              <Row gutter={16}></Row>
            </div>
            <div style={{ width: 800, marginTop: 32 }} className="counT">
              <br></br>
              <span style={{ fontSize: 20, textAlign: "left" }}>
                发货商单占总商单比例
              </span>
              <p></p>
              <br></br>
              <Progress percent={50} status="active" style={{ width: 700 }} />
              <p></p>
              <br></br>
              <p></p>
              <br></br>
              <span style={{ fontSize: 20, textAlign: "left" }}>
                用户好评率
              </span>
              <p></p>
              <br></br>
              <Progress percent={100} style={{ width: 700 }} />
            </div>
          </div>
          <div>
            <Card
              className="card"
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined
                  key="edit"
                  onClick={() => {
                    setVisible(true);
                  }}
                />,
                <EllipsisOutlined key="ellipsis" />
              ]}
            >
              <CollectionCreateForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                  setVisible(false);
                }}
              />
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={name}
                description={title}
              />
            </Card>
          </div>
          <div className="coun">
            <p></p>
            <br></br>
            <div
              style={{
                fontSize: 20,
                textAlign: "left",
                marginLeft: 20,
                marginTop: 20
              }}
            >
              时间轴
            </div>
            <Timeline>
              <p></p>
              <br></br>
              <Timeline.Item
                style={{ marginLeft: 20, marginTop: 20, fontSize: 15 }}
              >
                创建了自己的商铺 ———— 解忧杂货铺 2018-09-01
              </Timeline.Item>
              <Timeline.Item
                style={{ marginLeft: 20, marginTop: 20, fontSize: 15 }}
              >
                商铺第一次成交商单超过 100,000 件 2020-09-01
              </Timeline.Item>
              <Timeline.Item
                style={{ marginLeft: 20, marginTop: 20, fontSize: 15 }}
              >
                商铺第一次成交额超过 100,000 万元人民币 2021-09-01
              </Timeline.Item>
              <Timeline.Item
                style={{ marginLeft: 20, marginTop: 20, fontSize: 15 }}
                dot={<ClockCircleOutlined className="timeline-clock-icon" />}
                color="red"
              >
                更多故事还在路上...... 2021-09-01
              </Timeline.Item>
              <p></p>
              <br />
            </Timeline>
          </div>
        </>
      );
    } else if (keyItem === "2") {
      return (
        <div>
          
          <div className="info warp">
            <ul>
              <li className="info_2">
                <img
                  src="https://img14.360buyimg.com/n1/s450x450_jfs/t1/198378/29/6239/84877/61307c3eE933c64f7/3250b9fe8c3359bb.jpg"
                  width="100px"
                />
              </li>
              <li className="info_3">
                <a>
                华为笔记本电脑MateBook 13s 2021 11代酷睿i7-11370H 16G 512G锐炬显卡/13.4英寸全面触控屏/轻薄办公本 银
                </a>
              </li>
              <li className="info_4">华为官方旗舰店</li>
              <li className="info_5">7599.00</li>
            </ul>
          </div>
          <div className="info warp">
            <ul>
              <li className="info_2">
                <img
                  src="https://img11.360buyimg.com/n1/jfs/t1/205949/28/5054/74446/61358c5eE08471f4f/b76f773ead68022c.jpg"
                  width="100px"
                />
              </li>
              <li className="info_3">
                <a>
                HUAWEI MateView原色显示器无线版 28.2英寸 4K+ IPS 98% DCI-P3 10.7亿色 HDR400 TypeC 65W 双扬声器 双MIC
                </a>
              </li>
              <li className="info_4">华为官方旗舰店</li>
              <li className="info_5">4199.00</li>
            </ul>
          </div>
          <div className="info warp">
            <ul>
              <li className="info_2">
                <img
                  src="https://img13.360buyimg.com/n1/s450x450_jfs/t1/216850/28/10030/404829/61d537b6E67a35007/055d25303c54c51c.jpg"
                  width="100px"
                />
              </li>
              <li className="info_3">
                <a>
                华为智选 海雀智能摄像头S 2K 监测智能家居家用监控器 全景巡航高清300W像素 DZ01 白色
                </a>
              </li>
              <li className="info_4">华为官方旗舰店</li>
              <li className="info_5">199.00</li>
            </ul>
          </div>
          <div className="info warp">
            <ul>
              <li className="info_2">
                <img
                  src="https://img13.360buyimg.com/n1/jfs/t1/104457/35/19851/76902/61d536bfEf50fa092/36de5c8127ab9ce9.jpg"
                  width="100px"
                />
              </li>
              <li className="info_3">
                <a>
                华为智选电动牙刷 智能声波牙刷 90天长续航 成人情侣款 星夜黑（支持HUAWEI Hilink）
                </a>
              </li>
              <li className="info_4">华为官方旗舰店</li>
              <li className="info_5">169.00</li>
            </ul>
          </div>
        </div>
      );
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
        <div style={{ fontSize: 30, color: "white" }}>
          Hyonline<p></p>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          onClick={e => change(e)}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            数据统计
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            商品管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>{show()}</Content>
        <Footer style={{ textAlign: "center" }}>©2021 Created by LOVE </Footer>
      </Layout>
    </Layout>
  );
};

export default Webwork;
