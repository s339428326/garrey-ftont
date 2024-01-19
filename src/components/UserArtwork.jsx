//react
import { useState, useEffect } from 'react';

//3-rd plug
import {
  MagnifyingGlassIcon,
  TableCellsIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/solid';

//components
import ArtworkModel from './ArtworkModel';
import ArtWorkCardList from './ArtWorkCardList';
import DropDownListInput from './DropDownListInput';

const UserArtwork = () => {
  //search keyword
  const [keyword, setKeyword] = useState('');

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  //sortSelect(Default Value)
  const [sortItem, setSortItem] = useState('isShow');

  //model
  const [isShow, setIsShow] = useState(false);

  //model keyboard ese close model
  useEffect(() => {
    const handleClose = (e) => {
      if (e.key === 'Escape') {
        setIsShow(false);
        document.body.style.overflow = 'auto';
      }
    };
    document.addEventListener('keydown', handleClose);
    return () => document.removeEventListener('keydown', handleClose);
  }, []);

  return (
    <div className="border border-black p-4">
      <div>
        <button
          onClick={() => {
            document.body.style.overflow = 'hidden';
            setIsShow(true);
          }}
          className="bg-black text-white border py-2 px-4 outline-none"
          type="button"
        >
          新增藝術品
        </button>
        <div className="mb-4">
          <ArtworkModel isShow={isShow} setIsShow={setIsShow} />
        </div>
        {/* search artwork */}
        <div className="flex items-center gap-4 mb-4">
          <div className="border-b flex gap-2 py-2">
            <MagnifyingGlassIcon width={24} height={24} />
            <input
              onChange={handleKeyword}
              className="w-full outline-none"
              type="text"
              placeholder="搜索商品名稱"
            />
          </div>
          <p>排序：</p>
          <DropDownListInput
            className={'flex items-center gap-2'}
            defaultValue={'上架'}
            value={sortItem}
            setValue={setSortItem}
            listData={[
              { name: '價格', value: 'price' },
              { name: '上架', value: 'isShow' },
            ]}
          />
          {/* 切換檢視資料方式 */}
          <ul className="flex ml-auto border p-1 gap-4 rounded-md items-center">
            <li>
              <button className="block">
                <Squares2X2Icon className="" width={28} height={28} />
              </button>
            </li>
            <li>
              <button className="block">
                <TableCellsIcon className="" width={28} height={28} />
              </button>
            </li>
          </ul>
        </div>

        {/* List */}
        <ArtWorkCardList keyword={keyword} setKeyword={setKeyword} />
      </div>
    </div>
  );
};

export default UserArtwork;
