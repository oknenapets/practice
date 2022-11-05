import IconsSprite from 'assets/images/svg-sprite.svg';
import cn from 'classnames';
import PropTypes from 'prop-types';

const Icon = ({ name, className, width = 24, height = 24 }) => (
  <svg className={cn('icon', className)} width={width} height={height}>
    <use xlinkHref={`${IconsSprite}#${name}`} />
  </svg>
);

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Icon;
