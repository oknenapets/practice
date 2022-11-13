import PropTypes from 'prop-types';

import './index.scss';

const ServiceItem = ({ value }) => (
    <div className="service__application-item application-item">
      <div className="application-item__description description">
        <div className="description__item">Заявка №: {value.id}</div>
        <div className="description__item">
          <b>Статус: {value.status.name}</b>
        </div>
        <div className="description__item">Машина: {value.car.label}</div>
        <div className="description__item">Город: {value.city.value}</div>
        <div className="description__item">Дилeрский центр: {value.dealer.label}</div>
        <div className="description__item">Причина визита: {value.reason.label}</div>
        <div className="description__item">Консультант: {value.consultant.label}</div>
        <div className="description__item">
          Дата визита: {value.date} {value.time.label}
        </div>
      </div>
    </div>
  );

export default ServiceItem;

ServiceItem.propTypes = {
  value: PropTypes.object,
};
