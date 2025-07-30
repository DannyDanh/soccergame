import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

export default function EditPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      const { data } = await supabase.from('players').select().eq('id', id).single();
      setForm(data);
    };
    fetchPlayer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await supabase.from('players').update({ ...form }).eq('id', id);
    navigate(`/players/${id}`);
  };

  const handleDelete = async () => {
    await supabase.from('players').delete().eq('id', id);
    navigate('/');
  };

  if (!form) return <p>Loading...</p>;

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Player</h2>
      {['name', 'position', 'rating', 'foot', 'country', 'jersey_number'].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          value={form[field]}
          onChange={handleChange}
          required
        />
      ))}
      <button type="submit">Update</button>
      <button type="button" onClick={handleDelete}>Delete</button>
    </form>
  );
}
