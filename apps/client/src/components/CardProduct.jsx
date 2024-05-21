import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CardProduct({ id, title, image, price, promo }) {
  let navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/detail-product/${id}`)}
      className="relative w-[156px] h-[253px] text-center shadow-xl rounded-xl p-3 flex flex-col items-center justify-between"
    >
      <div className="">
        <img src={image} alt={title} className="rounded-full shadow-xl w-[128px] h-[128px]" />

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
