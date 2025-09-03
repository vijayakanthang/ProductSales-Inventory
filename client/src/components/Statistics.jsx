import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import { motion } from "framer-motion";
import "../Styles/Statistics.css";

Chart.register(...registerables);

const Statistics = () => {
  const [month, setMonth] = useState("ALL");
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://productsales-inventory.onrender.com/stats"
      );
      setStats(response.data);
    };
    fetchData();
  }, []);

  const allMonths = [
    "ALL",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filteredStats =
    month === "ALL"
      ? stats
      : stats.filter((stat) => stat._id === parseInt(month));

  const soldData = allMonths.slice(1).map((_, idx) =>
    filteredStats
      .filter(
        (stat) =>
          stat.soldStats.some((s) => s.sold) && stat._id === idx + 1
      )
      .reduce(
        (acc, curr) =>
          acc +
          curr.soldStats
            .filter((s) => s.sold)
            .reduce((a, c) => a + c.count, 0),
        0
      )
  );

  const notSoldData = allMonths.slice(1).map((_, idx) =>
    filteredStats
      .filter(
        (stat) =>
          stat.soldStats.some((s) => !s.sold) && stat._id === idx + 1
      )
      .reduce(
        (acc, curr) =>
          acc +
          curr.soldStats
            .filter((s) => !s.sold)
            .reduce((a, c) => a + c.count, 0),
        0
      )
  );

  const totalItemsSold = filteredStats.reduce(
    (acc, stat) =>
      acc +
      stat.soldStats
        .filter((s) => s.sold)
        .reduce((a, c) => a + c.count, 0),
    0
  );

  const totalPriceSold = filteredStats.reduce(
    (acc, stat) =>
      acc +
      stat.soldStats
        .filter((s) => s.sold)
        .reduce((a, c) => a + c.totalAmount, 0),
    0
  );

  const lineChartData = {
    labels: allMonths.slice(1),
    datasets: [
      {
        label: "Sold Products",
        data: soldData,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Not Sold Products",
        data: notSoldData,
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const barChartData = {
    labels: allMonths.slice(1),
    datasets: [
      {
        label: "Sold Products",
        data: soldData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Not Sold Products",
        data: notSoldData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <motion.div
      className="statistics-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="header"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1>
          Statistics for {month === "ALL" ? "All Months" : allMonths[month]}
        </h1>
      </motion.div>

      <motion.div
        className="filter"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {allMonths.map((m, idx) => (
            <option key={idx} value={idx === 0 ? "ALL" : idx}>
              {m}
            </option>
          ))}
        </select>
      </motion.div>

      <motion.div
        className="total-items"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h1>Total Items and Price Sold</h1>
        <p>Total Items Sold: {totalItemsSold}</p>
        <p>Total Price of Sold Items: ${totalPriceSold.toFixed(2)}</p>
      </motion.div>

      <motion.div
        className="linechart"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h1>Line Chart</h1>
        <Line data={lineChartData} options={{ responsive: true }} />
      </motion.div>

      <motion.div
        className="barchart"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h1>Bar Chart</h1>
        <Bar
          data={barChartData}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Statistics;
