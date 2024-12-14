import moment from "moment";

export const timeFormat = (date: Date) => moment(date).format("L LT");
