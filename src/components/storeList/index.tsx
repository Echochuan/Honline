import { BankOutlined } from "@ant-design/icons";
import { Button, Form, Input, List, message, Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
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

const StoreList = () => {
  const [visible, setVisible] = useState(false);
  const [Uploadvisible, setUploadVisible] = useState(false);

  const [goodsList, setstate] = useState<CartItem[]>([]);
  const [storeName, setName] = useState("")

  // var goodsList: dataList[] = [];
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "GET",
        headers: { "Content-type": "application/json" },
        url: "http://101.132.145.198:8080/store/show?uId=" + localStorage.getItem("id")
      })
      console.log(result);
      setName(result.data.storeName)
      setstate(result.data.list);
    };

    fetchData();
  }, []);

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
    axios({
      method: "POST",
      headers: { "Content-type": "application/json" },
      url: "http://101.132.145.198:8080/store/add",
      data: {
        "goodsName": values.goodsTitle,
        "description": values.goodsSubtitle,
        "price": values.goodsPrice,
        "uid": localStorage.getItem("id")
      }
    }).then(function(response) {
      if (response.data.code === 200) {
        console.log(response);
        message.success("????????????");
        window.location.href = "/storeMenu";
      } else {
        message.error("????????????");
      }
    }).catch(function(error) {
      message.error("????????????????????????")
    });
    setUploadVisible(false);
  };

  const deleteBtn = () => {
    //???????????? ID ???????????? id ???????????????
    //??????????????? id
    // eslint-disable-next-line
    const checkedGoodId = filterChecked().map(item => {
          console.log(item.id, store.getState().name)
      axios({
        method: "POST",
        headers: { "Content-type": "application/json" },
        url: "http://101.132.145.198:8080/store/delete",
        data: {
          "gid" : item.id,
          "uid" : localStorage.getItem("id")
        }
      }).then(function(response) {
        if (response.data.code === 200) {
          message.success("????????????")
          console.log(response);
          window.location.href = "/storeMenu";
          return;
        } else {
          message.error("????????????")
          return;
        }
      })
    });
    console.log(checkedGoodId);
  };

  const Footer = (
    <div className="footer-check">
      <Modal
        visible={visible}
        title="??????????????????????????????"
        okText="??????"
        cancelText="?????????"
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
        <div className="check-all-box">??????</div>
      </div>
      <Button
        className="btn-pay"
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        ??????
      </Button>
    </div>
  );

  //??????????????????????????????
  const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    Uploadvisible,
    onCreate,
    onCancel
  }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={Uploadvisible}
        title="????????????"
        okText="??????"
        cancelText="?????????"
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
            label="????????????"
            rules={[
              {
                required: true,
                message: "????????????????????????"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="goodsSubtitle"
            label="????????????"
            rules={[
              {
                required: true,
                message: "????????????????????????"
              }
            ]}
          >
            <Input type="textarea" />
          </Form.Item>
          <Form.Item
            name="goodsPrice"
            label="????????????"
            rules={[
              {
                required: true,
                message: "????????????????????????"
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
          ????????????
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
        header={<div>????????????????????????</div>}
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
