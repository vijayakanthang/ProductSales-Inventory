import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../Styles/AddItem.css";

const AddItem = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [sold, setSold] = useState("");
  const [dateOfSale, setDateOfSale] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      title,
      price: parseFloat(price),
      description,
      category,
      image,
      sold: sold === "true",
      dateOfSale,
    };

    try {
      const response = await axios.post(
        "https://productsales-inventory.onrender.com/",
        newItem
      );
      if (response.status === 200) {
        alert("Item added successfully ✅");
        setTitle("");
        setPrice("");
        setDescription("");
        setCategory("");
        setImage("");
        setSold("");
        setDateOfSale("");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item ❌");
    }
  };

  return (
    <div className="form-div">
      <motion.form
        className="form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          ADD ITEMS
        </motion.h1>

        <motion.input
          className="input-field"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          whileFocus={{ scale: 1.03, borderColor: "#124e66" }}
        />
        <motion.input
          className="input-field"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          whileFocus={{ scale: 1.03, borderColor: "#124e66" }}
        />
        <motion.input
          className="input-field"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          whileFocus={{ scale: 1.03, borderColor: "#124e66" }}
        />
        <motion.input
          className="input-field"
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          whileFocus={{ scale: 1.03, borderColor: "#124e66" }}
        />
        <motion.input
          className="input-field"
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          whileFocus={{ scale: 1.03, borderColor: "#124e66" }}
        />

        <motion.div
          className="radio-group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <label>
            <input
              className="input-radio"
              type="radio"
              name="sold"
              value="true"
              checked={sold === "true"}
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
              checked={sold === "false"}
              onChange={(e) => setSold(e.target.value)}
              required
            />
            Not Sold
          </label>
        </motion.div>

        <motion.input
          className="input-field"
          type="date"
          value={dateOfSale}
          onChange={(e) => setDateOfSale(e.target.value)}
          required
          whileFocus={{ scale: 1.03, borderColor: "#124e66" }}
        />

        <motion.button
          className="submit-button"
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Item
        </motion.button>
      </motion.form>
    </div>
  );
};

export default AddItem;
