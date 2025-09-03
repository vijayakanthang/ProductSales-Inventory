import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../Styles/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [dateFilteredProducts, setDateFilteredProducts] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateQuery, setDateQuery] = useState("");

  const productsPerPage = 10;
  const lastIndex = currPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://productsales-inventory.onrender.com/products"
      );
      setProducts(response.data);
      setFilteredProducts(response.data);
      setDateFilteredProducts(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterByDate = () => {
      const filtered = products.filter((product) => {
        return (
          new Date(product.dateOfSale).getMonth() + 1 === parseInt(dateQuery) ||
          dateQuery === ""
        );
      });
      setDateFilteredProducts(filtered);
    };
    filterByDate();
  }, [dateQuery, products]);

  useEffect(() => {
    const filterProducts = () => {
      const filtered = dateFilteredProducts.filter((product) => {
        const matchesSearchText =
          searchQuery === "" ||
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.price.toString().includes(searchQuery);

        return matchesSearchText;
      });
      setFilteredProducts(filtered);
    };
    filterProducts();
  }, [searchQuery, dateFilteredProducts]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrPage(1);
  };

  const allMonths = [
    "-ALL",
    "-January",
    "-February",
    "-March",
    "-April",
    "-May",
    "-June",
    "-July",
    "-August",
    "-September",
    "-October",
    "-November",
    "-December",
  ];

  const handleMonthChange = (e) => {
    setDateQuery(e.target.value);
    setCurrPage(1);
  };

  const records = filteredProducts.slice(firstIndex, lastIndex);
  const npages = Math.ceil(filteredProducts.length / productsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  const prevPage = () => {
    if (currPage !== 1) {
      setCurrPage(currPage - 1);
    }
  };
  const changePage = (n) => {
    setCurrPage(n);
  };
  const nextPage = () => {
    if (currPage !== npages) {
      setCurrPage(currPage + 1);
    }
  };

  return (
    <motion.div
      className="t"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="title">📦 Inventory Management</h1>
      <div className="top">
        <motion.form
          onSubmit={(e) => e.preventDefault()}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-box"
          />
        </motion.form>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <select
            className="months"
            onChange={handleMonthChange}
            value={dateQuery}
          >
            <option value="">Select Month</option>
            {allMonths.slice(1).map((month, index) => (
              <option key={index + 1} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </motion.div>
      </div>

      <motion.table
        className="table"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <thead>
          <tr className="tablehead">
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {records.map((p, i) => (
            <motion.tr
              key={p._id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td>{p.description}</td>
              <td>${p.price.toFixed(2)}</td>
              <td>{p.sold ? "✅ Sold" : "❌ Not Sold"}</td>
              <td>
                <img src={p.image} alt={p.title} className="product-img" />
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>

      <motion.div
        className="pagination"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <button onClick={prevPage} disabled={currPage === 1}>
          ⬅ Previous
        </button>
        <div className="pagenumber">
          {numbers.map((n) => (
            <motion.a
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              href="#"
              className={`page-item ${currPage === n ? "active" : ""}`}
              key={n}
              onClick={() => changePage(n)}
            >
              {n}
            </motion.a>
          ))}
        </div>
        <button onClick={nextPage} disabled={currPage === npages}>
          Next ➡
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Home;
