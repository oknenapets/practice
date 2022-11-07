function getBrands(data) {
  const brands = [];
  for (const item in data) {
    if (Object.prototype.hasOwnProperty.call(data, item)) brands.push({ value: item, label: item });
  }
  return brands;
}

function getValues(data) {
  const values = [];
  for (const item of data) {
    values.push({ value: item, label: item });
  }
  return values;
}

export { getBrands, getValues };
