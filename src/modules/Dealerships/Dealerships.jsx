import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select/';
import AsyncSelect from 'react-select/async';
import { filterDealerships } from 'services/Dealerships';
import { getBrands } from 'services/Garage';
import { Button, CustomSelectOption, FormItem } from 'shared/components';
import { CARS } from 'shared/constants';
import { loadCitiesOptions } from 'shared/utils';
import { DealershipItem } from './components';

import './index.scss';

const Dealerships = () => {
  const { city } = useSelector((state) => state.user);
  const [dealerships, setDealerships] = useState(filterDealerships(city));
  const [cityFilter, setCityFilter] = useState(city);
  const [brandFilter, setBrandFilter] = useState();

  const dealershipsList = useMemo(
    () => dealerships.map((dealership) => <DealershipItem dealership={dealership} key={dealership.id} />),
    [dealerships]
  );

  const onSubmit = (event) => {
    event.preventDefault();
    const cityValue = event.target.city.value;
    const brandValue = event.target.brand.value;

    setDealerships(filterDealerships(cityValue, brandValue));

    if (cityValue) setCityFilter(cityValue);
    else setCityFilter('');

    setBrandFilter(brandValue);
  };

  return (
    <div className="container">
      <section className="page__dealerships dealerships">
        <h1 className="dealerships__title">
          Официальные дилеры {cityFilter} {brandFilter}
        </h1>
        <div className="dealerships__body">
          <div className="dealerships__filter">
            <form className="dealerships__form form" onSubmit={onSubmit}>
              <FormItem title="Город">
                <AsyncSelect
                  name="city"
                  isClearable
                  placeholder="Введите"
                  components={{ Option: CustomSelectOption }}
                  cacheOptions
                  loadOptions={loadCitiesOptions}
                />
              </FormItem>
              <FormItem title="Марка">
                <Select
                  name="brand"
                  isClearable
                  placeholder="Выберите"
                  components={{ Option: CustomSelectOption }}
                  options={getBrands(CARS.cars)}
                />
              </FormItem>
              <Button>Показать</Button>
            </form>
          </div>
          <div className="dealerships__dealer-list">
            {dealershipsList.length ? (
              dealershipsList
            ) : (
              <p className="dealerships__text">Дилерские центры не найдены, поробуйте изменить параметры фильтра</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dealerships;
