import './App.css';
import Dashboard from './pages/DashBoard/DashBoard';
import Chart from './pages/DashBoard/Chart';
import Deposits from './pages/DashBoard/Deposits';
import Orders from './pages/DashBoard/Orders';
import Title from './pages/DashBoard/Title';
import SignUp from './pages/SignUp'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard ></Dashboard>}></Route>
        <Route path="/signup" element={<SignUp ></SignUp>}></Route>
        <Route path="/deposits" element={<Deposits ></Deposits>}></Route>
        <Route path="/orders" element={<Orders ></Orders>}></Route>
        <Route path="/chart" element={<Chart ></Chart>}></Route>
        <Route path="/title" element={<Title children={<>hi</>} ></Title>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
