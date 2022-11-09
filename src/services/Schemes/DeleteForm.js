import * as yup from 'yup';

const DeleteFormSchema = yup.object({
  reason: yup.string().nullable().required('Причина не указана'),
});

export default DeleteFormSchema;
