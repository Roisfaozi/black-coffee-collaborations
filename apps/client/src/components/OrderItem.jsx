import React from 'react';
import ProductBanner from '../assets/product-image.png';

export default function OrderItem(image, title, price, size, count) {
  return (
    <div className="flex justify-between p-5 font-rubik text-black items-center">
      <div className="flex items-center gap-x-2">
        <img src={ProductBanner} alt="" className="w-[88px] h-[88px] rounded-xl" />
        <div className="text-base">
          <p>Coffee Latte</p>
          <p>2</p>
          <p>Regular</p>
        </div>
      </div>
      <p className="">IDR 39.000</p>
    </div>
  );
}
