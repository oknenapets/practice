import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'shared/components';
import { getUserId } from 'store/Auth/selectors';
import { changeUserRecommendations } from 'store/User/userSlice';

const OffersForm = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);

  const { register, handleSubmit } = useForm({
    mode: 'onSubmit',
  });

  const onSubmit = () => dispatch(changeUserRecommendations({ userId }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form form-offers">
      <div className='form__title'>Рекомендации и индивидуальные предложения</div>
      <div className="form__row">
        <input {...register('recommendations')} type="checkbox" id="scales" name="recommendations" />
        <label htmlFor="recommendations">Хочу получать</label>
      </div>
      <Button>Сохранить</Button>
    </form>
  );
};

export default OffersForm;
