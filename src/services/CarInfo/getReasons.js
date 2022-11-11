import { REASONS } from 'shared/constants';

const getReasons = () => {
  const reasons = [];
  for (const item of REASONS) {
    reasons.push({ label: item.title, value: item.id });
  }
  return reasons;
};

export default getReasons;
