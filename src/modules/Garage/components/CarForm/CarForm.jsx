import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select/';
import { getBrands, getValues } from 'services/Garage/';
import { CarFormSchema } from 'services/Schemes';
import { Button, CustomSelectOption, FormItem } from 'shared/components';
import { CARS } from 'shared/constants';
import convertDate from 'shared/utils/convertDate';
import { getUserId } from 'store/Auth/selectors';
import { addCar } from 'store/Garage/garageSlice';

import './index.scss';

const CarForm = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState([]);
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);

  const {
    register,
    handleSubmit,
    resetField,
    trigger,
    reset,
    control,
    formState: { errors, isSubmitted },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(CarFormSchema),
  });

  useEffect(() => {
    if (brand) {
      setModel(getValues(CARS.cars[brand]));
      resetField('model');
    }
  }, [brand]);

  function onSubmit(data) {
    data.release = convertDate(data.release, 'en-CA');
    data.stsIssue = convertDate(data.stsIssue, 'en-CA');
    data.userId = userId;
    dispatch(addCar({ data }));
    reset();
  }

  return (
    <form className="garage__form form" key={isSubmitted} onSubmit={handleSubmit(onSubmit)}>
      <div className="form__title">Информация об авто</div>
      <div className="form__row">
        <FormItem options={register('vin')} error={errors} id="vin" title="VIN" />
        <FormItem options={register('number')} error={errors} id="number" title="Гос. номер" />
      </div>
      <div className="form__row">
        <FormItem options={register('stsSeries')} error={errors} id="stsSeries" title="Серия СТС" />
        <FormItem options={register('stsNumber')} error={errors} id="stsNumber" title="Номер СТС" />
        <FormItem error={errors} title="Дата выдачи СТС" id="stsIssue">
          <Controller
            name="stsIssue"
            control={control}
            render={({ field: { onBlur, onChange, value, ref } }) => (
              <DatePicker
                locale="ru"
                onBlur={onBlur}
                dateFormat="dd.MM.yyyy"
                ref={ref}
                id="stsIssue"
                onChange={(data) => {
                  onChange(data);
                  trigger('stsIssue');
                }}
                className="form__input"
                selected={value}
                showMonthDropdown
                showYearDropdown
              />
            )}
          />
        </FormItem>
      </div>
      <div className="form__row">
        <FormItem error={errors} title="Марка" id="brand">
          <Controller
            name="brand"
            control={control}
            render={({ field: { onBlur, onChange, ref } }) => (
              <Select
                onBlur={onBlur}
                placeholder="Выберите"
                components={{ Option: CustomSelectOption }}
                classNamePrefix="react-select"
                ref={ref}
                inputId="brand"
                onChange={(data) => {
                  setBrand(data.value);
                  onChange(data.value);
                }}
                options={getBrands(CARS.cars)}
              />
            )}
          />
        </FormItem>
        <FormItem error={errors} title="Модель" id="model">
          <Controller
            name="model"
            control={control}
            render={({ field: { onChange, ref } }) => (
              <Select
                key={brand}
                ref={ref}
                placeholder="Выберите"
                components={{ Option: CustomSelectOption }}
                classNamePrefix="react-select"
                inputId="model"
                onChange={(data) => {
                  onChange(data.value);
                }}
                options={model}
              />
            )}
          />
        </FormItem>
        <FormItem error={errors} title="Год выпуска" id="release">
          <Controller
            name="release"
            control={control}
            render={({ field: { onBlur, onChange, value, ref } }) => (
              <DatePicker
                ref={ref}
                locale="ru"
                onBlur={onBlur}
                id="release"
                onChange={(data) => {
                  onChange(data);
                  onBlur();
                  trigger('stsIssue');
                }}
                className="form__input"
                selected={value}
                showYearPicker
                dateFormat="yyyy"
              />
            )}
          />
        </FormItem>
      </div>
      <div className="form__row">
        <FormItem error={errors} title="Трансмиссия" id="transmission">
          <Controller
            name="transmission"
            control={control}
            render={({ field: { onChange, ref } }) => (
              <Select
                ref={ref}
                placeholder="Выберите"
                components={{ Option: CustomSelectOption }}
                classNamePrefix="react-select"
                inputId="transmission"
                onChange={(data) => {
                  onChange(data.value);
                }}
                options={getValues(CARS.transmission)}
              />
            )}
          />
        </FormItem>
        <FormItem error={errors} title="Двигатель" id="engine">
          <Controller
            name="engine"
            control={control}
            render={({ field: { onChange, ref } }) => (
              <Select
                ref={ref}
                placeholder="Выберите"
                components={{ Option: CustomSelectOption }}
                classNamePrefix="react-select"
                inputId="engine"
                onChange={(data) => {
                  onChange(data.value);
                }}
                options={getValues(CARS.engine)}
              />
            )}
          />
        </FormItem>
        <FormItem error={errors} title="Привод" id="drive">
          <Controller
            name="drive"
            control={control}
            render={({ field: { onChange, ref } }) => (
              <Select
                ref={ref}
                placeholder="Выберите"
                components={{ Option: CustomSelectOption }}
                classNamePrefix="react-select"
                inputId="drive"
                onChange={(data) => {
                  onChange(data.value);
                }}
                options={getValues(CARS.drive)}
              />
            )}
          />
        </FormItem>
      </div>
      <div className="form__row">
        <FormItem options={register('mileage')} error={errors} id="mileage" title="Пробег (км)" />
        <FormItem options={register('img')} id="img" title="Изрбражение" />
      </div>
      <Button>Готово</Button>
    </form>
  );
};

export default CarForm;
