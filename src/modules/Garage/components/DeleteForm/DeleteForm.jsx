import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button} from 'shared/components';
import PropTypes from 'prop-types';
import DeleteFormSchema from 'services/Garage/DeleteFormSchema';

const DeleteForm = ({ setActive, carId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(DeleteFormSchema),
  });

  const onSubmit = () => {
    reset();
    setActive(false);
  };
  
  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <div className='form__title'>Причина удаления</div>
      <p className="form__error">{errors?.reason && errors?.reason.message}</p>
      <div className="form__row">
        <input {...register('reason')} value="sale" className="form__radio-input" type="radio" id="sale" />
        <label htmlFor="sale">Продажа</label>
      </div>
      <div className="form__row">
        <input {...register('reason')} value="other" className="form__radio-input" type="radio" id="other" />
        <label htmlFor="other">Другое</label>
      </div>
      <textarea {...register('comment')} className="form__text-box" name="comment" id="comment" cols="35" rows="3" />
      <input {...register('carId')} type="hidden" value={carId} />
      <Button>Готово</Button>
    </form>
  );
};

DeleteForm.propTypes = {
  carId: PropTypes.number,
  setActive: PropTypes.func,
};
export default DeleteForm;
