import PropTypes from 'prop-types';
import cn from 'classnames';

import './index.scss';

const Button = ({ className, children, ...restProps }) => (
  <button {...restProps} className={cn('btn', className)}>
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
