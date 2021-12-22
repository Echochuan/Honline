import { BankOutlined } from "@ant-design/icons";
import { Button, Form, Input, List, Modal, Typography } from "antd";
import axios from "axios";
import { useState } from "react";
import shopping from "../../mock/storeMenu.json";
import store from "../../redux/store";
import "./index.css";
import ItemCard from "./ItemCard";
import { useChecked } from "./use-check";

export interface CartItem {
  id: number;
  goodsSrc: string;
  goodsTitle: string;
  goodsSubtitle: string;
  goodsPrice: string;
  goodsNum: string;
}

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  Uploadvisible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const getData = () => {
  return axios("../../mock/shopping.json");
};

const StoreList = () => {
  const [visible, setVisible] = useState(false);
  const [Uploadvisible, setUploadVisible] = useState(false);

  // console.log(getData());
  const goodList = shopping;
  const userid = shopping.userId;
  const storeName = shopping.storeName;
  const goodsList = goodList.list;
  // console.log(userid);
  // console.log(goodsList);

  const {
    checkedAll,
    checkedMap,
    onCheckedAllChange,
    onCheckedChange,
    filterChecked
  } = useChecked(goodsList);

  const onWrapCheckedAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkAll = e.target.checked;
    onCheckedAllChange(checkAll);
  };

  const uploadGood = (values: any) => {
    console.log("Received values of form: ", values);
    //获取商品的名称
    console.log(values.goodsTitle);
    //获取商品的描述
    console.log(values.goodsSubtitle);
    //获取商品的价格
    console.log(values.goodsPrice);
    //获取用户的 id
    console.log(store.getState().name);
    //将上述数据传送给后端，如果成功，则刷新页面
    window.location.href = "/storeMenu";
    setUploadVisible(false);
  };

  const deleteBtn = () => {
    //把商品的 ID 和用户的 id 发送给后端
    //获取商品的 id
    const checkedGoodId = filterChecked().map(item => {
      return item.id;
    });
    //获取用户的 id
    const userId = store.getState().name;
    //将两者一起发送给后端
    //如果成功则刷新页面
    // console.log(checkedGoodId,userId);
    window.location.href = "/storeMenu";
  };

  const Footer = (
    <div className="footer-check">
      <Modal
        visible={visible}
        title="被选中的商品将被下架"
        okText="确认"
        cancelText="再想想"
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          deleteBtn();
        }}
      ></Modal>
      <div>
        <input
          className="checkBox"
          checked={checkedAll}
          onChange={onWrapCheckedAllChange}
          type="checkbox"
        />
        <div className="check-all-box">全选</div>
      </div>
      <Button
        className="btn-pay"
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        下架
      </Button>
    </div>
  );

  //上架商品的信息弹出框
  const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    Uploadvisible,
    onCreate,
    onCancel
  }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={Uploadvisible}
        title="上架商品"
        okText="上架"
        cancelText="再想想"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              onCreate(values);
            })
            .catch(info => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <Form.Item
            name="goodsTitle"
            label="商品名称"
            rules={[
              {
                required: true,
                message: "商品名称不能为空"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="goodsSubtitle"
            label="商品描述"
            rules={[
              {
                required: true,
                message: "商品描述不能为空"
              }
            ]}
          >
            <Input type="textarea" />
          </Form.Item>
          <Form.Item
            name="goodsPrice"
            label="商品价格"
            rules={[
              {
                required: true,
                message: "商品价格不能为空"
              }
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return (
    <div>
      <div className="store-name">
        <BankOutlined />
        {storeName}
      </div>
      <div className="btn-upload">
        <Button
          type="primary"
          onClick={() => {
            setUploadVisible(true);
          }}
        >
          上架商品
        </Button>
        <CollectionCreateForm
          Uploadvisible={Uploadvisible}
          onCreate={uploadGood}
          onCancel={() => {
            setUploadVisible(false);
          }}
        />
      </div>
      <List
        className="goodsList"
        header={<div>您店铺的商品列表</div>}
        bordered
        dataSource={goodsList}
        renderItem={item => {
          const checked = checkedMap[item.id] || false;
          return (
            <List.Item>
              <ItemCard
                item={item}
                checked={checked}
                onCheckedChange={onCheckedChange}
              />
            </List.Item>
          );
        }}
      />
      <div className="footer">{Footer}</div>
    </div>
  );
};

export default StoreList;
