import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Home.css';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [dateFilteredProducts, setDateFilteredProducts] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateQuery, setDateQuery] = useState('');
  const [month, setMonth] = useState('ALL');

  const productsPerPage = 10;
  const lastIndex = currPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://productsales-inventory.onrender.com/products');
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
    const monthIndex = parseInt(e.target.value, 10);
    setMonth(allMonths[monthIndex]);
    setCurrPage(1);
  };

  let tot_sum = 0;
  let tot_sold = 0;
  let tot_notsold = 0;
  let chartdata = Array(10).fill(0);

  dateFilteredProducts.forEach(product => {
    tot_sum += product.price;
    if (product.sold) {
      tot_sold += 1;
    } else {
      tot_notsold += 1;
    }

    if (product.sold) {
      const price = product.price;
      if (price < 100) chartdata[0] += 1;
      else if (price < 200) chartdata[1] += 1;
      else if (price < 300) chartdata[2] += 1;
      else if (price < 400) chartdata[3] += 1;
      else if (price < 500) chartdata[4] += 1;
      else if (price < 600) chartdata[5] += 1;
      else if (price < 700) chartdata[6] += 1;
      else if (price < 800) chartdata[7] += 1;
      else if (price < 900) chartdata[8] += 1;
      else chartdata[9] += 1;
    }
  });

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
      <h1>Roxiler Product-Transaction</h1>
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
      <div className='b-n-s'>
        <div className='stats'>
          <h1>Statistics  {month}</h1>
          <div className='stats-1'>
            <p>Total sales: {tot_sum.toFixed(2)}</p>
            <p>Total sold items: {tot_sold}</p>
            <p>Total not sold items: {tot_notsold}</p>
          </div>
        </div>
        <div className='barchart'>
          <h1>Bar Chart  {month}</h1>
          <Bar
            data={{
              labels: [
                '0-100',
                '101-200',
                '201-300',
                '301-400',
                '401-500',
                '501-600',
                '601-700',
                '701-800',
                '801-900',
                '901-above'
              ],
              datasets: [
                {
                  label: 'Products Sold',
                  data: chartdata,
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1
                }
              ]
            }}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
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
      {/* <button >seed</button>*/}
    </div>
  );
};

export default Home;
