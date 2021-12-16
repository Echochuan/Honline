import { RightCircleTwoTone } from "@ant-design/icons";
import { message } from "antd";
import "./index.css";

const Search = () => {
  const onClick = () => {
    message.error("暂未开放");
  }

  return (
    <div className="search bar">
      <form>
        <input
          className="Search-input"
          type="text"
          placeholder="请输入您要搜索的内容......"
        />

      </form>
      <button onClick={ onClick }>
          <div className="icon-logo">
            <RightCircleTwoTone  twoToneColor="f9f0da" style={{fontSize: '26px'}}/>
          </div>
        </button>
    </div>
  );
};

export default Search;
