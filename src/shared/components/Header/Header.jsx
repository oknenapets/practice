import cn from 'classnames';
import { useState } from 'react';
import { NavBar } from 'shared/components';
import { MENU_LINKS } from 'shared/constants';
import Icon from '../Icon';

import './index.scss';

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const changeOpen = (state) => (typeof state === 'boolean' ? setOpen(state) : setOpen((prev) => !prev));

  return (
    <header className="header">
      <div className="hader__logo">
        <Icon name="logo" width={152} height={23} />`
      </div>
      <NavBar changeOpen={changeOpen} className={cn({ 'header__nav-menu_open': isOpen, 'header__nav-menu': !isOpen })} items={MENU_LINKS} />
      <div onClick={changeOpen} className={cn('header__burger', { header__burger_open: isOpen })}>
        <span className="header__burger-line header__burger-line_first" />
        <span className="header__burger-line header__burger-line_second" />
        <span className="header__burger-line header__burger-line_third" />
      </div>
    </header>
  );
};

export default Header;
