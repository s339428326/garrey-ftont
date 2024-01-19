import { useState, useEffect, useRef } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import { Link } from 'react-router-dom';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid';

const ForgetPasswordPage = () => {
  const [isSend, setIsSend] = useState(false);

  //Number render
  const [seconds, setSeconds] = useState(60);

  //timer ID
  const timerIdRef = useRef(null);

  useEffect(() => {
    if (seconds === 0) {
      setIsSend(false);
      setSeconds(60);
      return () => {
        clearInterval(timerIdRef.current);
      };
    }
  }, [seconds]);

  const handleTimer = () => {
    timerIdRef.current = setInterval(() => {
      if (seconds > 0 && !isSend) {
        setSeconds((pre) => pre - 1);
      }
    }, 1000);
  };

  const handelSend = () => {
    setIsSend(true);
    handleTimer();
    console.log('Sending password reset email...');
  };

  return (
    <DefaultLayout>
      <main className="container mx-auto h-[95vh]">
        <section className="flex flex-col items-center justify-center h-full">
          <Link className="flex gap-2 items-center mb-4 w-1/2" to="/login">
            <ArrowSmallLeftIcon className="h-8 w-8" />
            <span className="text-xl">返回</span>
          </Link>
          <div className="flex flex-col w-1/2">
            <label className="mb-2 text-xl font-bold" htmlFor="email">
              信箱
            </label>
            <input
              className="border-b border-black mb-2 outline-none p-2"
              placeholder="請輸入信箱"
              type="email"
              name="email"
              id="email"
            />
          </div>
          <button
            onClick={handelSend}
            type="submit"
            className={`bg-black text-white rounded-sm py-2 px-4 hover:opacity-80 transition-colors w-1/2 ${
              isSend && 'bg-gray-300 cursor-not-allowed hover:opacity-100'
            }`}
          >
            寄送信件{isSend && `${seconds}`}
          </button>
        </section>
      </main>
    </DefaultLayout>
  );
};

export default ForgetPasswordPage;
