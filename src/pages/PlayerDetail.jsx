import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';
import './Detail.css';

export default function PlayerDetail() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      const { data } = await supabase.from('players').select().eq('id', id).single();
      setPlayer(data);
    };
    fetchPlayer();
  }, [id]);

  if (!player) return <p>Loading...</p>;

  return (
    <div className="detail-container">
      <h2>{player.name}</h2>
      <div className="detail-info">
        <p><strong>Position:</strong> {player.position}</p>
        <p><strong>Rating:</strong> {player.rating}</p>
        <p><strong>Preferred Foot:</strong> {player.foot}</p>
        <p><strong>Country:</strong> {player.country}</p>
        <p><strong>Jersey #:</strong> {player.jersey_number}</p>
        <p><strong>Last Update:</strong> {new Date(player.created_at).toLocaleString()}</p>
      </div>
      <div className="detail-actions">
        <Link to={`/players/${id}/edit`} className="edit-button">✏️ Edit</Link>
        <Link to="/" className="back-button">← Back to Summary</Link>
      </div>
    </div>
  );

}
