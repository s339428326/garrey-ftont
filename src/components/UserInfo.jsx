import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { uploadAvatar, uploadCover, uploadUserInfo } from '../api/user';
import { updateUserData } from '../features/auth/authSlice';
import { useState } from 'react';

const UserInfo = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  //圖片是否更動
  const [isImageChange, setIsImageChange] = useState(false);

  const handleImage = (keyName) => (e) => {
    const file = e?.target?.files?.[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      dispatch(
        updateUserData({
          [keyName]: { imageUrl: reader.result, deleteHash: '' },
        })
      );
    });
    if (file) reader.readAsDataURL(file);
    setIsImageChange(true);
  };

  const onSubmit = async (value) => {
    const newData = { ...value };

    //修正輸入賦予空值時刪除傳送項目
    Object.entries(newData).map((item) => {
      const [keyName, value] = item;
      if (value.length === 0) delete newData[keyName];
    });

    try {
      //[BUG] 同時上傳時有可能導致imgur上傳失敗
      //[BUG] 確認imgur 是否reset Token 會失敗
      if (isImageChange) {
        const updateCover = await uploadCover(auth.cover.imageUrl);
        const updateAvatar = await uploadAvatar(auth.avatar.imageUrl);
        setIsImageChange(false);
        console.log(updateAvatar, updateCover);
      }

      const updateUserInfo = await uploadUserInfo(newData);
      dispatch(updateUserData(newData));

      console.log(updateUserInfo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative border border-black grid grid-cols-12 gap-4 p-4">
      {/* User profile */}

      <div className="col-span-12">
        <div className="flex">
          <label
            className="absolute z-10 w-full h-[250px] top-0 right-0  before:content-[''] before:block  before:absolute before:top-0 before:right-0 before:w-full before:h-[250px] before:bg-transparent before:z-10 before:hover:opacity-30 before:hover:bg-black before:transition-all"
            htmlFor="cover"
          >
            <p className="absolute text-transparent z-50 w-full h-[250px] flex justify-center items-center hover:text-white">
              點擊上傳背景照
            </p>
          </label>

          <img
            className="absolute top-0 right-0 left-0 w-full h-[250px] object-cover"
            src={auth.cover?.imageUrl}
            alt="cover"
          />
          <input
            onChange={handleImage('cover')}
            className="hidden"
            type="file"
            name="cover"
            id="cover"
          />

          <label
            htmlFor="avatar"
            className="w-[175px] h-[175px] rounded-full relative text-transparent hover:text-white before:content-[''] before:bg-black mt-[120px] mb-4 before:top-0 before:absolute before:right-0 before:block before:bottom-0 before:z-10 before:w-full before:rounded-full before:opacity-0 before:hover:opacity-30 before:transition-all before:duration-500 after:absolute after:content[''] after:block after:bg-white after:w-full after:h-full after:left-0 after:top-0 after:z-1 after:p-3 after:rounded-full"
          >
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-20">
              點擊上傳頭像
            </p>
            <img
              className="relative object-cover w-[175px] h-[175px] p-2 rounded-full z-10"
              src={auth.avatar?.imageUrl}
              alt={auth.name}
            />
          </label>
          <input
            onChange={handleImage('avatar')}
            className="hidden"
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} action="">
          {/* name */}
          <div className="flex flex-col mb-2">
            <label className="font-bold" htmlFor="name">
              匿名
            </label>
            <input
              placeholder="請輸入喊稱"
              className="outline-none border-b border-black"
              id="name"
              type="text"
              defaultValue={auth.name}
              {...register('name', {
                minLength: {
                  value: 2,
                  message: '匿名最小2個字元',
                },
                maxLength: {
                  value: 16,
                  message: '匿名最大16個字元',
                },
              })}
            />
            <p className="text-red-500 text-sm h-[12px]">
              {errors.name && `${errors.name.message}`}
            </p>
          </div>
          <div className="flex flex-col mb-2">
            <label className="font-bold" htmlFor="intro">
              介紹
            </label>
            <textarea
              className="resize-none border border-black outline-none p-2"
              name="intro"
              id="intro"
              cols="30"
              rows="5"
              defaultValue={auth.intro}
              {...register('intro', {
                maxLength: {
                  value: 160,
                  message: '不可超過160字',
                },
              })}
            ></textarea>
            <p className="text-red-500 text-sm h-[12px]">
              {errors.intro && `${errors.intro.message}`}
            </p>
          </div>

          <div className="flex justify-end">
            <button type="submit" className={`py-1 px-2 text-white bg-black`}>
              儲存
            </button>
          </div>
        </form>
      </div>
      <div className="col-span-12">
        <h5 className="text-2xl mb-4">社群帳號連結</h5>
        <ul className="flex flex-col gap-2">
          <li className="flex flex-col relative">
            <label htmlFor="instagram">Instagram</label>
            <input
              className="border-b border-black outline-none"
              defaultValue=""
              placeholder="請填入連結"
              type="url"
              name="instagram"
              id="instagram"
            />
            <button
              className="absolute right-0 bottom-[4px] p-1 bg-black text-white"
              type="button"
            >
              更新
            </button>
          </li>
          <li className="flex flex-col relative">
            <label htmlFor="twitter">Twitter</label>
            <input
              className="border-b border-black outline-none"
              defaultValue=""
              placeholder="請填入連結"
              type="url"
              name="twitter"
              id="twitter"
            />
            <button
              className="absolute right-0 bottom-[4px] p-1 bg-black text-white"
              type="button"
            >
              更新
            </button>
          </li>
          <li className="flex flex-col relative">
            <label htmlFor="opensea">Opensea</label>
            <input
              className="border-b border-black outline-none"
              defaultValue=""
              placeholder="請填入連結"
              type="url"
              name="opensea"
              id="opensea"
            />
            <button
              className="absolute right-0 bottom-[4px] p-1 bg-black text-white"
              type="button"
            >
              更新
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserInfo;
