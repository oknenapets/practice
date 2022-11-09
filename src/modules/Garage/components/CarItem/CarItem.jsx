import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button } from 'shared/components';
import { ROUTES } from 'shared/constants';

import './index.scss';

const CarItem = ({ car, handleRemove }) => {
  const navigate = useNavigate();
  const { img, brand, model, vin, number, onService, mileage, serviceEnd, id } = car;
  const descriptionItem = <div className="description__item color-red">{`Находится на сервисе до ${serviceEnd}`}</div>;

  const remove = (event) => handleRemove(event, id);

  const directCarInfo = () => navigate(`${ROUTES.garage}/car/${id}`);

  return (
    <div className="garage__car-item car-item">
      <div className="car-item__img-wrapper">
        <img className="car-item__img" src={img} alt="car" />
      </div>
      <div className="car-item__description description">
        <div onClick={directCarInfo} className="description__title" title={`${brand} ${model}`}>
          {brand}
          <br />
          {model}
        </div>
        {onService && descriptionItem}
        <div className="description__item">{vin}</div>
        <div className="description__item">{number}</div>
        <div className="description__item">{`${mileage} км`}</div>
      </div>
      <Button data-modal="remove" onClick={remove} className="car-item__action">
        Удалить
      </Button>
    </div>
  );
};

CarItem.propTypes = {
  car: PropTypes.object,
  handleRemove: PropTypes.func,
};

export default CarItem;
