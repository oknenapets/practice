import PropTypes from 'prop-types';
import { components } from 'react-select/';

const CustomSelectOption = ({ children, ...optionsProps }) => {
  const { onMouseMove, onMouseOver, ...rest } = optionsProps.innerProps;
  const newProps = { ...optionsProps, innerProps: rest };
  return <components.Option {...newProps}>{children}</components.Option>;
};

CustomSelectOption.propTypes = {
  innerProps: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomSelectOption;