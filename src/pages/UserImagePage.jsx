import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';
import { SiOpensea } from 'react-icons/si';

import DefaultLayout from '../layouts/DefaultLayout';
import AddCartBtn from '../features/userCart/AddCartBtn';

//redux
import { useSelector } from 'react-redux';

//axios
import { getUserData, addViewer, getUserArtwork } from '../api/user';

const UserImagePage = () => {
  const auth = useSelector((state) => state.auth);
  //確認身份
  const urlUserId = useLocation().pathname.split('/')[2];
  //   const [isSelf, setIsSelf] = useState();
  const [userData, setUserData] = useState();
  const navigator = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await getUserData(urlUserId);
        const artwork = await getUserArtwork(urlUserId);
        if (res?.data?.user) {
          console.log('test', res.data.user);
          console.log('test', artwork);
          await addViewer(urlUserId);
        }
        setUserData({ ...res.data.user, artwork: artwork.data.artwork });
      } catch (error) {
        console.log(error);
        setUserData();
        navigator('/login');
      }
    })();
  }, []);

  return (
    <DefaultLayout>
      <main className="">
        <section className="relative my-20">
          {userData?.cover?.imageUrl ? (
            <img
              className="w-full object-cover -z-10 h-[400px]"
              src={userData?.cover?.imageUrl}
              alt="user-cover"
            />
          ) : (
            <div className='"animate-pulse bg-gray-300 w-full h-[400px] rounded-md'></div>
          )}

          <div className="absolute bottom-[-48px] right-0 left-0 container mx-auto">
            <div className="rounded-md shadow-md w-fit p-2 bg-white ml-3">
              {userData?.avatar?.imageUrl ? (
                <img
                  className="h-[150px] w-[150px] object-cover border rounded-md"
                  src={userData?.avatar?.imageUrl}
                  alt="avatar"
                />
              ) : (
                <div className='"animate-pulse bg-gray-300 w-[150px] h-[150px] rounded-md'></div>
              )}
            </div>
          </div>
        </section>
        <section className="container mx-auto mb-12">
          <div className="relative flex flex-wrap justify-between px-4">
            <div className="flex gap-4 items-center">
              {userData?.name ? (
                <h5 className="text-3xl font-bold">{userData?.name}</h5>
              ) : (
                <div className="animate-pulse bg-gray-300 w-[150px] h-[32px] rounded-md"></div>
              )}
              {urlUserId === auth.id ? (
                <Link
                  to={`/user/info/${urlUserId}`}
                  className="border p-2 rounded-md bg-black text-white flex gap-1 items-center hover:bg-opacity-90 transition-all"
                >
                  <IoMdAdd size={20} />
                  編輯
                </Link>
              ) : (
                <button className="border p-2 rounded-md bg-black text-white flex gap-1 items-center hover:bg-opacity-90 transition-all">
                  <IoMdAdd size={20} />
                  追隨
                </button>
              )}
            </div>
            <div>
              <ul className="absolute top-[-60px] right-[12px] md:flex gap-2">
                <li>
                  <Link to="#">
                    <SiOpensea size={30} />
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <AiFillInstagram size={30} />
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <AiFillTwitterCircle size={30} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="p-4 mb-4">
            {userData?.intro ? (
              <p>{userData?.intro}</p>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="animate-pulse bg-gray-300 w-[300px] h-[16px] rounded-md"></div>
                <div className="animate-pulse bg-gray-300 w-[300px] h-[16px] rounded-md"></div>
                <div className="animate-pulse bg-gray-300 w-[300px] h-[16px] rounded-md"></div>
              </div>
            )}
          </div>
          <div>
            <ul className="flex gap-8 px-4">
              <li>
                <p className="text-gray-500 text-sm mb-1">作品總數</p>
                {userData?.artwork ? (
                  <p className="font-bold text-xl">
                    {userData?.artwork.length}
                  </p>
                ) : (
                  <div className="animate-pulse bg-gray-300 w-[64px] h-[24px] rounded-md"></div>
                )}
              </li>
              <li>
                <p className="text-gray-500 text-sm mb-1">追蹤人數</p>
                <p className="font-bold text-xl">未開放</p>
              </li>
              <li>
                <p className="text-gray-500 text-sm mb-1">參觀人數</p>
                {userData?.viewer ? (
                  <p className="font-bold text-xl">{userData?.viewer}</p>
                ) : (
                  <div className="animate-pulse bg-gray-300 w-[64px] h-[24px] rounded-md"></div>
                )}
              </li>
            </ul>
          </div>
        </section>
        <section>
          <div className="container mx-auto mb-12 ">
            <h5 className="text-2xl font-bold pb-2 mb-4 border-b">作品列表</h5>
            <ul className="grid grid-cols-12 g gap-4">
              {userData?.artwork.map((item) => (
                <li
                  key={item.id}
                  className="col-span-12 md:col-span-6 lg:col-span-3"
                >
                  <div className="border rounded-lg shadow-md group relative overflow-hidden">
                    <img
                      className="object-cover w-full max-h-[300px] rounded-t-lg"
                      src={item?.productImgSrc}
                      alt="NFT"
                    />
                    <div className="p-2">
                      <p className="font-roboto text-lg font-bold">
                        {item?.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        尺寸：{item?.size}
                      </p>
                      <p className="text-sm text-gray-500">
                        作者：{item.creator}
                      </p>

                      <p className="mb-1">
                        {item?.isBid && '競標中 '}
                        {item?.price.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'TWD',
                          minimumFractionDigits: 0,
                        })}
                      </p>
                      <ul className="flex gap-2">
                        <li className="bg-black text-white p-1 text-xs">111</li>
                        <li className="bg-black text-white p-1 text-xs">111</li>
                        <li className="bg-black text-white p-1 text-xs">111</li>
                      </ul>
                    </div>
                    <div className="bg-black absolute bottom-0 right-0 left-0 p-1 flex justify-center translate-y-[44px] group-hover:translate-y-[0px] transition-[transform]">
                      <AddCartBtn id={item.id} data={item} color={'white'} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </DefaultLayout>
  );
};

export default UserImagePage;
