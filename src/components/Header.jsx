import { useRef, useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { isLogin } from '../api/auth';

import { useSelector, useDispatch } from 'react-redux';
import {
  updateUserData,
  updateAuth,
  resetUserData,
} from '../features/auth/authSlice';

import {
  XMarkIcon,
  Bars3Icon,
  ShoppingCartIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

import { HiMenu } from 'react-icons/hi';

// CartButton
import CartButton from '../features/userCart/CartButton';

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const headerRef = useRef();
  // const navigator = useNavigate();

  const [isMove, setIsMove] = useState(false);

  useEffect(() => {
    if (window.scrollY > 60) {
      setIsMove(true);
    } else {
      setIsMove(false);
    }

    const scrollHandle = () => {
      if (window.scrollY > 60) {
        setIsMove(true);
      } else {
        setIsMove(false);
      }
    };
    document.addEventListener('scroll', scrollHandle);
    return () => document.removeEventListener('scroll', scrollHandle);
  }, []);

  //[待整理] 驗證token凌亂
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      //如果由token
      if (document.cookie.startsWith('token=')) {
        //請求資料
        const res = await isLogin();
        //確認token 是否正確
        if (res.id) {
          dispatch(updateAuth(true));
          //賦予資料
          if (auth.NoneData) {
            dispatch(updateUserData(res));
          }
        } else {
          //reset userData
          dispatch(resetUserData());
        }
      }

      //login check token still keep safe
      if (auth.email) {
        const res = await isLogin();
        if (res.id) {
          dispatch(updateAuth(true));
        } else {
          dispatch(resetUserData());
        }
      } else {
        dispatch(updateAuth(false));
      }
    })();
  }, []);

  const navList = [
    {
      name: '藝術品',
      router: `/artwork`,
    },
  ];
  return (
    <header
      ref={headerRef}
      className={`fixed top-0 right-0 left-0 z-50 ${
        isMove ? 'bg-black bg-opacity-90' : 'bg-black lg:bg-transparent'
      }`}
    >
      <button className="absolute top-[22px] left-[24px] text-white p-1 lg:hidden">
        <HiMenu size={30} />
      </button>
      <nav className="container mx-auto flex flex-wrap justify-center lg:justify-between py-4 pr-6 lg:px-0">
        <Link
          className={`text-2xl lg:text-2xl font-bold font-hind border-white bg-black text-white mx-auto py-2 pl-20 lg:px-2 lg:mx-0 ${
            isMove && 'bg-opacity-10'
          }  `}
          to="/"
        >
          <span className="text-red-500">Gallery</span> Platform
        </Link>

        <ul className={`flex gap-4 items-center`}>
          {navList.map((navItem) => (
            <li key={navItem.name}>
              <Link
                className={`border border-black p-2 font-bold font-roboto hidden lg:block ${
                  isMove && 'border-white text-white'
                }`}
                to={navItem.router}
              >
                {navItem.name}
              </Link>
            </li>
          ))}
          {auth.NoneData ? (
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]  lg:block"></div>
          ) : auth?.email && document.cookie.startsWith('token=') ? (
            <>
              <li>
                <Link
                  to={`/user/info/${auth.id}`}
                  className={`hidden lg:flex border border-black p-2 font-bold font-roboto items-center gap-4 ${
                    isMove &&
                    'border-black text-black lg:border-white lg:text-white'
                  }`}
                >
                  <img
                    className="object-cover h-[24px] w-[24px]"
                    src={auth?.avatar.imageUrl}
                    alt={auth?.name}
                  />
                  <p>{auth?.name}</p>
                </Link>
              </li>
              <li
                className={`relative p-1.5 hidden lg:flex  ${
                  isMove && 'border-white text-white'
                }`}
              >
                <HeartIcon width={23} height={23} />
                <p className="absolute border rounded-full top-[-4px] right-[-4px] w-5 h-5 bg-red-500 text-black lg:text-white flex justify-center items-center p-1 font-roboto">
                  {0}
                </p>
              </li>
              <li>
                <CartButton isMove={isMove} />
              </li>
              {/* <li>
                <button
                  className={`border border-black p-1 font-bold font-roboto ${
                    isMove && 'border-white text-white'
                  }`}
                  onClick={() => {
                    dispatch(resetUserData());
                    navigator('/login');
                  }}
                  type="button"
                >
                  登出
                </button>
              </li> */}
            </>
          ) : (
            <li>
              {/* */}
              <Link
                className={` border border-black py-[10px] px-2 font-bold font-roboto ${
                  isMove && 'border-white text-white'
                }`}
                to="/login"
              >
                登入
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
