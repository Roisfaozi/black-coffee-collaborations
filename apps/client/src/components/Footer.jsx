import React from 'react';
import iconCoffee from '../assets/icons/coffee 1.png';
import iconFb from '../assets/icons/icon-fb.png';
import iconIg from '../assets/icons/icon-ig.png';
import iconTwitter from '../assets/icons/icon-twitter.png';

export default function Footer() {
  const years = new Date().getFullYear();

  return (
    <footer className="relative font-rubik flex flex-row justify-between bg-[#F8F8F8] py-20 px-40 pt-40 -z-20">
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-row gap-x-2 items-center ">
          <img src={iconCoffee} alt="icon coffee" />
          <span className=" font-bold text-[20px] font-[#0B132A]">Coffee Shop</span>
        </div>
        <p className="w-1/2 text-[#4F5665] text-base font-[500] leading-7">
          Coffee Shop is a store that sells some good meals, and especially coffee. We provide high quality beans
        </p>
        <div className="flex flex-row gap-x-4">
          <a href="" className="flex flex-row bg-brown rounded-full border border-brown">
            <img className="" src={iconFb} alt="" />
          </a>
          <a href="" className="flex flex-row bg-brown rounded-full border border-brown">
            <img className="" src={iconTwitter} alt="" />
          </a>
          <a href="" className="flex flex-row bg-brown rounded-full border border-brown">
            <img className="" src={iconIg} alt="" />
          </a>
        </div>
        <p className="text-[#AFB5C0] text-base mt-5">©{years}CoffeeStore</p>
      </div>
      <div className="w-1/2 flex justify-end">
        <div className="flex flex-row gap-x-40">
          <div className="flex flex-col">
            <p className="text-[#0B132A] text-[18px] font-[500]">Product</p>
            <div className="text-[#4F5665] mt-5 grid grid-cols-1 gap-y-4">
              <a href="">Download</a>
              <a href="">Pricing</a>
              <a href="">Locations</a>
              <a href="">Countries</a>
              <a href="">Blog</a>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-[#0B132A] text-[18px] font-[500]">Engage</p>
            <div className="text-[#4F5665] mt-5 grid grid-cols-1 gap-y-4">
              <a href="">Coffee Shop ?</a>
              <a href="">About Us</a>
              <a href="">FAQ</a>
              <a href="">Privacy Policy</a>
              <a href="">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
