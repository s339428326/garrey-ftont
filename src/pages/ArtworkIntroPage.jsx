//react
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

//api
import { getOneArtwork, getArtworkBidData } from '../api/artwork';

//icon
import { AiOutlineQuestionCircle, AiOutlineDown } from 'react-icons/ai';

import { GiReturnArrow } from 'react-icons/gi';
import { PiCertificateLight } from 'react-icons/pi';
import { FaTruck } from 'react-icons/fa';

//components
import DefaultLayout from '../layouts/DefaultLayout';
import ArtworkLikeBtn from '../features/userTrack/ArtworkLikeBtn';
import AddCartBtn from '../features/userCart/AddCartBtn';
import Timer from '../components/Timer';
import ArtworkBidModal from '../components/ArtworkBidModal';

const ArtworkIntroPage = () => {
  const urlId = useLocation().pathname.split('/')[2];
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  //取得競標資料
  useEffect(() => {
    (async () => {
      try {
        const res = await getOneArtwork(urlId);
        let bidData;
        if (res?.data?.data?.isBid === true) {
          bidData = await getArtworkBidData(urlId);
          setData({ ...res.data.data, bidData });
        } else {
          console.log(res.data.data);
          setData(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isLoading]);

  return (
    <DefaultLayout>
      <main>
        <div className="mt-[120px]">{/* <p>{JSON.stringify(data)}</p> */}</div>
        <section className="container mx-auto mb-6">
          <div className="grid grid-cols-12 gap-4">
            {/* 左邊 */}
            <div className="col-span-8">
              <img
                className="max-h-[1080px] w-full object-fit mb-8 rounded-xl"
                src={data?.productImgSrc}
                alt={data?.name}
              />
              <div className="mb-4">
                <p className="font-bold text-3xl border-b border-gray-400 pb-4 mb-4">
                  作品介紹
                </p>
                <p>{data?.intro}</p>
              </div>
              <div className="flex  gap-8 border shadow-sm bg-white rounded-lg p-4">
                <Link to={`/user/${data?.user?.id}`}>
                  <img
                    className="w-[125px] h-[125px] object-cover rounded-full shadow-sm border"
                    src={data?.user?.avatar?.imageUrl}
                    alt={data?.user?.name}
                  />
                </Link>

                <div>
                  <div className="flex gap-2 items-center mb-2">
                    <Link to={`/user/${data?.user?.id}`}>
                      <p>{data?.user?.name}</p>
                    </Link>

                    <button
                      className="bg-black text-white p-2 rounded-md"
                      type="button"
                    >
                      + 追隨
                    </button>
                  </div>
                  <div>
                    <p>{data?.user?.intro}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className="border-b border-gray-400 pb-4 mb-4">
                <div className="flex justify-between mb-4">
                  <h1 className="text-3xl font-bold font-roboto">
                    {data?.name}
                  </h1>
                  <div className="flex item-center gap-1">
                    <ArtworkLikeBtn id={data?.id} />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p>創作者：{data?.creator}</p>
                  <p>尺寸：{data?.size}</p>
                  <div className="flex">
                    <p>上傳時間：</p>
                    {new Date(data?.createAt)
                      .toLocaleString()
                      .toString()
                      .split(' ')}
                  </div>
                  <ul className="flex gap-1 ">
                    {data?.tags.map((tag) => (
                      <li
                        key={`${data.id}-${tag}`}
                        className="bg-black text-white p-1"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* 價格 */}
              <div className="flex mb-2">
                {/* 計時器 */}
                {data?.isBid && <Timer deadline={data?.endDate} />}
              </div>

              {data?.isBid ? (
                <p className="font-bold text-2xl mb-2">
                  {data?.bid_startPrice?.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'TWD',
                    minimumFractionDigits: 0,
                  })}
                </p>
              ) : (
                <p className="font-bold text-2xl mb-2">
                  {data?.price?.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'TWD',
                    minimumFractionDigits: 0,
                  })}
                </p>
              )}

              <p className="text-sm text-gray-500 mb-4">含運費和稅費</p>
              {data?.isBid ? (
                <ArtworkBidModal
                  urlId={urlId}
                  setData={setData}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              ) : Date.parse(data?.endDate) < Date.now() ? (
                <button
                  className="border bg-black w-full p-2 text-center text-white rounded-md hover:bg-opacity-90 mb-2 disabled:bg-opacity-40"
                  disabled={true}
                >
                  競標結束
                </button>
              ) : (
                <button className="border bg-black w-full p-2 text-center text-white rounded-md hover:bg-opacity-90 mb-2">
                  購買
                </button>
              )}
              <ul className="border border-gray-300 p-4 flex flex-col gap-2 mb-4">
                <li className="text-sm flex items-center gap-4">
                  <GiReturnArrow size={30} />
                  <p>收到藝術品 14 天免費退貨(競標品除外)</p>
                </li>
                <li className="text-sm flex items-center gap-4">
                  <PiCertificateLight size={30} />
                  <p>實體藝術品附保證書</p>
                </li>
                <li className="text-sm flex items-center gap-4">
                  <FaTruck size={30} />
                  <p>實體藝術品物流 7-14 天到貨</p>
                </li>
              </ul>
              {Date.parse(data?.endDate) > Date.now() ? (
                <ul className="grid grid-cols-4 shadow-md">
                  <li className="col-span-4 flex  border-2 p-2 rounded-t-lg">
                    <p className="font-bold flex-1">排名</p>
                    <p className="font-bold flex-1">日期</p>
                    <p className="font-bold flex-1">Email</p>
                    <p className="font-bold flex-1">出價</p>
                  </li>

                  {data?.bidData.map((item, index) => (
                    <li
                      key={`${item.user.id}-bidData`}
                      className="col-span-4 flex justify-between p-2 text-xs border-x-2 border-b-2"
                    >
                      <div className="flex-1 truncate">
                        <p>{index + 1}</p>
                      </div>
                      <div className="flex-1 truncate">
                        <p>
                          {
                            new Date(item?.createAt)
                              .toLocaleString()
                              .split(' ')[0]
                          }
                        </p>
                      </div>
                      <div className="flex-1 truncate">
                        <p>{item.user.email}</p>
                      </div>
                      <div className="flex-1 truncate">
                        <p>
                          {item?.price?.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'TWD',
                            minimumFractionDigits: 0,
                          })}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mb-2">
                  <button className="relative flex justify-center items-center w-full">
                    <div className="absolute left-0">
                      <AiOutlineDown />
                    </div>
                    <AiOutlineQuestionCircle size={30} />
                    有疑問?
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="container mx-auto"></section>
      </main>
    </DefaultLayout>
  );
};

export default ArtworkIntroPage;
