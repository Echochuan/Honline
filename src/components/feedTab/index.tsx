import "./index.css";
import { Menu } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import React from "react";


class FeedTab extends React.Component {
  state = {
    current: 'mail',
  };

  handleClick = (e: { key: any; }) => {
    // console.log('click ', e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <Menu className="feedTab" onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item className="menu-item" key="mail" icon={<MailOutlined />}>
            猜你喜欢
        </Menu.Item>
        <Menu.Item className="menu-item" key="a" icon={<MailOutlined />}>
            智能先锋
        </Menu.Item>
        <Menu.Item className="menu-item" key="b" icon={<MailOutlined />}>
            居家优品
        </Menu.Item>
        <Menu.Item className="menu-item" key="c" icon={<MailOutlined />}>
            超市百货
        </Menu.Item>
        <Menu.Item className="menu-item" key="d" icon={<MailOutlined />}>
            时尚达人
        </Menu.Item>
        <Menu.Item className="menu-item" key="e" icon={<MailOutlined />}>
            紧扣好物
        </Menu.Item>
      </Menu>
    );
  }
}

export default FeedTab;
