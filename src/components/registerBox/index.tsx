import { Form, Input, Button, message } from "antd";
import "./index.css";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import store from "../../redux/store";
import { getName } from "../../redux/action";

const RegisterBox = () => {

  const onFinish = (values: any) => {

    console.log("Success:", values);
    if (values.password !== values.password2) {
      message.error("请输入两次一致的密码");
    } else {
      //在这里调用接口，把账户和密码发送给后端存储
      //后端返回该用户的 id 将它存入 store 中
      const action = getName("101"); /**将这里的 101 更换为获取的用户 id */
      store.dispatch(action);
      console.log(store.getState())
      store.subscribe(() => {
        console.log("subscribe", store.getState());
      });
      //然后判断是否在维护中，若在 则跳转到维护页面，若不在 则正常跳转到主页
      window.location.href = "/init";
      // window.location.href = "/safeguard"
    }
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
