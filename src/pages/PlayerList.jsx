import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import './List.css';

export default function PlayerList() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data } = await supabase
        .from('players')
        .select()
        .order('created_at', { ascending: false });
      setPlayers(data);
    };
    fetchPlayers();
  }, []);

  return (
  <div className="list-container">
    <h1>Team Roster</h1>
    <Link to="/create" className="add-link">➕ Add New Player</Link>
   <ul className="player-list">
    {players.map((p) => (
      <li key={p.id} className="player-card">
        <div className="card-header">
          <h3>{p.name}</h3>
          <span className="position-tag">{p.position}</span>
        </div>
        <div className="card-body">
          <p><strong>Rating:</strong> {p.rating}</p>
          <p><strong>Preferred Foot:</strong> {p.foot}</p>
          <p><strong>Country:</strong> {p.country}</p>
          <p><strong>Jersey #:</strong> {p.jersey_number}</p>
        </div>
        <div className="card-actions">
          <Link to={`/players/${p.id}`}>🔍 View</Link>
          <Link to={`/players/${p.id}/edit`}>✏️ Edit</Link>
        </div>
      </li>
    ))}
  </ul>

  </div>
);

}

