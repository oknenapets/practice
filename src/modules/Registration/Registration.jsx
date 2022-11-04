import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import checkExistingEmail from 'services/Auth/checkEmail';
import { RegistrationSchema } from 'services/Schemes';
import { Button, FormItem } from 'shared/components';
import { ROUTES } from 'shared/constants';
import { convertDate } from 'shared/utils';
import { addUser } from 'store/User/userSlice';

import './index.scss';

const Registration = () => {
  const { users } = useSelector((state) => state.user);
  const [step, setStep] = useState('personalInformation');
  const [email, setEmail] = useState();
  const [isExistingEmail, setIsExistingEmail] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(RegistrationSchema),
  });

  const changeEmail = (event) => setEmail(event.target.value);

  const changeExistingEmail = () => setIsExistingEmail(checkExistingEmail(users, email) >= 0);

  const passwordCheck = async () => await trigger('passwordConfirm');

  const goPasswordStep = async () => {
    const isValid = await trigger('confirmCode');
    if (isValid) {
      setStep('password');
    }
  };

  const onSubmit = (user) => {
    user.dateBirth = convertDate(user.dateBirth, 'en-CA');
    dispatch(addUser({ user }));
    navigate(ROUTES.login);
  };

  return (
    <div className="page__registration registration">
      <form onSubmit={handleSubmit(onSubmit)} className="registration__form form">
        <div className="form__title">Регистрация</div>
        {step === 'personalInformation' && (
          <>
            <FormItem
              options={register('email', { onChange: changeEmail, onBlur: changeExistingEmail })}
              error={isExistingEmail ? { email: { message: 'Email зарегистрирован' } } : errors}
              title="E-mail"
              id="email"
            />
            <FormItem options={register('lastName')} error={errors} title="Фамилия" id="lastName" />
            <FormItem options={register('firstName')} error={errors} title="Имя" id="firstName" />
            <FormItem options={register('middleName')} error={errors} title="Отчество" id="middleName" />
            <FormItem options={register('dateBirth')} error={errors} title="Дата рождения" id="dateBirth">
              <Controller
                name="dateBirth"
                control={control}
                render={({ field: { onBlur, onChange, value } }) => (
                  <DatePicker
                    onBlur={onBlur}
                    dateFormat="dd.MM.yyyy"
                    id="dateBirth"
                    onChange={(data) => {
                      onChange(data);
                      onBlur();
                    }}
                    className="form__input"
                    selected={value}
                    showMonthDropdown
                    showYearDropdown
                  />
                )}
              />
            </FormItem>
            <Button type="button" onClick={goPasswordStep} data-step="password" className="form__btn">
              Продолжить
            </Button>
          </>
        )}
        {step === 'password' && (
          <>
            <FormItem
              options={register('password', { onChange: passwordCheck })}
              error={errors}
              title="Пароль"
              type="password"
              id="password"
            />
            <FormItem
              options={register('passwordConfirm')}
              error={errors}
              title="Подтвердите пароль"
              type="password"
              id="passwordConfirm"
            />
            <Button className="form__btn">Готово</Button>
          </>
        )}
      </form>
    </div>
  );
};

export default Registration;
