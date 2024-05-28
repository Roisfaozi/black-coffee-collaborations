import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import iconCoffee from '../../assets/icons/coffee 1.png';
import iconGoogle from '../../assets/icons/google-logo-png-suite-everything-you-need-know-about-google-newest-0 2.png';
import FooterSign from '../../components/FooterSign';
import { loginAdmin, loginUser } from '../../store/reducer/user';
import useApi from '../../utils/useApi';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const api = useApi();
  const alertElm = document.querySelector('#alert-error');

  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState(null);

  const { isAuthUser, isAuthAdmin } = useSelector((state) => state.users);

  useEffect(() => {
    if (isAuthUser) {
      navigate('/');
    }

    if (isAuthAdmin) {
      navigate('/admin/dashboard');
    }
  }, [isAuthUser, isAuthAdmin]);

  const changeHanlder = (e) => {
    const data = { ...userData };
    data[e.target.name] = e.target.value;
    setUserData(data);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    api({
      method: 'POST',
      url: '/auth/',
      data: userData,
    })
      .then(({ data }) => {
        setMessage('Login Berhasil');
        alertElm.classList.add('opacity-100');
        const { token, role } = jwtDecode(data.data.token);
        setTimeout(() => {
          if (role == 'admin') {
            dispatch(loginAdmin(data.data));
          } else {
            dispatch(loginUser(data.data));
          }
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.description);
        alertElm.classList.add('opacity-100');
      });
  };

  const closeAllert = () => {
    alertElm.classList.remove('opacity-100');
  };

  //Menghilangkan alert secara otomatis
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        alertElm.classList.remove('opacity-100');
      }, 7000);
    }
  }, [message]);

  return (
    <main className="flex md:flex-row w-screen font-rubik">
      <section className="hidden md:flex bg-heroSign bg-left-top bg-cover bg-no-repeat md:w-1/2 h-auto border overflow-x-hidden"></section>
      <section className=" w-full md:w-1/2 flex flex-col overflow-x-hidden">
        <div className="flex flex-col pt-10 ps-10 pe-12">
          <div className="flex flex-row justify-between">
            <a className="flex flex-row gap-x-2 justify-center items-center " href="/">
              <img src={iconCoffee} alt="icon coffee" />
              <span className=" font-bold text-[20px] font-[#0B132A]">Coffee Shop</span>
            </a>
            <h1 className=" text-[35px] font-bold text-brown font-[#6A4029]">Login</h1>
          </div>
          <div className="flex flex-col m-20 mb-16 ">
            <form className="flex flex-col gap-y-7 " action="" onSubmit={submitHandler}>
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
                  autoComplete="email"
                  required
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
                  autoComplete="current-password"
                  required
                  onChange={changeHanlder}
                />
                <a className="text-brown text-[20px] font-bold mt-3 underline decoration-solid" href="/forgot-password">
                  Forgot password?
                </a>
              </div>
              <button
                className="text-[20px] text-brown font-bold bg-yellow rounded-[20px] py-5 px-5 mt-5 hover:bg-amber-500"
                type="submit"
              >
                Login
              </button>
            </form>
            <button
              className=" flex flex-row gap-x-2 justify-center items-center shadow-shadow-button hover:shadow-md text-[17px] text-black font-bold rounded-[20px] py-5 px-5 mt-5"
              type="button"
            >
              <img src={iconGoogle} alt="icon google" /> Login with Google
            </button>
            <div className="flex flex-row justify-between items-center mt-12">
              <span className="w-[28%] h-[2px] bg-[#C4C4C4]"></span>
              <p className="text-[#9F9F9F] text-nowrap ">Don&apos;t have an account?</p>
              <span className="w-[28%] h-[2px] bg-[#C4C4C4]"></span>
            </div>
            <a
              className=" text-center text-[20px] text-white font-bold bg-brown rounded-[20px] py-5 px-5 mt-12 shadow-shadow-button hover:bg-orange-950"
              href="/signup"
            >
              Sign up Here
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
