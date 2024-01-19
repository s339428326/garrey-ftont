import PropType from 'prop-types';

const Alert = ({ children, isShow, className }) => {
  return (
    <div
      className={`${
        !isShow && 'hidden'
      } absolute right-0 left-0 top-0 w-screen h-screen`}
    >
      {/* background */}
      <div className="absolute backdrop-blur-3xl  w-screen h-[9999px]  opacity-60 z-50"></div>
      {/* window */}
      <div className="fixed top-0 flex justify-center items-center w-screen h-screen z-[99]">
        <div className={`${className} rounded-lg bg-white`}>{children}</div>
      </div>
    </div>
  );
};

Alert.propTypes = {
  children: PropType.node,
  isShow: PropType.bool,
  className: PropType.string,
};

export default Alert;
