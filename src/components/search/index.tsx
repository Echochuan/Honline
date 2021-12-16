import { RightCircleTwoTone } from "@ant-design/icons";
import "./index.css";

const Search = () => {
  return (
    <div className="search bar">
      <form>
        <input
          className="Search-input"
          type="text"
          placeholder="请输入您要搜索的内容......"
        />
        <button type="submit">
          <div className="icon-logo">
            <RightCircleTwoTone  twoToneColor="f9f0da" style={{fontSize: '26px'}}/>
          </div>
        </button>
      </form>
    </div>
  );
};

export default Search;
