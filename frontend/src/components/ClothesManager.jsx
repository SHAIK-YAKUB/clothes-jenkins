import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const ClothesManager = () => {
  const [clothesList, setClothesList] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    clothName: '',
    clothType: '',
    price: '',
    size: '',
    description: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');

  const baseUrl = import.meta.env.VITE_API_URL;

  // Predefined options
  const clothNames = ['Shirt', 'T-Shirt', 'Jeans', 'Jacket', 'Sweater'];
  const clothTypes = ['Cotton', 'Polyester', 'Wool', 'Silk', 'Denim'];
  const prices = [299, 499, 699, 899, 1200];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const descriptions = ['Casual', 'Formal', 'Sport', 'Party', 'Winter Wear'];

  useEffect(() => {
    fetchAllClothes();
  }, []);

  const fetchAllClothes = async () => {
    try {
      const res = await axios.get(`${baseUrl}/clothesapi/all`);
      setClothesList(res.data);
    } catch (error) {
      setMessage('Failed to fetch clothes.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in formData) {
      if (!formData[key] || formData[key].toString().trim() === '') {
        setMessage(`Please select or fill the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (!editMode) {
        await axios.post(`${baseUrl}/clothesapi/add`, formData);
        setMessage('Clothes added successfully.');
      } else {
        await axios.put(`${baseUrl}/clothesapi/update`, formData);
        setMessage('Clothes updated successfully.');
        setEditMode(false);
      }
      fetchAllClothes();
      setFormData({ id: '', clothName: '', clothType: '', price: '', size: '', description: '' });
    } catch (error) {
      setMessage('Error saving clothes.');
    }
  };

  const handleEdit = (cloth) => {
    setFormData(cloth);
    setEditMode(true);
    setMessage(`Editing ID ${cloth.id}`);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/clothesapi/delete/${id}`);
      setMessage(res.data);
      fetchAllClothes();
    } catch (error) {
      setMessage('Error deleting clothes.');
    }
  };

  return (
    <div className="clothes-container">

      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>🧥 Clothes Management</h2>

      <form className="form-card" onSubmit={handleSubmit}>
        <input
          type="number"
          name="id"
          placeholder="Enter ID"
          value={formData.id}
          onChange={handleChange}
          required
          disabled={editMode}
        />

        <select name="clothName" value={formData.clothName} onChange={handleChange} required>
          <option value="">Select Cloth Name</option>
          {clothNames.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>

        <select name="clothType" value={formData.clothType} onChange={handleChange} required>
          <option value="">Select Cloth Type</option>
          {clothTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select name="price" value={formData.price} onChange={handleChange} required>
          <option value="">Select Price</option>
          {prices.map((p) => <option key={p} value={p}>₹{p}</option>)}
        </select>

        <select name="size" value={formData.size} onChange={handleChange} required>
          <option value="">Select Size</option>
          {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        <select name="description" value={formData.description} onChange={handleChange} required>
          <option value="">Select Description</option>
          {descriptions.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-add" type="submit">Add Clothes</button>
          ) : (
            <>
              <button className="btn-update" type="submit">Update Clothes</button>
              <button className="btn-cancel" type="button" onClick={() => { setEditMode(false); setFormData({ id: '', clothName: '', clothType: '', price: '', size: '', description: '' }); }}>Cancel</button>
            </>
          )}
        </div>
      </form>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Size</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clothesList.map((cloth) => (
              <tr key={cloth.id}>
                <td>{cloth.id}</td>
                <td>{cloth.clothName}</td>
                <td>{cloth.clothType}</td>
                <td>₹{cloth.price}</td>
                <td>{cloth.size}</td>
                <td>{cloth.description}</td>
                <td className="action-buttons">
                  <button className="btn-update" onClick={() => handleEdit(cloth)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(cloth.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {clothesList.length === 0 && (
              <tr>
                <td colSpan="7">No Clothes Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClothesManager;
