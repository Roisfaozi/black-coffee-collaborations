import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import IncomeChart from '../../components/IncomeChart';
import useApi from '../../utils/useApi';

import threeDots from '../../assets/three-dots.png';
import cheryn from '../../assets/cheryn.png';
import staffChart from '../../assets/staff-chart.png';
import goalsChart from '../../assets/goals-chart.png';
import grayDots from '../../assets/gray-dots.png';
import blueDots from '../../assets/blue-dots.png';

function Dashboard() {
  const api = useApi();
  const [interval, setInterval] = useState('day');
  const [data, setData] = useState([]);

  // Handle Change
  const handleChange = (e) => {
    setInterval(e.target.value);
  };

  // Get Data
  useEffect(() => {
    api({
      method: 'GET',
      url: `/report/?interval=${interval}`,
    })
      .then(({ data }) => {
        setData(data.data);
      })
      .catch(({ response }) => {
        console.log(response.data);
        alert(`ERROR: ${response.data.error}`);
      });
  }, [interval]);

  const intervals = [
    { value: 'day', label: 'Daily' },
    { value: 'week', label: 'Weekly' },
    { value: 'month', label: 'Monthly' },
  ];
  return (
    <>
      <Header />
      <section className="flex-col justify-center items-center bg-[#F8F8F8] border-b-4 pt-[50px] pb-[150px]">
        {/* Interval */}
        <div className="w-[316px] lg:w-[516px] text-center mx-auto">
          <div className="text-lg lg:text-[30px] text-[#6A4029] font-rubik font-bold leading-[50px]">
            See how your store progress so far
          </div>
          <div className="flex mt-[21px] mb-[70px] justify-center">
            {intervals.map((data, index) => (
              <label
                key={data.index}
                className={`flex flex-col items-center ${index === 1 ? 'ml-[45px] mr-[25px] lg:mx-[118px]' : ''}`}
              >
                <input
                  type="radio"
                  name="gender"
                  value={data.value}
                  className="hidden peer"
                  onChange={handleChange}
                  checked={interval === data.value}
                />
                <div className="w-[30px] h-[30px] border-[5px] border-[#9F9F9F] rounded-full peer-checked:border-[#6A4029] peer-checked:bg-[#FFBA33]"></div>
                <span className="mt-[10px] text-[20px] text-[#9F9F9F] font-medium peer-checked:text-[#6A4029] peer-checked:font-bold">
                  {data.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="relative flex flex-col xl:flex-row xl:justify-between items-center xl:w-[1140px] h-[1150px] xl:h-[853px] font-poppins mx-auto">
          <div>
            {/* Monthly Report */}
            <div className="w-[316px] lg:w-[778px] h-[419px] lg:h-[701px] bg-white rounded-[20px] shadow-lg p-[19px] lg:p-[47px]">
              {/* Title */}
              <div className="flex justify-between items-center">
                <div className="text-[22px] lg:text-[30px] font-bold">Monthly Report</div>
                <img className="w-[18.7px] lg:w-[56px]" src={threeDots} alt="Three dots" />
              </div>
              <div className="mb-[30px] lg:mb-[82px]">{`Last 6 ${interval}s`}</div>
              {/* Income Chart */}
              <IncomeChart data={data} interval={interval} />
              <div className="flex justify-center items-center pt-[12px] mt-[20px] lg:mt-[38px]">
                <div className="size-[15px] bg-[#FFBA33] rounded-full mr-[30px]"></div>
                <div className="text-[15px]">Income</div>
              </div>
            </div>
            <button className="absolute xl:static bottom-[-90px] w-[315px] lg:w-[778px] h-[70px] lg:h-[97px] text-[17px] lg:text-[30px] text-white font-nunito bg-brown rounded-[20px] mt-12 shadow-shadow-button hover:bg-orange-950">
              Download Report
            </button>
          </div>

          <div className="flex flex-col lg:flex-row xl:flex-col lg:justify-between items-center md:w-[778px] xl:w-[316px] mt-[20px] mb-[30px] xl:my-0">
            {/* Best Staff */}
            <div className="w-[316px] lg:w-[375px] xl:w-[316px] h-[317px] lg:h-[353px] xl:h-[317px] bg-white rounded-[20px] shadow-lg p-[17px] mb-[20px] lg:mb-0 xl:mb-[31px]">
              {/* Staff Photo */}
              <div className="flex items-center border-b-2 pb-3">
                <img className="size-[79px] rounded-full mr-[12px]" src={cheryn} alt="Best staff" />
                <div>
                  <div className="text-[20px] font-bold">Cheryn Laurent</div>
                  <div>Keep up the good work and spread love!</div>
                </div>
              </div>

              {/* Staff Chart */}
              <div className="flex-col items-center text-center">
                <div className="text-[20px] font-bold mx-auto mt-2">Best Staff of the Month</div>
                <img className="size-[79px] rounded-full mx-auto my-3" src={staffChart} alt="Best staff" />
                <div className="w-[218px] text-[#7C828A] mx-auto">Achieved 3.5M of total 5M 478 Customer</div>
              </div>
            </div>

            {/* Goals Chart */}
            <div className="w-[316px] lg:w-[375px] xl:w-[316px] h-[353px] bg-white rounded-[20px] shadow-lg p-[17px]">
              <div className="flex-col items-center text-center">
                <div className="text-[20px] font-bold mx-auto mt-2">Goals</div>
                <div className="w-[265px] text-[#7C828A] mx-auto mt-[8px] mb-[18px]">
                  Your goals is still on 76%. Keep up the good work!
                </div>
                <img className="size-[164px] rounded-full mx-auto" src={goalsChart} alt="Best staff" />
                <div className="flex justify-center gap-x-[10px] my-6">
                  {[blueDots, grayDots, grayDots].map((dot, index) => (
                    <img key={index} src={dot} alt="Slide dots" />
                  ))}
                </div>
              </div>
            </div>
            <button className="hidden xl:block w-[316px] h-[97px] text-[30px] text-white font-nunito  bg-brown rounded-[20px] mt-12 shadow-shadow-button hover:bg-orange-950">
              Share Report
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Dashboard;
