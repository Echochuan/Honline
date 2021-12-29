import { Button, Col, Layout, Menu, Progress, Row, Statistic } from "antd";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Header, Content, Footer, Sider } = Layout;

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 34 + 1000 * 30; // Moment is also OK
console.log(1643718548333);

function onFinish() {
  console.log("finished!");
}

function onChange(val: any) {
  if (4.95 * 1000 < val && val < 5 * 1000) {
    console.log("changed!");
  }
}

const Webwork = () => {
  const [collapsed, setcollapsed] = useState(false);

  const toggle = () => {
    setcollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
        <div style={{ fontSize: 30, color: "white" }}>
          Hyonline<p></p>
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            数据统计
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            后台管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <div>
              <Row gutter={16}>
                <Col span={8} style={{ marginTop: 32 }}>
                  <Statistic title="订单成交数" value={112893} />
                </Col>
                <Col span={8} style={{ marginTop: 32 }}>
                  <Statistic
                    title="营业营收额"
                    value={112893}
                    precision={2}
                  />
                </Col>
                <Col span={8} style={{ marginTop: 32 }}>
                  <Countdown
                    title="距离 2022 春节还有"
                    value={1643718548333}
                    format="D 天 H 时 m 分 s 秒"
                  />
                </Col>
              </Row>
            </div>
            <div>
              <Row gutter={16}>

              </Row>
            </div>
            <div style={{ width: 700, marginTop: 32 }}>
              <Progress  percent={30} />
              <Progress  percent={50} status="active" />
              <Progress  percent={70} status="exception" />
              <Progress  percent={100} />
              <Progress  percent={50} showInfo={false} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by LOVE{" "}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Webwork;
