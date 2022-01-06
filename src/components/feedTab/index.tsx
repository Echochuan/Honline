import "./index.css";
import { Menu } from "antd";
import { MailOutlined } from "@ant-design/icons";
import React from "react";
import GoodsList from "../goodsList/index"

class FeedTab extends React.Component {
  state = {
    current: "mail"
  };

  handleClick = (e: { key: any }) => {
    // console.log('click ', e);
    this.setState({ current: e.key });
  };

  showGoods = () => {
    localStorage.setItem("key", this.state.current)
      return <GoodsList/>
  };

  render() {
    const { current } = this.state;
    return (
      <>
        <Menu
          className="feedTab"
          onClick={this.handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
          <Menu.Item className="menu-item" key="likeList" icon={<MailOutlined />}>
            猜你喜欢
          </Menu.Item>
          <Menu.Item className="menu-item" key="zhineng" icon={<MailOutlined />}>
            智能先锋
          </Menu.Item>
          <Menu.Item className="menu-item" key="jujia" icon={<MailOutlined />}>
            居家优品
          </Menu.Item>
          <Menu.Item className="menu-item" key="chaoshi" icon={<MailOutlined />}>
            超市百货
          </Menu.Item>
          <Menu.Item className="menu-item" key="shishang" icon={<MailOutlined />}>
            时尚达人
          </Menu.Item>
          <Menu.Item className="menu-item" key="jinkou" icon={<MailOutlined />}>
            紧扣好物
          </Menu.Item>
        </Menu>
        <div>
          {this.showGoods()}
        </div>
      </>
    );
  }
}

export default FeedTab;
