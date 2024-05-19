import React from 'react';
import Promo from '../../components/Promo';
import CardProduct from '../../components/CardProduct';
import Button from '../../components/Button';
function Product() {
  return (
    <>
      <section className="flex">
        <aside className="w-[732px] border border-gray-300 px-5 py-5 flex flex-col items-center gap-y-14">
          <section className="text-center w-[60%]">
            <h3 className="font-bold text-[25px] text-primary">Promo Today</h3>
            <p>Coupons will be updated every weeks. Check them out! </p>
          </section>
          <section>
            <div className="space-y-4 mb-10">
              <Promo />
              <Promo />
              <Promo />
            </div>
            <Button content={'Apply Coupon'} color={'secondary'} />
          </section>
          <section>
            <h6>Terms and Condition</h6>
            <ol>
              <li>1. You can only apply 1 coupon per day</li>
              <li>2. It only for dine in</li>
              <li>3. Buy 1 get 1 only for new user</li>
              <li>4. Should make member card to apply coupon</li>
            </ol>
          </section>
        </aside>
        <main className="px-28 border border-gray-300  space-y-14 flex flex-col items-center w-full">
          <ul className="w-full md:text-2xl text-xl flex justify-between ">
            <li className="cursor-pointer select-none p-3 border-b-2 border-primary shadow-md ">Favorite & Promo</li>
            <li className="cursor-pointer p-3 border-b-2 border-primary shadow-md ">Coffee</li>
            <li className="cursor-pointer p-3 border-b-2 border-primary shadow-md ">Non Coffee</li>
            <li className="cursor-pointer p-3 border-b-2 border-primary shadow-md ">Foods</li>
            <li className="cursor-pointer p-3 border-b-2 border-primary shadow-md ">Add-On</li>
          </ul>
          <section className="w-full px-4  flex gap-8 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
            <CardProduct title={'Mocca Chino'} price={'23.000'} promo={'20'} />
            <CardProduct title={'Mocca Chino'} price={'23.000'} />
            <CardProduct title={'Mocca Chino'} price={'23.000'} />
            <CardProduct title={'Mocca Chino'} price={'23.000'} />
            <CardProduct title={'Mocca Chino'} price={'23.000'} />
            <CardProduct title={'Mocca Chino'} price={'23.000'} />
            <CardProduct title={'Mocca Chino'} price={'23.000'} />
            <CardProduct title={'Mocca Chino'} price={'23.000'} />
          </section>

          <p className="w-full ">*the price has been cutted by discount appears</p>
        </main>
      </section>
    </>
  );
}

export default Product;
