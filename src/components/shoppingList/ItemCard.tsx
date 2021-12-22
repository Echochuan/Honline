import React, { useState } from "react";
import { CartItem } from "./";
import { OnCheckedChange } from "./use-check";
import {
  Typography,
  Popconfirm,
  message,
  Button,
  Drawer,
  Form,
  Row,
  Col,
  Input,
  Space,
  List,
  Comment,
  Avatar
} from "antd";
import "./index.css";
import store from "../../redux/store";

import commentsList from '../../mock/comments.json';

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
  const [childrenDrawer, setChlidrenDrawer] = useState(false);

  const [form] = Form.useForm();

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
    const userId = store.getState().name;
    //将数据发给后端，后端返回正确的状态码之后刷新页面
    window.location.href = "/shoppingCar";
  };

  //气泡确认框的相关函数
  const confirm = () => {
    deleteGood();
  }

  const cancel = () => {
    console.log("click no");
  }

  //双层抽屉的相关函数
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const showChildrenDrawer = () => {
    setChlidrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChlidrenDrawer(false);
  };

  //二级抽屉的提交函数
  const uploadComments = (values:string) => {
    //获取商品的 id
    console.log(id);
    //获取评论内容
    console.log(values);
    //获取用户的 id 
    const userId = store.getState().name;
    //将商品的 id , 用户的 id 和评论内容提交给后端存储起来

    //清空表单内容
    form.resetFields();
    //刷新页面
    window.location.href="/shoppingCar"
  }

  const commentList = commentsList.comments;
  console.log(commentList)

  const comments = (
    <List
    className="goodsList"
    // footer={Footer}
    bordered
    dataSource={commentList}
    renderItem={item => {
      // console.log(checked)
      return (
        <Comment
        style={{ width:"80%", margin: "0 auto" }}
        author={<p>{item.id}</p>}
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt={ item.id } />}
        content={
          <p>
            {item.comment}
          </p>
        }
      />
      );
    }}
  />
  )

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
            title="确认要从购物车中删除吗？"
            onConfirm={confirm}
            onCancel={cancel}
            okText="是的"
            cancelText="再想想"
          >
            <a href="#">删除</a>
          </Popconfirm>
        </div>
        <div className="btn-delete">
          <Button type="primary" onClick={showDrawer}>
            Open drawer
          </Button>
          <Drawer
            title="商品评价"
            width={520}
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            {comments}
            <Button type="primary" onClick={showChildrenDrawer}>
              去评论
            </Button>
            <Drawer
              title="评论"
              width={320}
              closable={false}
              onClose={onChildrenDrawerClose}
              visible={childrenDrawer}
              extra={
                <Space>
                  <Button onClick={onChildrenDrawerClose}>取消</Button>
                </Space>
              }
            >
              <Form
                layout="vertical"
                onFinish={(values) => {uploadComments(values)}}
                form={form}
                hideRequiredMark
              >
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="comment"
                      rules={[
                        {
                          required: true,
                          message: "内容不能为空"
                        }
                      ]}
                    >
                      <Input.TextArea
                        rows={4}
                        placeholder="请输入你对商品的评价"
                      />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button type="primary" htmlType="submit">
                        评论
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Drawer>
          </Drawer>
        </div>
      </p>
    </div>
  );
}, areEqual);

export default ItemCard;
