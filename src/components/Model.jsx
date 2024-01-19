import PropType from 'prop-types';

const Model = ({ children, isShow, width }) => {
  return (
    <div
      className={`${
        !isShow && 'hidden'
      } absolute right-0 left-0 top-0  w-screen  h-screen`}
    >
      <div className="absolute bg-black  w-screen h-[9999px]  opacity-60 z-50"></div>
      <div className="w-screen fixed top-0 flex justify-center items-center h-screen z-[99]">
        <div
          className={`w-screen h-screen md:rounded-lg md:${width} md:h-auto bg-white`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

Model.propTypes = {
  children: PropType.node,
  isShow: PropType.bool,
  width: PropType.string,
};

export default Model;
