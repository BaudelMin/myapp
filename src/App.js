// import logo from './logo.svg';
import './App.css';
import history from './role/browserhistory'
import {BrowserRouter as Router} from 'react-router-dom'
import PageRoutes from './routes/navRoutes';

function App() {
  return (
    <Router useHash={false} history={history}>
      <div className="App">
        <PageRoutes />
      </div>
    </Router>
  );
}

export default App;
