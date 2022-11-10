import { CarForm, CarItem, DeleteForm, OffersForm } from 'modules/Garage/components';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppealForm, Button, Modal } from 'shared/components';
import { detectModal } from 'shared/utils/';
import { removeCar } from 'store/Garage/garageSlice';
import { getUserCars } from 'store/Garage/selectors';

import './index.scss';

const Garage = () => {
  const dispatch = useDispatch();
  const [isActiveModal, setActiveModal] = useState(true);
  const [modalName, setModalName] = useState('');
  const [successfulRemoving, setSuccessfulRemoving] = useState();
  const [removeCarId, setRemoveCarId] = useState();
  const userCars = useSelector(getUserCars);
  const carsList = useMemo(() => userCars.map((car) => <CarItem key={car.id} car={car} handleRemove={handleRemove} />), [userCars]);

  useState(() => {
    if (successfulRemoving) setActiveModal(false);
  }, [successfulRemoving]);

  const showModal = (event) => {
    setModalName(event.target.dataset.modal);
    setActiveModal(true);
  };

  const remove = (id) => {
    if (userCars.find((car) => car.id === id && !car.onService)) {
      dispatch(removeCar({ id }));
      setSuccessfulRemoving(true);
      setRemoveCarId(id);
    } else setSuccessfulRemoving(false);
  };

  function handleRemove(event, id) {
    showModal(event);
    remove(id);
  }

  return (
    <div className="container">
      <section className="page__garage garage">
        <Modal active={detectModal(isActiveModal, modalName === 'addAuto')} setActive={setActiveModal}>
          <CarForm />
        </Modal>
        <Modal active={detectModal(isActiveModal, modalName === 'operatorCallBack')} setActive={setActiveModal}>
          <AppealForm />
        </Modal>
        <Modal active={detectModal(isActiveModal, modalName === 'remove')} setActive={setActiveModal}>
          {successfulRemoving ? (
            <DeleteForm setActive={setActiveModal} carId={removeCarId} />
          ) : (
            <p>Невозможно удалить машину, так как она находится на сервисе</p>
          )}
        </Modal>
        <Modal active={detectModal(isActiveModal, modalName === 'offers')} setActive={setActiveModal}>
          <OffersForm />
        </Modal>

        <div className="garage__actions">
          <Button className="garage__action" data-modal="addAuto" onClick={showModal}>
            Добавить авто
          </Button>
          <Button className="garage__action" data-modal="operatorCallBack" onClick={showModal}>
            Обратиться к оператору
          </Button>
          <Button className="garage__action" data-modal="offers" onClick={showModal}>
            Предложения/Рекомендации
          </Button>
        </div>
        <div className="garage__cars-list">{carsList.length ? carsList : <p className="garage__notes">Список автомобилей пуст</p>}</div>
      </section>
    </div>
  );
};
export default Garage;
