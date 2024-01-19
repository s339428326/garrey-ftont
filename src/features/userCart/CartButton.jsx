import { useEffect, useState } from 'react';

import { getUserCart } from '../../api/cart';
// import { getTWDExchangeRate } from '../../api/currency';

import { useSelector, useDispatch } from 'react-redux';
import { getCartData } from './userCartSlice';
import { Link, useNavigate } from 'react-router-dom';

import {
  XMarkIcon,
  ShoppingCartIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import { LiaEthereum } from 'react-icons/lia';
import { CiCreditCard1 } from 'react-icons/ci';

import PropType from 'prop-types';

//Trash can
import { deleteCart } from './userCartSlice';
import { deleteCartItem } from '../../api/cart';

const CartButton = ({ isMove, className }) => {
  const userCart = useSelector((state) => state.userCart);
  const dispatch = useDispatch();

  const [isShow, setIsShow] = useState(false);
  const [total, setTotal] = useState(0);
  // const ethToTwd = useRef('');
  const navigator = useNavigate();

  useEffect(() => {
    const handleClose = (e) => {
      if (e.key === 'Escape') {
        setIsShow(false);
        document.body.style.overflow = 'auto';
        document.body.style.touchAction = 'auto';
      }
    };
    document.addEventListener('keydown', handleClose);
    return () => {
      document.removeEventListener('keydown', handleClose);
    };
  }, []);

  const handleModel = (isOpen) => {
    setIsShow((pre) => !pre);
    if (isOpen === 'open') {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.touchAction = 'auto';
    }
  };

  const handleTrashCan = async (id) => {
    try {
      await deleteCartItem(id);
      dispatch(deleteCart(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = () => {
    if (userCart.length === 0) return;
    navigator('/payment');
    document.body.style.overflow = 'auto';
    document.body.style.touchAction = 'auto';
  };

  useEffect(() => {
    (async () => {
      // user cart Data
      try {
        const res = await getUserCart();
        dispatch(getCartData(res));
        setTotal(
          res.map((item) => item.price).reduce((pre, next) => pre + next)
        );
      } catch (error) {
        console.log('[Get Value] User Cart', error);
      }
      //Eth to TWD
      // try {
      //   const res = await getTWDExchangeRate();
      //   ethToTwd.current = res;
      // } catch (error) {
      //   console.log('[Get Value] User Cart', error);
      // }
    })();
  }, []);

  useEffect(() => {
    if (userCart.length > 0) {
      setTotal(
        userCart.map((item) => item.price).reduce((pre, next) => pre + next)
      );
    } else {
      setTotal(0);
    }
  }, [userCart.length]);

  return (
    <div className={`${className}`}>
      <button
        onClick={() => handleModel('open')}
        className={`relative p-1.5  ${isMove && 'border-white'} outline-none`}
      >
        <ShoppingCartIcon
          className={`text-white  lg:text-black ${isMove && '!text-white'}`}
          width={23}
          height={23}
        />
        <p className="absolute border rounded-full top-[-4px] right-[-4px] w-5 h-5 bg-red-500 text-white flex justify-center items-center p-1 font-roboto">
          {userCart.length}
        </p>
      </button>

      <div>
        {isShow && (
          <div className="absolute top-0 left-0 bg-black w-screen h-[9999px] opacity-60 z-10"></div>
        )}
        {/* Hover Cart Item View */}
        <div
          className={`absolute top-0 right-0 left-0 z-50 w-screen h-screen ${
            isShow
              ? 'translate-y-0 lg:translate-x-0'
              : 'translate-y-full lg:translate-y-0 lg:translate-x-full'
          }   lg:transition-[transform] duration-300 lg:top-0`}
        >
          <div className="absolute right-0 bottom-0 w-screen lg:w-1/3 bg-white rounded-t-3xl mx-auto flex flex-col gap-2 border lg:bottom-auto lg:top-0 lg:h-screen lg:mt-4 lg:mr-4">
            <div className="p-4  border-b flex items-center gap-2">
              <button
                onClick={() => handleModel('false')}
                className="p-1 hover:bg-gray-300 transition-all duration-300 rounded-md"
              >
                <XMarkIcon width={24} height={24} />
              </button>
              <span className="text-xl font-bold">購物車</span>
            </div>
            <div className="px-4 my-1 flex justify-between font-semibold text-sm">
              <p>項目 {userCart.length}</p>
              <button className="hover:text-gray-500 transition-all duration-300 rounded-md p-1">
                Clear All
              </button>
            </div>
            <ul className="border-b max-h-[296px] md:max-h-[760px] overflow-y-scroll">
              {userCart.map((artwork) => (
                <li
                  key={artwork.id}
                  className="flex m-2 p-2 gap-4 rounded-xl hover:bg-gray-200 hover:bg-opacity-70 transition-all"
                >
                  <Link to="#">
                    <img
                      className="w-[75px] h-[75px] object-cover rounded-xl"
                      src={artwork?.productImgSrc}
                      alt={artwork?.name}
                    />
                  </Link>

                  <ul>
                    <li className="font-bold">
                      <Link to="#">{artwork.name}</Link>
                    </li>
                    <li>
                      <Link className="text-gray-700" to="#">
                        {artwork.user.name}
                      </Link>
                    </li>
                    <li className="text-sm">
                      {artwork.price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'TWD',
                        minimumFractionDigits: 0,
                      })}
                    </li>
                  </ul>
                  <button
                    onClick={() => handleTrashCan(artwork.id)}
                    className="ml-auto"
                  >
                    <TrashIcon width={24} height={24} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="px-4 flex justify-between">
              <p>總金額</p>
              <p>
                {total.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'TWD',
                  minimumFractionDigits: 0,
                })}
              </p>
            </div>
            <div className="flex items-center ml-auto px-4">
              <LiaEthereum size={20} />
              <p>{JSON.stringify()}</p>

              <p>
                {(total / 58557).toFixed(2).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'TWD',
                  minimumFractionDigits: 0,
                })}
              </p>
            </div>
            <div className="px-4">
              <ul className="flex flex-col gap-4">
                <li>
                  <p>付款方式</p>
                </li>
                <li>
                  <div className="flex text-gray-500">
                    <input
                      id="payment-ETH"
                      className="w-[24px] mr-2"
                      type="radio"
                      name="payment"
                      value={'ETH'}
                      disabled={true}
                    />
                    <label
                      htmlFor="payment-ETH"
                      className="flex items-center gap-2"
                    >
                      <LiaEthereum size={20} />
                      <span>ETH(未開放)</span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="flex">
                    <input
                      id="payment-Card"
                      className="w-[24px] mr-2"
                      type="radio"
                      name="payment"
                      value={'Card'}
                      defaultChecked={true}
                    />
                    <label
                      htmlFor="payment-Card"
                      className="flex items-center gap-2"
                    >
                      <CiCreditCard1 size={20} />
                      <span>信用卡</span>
                    </label>
                  </div>
                </li>
                <li className="">
                  <button
                    onClick={handleBuy}
                    className="block text-center p-2 mb-4 rounded-md bg-black text-white hover:bg-opacity-90 transition-all w-full"
                  >
                    購買
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CartButton.propTypes = {
  isMove: PropType.bool,
  className: PropType.string,
};

export default CartButton;
