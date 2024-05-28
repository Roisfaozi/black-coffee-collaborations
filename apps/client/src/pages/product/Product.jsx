import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../components/Button';
import CardProduct from '../../components/CardProduct';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Promo from '../../components/Promo';
import useApi from '../../utils/useApi';

function Product() {
  const api = useApi();
  const Navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [category, setCategory] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClickCategory = (e, category) => {
    setCategory(category);
  };
  const getProduct = async (e) => {
    await api
      .get(`/product/?page=${page}&limit=${limit}&food_type=${category}`)
      .then(({ data }) => {
        setProduct(data.data);
      })
      .then(() => {
        setSearchParams({ food_type: category });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getProduct(category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, page]);
  return (
    <>
      <Header />
      <section className="flex flex-col-reverse md:flex-row items-center md:items-start gap-4 md:gap-0">
        <Sidebar />
        <main className="px-5 sm:px-14  xl:px-28 border border-gray-300  space-y-14 flex flex-col items-center w-full">
          <ul className="w-full text-xl flex justify-between overflow-x-auto ">
            <li
              onClick={(e) => {
                handleClickCategory(e, '');
              }}
              className="cursor-pointer select-none p-3 border-b-2 flex-shrink-0"
            >
              All
            </li>
            <li
              onClick={(e) => {
                handleClickCategory(e, 'fav');
              }}
              className="cursor-pointer select-none p-3 border-b-2 flex-shrink-0"
            >
              Favorite & Promo
            </li>
            <li
              onClick={(e) => {
                handleClickCategory(e, 'Coffe');
              }}
              className="cursor-pointer p-3 border-b-2 flex-shrink-0"
            >
              Coffee
            </li>
            <li
              onClick={(e) => {
                handleClickCategory(e, 'non');
              }}
              className="cursor-pointer p-3 border-b-2 flex-shrink-0"
            >
              Non Coffee
            </li>
            <li
              onClick={(e) => {
                handleClickCategory(e, 'food');
              }}
              className="cursor-pointer p-3 border-b-2 flex-shrink-0"
            >
              Foods
            </li>
          </ul>
          <section className="w-full flex flex-wrap justify-around sm:grid sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-9">
            {product &&
              product.map((p) => {
                return <CardProduct key={p.id} id={p.id} title={p.name} price={p.price} image={p.image_url} />;
              })}
          </section>

          <p className="w-full ">*the price has been cutted by discount appears</p>
        </main>
      </section>
      <Footer />
    </>
  );
}

const Sidebar = () => {
  return (
    <aside className="w-4/5 lg:w-[628px] md:border shadow-xl border-gray-300 px-5 py-5 flex flex-col items-center gap-y-14">
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
  );
};

export default Product;
