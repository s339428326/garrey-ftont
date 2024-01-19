import { useState, forwardRef, useMemo, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import PropType from 'prop-types';

//api
import { newOrder, getUserOrder } from '../api/order';
import { deleteCartItem, deleteAllCartItem } from '../api/cart';

import { BsCheckCircleFill } from 'react-icons/bs';

import { TrashIcon } from '@heroicons/react/24/outline';
import {
  PiNumberCircleOneFill,
  PiNumberCircleTwoLight,
  PiNumberCircleTwoFill,
  PiNumberCircleThreeLight,
} from 'react-icons/pi';

import DefaultLayout from '../layouts/DefaultLayout';

//Trash can
import { deleteCart, cleanCart } from '../features/userCart/userCartSlice';

// eslint-disable-next-line react/display-name
const CustomDateInput = forwardRef(({ value, onClick, placeholder }, ref) => (
  <input
    className="border-b border-black outline-none px-2 py-1 font-bold w-full"
    onClick={onClick}
    ref={ref}
    placeholder={placeholder}
    type="text"
    defaultValue={value}
    readOnly
  />
));

CustomDateInput.propTypes = {
  value: PropType.string,
  onClick: PropType.func,
  placeholder: PropType.string,
  ref: PropType.node,
};

const Step1 = ({ setData, setPage }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onNextStep = (data) => {
    console.log(data);
    setPage(2);
    setData((pre) => {
      return { ...pre, ...data };
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onNextStep)}
      className="px-4 py-2 grid grid-cols-12 gap-6"
    >
      <div className="flex flex-col col-span-6">
        <label htmlFor="name" className="font-bold mb-2">
          收件人姓名
        </label>
        <input
          id="name"
          className="border-b border-black p-1 outline-none"
          placeholder="請輸入姓名"
          type="text"
          {...register('name', {
            required: { value: true, message: '請勿空白' },
          })}
        />
        <p className="text-sm text-red-500 h-[8px]">{errors?.name?.message}</p>
      </div>
      <div className="flex flex-col col-span-6">
        <label htmlFor="phone" className="font-bold mb-2">
          電話
        </label>
        <input
          id="phone"
          className="border-b border-black p-1 outline-none"
          placeholder="請輸入姓名"
          type="text"
          {...register('phone', {
            required: { value: true, message: '請勿空白' },
          })}
        />
        <p className="text-sm text-red-500 h-[8px]">{errors?.phone?.message}</p>
      </div>
      <div className="flex flex-col col-span-12">
        <label htmlFor="address" className="font-bold mb-2">
          地址
        </label>
        <input
          id="address"
          className="border-b border-black p-1 outline-none"
          placeholder="請輸入地址"
          type="text"
          {...register('address', {
            required: { value: true, message: '請勿空白' },
          })}
        />
        <p className="text-sm text-red-500 h-[8px]">
          {errors?.address?.message}
        </p>
      </div>
      <div className="col-span-12 flex justify-end">
        <button
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition-all"
          type="onSubmit"
        >
          下一步
        </button>
      </div>
    </form>
  );
};

Step1.propTypes = {
  setData: PropType.func,
  setPage: PropType.func,
};

const Step2 = ({ orderData, setData, setPage }) => {
  const auth = useSelector((state) => state.auth);
  const userCart = useSelector((state) => state.userCart);
  const dispatch = useDispatch();

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onNextStep = async (data) => {
    console.log('now', orderData);
    try {
      console.log('react hook from', data);
      setPage(3);
      setData((pre) => {
        return { ...pre, ...data };
      });
      const res = await newOrder({
        user: auth.id,
        name: orderData.name,
        phone: orderData.phone,
        address: orderData.address,
        OrderList: userCart.map((item) => item.id),
      });
      dispatch(cleanCart());
      const del = await deleteAllCartItem();
      console.log(del);
    } catch (error) {
      console.log(error);
    }
  };

  //建立訂單
  // const handleNewOrder = async () => {
  //   try {
  //     const res = await newOrder({
  //       name: data.name,
  //       phone: data.phone,
  //       address: data.address,
  //       OrderList: userCart.map((item) => item.id),
  //     });
  //     dispatch(cleanCart());
  //     console.log(res?.data?.message);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <form
      onSubmit={handleSubmit(onNextStep)}
      className="px-4 py-2 grid grid-cols-12 gap-6"
    >
      <div className="flex flex-col col-span-12">
        <label htmlFor="address" className="font-bold mb-2">
          信用卡卡號
        </label>
        <input
          id="address"
          className="border-b border-black p-1 outline-none"
          placeholder="請輸入信用卡號"
          type="text"
          {...register('cardNumber', {
            required: { value: true, message: '請勿空白' },
            minLength: {
              value: 12,
              message: '信用卡卡號勿低於12碼',
            },
          })}
        />
        <p className="text-sm text-red-500 h-[8px]">
          {errors?.cardNumber?.message}
        </p>
      </div>
      <div className="flex flex-col col-span-6">
        <label htmlFor="cardSafeNumber" className="font-bold mb-2">
          安全碼
        </label>
        <input
          id="cardSafeNumber"
          className="border-b border-black p-1 outline-none"
          placeholder="***"
          type="text"
          {...register('cardSafeNumber', {
            maxLength: {
              value: 3,
              message: '安全碼為三碼',
            },
            minLength: {
              value: 3,
              message: '安全碼為三碼',
            },
            required: { value: true, message: '請勿空白' },
          })}
        />
        <p className="text-sm text-red-500 h-[8px]">
          {errors?.cardSafeNumber?.message}
        </p>
      </div>
      <div className="flex flex-col col-span-6">
        <label htmlFor="cardDate" className="mb-2">
          到期日
        </label>
        <Controller
          id="cardDate"
          control={control}
          rules={{
            required: {
              value: true,
              message: '請填入日期',
            },
          }}
          name="cardDate"
          render={({ field }) => (
            <DatePicker
              placeholderText="xx/xxxx"
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              customInput={<CustomDateInput />}
            />
          )}
        />
        <p className="text-sm text-red-500 h-[8px]">
          {errors?.cardDate?.message}
        </p>
      </div>

      <div className="col-span-12 flex justify-end">
        <button
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition-all"
          type="onSubmit"
        >
          付款
        </button>
      </div>
    </form>
  );
};

Step2.propTypes = {
  orderData: PropType.object,
  setData: PropType.func,
  setPage: PropType.func,
};

const PaymentPage = () => {
  const auth = useSelector((state) => state.auth);
  const userCart = useSelector((state) => state.userCart);
  const dispatch = useDispatch();
  //page
  const [page, setPage] = useState(1);
  const [data, setData] = useState();

  const handleTrashCan = async (id) => {
    try {
      await deleteCartItem(id);
      dispatch(deleteCart(id));
    } catch (error) {
      console.log(error);
    }
  };

  const total = useMemo(
    () =>
      userCart.length
        ? userCart.map((item) => item.price).reduce((pre, next) => pre + next)
        : 0,
    [userCart.length]
  );

  //清空購物車

  return (
    <DefaultLayout>
      <main className="container mx-auto">
        <section className="my-[300px] flex items-center">
          <div className="border rounded-lg shadow-lg w-full">
            <div className="grid grid-cols-12 gap-6">
              <div
                className={` p-8 ${page === 3 ? 'col-span-12' : 'col-span-8'}`}
              >
                <ul className="flex gap-4 items-center py-2 mb-4">
                  <li className="p-2 flex-2">
                    <div className="flex gap-2 items-center">
                      {page === 1 ? (
                        <PiNumberCircleOneFill size={32} />
                      ) : (
                        <BsCheckCircleFill size={26} />
                      )}

                      <p>會員資料</p>
                    </div>
                  </li>
                  <li
                    className={`flex-1 h-[2px] ${
                      page === 1 ? 'bg-gray-400' : 'bg-black'
                    }`}
                  ></li>
                  <li className="p-2 flex-2">
                    <div className="flex gap-2 items-center">
                      {data?.cardNumber ? (
                        <BsCheckCircleFill size={26} />
                      ) : page === 2 ? (
                        <PiNumberCircleTwoFill size={32} />
                      ) : (
                        <PiNumberCircleTwoLight size={32} />
                      )}

                      <p>信用卡</p>
                    </div>
                  </li>
                  <li
                    className={`flex-1 h-[2px] ${
                      page === 2 ? 'bg-gray-400' : 'bg-black'
                    }`}
                  ></li>
                  <li className="p-2 flex-2">
                    <div className="flex gap-2 items-center">
                      {page === 3 ? (
                        <BsCheckCircleFill size={26} />
                      ) : (
                        <PiNumberCircleThreeLight size={32} />
                      )}
                      <p>完成訂單</p>
                    </div>
                  </li>
                </ul>
                <ul className="my-40">
                  <li className={`${page !== 1 && 'hidden'}`}>
                    <Step1 setData={setData} setPage={setPage} />
                  </li>
                  <li className={`${page !== 2 && 'hidden'}`}>
                    <Step2
                      orderData={data}
                      setData={setData}
                      setPage={setPage}
                    />
                  </li>
                  <li className={`${page !== 3 && 'hidden'}`}>
                    <div className="px-2 flex justify-center mb-2">
                      <div className="text-2xl lg:text-4xl font-bold font-hind border-white bg-black text-white py-4 lg:px-2 lg:mx-0">
                        <span className="text-red-500">Gallery</span> Platform
                      </div>
                    </div>
                    <h5 className="text-center text-2xl">訂購完成</h5>
                    <p className="text-gray-400 text-center text-sm mb-6">
                      點以下連結繼續旅程
                    </p>
                    <ul className="flex justify-center gap-12">
                      <li className="p-2 rounded-sm text-xl">
                        <Link
                          className="p-2 rounded-sm hover:bg-black  hover:text-white transition-all"
                          to="/"
                        >
                          首頁
                        </Link>
                      </li>
                      <li className="p-2 rounded-sm text-xl">
                        <Link
                          className="p-2 rounded-sm hover:bg-black  hover:text-white transition-all"
                          to={`/user/order/${auth.id}`}
                        >
                          訂單查詢
                        </Link>
                      </li>
                      <li className="p-2 rounded-sm text-xl">
                        <Link
                          className="p-2 rounded-sm hover:bg-black  hover:text-white transition-all"
                          to={`/user/info/${auth.id}`}
                        >
                          會員
                        </Link>
                      </li>
                      <li className="p-2 rounded-sm text-xl">
                        <Link
                          className="p-2 rounded-sm hover:bg-black  hover:text-white transition-all"
                          to={`/user/artwork/${auth.id}`}
                        >
                          上架藝術品
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div
                className={`col-span-4 py-4 px-2 rounded-r border-l-2 ${
                  page === 3 && 'hidden'
                } `}
              >
                <h5 className="text-2xl font-bold pb-4 border-b">購買資訊</h5>
                <div className="flex flex-col justify-between ">
                  {/* 購物車Data */}
                  {/* <p>目前無藝術品</p> */}
                  <ul className="flex flex-col gap-4 py-4 px-1 h-[511px] overflow-y-scroll">
                    {userCart.map((artwork) => (
                      <li
                        key={artwork.id}
                        className="flex p-1 gap-4 rounded-xl hover:bg-gray-200 hover:bg-opacity-70 transition-all"
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
                  <div className="px-4 flex justify-between items-center ">
                    <p className="text-xl">總金額</p>
                    <p>
                      {total.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'TWD',
                        minimumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </DefaultLayout>
  );
};

export default PaymentPage;
