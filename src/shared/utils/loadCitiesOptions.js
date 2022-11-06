import { CITIES } from 'shared/constants';

const filterCities = (inputValue) => {
  const result = [];
  CITIES.forEach((item) => {
    if (item.city.toLowerCase().startsWith(inputValue.toLowerCase())) result.push({ value: item.city, label: item.city });
  });
  return result;
};

const loadCitiesOptions = (inputValue) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(filterCities(inputValue));
    }, 0);
  });

export default loadCitiesOptions;
