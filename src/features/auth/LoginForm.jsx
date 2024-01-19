import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';

import { useDispatch } from 'react-redux';
import { updateUserData } from './authSlice';

import PropType from 'prop-types';

const LoginForm = ({ children, setServerSideErrMsg, handleSubmit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //login
  const onSubmit = async (data) => {
    const res = await login(data);

    if (res?.response?.data?.message)
      return setServerSideErrMsg(res.response.data.message);

    document.cookie = `token=${res.data.token}; expires=${new Date(
      Date.now() + import.meta.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    )};`;

    if (!document.cookie.startsWith('token=')) {
      setServerSideErrMsg('cookie 權限不足, 請檢查瀏覽器設定！');
      return;
    }

    const {
      avatar,
      cover,
      name,
      email,
      role,
      _id,
      intro,
      cart,
      trackArtworkList,
    } = res.data.data.user;

    console.log('getAjax', res.data.data.user);

    dispatch(
      updateUserData({
        avatar,
        cover,
        name,
        email,
        role,
        id: _id,
        intro,
        cart,
        trackArtworkList,
      })
    );

    navigate('/');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-[95vh] grid grid-cols-12 gap-4 items-center"
      action=""
    >
      {children}
    </form>
  );
};

LoginForm.propTypes = {
  children: PropType.node,
  setServerSideErrMsg: PropType.func,
  handleSubmit: PropType.func,
};

export default LoginForm;
