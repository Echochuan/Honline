import { Layout, Modal } from "antd";
import "./index.css";

import RegisterBox from "../../components/registerBox";
import { useState } from "react";

const { Header, Footer, Content } = Layout;

const Register = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    window.location.href = "/login";
  };

  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Header className="header-storeMenu">
          <div className="logo">
            <div className="welcome1">欢迎注册</div>
          </div>
          <a href="/login" className="to-login">
            已有账号，去登陆
          </a>
        </Header>
        <Layout>
          <Content>
            <RegisterBox />
            <Modal
              width="50%"
              title="用户注册协议和隐私政策"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="同意并继续"
              cancelText="取消"
            >
              <span>
                欢迎注册成为商城用户！在您注册过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议，请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体或下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）。
              </span>
              <p></p>
              <span>
                【请您注意】如果您不同意以下协议全部或任何条款约定，请您停止注册。您停止注册后将仅可以浏览我们的商品信息但无法享受我们的产品或服务。如您按照注册流程提示填写信息，阅读并点击同意上述协议且完成全部注册流程后，即表示您已充分阅读、理解并接受协议的全部内容，并表明您同意我们可以依据协议内容来处理您的个人信息，并同意我们将您的订单信息共享给为完成此订单所必须的第三方合作方。
              </span>
              <p></p>
              <b>用户注册协议</b>
              <p></p>
              <span>一、服务条款的确认及接受</span>
              <p></p>
              <span>
                1、网站（指hyonline.com及其移动客户端软件、应用程序，以下称“本网站”）各项电子服务的所有权和运作权归属于我站所有，本网站提供的服务将完全按照其发布的服务条款和操作规则严格执行。您确认所有服务条款并完成注册程序时，本协议在您与本网站间成立并发生法律效力，同时您成为本网站正式用户。
              </span>
              <p></p>
              <span>
                2、根据国家法律法规变化及本网站运营需要，我站有权对本协议条款及相关规则不时地进行修改，修改后的内容一旦以任何形式公布在本网站上即生效，并取代此前相关内容，您应不时关注本网站公告、提示信息及协议、规则等相关内容的变动。您知悉并确认，如您不同意更新后的内容，应立即停止使用本网站；如您继续使用本网站，即视为知悉变动内容并同意接受。
              </span>
              <p></p>
              <span>
                3、本协议内容中以加粗方式显著标识的条款，请您着重阅读。您点击“同意”按钮即视为您完全接受本协议，在点击之前请您再次确认已知悉并完全理解本协议的全部内容。
              </span>
              <p></p>
              <span>二、服务须知</span>
              <p></p>
              <span>
                1、本网站运用自身开发的操作系统通过国际互联网络为用户提供购买商品等服务。使用本网站，您必须：
              </span>
              <p></p>
              <span>（1）自行配备上网的所需设备，包括个人手机、平板电脑、调制解调器、路由器等；</span>
              <p></p>
              <span>（2）自行负担个人上网所支付的与此服务有关的电话费用、网络费用等；</span>
              <p></p>
              <span>（3）选择与所安装终端设备相匹配的软件版本，包括但不限于iOS、Android、Windows等多个我站发布的应用版本。</span>
              <p></p>
              <span>2、基于本网站所提供的网络服务的重要性，您确认并同意：</span>
              <p></p>
              <span>（1）提供的注册资料真实、准确、完整、合法有效，注册资料如有变动的，应及时更新；</span>
              <p></p>
              <span>（2）如果您提供的注册资料不合法、不真实、不准确、不详尽的，您需承担因此引起的相应责任及后果，并且我站保留终止您使用本网站各项服务的权利。</span>
            </Modal>
          </Content>
        </Layout>
        <Footer>Copyright © 2021 Created by 524 & 525</Footer>
      </Layout>
    </div>
  );
};

export default Register;
