import { memo } from 'react';
import { Link } from 'react-router-dom';

import ArtworkLikeBtn from '../features/userTrack/ArtworkLikeBtn';
import PropType from 'prop-types';

export const SearchArtworkCard = ({ item }) => {
  return (
    <div>
      <div className="overflow-hidden">
        <Link to={`/artwork/${item.id}`}>
          <img
            className="w-full object-cover border-t border-l border-r border-black transition-all hover:scale-110 duration-300 "
            src={item.productImgSrc}
            alt={item.name}
          />
        </Link>
      </div>

      {/* card */}
      <div className="p-2 border border-black">
        {/* tag */}
        <div className="flex justify-between">
          <Link to={`/artwork/${item.id}`}>
            <p className="font-bold">{item.name}</p>
          </Link>
          <div className="flex gap-2">
            <ArtworkLikeBtn id={item.id} />
          </div>
        </div>
        <div className="flex flex-col gap-1 text-sm text-gray-500">
          <p>{item.creator}</p>
          <p>尺寸： {item.size}</p>
        </div>

        <ul className="flex flex-wrap gap-2">
          {item.tags.map((item, index) => (
            <li
              key={`${item}tag-${index}`}
              className="bg-black p-1 text-white text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
        <small className="text-gray-500">
          上傳時間：
          {new Date(item.createAt).toLocaleString().toString().split(' ')}
        </small>
      </div>
    </div>
  );
};

SearchArtworkCard.propTypes = {
  item: PropType.object,
};

const SearchArtworkList = memo(({ data }) => {
  //瀑布流分組3個為一組
  const cols = [];
  const colSize = 3;
  for (let i = 0; i < data.length; i += colSize) {
    cols.push(data.slice(i, i + colSize));
  }

  //   console.log('分組結數', cols);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {data.name}
      {/* <p>測試：{JSON.stringify(data.map((item) => item.name))}</p> */}
      {cols.map((col, index) => (
        <ul key={`col-${index}`} className="grid gap-4">
          {col.map((item) => (
            <li className="h-fit max-w-full" key={item.id}>
              <SearchArtworkCard item={item} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
});

SearchArtworkList.displayName = 'SearchArtworkList';

SearchArtworkList.propTypes = {
  data: PropType.array,
};

export default SearchArtworkList;
