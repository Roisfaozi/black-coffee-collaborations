import React from 'react';
import PromoBanner from '../assets/promo-banner.png';

function Promo({ title, content }) {
  return (
    <div className="h-[109px] w-[312px] lg:h-[109px] lg:w-[348px] bg-green-600 flex items-center px-4 rounded-3xl ">
      <img src={PromoBanner} alt="" />
      <div className="">
        <h5 className="font-bold">HAPPY MOTHER’S DAY!</h5>
        <p>Get one of our favorite menu for free!</p>
      </div>
    </div>
  );
}

export default Promo;
