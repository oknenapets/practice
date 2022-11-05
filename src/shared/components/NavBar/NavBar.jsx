import cn from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './index.scss';

const NavBar = ({ className, items, changeOpen }) => {
  const closeMenu = () => changeOpen(false);
  
  return (
    <nav className={cn('nav-menu', className)}>
      {items.map((item) => (
        <Link onClick={closeMenu} className="nav-menu__link" to={item.link} key={item.id}>
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

NavBar.propTypes = {
  changeOpen: PropTypes.func,
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.string,
      id: PropTypes.string,
    })
  ),
};

export default NavBar;
