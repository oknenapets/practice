import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { Button } from 'shared/components';

import './index.scss';

const DealershipItem = ({ dealership }) => {
  const [isDetailed, setIsDetailed] = useState(false);
  const changeDetailed = () => setIsDetailed((prev) => !prev);

  const workSchedule = useMemo(
    () =>
      Object.keys(dealership.workSchedule).map((item, index) => (
        <div key={dealership.id + index} className="description__item">
          {dealership.workSchedule[item]}
        </div>
      )),
    [dealership]
  );

  return (
    <div className="dealerships__dealer-item dealer-item">
      <div className="dealer-item__info">
        <div className="dealer-item__header">{`${dealership.brand} ${dealership.name}`}</div>
        <div className="dealer-item__body">
          <div className="dealer-item__img-wrapper">
            <img className="dealer-item__img" src={dealership.img} alt="dealership" />
          </div>
          <div className="dealer-item__description-wrapper">
            <div className="dealer-item__description description">
              <div className="description__item">Контактные данные: {dealership.addres.full}</div>
              <div className="description__item">
                <span className="description__label">Телефон:&nbsp;</span>
                <a className="description__item description__item_phone" href={`tel:${dealership.phoneNumber}`}>
                  {dealership.phoneNumber}
                </a>
              </div>
              {isDetailed && workSchedule}
            </div>
            <Button onClick={changeDetailed}>{isDetailed ? `Свернуть` : `Подробнее`}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

DealershipItem.propTypes = {
  dealership: PropTypes.object,
};

export default DealershipItem;
