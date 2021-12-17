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
        <Menu.Item key="mail" icon={<MailOutlined />}>
          Navigation One
        </Menu.Item>
        <Menu.Item key="a" icon={<MailOutlined />}>
          Navigation One
        </Menu.Item>
        <Menu.Item key="b" icon={<MailOutlined />}>
          Navigation One
        </Menu.Item>
      </Menu>
    );
  }
}

export default FeedTab;
