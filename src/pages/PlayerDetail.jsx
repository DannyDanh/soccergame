import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';

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
    <div>
      <h2>{player.name}</h2>
      <p>Position: {player.position}</p>
      <p>Rating: {player.rating}</p>
      <p>Foot: {player.foot}</p>
      <p>Country: {player.country}</p>
      <p>Jersey #: {player.jersey_number}</p>
      <Link to={`/players/${id}/edit`}>Edit</Link>
    </div>
  );
}
