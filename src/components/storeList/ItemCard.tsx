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
  Space,
  message
} from "antd";
import "./index.css";
import store from "../../redux/store";
import axios from "axios";
import defalt from "../../assets/default.png";

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
    axios({
      method: "POST",
      headers: { "Content-type": "application/json" },
      url: "http://101.132.145.198:8080/store/delete",
      data: {
        "gid" : id,
        "uid" : sessionStorage.getItem("id"),
      }
    }).then(function(response) {
      if (response.data.code === 200) {
        message.success("删除成功");
        window.location.href = "/storeMenu";
      } else {
        message.error("删除失败")
      }
    })
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
    axios({
      method: "POST",
      headers: { "Content-type": "application/json" },
      url: "http://101.132.145.198:8080/store/update",
      data: {
        "update" : values,
        "gid" : id,
        "uid" : sessionStorage.getItem("id"),
      }
    }).then(function(response) {
      if (response.data.code === 200) {
        message.success("更新成功");
        window.location.href="/storeMenu"
      } else {
        message.error("更新失败")
      }
    })
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
            src={defalt}
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
