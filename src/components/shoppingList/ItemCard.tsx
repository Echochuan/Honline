import React, { useEffect, useState } from "react";
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
  List,
  Comment,
  Avatar,
  message
} from "antd";
import "./index.css";

import { BankOutlined } from "@ant-design/icons";
import axios from "axios";
import store from "../../redux/store";

import defult from "../../assets/default.png";

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

  const { item, checked, onCheckedChange } = props;
  const { id, storeName, goodsTitle, goodsPrice, goodsSubtitle } = item;

  const onWrapCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    onCheckedChange(item, checked);
  };

  const deleteGood = () => {
    console.log(store.getState().name,id);
    axios({
      method: "POST",
      headers: { "Content-type": "application/json" },
      url: "http://101.132.145.198:8080/cart/delete",
      data: {
        "uid" : sessionStorage.getItem("id"),
        "gid" : id,
      }
    }).then(function(response) {
      console.log(response);
      if (response.data.code === 200) {
        message.success("删除成功")
        window.location.href= "/shoppingCar"
      } else {
        message.error("删除失败")
      }
    })
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
  const uploadComments = (values:any) => {
    const userId = sessionStorage.getItem("id");
    axios({
      method: "POST",
      headers: { "Content-type": "application/json" },
      url: "http://101.132.145.198:8080/comment",
      data: {
        "gid" : id,
        "comment" : values.comment,
        "uid" : Number(userId),
      }
    }).then(function(response) {
      form.resetFields();
      if (response.data.code === 200) {
        message.success("评论成功")
        window.location.href="/shoppingCar"
      } else {
        message.error("添加失败")
      }
    })
  }

  const [commentList, setComment] = useState([
    {
      id: 1,
      content: ""
    }
  ]);

  // var goodsList: dataList[] = [];
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "GET",
        headers: { "Content-type": "application/json" },
        url: "http://101.132.145.198:8080/comment?gId=" + id
      });
      console.log(result);
      setComment(result.data.comments);
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  // const commentList = commentsList.comments;

  const comments = (
    <List
    className="goodsList"
    // footer={Footer}
    bordered
    dataSource={commentList}
    renderItem={item => {
      // console.log(commentList)
      return (
        <Comment
        style={{ width:"80%", margin: "0 auto" }}
        author={<p>{item.id}</p>}
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt={ item.id.toString() } />}
        content={
          <p>
            {item.content}
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
            src={ defult }
            style={{ width: "100px", height: "100px" }}
            alt=""
          />
        </div>
        <div className="shopping-title">{goodsTitle}</div>
        <div className="shopping-content">{goodsSubtitle}</div>
        <div className="shopping-store"><BankOutlined />{storeName}</div>
        <Typography.Text mark className="shopping-price">
          ¥{goodsPrice}
        </Typography.Text>
        <div className="btn-delete">
          <Popconfirm
            title="确认要从购物车中删除吗？"
            onConfirm={confirm}
            onCancel={cancel}
            okText="是的"
            cancelText="再想想"
          >
            <a href="# ">删除</a>
          </Popconfirm>
        </div>
        <div className="btn-comment">
          <a href="# " type="primary" onClick={showDrawer}>
            评论
          </a>
          <Drawer
            title="商品评价"
            width={520}
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            {comments}
            <Button className="btn-to-comment" type="primary" onClick={showChildrenDrawer}>
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
