import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoginSchema } from 'services/Schemes';
import { Button, FormItem } from 'shared/components';
import { ROUTES } from 'shared/constants';
import { login } from 'store/Auth/authSlice';
import { getUsers } from 'store/User/selectors';

import './index.scss';

export const Login = () => {
  const users = useSelector(getUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(LoginSchema),
  });

  const findUserId = (email, password) =>
    users.find((user) => {
      const emailEqual = user.email === email;
      const passwordEqual = user.password === password;
      return emailEqual && passwordEqual;
    }) || undefined;

  const onSubmit = (data) => {
    const user = findUserId(data.email, data.password);
    if (user?.id) {
      dispatch(login({ user }));
      navigate(fromPage);
    } else setError('email', { type: 'custom', message: 'Неверный логин или пароль' });
  };

  return (
    <div className="page__login login">
      <form className="form login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__title">Вход в аккаунт</div>
        <FormItem options={register('email')} error={errors} title="Логин" id="email" />
        <FormItem options={register('password')} error={errors} title="Пароль" id="password" type="password" />
        <Link className="login-form__link">
          Cбросить пароль
        </Link>
        <Button className="form__btn" type="submit">
          Войти
        </Button>
      </form>
      <Link className="page__login-link" to={ROUTES.registration}>
        Создать аккаунт
      </Link>
    </div>
  );
};

export default Login;
