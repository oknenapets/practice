import { DEALERSHIPS } from 'shared/constants';

const filterDealerships = (city, brand) => {
  if (!city && !brand) return DEALERSHIPS;
  if (!city && brand) return DEALERSHIPS.filter((item) => item.brand === brand);
  if (!brand) return DEALERSHIPS.filter((item) => item.addres.city === city);
  return DEALERSHIPS.filter((item) => item.addres.city === city && item.brand === brand);
};

export default filterDealerships;
