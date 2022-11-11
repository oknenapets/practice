import * as yup from 'yup';

const ApplicationFormSchema = yup.object({
  city: yup.object().required('Обязательное поле'),
  car: yup.object().required('Обязательное поле'),
  dealer: yup.object().required('Обязательное поле'),
  reason: yup.object().required('Обязательное поле'),
  consultant: yup.object().required('Обязательное поле'),
  date: yup.date().required('Обязательное поле'),
  time: yup.object().required('Обязательное поле'),
});

export default ApplicationFormSchema;
