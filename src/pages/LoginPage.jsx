import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import LoginForm from '../features/auth/LoginForm';

import DefaultLayout from '../layouts/DefaultLayout';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //login error
  const [serverSideErrMsg, setServerSideErrMsg] = useState('');

  return (
    <DefaultLayout>
      <main className="container mx-auto">
        <LoginForm
          handleSubmit={handleSubmit}
          setServerSideErrMsg={setServerSideErrMsg}
        >
          <div className="col-start-4 col-span-6">
            <h1 className="text-3xl mb-6 font-bold">登入</h1>
            <div className="flex flex-col mb-2">
              <label htmlFor="">信箱</label>
              <input
                className="border-b border-black p-2 outline-none"
                placeholder="Enter Email"
                type="email"
                defaultValue={'user1@test.com'}
                {...register('email', {
                  required: { value: true, message: '⊗ 請勿空白' },
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: '⊗ 信箱格式不正確',
                  },
                })}
              />
              {/* Error */}
              <p className="h-[1rem] text-red-500">
                {errors.email && errors.email.message}
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="">密碼</label>
              <input
                placeholder="Enter password"
                className="border-b border-black p-2 outline-none"
                type="password"
                defaultValue={'a1234578'}
                {...register('password', {
                  required: { value: true, message: '⊗ 請勿空白' },
                })}
              />
              {/* Error */}
              <p className="h-[1rem] text-red-500">
                {errors.password && errors.password.message}
              </p>
            </div>
            <div className="flex justify-end gap-2 mb-4">
              <Link to="/register">申請帳戶</Link>
              <Link to="/forgetPassword">忘記密碼</Link>
            </div>
            <button
              className="bg-black text-white w-full p-2 rounded-sm hover:opacity-80"
              type="submit"
            >
              Login
            </button>
            <p className="h-[16px] text-red-500">{serverSideErrMsg}</p>
          </div>
        </LoginForm>
      </main>
    </DefaultLayout>
  );
};

export default LoginPage;
