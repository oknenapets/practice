import * as yup from 'yup';

const LoginSchema = yup.object({
  email: yup.string().email('Такой логин не подойдет').required('Логин не указан'),
  password: yup.string().required('Пароль не указан'),
});

export default LoginSchema;
