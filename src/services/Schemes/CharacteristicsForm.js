import * as yup from 'yup';

const CharacteristicsFormSchema = yup.object({
  email: yup.string().email('Проверьте правильность').required('Обязательное поле'),
});

export default CharacteristicsFormSchema;
