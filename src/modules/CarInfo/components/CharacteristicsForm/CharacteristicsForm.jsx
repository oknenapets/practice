import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { CharacteristicsFormSchema } from 'services/Schemes';
import { Button, FormItem } from 'shared/components';

const CharacteristicsForm = ({ carId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(CharacteristicsFormSchema),
  });

  const onSubmit = () => reset();

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__title">Отправка характеристик на почту</div>
      <FormItem options={register('email')} error={errors} id="email" name="email" title="Почта" />
      <input {...register('carId')} name="carId" type="hidden" value={carId} />
      <Button>Отправить</Button>
    </form>
  );
};

CharacteristicsForm.propTypes = {
  carId: PropTypes.number,
};

export default CharacteristicsForm;
