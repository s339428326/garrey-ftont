import { useEffect, useState } from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux';

import {
  addTrackArtwork,
  removeTrackArtwork,
  getTrackArtwork,
} from './userTrackSlice';

//axios
import {
  getUserTrackArtwork,
  addTrackArtworkList,
  deleteTrackArtworkList,
} from '../../api/user';

import { useNavigate } from 'react-router-dom';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import PropType from 'prop-types';

const ArtworkLikeBtn = ({ id }) => {
  //redux
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigator = useNavigate();

  const [isTrack, setIsTrack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (auth.isAuth) {
      (async () => {
        setIsLoading(true);
        try {
          const res = await getUserTrackArtwork();
          if (!res) return setIsLoading(false);
          dispatch(getTrackArtwork(res));
          setIsTrack(res.includes(id));
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      })();
    } else {
      dispatch(getTrackArtwork([]));
      setIsLoading(false);
    }
  }, [id]);

  const handleTrack = async () => {
    if (!auth.isAuth) return navigator('/login');
    setIsLoading(true);
    if (isTrack) {
      dispatch(removeTrackArtwork(id));
      await deleteTrackArtworkList(id);
      setIsTrack(false);
    } else {
      dispatch(addTrackArtwork(id));
      await addTrackArtworkList(id);
      setIsTrack(true);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]  lg:block"></div>
      ) : (
        <button onClick={handleTrack}>
          {isTrack ? (
            <div className="text-red-500">
              <AiFillHeart size={30} />
            </div>
          ) : (
            <div>
              <AiOutlineHeart size={30} />
            </div>
          )}
        </button>
      )}
    </>
  );
};

ArtworkLikeBtn.propTypes = {
  id: PropType.string,
};

export default ArtworkLikeBtn;
