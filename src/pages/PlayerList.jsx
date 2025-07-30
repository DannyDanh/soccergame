import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';

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
    <div>
      <h2>Team Roster</h2>
      <Link to="/create">➕ Add New Player</Link>
      <ul>
        {players.map((p) => (
          <li key={p.id}>
            <Link to={`/players/${p.id}`}>{p.name} — {p.position}</Link> | <Link to={`/players/${p.id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

