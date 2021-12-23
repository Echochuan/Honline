import { BankOutlined } from "@ant-design/icons";
import { Button, Form, Input, List, Modal, Typography, Radio } from "antd";
import axios from "axios";
import { useState } from "react";
import storeList from "../../mock/storeList.json";
import store from "../../redux/store";
import "./index.css";
import ItemCard from "./ItemCard";
import { useChecked } from "./use-check";

export interface CartItem {
  id: number;
  storeName: string;
}

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  value: number;
  Uploadvisible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const getData = () => {
  return axios("../../mock/shopping.json");
};

const StoreMaster = () => {
  const [visible, setVisible] = useState(false);
  const [Uploadvisible, setUploadVisible] = useState(false);
  const [value, setValue] = useState(1);

  const onChange = (e:any) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  // console.log(getData());
  const goodList = storeList;
  const goodsList = goodList.list;
  console.log(goodsList);
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

  const safeguard = () => {
    console.log("系统维护中");
    console.log({value})
  };

  //商铺关停的相关函数
  const deleteBtn = () => {
    //把商铺的 ID 和用户的 id 发送给后端
    //获取商铺的 id
    const checkedGoodId = filterChecked().map(item => {
      console.log(item.id);
      return item.id;
    });
    //获取用户的 id
    const userId = store.getState().name;
    //将两者一起发送给后端
    //如果成功则刷新页面
    // console.log(checkedGoodId,userId);
    window.location.href = "/admin";
  };

  const Footer = (
    <div className="footer-check">
      <Modal
        visible={visible}
        title="被选中的商铺将被关停"
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
        关停
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
        title="开启系统维护"
        okText="确定"
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
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>开启</Radio>
          <Radio value={2}>关闭</Radio>
        </Radio.Group>
      </Modal>
    );
  };

  return (
    <div>
      <div className="store-name">欢迎您，管理员</div>
      <div className="btn-upload">
        <Button
          type="primary"
          onClick={() => {
            setUploadVisible(true);
          }}
        >
          系统维护
        </Button>
        <CollectionCreateForm
        value={value}
          Uploadvisible={Uploadvisible}
          onCreate={safeguard}
          onCancel={() => {
            setUploadVisible(false);
          }}
        />
      </div>
      <List
        className="goodsList"
        header={<div>现有的商铺列表</div>}
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

export default StoreMaster;
