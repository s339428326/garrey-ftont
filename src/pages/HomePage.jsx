import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import DefaultLayout from '../layouts/DefaultLayout';
import MarqueeTop from '../animation/MarqueeTop';
import MarqueeDown from '../animation/MarqueeDown';
import Slider from '../components/Slider';

import { BsArrowRightCircle, BsArrowLeftCircle } from 'react-icons/bs';

import { BiLogoPlayStore } from 'react-icons/bi';
import { AiFillApple } from 'react-icons/ai';

//user viewer Top10
import { getUserHotViewerTop10 } from '../api/user';

const HomePage = () => {
  //section 2
  const [isMove, setIsMove] = useState(false);
  const [userTopTen, setUserTopTen] = useState([]);

  //
  useEffect(() => {
    (async () => {
      try {
        const res = await getUserHotViewerTop10();
        setUserTopTen(res?.data?.users);
      } catch (error) {
        console.log('[Error getUserHotViewerTop10]', error);
      }
    })();
  }, []);

  return (
    <>
      <DefaultLayout>
        {/* bar */}
        <main className="">
          <section className="h-[800px] mt-[80px] flex items-center justify-around gap-6 mb-6 overflow-hidden relative container mx-auto">
            <div className="absolute flex flex-col gap-2 z-20 text-white  p-8 rounded-xl backdrop-blur-md bg-white/70">
              <h2 className="lg:text-3xl text-2xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                找不到適合的藝術品嗎？
              </h2>
              <h2 className="lg:text-xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 mb-4">
                這裡將為您提供各式獨特藝術品
              </h2>
              <Link
                to="/artwork"
                className="text-center p-2 rounded-lg w-1/2 mx-auto bg-black text-white hover:bg-opacity-80"
              >
                立即嘗試
              </Link>
            </div>
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
                <MarqueeTop
                  data={[
                    'https://images.unsplash.com/photo-1541680670548-88e8cd23c0f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXJ0d29ya3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
                    'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGFydHdvcmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
                    'https://images.unsplash.com/photo-1584727638057-78254f636b5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGFydHdvcmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
                  ]}
                />
                {/* Down */}
                <MarqueeDown
                  data={[
                    'https://images.unsplash.com/photo-1599753894977-bc6c162417e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFydHdvcmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
                    'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFydHdvcmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
                    'https://images.unsplash.com/photo-1590622974113-66a9160acf20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFydHdvcmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
                  ]}
                />
                <MarqueeTop
                  data={[
                    'https://images.unsplash.com/photo-1582561879360-b5f835317f05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFydHdvcmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
                    'https://images.unsplash.com/photo-1579009120005-df2fd9baf7e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGFydHdvcmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
                    'https://images.unsplash.com/photo-1583243552320-73d7f2f21e7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGFydHdvcmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
                  ]}
                />
                {/* Down */}
                <MarqueeDown
                  data={[
                    'https://images.unsplash.com/photo-1580136607993-fd598cf5c4f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGFydHdvcmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
                    'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGFydHdvcmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
                    'https://images.unsplash.com/photo-1578321272125-4e4c4c3643c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGFydHdvcmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
                  ]}
                />
              </div>
            </div>
          </section>
          <section className="relative group text-white mb-12">
            <img
              className="absolute object-cover top-0 right-0 left-0 bottom-0 brightness-50  saturate-50 -z-10 w-full h-full"
              src="https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhbm5lcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
              alt=""
            />
            {isMove && (
              <button
                className={`absolute top-[32px] left-10 z-[1] flex gap-2 items-center`}
                onClick={() => setIsMove(false)}
              >
                <BsArrowRightCircle size={40} />
                <span className="font-bold">排行選單</span>
              </button>
            )}
            <div
              className={`absolute top-0 left-0 bottom-0 px-12 bg-black   justify-center items-center flex-col gap-4 transition-all duration-500 hidden md:flex ${
                isMove && 'opacity-0'
              }`}
            >
              <p className="text-3xl font-bold">排行榜</p>
              <button
                onClick={() => {
                  setIsMove(true);
                  //change rank data
                }}
                type="button"
                className="relative text-2xl font-bold before:content-[''] before:absolute before:bottom-0 before:bg-white before:left-0 before:h-[1px] before:w-[0px] before:hover:w-[44px] before:transition-all"
              >
                用戶
              </button>
              <button
                onClick={() => {
                  setIsMove(true);
                  //change rank data
                }}
                type="button"
                className="relative text-2xl font-bold before:content-[''] before:absolute before:bottom-0 before:bg-white before:left-0 before:h-[1px] before:w-[0px] before:hover:w-[70px] before:transition-all"
              >
                藝術品
              </button>
              <button type="button" onClick={() => setIsMove(true)}>
                <BsArrowLeftCircle size={30} />
              </button>
            </div>
            <div className="container mx-auto grid grid-cols-2 gap-6 py-24 overflow-hidden">
              <ul
                className={`flex flex-col gap-4 col-span-2 lg:col-span-1  md:transition-[transform] ${
                  isMove ? 'md:translate-x-[0%]' : 'md:translate-x-[30%]'
                }`}
              >
                {[...userTopTen].slice(0, 5).map((item, index) => (
                  <li
                    key={`${item?.id}-userViewerRank`}
                    className="rounded-xl hover:bg-gray-500 hover:bg-opacity-70 transition-all flex "
                  >
                    <Link to={`/user/${item?.id}`} className="w-full">
                      <div className="w-full flex items-center justify-between font-bold px-4 py-2">
                        <p className="text-xl flex-1">#{index + 1}</p>
                        <div className="flex-1">
                          <img
                            className="w-[75px] h-[75px] object-cover rounded-full"
                            src={item?.avatar?.imageUrl}
                            alt=""
                          />
                        </div>

                        <p className="flex-1">{item?.name}</p>
                        <p className="flex-1">
                          瀏覽人數:
                          {item?.viewer > 1000
                            ? `${(item.viewer / 1000).toFixed(1)}K`
                            : item?.viewer}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <ul
                className={`flex flex-col gap-4 col-span-2 lg:col-span-1 md:transition-[transform] ${
                  isMove ? 'md:translate-x-[0%]' : 'md:translate-x-[30%]'
                }`}
              >
                {[...userTopTen].slice(5, 11).map((item, index) => (
                  <li
                    key={`${item?.id}-userViewerRank`}
                    className="rounded-xl hover:bg-gray-500 hover:bg-opacity-70 transition-all flex "
                  >
                    <Link to={`/user/${item?.id}`} className="w-full">
                      <div className="w-full flex items-center justify-between font-bold px-4 py-2">
                        <p className="text-xl flex-1">#{index + 6}</p>
                        <div className="flex-1">
                          <img
                            className="w-[75px] h-[75px] object-cover rounded-full"
                            src={item?.avatar?.imageUrl}
                            alt={item?.name}
                          />
                        </div>
                        <p className="flex-1">{item?.name}</p>
                        <p className="flex-1">
                          瀏覽人數:
                          {item.viewer > 1000
                            ? `${(item?.viewer / 1000).toFixed(1)}K`
                            : item?.viewer}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className="container mx-auto mb-16">
            <h5 className="text-2xl font-bold">HOT ITEMS</h5>
            <Link to="/artwork" className="flex justify-end">
              <p className="text-sm text-end mb-2 font-bold  relative pb-1 before:content-[''] before:absolute before:h-[1px] before:bottom-0 before:left-0 before:right-0 before:w-0  before:bg-black  before:hover:w-full before:transition-all">
                查看更多作品
              </p>
            </Link>
            <Slider />
          </section>
          {/* 介紹視差 */}
          <section className="relative">
            <div className="h-screen">
              <div className="container mx-auto ">
                <section>
                  <div className="flex items-center justify-end pt-[25vh]">
                    <img
                      className="object-cover w-[500px] border-1 shadow-md"
                      src="https://i.imgur.com/thff7Br.png"
                      alt=""
                    />
                  </div>
                </section>
              </div>
            </div>
            <div className="h-screen">
              <div className="container mx-auto">
                <section>
                  <div className="flex items-center justify-end pt-[25vh]">
                    <img
                      className="object-cover w-[500px] border-1 shadow-md"
                      src="https://i.imgur.com/LW9nIAK.png"
                      alt=""
                    />
                  </div>
                </section>
              </div>
            </div>
            <div className="h-screen">
              <div className="container mx-auto">
                <section>
                  <div className="flex gap-4 items-center pt-[80vh] ">
                    <button className="bg-black rounded-md text-white py-1 px-2">
                      <div className="flex gap-2 items-center">
                        <AiFillApple size={40} color="#fff" />
                        <div className="flex  flex-col">
                          <small>Download on the</small>
                          <p className="font-bold">App Store</p>
                        </div>
                      </div>
                    </button>
                    <button className="bg-black rounded-md text-white py-1 px-2">
                      <div className="flex gap-2 items-center">
                        <BiLogoPlayStore size={40} color="#fff" />
                        <div className="flex flex-col">
                          <small>Download on the</small>
                          <p className="font-bold">PlayStore</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </section>
              </div>
            </div>

            {/* container */}
            <div className="container mx-auto absolute top-0 right-0 left-0 flex gap-4 px-4 bottom-0">
              <div className="flex-1 mt-[25vh] relative">
                {/* 1 */}
                <div className="sticky top-[25vh]">
                  <p className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500  text-6xl font-bold">
                    設計創作者線上社群
                  </p>
                </div>
              </div>
              {/* 2 */}
              <div className="flex-1 mt-[125vh]">
                <div className="sticky top-[25vh]">
                  <p className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500  text-2xl font-bold">
                    連結藝術家平台
                  </p>
                </div>
              </div>
              {/* 3 */}
              <div className="flex-1 mt-[225vh]">
                <div className="sticky top-[25vh] rounded-xl">
                  <p className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-6xl font-bold">
                    加入我們, 立即開始創作旅程
                  </p>
                  <div className="flex gap-4 flex-col mt-[410px]">
                    <button className="border bg-black text-white py-2 rounded-md text-2xl">
                      立即加入
                    </button>
                    <button className="border bg-black text-white py-2  rounded-md text-2xl">
                      搜索藝術品
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </DefaultLayout>
    </>
  );
};

export default HomePage;
