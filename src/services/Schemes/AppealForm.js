import * as yup from 'yup';

const AppealFormScheme = yup.object({
  email: yup.string().email('Такой email не подойдет').required('Email не указан'),
  fullName: yup.string().required('ФИО не указано'),
  phone: yup.string().matches(/^((\+7|7|8)+([0-9]){10})$/, 'Формат 71234567891'),
});

export default AppealFormScheme;
