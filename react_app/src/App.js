import List from './pages/List';
import Detail from './pages/Detail';
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
      </Routes>
    </Router>
  );
}

export default App;
