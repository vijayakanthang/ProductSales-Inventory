import React, { useState, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
import '../Styles/Statistics.css';

const Statistics = () => {
  const [month, setMonth] = useState('ALL');
  const [products, setProducts] = useState([]);
  const [dateFilteredProducts, setDateFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://productsales-inventory.onrender.com/products');
      setProducts(response.data);
      setDateFilteredProducts(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterByMonth = () => {
      if (month === 'ALL') {
        setDateFilteredProducts(products);
      } else {
        const filtered = products.filter(product => {
          const productMonth = new Date(product.dateOfSale).getMonth() + 1; // getMonth is zero-indexed
          return productMonth === parseInt(month);
        });
        setDateFilteredProducts(filtered);
      }
    };
    filterByMonth();
  }, [month, products]);

  let tot_sum = 0;
  let tot_sold = 0;
  let tot_notsold = 0;
  let chartdata = Array(10).fill(0);

  const allMonths = ['-ALL', '-January', '-February', '-March', '-April', '-May', '-June', '-July', '-August', '-September', '-October', '-November', '-December'];

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

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const lineChartData = {
    labels: allMonths.slice(1),
    datasets: [
      {
        label: 'Sold Products',
        data: allMonths.slice(1).map((_, idx) => products.filter(product => new Date(product.dateOfSale).getMonth() === idx && product.sold).length),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Not Sold Products',
        data: allMonths.slice(1).map((_, idx) => products.filter(product => new Date(product.dateOfSale).getMonth() === idx && !product.sold).length),
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      }
    ]
  };

  return (
    <div className='statistics-container'>
      <div className='header'>
        <h1>Statistics {allMonths[month]}</h1>
      </div>
      <div className='filter'>
        <select value={month} onChange={handleMonthChange}>
          <option value='ALL'>All</option>
          {allMonths.slice(1).map((m, idx) => (
            <option key={idx + 1} value={idx + 1}>{m}</option>
          ))}
        </select>
      </div>
      <div className='stats'>
        <p>Total sales: ${tot_sum.toFixed(2)}</p>
        <p>Total sold items: {tot_sold}</p>
        <p>Total not sold items: {tot_notsold}</p>
      </div>
      <div className='barchart'>
        <h1>Bar Chart {allMonths[month]}</h1>
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
      <div className='linechart'>
        <h1>Line Chart {allMonths[month]}</h1>
        <Line data={lineChartData} options={{ responsive: true }} />
      </div>

    </div>
  );
}

export default Statistics;
