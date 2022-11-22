import { NavLink } from 'react-router-dom';

import { ReactComponent as ProjectIcon } from '../../assets/project.svg';
import { ProjectType } from '../navbar/navbar.types';

import './navbar-item.styles.scss';

const NavbarItem: React.FC<{ project: ProjectType }> = ({ project }) => {
  return (
    <li className='navbar__list-item'>
      <NavLink
        className={`navbar__link ${project.id === '5p' ? 'activeClass' : ''}`}
        to='#'
      >
        <ProjectIcon className='navbar__icon' />
        <span>{project.name}</span>
      </NavLink>
    </li>
  );
};

export default NavbarItem;
