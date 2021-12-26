import React, { useState } from "react";
import { CartItem } from "./";
import { OnCheckedChange } from "./use-check";
import {
  Typography,
  Popconfirm,
  Button,
  Drawer,
  Form,
  Row,
  Col,
  Input,
  Space
} from "antd";
import "./index.css";
import store from "../../redux/store";

interface Props {
  item: CartItem;
  checked: boolean;
  onCheckedChange: OnCheckedChange<CartItem>;
}

// memo优化策略
function areEqual(prevProps: Props, nextProps: Props) {
  return prevProps.checked === nextProps.checked;
}

const ItemCard = React.memo((props: Props) => {
  const [visible, setVisible] = useState(false);

  // const [form] = Form.useForm();

  console.log("cart item rerender");
  const { item, checked, onCheckedChange } = props;
  const { id, goodsTitle, goodsPrice, goodsSrc, goodsSubtitle } = item;

  const onWrapCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    onCheckedChange(item, checked);
  };

  const deleteGood = () => {
    //获取商品的 id
    console.log(id);
    //获取用户的 id
    // const userId = store.getState().name;
    //将数据发给后端，后端返回正确的状态码之后刷新页面
    window.location.href = "/storeMenu";
  };

  //气泡确认框的相关函数
  const confirm = () => {
    deleteGood();
  };

  const cancel = () => {
    console.log("click no");
  };

  //抽屉的相关函数
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const update = (values: any) => {
    //用户更新的内容
    console.log(values);
    //商品的 id 
    console.log(id);
    //用户的 id
    console.log(store.getState().name);
    //将用户的 id , 商品的 id , 用户更新的内容传输给后端
    //若成功则刷新页面
    window.location.href="/storeMenu"
  };

  return (
    <div className="each-shopping-good">
      <div className="checkbox-wrap">
        <input
          className="checkBox"
          type="checkBox"
          checked={checked}
          onChange={onWrapCheckedChange}
        />
      </div>
      <p>
        <div>
          <img
            className="shopping-img"
            src={goodsSrc}
            style={{ width: "100px", height: "100px" }}
            alt=""
          />
        </div>
        <div className="shopping-title">{goodsTitle}</div>
        <div className="shopping-content">{goodsSubtitle}</div>
        <Typography.Text mark className="shopping-price">
          ${goodsPrice}
        </Typography.Text>
        <div className="btn-delete">
          <Popconfirm
            title="确认要从您的店铺中下架吗？"
            onConfirm={confirm}
            onCancel={cancel}
            okText="是的"
            cancelText="再想想"
          >
            <a href="# ">下架</a>
          </Popconfirm>
        </div>
        <div className="btn-comment">
          <a href="# " type="primary" onClick={showDrawer}>
            编辑
          </a>
          <Drawer
            title="编辑你的商品信息"
            width={720}
            onClose={onClose}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
            extra={
              <Space>
                <Button onClick={onClose}>取消</Button>
              </Space>
            }
          >
            <Form
              layout="vertical"
              onFinish={values => {
                update(values)
              }}
              hideRequiredMark
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="goodsTitle"
                    label="商品名称"
                    rules={[{ required: false }]}
                    initialValue={goodsTitle}
                  >
                    <Input placeholder={goodsTitle} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="goodsPrice"
                    label="商品描述"
                    rules={[{ required: false }]}
                    initialValue={goodsPrice}
                  >
                    <Input placeholder={goodsPrice} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="goodsSubtitle"
                    label="商品描述"
                    rules={[
                      {
                        required: false
                      }
                    ]}
                    initialValue={goodsSubtitle}
                  >
                    <Input.TextArea
                      rows={4}
                      placeholder={goodsSubtitle}
                      defaultValue={goodsSubtitle}
                    />
                  </Form.Item>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item>
                        <Button style={{ width: "100%" }} type="primary" htmlType="submit">
                          更新
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Drawer>
        </div>
      </p>
    </div>
  );
}, areEqual);

export default ItemCard;
