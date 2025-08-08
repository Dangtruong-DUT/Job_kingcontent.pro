import React, { useCallback, useEffect, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Label } from 'reactstrap';
import { Checkbox, DatePicker, Input } from 'rsuite';
import { setCurrentDateTime } from '@/store/actions/Schedules';
import { CalendarLocaleVn } from '@/../../helpers/date';
import PreviewContent from '@/PreviewContent';

const CustomizeContent = (props) => {
  const {
    setReplaceContent,
    replaceContent,
    isReels,
    setIsReels,
    isAddSource,
    setIsAddSource,
    isRandomPresets,
    setIsRandomPresets,
    hasThreads,
  } = props;
  const [isShowBody, setIsShowBody] = useState(false);
  const [previewContent, setPreviewContent] = useState({});

  const listSourceTypeIgnoreSource = ['user', 'event_content', 'chatgpt', 'video_editor', 'video_ai'];

  const { selectedScheduleContent, selectedDateTime, currentEditingContent } =
    // @ts-ignore
    useSelector((state) => state.schedules);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentEditingContent) {
      const { source_content = null } = currentEditingContent;
      setPreviewContent({
        ...source_content,
        post_id: currentEditingContent?.content_id,
        feed_name: currentEditingContent?.feed_name,
        thumbnail: currentEditingContent?.thumbnail,
        schedule_content_id: currentEditingContent?.id,
        source_type: currentEditingContent?.source_type,
      });
    } else {
      setPreviewContent(selectedScheduleContent);
    }
  }, [currentEditingContent, selectedScheduleContent]);

  const onClickShowBody = useCallback(() => {
    setIsShowBody((state) => !state);
  }, []);

  const onChangeReplaceContent = useCallback((newContent) => {
    setReplaceContent(newContent);
  }, []);

  const onChangeIsReels = useCallback(() => {
    setIsReels(!isReels);
  }, [isReels]);

  const onChangeIsAddSource = useCallback(() => {
    setIsAddSource(!isAddSource);
  }, [isAddSource]);

  const onDateChanged = useCallback((date) => {
    dispatch(setCurrentDateTime(date));
  }, []);

  return (
    <div className="customizeContentContainer overflow-hidden">
      <div
        className="title p-3 font-bold text-base uppercase mb-2 cursor-pointer border rounded-md flex items-center"
        onClick={() => onClickShowBody()}
      >
        <h4>Chá»‰nh sá»­a bÃ i viáº¿t trÆ°á»›c khi Ä‘Äƒng</h4>
        {isShowBody ? (
          <FaAngleUp className="ml-auto" />
        ) : (
          <FaAngleDown className="ml-auto" />
        )}
      </div>
      <div
        className={`body transition-all duration-300 ease-in-out ${isShowBody ? 'h-auto' : 'h-0'
          }`}
      >
        <div className="flex gap-2">
          <div className="border rounded-md w-4/6 p-3">
            <div className="date flex gap-3 items-center">
              <Label htmlFor="startDate" className="whitespace-nowrap">
                Thá»i gian Ä‘Äƒng bÃ i:
              </Label>
              <DatePicker
                format="DD-MM-YYYY HH:mm"
                defaultValue={new Date()}
                locale={CalendarLocaleVn}
                isoWeek={true}
                className="w-1/2"
                value={selectedDateTime}
                onChange={(date) => onDateChanged(date)}
              />
            </div>
            <div className="my-2">
              <div className="flex justify-between mb-2">
                <label htmlFor="replaceContent" className=" font-bold">
                  Chá»‰nh sá»­a ná»™i dung
                </label>
                {hasThreads ? (
                  <span className="font-bold">
                    (KÃ½ tá»±:{' '}
                    {replaceContent?.length ||
                      // @ts-ignore
                      previewContent?.post_text?.length}
                    )
                  </span>
                ) : null}
              </div>
              <Input
                componentClass="textarea"
                rows={15}
                placeholder="Ná»™i dung Ä‘áº§u bÃ i viáº¿t...."
                id="replaceContent"
                value={
                  // @ts-ignore
                  replaceContent ? replaceContent : previewContent?.post_text
                }
                onChange={(value) => onChangeReplaceContent(value)}
              />
            </div>

            {!listSourceTypeIgnoreSource.includes(
              selectedScheduleContent?.source_type
            ) ? (
              <div>
                <Checkbox
                  name="isAddSource"
                  value={1}
                  checked={isAddSource}
                  onChange={() => onChangeIsAddSource()}
                >
                  Chá»n Ä‘á»ƒ tá»± Ä‘á»™ng thÃªm Nguá»“n bÃ i viáº¿t á»Ÿ cuá»‘i
                </Checkbox>
              </div>
            ) : null}

            {(
              selectedScheduleContent?.source_type === 'tiktok'
              || selectedScheduleContent?.source_type === 'douyin'
              || (selectedScheduleContent?.source_type === 'threads'
                && selectedScheduleContent?.media_type === 'video'
                && !selectedScheduleContent?.isNotReel
              )
              || (['instagram', 'user', 'video_editor'].includes(selectedScheduleContent?.source_type)
                && selectedScheduleContent?.is_reels
              )
              || selectedScheduleContent?.source_type === 'video_ai'
            ) ?
              <div>
                <Checkbox
                  name="isReels"
                  value={1}
                  checked={isReels}
                  onChange={() => onChangeIsReels()}
                  disabled={(selectedScheduleContent?.source_type === 'video_ai' && !selectedScheduleContent?.is_reels)}
                >
                  ÄÄƒng dáº¡ng reels
                </Checkbox>
                {(selectedScheduleContent?.source_type === 'video_ai' && !selectedScheduleContent?.is_reels) && (
                  <span className="text-xs text-gray-400 ml-2 italic">(Video nÃ y chá»‰ Ä‘Äƒng Ä‘Æ°á»£c á»Ÿ cháº¿ Ä‘á»™ thÆ°á»ng, video Reels pháº£i Ä‘áº¡t Ä‘iá»u kiá»‡n kÃ­ch thÆ°á»›c 9:16 vÃ  tá»‘i Ä‘a 90s)</span>
                )}
              </div>
              : null}

            {selectedScheduleContent?.source_type === 'user' && false ? (
              <Checkbox
                name="isRandomPresets"
                value={1}
                checked={isRandomPresets}
                onChange={() => setIsRandomPresets(!isRandomPresets)}
              >
                Chá»n Ä‘á»ƒ tá»± Ä‘á»™ng thÃªm mÃ u ná»n (Chá»‰ Ã¡p dá»¥ng cho bÃ i viáº¿t khÃ´ng cÃ³
                áº£nh / video)
              </Checkbox>
            ) : null}
          </div>

          <PreviewContent
            content={previewContent}
            replaceContent={replaceContent}
            isAddSource={isAddSource}
          />
        </div>
      </div>
    </div>
  );
};
export default CustomizeContent;


