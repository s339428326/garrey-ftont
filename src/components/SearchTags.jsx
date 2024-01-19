import { useState, useEffect } from 'react';

import PropType from 'prop-types';
import { tagsTop5 } from '../api/artwork';

import { XMarkIcon } from '@heroicons/react/24/solid';

const SearchTags = ({ tags, setTags }) => {
  const [tagsData, setTagsData] = useState([]);

  const handleCategory = (e) => {
    //搜索是否已存在
    setTags((pre) => {
      const index = pre.indexOf(e.target.innerText);
      if (index < 0) {
        return [...pre, e.target.innerText];
      } else {
        return pre.filter((item) => item !== e.target.innerText);
      }
    });
  };

  useEffect(() => {
    (async () => {
      const res = await tagsTop5();
      setTagsData(res.data.tags.map((item) => item.tag));
    })();
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      <ul className="flex flex-wrap gap-2 items-center">
        <li>熱門標籤：</li>
        {tagsData.map((tag) => (
          <li
            key={tag}
            className="flex items-center gap-2 border border-black p-1"
          >
            <button onClick={handleCategory}>{tag}</button>
          </li>
        ))}
      </ul>
      <ul className="flex flex-wrap gap-1 items-center">
        <li>選擇標籤：</li>
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
  );
};

SearchTags.propTypes = {
  tags: PropType.array,
  setTags: PropType.func,
};

export default SearchTags;
