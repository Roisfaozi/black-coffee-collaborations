import React from 'react';
import ProductBanner from '../assets/product-image.png';

export default function PaymentMethod(image, title, price, size, count) {
  return (
    <div className="flex mt-5">
      <input type="radio" name="payment_method" id="{value}" value="{value}" className="accent-secondary" />
      <label htmlFor="{value}" className="flex ml-3 items-center">
        <div className={`flex justify-center items-center rounded-xl p-3 bg-red-500`}>
          <img src={ProductBanner} alt="{label}" className="w-10 h-10" />
        </div>
        <p className="text-xl ml-3">label</p>
      </label>
    </div>
  );
}
