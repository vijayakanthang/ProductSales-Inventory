import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/AddItem.css';

const AddItem = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [sold, setSold] = useState('');
  const [dateOfSale, setDateOfSale] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      title,
      price: parseFloat(price),
      description,
      category,
      image,
      sold: sold === 'true',
      dateOfSale,
    };

    try {
      const response = await axios.post('https://product-sales-inventory-5vnj.vercel.app/', newItem);
      if (response.status === 200) {
        alert('Item added successfully');
        // Clear form inputs
        setTitle('');
        setPrice('');
        setDescription('');
        setCategory('');
        setImage('');
        setSold('');
        setDateOfSale('');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item');
    }
  };

  return (
    <div className="form-div">
      <form className="form" onSubmit={handleSubmit}>
        <h1>ADD ITEMS</h1>
        <input
          className="input-field"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="input-field"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          className="input-field"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          className="input-field"
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          className="input-field"
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <div className="radio-group">
          <label>
            <input
              className="input-radio"
              type="radio"
              name="sold"
              value="true"
              checked={sold === 'true'}
              onChange={(e) => setSold(e.target.value)}
              required
            />
            Sold
          </label>
          <label>
            <input
              className="input-radio"
              type="radio"
              name="sold"
              value="false"
              checked={sold === 'false'}
              onChange={(e) => setSold(e.target.value)}
              required
            />
            Not Sold
          </label>
        </div>
        <input
          className="input-field"
          type="date"
          placeholder="Date of Sale"
          value={dateOfSale}
          onChange={(e) => setDateOfSale(e.target.value)}
          required
        />
        <button className="submit-button" type="submit">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
