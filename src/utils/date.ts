import moment from "moment";

export const getDaysInSelectedMonth = (dateObject: moment.Moment) => {
  return dateObject.daysInMonth();
};

export const getCurDay = (dateObject: moment.Moment) => {
  return parseInt(dateObject.format("D"));
};

export const firstDayOfMonth = (dateObject: moment.Moment) => {
  let firstDay = moment(dateObject).startOf("month").format("d"); // Day of week 0...1..5...6
  return parseInt(firstDay);
};

export const getYear = (dateObject: moment.Moment) => {
  return dateObject.format("YYYY");
};

export const getMonth = (dateObject: moment.Moment) => {
  return dateObject.format("MMMM");
};

export const getMonthNumber = (dateObject: moment.Moment) => {
  return `0${dateObject.format("M")}`.slice(-2);
};
