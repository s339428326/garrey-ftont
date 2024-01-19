//react
import { useEffect, useState } from 'react';

import { hotViewTop5 } from '../api/artwork';

//slider
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Navigation } from 'swiper';
import { Link } from 'react-router-dom';

import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';

import ArtworkLikeBtn from '../features/userTrack/ArtworkLikeBtn';
import AddCartBtn from '../features/userCart/AddCartBtn';

const Slider = () => {
  const [data, setData] = useState([]);

  //call
  useEffect(() => {
    (async () => {
      try {
        const res = await hotViewTop5();
        setData(res.data.artwork);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Swiper
      className="mySwiper relative py-2"
      navigation={{
        nextEl: '.button-next',
        prevEl: '.button-prev',
        disabledClass: 'hidden',
      }}
      breakpoints={{
        576: {
          width: 576,
          slidesPerView: 1,
          spaceBetween: 24,
        },
        768: {
          width: 768,
          slidesPerView: 2,
          spaceBetween: 24,
        },
        992: {
          width: 992,
          slidesPerView: 4,
          spaceBetween: 24,
        },
      }}
      spaceBetween={30}
      modules={[Navigation]}
    >
      {data.map((item) => (
        <SwiperSlide
          key={item.id}
          className="flex flex-col border rounded-xl shadow-md p-1 group overflow-hidden"
        >
          <Link
            className="overflow-hidden rounded-md"
            to={`/artwork/${item.id}`}
          >
            <img
              className="w-full max-h-[220px] object-cover rounded-lg hover:scale-110 transition-all"
              src={item?.productImgSrc}
              alt={item?.name}
            />
          </Link>

          <div className="p-2">
            <div className="flex justify-between items-center">
              <Link to={`/artwork/${item.id}`}>
                <p className="font-bold font-roboto text-xl mt-1">
                  {item.name}
                </p>
              </Link>
              {/* 喜歡藝術品 */}
              <div className="flex gap-1">
                <ArtworkLikeBtn id={item?.id} />
              </div>
            </div>
            <p className="font-roboto mb-1">
              {item.price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'TWD',
                minimumFractionDigits: 0,
              })}
            </p>
            <ul className="mb-2">
              <li className="text-xs text-gray-500 flex gap-2 items-center">
                {/* Link */}
                <p>上傳者:</p>
                <Link
                  className="flex items-center gap-1"
                  to={`/user/${item.user.id}`}
                >
                  <img
                    className="w-[25px] h-[25px] object-cover rounded-full"
                    src={item.user.avatar.imageUrl}
                    alt={item.user.name}
                  />
                  <p>{item.user.name}</p>
                </Link>
              </li>
              <li className="text-xs text-gray-500">
                上傳日期:
                {new Date(item.createAt).toLocaleString().toString().split(' ')}
              </li>
            </ul>
            <ul
              className="flex fl  
            ex-wrap gap-2"
            >
              {item.tags.map((tag) => (
                <li
                  key={`${item.id}-${tag}`}
                  className="text-sm bg-black text-white p-1"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <div className="absolute py-[6px] rounded-b-md bg-black bottom-0 right-0 left-0 text-center translate-y-[60px] group-hover:translate-y-[0px] flex justify-center">
              <AddCartBtn color={'white'} id={item.id} data={item} />
            </div>
          </div>
        </SwiperSlide>
      ))}

      {/* Button */}
      <button
        type="button"
        className="button-prev absolute w-[50px] h-[50px] z-10 rounded-full top-[50%] -translate-y-1/2 bg-black text-white bg-opacity-30 hover:bg-opacity-60 flex items-center justify-center"
      >
        <BsArrowLeftCircle size={50} />
      </button>
      <button
        type="button"
        className="button-next absolute w-[50px] h-[50px] z-10 top-[50%] right-0 -translate-y-1/2 bg-black text-white bg-opacity-30 hover:bg-opacity-60 rounded-full flex items-center justify-center"
      >
        <BsArrowRightCircle size={50} />
      </button>
    </Swiper>
  );
};

export default Slider;
