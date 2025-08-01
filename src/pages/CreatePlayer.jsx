// src/pages/CreatePlayer.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './Form.css';

export default function CreatePlayer() {
  const [form, setForm] = useState({
    name: '',
    position: '',
    rating: '',
    foot: 'Right',
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
    <form onSubmit={handleSubmit} className="form">
      <h2>Create Soccer Player</h2>

      <input
        className="form-input"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        className="form-input"
        name="position"
        placeholder="Position (e.g., Midfielder)"
        value={form.position}
        onChange={handleChange}
        required
      />

      <input
        className="form-input"
        type="number"
        name="rating"
        placeholder="Rating (1-100)"
        value={form.rating}
        onChange={handleChange}
        required
        min="1"
        max="100"
      />

      <select
        className="form-input"
        name="foot"
        value={form.foot}
        onChange={handleChange}
      >
        <option value="Right">Right</option>
        <option value="Left">Left</option>
        <option value="Both">Both</option>
      </select>

      <input
        className="form-input"
        name="country"
        placeholder="Country"
        value={form.country}
        onChange={handleChange}
        required
      />

      <input
        className="form-input"
        name="jersey_number"
        placeholder="Jersey Number"
        value={form.jersey_number}
        onChange={handleChange}
        required
      />

      <button type="submit" className="form-button">Create</button>
    </form>
  );
}
