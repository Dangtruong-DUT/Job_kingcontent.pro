import React, { useCallback, useEffect, useState } from 'react';
import NewComment from '@/NewComment';
import { FaPlusCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setScheduleCommentsWaitingList } from '@/../../../../store/actions/Schedules';
const defaultNewComment = {
  id: 1,
  message: '',
  is_random_characters: true,
  is_random_emojis: true,
};

const maxComments = 3;

const NewComments = () => {
  const { scheduleCommentsWaitingList } = useSelector(
    // @ts-ignore
    (state) => state.schedules
  );
  const dispatch = useDispatch();
  const [isShowAddMore, setIsShowAddMore] = useState(true);

  useEffect(() => {
    if (scheduleCommentsWaitingList?.comments?.length >= maxComments) {
      setIsShowAddMore(false);
    } else {
      setIsShowAddMore(true);
    }
  }, [scheduleCommentsWaitingList]);

  const onAddComment = useCallback(() => {
    const { comments = [] } = scheduleCommentsWaitingList;
    dispatch(
      setScheduleCommentsWaitingList({
        ...scheduleCommentsWaitingList,
        comments: [
          ...comments,
          { ...defaultNewComment, id: getMaxId(comments) + 1 },
        ],
      })
    );
  }, [scheduleCommentsWaitingList]);

  const onRemoveComment = useCallback(
    (id) => {
      const { comments = [] } = scheduleCommentsWaitingList;
      const newListComments = comments.filter((comment) => {
        return comment.id !== id;
      });
      dispatch(
        setScheduleCommentsWaitingList({
          ...scheduleCommentsWaitingList,
          comments: newListComments,
        })
      );
    },
    [scheduleCommentsWaitingList]
  );

  const getMaxId = (listComments) => {
    let maxId = 0;
    listComments.forEach((comment) => {
      if (comment.id > maxId) maxId = comment.id;
    });
    return maxId;
  };

  return (
    <div className="newCommentsContainer">
      <div className="commentsHeader flex gap-3 items-center text-center mb-2 font-bold">
        <div className="w-6/12">Comment</div>
        <div className="w-2/12">ThÃªm kÃ½ tá»±</div>
        <div className="w-2/12">ThÃªm biá»ƒu tÆ°á»£ng</div>
        <div className="w-2/12">Thao tÃ¡c</div>
      </div>
      <div className="listComments">
        {scheduleCommentsWaitingList.comments &&
          scheduleCommentsWaitingList.comments.length > 0 &&
          scheduleCommentsWaitingList.comments.map((comment, index) => {
            return (
              <div key={index}>
                <NewComment
                  comment={comment}
                  index={index}
                  onRemoveComment={onRemoveComment}
                />
              </div>
            );
          })}
      </div>
      {isShowAddMore ? (
        <button className="mt-4" onClick={() => onAddComment()}>
          <FaPlusCircle size={40} className="text-primary" />
        </button>
      ) : (
        <div className="mt-4 text-red-500 font-bold uppercase text-base">
          Äá»ƒ háº¡n cháº¿ Facebook gáº¯n nhÃ£n Spam, vui lÃ²ng chá»‰ lÃªn lá»‹ch Ä‘Äƒng tá»‘i Ä‘a 3 bÃ¬nh luáº­n/1 bÃ i viáº¿t/ngÃ y
        </div>
      )}
    </div>
  );
};

export default NewComments;

