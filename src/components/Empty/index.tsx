import { memo } from "react";

import s from "./style.module.less";

const Empty = memo(({ desc }: { desc?: string }) => {
  return (
    <div className={s.empty}>
      <img
        src="https://s.yezgea02.com/1619144597039/empty.png"
        alt="暂无数据"
      />
      <div>{desc || "暂无数据"}</div>
    </div>
  );
});

export default Empty;
