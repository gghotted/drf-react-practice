import List from './pages/List';
import Detail from './pages/Detail';
import Login from './pages/Login';
import Create from './pages/Create'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<List/>}></Route>
        <Route path="/:id" element={<Detail/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/create" element={<Create/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
