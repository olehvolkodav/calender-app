import { useMemo } from "react";
import moment from "moment";

export const WeekDayShortName = () => {
  const weekdayShort = useMemo(() => moment.weekdaysShort(), []);

  return (
    <>
      {weekdayShort.map((day) => (
        <th
          key={day}
          className="w-[80px] h-[35px] p-0 text-xl text-center font-bold leading-8"
        >
          {day.slice(0, 2)}
        </th>
      ))}
    </>
  );
};
