import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { addCartItem, deleteCartItem } from '../../api/cart';
import { TbShoppingCartPlus, TbShoppingCartX } from 'react-icons/tb';
import { TbHammer } from 'react-icons/tb';
import { deleteCart, addCart } from './userCartSlice';

import PropType from 'prop-types';

const AddCartBtn = ({ id, data, color }) => {
  const userCart = useSelector((state) => state.userCart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = async () => {
    if (!auth.isAuth) return navigator('/login');
    if (auth.id === data.user.id) return window.alert('這是您的作品');
    setIsLoading(true);
    if (userCart.map((item) => item.id).includes(id)) {
      try {
        await deleteCartItem(id);
        dispatch(deleteCart(id));
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      dispatch(addCart(data));
      try {
        await addCartItem(id);
      } catch (error) {
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };
  return (
    <>
      {data.startDate ? (
        <Link className={`text-${color}`} to={`/artwork/${id}`}>
          <TbHammer size={30} />
        </Link>
      ) : isLoading ? (
        <div
          className={`inline-block h-8 w-8 animate-spin rounded-full border-4  border-${color} border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] lg:block`}
        ></div>
      ) : (
        <button onClick={handleTrack}>
          {userCart.map((item) => item.id).includes(id) ? (
            <div className="text-red-500">
              <TbShoppingCartX size={30} />
            </div>
          ) : (
            <div className={`text-${color}`}>
              <TbShoppingCartPlus size={30} />
            </div>
          )}
        </button>
      )}
    </>
  );
};

AddCartBtn.propTypes = {
  id: PropType.string,
  color: PropType.string,
  data: PropType.object,
};

export default AddCartBtn;
