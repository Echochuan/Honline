import { Button, Form, List, Modal, Radio, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import storeList from "../../mock/storeList.json";
// import store from "../../redux/store";
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

const StoreMaster = () => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(2);
  const [Uploadvisible, setUploadVisible] = useState(false);


  //请求数据判断当前网站状态是否为维护状态
  //如果是，则修改当前状态
  //1 为 开启，2 为关闭

  axios({
    method: "GET",
    headers: { "Content-type": "application/json" },
    url: "http://101.132.145.198:8080/manage/get_status",
  }).then(function(response) {
    console.log(response);
    if (response.data.status === true) {
      setValue(2)
    } else {
      setValue(1)
    }
  })

  const onChange = (e:any) => {
    console.log('radio checked', e.target.value);
    if (e.target.value === 1) {
      axios({
        method: "POST",
        headers: { "Content-type": "application/json" },
        url: "http://101.132.145.198:8080/manage/change_status",
        data: {
          "status" : false
        }
      }).then(function(response) {
        if (response.data.code === 200) {
          message.success("切换成功")
        } else {
          message.error("切换失败")
        }
      })
    } else {
      axios({
        method: "POST",
        headers: { "Content-type": "application/json" },
        url: "http://101.132.145.198:8080/manage/change_status",
        data: {
          "status" : true
        }
      }).then(function(response) {
        if (response.data.code === 200) {
          message.success("切换成功")
        } else {
          message.error("切换失败")
        }
      })
    }

    setValue(e.target.value);
  };

  const [goodsList, setstate] = useState<CartItem[]>([
    {
      id: 1,
      storeName: ""
    }
  ]);

  // var goodsList: dataList[] = [];
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "GET",
        headers: { "Content-type": "application/json" },
        url: "http://101.132.145.198:8080/manage/get_all_store"
      })
      console.log(result);
      setstate(result.data.list);
    };

    fetchData();
  }, []);

  // const goodList = storeList;
  // const goodsList = goodList.list;
  // console.log(goodsList);
  // console.log(userid);
  // console.log(goodsList);

  const {
    checkedAll,
    checkedMap,
    onCheckedAllChange,
    onCheckedChange,
    // filterChecked
  } = useChecked(goodsList);

  const onWrapCheckedAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkAll = e.target.checked;
    onCheckedAllChange(checkAll);
  };

  // const safeguard = () => {
  //   //获取当前网站是否开启维护的信息
  //   console.log({value});
  //   console.log(value);
  //   const a = {value};
  //   //将该信息发送给后端告知当前状态

  //   //消息通知
  //   if (a === {value: 1}) {
  //     message.success("已开启系统维护")
  //   }
  //   else {
  //     message.success("已关闭系统维护")
  //   }
  //   setUploadVisible(false);
  // };

  //商铺关停的相关函数
  const deleteBtn = () => {
    //把商铺的 ID 发送给后端
    //获取商铺的 id
    // const checkedGoodId = filterChecked().map(item => {
    //   console.log(item.id);
    //   return item.id;
    // });
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
        title="普通用户将无法访问网站"
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
        <Radio.Group onChange={onChange} value={value} >
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
          onCreate={(e) => setUploadVisible(false)}
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
