import { yupResolver } from '@hookform/resolvers/yup';
import { CarForm } from 'modules/Garage/components';
import { useEffect, useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select/';
import AsyncSelect from 'react-select/async';
import { getConsultants, getFreeDates, getFreeTimes, getReasons } from 'services/CarInfo';
import { filterDealerships } from 'services/Dealerships';
import { ApplicationFormSchema } from 'services/Schemes';
import { Button, CustomSelectOption, FormItem } from 'shared/components';
import { convertDate, loadCitiesOptions } from 'shared/utils';
import { addApplication } from 'store/Applications/applicationsSlice';
import { getCurrentUser } from 'store/Auth/selectors';
import { getUserCars } from 'store/Garage/selectors';

import './index.scss';

const ApplicationForm = () => {
  const dispatch = useDispatch();
  const userCars = useSelector(getUserCars);
  const currentUser = useSelector(getCurrentUser);
  const [showCarForm, setShowCarForm] = useState(false);
  const [freeTimes, setFreeTimes] = useState([]);
  const [freeDates, setFreeDates] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    control,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      city: { label: currentUser.city, value: currentUser.city },
    },
    mode: 'onSubmit',
    resolver: yupResolver(ApplicationFormSchema),
  });

  const consultant = watch('consultant');
  const selectedDate = watch('date');
  const selectedCar = watch('car');
  const selectedCity = watch('city');

  const dealershipsOptions = useMemo(() => {
    if (selectedCity?.value && selectedCar?.value) {
      return filterDealerships(selectedCity.value, selectedCar.value).map((item) => ({
        label: `${item.brand} ${item.name}`,
        value: item.id,
      }));
    }
    return [];
  }, [selectedCar, selectedCity]);

  const carOptions = useMemo(() => userCars.map((item) => ({ label: `${item.brand} ${item.model}`, value: item })), [userCars]);

  useEffect(() => {
    if (selectedCity?.value || selectedCar?.value?.brand) {
      resetField('dealer');
    }
  }, [selectedCar, selectedCity]);

  useEffect(() => resetField('time'), [freeTimes]);

  useEffect(() => {
    if (consultant) {
      setFreeDates(getFreeDates(consultant.value));
    }
  }, [consultant]);

  useEffect(() => {
    if (selectedDate) setFreeTimes(getFreeTimes(selectedDate, consultant.value));
  }, [selectedDate]);

  const onSubmit = (data) => {
    data.userId = currentUser.id;
    data.date = convertDate(data.date, 'en-CA');
    dispatch(addApplication({ data }));
    reset();
  };

  const toggleForm = () => setShowCarForm((prev) => !prev);

  return (
    <div className="application__body">
      <Button onClick={toggleForm}>{showCarForm ? 'Свернуть' : 'Добавить машину'}</Button>
      {showCarForm ? <CarForm /> : null}
      <form className="form" key={isSubmitSuccessful} onSubmit={handleSubmit(onSubmit)}>
        <FormItem title="Машина" error={errors} id="car">
          <Controller
            name="car"
            control={control}
            render={({ field: { onChange, ref } }) => (
              <Select
                id="car"
                placeholder="Выберите"
                ref={ref}
                classNamePrefix="react-select"
                components={{ Option: CustomSelectOption }}
                onChange={(data) => {
                  onChange({ label: data.label, value: data.value.brand, id: data.value.id });
                }}
                options={carOptions}
              />
            )}
          />
        </FormItem>
        <FormItem title="Город" error={errors} id="city">
          <Controller
            name="city"
            control={control}
            render={({ field: { onChange, ref } }) => (
              <AsyncSelect
                id="city"
                ref={ref}
                classNamePrefix="react-select"
                components={{ Option: CustomSelectOption }}
                placeholder="Выберите"
                onChange={(data) => {
                  if (data) {
                    onChange(data);
                  }
                }}
                value={selectedCity}
                loadOptions={loadCitiesOptions}
              />
            )}
          />
        </FormItem>
        <FormItem title="Дилeрский центр" error={errors} id="dealer">
          <Controller
            name="dealer"
            key={`${selectedCity.value} ${selectedCar?.id}`}
            control={control}
            classNamePrefix="react-select"
            components={{ Option: CustomSelectOption }}
            render={({ field: { onChange, ref } }) => (
              <Select
                id="dealer"
                getOptionValue={(data) => data.id}
                classNamePrefix="react-select"
                components={{ Option: CustomSelectOption }}
                ref={ref}
                placeholder="Выберите"
                onChange={(data) => {
                  onChange(data);
                }}
                options={dealershipsOptions}
              />
            )}
          />
        </FormItem>
        <FormItem title="Причина визита" error={errors} id="reason">
          <Controller
            name="reason"
            control={control}
            render={({ field: { onChange, ref } }) => (
              <Select
                id="reason"
                ref={ref}
                placeholder="Выберите"
                classNamePrefix="react-select"
                components={{ Option: CustomSelectOption }}
                onChange={(data) => onChange(data)}
                options={getReasons()}
              />
            )}
          />
        </FormItem>
        <FormItem title="Консультант" error={errors} id="consultant">
          <Controller
            name="consultant"
            control={control}
            render={({ field: { onChange, ref } }) => (
              <Select
                id="consultant"
                ref={ref}
                placeholder="Выберите"
                classNamePrefix="react-select"
                components={{ Option: CustomSelectOption }}
                onChange={(data) => {
                  onChange(data);
                }}
                options={getConsultants()}
              />
            )}
          />
        </FormItem>
        <FormItem title="Дата" error={errors} id="date">
          <Controller
            name="date"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <DatePicker
                ref={ref}
                id="date"
                locale="ru"
                selected={value}
                placeholder="Выберите"
                onChange={(date) => {
                  onChange(date);
                }}
                className="form__input"
                includeDates={freeDates}
                dateFormat="d MMMM yyyy"
              />
            )}
          />
        </FormItem>
        <FormItem title="Время" error={errors} id="time">
          <Controller
            name="time"
            control={control}
            render={({ field: { onChange, ref } }) => (
              <Select
                id="time"
                key={freeTimes}
                classNamePrefix="react-select"
                components={{ Option: CustomSelectOption }}
                ref={ref}
                placeholder="Выберите"
                onChange={(data) => {
                  onChange(data);
                }}
                options={freeTimes}
              />
            )}
          />
        </FormItem>
        <FormItem title="Комментарий">
          <textarea {...register('comment')} id="comment" cols="30" rows="10" className="application__comment" />
        </FormItem>
        <Button>Отправить</Button>
      </form>
    </div>
  );
};

export default ApplicationForm;
