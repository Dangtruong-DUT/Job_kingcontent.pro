import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionGetThreadsCollections,
  actionGetThreadsFollowingChannels,
  actionGetThreadsVideosThreadsInCollections,
  actionUpdateCollectionModalOpen,
  actionUpdateCollectionModalType,
  actionUpdateCurrentCollection,
} from '@/store/actions/threads';
import SingleChannel from '@/SingleChannel';
import SingleCollection from '@/SingleCollection';
import PerfectScrollbar from 'react-perfect-scrollbar';

const LeftPart = (props) => {
  const { isSchedule = false } = props;
  const [isShowChannels, setIsShowChannels] = useState(true);
  const [isShowCollections, setIsShowCollections] = useState(false);
  const { followingChannels = null, collections = null } = useSelector(
    (state) => {
      return state.threads;
    }
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionGetThreadsFollowingChannels());
  }, []);

  useEffect(() => {
    dispatch(actionGetThreadsCollections());
    dispatch(actionGetThreadsVideosThreadsInCollections());
  }, []);

  const handleShowChannels = () => {
    setIsShowChannels(true);
    setIsShowCollections(false);
  };

  const handleShowCollections = () => {
    setIsShowChannels(false);
    setIsShowCollections(true);
  };

  const onClickAddCollection = useCallback(() => {
    dispatch(actionUpdateCurrentCollection(null));
    dispatch(actionUpdateCollectionModalOpen(true));
    dispatch(actionUpdateCollectionModalType('add'));
  }, [dispatch]);

  return (
    <div className="left-part border border-gray-300 rounded-md bg-white p-2">
      <div className="tab flex gap-2">
        <div
          className={`flex-1 cursor-pointer text-center border border-gray-300 rounded-tl-md rounded-tr-md p-3 ${
            isShowChannels ? 'bg-primary text-white' : ''
          }`}
          onClick={handleShowChannels}
        >
          Äang theo dÃµi
        </div>
        <div
          className={`flex-1 p-3 cursor-pointer text-center border border-gray-300 rounded-tl-md rounded-tr-md ${
            isShowCollections ? 'bg-primary text-white' : ''
          }`}
          onClick={handleShowCollections}
        >
          Bá»™ sÆ°u táº­p
        </div>
      </div>
      <div className="list mt-3 border border-gray-200 rounded-md py-3">
        {isShowChannels ? (
          followingChannels?.length > 0 ? (
            <PerfectScrollbar
              className="max-h-screen"
              style={{ height: 'fit-content' }}
            >
              {followingChannels?.map((channel) => (
                <Fragment key={channel.id}>
                  <SingleChannel channel={channel} isSchedule={isSchedule} />
                </Fragment>
              ))}
            </PerfectScrollbar>
          ) : (
            <h3 className="font-bold px-2 text-center mt-5">
              Báº¡n chÆ°a theo dÃµi kÃªnh Threads nÃ o
            </h3>
          )
        ) : (
          <></>
        )}

        {isShowCollections ? (
          <div className="collectionsContainer">
            {/* add button add new collection */}

            {!isSchedule ? (
              <div className="flex justify-end mb-3 mr-2">
                <button
                  className="bg-primary text-white px-3 py-2 rounded-md"
                  onClick={() => onClickAddCollection()}
                >
                  ThÃªm má»›i
                </button>
              </div>
            ) : null}

            {collections?.length > 0 ? (
              <PerfectScrollbar
                className="max-h-screen"
                style={{ height: 'fit-content' }}
              >
                {collections?.map((collection) => (
                  <Fragment key={collection.id}>
                    <SingleCollection
                      collection={collection}
                      isSchedule={isSchedule}
                    />
                  </Fragment>
                ))}
              </PerfectScrollbar>
            ) : (
              <h3 className="font-bold px-2 text-center mt-5">
                Báº¡n chÆ°a táº¡o bá»™ sÆ°u táº­p Threads nÃ o
              </h3>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default LeftPart;


