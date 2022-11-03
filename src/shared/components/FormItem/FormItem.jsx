import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import './index.scss';

const FormItem = forwardRef(({ options, error, title, value, id, type = 'text', children }, ref) => {
  const field = children || <input {...options} className="form__input" id={id} type={type} value={value} />;
  return (
    <div className="form__item">
      <label className="form__label" htmlFor={id}>
        <div className="form__label-title">{title}</div>
        <p className="form__error">{error?.[id] && error?.[id].message}</p>
      </label>
      {field}
    </div>
  );
});

FormItem.propTypes = {
  options: PropTypes.object,
  error: PropTypes.object,
  title: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
};

export default FormItem;
