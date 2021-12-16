import { Form, Input, Button, Checkbox, message } from "antd";
import "./index.css";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";

import { getName } from "../../redux/action";
import store from "../../redux/store";

const data = {
  username: "1",
  password: "1",
  login: false
};

const LoginBox = () => {
  const onFinish = (values: any) => {
    //在这里调用登陆接口，判断返回的状态码是不是 200 ，如果是则跳转进主页， 如果不是则发出警告
    if (
      values.username === data.username &&
      values.password === data.password
    ) {
      message.success("登陆成功");
      //测试存入 store
      const action = getName(values.username);
      store.dispatch(action);
      window.location.href = "/init";
    } else {
      message.error("账户不存在或密码错误");
    }
    // store.subscribe(() => {
    //   console.log("subscribe", store.getState());
    // });
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("请输入正确信息");
  };

  const register = () => {
    window.location.href = "/register";
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
            <Input
              size="large"
              placeholder="请输入账号"
              prefix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              size="large"
              placeholder="请输入密码"
              prefix={<KeyOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <div className="btn1">
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              onClick={register}
            >
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
