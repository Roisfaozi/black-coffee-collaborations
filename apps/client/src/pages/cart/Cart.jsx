import React from 'react';

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import OrderItem from '../../components/OrderItem';
import PaymentMethod from '../../components/PaymentMethod';
import useApi from '../../utils/useApi';

const Cart = () => {
  const addressRef = useRef(null);
  const navigate = useNavigate();
  const api = useApi();
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0.12);
  const [shipping, setShipping] = useState(10000);
  const [totalAmount, setTotalAmount] = useState(0);
  const { userId } = useSelector((state) => state.users);

  const [dataOrder, setDataOrder] = useState({
    user_id: userId,
    total_price: subTotal,
    taxes: tax * subTotal,
    shipping: shipping,
    status: 'delivered',
    delivery_address: '',
    total_amount: totalAmount,
    payment_method_id: '',
    delivery_method_id: '',
  });

  const [payment, setPayment] = useState();
  const [profile, setProfile] = useState();
  const [cart, setCart] = useState();

  const getPayment = async (e) => {
    await api
      .get(`/attributeprod/payment`)
      .then(({ data }) => {
        setPayment(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getCart = async (e) => {
    await api
      .get(`/order/cart`)
      .then(({ data }) => {
        setCart(data.data);
        setDataOrder({ ...dataOrder, delivery_method_id: data.data[0].delivery_method });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProfile = async () => {
    await api
      .get(`/users/profile/${userId}`)
      .then(({ data }) => {
        setProfile({ address: data.data.address, phone_number: data.data.phone_number });
        setDataOrder({ ...dataOrder, delivery_address: data.data.address });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handlePaymentMethodChange = (id) => {
    const idPayment = id;
    setDataOrder({
      ...dataOrder,
      payment_method_id: idPayment,
      delivery_address: addressRef.current.value,
      delivery_method_id: cart[0].delivery_method,
    });
  };
  const changeHanlder = (e) => {
    const datas = { ...dataOrder };
    datas[e.target.name] = e.target.value;
    setDataOrder(datas);
  };
  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    api({
      method: 'POST',
      url: `/order/`,
      data: dataOrder,
    })
      .then((res) => {
        alert(res.data.description);
      })
      .then(() => {
        navigate('/history');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCart();
    getPayment();
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Menghitung subTotal dari cart
    let total = 0;
    cart &&
      cart.forEach((element) => {
        total += element.product_price * element.quantity;
      });

    setSubTotal(total);
    setTotalAmount(subTotal + tax * subTotal + shipping);
    setDataOrder({ ...dataOrder, taxes: tax * subTotal, total_price: subTotal, total_amount: totalAmount });
  }, [cart, subTotal, tax, shipping, totalAmount, profile]);

  return (
    <>
      <Header />
      <main className="p-12 md:px-40 lg:px-32 xl:px-72 2xl:px-80 font-rubik text-base bg-bg-cart bg-center bg-cover bg-no-repeat">
        <h1 className="text-4xl mb-14 text-white font-bold" style={{ textShadow: '4px 4px 0px rgba(0,0,0,.8)' }}>
          Checkout your item now!
        </h1>
        <div className="lg:flex lg:justify-between space-y-10 lg:space-y-0">
          <div className="w-5/5  lg:w-2/5 px-8 py-14 bg-white rounded-2xl ">
            <h1 className="text-3xl font-bold mb-8 text-center">Order Summary</h1>
            <ul className="w-full flex flex-col overflow-y-auto h-64">
              {cart &&
                cart.map((p) => {
                  return (
                    <li key={p.id}>
                      <OrderItem
                        title={p.product_name}
                        price={p.product_price}
                        image={p.image_url}
                        size={p.size_name}
                        quantity={p.quantity}
                      />
                    </li>
                  );
                })}
            </ul>
            <hr className="border-t-2" />
            <div className="mt-10">
              <div className="flex justify-between  text-base uppercase">
                <p>subtotal</p>
                <p>IDR {subTotal}</p>
              </div>
              <div className="flex justify-between  text-base uppercase">
                <p>tax & fees</p>
                <p>IDR {tax * subTotal}</p>
              </div>
              <div className="flex justify-between  text-base uppercase">
                <p>Shipping</p>
                <p>IDR {shipping}</p>
              </div>
              <div className="flex justify-between  text-2xl font-bold mt-10 uppercase">
                <p>total</p>
                <p>IDR {totalAmount}</p>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl ">
              <h3 className="text-3xl font-bold mb-3 text-center">Address details</h3>

              <h4 className="text-2xl  mb-3 text-center">Delivery to Iskandar Street</h4>

              <hr className="border border-t-1 mb-3" />
              <textarea
                name="delivery_address"
                id="address"
                cols="30"
                className="focus:outline-none"
                ref={addressRef}
                onChange={changeHanlder}
                defaultValue={profile && profile.address}
              ></textarea>
              <hr className="border border-t-2 mb-3" />
              <p>{profile && profile.phone_number}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl ">
              <h3 className="text-3xl font-bold text-center">Payment Method</h3>
              <ul className="w-full flex flex-col overflow-y-auto h-64">
                {payment &&
                  payment.map((p) => {
                    return (
                      <li key={p.method_id}>
                        <PaymentMethod id={p.method_id} name={p.method_name} onChange={handlePaymentMethodChange} />
                      </li>
                    );
                  })}
              </ul>
            </div>
            <form onSubmit={handleSubmitOrder}>
              <Button content="Confirm and Pay" />
            </form>
          </div>
        </div>
      </main>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default Cart;
