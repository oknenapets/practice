import * as yup from 'yup';

const RegistrationSchema = yup.object({
  email: yup.string().email('Такой email не подойдет').required('Email не указан'),
  lastName: yup.string('Проверьте правильность'),
  firstName: yup.string('Проверьте правильность'),
  middleName: yup.string('Проверьте правильность'),
  dateBirth: yup.date().nullable().required('Дата рождения не указана'),
  password: yup.string().required('Требуется пароль').min(6, 'Минимальная длинна 6 символов'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароли не сопадают')
    .required('Требуется подтверждение пароля'),
});

export default RegistrationSchema;
