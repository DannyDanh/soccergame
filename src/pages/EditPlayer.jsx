// src/pages/EditPlayer.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './Form.css';

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
    await supabase.from('players').update(form).eq('id', id);
    navigate(`/players/${id}`);
  };

  const handleDelete = async () => {
    await supabase.from('players').delete().eq('id', id);
    navigate('/');
  };

  if (!form) return <p>Loading...</p>;

  return (
    <form onSubmit={handleUpdate} className="form">
      <h2>Edit Soccer Player</h2>

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
        placeholder="Position"
        value={form.position}
        onChange={handleChange}
        required
      />

      <input
        className="form-input"
        type="number"
        name="rating"
        placeholder="Rating"
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

      <button type="submit" className="form-button">Update</button>
      <button type="button" className="form-button delete" onClick={handleDelete}>
        Delete
      </button>
    </form>
  );
}
