import * as yup from 'yup';

const CarFormSchema = yup.object({
  vin: yup.string().matches(/\b(?=.*\d|=.*[A-Z])(?=.*[A-Z])[A-Z0-9]{17}\b/, 'Проверьте правильность'),
  number: yup.string().matches(/^[АВЕКМНОРСТУХ]{1}\d{3}(?<!000)[АВЕКМНОРСТУХ]{2}\d{2,3}$/, 'Проверьте правильность'),
  stsSeries: yup.string().matches(/^(?=.{4}$)[0-9]{2}([0-9]{2}|[ABCEHKMOPTXY]{2})/, 'Проверьте правильность'),
  stsNumber: yup.string().matches(/^(?=.{6}$)[0-9]{6}/, 'Проверьте правильность'),
  stsIssue: yup.date().min(yup.ref('release'), 'Раньше выпуска').nullable().required('Дата не указана'),
  brand: yup.string().required('Обязательное поле'),
  model: yup.string().required('Обязательное поле'),
  release: yup
    .date()
    .min(new Date('1889'), 'Раньше 1890 года')
    .max(new Date().getFullYear(), 'Позже текущего года')
    .required('Обязательное поле'),
  mileage: yup.string().required('Обязательное поле'),
});

export default CarFormSchema;
