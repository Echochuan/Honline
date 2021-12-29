import { Form, Input, Button, Checkbox, message } from "antd";
import "./index.css";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";

import { getName } from "../../redux/action";
import store from "../../redux/store";
import axios from "axios";

const data = {
  username: "1",
  password: "1",
  login: false
};

const LoginBox = () => {
  const onFinish = (values: any) => {
    console.log(values);
    axios({
      method: "GET",
      headers: { "Content-type": "application/json" },
      url: "http://101.132.145.198:8080/manage/get_status"
    }).then(function(response) {
      if (!response) {
        window.location.href = "/safeguard";
      } else {
        axios({
          method: "POST",
          headers: { "Content-type": "application/json" },
          url: "http://101.132.145.198:8080/user/login",
          data: {
            username: values.username,
            password: values.password
          }
        }).then(function(response) {
          if (response.data.code === 200) {
            message.success("登陆成功");
            if (response.data.isAdmin === true) {
              window.location.href = "/admin";
            } else {
              const action = getName(response.data.userId);
              store.dispatch(action);
              // store.subscribe(() => {
              //   console.log("subscribe", store.getState());
              // });
              window.location.href="/init"
            }
          } else {
            message.error("账户不存在或密码错误");
          }
        });
      }
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("请输入正确信息");
  };

  const register = () => {
    window.location.href = "/register";
  };

  return (
    <div className="loginBox">
      <div className="loginTip">账号登陆</div>
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
