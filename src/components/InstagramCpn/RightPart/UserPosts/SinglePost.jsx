import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import InstagramIcon from '@/../../../assets/images/icon/main-menu/menu-icon-instagram.png';
import { convertInstagramLink } from '@/../../../helpers';
import { FiPlay } from 'react-icons/fi';
import {
  checkInInstagramCollection,
  kFormatter,
} from '@/../../../utils/utilityFunc';
import { FiMessageCircle, FiThumbsUp } from 'react-icons/fi';
import {
  actionGetCollectionPosts,
  actionGetCollections,
  actionRemoveCollection,
  actionRemovePostsFromCollection,
  actionSaveUser,
  actionSetCurrentContent,
  actionUpdateChosenPosts,
} from '@/../../../store/actions/instagram';
import {
  FaClock,
  FaCheck,
  FaCheckSquare,
  FaRegSquare,
  FaTimesCircle,
  FaRegEdit,
  FaPlusCircle,
  FaPencilAlt,
  FaExclamation,
} from 'react-icons/fa';
import { ImEye, ImPlay } from 'react-icons/im';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import addIcons from '@/../../../assets/images/icon/create-content/add.png';
import {
  setIsShowFinalStep,
  setSelectedScheduleContent,
  setShowSourceIdeasPopup,
  setCurrentDateTime,
  setCurrentEditingContent,
} from '@/../../../store/actions/Schedules';
import { actionPushContentToCreateContentScreen } from '@/../../../store/actions/homepage';
import {
  actionUpdateStep1,
  createContentToHomepage,
  resetCreateContent,
} from '@/../../../store/actions/createContent';
import { isArrayEmpty, OK } from '@/../../../configs';
import { instagramService } from '@/../../../services/instagram';
import { formatUnixDate } from '@/../../../helpers/date';

const defaultActions = [
  { icon: ImEye, title: 'Xem chi tiáº¿t', action: 'VIEW_DETAIL_CONTENT' },
  { icon: FaRegEdit, title: 'Soáº¡n tháº£o', action: 'CREATE_CONTENT' },
  { icon: FaRegSquare, title: 'Chá»n', action: 'CHOOSE_POST' },
  { icon: FaClock, title: 'LÃªn lá»‹ch', action: 'SCHEDULE_CONTENT' },
];

const actionFollowChannel = {
  icon: FaPlusCircle,
  title: 'Theo dÃµi kÃªnh',
  action: 'FOLLOW_USER',
};

const collectionActions = [
  {
    icon: ImEye,
    title: 'Xem chi tiáº¿t',
    action: 'VIEW_DETAIL_CONTENT_COLLECTION',
  },
  { icon: FaRegEdit, title: 'Soáº¡n tháº£o', action: 'CREATE_CONTENT_COLLECTION' },
  {
    icon: FaTimesCircle,
    title: 'XoÃ¡ khá»i BST',
    action: 'REMOVE_FROM_COLLECTION',
  },
  { icon: FaClock, title: 'LÃªn lá»‹ch', action: 'SCHEDULE_CONTENT' },
];

const collectionScheduleActions = [
  { icon: ImEye, title: 'Xem chi tiáº¿t', action: 'VIEW_DETAIL_CONTENT' },
  { icon: FaClock, title: 'LÃªn lá»‹ch', action: 'ADD_TO_SCHEDULE' },
];

const collectionScheduleAutoActions = [
  { icon: ImEye, title: 'Xem chi tiáº¿t', action: 'VIEW_DETAIL_CONTENT' },
];

const SinglePost = (props) => {
  const {
    post = {},
    isSchedule = false,
    isAuto = false,
    handleAddToWaitingList = () => {},
  } = props;
  const {
    id = '',
    code = '',
    created = '',
    text = '',
    likes = 0,
    comments = 0,
    user_id = '',
    user_display_name = '',
    username = '',
    user_picture = '',
    images = [],
    videos = [],
    video = null,
    thumbnail: thumb = '',
    is_reels = false,
    media_type = '',
  } = post;

  const [thumbnail, setThumbnail] = useState(InstagramIcon);
  const [isVideo, setIsVideo] = useState(false);
  const [actions, setActions] = useState(defaultActions);
  const [collectionId, setCollectionId] = useState(0);
  const [isChosen, setIsChosen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isSavedUser, setIsSavedUser] = useState(false);
  const [displayPostText, setDisplayPostText] = useState(text || '');
  const [isScheduled, setIsScheduled] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const {
    currentCollection = null,
    collectionPosts = null,
    chosenPosts = [],
    currentHashTag = '',
    savedUsers = null,
  } = useSelector((state) => state.instagram);
  const {
    autoWaitingList,
    editingContents = [],
    scheduledContents = [],
  } = useSelector((state) => state.schedules);

  useEffect(() => {
    if (currentCollection) {
      setActions(collectionActions);
      setCollectionId(0);
    } else {
      // check if video is in collection
      const collId = checkInInstagramCollection(collectionPosts, id);
      if (collId) {
        setActions(collectionActions);
        setCollectionId(collId);
      } else {
        if (currentHashTag) {
          setActions([...defaultActions, actionFollowChannel]);
        } else {
          setActions(defaultActions);
        }
      }
    }
  }, [currentCollection, collectionPosts, id, currentHashTag]);

  useEffect(() => {
    if (savedUsers) {
      const found = savedUsers.find((item) => item.username === username);
      if (found) {
        setIsSavedUser(true);
      } else {
        setIsSavedUser(false);
      }
    }
  }, [savedUsers, username]);

  useEffect(() => {
    if (images.length > 0) {
      const thumb = images[0];
      setThumbnail(convertInstagramLink(thumb));
    } else if (thumb) {
      setThumbnail(convertInstagramLink(thumb));
    }
  }, [images, thumb]);

  useEffect(() => {
    if (videos.length > 0) {
      const thumb = videos[0]?.thumbnail || videos[0]?.thumbail;
      setThumbnail(convertInstagramLink(thumb));
      setIsVideo(true);
    } else {
      if (thumb) {
        setThumbnail(convertInstagramLink(thumb));
      }
      if (media_type === 'video') {
        setIsVideo(true);
      } else {
        setIsVideo(false);
      }
    }
  }, [videos, thumb, media_type]);

  useEffect(() => {
    const index = chosenPosts.findIndex((item) => item.id === id);
    if (index > -1) {
      setIsChosen(true);
    } else {
      setIsChosen(false);
    }
  }, [chosenPosts, id]);

  const handleAction = async (action, collId = 0) => {
    switch (action) {
      case 'FOLLOW_USER':
        // check if user is already followed
        if (isSavedUser) {
          toast.info('KÃªnh nÃ y Ä‘Ã£ Ä‘Æ°á»£c theo dÃµi');
          return;
        }
        toast.info('Äang theo dÃµi kÃªnh, vui lÃ²ng chá» trong giÃ¢y lÃ¡t...');
        const channelData = {
          id: user_id,
          username: username,
          picture: user_picture,
          page_name: user_display_name,
        };
        dispatch(actionSaveUser(channelData));
        break;

      case 'VIEW_DETAIL_CONTENT':
        if (isAuto) {
          post.text = displayPostText;
        }
        dispatch(actionSetCurrentContent(post));
        break;

      case 'VIEW_DETAIL_CONTENT_COLLECTION':
        toast.info('Äang láº¥y thÃ´ng tin bÃ i viáº¿t, vui lÃ²ng chá» trong giÃ¢y lÃ¡t');
        const res = await instagramService.getReelDetail(id, code);
        const { status = 0, data } = res;
        if (status === OK) {
          dispatch(actionSetCurrentContent(data?.data));
        } else {
          toast.error(
            data?.message ||
              'Vui lÃ²ng liÃªn há»‡ nhÃ¢n viÃªn Ä‘á»ƒ Ä‘Æ°á»£c há»— trá»£ tá»‘t hÆ¡n!'
          );
        }
        toast.dismiss();
        break;

      case 'CREATE_CONTENT_COLLECTION':
        if (isVideo) {
          confirmAlert({
            title: 'ThÃ´ng bÃ¡o',
            message: 'Vui lÃ²ng chá»n má»™t hÃ¬nh thá»©c soáº¡n tháº£o bÃ i viáº¿t:',
            buttons: [
              {
                label: 'Chá»‰ láº¥y vÄƒn báº£n',
                onClick: async () => {
                  dispatch(actionUpdateStep1(true));
                  dispatch(resetCreateContent());
                  dispatch(
                    actionPushContentToCreateContentScreen(
                      text,
                      images.map((img) => convertInstagramLink(img)),
                      'text',
                      is_reels
                    )
                  );
                  history.push('/tao-content');
                },
              },
              {
                label: 'Láº¥y vÄƒn báº£n & video',
                onClick: async () => {
                  toast.info(
                    'Äang láº¥y thÃ´ng tin bÃ i viáº¿t, vui lÃ²ng chá» trong giÃ¢y lÃ¡t'
                  );
                  const res = await instagramService.getReelDetail(id, code);
                  const { status = 0, data } = res;
                  if (status === OK) {
                    const { videos = [], is_reels } = data?.data;
                    const videoUrl = videos[0].source || '';
                    const medias = [
                      {
                        type: 'video',
                        url: videoUrl,
                      },
                    ];
                    dispatch(actionUpdateStep1(true));
                    dispatch(resetCreateContent());
                    dispatch(createContentToHomepage({ status: true }));
                    dispatch(
                      actionPushContentToCreateContentScreen(
                        text,
                        medias,
                        'video',
                        is_reels
                      )
                    );
                    history.push('/tao-content');
                  } else {
                    toast.error(
                      data?.message ||
                        'Vui lÃ²ng liÃªn há»‡ nhÃ¢n viÃªn Ä‘á»ƒ Ä‘Æ°á»£c há»— trá»£ tá»‘t hÆ¡n!'
                    );
                  }
                  toast.dismiss();
                },
              },
              {
                label: 'Huá»·',
                onClick: () => {},
              },
            ],
            overlayClassName: 'large-confirmation',
          });
          return;
        }
        toast.info('Äang láº¥y thÃ´ng tin bÃ i viáº¿t, vui lÃ²ng chá» trong giÃ¢y lÃ¡t');
        const res1 = await instagramService.getReelDetail(id, code);
        const { status: status1 = 0, data: data1 } = res1;
        const {
          images: images1 = [],
          is_reels: is_reels1,
          text: text1,
        } = data1?.data;
        if (status1 === OK) {
          dispatch(createContentToHomepage({ status: true }));
          dispatch(actionUpdateStep1(true));
          dispatch(resetCreateContent());
          dispatch(
            actionPushContentToCreateContentScreen(
              text1,
              images1.map((img) => convertInstagramLink(img)),
              images1.length > 0 ? 'image' : 'text',
              is_reels1
            )
          );
          history.push('/tao-content');
        }
        break;

      case 'CREATE_CONTENT':
        if (isVideo) {
          confirmAlert({
            title: 'ThÃ´ng bÃ¡o',
            message: 'Vui lÃ²ng chá»n má»™t hÃ¬nh thá»©c soáº¡n tháº£o bÃ i viáº¿t:',
            buttons: [
              {
                label: 'Chá»‰ láº¥y vÄƒn báº£n',
                onClick: async () => {
                  dispatch(actionUpdateStep1(true));
                  dispatch(resetCreateContent());
                  dispatch(
                    actionPushContentToCreateContentScreen(
                      text,
                      images.map((img) => convertInstagramLink(img)),
                      'text',
                      is_reels
                    )
                  );
                  history.push('/tao-content');
                },
              },
              {
                label: 'Láº¥y vÄƒn báº£n & video',
                onClick: async () => {
                  toast.info('Äang táº£i video, vui lÃ²ng chá» trong chá»‘c lÃ¡t...');
                  const videoUrl = videos[0].source || '';
                  const medias = [
                    {
                      type: 'video',
                      url: videoUrl,
                    },
                  ];
                  dispatch(actionUpdateStep1(true));
                  dispatch(resetCreateContent());
                  dispatch(createContentToHomepage({ status: true }));
                  dispatch(
                    actionPushContentToCreateContentScreen(
                      text,
                      medias,
                      'video',
                      is_reels
                    )
                  );
                  history.push('/tao-content');
                },
              },
              {
                label: 'Huá»·',
                onClick: () => {},
              },
            ],
            overlayClassName: 'large-confirmation',
          });
          return;
        }
        //reset content => replace content
        dispatch(createContentToHomepage({ status: true }));
        dispatch(actionUpdateStep1(true));
        dispatch(resetCreateContent());
        dispatch(
          actionPushContentToCreateContentScreen(
            text,
            images.map((img) => convertInstagramLink(img)),
            images.length > 0 ? 'image' : 'text',
            is_reels
          )
        );
        history.push('/tao-content');
        break;

      case 'CHOOSE_POST':
        if (isChosen) {
          const index = chosenPosts.findIndex((item) => item.id === id);
          if (index > -1) {
            const newChosenPosts = [...chosenPosts];
            newChosenPosts.splice(index, 1);
            dispatch(actionUpdateChosenPosts(newChosenPosts));
          }
        } else {
          dispatch(actionUpdateChosenPosts([...chosenPosts, post]));
        }
        break;

      case 'REMOVE_FROM_COLLECTION':
        const collectionId = collId ? collId : currentCollection.id;
        confirmAlert({
          title: 'ThÃ´ng bÃ¡o',
          message: 'Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n xoÃ¡ bÃ i viáº¿t nÃ y khá»i BST khÃ´ng?',
          buttons: [
            {
              label: 'Cháº¯c cháº¯n',
              onClick: async () => {
                dispatch(actionRemovePostsFromCollection(collectionId, id));
                dispatch(actionGetCollections());
                dispatch(actionGetCollectionPosts());
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
        dispatch(
          setSelectedScheduleContent({
            ...post,
            source_type: 'instagram',
            post_id: post.id,
            feed_name: user_display_name,
            media_type: video || videos.length > 0 ? 'video' : 'image',
          })
        );
        dispatch(setCurrentDateTime());
        dispatch(setIsShowFinalStep(true));
        dispatch(setShowSourceIdeasPopup(false));
        history.push('/lich-dang-bai');
        break;

      default:
        break;
    }
  };

  const handleAddToSchedule = (elt) => {
    dispatch(
      setSelectedScheduleContent({
        ...elt,
        source_type: 'instagram',
        post_id: elt.id,
        feed_name: user_display_name,
        media_type: video || (videos && videos.length > 0) ? 'video' : 'image',
        thumbnail:
          videos && videos.length > 0 ? videos[0].thumbnail : images[0],
      })
    );
    dispatch(setIsShowFinalStep(true));
    dispatch(setShowSourceIdeasPopup(false));
  };

  useEffect(() => {
    if (autoWaitingList) {
      const { contents } = autoWaitingList;
      if (contents.length > 0) {
        const search = contents.find((elt) => elt.code === post.code);
        if (search) {
          setIsSelected(true);
        } else {
          setIsSelected(false);
        }
      } else {
        setIsSelected(false);
      }
    } else {
      setIsSelected(false);
    }
  }, [post, autoWaitingList]);

  useEffect(() => {
    if (editingContents && editingContents.length > 0 && isAuto) {
      const search = editingContents.find(
        (elt) => elt.id === code && elt.source_type === 'instagram'
      );
      if (search) {
        setDisplayPostText(search.text);
      }
    }
  }, [editingContents, code, isAuto]);

  useEffect(() => {
    if (scheduledContents && scheduledContents.length > 0) {
      const search = scheduledContents.find((elt) => {
        return elt?.content_id === post?.id && elt?.source_type === 'instagram';
      });
      if (search) {
        setIsScheduled(true);
      } else {
        setIsScheduled(false);
      }
    } else {
      setIsScheduled(false);
    }
  }, [post, scheduledContents]);

  const handleEditContent = (item) => {
    const editingContent = {
      id: item.code,
      text: displayPostText,
      source_type: 'instagram',
    };
    dispatch(setCurrentEditingContent(editingContent));
  };

  return (
    <div key={id} className="singlePost">
      {isSchedule ? (
        <div className="relative flex gap-2 border border-gray-200 rounded-md cursor-pointer mb-2 p-2">
          {isAuto && (
            <div
              className="w-1/12 flex items-center text-center justify-center"
              onClick={() => handleAddToWaitingList('instagram', post)}
            >
              {isSelected ? (
                <FaCheckSquare className="w-6 text-green-500 text-base" />
              ) : (
                <FaRegSquare className="w-6 text-gray-500 text-base" />
              )}
            </div>
          )}

          {/* add Pencil on top right */}
          {isAuto && (
            <div
              className="absolute top-2 right-2 text-gray-500 cursor-pointer"
              onClick={() => handleEditContent(post)}
            >
              <FaPencilAlt />
            </div>
          )}
          {isScheduled && (
            <span
              className="absolute bottom-3 right-1 text-red-500"
              title="BÃ i viáº¿t Ä‘Ã£ Ä‘Æ°á»£c lÃªn lá»‹ch"
            >
              <FaExclamation />
            </span>
          )}
          <div
            className="thumbnail w-1/3 relative h-40 rounded-md overflow-hidden"
            onClick={() => handleAction('VIEW_DETAIL_CONTENT')}
          >
            <img src={thumbnail} className="w-full h-full object-cover" />
            {images.length > 1 && (
              <div className="absolute inset-0 w-12 h-12 rounded-full bg-opacity-50 bg-black m-auto">
                <span className="h-full flex items-center justify-center text-xl text-white font-semibold">
                  + {images.length - 1}
                </span>
              </div>
            )}
            {isVideo && (
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10">
                <div className="w-20 h-20 opacity-80">
                  <FiPlay className="w-full h-full text-white" />
                </div>
              </div>
            )}
          </div>
          <div
            className="info w-2/3 p-2"
            onClick={() => handleAction('VIEW_DETAIL_CONTENT')}
          >
            {(currentCollection || currentHashTag) && (
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="bg-no-repeat bg-cover w-10 h-10 rounded-full"
                  style={{
                    backgroundImage: `url(${convertInstagramLink(
                      user_picture
                    )})`,
                  }}
                ></div>
                <span className="font-bold">{user_display_name || ''}</span>
              </div>
            )}
            <div className="desc h-16">
              <p className="text-sm font-medium text-gray-700 line-clamp-3">
                {isAuto ? displayPostText : text}
              </p>
            </div>
            <div className="created">
              <span className="text-xs text-gray-500">
                NgÃ y táº¡o: {formatUnixDate(created)}
              </span>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 likes">
                <FiThumbsUp className="w-7 h-7" />
                <span>{kFormatter(likes)}</span>
              </div>
              <div className="flex items-center gap-1 comments">
                <FiMessageCircle className="w-7 h-7" />
                <span>{kFormatter(comments)}</span>
              </div>
            </div>
          </div>
          {!isAuto && (
            <div
              className="w-1/6 ml-auto flex items-center justify-center"
              onClick={() => handleAddToSchedule(post)}
            >
              <img src={addIcons} className="w-8" />
            </div>
          )}
        </div>
      ) : (
        <div className="border border-gray-200 rounded-md cursor-pointer group relative flex mb-2 p-2">
          <div className="thumbnail relative w-1/3 max-h-56 rounded-md overflow-hidden">
            <img
              src={thumbnail}
              alt="thumbnail"
              className="w-full h-full object-cover"
            />

            {images.length > 1 && (
              <div className="absolute inset-0 w-12 h-12 rounded-full bg-opacity-50 bg-black m-auto">
                <span className="h-full flex items-center justify-center text-xl text-white font-semibold">
                  + {images.length - 1}
                </span>
              </div>
            )}

            {isVideo && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-20 h-20 opacity-80">
                  <FiPlay className="w-full h-full text-white" />
                </div>
              </div>
            )}
          </div>
          <div className="info w-2/3 p-2">
            {(currentCollection || currentHashTag) && (
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="bg-no-repeat bg-cover w-10 h-10 rounded-full"
                  style={{
                    backgroundImage: `url(${convertInstagramLink(
                      user_picture
                    )})`,
                  }}
                ></div>
                <span className="font-bold">{user_display_name || ''}</span>
              </div>
            )}
            <div className="desc">
              <p className="text-sm font-medium whitespace-pre-wrap line-clamp-5">
                {text}
              </p>
            </div>
            <div className="created">
              <span className="text-xs text-gray-500">
                NgÃ y táº¡o: {formatUnixDate(created)}
              </span>
            </div>
            <div className="flex items-center gap-5 mt-3">
              <div className="flex items-center gap-1 likes">
                <FiThumbsUp className="w-7 h-7" />
                <span>{kFormatter(likes)}</span>
              </div>
              <div className="flex items-center gap-1 comments">
                <FiMessageCircle className="w-7 h-7" />
                <span>{kFormatter(comments)}</span>
              </div>
            </div>
          </div>
          <div className="rounded-md absolute overflow-hidden bg-createContent-modalOverLayClr left-0 top-0 right-0 h-0 group-hover:h-full transition-height duration-300 ease-linear z-20">
            <div className="h-full w-full flex items-center">
              <ul
                className={`max-w-350 mx-auto ${
                  defaultActions === actions
                    ? 'grid grid-cols-2'
                    : 'grid grid-cols-2'
                }`}
              >
                {actions.map((item, index) => (
                  <li
                    onClick={() => handleAction(item.action, collectionId)}
                    key={index}
                    className={`py-2 px-3 flex items-center cursor-pointer font-medium text-black hover:text-red-500 transition-all duration-200 ease-linear gap-3 ${item.action} hover:bg-createContent-blackClr hover:text-white rounded-md`}
                  >
                    {item.action === 'CHOOSE_POST' && isChosen ? (
                      <FaCheckSquare
                        color="green"
                        className="w-6 h-6 text-gray-100"
                      />
                    ) : item.action === 'FOLLOW_USER' && isSavedUser ? (
                      <FaCheck
                        color="green"
                        className="w-6 h-6 text-gray-100"
                      />
                    ) : (
                      <item.icon className="w-6 h-6 text-gray-100" />
                    )}
                    <a className="no-underline text-base font-medium text-gray-100 hover:text-white transition-all duration-200 ease-linear whitespace-nowrap">
                      {item.action === 'CHOOSE_POST' && isChosen
                        ? 'Bá» chá»n'
                        : item.action === 'FOLLOW_USER' && isSavedUser
                        ? 'ÄÃ£ theo dÃµi'
                        : item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePost;


