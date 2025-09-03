import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../Styles/Header.css";

const Header = () => {
  return (
    <motion.div
      className="nav-bar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Link to="/" className="nav-link">
          Inventory
        </Link>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Link to="/stats" className="nav-link">
          Statistics
        </Link>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Link to="/additem" className="nav-link">
          Add Item
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Header;
