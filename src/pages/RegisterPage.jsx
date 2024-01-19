import { useState } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid';

import { singup } from '../api/auth';

const RegisterPage = () => {
  //ajax sever singUp error message
  const [singUpErrMsg, setSingUpErrMsg] = useState('');
  const navigator = useNavigate();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (value) => {
    const res = await singup(value);
    if (res?.response?.data?.message) {
      setSingUpErrMsg(res.response.data.message);
    }
    navigator('/login');
  };

  return (
    <DefaultLayout>
      <main className="container mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-[95vh] grid grid-cols-12 gap-4 items-center"
          action=""
        >
          <div className="col-start-4 col-span-6">
            <Link className="flex gap-2 items-center mb-4" to="/login">
              <ArrowSmallLeftIcon className="h-8 w-8" />
              <span className="text-xl">返回</span>
            </Link>
            <p className="text-3xl font-bold mb-4">註冊</p>

            <div className="flex flex-col">
              <label htmlFor="email">信箱</label>
              <input
                className="border-b border-black p-2 outline-none"
                id="email"
                type="text"
                placeholder="請輸入信箱"
                {...register('email', {
                  required: { value: true, message: '⊗ 請勿空白' },
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: '⊗ 信箱格式不正確',
                  },
                })}
              />
              <p className="h-[1.25rem] text-red-500">
                {errors.email && errors.email.message}
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">密碼</label>
              <input
                className="border-b border-black p-2 outline-none"
                id="password"
                type="password"
                placeholder="請輸入密碼"
                {...register('password', {
                  required: { value: true, message: '⊗ 請勿空白' },
                  minLength: { value: 8, message: '⊗ 密碼長度請勿小於8位數' },
                  maxLength: {
                    value: 18,
                    message: '⊗ 已超過密碼最大限制18位數',
                  },
                })}
              />
              <p className="h-[1rem] text-red-500">
                {errors.password && errors.password.message}
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="confirmPassword">確認密碼</label>
              <input
                className="border-b border-black p-2 outline-none"
                id="confirmPassword"
                type="password"
                placeholder="再次確認密碼"
                {...register('confirmPassword', {
                  required: { value: true, message: '⊗ 請勿空白' },
                  validate: (value) => {
                    const password = watch('password', '');
                    console.log(password, value, value === password);
                    return value === password || '⊗ 請重新確認密碼是否一致';
                  },
                })}
              />
              <p className="h-[1rem] text-red-500">
                {errors.confirmPassword && errors.confirmPassword.message}
              </p>
            </div>
            <small className="h-[16px] text-red-500">{singUpErrMsg}</small>
            <button
              className="mt-4 border border-black w-full p-2 rounded-sm bg-black text-white hover:opacity-80 transition-opacity"
              type="submit"
            >
              確定
            </button>
          </div>
        </form>
      </main>
    </DefaultLayout>
  );
};

export default RegisterPage;
