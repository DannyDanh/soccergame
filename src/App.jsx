import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePlayer from './pages/CreatePlayer';
import PlayerList from './pages/PlayerList';
import PlayerDetail from './pages/PlayerDetail';
import EditPlayer from './pages/EditPlayer';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlayerList />} />
        <Route path="/create" element={<CreatePlayer />} />
        <Route path="/players/:id" element={<PlayerDetail />} />
        <Route path="/players/:id/edit" element={<EditPlayer />} />
      </Routes>
    </Router>
  );
}

export default App;






