import { WORK_SCHEDULE } from 'shared/constants';

const findConsultant = (consultantId) => WORK_SCHEDULE.find((item) => item.consultantId === consultantId);

export const getFreeDates = (consultantId) => findConsultant(consultantId).times.map((item) => new Date(item.year, item.month - 1, item.day));

export const getFreeTimes = (date, consultant) =>
  findConsultant(consultant).times.find((item) => new Date(item.year, item.month - 1, item.day).toDateString() === date.toDateString())
    .slots;
