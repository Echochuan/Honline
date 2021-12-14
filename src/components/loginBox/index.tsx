import { Form, Input, Button, Checkbox } from "antd";
import './index.css';
import { UserOutlined , KeyOutlined } from '@ant-design/icons';

const LoginBox = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="loginBox">
      <div className="loginBox1">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input size="large" placeholder="请输入账号" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password size="large" placeholder="请输入密码" prefix={<KeyOutlined />}/>
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>记住密码</Checkbox>
          </Form.Item>


          <div className="btn1">
            <Button size="large" type="primary" htmlType="submit">
              注册
            </Button>
          </div>

          <Form.Item wrapperCol={{ offset: 8, span: 24 }} className="btn2">
            <Button size="large" type="primary" htmlType="submit">
              登陆
            </Button>
          </Form.Item>

        </Form>
      </div>
    </div>
  );
};

export default LoginBox;
