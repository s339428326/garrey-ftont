//React
import { useState, useEffect, useRef } from 'react';

//api
import { updateArtwork, deleteArtwork } from '../api/artwork';
import { getUserArtwork } from '../api/user';

//3-rd plug
import PropType from 'prop-types';
import { XCircleIcon } from '@heroicons/react/24/solid';

//components
import EditArtworkModel from './EditArtworkModel';
import Alert from './Alert';

//redux
import { useSelector, useDispatch } from 'react-redux';
import {
  getArtworkData,
  updateOneArtwork,
  deleteOneArtwork,
} from '../features/userArtwork/userArtworkSlice';

import { useLocation } from 'react-router-dom';

export const ArtWorkCard = ({ data }) => {
  //dispatch
  const dispatch = useDispatch();

  //alert message
  const delInput = useRef('');
  const [delMsg, setDelMsg] = useState('');

  //model show
  const [isShow, setIsShow] = useState(false);
  const [isDelModel, setIsDelModel] = useState(false);

  //isLoad 上下架
  const [isLoad, setIsLoad] = useState(false);

  //model keyboard esc close model
  useEffect(() => {
    const handleClose = (e) => {
      if (e.key === 'Escape') {
        document.body.style.overflow = 'auto';
        setIsShow(false);
        setIsDelModel(false);
      }
    };
    document.addEventListener('keydown', handleClose);
    return () => {
      document.removeEventListener('keydown', handleClose);
    };
  }, []);

  //取消上架
  const handleArtworkShow = async () => {
    setIsLoad(true);
    dispatch(updateOneArtwork({ id: data.id, data: { isShow: !data.isShow } }));
    await updateArtwork(data.id, { isShow: !data.isShow });
    setIsLoad(false);
  };

  return (
    <div>
      <EditArtworkModel
        productData={data}
        isShow={isShow}
        setIsShow={setIsShow}
      />
      <Alert className={'w-1/3 border'} isShow={isDelModel}>
        <div className="py-2 px-4 border-b">
          <button
            onClick={() => {
              setIsDelModel(false);
              document.body.style.overflow = 'auto';
            }}
            type="button"
          >
            X
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <XCircleIcon className="text-red-500" width={48} height={48} />
            <p>注意刪除後將無法恢復確定要刪除嗎？</p>
          </div>
          <div className="flex flex-col gap-2" action="">
            <label htmlFor="del">請輸入商品名稱:{data.name}</label>
            <input
              ref={delInput}
              className="border rounded-md p-1"
              id="del"
              type="text"
              placeholder="請輸入商品名稱"
            />
            <small className="h-[12px] text-red-500">{delMsg}</small>
            <button
              onClick={(e) => {
                e.preventDefault();

                if (data.name === delInput.current.value) {
                  //Del View
                  dispatch(deleteOneArtwork({ id: data.id }));
                  deleteArtwork(data.id);
                  document.body.style.overflow = 'auto';
                  setIsDelModel(false);
                } else {
                  setDelMsg('請重新輸入');
                }
              }}
              className="bg-red-500 rounded-md p-2 text-white hover:bg-red-400 transition-all"
              type="submit"
            >
              刪除
            </button>
          </div>
        </div>
      </Alert>
      <div className="relative overflow-hidden shadow-md rounded-b-lg">
        <div
          className={`${
            (!data.isShow || data.isSold) && 'grayscale'
          } header overflow-hidden rounded-t-lg`}
        >
          <img
            className="object-cover w-full max-h-[180px] transition-all hover:scale-110 duration-300"
            src={data.productImgSrc}
            alt="測試明稱"
          />
        </div>
        <div className="bg-white px-4 py-2">
          <div className="flex justify-between">
            <div className="mb-2">
              <p className="font-roboto text-lg">{data.name}</p>
              {data.isBid ? (
                <p className="font-roboto mb-4">
                  {data.bid_startPrice.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'TWD',
                    minimumFractionDigits: 0,
                  })}
                </p>
              ) : (
                <p className="font-roboto mb-4">
                  {data.price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'TWD',
                    minimumFractionDigits: 0,
                  })}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              {data.isSold && (
                <small className="font-roboto text-lg">已售出</small>
              )}
              {Date.now() < Date.parse(data?.endDate) && (
                <small className="border border-red-500 text-red-500 text-center font-roboto text-lg">
                  競標
                </small>
              )}
            </div>
          </div>

          {/* User Card 編輯狀態 */}
          <p className="text-sm text-gray-500">
            {`上架狀態: ${data.isShow ? '上架中' : '已下架'}`}
          </p>
        </div>
        <div className="absolute bottom-[-44px] w-full  group-hover:bottom-0 transition-all flex border rounded-b-lg text-white font-bold">
          <button
            onClick={() => {
              setIsShow(true);
              document.body.style.overflow = 'hidden';
            }}
            className={`${
              data.isSold ? 'bg-gray-500' : 'bg-gray-950 hover:bg-gray-800'
            } flex-1 border-r p-2 rounded-bl-lg`}
            disabled={data.isSold}
          >
            編輯
          </button>
          <button
            onClick={handleArtworkShow}
            className={`${
              data.isSold ? 'bg-gray-500' : 'bg-gray-950 hover:bg-gray-800'
            } flex-1 border-r p-2`}
            disabled={data.isSold || isLoad}
          >
            {isLoad ? (
              <div className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            ) : (
              <span>{`${data.isShow ? '下架' : '上架'}`}</span>
            )}
          </button>
          <button
            onClick={() => {
              console.log('click');
              setIsDelModel(true);
              document.body.style.overflow = 'hidden';
            }}
            className="bg-red-500 hover:bg-red-400 flex-2 p-2 rounded-br-lg"
          >
            刪除
          </button>
        </div>
      </div>
    </div>
  );
};

ArtWorkCard.propTypes = {
  data: PropType.object,
};

const ArtWorkCardList = ({ keyword }) => {
  const artworkData = useSelector((state) => state.userArtwork);
  const dispatch = useDispatch();
  const userIdUrl = useLocation().pathname.split('/')[3];

  //getData
  useEffect(() => {
    (async () => {
      const res = await getUserArtwork(userIdUrl);
      dispatch(getArtworkData(res?.data?.artwork));
    })();
  }, []);

  //search keyword
  const filterData = artworkData.filter((item) =>
    item.name.toLowerCase().match(keyword.toLowerCase())
  );

  return (
    <section>
      {keyword && <p>搜尋結果：{filterData.length}</p>}
      <ul className="grid grid-cols-12 gap-4">
        {filterData.map((item) => (
          <li
            key={item.id}
            className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3  group"
          >
            <ArtWorkCard data={item} />
          </li>
        ))}
      </ul>
    </section>
  );
};

ArtWorkCardList.propTypes = {
  keyword: PropType.string,
  setKeyword: PropType.func,
};

export default ArtWorkCardList;
