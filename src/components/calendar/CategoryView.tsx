import React from "react";
import classNames from "classnames";

import { categoryLabels } from "../../utils/common";

export const CategoryView: React.FC = () => {
  return (
    <div className="mt-[88px]">
      {categoryLabels.map((item, index) => (
        <div key={`category-${index}`} className="flex items-center w-[95px]">
          <div className={classNames("w-[10px] h-[10px] mr-2", item.bgColor)} />
          <span className="text-white text-[11px] font-bold">{item.label}</span>
        </div>
      ))}
    </div>
  );
};
