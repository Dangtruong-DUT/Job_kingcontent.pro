import { FaMinusCircle, FaPencilAlt } from 'react-icons/fa';
import logoTikTok from '@/assets/images/icon/main-menu/menu-icon-tiktok.png';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  actionGetTiktokVideosByCollection,
  actionRemoveCollection,
  actionUpdateCollectionModalOpen,
  actionUpdateCollectionModalType,
  actionUpdateCurrentCollection,
  actionUpdateCurrentVideoType,
} from '@/store/actions/tiktok';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

const SingleCollection = ({ collection, isSchedule = false }) => {
  const {
    id,
    name = '',
    avatar = '',
    avatar_url = '',
    videos_count = 0,
  } = collection;
  const dispatch = useDispatch();

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

  const onClickShowCollection = useCallback(async () => {
    await dispatch(actionGetTiktokVideosByCollection(id));
    // set current video type
    dispatch(
      actionUpdateCurrentVideoType({
        type: 'collection',
        name,
      })
    );
  }, [dispatch, id, name]);

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
        onClick={() => onClickShowCollection()}
      >
        <img
          src={
            avatar_url?.includes('https')
              ? avatar_url
              : `data:image/png;base64,${avatar_url}`
          }
          title={name}
          alt=""
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="info">
          <div className="name">
            <span>{name}</span>
            <br />
            <strong>{videos_count}</strong> video
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



