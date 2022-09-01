import React, { Fragment, useState, useMemo, useEffect } from "react";
import moment, { DurationInputArg2 } from "moment";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";

import { WeekDayShortName } from "./WeekDayShortName";
import { DaysInMonth } from "./DaysInMonth";
import { YearRange } from "./YearRange";
import {
  CalendarIcon,
  CloseIcon,
  PrevMonthIcon,
  NextMonthIcon,
} from "../icons";

import { CategoryView } from "./CategoryView";
import { getMonth, getYear } from "../../utils/date";
import { getData } from "../../store/actions";
import { useAppDispatch } from "../../hooks/hooks";

interface CalendarProps {
  isOpen: boolean;
  onClose: any;
}

export const Calendar: React.FC<CalendarProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: any) => state.data);
  const [dateObject, setDateObject] = useState<moment.Moment>(moment());

  const yearRanges = useMemo(() => {
    if (!data) return [];

    const ranges = [];
    const first = new Date((data as any).data.first).getFullYear();
    const last = new Date((data as any).data.last).getFullYear();
    for (let i = first; i <= last; i++) ranges.push(i);
    return ranges;
  }, [data]);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const onDayClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    d: number
  ) => {};

  const selectYear = (year: number) => {
    setDateObject(moment(dateObject).set("year", year));
  };

  const onPrev = (key: DurationInputArg2) => {
    const newDateObject = dateObject.clone().subtract(1, key);
    if (yearRanges[0] > parseInt(getYear(newDateObject))) return;
    setDateObject(newDateObject);
  };

  const onNext = (key: DurationInputArg2) => {
    const newDateObject = dateObject.clone().add(1, key);
    if (yearRanges[yearRanges.length - 1] < parseInt(getYear(newDateObject)))
      return;
    setDateObject(newDateObject);
  };

  if (!data) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity opacity-100" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex items-start transform overflow-hidden h-[514px] border-2 border-white bg-black py-3 px-6 text-left shadow-xl transition-all">
                <table className="text-white m-0 p-0 border-spacing-0 border-collapse">
                  <thead>
                    <tr>
                      <WeekDayShortName />
                    </tr>
                  </thead>
                  <tbody>
                    <DaysInMonth
                      data={data}
                      dateObject={dateObject}
                      onDayClick={onDayClick}
                    />
                  </tbody>
                </table>
                <div className="ml-8 text-white">
                  <div className="flex justify-between items-center mt-2 ml-4">
                    <div className="flex items-center">
                      <CalendarIcon />
                      <span className="text-base font-bold ml-2">Calendar</span>
                    </div>
                    <button
                      type="button"
                      className="h-6 w-6 text-white hover:text-slate-200"
                      onClick={onClose}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-11">
                    <button type="button" onClick={() => onPrev("month")}>
                      <PrevMonthIcon />
                    </button>
                    <span className="text-base text-[#FC2E01] font-bold w-[90px] text-center mx-6">
                      {getMonth(dateObject)}
                    </span>
                    <button type="button" onClick={() => onNext("month")}>
                      <NextMonthIcon />
                    </button>
                  </div>
                  <YearRange
                    yearRanges={yearRanges}
                    dateObject={dateObject}
                    selectYear={selectYear}
                  />
                  <CategoryView />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
