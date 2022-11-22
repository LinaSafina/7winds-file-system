import PROJECTS from '../../constants/projects.json';
import NavbarItem from '../navbar-item/navbar-item.component';
import './navbar.styles.scss';
import { ProjectType } from './navbar.types';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <ul className='navbar__list'>
        {PROJECTS.map((project: ProjectType) => (
          <NavbarItem key={project.id} project={project} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
