import { Route, Routes } from 'react-router';

import Header from './components/header/header.component';
import Projects from './pages/projects/projects.component';

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Projects />}></Route>
      </Routes>
    </>
  );
};

export default App;
