import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFacebookDestinations,
  getScheduleContents,
  getScheduledContents,
  getSchedules,
  getThreadsInfo,
  getTikTokInfo,
  setCurrentDateTime,
  setCurrentScheduleContent,
  setIsShowFinalStep,
  setSelectedScheduleContent,
  setShowSourceIdeasPopup,
} from '@/store/actions/Schedules';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import Destinations from '@/Destinations';
import ListSchedules from '@/ListSchedules';
import { toast } from 'react-toastify';
import { destructScheduleContent } from '@/helpers';
import { userServices } from '@/../../services/users';
import CustomizeContent from '@/CustomizeContent';
import AutoComments from '@/AutoComments';
import moment from 'moment';
import { OK } from '@/../../configs';
import { FiX } from 'react-icons/fi';
const defaultCommentItem = {
  id: 1,
  message: '',
};

const FinalStep = (props) => {
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [scheduleName, setScheduleName] = useState('');
  const [replaceContent, setReplaceContent] = useState('');
  const [isReels, setIsReels] = useState(false);
  const [isAddSource, setIsAddSource] = useState(false);
  const [isDisableSubmit, setIsDisableSubmit] = useState(false);
  const [isAutoComment, setIsAutoComment] = useState(false);
  const [listComments, setListComments] = useState([defaultCommentItem]);
  const [isRandomCharactersComment, setIsRandomCharactersComment] =
    useState(false);
  const [isRandomEmojisComment, setIsRandomEmojisComment] = useState(false);
  const [isRandomPresets, setIsRandomPresets] = useState(false);
  const [hasThreads, setHasThreads] = useState(false);
  const [isAllThreads, setIsAllThreads] = useState(false);
  const [hasMaxThreadsMedias, setHasMaxThreadsMedias] = useState(false);
  const [hasMaxThreadsMessage, setHasMaxThreadsMessage] = useState(false);

  const {
    listDestinations = null,
    isDestinationLoading = false,
    selectedScheduleContent,
    selectedDateTime,
    currentEditingContent = null,
    valueMonday,
    valueSunday,
    currentSchedule = null,
  // @ts-ignore
  } = useSelector((state) => state.schedules);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedDestinations && selectedDestinations.length > 0) {
      const hasThreads = selectedDestinations.find(
        (item) => item.type === 'threads'
      );
      setIsAllThreads(hasThreads && selectedDestinations.length === 1);
      setHasThreads(hasThreads ? true : false);
    } else {
      setHasThreads(false);
      setIsAllThreads(false);
    }
  }, [selectedDestinations]);

  useEffect(() => {
    if (replaceContent) {
      setHasMaxThreadsMessage(replaceContent.length > 500);
    } else {
      setHasMaxThreadsMessage(selectedScheduleContent?.post_text?.length > 500);
    }
  }, [replaceContent, selectedScheduleContent]);

  useEffect(() => {
    setHasMaxThreadsMedias(
      selectedScheduleContent?.medias?.length > 20 || false
    );
  }, [selectedScheduleContent]);

  useEffect(() => {
    if (currentEditingContent) {
      const {
        comments = [],
        schedule_id = '',
        date_publish = '',
        destination_id = '',
        type = 'fanpage',
        is_reels = false,
        replaced_post_text = '',
        is_random_characters_comment = 0,
        is_random_emojies_comment = 0,
      } = currentEditingContent;
      setIsRandomCharactersComment(is_random_characters_comment);
      setIsRandomEmojisComment(is_random_emojies_comment);
      setListComments(comments);
      if (comments.length > 0) {
        setIsAutoComment(true);
      }
      setIsReels(is_reels);
      setSelectedDestinations([{ id: destination_id, type: type }]);
      setReplaceContent(replaced_post_text);
      setSelectedSchedule(schedule_id);
      dispatch(setCurrentDateTime(new Date(date_publish)));
    } else {
      setIsReels(selectedScheduleContent?.is_reels ?? false);
    }
  }, [currentEditingContent, dispatch, selectedScheduleContent]);

  const reloadDestinations = () => {
    dispatch(getFacebookDestinations());
    dispatch(getThreadsInfo());
    dispatch(getTikTokInfo());
  };

  useEffect(() => {
    if (!listDestinations) {
      reloadDestinations();
    }
  }, [dispatch, listDestinations]);

  const handleClickGoBack = useCallback(() => {
    confirmAlert({
      title: 'XÃ¡c nháº­n',
      message: 'Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n huá»· lÃªn lá»‹ch?',
      buttons: [
        {
          label: 'XÃ¡c nháº­n',
          onClick: () => {
            dispatch(setCurrentScheduleContent(null));
            dispatch(setSelectedScheduleContent(null));
            dispatch(setIsShowFinalStep(false));
            dispatch(setShowSourceIdeasPopup(true));
          },
        },
        {
          label: 'Huá»·',
          onClick: () => {},
        },
      ],
    });
  }, []);

  const handleClickBg = useCallback(() => {
    confirmAlert({
      title: 'XÃ¡c nháº­n',
      message: 'Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n huá»· lÃªn lá»‹ch?',
      buttons: [
        {
          label: 'XÃ¡c nháº­n',
          onClick: () => {
            dispatch(setCurrentScheduleContent(null));
            dispatch(setSelectedScheduleContent(null));
            dispatch(setIsShowFinalStep(false));
            dispatch(setShowSourceIdeasPopup(false));
          },
        },
        {
          label: 'Huá»·',
          onClick: () => {},
        },
      ],
    });
  }, []);

  const onClickDestination = useCallback(
    (destinationId, type) => {
      const searchResult = selectedDestinations.filter(
        (item) => item.id === destinationId
      );
      if (searchResult.length) {
        setSelectedDestinations(
          selectedDestinations.filter((item) => item.id !== destinationId)
        );
      } else {
        setSelectedDestinations([
          ...selectedDestinations,
          { id: destinationId, type: type },
        ]);
      }
    },
    [selectedDestinations]
  );

  useEffect(() => {
    if (selectedScheduleContent) {
      let replaceContent = '';
      if (
        selectedScheduleContent?.source_type === 'tiktok' ||
        selectedScheduleContent?.source_type === 'douyin' ||
        selectedScheduleContent?.source_type === 'instagram'
      ) {
        replaceContent = selectedScheduleContent?.text;
      } else {
        replaceContent = selectedScheduleContent?.post_text;
      }
      if (replaceContent)
        replaceContent = replaceContent.replace(/<br\s*\\?>/g, '\r\n');
      setReplaceContent(replaceContent);
    }
  }, []);

  const onConfirmSchedule = () => {
    let isError = false;
    let message = '';
    if (!scheduleName && !selectedSchedule) {
      isError = true;
      message = 'Vui lÃ²ng chá»n hoáº·c thÃªm lá»‹ch má»›i';
    } else {
      if (selectedDestinations.length === 0) {
        isError = true;
        message = 'Vui lÃ²ng chá»n má»™t nÆ¡i Ä‘á»ƒ lÃªn bÃ i viáº¿t';
      }
    }
    // check date publish is in the past 10 minutes
    if (moment(selectedDateTime).isBefore(moment().add(5, 'minutes'))) {
      isError = true;
      message =
        'Thá»i gian Ä‘Äƒng bÃ i pháº£i lá»›n hÆ¡n thá»i gian hiá»‡n táº¡i Ã­t nháº¥t 5 phÃºt';
    }
    if (isError) {
      toast.error(message);
    } else {
      setIsDisableSubmit(true);
      let destructedData = [];
      // prepare data for update exist schedule content
      if (currentEditingContent) {
        let customContent = {
          ...currentEditingContent.source_content,
          source_type: currentEditingContent.source_type,
        };
        if (currentEditingContent?.source_type === 'tiktok') {
          customContent = {
            ...customContent,
            feed_username: currentEditingContent?.feed_name,
            post_id: currentEditingContent?.content_id,
          };
        }
        // @ts-ignore
        destructedData = destructScheduleContent({
          selectedScheduleContent: customContent,
          selectedSchedule,
          scheduleName,
          selectedDestinations,
          selectedDateTime: moment(selectedDateTime).format(
            'YYYY-MM-DD HH:mm:ss'
          ),
          replaceContent,
          isReels,
          isAddSource,
          isAutoComment,
          listComments,
          isRandomCharactersComment,
          isRandomEmojisComment,
          scheduleContentId: currentEditingContent.id,
          isRandomPresets,
        });
      } else {
        // @ts-ignore
        destructedData = destructScheduleContent({
          selectedScheduleContent,
          selectedSchedule,
          scheduleName,
          selectedDestinations,
          selectedDateTime,
          replaceContent,
          isReels,
          isAddSource,
          isAutoComment,
          listComments,
          isRandomCharactersComment,
          isRandomEmojisComment,
          isRandomPresets,
        });
      }
      try {
        userServices.createScheduleContent(destructedData).then((res) => {
          const { status, data = null } = res;
          if (status === OK) {
            const { success = false, message = '' } = data ?? {};
            if (success === false) {
              toast.error(message);
              setIsDisableSubmit(false);
            } else {
              setIsDisableSubmit(false);
              confirmAlert({
                title: 'ThÃ nh cÃ´ng',
                message:
                  'ÄÃ£ lÃªn lá»‹ch thÃ nh cÃ´ng, báº¡n cÃ³ muá»‘n lÃªn lá»‹ch tiáº¿p khÃ´ng?',
                buttons: [
                  {
                    label: 'Tiáº¿p tá»¥c',
                    onClick: () => {
                      dispatch(setCurrentScheduleContent(null));
                      dispatch(setSelectedScheduleContent(null));
                      dispatch(setIsShowFinalStep(false));
                      dispatch(setShowSourceIdeasPopup(true));

                      // reload scheduled contents
                      if ((valueMonday && valueSunday) || currentSchedule) {
                        const fromDate =
                          moment(valueMonday).format('YYYY-MM-DD');
                        const toDate = moment(valueSunday).format('YYYY-MM-DD');
                        dispatch(
                          getScheduleContents(
                            0,
                            '',
                            fromDate,
                            toDate,
                            currentSchedule
                          )
                        );
                      }
                      dispatch(getScheduledContents());
                      // reload schedules
                      dispatch(getSchedules(1));
                    },
                  },
                  {
                    label: 'Vá» lá»‹ch tá»•ng',
                    onClick: () => {
                      window.location.reload();
                    },
                  },
                ],
              });
            }
          } else {
            toast.error('Vui lÃ²ng liÃªn há»‡ vá»›i chÃºng tÃ´i Ä‘á»ƒ Ä‘Æ°á»£c há»— trá»£');
            setIsDisableSubmit(false);
          }
        });
      } catch (error) {
        toast.error(error.message);
        setIsDisableSubmit(false);
      }
    }
  };

  return (
    <div className="finalStepContainer fixed left-0 top-0 z-9999 w-full h-screen">
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none max-h-screen">
        <div className="relative w-full mx-auto min-h-full p-4">
          {isDisableSubmit && (
            <div className="absolute h-full w-full z-10 flex justify-center items-center bg-opacity-50 bg-gray-700">
              <div className="relative">
                <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-t-2 border-gray-600"></div>
                <label className="absolute top-1/3 z-10 w-0 h-0 overflow-hidden">
                  Loading ...
                </label>
              </div>
            </div>
          )}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between px-2 py-4 border-b border-solid border-gray-300 rounded-t">
              <div className="bg-gray-50  text-sm overflow-hidden pt-3 pb-3 flex1 justify-between border-l-4 border-green-500 pl-2 w-full">
                <p className="font-bold uppercase text-base">
                  LÃªn lá»‹ch Ä‘Äƒng bÃ i
                </p>
              </div>
            </div>
            {/*body*/}
            <div
              className="relative p-6 overflow-auto"
              style={{
                maxHeight: 'calc(100vh - 200px)',
              }}
            >
              <div className="w-full border-b pb-4 mb-4">
                <ListSchedules
                  selectedSchedule={selectedSchedule}
                  setSelectedSchedule={setSelectedSchedule}
                  scheduleName={scheduleName}
                  setScheduleName={setScheduleName}
                />
              </div>
              <div className="w-full border-b pb-4 mb-4">
                {isDestinationLoading && (
                  <div className="flex justify-center items-center relative">
                    <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-t-2 border-gray-600"></div>
                    <label className="absolute top-1/3 z-10 w-0 h-0 overflow-hidden">
                      Loading ...
                    </label>
                  </div>
                )}

                {!isDestinationLoading && (
                  <Destinations
                    reloadDestinations={reloadDestinations}
                    selectedDestinations={selectedDestinations}
                    onClickDestination={onClickDestination}
                    setSelectedDestinations={setSelectedDestinations}
                  />
                )}
              </div>
              <div className="w-full border-b pb-4 mb-4">
                <CustomizeContent
                  replaceContent={replaceContent}
                  setReplaceContent={setReplaceContent}
                  isReels={isReels}
                  setIsReels={setIsReels}
                  isAddSource={isAddSource}
                  setIsAddSource={setIsAddSource}
                  isRandomPresets={isRandomPresets}
                  setIsRandomPresets={setIsRandomPresets}
                  hasThreads={hasThreads}
                />
              </div>
              <div className="w-full border-b pb-4 mb-4">
                <AutoComments
                  isAutoComment={isAutoComment}
                  setIsAutoComment={setIsAutoComment}
                  listComments={listComments}
                  setListComments={setListComments}
                  isRandomCharacters={isRandomCharactersComment}
                  setIsRandomCharacters={setIsRandomCharactersComment}
                  isRandomEmojis={isRandomEmojisComment}
                  setIsRandomEmojis={setIsRandomEmojisComment}
                  hasThreads={hasThreads}
                />
              </div>
            </div>
            {/* footer */}
            {hasThreads ? (
              <div className="w-full border-t p-4">
                {hasMaxThreadsMessage ? (
                  <p className="text-red-500 italic py-1 flex gap-2 font-bold items-center pl-2">
                    <FiX className="" />
                    <span>
                      Content Threads cá»§a báº¡n Ä‘ang vÆ°á»£t quÃ¡ 500 kÃ½ tá»±, há»‡ thá»‘ng
                      sáº½ tá»± Ä‘á»™ng cáº¯t bá»›t ná»™i dung
                    </span>
                  </p>
                ) : null}
                {hasMaxThreadsMedias ? (
                  <p className="text-red-500 italic py-1 flex gap-2 font-bold items-center pl-2">
                    <FiX className="" />
                    <span>
                      Content Threads cá»§a báº¡n Ä‘ang vÆ°á»£t quÃ¡ 20 bá»©c áº£nh, há»‡ thá»‘ng
                      sáº½ tá»± Ä‘á»™ng láº¥y 20 bá»©c áº£nh Ä‘áº§u tiÃªn Ä‘á»ƒ Ä‘Äƒng
                    </span>
                  </p>
                ) : null}
              </div>
            ) : null}
            <div className="mx-4 mb-4 flex gap-4 sticky bottom-0 bg-white p-3">
              <button
                className="border-2 border-gray-200 bg-gray-100 hover:bg-blue-50 py-3 px-4 text-gray-500 rounded-md"
                onClick={() => handleClickBg()}
              >
                Huá»·
              </button>
              <button
                className="border-2 border-gray-200 bg-gray-100 hover:bg-blue-50 py-3 px-4 text-gray-500 rounded-md"
                onClick={() => handleClickGoBack()}
              >
                Quay láº¡i
              </button>
              <button
                className="border-2 border-gray-200 bg-blue-800 hover:bg-blue-400 py-3 px-4 text-white rounded-md"
                onClick={() => onConfirmSchedule()}
                disabled={isDisableSubmit}
              >
                LÃªn lá»‹ch
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default FinalStep;


