import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import AsyncSelect from 'react-select/async';
import { ProfileSchema } from 'services/Schemes';
import { Button, CustomSelectOption, FormItem } from 'shared/components';
import { loadCitiesOptions } from 'shared/utils';
import { logout } from 'store/Auth/authSlice';
import { getCurrentUser } from 'store/Auth/selectors';
import { changeUserInfo } from 'store/User/userSlice';

import './index.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const userCity = { label: currentUser.city, value: currentUser.city };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { ...currentUser, city: userCity },
    mode: 'onBlur',
    resolver: yupResolver(ProfileSchema),
  });

  const onSubmit = (data) => {
    const { email, dateBirth, ...userData } = data;
    dispatch(changeUserInfo({ userData }));
  };

  const logoutNow = () => dispatch(logout());

  return (
    <div className="container">
      <div className="page__profile profile ">
        <div className="profile__body">
          <form onSubmit={handleSubmit(onSubmit)} className="profile__form form">
            <div className="form__title">Личные данные</div>
            <FormItem options={register('lastName')} title="Фамилия" error={errors} id="lastName" />
            <FormItem options={register('firstName')} title="Имя" error={errors} id="firstName" />
            <FormItem options={register('middleName')} title="Отчество" error={errors} id="middleName" />
            <FormItem title="Город" error={errors} id="city">
              <Controller
                name="city"
                control={control}
                render={({ field: { onChange, ref } }) => (
                  <AsyncSelect
                    id="city"
                    defaultValue={userCity}
                    ref={ref}
                    classNamePrefix="react-select"
                    components={{ Option: CustomSelectOption }}
                    placeholder="Выберите"
                    onChange={(data) => {
                      if (data) {
                        onChange(data);
                      }
                    }}
                    loadOptions={loadCitiesOptions}
                  />
                )}
              />
            </FormItem>
            <FormItem options={register('email', { disabled: true })} title="Email" />
            <FormItem options={register('dateBirth', { disabled: true })} title="Дата рождения" />
            <Button className="form__btn">Сохранить</Button>
          </form>
          <Button onClick={logoutNow} className="profile__btn">
            Выйти
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
