import { FaMinusCircle, FaPencilAlt } from 'react-icons/fa';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ACTION_FILTER_STATUS_VIDEOS_SUCCESS,
  actionGetThreadsVideosByCollection,
  actionRemoveCollection,
  actionUpdateCollectionModalOpen,
  actionUpdateCollectionModalType,
  actionUpdateCurrentCollection,
  actionUpdateCurrentVideoType,
} from '@/store/actions/threads';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

const SingleCollection = ({ collection, isSchedule = false }) => {
  const {
    id,
    name = '',
    avatar = '',
    picture_url = '',
    posts_count = 0,
  } = collection;
  const dispatch = useDispatch();

  const { isLoading = false, nextIsLoading = false } = useSelector((state) => {
    return state.threads;
  });

  const handleClickEditCollection = useCallback(() => {
    dispatch(actionUpdateCurrentCollection(collection));
    dispatch(actionUpdateCollectionModalOpen(true));
    dispatch(actionUpdateCollectionModalType('edit'));
  }, [collection, dispatch]);

  const onClickRemoveCollection = useCallback(
    (id) => {
      confirmAlert({
        title: 'ThÃ´ng bÃ¡o',
        message:
          'Khi xÃ³a bá»™ sÆ°u táº­p, cÃ¡c video Ä‘Ã£ lÆ°u sáº½ bá»‹ xoÃ¡ theo. Báº¡n cÃ³ cháº¯c muá»‘n thá»±c hiá»‡n khÃ´ng?',
        buttons: [
          {
            label: 'Cháº¯c cháº¯n',
            onClick: async () => {
              await dispatch(actionRemoveCollection(id));
              toast.success('XoÃ¡ bá»™ sÆ°u táº­p thÃ nh cÃ´ng !');
            },
          },
          {
            label: 'Äá»•i Ã½',
            onClick: () => {},
          },
        ],
      });
    },
    [dispatch]
  );

  const onClickShowCollection = useCallback(
    async (id) => {
      if (isLoading || nextIsLoading) {
        toast.info('Äang táº£i dá»¯ liá»‡u, vui lÃ²ng chá» trong giÃ¢y lÃ¡t');
        return;
      }
      await dispatch(actionGetThreadsVideosByCollection(id));
      // set current video type
      dispatch(
        actionUpdateCurrentVideoType({
          type: 'collection',
          name,
          id,
        })
      );
      dispatch({
        type: ACTION_FILTER_STATUS_VIDEOS_SUCCESS,
        payload: false,
      });
    },
    [dispatch, id, name]
  );

  return (
    <div className="flex gap-3 p-2 mb-1 border-dashed border-b">
      {/* remove */}
      {!isSchedule && (
        <button
          className="btn btn-danger btn-sm btn-remove-channel"
          data-id={id}
          title="XoÃ¡ bá»™ sÆ°u táº­p"
          onClick={() => onClickRemoveCollection(id)}
        >
          <FaMinusCircle size={32} color="red" />
        </button>
      )}
      <div
        className="collectionInfo flex items-center cursor-pointer gap-3 w-full"
        onClick={() => onClickShowCollection(id)}
      >
        <img
          src={`https://v3.api.kingcontent.pro/api/v1/user/media/bypass-cors?url=${encodeURIComponent(
            avatar
          )}&type=image`}
          alt={name}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="info">
          <div className="name">
            <span>{name}</span>
            <br />
            <strong>{posts_count}</strong> Threads
          </div>
        </div>
      </div>
      {/* button edit */}
      {!isSchedule && (
        <button onClick={() => handleClickEditCollection()}>
          <FaPencilAlt size={16} />
        </button>
      )}
    </div>
  );
};

export default SingleCollection;


