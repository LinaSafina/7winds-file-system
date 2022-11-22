import Navbar from '../../components/navbar/navbar.component';
import Project from '../../components/project/project.component';
import ErrorBoundary from '../../components/error-boundary/error-boundary.component';

import './projects.styles.scss';

const Projects = () => {
  return (
    <>
      <Navbar />
      <ErrorBoundary>
        <main className='main'>
          <Project />
        </main>
      </ErrorBoundary>
    </>
  );
};

export default Projects;
