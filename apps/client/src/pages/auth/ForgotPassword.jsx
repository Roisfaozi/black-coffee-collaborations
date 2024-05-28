import React from 'react';
import iconCoffee from '../../assets/icons/coffee 1.png';
import FooterSign from '../../components/FooterSign';

export default function ForgotPassword() {
  return (
    <main className="flex md:flex-row w-screen font-rubik">
      <section className="bg-heroForgotPassword bg-left-top bg-cover bg-no-repeat w-1/2 h-auto border overflow-x-hidden"></section>
      <section className=" w-1/2 flex flex-col pt-14 overflow-x-hidden">
        <div className="w-full flex flex-col px-12 pb-32">
          <div className="flex flex-row justify-center">
            <a className="flex flex-row gap-x-2 justify-center items-center " href="/">
              <img src={iconCoffee} alt="icon coffee" />
              <span className=" font-bold text-[20px] font-[#0B132A]">Coffee Shop</span>
            </a>
          </div>
          <div className="flex flex-col mt-16">
            <div className="flex flex-col gap-y-2">
              <h3 className="text-center font-bold text-[52px]">Forgot your password?</h3>
              <p className="text-center font-normal text-[27px]">Don&apos;t worry, we got your back!</p>
            </div>
            <form className="flex flex-col gap-y-7 mt-20" action="">
              <div className="flex flex-col">
                <input
                  className="text-[20px] border border-[#4F5665] rounded-[20px] py-5 px-5 focus:outline-none focus:border-brown focus:ring-brown focus:ring-1 placeholder:text-[#9F9F9F] placeholder:text-[20px] placeholder:font-normal"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your email adress to get link"
                />
              </div>
              <button
                className="text-[20px] text-brown font-bold bg-yellow rounded-[20px] py-5 px-5 mt-5 hover:bg-amber-500"
                type="submit"
              >
                Send
              </button>
            </form>
            <div className="flex flex-col justify-center items-center mt-12">
              <p className="text-[20px] font-normal">Click here if you didn’t receive any link in 2 minutes</p>
              <span className="font-bold text-[20px]">01:52</span>
            </div>
            <a
              className=" text-center text-[20px] text-white font-bold bg-brown rounded-[20px] py-5 px-5 mt-12 shadow-shadow-button hover:bg-orange-950"
              href=""
            >
              Resend Link
            </a>
          </div>
        </div>
        <FooterSign />
      </section>
    </main>
  );
}
