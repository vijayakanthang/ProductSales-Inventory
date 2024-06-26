import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import '../Styles/Statistics.css';

const Statistics = () => {
  const [month, setMonth] = useState('ALL');
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://product-sales-inventory-5vnj.vercel.app/stats');
      setStats(response.data);
    };
    fetchData();
  }, []);

  const allMonths = ['ALL', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const filteredStats = month === 'ALL' ? stats : stats.filter(stat => stat._id === parseInt(month));

  const soldData = allMonths.slice(1).map((_, idx) => filteredStats.filter(stat => stat._id === idx + 1 && stat.soldStats.some(s => s.sold)).reduce((acc, curr) => acc + curr.soldStats.filter(s => s.sold).reduce((a, c) => a + c.count, 0), 0));
  const notSoldData = allMonths.slice(1).map((_, idx) => filteredStats.filter(stat => stat._id === idx + 1 && stat.soldStats.some(s => !s.sold)).reduce((acc, curr) => acc + curr.soldStats.filter(s => !s.sold).reduce((a, c) => a + c.count, 0), 0));

  // Log data for debugging
  console.log('Filtered Stats:', filteredStats);
  console.log('Sold Data:', soldData);
  console.log('Not Sold Data:', notSoldData);

  const totalItemsSold = filteredStats.reduce((acc, stat) => acc + stat.soldStats.filter(s => s.sold).reduce((a, c) => a + c.count, 0), 0);
  const totalPriceSold = filteredStats.reduce((acc, stat) => acc + stat.soldStats.filter(s => s.sold).reduce((a, c) => a + c.totalAmount, 0), 0);

  const lineChartData = {
    labels: allMonths.slice(1),
    datasets: [
      {
        label: 'Sold Products',
        data: soldData,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Not Sold Products',
        data: notSoldData,
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      }
    ]
  };

  const priceRangeLabels = [
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
  ];

  const barChartData = {
    labels: priceRangeLabels,
    datasets: [
      {
        label: 'Products Sold',
        data: filteredStats.reduce((acc, stat) => {
          stat.soldStats.forEach(s => {
            if (s.sold) {
              const avgPrice = s.totalAmount / s.count; // average price per product in this group
              if (avgPrice < 100) acc[0] += s.count;
              else if (avgPrice < 200) acc[1] += s.count;
              else if (avgPrice < 300) acc[2] += s.count;
              else if (avgPrice < 400) acc[3] += s.count;
              else if (avgPrice < 500) acc[4] += s.count;
              else if (avgPrice < 600) acc[5] += s.count;
              else if (avgPrice < 700) acc[6] += s.count;
              else if (avgPrice < 800) acc[7] += s.count;
              else if (avgPrice < 900) acc[8] += s.count;
              else acc[9] += s.count;
            }
          });
          return acc;
        }, Array(10).fill(0)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className='statistics-container'>
      <div className='header'>
        <h1>Statistics for {month === 'ALL' ? 'All Months' : allMonths[parseInt(month)]}</h1>
      </div>
      <div className='filter'>
        <select value={month} onChange={handleMonthChange}>
          {allMonths.map((m, idx) => (
            <option key={idx} value={idx === 0 ? 'ALL' : idx}>{m}</option>
          ))}
        </select>
      </div>
      <div className='total-items'>
        <h1>Total Items & Price Sold</h1>
        <p>Total Price of Sold Items: ${totalPriceSold.toFixed(2)}</p>
        <p>Total Items Sold: {totalItemsSold}</p>
      </div>
      <div className='linechart'>
        <h1>Line Chart</h1>
        <Line data={lineChartData} options={{ responsive: true }} />
      </div>
      <div className='barchart'>
        <h1>Bar Chart</h1>
        <Bar
          data={barChartData}
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
  );
}

export default Statistics;
