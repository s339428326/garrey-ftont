//react
import { useState, useEffect, useRef } from 'react';

//api
import { newBidData } from '../api/artwork';

//icon
import { XMarkIcon } from '@heroicons/react/24/solid';

//components
import Model from '../components/Model';

import PropType from 'prop-types';

const ArtworkBidModal = ({ urlId, isLoading, setIsLoading }) => {

  const [isShow, setIsShow] = useState();
  //   const [isLoading, setIsLoading] = useState(false);

  const handleCloseModel = () => {
    setIsShow(false);
  };

  //model keyboard esc close model
  useEffect(() => {
    const handleClose = (e) => {
      if (e.key === 'Escape') {
        document.body.style.overflow = 'auto';
        setIsShow(false);
      }
    };
    document.addEventListener('keydown', handleClose);
    return () => {
      document.removeEventListener('keydown', handleClose);
    };
  }, []);

  //競標視窗
  const priceInputRef = useRef();
  //競標視窗錯誤訊息
  const [bidPriceModalErr, setBidPriceModalErr] = useState('');
  //競標handle
  const handleCreateBid = async () => {
    try {
      setIsLoading(true);
      const res = await newBidData(
        urlId,
        parseInt(priceInputRef.current.value, 10)
      );
      if (typeof res === 'string') {
        console.log('err');
        setBidPriceModalErr(res);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <>
      <button
        onClick={() => setIsShow((pre) => !pre)}
        className="border bg-black w-full p-2 text-center text-white rounded-md hover:bg-opacity-90 mb-2"
      >
        出價
      </button>
      <Model width={'w-1/3'} isShow={isShow}>
        {/* header */}
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <div className="flex gap-2">
            <button onClick={handleCloseModel}>
              <XMarkIcon width={24} height={24} />
            </button>
            <p className="font-bold text-xl">出價</p>
          </div>
          <div className="flex items-center gap-4">
            {/* 錯誤訊息 */}
            <p className="text-red-500">{bidPriceModalErr}</p>
            <button
              onClick={handleCreateBid}
              className="bg-black text-white p-2 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  <span>上傳中</span>
                </>
              ) : (
                '出價'
              )}
            </button>
          </div>
        </div>
        {/* Body */}
        <div className="p-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="TWD">TWD</label>
            <input
              ref={priceInputRef}
              defaultValue={0}
              min={0}
              id="TWD"
              className="border rounded-md p-1"
              type="number"
              placeholder="請輸入出價"
            />
          </div>
        </div>
      </Model>
    </>
  );
};

ArtworkBidModal.propTypes = {
  urlId: PropType.string,
  isLoading: PropType.bool,
  setIsLoading: PropType.func,
};

export default ArtworkBidModal;
