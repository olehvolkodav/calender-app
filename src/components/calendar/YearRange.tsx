import React, { useMemo } from "react";
import moment from "moment";
import classNames from "classnames";

import { getYear } from "../../utils/date";
import { splitArrayChunk } from "../../utils/func";

interface YearRangeProps {
  yearRanges: number[];
  dateObject: moment.Moment;
  selectYear: (year: number) => void;
}

export const YearRange: React.FC<YearRangeProps> = ({
  yearRanges,
  dateObject,
  selectYear,
}) => {
  const ranges = useMemo(
    () => splitArrayChunk(yearRanges.reverse()),
    [yearRanges]
  );

  return (
    <table className="mt-5 block max-h-[55px] overflow-auto">
      <tbody>
        {ranges.map((row, i) => (
          <tr key={i}>
            {row.map((year: number) => (
              <td
                key={year}
                className={classNames(
                  "text-white text-base font-bold cursor-pointer hover:text-red-800 border-spacing-4 w-[47.5px]",
                  year === parseInt(getYear(dateObject))
                    ? "text-[#FF4000] font-bold"
                    : ""
                )}
                onClick={() => selectYear(year)}
              >
                <span>{year}</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
