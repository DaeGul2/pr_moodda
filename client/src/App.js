import './App.css';
import Dashboard from './pages/DashBoard/DashBoard';
import SignUp from './pages/SignUp'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";


function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Dashboard ></Dashboard>}></Route>
        <Route path="/signup" element={<SignUp ></SignUp>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
