import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import iconCoffee from '../../assets/icons/coffee 1.png';
import iconGoogle from '../../assets/icons/google-logo-png-suite-everything-you-need-know-about-google-newest-0 2.png';
import FooterSign from '../../components/FooterSign';
import useApi from '../../utils/useApi';

function SignUp() {
  const api = useApi();
  const alertElm = document.querySelector('#alert-error');

  const [form, setForm] = useState({});
  const [message, setMessage] = useState(null);

  const { isAuthUser } = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthUser) {
      navigate('/');
    }
  }, [isAuthUser]);

  const changeHanlder = (e) => {
    const data = { ...form };
    data[e.target.name] = e.target.value;
    setForm(data);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    api({
      method: 'POST',
      url: '/users/create',
      data: form,
    })
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          navigate('/login');
        }, 1500);
        setMessage('Pendaftaran Berhasil');
        alertElm.classList.add('opacity-100');
      })
      .catch((err) => {
        console.log(err.response.data.description);
        if (err.response.data.description) {
          setMessage(err.response.data.description);
          alertElm.classList.add('opacity-100');
          return;
        }
        setMessage('Oops error');
        alertElm.classList.add('opacity-100');
      });
  };

  //Menghilangkan alert secara otomatis
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        alertElm.classList.remove('opacity-100');
      }, 7000);
    }
  }, [message]);

  const closeAllert = (e) => {
    alertElm.classList.remove('opacity-100');
    if (e.key == 'Enter') {
      alertElm.classList.remove('opacity-100');
    }
  };

  return (
    <main className="flex md:flex-row w-screen font-rubik">
      <section className="hidden md:flex bg-heroSign bg-left-top bg-cover bg-no-repeat w-1/2 h-auto border overflow-x-hidden"></section>
      <section className=" w-full md:w-1/2 flex flex-col overflow-x-hidden">
        <div className="flex flex-col pt-10 ps-10 pe-12">
          <div className="flex flex-row justify-between">
            <a className="flex flex-row gap-x-2 justify-center items-center " href="/">
              <img src={iconCoffee} alt="icon coffee" />
              <span className=" font-bold text-[20px] font-[#0B132A]">Coffee Shop</span>
            </a>
            <h1 className=" text-[35px] font-bold text-brown font-[#6A4029]">Sign Up</h1>
          </div>
          <div className="flex flex-col m-20 mb-16 ">
            <form
              className="flex flex-col gap-y-3 "
              action=""
              onSubmit={(event) => {
                submitHandler(event);
              }}
            >
              <div className="flex flex-col gap-y-2">
                <label className=" text-[#4F5665] font-bold text-[20px] " htmlFor="email">
                  Email Adress :
                </label>
                <input
                  className="text-[20px] border border-[#4F5665] rounded-[20px] py-5 px-5 focus:outline-none focus:border-brown focus:ring-brown focus:ring-1 placeholder:text-[#9F9F9F] placeholder:text-[20px] placeholder:font-normal"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your email adress"
                  required
                  autoComplete="email"
                  onChange={changeHanlder}
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label className=" text-[#4F5665] font-bold text-[20px] " htmlFor="password">
                  Password :
                </label>
                <input
                  className="text-[20px] border border-[#4F5665] rounded-[20px] py-5 px-5 focus:outline-none focus:border-brown focus:ring-brown focus:ring-1 placeholder:text-[#9F9F9F] placeholder:text-[20px] placeholder:font-normal"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                  onChange={changeHanlder}
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label className=" text-[#4F5665] font-bold text-[20px] " htmlFor="phone">
                  Phone Number :
                </label>
                <input
                  className="text-[20px] border border-[#4F5665] rounded-[20px] py-5 px-5 focus:outline-none focus:border-brown focus:ring-brown focus:ring-1 placeholder:text-[#9F9F9F] placeholder:text-[20px] placeholder:font-normal"
                  type="tel"
                  name="phone_number"
                  id="phone"
                  placeholder="Enter your phone number"
                  required
                  onChange={changeHanlder}
                />
              </div>
              <button
                className="text-[20px] text-brown font-bold bg-yellow rounded-[20px] py-5 px-5 mt-5 hover:bg-amber-500"
                type="submit"
              >
                Sign Up
              </button>
            </form>
            <button
              className=" flex flex-row gap-x-2 justify-center items-center shadow-shadow-button hover:shadow-md text-[17px] text-black font-bold rounded-[20px] py-5 px-5 mt-5"
              type="button"
            >
              <img src={iconGoogle} alt="icon google" /> Sign up with Google
            </button>
            <div className="flex flex-row justify-between items-center mt-12">
              <span className="w-[28%] h-[2px] bg-[#C4C4C4]"></span>
              <p className="text-[#9F9F9F] text-nowrap ">Already have an account?</p>
              <span className="w-[28%] h-[2px] bg-[#C4C4C4]"></span>
            </div>
            <a
              className=" text-center text-[20px] text-white font-bold bg-brown rounded-[20px] py-5 px-5 mt-12 shadow-shadow-button hover:bg-orange-950"
              href="/login"
            >
              Login Here
            </a>
          </div>
        </div>
        <FooterSign />
      </section>

      {/* alert notification */}
      <div
        id="alert-error"
        className="opacity-0  fixed top-0 left-0 w-screen h-screen flex flex-row justify-center items-center bg-[#000000CC] transition-all ease-in-out duration-1000 pointer-events-none"
      >
        <div className="bg-white h-fit flex flex-col items-center justify-center gap-y-7 rounded-[2px] px-12 pt-10 pb-8">
          <p className="font-bold text-brown text-xl">{message && message ? message : 'Periksa koneksi anda'}</p>
          <button
            id="btn-allert"
            className="bg-yellow text-brown rounded-[2px] px-7 py-2 hover:bg-orange-500 pointer-events-auto"
            type="button"
            onClick={closeAllert}
          >
            OK
          </button>
        </div>
      </div>
    </main>
  );
}

export default SignUp;
