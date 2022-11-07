import cn from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../Icon';

import './index.scss';

const Modal = ({ active, setActive, children }) => {
  const closeModal = () => setActive(false);
  const stopPropagation = (event) => event.stopPropagation();

  return (
    <div className={cn('modal', { 'active': active })} onClick={closeModal}>
      <div className="modal__body" onClick={stopPropagation}>
        <button className="modal__btn" onClick={closeModal}>
          <Icon width={24} height={24} name="close" />
        </button>
        <div className="modal__content">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
