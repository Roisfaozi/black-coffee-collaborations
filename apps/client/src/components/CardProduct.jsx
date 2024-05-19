import React from 'react';
import ProductBanner from '../assets/product-image.png';

export default function CardProduct({ title, image, price, promo }) {
  return (
    <div className="relative w-[168px] h-[253px] text-center shadow-xl rounded-xl p-3 flex flex-col items-center justify-between">
      <div className="">
        <img src={ProductBanner} alt={title} className="rounded-full shadow-xl w-[128px] h-[128px]" />

        {promo ? (
          <p className="px-2 py-1 absolute right-0 top-7 rounded-2xl bg-white text-2xl font-bold">{promo}%</p>
        ) : (
          ''
        )}
      </div>
      <h3 className="text-bold text-[20px]">{title}</h3>
      <p>IDR {price}</p>
    </div>
  );
}
