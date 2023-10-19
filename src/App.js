import { Route, Routes } from "react-router-dom";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Welcome from "./components/pages/Welcome";
import Sentbox from "./components/pages/Sentbox";
import Header from "./components/other/Header";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/sentbox" element={<Sentbox />} />
      </Routes>
    </>
  );
}

export default App;
