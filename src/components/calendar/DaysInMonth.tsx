import React, { useState, useEffect } from "react";
import moment from "moment";
import classNames from "classnames";

import {
  getDaysInSelectedMonth,
  getCurDay,
  firstDayOfMonth,
  getYear,
  getMonthNumber,
} from "../../utils/date";
import { categoryLabels } from "../../utils/common";

interface IDaysInMonth {
  data: any;
  dateObject: moment.Moment;
  onDayClick: any;
}

export const DaysInMonth: React.FC<IDaysInMonth> = ({
  data,
  dateObject,
  onDayClick,
}) => {
  const [daysInMonth, setDaysInMonth] = useState<any[]>([]);

  const getMonthData = () => {
    const monthKey = `${getYear(dateObject)}-${getMonthNumber(dateObject)}`;
    return data.data[monthKey];
  };

  const getLabel = (monthData: any[], day: number, category: string) => {
    if (!monthData || !monthData[day] || !monthData[day][category]) return "";

    return parseInt(monthData[day][category]) > 9999
      ? "9999"
      : monthData[day][category];
  };

  useEffect(() => {
    const blanks = [],
      localDaysInMonth = [];
    const monthData = getMonthData();

    for (let i = 0; i < firstDayOfMonth(dateObject); i++) {
      blanks.push(<td key={`blank-${i}`}>{""}</td>);
    }

    for (let d = 1; d <= getDaysInSelectedMonth(dateObject); d++) {
      let isCurrentDay = d === getCurDay(dateObject);
      localDaysInMonth.push(
        <td
          key={d}
          className="border border-white"
          onClick={(e) => onDayClick(e, d)}
        >
          <div
            className={classNames(
              "bg-[#353334] text-white text-base text-center font-bold",
              isCurrentDay ? "bg-purple-500" : ""
            )}
          >
            {d}
          </div>
          <div className="text-xs font-bold">
            <div className="flex justify-between h-4 px-1">
              <div
                className={classNames(
                  "text-right w-[32px]",
                  categoryLabels[0].color
                )}
              >
                {getLabel(monthData, d, "tl")}
              </div>
              <div className={classNames("w-[32px]", categoryLabels[1].color)}>
                {getLabel(monthData, d, "ev")}
              </div>
            </div>
            <div className="flex justify-between h-4 px-1">
              <div
                className={classNames(
                  "text-right w-[32px]",
                  categoryLabels[2].color
                )}
              >
                {getLabel(monthData, d, "cm")}
              </div>
              <div className={classNames("w-[32px]", categoryLabels[3].color)}>
                {getLabel(monthData, d, "gu")}
              </div>
            </div>
            <div className="flex justify-between h-4 px-1">
              <div
                className={classNames(
                  "text-right w-[32px]",
                  categoryLabels[4].color
                )}
              >
                {getLabel(monthData, d, "lk")}
              </div>
              <div className={classNames("w-[32px]", categoryLabels[5].color)}>
                {getLabel(monthData, d, "lbm")}
              </div>
            </div>
          </div>
        </td>
      );
    }

    const totalSlots: any[] = [...blanks, ...localDaysInMonth];
    let rows: any[] = [];
    let cells: any[] = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });

    setDaysInMonth(rows);
    // eslint-disable-next-line
  }, [dateObject, onDayClick]);

  return (
    <>
      {daysInMonth.map((d, i) => (
        <tr key={`row-${i}`}>{d}</tr>
      ))}
    </>
  );
};
