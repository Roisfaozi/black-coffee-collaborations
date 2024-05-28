import React, { useEffect, useState, useRef } from 'react';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import useApi from '../utils/useApi.js';
import { layouts } from 'chart.js/auto';

function IncomeChart({ data, interval }) {
  const api = useApi();
  const totalPrice = data.map((item) => item.total_price);
  const [clickedBarIndex, setClickedBarIndex] = useState(null);
  const [maxBarThickness, setMaxBarThickness] = useState(19);

  // Change Bar Thickness When Resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setMaxBarThickness(8);
      } else {
        setMaxBarThickness(19);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Get Day Names
  const getDayNames = (data) => {
    const dayNames = [];
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    data.forEach((item) => {
      const date = new Date(item.interval);
      const dayName = daysOfWeek[date.getDay()];
      dayNames.unshift(dayName);
    });

    return dayNames;
  };

  // Get Weeks
  function getWeeks(data) {
    const weekNumbers = [];

    data.forEach((item) => {
      const date = new Date(item.interval);
      const nearestThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4 - (date.getDay() || 7));
      const yearStart = new Date(nearestThursday.getFullYear(), 0, 1);
      const weekNumber = Math.ceil(((nearestThursday - yearStart) / 86400000 + 1) / 7);

      if (!weekNumbers.includes(weekNumber)) {
        weekNumbers.unshift(weekNumber);
      }
    });

    return weekNumbers;
  }

  // Get Month Names
  const getMonthNames = (data) => {
    const monthNames = [];
    const monthOfYear = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    data.forEach((item) => {
      const date = new Date(item.interval);
      const monthName = monthOfYear[date.getMonth()];
      monthNames.unshift(monthName);
    });

    return monthNames;
  };

  // Chart
  const labels = interval === 'day' ? getDayNames(data) : interval === 'week' ? getWeeks(data) : getMonthNames(data);
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: totalPrice,
        backgroundColor: '#FFBA33',
        maxBarThickness: maxBarThickness,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    layout: {
      padding: {
        top: 20,
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        display: true,
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Poppins',
            size: 12,
          },
          callback: function (value, index) {
            if (index % 2 === 0) {
              return '';
            }

            if (Math.abs(value) >= 1.0e6) {
              return value / 1.0e6 + ' M';
            } else if (Math.abs(value) >= 1.0e4) {
              return parseInt(value / 1.0e3) + ' K';
            }
            return value.toLocaleString('id-ID');
          },
        },
      },
      x: {
        border: {
          display: true,
        },
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Poppins',
            size: 12,
            lineHeight: 1.3,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        display: (context) => context.dataIndex === clickedBarIndex,
        color: '#6A4029',
        anchor: 'end',
        align: 'top',
        font: {
          family: 'Poppins',
          weight: 700,
          size: 15,
        },
        clamp: true,

        borderRadius: 4,
        formatter: (value) => {
          return `Rp${value.toLocaleString('id-ID')}`;
        },
      },
    },

    onClick: (_, chartElements) => {
      if (chartElements.length > 0) {
        if (clickedBarIndex !== chartElements[0].index) {
          const clickedIndex = chartElements[0].index;
          setClickedBarIndex(clickedIndex);
        } else {
          setClickedBarIndex(null);
        }
      } else {
        setClickedBarIndex(null);
      }
    },
  };

  return (
    <div className="w-[287px] lg:w-[688px] h-[226px] lg:h-[375px] mx-auto">
      <Bar data={chartData} options={options} plugins={[ChartDataLabels]} />
    </div>
  );
}

export default IncomeChart;
