import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Home.css';
import Header from './Header';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [dateFilteredProducts, setDateFilteredProducts] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateQuery, setDateQuery] = useState('');

  const productsPerPage = 10;
  const lastIndex = currPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://product-sales-inventory-5vnj.vercel.app/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
      setDateFilteredProducts(response.data); 
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterByDate = () => {
      const filtered = products.filter(product => {
        return (
          new Date(product.dateOfSale).getMonth() + 1 === parseInt(dateQuery) ||
          dateQuery === ''
        );
      });
      setDateFilteredProducts(filtered);
    };
    filterByDate();
  }, [dateQuery, products]);

  useEffect(() => {
    const filterProducts = () => {
      const filtered = dateFilteredProducts.filter(product => {
        const matchesSearchText =
          searchQuery === '' ||
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.price.toString().includes(searchQuery);

        return matchesSearchText;
      });
      setFilteredProducts(filtered);
    };
    filterProducts();
  }, [searchQuery, dateFilteredProducts]);

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
    setCurrPage(1);
  };

  const allMonths = ['-ALL', '-January', '-February', '-March', '-April', '-May', '-June', '-July', '-August', '-September', '-October', '-November', '-December'];
  
  const handleMonthChange = e => {
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
  const changePage = n => {
    setCurrPage(n);
  };
  const nextPage = () => {
    if (currPage !== npages) {
      setCurrPage(currPage + 1);
    }
  };

  return (
    <div className='t'>
      <h1>Inventory Management</h1>
      <br/>
      <div className='top'>
        <form onSubmit={e => e.preventDefault()}>
          <input
            type='text'
            placeholder='Search...'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
        <div>
          <select className='months' onChange={handleMonthChange} value={dateQuery}>
            <option value=''>Select Month</option>
            {allMonths.slice(1).map((month, index) => (
              <option key={index + 1} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table className='table'>
        <thead>
          <tr className='tablehead'>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {records.map(p => (
            <tr key={p._id}>
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td>{p.description}</td>
              <td>{p.price.toFixed(2)}</td>
              <td>{p.sold ? 'Sold' : 'Not Sold'}</td>
              <td>
                <img src={p.image} alt={p.title} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        <button onClick={prevPage} disabled={currPage === 1}>
          &lt; Previous Page
        </button>
        <div className='pagenumber'>
          {numbers.map(n => (
            <a
              href='#'
              className={`page-item ${currPage === n ? 'active' : ''}`}
              key={n}
              onClick={() => changePage(n)}
            >
              {n}
            </a>
          ))}
        </div>
        <button onClick={nextPage} disabled={currPage === npages}>
          Next Page &gt;
        </button>
      </div>
    </div>
  );
};

export default Home;
