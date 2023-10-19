import { Route, Routes } from 'react-router-dom';
import SignUP from './components/pages/Signup';
import Login from './components/pages/Login';
import Welcome from './components/pages/Welcome';
import Sentbox from './components/pages/Sentbox';
import Inbox from './components/pages/Inbox';

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'lightblue' }}>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUP />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/sentbox' element={<Sentbox />} />
        <Route path='/inbox' element={<Inbox />} />
      </Routes>
    </div>
  );
}

export default App;
