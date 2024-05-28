import React from 'react';

import ProductBanner from '../../assets/promo-banner.png';
import Button from '../../components/Button';
import OrderItem from '../../components/OrderItem';
import PaymentMethod from '../../components/PaymentMethod';

const Cart = () => {
  return (
    <>
      <main className="p-12 md:px-40 lg:px-32 xl:px-72 2xl:px-80 font-rubik text-base bg-bg-cart bg-center bg-cover bg-no-repeat">
        <h1 className="text-4xl mb-14 text-white font-bold" style={{ textShadow: '4px 4px 0px rgba(0,0,0,.8)' }}>
          Checkout your item now!
        </h1>
        <div className="lg:flex lg:justify-between space-y-10 lg:space-y-0">
          <div className=" px-8 py-14 bg-white rounded-2xl ">
            <h1 className="text-3xl font-bold mb-8 text-center">Order Summary</h1>

            <OrderItem />
            <OrderItem />
            <hr className="border-t-2" />

            <div className="mt-10">
              <div className="flex justify-between  text-base uppercase">
                <p>subtotal</p>
                <p>IDR 100.000</p>
              </div>
              <div className="flex justify-between  text-base uppercase">
                <p>tax & fees</p>
                <p>IDR 100.000</p>
              </div>
              <div className="flex justify-between  text-2xl font-bold mt-10 uppercase">
                <p>total</p>
                <p>IDR 200.000</p>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl ">
              <h3 className="text-3xl font-bold mb-3 text-center">Address details</h3>

              <h4 className="text-2xl  mb-3 text-center">Delivery to Iskandar Street</h4>

              <hr className="border border-t-1 mb-3" />
              <textarea
                name="address"
                id="address"
                cols="30"
                className="focus:outline-none"
                defaultValue="Km 5 refinery road oppsite republic road, effurun, Jakarta"
              ></textarea>
              <hr className="border border-t-2 mb-3" />
              <p>0822314874</p>
            </div>
            <div className="bg-white p-8 rounded-2xl ">
              <h3 className="text-3xl font-bold text-center">Payment Method</h3>
              <PaymentMethod />
            </div>
            <Button content="Confirm and Pay" />
          </div>
        </div>
      </main>
    </>
  );
};

export default Cart;
