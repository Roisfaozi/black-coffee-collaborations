import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import iconCoffee from '../../src/assets/icons/coffee 1.png';
import { logout } from '../../src/store/reducer/user';
import imageUser from '../assets/images/Ellipse 175 (2).png';

export default function Header() {
  const { isAuthUser, isAuthAdmin } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const location = useLocation();

  // function stylingNavbar() {
  //   const navlink = document.querySelectorAll('.nav-link');

  //   for (let i = 0; i < navlink.length; i++) {
  //     navlink[i].classList.remove('text-brown', 'font-bold');
  //     navlink[i].classList.add('text-[#4F5665]', 'normal');
  //   }

  //   if (location.pathname == '/') {
  //     document.querySelector('#home').classList.add('text-brown', 'font-bold');
  //   }
  //   //tambahkan pages lainnya
  // }

  return (
    <header className="font-rubik flex flex-row justify-between px-40 py-10 border-b-[1px] border-[#9f9f9f56]">
      <a className="w-1/4 flex flex-row gap-x-2 justify-start items-center" href="/">
        <img src={iconCoffee} alt="icon coffee" />
        <span className=" font-bold text-[20px] font-[#0B132A]">Coffee Shop</span>
      </a>
      <nav className="w-1/2 flex">
        <ul className="w-full flex flex-row justify-center items-center gap-x-10">
          {HeaderLinks.map((link, i) => (
            <HeaderLink key={i} {...link} />
          ))}
        </ul>
      </nav>
      <div className="w-1/4 flex justify-end items-center gap-x-8">
        {isAuthUser || isAuthAdmin ? (
          <>
            <div>
              <img src="" alt="" />
            </div>
            <div className="hidden relative group cursor-pointer md:flex justify-end">
              <img src={imageUser} alt="image user" />
              <span className="hidden group-hover:flex hover:flex md:absolute top-[50px] left-0 flex flex-col md:h-fit md:shadow-xl hover:shadow-2xl bg-white py-5 pb-2 mt-0 rounded-[4px] z-30">
                <a className="font-light px-5 py-2 hover:bg-neutral-100" href="/profile">
                  Profile
                </a>
                <a
                  className="text-nowrap font-light px-5 py-2 hover:bg-neutral-100"
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(logout());
                  }}
                >
                  Sign out
                </a>
              </span>
            </div>
          </>
        ) : (
          <>
            <a className="font-[500] text-[#0B132A] text-base" href="/login">
              Login
            </a>
            <a className="bg-yellow rounded-[50px] px-10 py-3 text-[#6A4029] font-[500] shadow-2xl" href="/signup">
              Sign Up
            </a>
          </>
        )}
      </div>
    </header>
  );
}

const HeaderLinks = [
  {
    title: 'Home',
    route: '/',
  },
  {
    title: 'Product',
    route: '/product',
  },
  {
    title: 'Your Cart',
    route: '/your-cart',
  },
  {
    title: 'History',
    route: '/history',
  },
];

const HeaderLink = ({ title, route }) => {
  const location = useLocation();

  const isActiveRoute = location.pathname === route;
  return (
    <li>
      <Link to={route} className={`nav-link text-[#4F5665] ${isActiveRoute ? 'text-brown font-bold' : ''}`}>
        {title}
      </Link>
    </li>
  );
};
