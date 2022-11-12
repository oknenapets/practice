import { useMemo, useState } from 'react';
import { Button, Modal, AppealForm } from 'shared/components';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CharacteristicsForm, ApplicationForm } from './components';
import { getUserCars } from 'store/Garage/selectors';
import { ROUTES } from 'shared/constants';
import { detectModal } from 'shared/utils/';

import './index.scss';

const CarInfo = () => {
  const userCars = useSelector(getUserCars);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isActiveModal, setActiveModal] = useState(true);
  const [modalName, setModalName] = useState('');

  const car = useMemo(() => userCars.find((item) => item.id === +id), [id]);

  const showModal = (event) => {
    setModalName(event.target.dataset.modal);
    setActiveModal(true);
  };

  const goService = () => navigate(`${ROUTES.service}?car=${id}&completed=1`);

  return (
    <section className="page__garage garage">
      <Modal active={detectModal(isActiveModal, modalName === 'operatorCallBack')} setActive={setActiveModal}>
        <AppealForm />
      </Modal>
      <Modal active={detectModal(isActiveModal, modalName === 'sendСharacteristics')} setActive={setActiveModal}>
        <CharacteristicsForm carId={car.id} />
      </Modal>
      <Modal active={detectModal(isActiveModal, modalName === 'createApplication')} setActive={setActiveModal}>
        <ApplicationForm />
      </Modal>

      <div className="container">
        <div className="garage__item item">
          <h1 className="item__title">{`${car.brand} ${car.model} - Детальная информация`}</h1>
          <div className="item__actions">
            <Button data-modal="operatorCallBack" onClick={showModal}>
              Связь с оператором
            </Button>
            <Button data-modal="createApplication" onClick={showModal} className="item__action-btn">
              Оформить заявку
            </Button>
            <Button data-modal="sendСharacteristics" onClick={showModal} className="item__action-btn">
              Отправить характеристики
            </Button>
            <Button onClick={goService} className="item__action-btn">
              История заявок
            </Button>
          </div>
          <div className="item__info info">
            <table className="info__table">
              <tbody className="info__body">
                <tr className="info__row info__title">
                  <td className="info__title">Техническое обслуживание</td>
                </tr>
                <tr className="info__row">
                  <td className="info__data">Дата окончания гарантии</td>
                  <td className="info__data">{car.warrantyEnd}</td>
                </tr>
                <tr className="info__row">
                  <td className="info__data">Число дней до ТО</td>
                  <td className="info__data">{car?.daysTransportService || 'Необходимо пройти ТО'}</td>
                </tr>
                <tr className="info__row">
                  <td className="info__data">Число км до ТО</td>
                  <td className="info__data">{car.kilometersTransportService}</td>
                </tr>
                <tr className="info__row">
                  <td className="info__data">Пробег до ТО</td>
                  <td className="info__data">{car.mileageTransportService}</td>
                </tr>
                <tr className="info__row">
                  <td className="info__data">Дата последнего посещения дилера</td>
                  <td className="info__data">{car.onService ? 'находится на сервисе' : car.lastVisitDealer}</td>
                </tr>
                <tr className="info__row">
                  <td className="info__data">Напоминание о ТО</td>
                  <td className="info__data">{car.reminderTransportService ? 'Есть' : 'Нет'}</td>
                </tr>
                <tr className="info__row">
                  <td className="info__data">Рекомендации</td>
                  <td className="info__data">{car.recommendations}</td>
                </tr>
                <tr className="info__row">
                  <td className="info__data">Индивидуальные предложения</td>
                  <td className="info__data">{car.individualOffers}</td>
                </tr>
                <tr className="info__row">
                  <td className="info__data">Сервисные кампании</td>
                  <td className="info__data">{car.serviceСompanies}</td>
                </tr>
                <tr className="info__row info__title">
                  <td className="info__title">Машина</td>
                </tr>
                <tr className="info__row">
                  <td className="info__data">Марка</td>
                  <td className="info__data">{car.brand}</td>
                </tr>
                <tr className="info__row">
                  <td className="info__data">Модель</td>
                  <td className="info__data">{car.model}</td>
                </tr>
                <tr className="info__row">
                  <td className="info__data">Год выпуска</td>
                  <td className="info__data">{car.release}</td>
                </tr>
                <tr className="info__row">
                  <td className="info__data">Государственный номер</td>
                  <td className="info__data">{car.number}</td>
                </tr>
                <tr className="info__row">
                  <td className="info__data">Трансмиссия</td>
                  <td className="info__data">{car.transmission}</td>
                </tr>
                <tr className="info__row">
                  <td className="info__data">Тип двигателя</td>
                  <td className="info__data">{car.engine}</td>
                </tr>
                <tr className="info__row">
                  <td className="info__data">Пробег</td>
                  <td className="info__data">{`${car.mileage} км`}</td>
                </tr>
                <tr className="info__row">
                  <td className="info__data">Привод</td>
                  <td className="info__data">{car.drive}</td>
                </tr>
                <tr className="info__row">
                  <td className="info__data">VIN</td>
                  <td className="info__data">{car.vin}</td>
                </tr>
                <tr className="info__row">
                  <td className="info__data">Серия СТС</td>
                  <td className="info__data">{car.stsSeries}</td>
                </tr>
                <tr className="info__row">
                  <td className="info__data">Номер СТС</td>
                  <td className="info__data">{car.stsNumber}</td>
                </tr>
                <tr className="info__row">
                  <td className="info__data">Дата выдачи СТС</td>
                  <td className="info__data">{car.stsIssue}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarInfo;
