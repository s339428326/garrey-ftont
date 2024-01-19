import PropType from 'prop-types';
import { useRef } from 'react';
import { useState, useEffect } from 'react';

const DropDownListInput = ({
  className,
  labelName,
  listData,
  value,
  setValue,
  defaultValue,
  disable,
}) => {
  const [viewText, setViewText] = useState(defaultValue);
  const [isShow, setIsShow] = useState(false);
  const dropDownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setIsShow(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleShow = () => {
    setIsShow((pre) => !pre);
  };

  const handleItem = (e) => {
    e.preventDefault();
    setValue(JSON.parse(e.target.value));
    setViewText(e.target.innerText);
    setIsShow(false);
  };

  return (
    <div className={`${className}`}>
      {labelName && <label htmlFor={labelName}>{labelName}</label>}
      {/* 設立客製input元件 */}
      <div ref={dropDownRef} className="relative w-fit">
        <button
          onClick={handleShow}
          type="button"
          className={`border border-black outline-none p-2 before:block before:w-0 before:h-0 before:border-t-black before:border-t-[10px] before:border-l-[8px] before:border-l-transparent before:border-r-[8px] before:border-r-transparent flex items-center gap-1 ${
            disable && 'border-white bg-gray-300 text-gray-500'
          }`}
          disabled={disable}
        >
          {viewText}
        </button>
        <input
          id={labelName || ''}
          className="hidden border border-black outline-none p-1 cursor-pointer"
          type="text"
          defaultValue={value}
        />
        <ul
          className={`${
            isShow ? 'h-fit border-black' : 'h-0'
          } absolute content-[''] top-[100%] right-0 left-0  border-l border-r border-b bg-white overflow-hidden z-20`}
        >
          {listData.map((item, index) => (
            <li key={`list-${index}-${item.name}`} className="border-b">
              <button
                onClick={handleItem}
                className="w-full text-left p-2"
                value={JSON.stringify(item.value)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

DropDownListInput.propTypes = {
  className: PropType.string,
  labelName: PropType.string,
  listData: PropType.array,
  value: PropType.any,
  setValue: PropType.func,
  defaultValue: PropType.string,
  disable: PropType.bool,
};

export default DropDownListInput;
