import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

export default function CreatePlayer() {
  const [form, setForm] = useState({
    name: '',
    position: '',
    rating: '',
    foot: '',
    country: '',
    jersey_number: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from('players').insert([{ ...form }]);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Soccer Player</h2>
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
      <button type="submit">Create</button>
    </form>
  );
}
