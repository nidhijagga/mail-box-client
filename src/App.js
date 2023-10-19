import { Route, Routes } from 'react-router-dom';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Welcome from './components/pages/Welcome';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/welcome" element={<Welcome/>} />
    </Routes>
  );
}

export default App;
