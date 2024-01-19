import { animated, useSpring } from '@react-spring/web';
import PropType from 'prop-types';

const ImageBox = ({
  children,
  className,
  boxArr,
  setBoxArr,
  currentIndex,
  setCurrentItem,
}) => {
  const spring = useSpring({
    width: boxArr[currentIndex].open ? `${100}%` : `30%`,
  });

  return (
    <animated.li
      className={`${className}`}
      style={{ ...spring }}
      onClick={() => {
        setBoxArr((pre) => {
          //all false
          const newArr = pre.map((item, index) => {
            if (index === currentIndex) {
              return { ...item, open: true };
            } else {
              return { ...item, open: false };
            }
          });
          return newArr;
        });
        setCurrentItem(boxArr[currentIndex]);
      }}
    >
      {children}
    </animated.li>
  );
};

ImageBox.propTypes = {
  children: PropType.node,
  className: PropType.string,
  boxArr: PropType.array,
  setBoxArr: PropType.func,
  currentIndex: PropType.number,
  setCurrentItem: PropType.func,
};

export default ImageBox;
