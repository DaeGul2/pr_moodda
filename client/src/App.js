import './App.css';
import Dashboard from './pages/DashBoard/DashBoard';
import SignUp from './pages/SignUp'


function App() {
  return (
    <div className="App">
      {<SignUp></SignUp>}
      {<Dashboard></Dashboard>}
    </div>
  );
}

export default App;
