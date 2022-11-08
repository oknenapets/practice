import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import AppealFormScheme from 'services/Schemes';
import { Button, FormItem } from 'shared/components';
import { getCurrentUser } from 'store/Auth/selectors';

const AppealForm = () => {
  const currentUser = useSelector(getCurrentUser);
  const [isSubmit, setSubmit] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      email: `${currentUser.email}`,
      fullName: `${currentUser.lastName} ${currentUser.firstName} ${currentUser.middleName}`,
    },
    mode: 'onBlur',
    resolver: yupResolver(AppealFormScheme),
  });

  useEffect(() => {
    if (isSubmitSuccessful) setSubmit(true);
  }, [isSubmitSuccessful]);

  const onSubmit = (data, event) => event.preventDefault();

  return isSubmit ? (
    <p className="appeal__text">Оператор свяжется с вами в ближайщее время</p>
  ) : (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__title">Обращение к оператору</div>
      <FormItem options={register('email')} error={errors} title="Email" id="email" />
      <FormItem options={register('fullName')} error={errors} title="ФИО" id="fullName" />
      <FormItem options={register('phone')} error={errors} title="Телефон" id="phone" />
      <Button>Отправить</Button>
    </form>
  );
};

export default AppealForm;
