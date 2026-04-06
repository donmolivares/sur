import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL; // variable de entorno
console.log('API URL:', API_URL);

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    elemento: '',
    claudia: false,
    marcelo: false,
    observaciones: ''
  });
  const [editId, setEditId] = useState(null);

  // Traer items del backend
  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/items`);
      setItems(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Manejar cambios en inputs y checkboxes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Crear o actualizar item
  const handleSubmit = async (e) => {
    console.log('*****************************'); 
    console.log(`${API_URL}/items/${editId}`);
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_URL}/items/${editId}`, form);
       
        setEditId(null);
      } else {
        await axios.post(`${API_URL}/items`, form);
      }
      setForm({ elemento: '', claudia: false, marcelo: false, observaciones: '' });
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  // Editar item
  const handleEdit = (item) => {
    setForm({
      elemento: item.elemento,
      claudia: item.claudia,
      marcelo: item.marcelo,
      observaciones: item.observaciones
    });
    setEditId(item.id);
  };

  // Borrar item
  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de borrar este item?')) {
      await axios.delete(`${API_URL}/items/${id}`);
      fetchItems();
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-black">Lista de Equipamiento Sur</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <input
            type="text"
            name="elemento"
            value={form.elemento}
            onChange={handleChange}
            placeholder="Elemento"
            className="form-control custom-input"
            required
          />
        </div>

        <div className="form-check form-check-inline mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="claudia"
            checked={form.claudia}
            onChange={handleChange}
          />
          <label className="form-check-label">Claudia</label>
        </div>

        <div className="form-check form-check-inline mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="marcelo"
            checked={form.marcelo}
            onChange={handleChange}
          />
          <label className="form-check-label">Marcelo</label>
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="observaciones"
            value={form.observaciones}
            onChange={handleChange}
            placeholder="Observaciones"
            className="form-control custom-input"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {editId ? 'Actualizar' : 'Agregar'}
        </button>
      </form>

      {/* Tabla */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Elemento</th>
            <th>Claudia</th>
            <th>Marcelo</th>
            <th>Observaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.elemento}</td>
              <td>{item.claudia ? '✅' : '❌'}</td>
              <td>{item.marcelo ? '✅' : '❌'}</td>
              <td>{item.observaciones}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(item)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;