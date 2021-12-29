import { Form, Input, Button, message } from "antd";
import "./index.css";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import store from "../../redux/store";
import { getName } from "../../redux/action";
import axios from "axios";

const RegisterBox = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
    if (values.password !== values.password2) {
      message.error("请输入两次一致的密码");
    } else {
      axios({
        method: "POST",
        headers: { "Content-type": "application/json" },
        url: "http://101.132.145.198:8080/user/register",
        data: {
          username: values.username,
          password: values.password
        }
      }).then(function(response) {
        const action = getName(response.data.data.id);
        store.dispatch(action);
        console.log(store.getState());
      });
      // store.subscribe(() => {
      //   console.log("subscribe", store.getState());
      // });
    }
    axios({
      method: "GET",
      headers: { "Content-type": "application/json" },
      url: "http://101.132.145.198:8080/manage/get_status",
    }).then(function(response) {
      if (response) {
        window.location.href="/safeguard"
      }
      else {
        window.location.href="/init"
      }
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="registerBox">
      <div className="registerBox1">
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
            name="password2"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              size="large"
              placeholder="请确认你的密码"
              prefix={<KeyOutlined />}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 24 }}>
            <Button size="large" type="primary" htmlType="submit">
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterBox;
