import { Outlet, Link, useLocation } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import { useSelector } from 'react-redux';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { resetUserData } from '../features/auth/authSlice';

const UserPage = () => {
  const dispatch = useDispatch();
  //getLocation()
  const { pathname } = useLocation();
  const navItem = pathname.split('/')[2];
  const auth = useSelector((state) => state.auth);

  const navigator = useNavigate();
  useLayoutEffect(() => {
    if (!document.cookie.startsWith('token=')) {
      navigator('/');
    }
  }, []);

  return (
    <DefaultLayout>
      <main className="container mx-auto mt-[120px]">
        <section className="grid grid-cols-12 gap-6 mb-6">
          {/* 側邊欄位 */}
          <div className="col-span-3">
            <ul className="border border-black  p-8 flex flex-col gap-2 font-bold ">
              {/* 會員 */}
              <li className="mb-4">
                <p className="border-b border-black mb-2 py-2 text-xl">會員</p>
                <ul className="flex flex-col gap-2">
                  <li className="">
                    <Link
                      className={`relative pb-1 before:content-[''] before:absolute before:h-[1px] before:bottom-0 before:left-0 before:right-0  before:bg-black  before:hover:w-full before:transition-all ${
                        navItem === 'info' ? 'w-full' : 'before:w-0'
                      }`}
                      to={`/user/info/${auth.id}`}
                    >
                      個人資料
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      className={`relative pb-1 before:content-[''] before:absolute before:h-[1px] before:bottom-0 before:left-0 before:right-0   before:bg-black  before:hover:w-full before:transition-all ${
                        navItem === 'order' ? 'w-full' : 'before:w-0'
                      }`}
                      to={`/user/order/${auth.id}`}
                    >
                      訂單資訊
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      className={`relative pb-1 before:content-[''] before:absolute before:h-[1px] before:bottom-0 before:left-0 before:right-0   before:bg-black  before:hover:w-full before:transition-all ${
                        navItem === 'bidding' ? 'w-full' : 'before:w-0'
                      }`}
                      to={`/user/bidding/${auth.id}`}
                    >
                      競標資訊
                    </Link>
                  </li>
                  <li>服務訂閱</li>
                </ul>
              </li>
              {/* 藝廊 */}
              <li>
                <p className="border-b border-black mb-2 py-2 text-xl">藝廊</p>
                <ul className="flex flex-col gap-2">
                  <li>
                    <Link
                      className={`relative pb-1 before:content-[''] before:absolute before:h-[1px] before:bottom-0 before:left-0 before:right-0   before:bg-black  before:hover:w-full before:transition-all ${
                        navItem === 'artwork' ? 'w-full' : 'before:w-0'
                      }`}
                      to={`/user/artwork/${auth.id}`}
                    >
                      藝廊展品
                    </Link>
                  </li>
                  <li>藝廊收益</li>
                </ul>
              </li>
              <li>
                <button
                  className={`font-bold font-robot`}
                  onClick={() => {
                    dispatch(resetUserData());
                    navigator('/login');
                  }}
                  type="button"
                >
                  登出
                </button>
              </li>
            </ul>
          </div>
          {/* 主要內容 */}
          <div className="col-span-9">
            <Outlet />
          </div>
        </section>
      </main>
    </DefaultLayout>
  );
};

export default UserPage;
