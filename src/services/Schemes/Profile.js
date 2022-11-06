import * as yup from 'yup';

const ProfileSchema = yup.object({
  lastName: yup.string('Проверьте правильность'),
  firstName: yup.string('Проверьте правильность'),
  middleName: yup.string('Проверьте правильность'),
  city: yup.object().nullable(),
});

export default ProfileSchema;
