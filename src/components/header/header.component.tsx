import { ReactComponent as MenuIcon } from '../../assets/menu.svg';
import { ReactComponent as BackIcon } from '../../assets/back-arrow.svg';
import { ReactComponent as DropDown } from '../../assets/drop-down.svg';

import './header.styles.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='header'>
      <div className='header__top'>
        <MenuIcon className='header__icon' />
        <BackIcon className='header__icon' />
        <nav className='header__nav'>
          <ul className='header__list'>
            <li className='header__list-item'>
              <Link className='header__link activeClasses' to='#'>
                Просмотр
              </Link>
            </li>
            <li className='header__list-item'>
              <Link className='header__link' to='#'>
                Управление
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className='header__navbar'>
        <div>
          <span className='header__title'>Название проекта</span>
          <span className='header__subtitle'>Аббревиатура</span>
        </div>
        <DropDown />
      </div>
      <div className='header__project'>
        <h2 className='header__project-name'>Строительно-монтажные работы</h2>
      </div>
    </header>
  );
};

export default Header;
