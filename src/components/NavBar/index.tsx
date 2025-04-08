import { memo, useState } from "react";
import { TabBar } from "zarm";
import { useNavigate } from "react-router-dom";
import s from "./style.module.less";
import CustomIcon from "../CustomIcon";

const NavBar = memo(({ showNav }: { showNav: boolean }) => {
  const [activeKey, setActiveKey] = useState("/");
  const navigate = useNavigate();

  const handleChange = (path: string) => {
    setActiveKey(path);
    navigate(path);
  };

  return (
    <>
      <TabBar
        visible={showNav}
        className={s.tab}
        activeKey={activeKey}
        onChange={(value) => handleChange(value as string)}
      >
        <TabBar.Item
          itemKey="/"
          title="账单"
          icon={<CustomIcon type="zhangdan" />}
        />
        <TabBar.Item
          itemKey="/data"
          title="统计"
          icon={<CustomIcon type="tongji" />}
        />
        <TabBar.Item
          itemKey="/user"
          title="我的"
          icon={<CustomIcon type="wode" />}
        />
      </TabBar>
    </>
  );
});

export default NavBar;
