import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function CardProduct({ id, title, image, price, promo }) {
  let navigate = useNavigate();

  // gatau kenapa isAuthAdmin nya ga ke deteksi
  const { isAuth } = useSelector((s) => s.users);
  console.log(isAuth);
  const t = true;
  return (
    <div
      onClick={() => navigate(`${isAuth ? '/edit-product' : '/detail-product'}/${id}`)}
      className="relative w-[156px] h-[253px] text-center shadow-xl rounded-xl p-3 flex flex-col items-center justify-between"
    >
      <div className="drop-shadow-none">
        <img src={image} alt={title} className="rounded-full drop-shadow-none w-[128px] h-[128px]" />

        {promo ? (
          <p className="px-2 py-1 absolute right-0 top-7 rounded-2xl bg-white text-2xl font-bold">{promo}%</p>
        ) : (
          ''
        )}
      </div>
      <h3 className="font-black text-[22px] leading-6 ">{title}</h3>
      <p className="text-[#6A4029] text-lg font-bold">IDR {price}</p>
    </div>
  );
}
