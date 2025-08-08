import React from 'react';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isArrayEmpty, OK, VIDEO_EDITOR_URL } from '@/../../configs';
import {
  ACTION_CHANGE_LOADING_APP,
  ACTION_FILTER_STATUS_DOUYIN_VIDEOS_SUCCESS,
  actionGetDouyinChannels,
  actionGetDouyinCollections,
  actionGetDouyinVideos,
  actionGetDouyinVideosByChannel,
  actionGetDouyinVideosByCollection,
  actionRemoveVideoFromCollection,
  actionUpdateChosenVideos,
  actionUpdateCollectionModalOpen,
  actionUpdateCollectionModalType,
} from '@/store/actions/douyin/index';
import { douyinService } from '@/../../services/douyin';
import {
  setCurrentDateTime,
  setIsShowFinalStep,
  setScheduleWaitingList,
  setSelectedScheduleContent,
  setShowSourceIdeasPopup,
} from '@/store/actions/Schedules';
import LoadingApp from '@/../LoadingApp';
import DetailDouyin from '@/../Schedules/douyin/detailDouyin';
import SingleChannel from '@/SingleChannel';
import SingleVideo from '@/SingleVideo';
import auth from '@/../../utils/auth';

const renderTitle = (type, name) => {
  return (
    <h3 className="text-xl">
      {/* change to switch */}
      {type === 'channel' ? (
        <span>
          {' '}
          Danh sÃ¡ch video cá»§a kÃªnh:
          <span className="font-bold">{name}</span>
        </span>
      ) : type === 'collection' ? (
        <span>
          {' '}
          Danh sÃ¡ch video cá»§a bá»™ sÆ°u táº­p:
          <span className="font-bold">{name}</span>
        </span>
      ) : type === 'keyword' ? (
        <span>
          {' '}
          Káº¿t quáº£ tÃ¬m kiáº¿m theo tá»« khoÃ¡:
          <span className="font-bold">{name}</span>
        </span>
      ) : (
        <span> Danh sÃ¡ch video Ä‘ang thá»‹nh hÃ nh</span>
      )}
    </h3>
  );
};

const convertListVideosToIds = (listVideos) => {
  return listVideos.map((video) => video.video_id);
};

const maxAllowDuration = 600; // 10 minutes

// Function to convert seconds to human readable format
const convertSecondsToReadableFormat = (seconds) => {
  if (seconds >= 60) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (remainingSeconds === 0) {
      return `${minutes} phÃºt`;
    } else {
      return `${minutes} phÃºt ${remainingSeconds} giÃ¢y`;
    }
  }
  return `${seconds} giÃ¢y`;
};

const RightPart = (props) => {
  const {
    isSchedule = false,
    isAuto = false,
    handleAddToWaitingList = () => {},
    leftOpen = false,
  } = props;
  const [isShowChannels, setIsShowChannels] = useState(false);
  const [isShowVideos, setIsShowVideos] = useState(true);
  const [channels, setChannels] = useState([]);
  const [nexToken, setNextToken] = useState(null);
  const [videos, setVideos] = useState([]);
  const [open, setOpen] = useState(false);
  const [objSelect, setObjSelect] = useState(null);

  const [videoNextOffset, setVideoNextOffset] = useState(0);
  const [hasMore, setHasMore] = useState(0);
  const [channelNextOffset, setChannelNextOffset] = useState(0);
  const [videoSearchId, setVideoSearchId] = useState('');
  const [isShowCollectionActions, setIsShowCollectionActions] = useState(false);
  const [currentCollectionId, setCurrentCollectionId] = useState(0);

  // @ts-ignore
  const { autoWaitingList } = useSelector((state) => state.schedules);
  const history = useHistory();

  const dispatch = useDispatch();

  const {
    isLoading = false,
    nextIsLoading = false,
    searchType,
    searchChannel = null,
    searchVideos = null,
    chosenVideos = [],
    videoType = null,
    collectionsVideos = [],
    keyword = '',
    filteringSettings = null,
    filterData,
    isFilter,
  } = useSelector((state) => {
    // @ts-ignore
    return state.douyins;
  });

  const handleAction = async (action, elt, collId = 0) => {
    switch (action) {
      case 'VIEW_DETAIL_CONTENT':
        const {
          images = [],
          videos = [],
          feed_name = '',
          timestamp,
          duration = 0,
        } = elt;
        // open original video when duration > 3 minutes
        if (duration > 180) {
          const link = document.createElement('a');
          link.href = `https://www.douyin.com/video/${elt.video_id}`;
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link); // Clean up
          return;
        }
        let mediaType = 'video';

        setObjSelect({
          ...elt,
          medias: [elt.thumbnail],
          user_screenname: feed_name,
          post_timestamp: timestamp,
          media_type: mediaType,
          media_url: elt.video,
        });
        setOpen(true);
        break;

      case 'CHOOSE_VIDEO':
        const index = chosenVideos.findIndex(
          (item) => item.video_id === elt.video_id
        );
        if (index > -1) {
          const newChosenVideos = chosenVideos.filter(
            (item) => item.video_id !== elt.video_id
          );
          dispatch(actionUpdateChosenVideos(newChosenVideos));
        } else {
          dispatch(actionUpdateChosenVideos([...chosenVideos, elt]));
        }
        break;

      case 'REMOVE_FROM_COLLECTION':
        const collectionId = collId ? collId : elt.collection_id;
        confirmAlert({
          title: 'ThÃ´ng bÃ¡o',
          message: 'Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n xoÃ¡ video nÃ y khá»i BST khÃ´ng?',
          buttons: [
            {
              label: 'Cháº¯c cháº¯n',
              onClick: async () => {
                await dispatch(
                  actionRemoveVideoFromCollection(collectionId, elt.video_id)
                );
                await dispatch(actionGetDouyinCollections());
                await dispatch(actionGetDouyinVideosByCollection(collectionId));
                toast.success('XoÃ¡ video ra khá»i bá»™ sÆ°u táº­p thÃ nh cÃ´ng !');
              },
            },
            {
              label: 'Äá»•i Ã½',
              onClick: () => {},
            },
          ],
        });
        break;

      case 'SCHEDULE_CONTENT':
        if (elt.duration <= 300) {
          dispatch(
            setSelectedScheduleContent({
              ...elt,
              media_type: 'video',
              source_type: 'douyin',
            })
          );
          dispatch(setCurrentDateTime());
          dispatch(setIsShowFinalStep(true));
          dispatch(setShowSourceIdeasPopup(false));
          history.push('/lich-dang-bai');
        } else {
          confirmAlert({
            title: 'ThÃ´ng bÃ¡o',
            message:
              'Kingcontent chá»‰ há»— trá»£ Ä‘Äƒng video dÃ i tá»‘i Ä‘a 5 phÃºt. Vui lÃ²ng chá»n video khÃ¡c',
            buttons: [
              {
                label: 'Äá»“ng Ã½',
                onClick: () => {},
              },
            ],
          });
        }
        break;

      case 'DOWNLOAD':
        const { video = null, video_id = '' } = elt;
        if (video) {
          const link = document.createElement('a');
          link.href = elt.video;
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link); // Clean up
        } else {
          toast.info('Video Ä‘ang Ä‘Æ°á»£c táº£i vá», vui lÃ²ng chá» trong giÃ¢y lÃ¡t');
          const res = await douyinService.getDetailVideo(video_id);
          if (res.status === OK) {
            toast.dismiss();
            const link = document.createElement('a');
            const { video = '' } = res.data.data;
            link.href = video;
            link.download = `${video_id}.mp4`;
            link.setAttribute('download', `${video_id}.mp4`);
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // Clean up
          } else {
            toast.error('CÃ³ lá»—i xáº£y ra, vui lÃ²ng thá»­ láº¡i sau');
          }
        }
        break;

      case 'EDIT_VIDEO':
        if (elt.duration > maxAllowDuration) {
          confirmAlert({
            title: 'ThÃ´ng bÃ¡o',
            message: `Hiá»‡n táº¡i Kingcontent chá»‰ há»— trá»£ chá»‰nh sá»­a video dÃ i tá»‘i Ä‘a ${convertSecondsToReadableFormat(maxAllowDuration)}. Vui lÃ²ng nháº¥n nÃºt táº£i video nÃ y vá» vÃ  upload trá»±c tiáº¿p lÃªn trÃ¬nh chá»‰nh sá»­a video (tá»‘i Ä‘a 200MB)`,
            buttons: [
              {
                label: 'Táº£i vá»',
                onClick: async () => {
                  // Download action - same as DOWNLOAD case
                  const { video = null, video_id = '' } = elt;
                  if (video) {
                    const link = document.createElement('a');
                    link.href = elt.video;
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link); // Clean up
                  } else {
                    toast.info('Video Ä‘ang Ä‘Æ°á»£c táº£i vá», vui lÃ²ng chá» trong giÃ¢y lÃ¡t');
                    const res = await douyinService.getDetailVideo(video_id);
                    if (res.status === OK) {
                      toast.dismiss();
                      const link = document.createElement('a');
                      const { video = '' } = res.data.data;
                      link.href = video;
                      link.download = `${video_id}.mp4`;
                      link.setAttribute('download', `${video_id}.mp4`);
                      link.target = '_blank';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link); // Clean up
                    } else {
                      toast.error('CÃ³ lá»—i xáº£y ra, vui lÃ²ng thá»­ láº¡i sau');
                    }
                  }
                },
              },
              {
                label: 'Video editor',
                onClick: () => {
                  // Open video editor
                  const editorLink = document.createElement('a');
                  const baseEditorUrl = VIDEO_EDITOR_URL ?? 'http://localhost:3000';
                  editorLink.href = baseEditorUrl;
                  editorLink.target = '_blank';
                  document.body.appendChild(editorLink);
                  editorLink.click();
                  document.body.removeChild(editorLink);
                },
              },
            ],
            overlayClassName: 'large-confirmation',
          });
          return;
        }
        
        confirmAlert({
          title: 'Chá»n cÃ¡ch chá»‰nh sá»­a',
          message: 'Báº¡n muá»‘n chá»‰nh sá»­a video nÃ y nhÆ° tháº¿ nÃ o?',
          buttons: [
            {
              label: 'Chá»‰ video nÃ y',
              onClick: () => {
                // Edit single video immediately
                const editorLink = document.createElement('a');
                const baseEditorUrl = VIDEO_EDITOR_URL ?? 'http://localhost:3000';
                editorLink.href = `${baseEditorUrl}?type=douyin&id=${elt.video_id}&thumbnail=${encodeURIComponent(elt.thumbnail)}`;
                editorLink.target = '_blank';
                document.body.appendChild(editorLink);
                editorLink.click();
                document.body.removeChild(editorLink);
              },
            },
            {
              label: 'ÄÆ°a vÃ o danh sÃ¡ch',
              onClick: () => {
                // Add to chosen videos list for batch editing
                const index = chosenVideos.findIndex(
                  (item) => item.video_id === elt.video_id
                );
                if (index === -1) {
                  dispatch(actionUpdateChosenVideos([...chosenVideos, elt]));
                  toast.success('ÄÃ£ thÃªm vÃ o hÃ ng chá» á»ž TRÃŠN CÃ™NG');
                } else {
                  toast.info('Video Ä‘Ã£ cÃ³ trong danh sÃ¡ch');
                }
              },
            },
          ],
        });
        break;

      default:
        break;
    }
  };

  const handleClosePopup = () => {
    setObjSelect(null);
    setOpen(!open);
  };

  const switchSearchTypeResult = (type) => {
    switch (type) {
      case 'channel':
        setIsShowChannels(true);
        setIsShowVideos(false);
        break;
      case 'video':
        setIsShowChannels(false);
        setIsShowVideos(true);
        break;
      default:
        setIsShowChannels(false);
        setIsShowVideos(false);
        break;
    }
  };

  const onFilteringVideos = () => {
    if (!isFilter) {
      let filterContents = searchVideos?.videos || [];
      const newContents = [...filterContents];
      setVideos(newContents);
    } else {
      setVideos(filterData);
    }
  };

  useEffect(() => {
    if (videoType && videoType.type === 'collection') {
      setIsShowCollectionActions(false);
    } else {
      if (!isSchedule) setIsShowCollectionActions(true);
    }
  }, [videoType, isSchedule]);

  useEffect(() => {
    if (searchChannel) {
      const {
        users = [],
        next_cursor = 0,
        next_token,
      } = searchChannel;

      if (users.length > 0) {
        switchSearchTypeResult('channel');
      }
      setChannelNextOffset(next_cursor);
      setChannels(users);
      setNextToken(next_token);
    }
  }, [searchChannel]);

  useEffect(() => {
    if (searchVideos) {
      const {
        videos = [],
        next_cursor = 0,
        next_offset = 0,
        search_id = '',
        has_next = 0,
        next_token,
        collection_id = 0,
      } = searchVideos;

      if (videos.length > 0) {
        switchSearchTypeResult('video');
      }
      onFilteringVideos();
      setVideoNextOffset(next_offset || next_cursor);
      setHasMore(has_next);
      setNextToken(next_token);
      setVideoSearchId(search_id);
      setCurrentCollectionId(collection_id);
    }
  }, [searchVideos]);

  useEffect(() => {
    switchSearchTypeResult(searchType);
  }, [searchType]);

  const handleChangeChannels = () => {
    switchSearchTypeResult('channel');
  };

  const handleChangeVideos = () => {
    switchSearchTypeResult('video');
  };

  const checkVideoIsChosen = useCallback(
    (video) => {
      const index = chosenVideos.findIndex(
        (item) => item.video_id === video.video_id
      );
      if (index > -1) {
        return true;
      }
      return false;
    },
    [chosenVideos]
  );

  const selectAllVideos = useCallback(() => {
    // only select videos that are not in collections
    const newChosenVideos = videos.filter((video) => {
      const index = collectionsVideos.findIndex(
        (item) => item.video_id === video.video_id
      );
      if (index > -1) {
        return false;
      }
      return true;
    });
    dispatch(actionUpdateChosenVideos(newChosenVideos));
  }, [videos]);

  const showCollectionModal = useCallback(() => {
    if (chosenVideos.length > 0) {
      dispatch(actionUpdateCollectionModalOpen(true));
      dispatch(actionUpdateCollectionModalType('addVideo'));
    } else {
      toast.error('Vui lÃ²ng chá»n video');
    }
  }, [chosenVideos]);

  const getMoreChannels = () => {
    dispatch({
      type: ACTION_FILTER_STATUS_DOUYIN_VIDEOS_SUCCESS,
      payload: false,
    });
    dispatch({
      type: ACTION_CHANGE_LOADING_APP,
      payload: true,
    });
    dispatch(
      actionGetDouyinChannels({
        keyword,
        offset: channelNextOffset,
        token: nexToken,
      })
    );
  };

  const getMoreVideos = () => {
    dispatch({
      type: ACTION_FILTER_STATUS_DOUYIN_VIDEOS_SUCCESS,
      payload: false,
    });
    const { type = '', channel_id = '' } = videoType;
    switch (type) {
      case 'channel':
        dispatch({
          type: ACTION_CHANGE_LOADING_APP,
          payload: true,
        });
        dispatch(actionGetDouyinVideosByChannel(channel_id, videoNextOffset));
        break;

      case 'collection':
        dispatch(
          actionGetDouyinVideosByCollection(
            searchVideos?.id,
            parseInt(searchVideos?.page) + 1
          )
        );
        break;

      default:
        const lastIds = convertListVideosToIds(searchVideos?.videos);
        dispatch(
          actionGetDouyinVideos(
            keyword,
            videoNextOffset,
            videoSearchId,
            nexToken,
            lastIds
          )
        );
        break;
    }
  };

  useEffect(() => {
    onFilteringVideos();
  }, [isFilter, filteringSettings]);

  const onSelectAll = () => {
    dispatch(
      setScheduleWaitingList({
        ...autoWaitingList,
        contents: videos,
        source_type: 'douyin',
      })
    );
  };

  const onUnSelectAll = () => {
    dispatch(
      setScheduleWaitingList({
        ...autoWaitingList,
        contents: [],
      })
    );
  };

  return (
    <div className="results border border-gray-300 rounded-md bg-white p-2 border-b">
      {isLoading && isArrayEmpty(videos) ? (
        <LoadingApp />
      ) : !isLoading && isFilter && isArrayEmpty(videos) ? (
        <div className="text-base text-center p-4">
          KhÃ´ng tÃ¬m tháº¥y káº¿t quáº£ phÃ¹ hÆ¡p
        </div>
      ) : (
        <>
          {/* tab channel or video */}
          <div className="tab flex border-b py-3 items-center">
            <div className="tabs flex gap-3 items-center">
              <div
                className={`tab_video cursor-pointer p-3 ${
                  isShowVideos
                    ? 'border rounded-md border-primary text-primary'
                    : ''
                }`}
                onClick={handleChangeVideos}
              >
                Video
              </div>
              <div
                className={`tab_channel cursor-pointer p-3 ${
                  isShowChannels
                    ? 'border rounded-md border-primary text-primary'
                    : ''
                }`}
                onClick={handleChangeChannels}
              >
                KÃªnh
              </div>
            </div>

            {/* show actions */}
            {isShowVideos && isShowCollectionActions && (
              <div className="flex gap-2 items-center justify-center ml-auto">
                {chosenVideos.length > 0 ? (
                  <div className="summary">
                    <span>Báº¡n Ä‘Ã£ chá»n </span>
                    <span className="font-bold">
                      {chosenVideos?.length || 0}
                    </span>
                    / <span className="font-bold">{videos?.length || 0}</span>
                    <span> video</span>
                  </div>
                ) : (
                  <div className="summary hidden">
                    <span>Chá»n video bÃªn dÆ°á»›i Ä‘á»ƒ lÆ°u vÃ o bá»™ sÆ°u táº­p</span>
                  </div>
                )}
                <div className="actions flex gap-3 whitespace-nowrap">
                  {!isArrayEmpty(chosenVideos) && (
                    <button
                      className="border-1 disabled:cursor-not-allowed border-red-800 bg-red-800 hover:bg-red-500 py-3 px-4 text-white rounded-md"
                      disabled={chosenVideos.length === 0}
                      onClick={() => dispatch(actionUpdateChosenVideos([]))}
                    >
                      Bá» chá»n
                    </button>
                  )}

                  <button
                    className="border-1 border-green-700 bg-green-700 disabled:cursor-not-allowed hover:bg-green-500 py-3 px-4 text-white rounded-md"
                    onClick={() => selectAllVideos()}
                    disabled={
                      videos.length === 0 ||
                      chosenVideos.length === videos.length
                    }
                  >
                    Chá»n toÃ n bá»™
                  </button>
                  
                  <button
                    className="border-1 disabled:cursor-not-allowed border-primary bg-primary hover:bg-primaryHover py-3 px-4 text-white rounded-md"
                    onClick={() => showCollectionModal()}
                    disabled={chosenVideos.length === 0}
                  >
                    LÆ°u vÃ o bá»™ sÆ°u táº­p
                  </button>
                  {auth.isHasVip3() && !isArrayEmpty(chosenVideos) && (
                    <button
                      className="border-1 disabled:cursor-not-allowed border-purple-600 bg-purple-600 hover:bg-purple-500 py-3 px-4 text-white rounded-md"
                      onClick={() => {
                        // Check if all chosen videos have valid duration
                        const invalidVideos = chosenVideos.filter(video => video.duration > maxAllowDuration);
                        
                        if (invalidVideos.length > 0) {
                          confirmAlert({
                            title: 'ThÃ´ng bÃ¡o',
                            message: `CÃ³ ${invalidVideos.length} video vÆ°á»£t quÃ¡ thá»i lÆ°á»£ng cho phÃ©p (${convertSecondsToReadableFormat(maxAllowDuration)}). Vui lÃ²ng bá» chá»n cÃ¡c video nÃ y trÆ°á»›c khi chá»‰nh sá»­a táº¥t cáº£.`,
                            buttons: [
                              {
                                label: 'Bá» video lá»—i vÃ  tiáº¿p tá»¥c',
                                onClick: () => {
                                  // Remove invalid videos and continue with valid ones
                                  const validVideos = chosenVideos.filter(video => video.duration <= maxAllowDuration);
                                  dispatch(actionUpdateChosenVideos(validVideos));
                                  
                                  if (validVideos.length > 0) {
                                    // Open video editor with valid videos only
                                    const editorLink = document.createElement('a');
                                    const baseEditorUrl = VIDEO_EDITOR_URL ?? 'http://localhost:3000';
                                    const videoParams = validVideos.map(video => `type=douyin&id=${video.video_id}&thumbnail=${encodeURIComponent(video.thumbnail)}`).join('&');
                                    editorLink.href = `${baseEditorUrl}?${videoParams}`;
                                    editorLink.target = '_blank';
                                    document.body.appendChild(editorLink);
                                    editorLink.click();
                                    document.body.removeChild(editorLink);
                                  } else {
                                    toast.error('KhÃ´ng cÃ³ video há»£p lá»‡ Ä‘á»ƒ chá»‰nh sá»­a');
                                  }
                                },
                              },
                              {
                                label: 'Äá»“ng Ã½',
                                onClick: () => {},
                              },
                            ],
                          });
                          return;
                        }
                        
                        // Open video editor with all chosen videos (all are valid)
                        const editorLink = document.createElement('a');
                        const baseEditorUrl = VIDEO_EDITOR_URL ?? 'http://localhost:3000';
                        const videoParams = chosenVideos.map(video => `type=douyin&id=${video.video_id}&thumbnail=${encodeURIComponent(video.thumbnail)}`).join('&');
                        editorLink.href = `${baseEditorUrl}?${videoParams}`;
                        editorLink.target = '_blank';
                        document.body.appendChild(editorLink);
                        editorLink.click();
                        document.body.removeChild(editorLink);
                      }}
                      disabled={chosenVideos.length === 0}
                    >
                      Sá»­a video Ä‘ang chá»
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          {/* list channel or video */}
          <div className="list mt-3">
            {isShowChannels ? (
              channels.length > 0 ? (
                <div>
                  <div
                    className={`list_channel gap-3 grid grid-cols-2 ${
                      leftOpen ? '' : 'xl:grid-cols-3'
                    }`}
                  >
                    {channels?.map((channel) => (
                      <Fragment key={channel.sec_uid}>
                        <SingleChannel
                          channel={channel}
                          isSearch={true}
                          isSchedule={isSchedule}
                        />
                      </Fragment>
                    ))}
                  </div>
                  {nextIsLoading && <LoadingApp />}
                  <div className="text-center mt-3">
                    {searchChannel && searchChannel.has_next > 0 && (
                      <button
                        className="bg-primary text-white px-4 py-2 rounded-md w-1/2"
                        onClick={() => getMoreChannels()}
                      >
                        Xem thÃªm
                      </button>
                    )}
                  </div>
                </div>
              ) : isLoading && isArrayEmpty(channels) ? (
                <LoadingApp />
              ) : (
                <div className="text-base text-center p-4">
                  KhÃ´ng tÃ¬m tháº¥y káº¿t quáº£ phÃ¹ há»£p
                </div>
              )
            ) : (
              <></>
            )}

            {isShowVideos ? (
              <div className="videoContainer">
                {/* tmp hide this title */}
                {/* show title of video type */}
                <div className="title w-full text-center py-3 hidden">
                  {renderTitle(videoType?.type, videoType?.name)}
                </div>

                {videos.length > 0 && !isLoading ? (
                  <div>
                    {isAuto && (
                      <div className="flex gap-2 items-center mb-2 z-10 bg-white py-2 sticky border-b top-0">
                        <div className="actions">
                          <button
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-3 text-blue-600 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 font-bold mr-1"
                            onClick={() => onSelectAll()}
                          >
                            Chá»n toÃ n bá»™
                          </button>
                          <button
                            className="border-2 border-gray-200 bg-gray-100 hover:bg-blue-50 py-3 px-4 text-gray-500 rounded-md"
                            onClick={() => onUnSelectAll()}
                          >
                            Bá» chá»n
                          </button>
                        </div>
                        <div className="summary mb-2 ml-auto text-base">
                          <span>Sá»‘ bÃ i viáº¿t Ä‘Ã£ chá»n: </span>
                          <span className="font-bold">
                            {autoWaitingList?.contents?.length || 0}
                          </span>
                        </div>
                      </div>
                    )}
                    <div
                      className={`list_video grid gap-2 grid-cols-2 ${
                        isSchedule
                          ? !leftOpen
                            ? 'lg:grid-cols-3'
                            : ''
                          : !leftOpen
                          ? 'lg:grid-cols-3 xl:grid-cols-4'
                          : 'lg:grid-cols-3 md:grid-cols-3'
                      }`}
                    >
                      {videos?.map((video, index) => (
                        <Fragment key={video.video_id}>
                          <SingleVideo
                            key={index}
                            video={video}
                            handleAction={handleAction}
                            isChosen={checkVideoIsChosen(video)}
                            isSchedule={isSchedule}
                            isAuto={isAuto}
                            handleAddToWaitingList={handleAddToWaitingList}
                          />
                        </Fragment>
                      ))}
                    </div>
                    {nextIsLoading && <LoadingApp />}
                    <div className="text-center mt-3">
                      {currentCollectionId === 0 ? (
                        videoNextOffset !== 0 && hasMore ? (
                          <button
                            className="bg-primary text-white px-4 py-2 rounded-md w-1/2"
                            onClick={() => getMoreVideos()}
                          >
                            Xem thÃªm
                          </button>
                        ) : null
                      ) : hasMore ? (
                        <button
                          className="bg-primary text-white px-4 py-2 rounded-md w-1/2"
                          onClick={() => getMoreVideos()}
                        >
                          Xem thÃªm
                        </button>
                      ) : null}
                    </div>
                  </div>
                ) : isArrayEmpty(videos) && !isLoading ? (
                  <LoadingApp />
                ) : (
                  <div className="text-base text-center p-4">
                    KhÃ´ng tÃ¬m tháº¥y káº¿t quáº£ phÃ¹ hÆ¡p
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
      <DetailDouyin
        open={open}
        setOpen={handleClosePopup}
        // @ts-ignore
        handleClosePopup={handleClosePopup}
        obj={objSelect}
        isShowCollectionActions={isShowCollectionActions}
      />
    </div>
  );
};

export default RightPart;



