//react
import { useState } from 'react';
import { useForm } from 'react-hook-form';

//3-rd plug
import PropType from 'prop-types';
import { XMarkIcon } from '@heroicons/react/24/solid';

//component
import DropDownListInput from './DropDownListInput';
import DateInput from './DateInput';
import Model from './Model';

//ajax
import { createArtwork } from '../api/artwork';

//redux
import { useDispatch } from 'react-redux';
import { createOneArtwork } from '../features/userArtwork/userArtworkSlice';

const ArtworkModel = ({ isShow, setIsShow }) => {
  const dispatch = useDispatch();

  const [uploadErrMsg, setUploadErrMsg] = useState('');
  //圖片狀態
  const [artworkImage, setArtworkImage] = useState();

  //上傳讀取判斷
  const [isLoad, setIsLoad] = useState(false);

  //tag value
  const [tagInput, setTagInput] = useState('');

  /////////sendData/////////
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  //model 開啟競標表單
  const [isBid, setIsBid] = useState(false);

  //useFrom 無法管理input狀態
  const [tags, setTags] = useState([]);
  const [tagErrMsg, setTagErrMsg] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const onSubmit = async (value) => {
    console.log('react-hook-form Data', value);
    console.log(isBid);
    const dataValue = isBid
      ? {
          ...value,
          tags,
          productImgSrc: artworkImage,
          startDate,
          endDate,
        }
      : { ...value, productImgSrc: artworkImage, tags };

    console.log('test', dataValue);

    setIsLoad(true);
    const sendData = await createArtwork(dataValue);

    if (sendData.data) {
      dispatch(createOneArtwork(sendData.data.artwork));
      setIsShow(false);
      setIsLoad(false);
      document.body.style.overflow = 'auto';
    } else {
      setIsLoad(false);
      setUploadErrMsg(sendData);
    }
  };

  const handleImage = (e) => {
    const file = e?.target?.files?.[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setArtworkImage(reader.result);
    });
    if (file) reader.readAsDataURL(file);
  };

  return (
    <Model className={''} isShow={isShow}>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        {/* Card Header */}
        <div className="flex items-center gap-4 px-4 py-2 border-b">
          <button
            type="button"
            onClick={() => {
              setIsShow(false);
              document.body.style.overflow = 'auto';
            }}
            className="p-1 hover:bg-gray-300 transition-all duration-300 rounded-md"
          >
            <XMarkIcon width={24} height={24} />
          </button>
          <p className="text-xl font-bold">新增藝術品</p>
          <div className="ml-auto">
            <span className="text-red-500">{uploadErrMsg}</span>
            <button
              className={`p-2 text-white  ${
                isLoad
                  ? ' bg-gray-800'
                  : 'bg-gray-950 hover:opacity-80 transition-all'
              }`}
              type="submit"
              disabled={isLoad}
            >
              {isLoad ? (
                <>
                  <div className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  <span>上傳中</span>
                </>
              ) : (
                <span>上傳</span>
              )}
            </button>
          </div>
        </div>
        {/* Card Body */}
        <div className="p-6 overflow-scroll h-[876px] pb-20 lg:overflow-auto lg:h-auto lg:pb-20">
          <div className="flex flex-wrap gap-4 mb-4 flex-1">
            <div className="w-full lg:w-[280px]">
              <label htmlFor="artwork">
                {artworkImage ? (
                  <div className="border-4 border-dashed  rounded-xl w-full lg:w-[280px] h-[400px] p-2 object-contain flex justify-center items-center text-xl text-gray-400">
                    <img
                      className=" object-contain"
                      accept="image/*"
                      src={artworkImage}
                      alt="artwork-image"
                    />
                  </div>
                ) : (
                  <div className="border-4 border-dashed rounded-xl w-full lg:w-[280px] h-[400px] p-2 object-contain flex justify-center items-center text-xl text-gray-400">
                    <p>目前沒有照片點擊上傳</p>
                  </div>
                )}
              </label>
              <input
                onChange={handleImage}
                className="hidden"
                type="file"
                name="artwork"
                id="artwork"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <div className="flex flex-col">
                <label htmlFor="name">作品名稱</label>
                <input
                  id="name"
                  className="border-b border-black p-1 outline-none"
                  type="text"
                  placeholder="請輸入作品名稱"
                  {...register('name', {
                    required: { value: true, message: '請勿空白' },
                  })}
                />
                {errors.name && (
                  <p className="h-[16px] text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="creator">創作者</label>
                <input
                  id="creator"
                  className="border-b border-black p-1 outline-none"
                  type="text"
                  placeholder="請輸入作品名稱"
                  {...register('creator', {
                    required: { value: true, message: '請勿空白' },
                  })}
                />
                {errors.creator && (
                  <p className="h-[16px] text-sm text-red-500">
                    {errors.creator.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="creator">創作類型</label>
                <input
                  id="creator"
                  className="border-b border-black p-1 outline-none"
                  type="text"
                  placeholder="請輸入作品名稱"
                  {...register('artType', {
                    required: { value: true, message: '請勿空白' },
                  })}
                />
                {errors.creator && (
                  <p className="h-[16px] text-sm text-red-500">
                    {errors.creator.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="size">尺寸</label>
                <input
                  id="size"
                  className="border-b border-black p-1 outline-none"
                  type="text"
                  name="size"
                  placeholder="長 x 寬"
                  {...register('size', {
                    required: { value: true, message: '請勿空白' },
                  })}
                />
                {errors.size && (
                  <p className="h-[16px] text-sm text-red-500">
                    {errors.size.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="tag">創作標籤</label>

                <div className="flex gap-4 mb-2">
                  <input
                    onChange={(e) => {
                      setTagInput(e.target.value);
                    }}
                    className="border-b border-black p-1 outline-none flex-1"
                    type="text"
                    name="tags"
                    value={tagInput}
                    placeholder="請輸入創作標籤"
                  />
                  <button
                    onClick={() => {
                      if (tagInput === '') return;
                      setTagInput('');
                      setTags((pre) =>
                        pre.length < 5 ? [...pre, tagInput] : pre
                      );
                      setTagErrMsg(
                        tags.length === 5 ? '每個作品最多只能有5個標籤' : ''
                      );
                    }}
                    className="p-1 bg-black text-white ml-auto"
                    type="button"
                  >
                    新增
                  </button>
                </div>
                <ul className="flex flex-wrap gap-1">
                  {tags.map((item, index) => (
                    <li
                      key={`item-${item}-${index}`}
                      className="px-2 py-1 border border-black rounded-full flex justify-center gap-1"
                    >
                      <button
                        onClick={() => {
                          setTags((pre) => {
                            const newTags = [...pre];
                            newTags.splice(index, 1);
                            return newTags;
                          });
                        }}
                        type="button"
                      >
                        <XMarkIcon width={12} height={12} />
                      </button>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {tagErrMsg && (
                  <span className="text-sm text-red-500">{tagErrMsg}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="intro">介紹</label>
            <textarea
              className="border border-black resize-none outline-none p-2 rounded-md"
              placeholder="請輸入作品介紹"
              name="intro"
              id="intro"
              cols="30"
              rows="4"
              {...register('intro', {
                required: {
                  value: true,
                  message: '',
                },
              })}
            ></textarea>
          </div>
          <div className="flex flex-wrap items-center">
            <div className="flex-1">
              <DropDownListInput
                className={'flex items-center gap-2'}
                labelName={'開啟競標:'}
                value={isBid}
                setValue={setIsBid}
                defaultValue={'否'}
                listData={[
                  { name: '是', value: true },
                  { name: '否', value: false },
                ]}
              />
            </div>

            <div className="flex-2 ">
              {isBid ? (
                <div className={`flex flex-col gap-2 justify-center`}>
                  <label htmlFor="bid_startPrice">底價</label>
                  <input
                    className="border-b border-black outline-none"
                    id="bid_startPrice"
                    type="number"
                    min={0}
                    defaultValue={0}
                    placeholder="請輸入底價"
                    {...register('bid_startPrice', {
                      required: {
                        value: isBid,
                        message: '啟用競標後需要訂底價',
                      },
                      valueAsNumber: {
                        value: true,
                        message: '請輸入數字',
                      },
                      min: {
                        value: 0,
                        message: '價格不可為負數',
                      },
                    })}
                  />
                  {errors.bid_startPrice && (
                    <p className="text-sm text-red-500">
                      {errors.bid_startPrice.message}
                    </p>
                  )}
                  <DateInput
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                  />
                </div>
              ) : (
                <div className={`flex gap-2 justify-center`}>
                  <label htmlFor="price">定價:</label>
                  <input
                    className="border-b border-black outline-none"
                    id="price"
                    type="number"
                    min={0}
                    defaultValue={0}
                    placeholder="請輸入定價"
                    {...register('price', {
                      required: {
                        value: true,
                        message: '商品價格不可空白',
                      },
                      valueAsNumber: {
                        value: true,
                        message: '請輸入數字',
                      },
                      min: {
                        value: 0,
                        message: '價格不可為負數',
                      },
                    })}
                  />
                  {errors.price && (
                    <p className="text-sm text-red-500">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </Model>
  );
};

ArtworkModel.propTypes = {
  isShow: PropType.bool,
  setIsShow: PropType.func,
};

export default ArtworkModel;
