//react
import { useState, useEffect } from 'react';

//Components
import DropDownListInput from './DropDownListInput';
import SearchTags from '../components/SearchTags';
import DateInput from '../components/DateInput';

//3-rd plug
import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import PropType from 'prop-types';

//hooks
import useDebounce from '../hooks/useDebounce';

import { getAllArtwork } from '../api/artwork';

const SearchBar = ({ setResultData }) => {
  // 搜索關鍵字
  const [keyword, setKeyword] = useState('');
  // 總類下拉狀態
  const [currentItem, setCurrentItem] = useState('creator,name');
  // 藝術類型分類(tags)
  const [tags, setTags] = useState([]);
  //搜索長度
  const [resultLen, setResultLen] = useState(0);

  // 加入useDebounce
  const debounceName = useDebounce(keyword);
  const debounceTags = useDebounce(tags);

  //[Feature takeoff to Filter components]

  //Search filter view
  const [isShow, setIsShow] = useState(false);
  //data selector
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [tagInput, setTagInput] = useState('');
  const [isSold, setIsSold] = useState();
  const [isBid, setIsBid] = useState();
  const debounceIsSold = useDebounce(isSold);
  const debounceIsBid = useDebounce(isBid);

  //useDebounce render
  useEffect(() => {
    (async () => {
      //debounceValue 帶入 getAllArtwork
      // console.log({ currentItem, debounceTags, name: debounceName });
      const res = await getAllArtwork({
        name: debounceName,
        tags: debounceTags,
        isSold: debounceIsSold,
        isBid: debounceIsBid,
        endDate,
        startDate,
        currentItem,
      });
      //帶入資料給搜索資料狀態
      setResultData(res.data.artwork);
      setResultLen(res.data.results);
    })();
  }, [
    debounceTags,
    currentItem,
    debounceName,
    startDate,
    endDate,
    debounceIsSold,
    debounceIsBid,
    setResultData,
  ]);

  return (
    <div>
      <section className="flex flex-wrap justify-between items-center border border-black p-2 gap-2">
        <DropDownListInput
          className={'flex-3'}
          defaultValue={'作家/作品'}
          value={currentItem}
          setValue={setCurrentItem}
          listData={[
            { name: '作品/作者', value: 'creator,name' },
            { name: '作品', value: 'name' },
            { name: '作者', value: 'creator' },
          ]}
        />

        {/* Filter */}
        <div className="relative border border-black p-1 flex-3">
          <button
            onClick={() => setIsShow((pre) => !pre)}
            className="block p-1"
          >
            {isShow ? (
              <XMarkIcon width={24} height={24} />
            ) : (
              <AdjustmentsHorizontalIcon width={24} height={24} />
            )}
          </button>
          <ul
            className={`absolute top-[120%] left-0 w-fit bg-white flex flex-col h-0 transition-all duration-500 z-30  ${
              isShow
                ? 'h-fit border border-black overflow-visible'
                : 'overflow-hidden '
            }`}
          >
            <li className="flex justify-between pt-2 px-2 ">
              <p className="font-bold text-lg">篩選器</p>
              <button
                className="text-sm text-red-500"
                onClick={() => {
                  setStartDate(null);
                  setEndDate(null);
                  setTagInput('');
                  setIsSold('');
                  setIsBid('');
                  setTags([]);
                }}
              >
                X 清除設定
              </button>
            </li>
            <li className="p-2 flex flex-col">
              <span>商品發佈日期：(起始～結束)</span>
              <DateInput
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
            </li>
            <li className="p-2 flex flex-col gap-1">
              <p>商品販賣狀態:</p>
              <div className="flex flex-wrap gap-2 text-sm">
                <div>
                  <input
                    className="checked"
                    onChange={(e) => setIsSold(e.target.value)}
                    id="isSold-true"
                    type="checkbox"
                    value={false}
                    checked={isSold === 'false'}
                    readOnly
                  />
                  <label htmlFor="isSold-true">未售出</label>
                </div>
                <div className="mr-2">
                  <input
                    onChange={(e) => setIsSold(e.target.value)}
                    id="isSold-false"
                    type="checkbox"
                    value={true}
                    checked={isSold === 'true'}
                  />
                  <label htmlFor="isSold-false">已售出</label>
                </div>
              </div>
            </li>
            <li className="p-2 flex flex-col gap-1">
              <p>商品是否開啟競標:</p>
              <div className="flex flex-wrap gap-2 text-sm">
                <div className="mr-2">
                  <input
                    onChange={(e) => setIsBid(e.target.value)}
                    id="isBid-false"
                    type="checkbox"
                    value={false}
                    checked={isBid === 'false'}
                  />
                  <label htmlFor="isBid-false">非競標</label>
                </div>
                <div>
                  <input
                    onChange={(e) => setIsBid(e.target.value)}
                    id="isBid-true"
                    type="checkbox"
                    value={true}
                    checked={isBid === 'true'}
                  />
                  <label htmlFor="isBid-true">競標</label>
                </div>
              </div>
            </li>
            <li>
              <div className="flex flex-col p-2">
                <label htmlFor="tag">創作標籤</label>

                <div className="flex flex-col gap-4 mb-2">
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
                      setTags((pre) => [...pre, tagInput]);
                    }}
                    className="p-1 bg-black text-white"
                    type="button"
                  >
                    新增
                  </button>
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
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <input
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            className="border-b border-black p-1 outline-none w-full"
            type="search"
            name="search"
            id="search"
            placeholder="請輸入搜尋項目"
          />
        </div>
        {/* 分類 */}
      </section>
      <div className="my-4">
        <SearchTags tags={tags} setTags={setTags} />
      </div>
      <section className="pb-4">
        {debounceName && (
          <p className="text-xl font-bold py-4">搜索結果({resultLen})：</p>
        )}
      </section>
    </div>
  );
};

SearchBar.propTypes = {
  resultData: PropType.array,
  setResultData: PropType.func,
};

export default SearchBar;
