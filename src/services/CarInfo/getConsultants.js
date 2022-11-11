import { CONSULTANTS } from 'shared/constants';

const getConsultants = () => {
  const consultants = [];
  for (const item of CONSULTANTS) {
    consultants.push({ label: `${item.name  } ${  item.lastName}`, value: item.id });
  }
  return consultants;
};

export default getConsultants;
