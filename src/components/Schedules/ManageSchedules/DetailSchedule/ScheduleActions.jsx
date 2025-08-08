import React, { useEffect, useState } from 'react';
import pauseIcon from '@/../../../assets/images/icon/schedules/pause.png';
import playIcon from '@/../../../assets/images/icon/schedules/play.png';
import binIcon from '@/../../../assets/images/icon/schedules/bin.png';
import { confirmAlert } from 'react-confirm-alert';
import { useDispatch } from 'react-redux';
import { removeScheduleContents, updateScheduleContentsStatus } from '@/../../../store/actions/Schedules';
import { MANAGE_GET_SCHEDULE_CONTENTS_SUCCESS } from '@/../../../store/types/schedules';

const ScheduleActions = (props) => {
  const {listSelected = [], contents = []} = props;
  const [hasPause, setHasPause] = useState(false);
  const [hasWaiting, setHasWaiting] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // check if listSelected has pause or waiting
    if(listSelected && listSelected.length > 0){
      let hasPause = listSelected.find(item => item.status === 3);
      let hasWaiting = listSelected.find(item => item.status === 2);
      setHasPause(hasPause);
      setHasWaiting(hasWaiting);
    }else{
      setHasPause(false);
      setHasWaiting(false);
    }
  }, [listSelected]);

  const handlePause = () => {
    confirmAlert({
      title: 'Táº¡m dá»«ng Ä‘Äƒng bÃ i',
      message: 'Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n táº¡m dá»«ng táº¥t cáº£ cÃ¡c bÃ i Ä‘Ã£ chá»n? LÆ°u Ã½: chÃºng tÃ´i sáº½ chá»‰ táº¡m dá»«ng cÃ¡c bÃ i Ä‘Ã£ chá»n vÃ  Ä‘ang á»Ÿ tráº¡ng thÃ¡i chá» lÃªn bÃ i.',
      buttons: [
        {
          label: 'Äá»“ng Ã½',
          onClick: () => {
            const ids = listSelected.map(item => item.id);
            dispatch(updateScheduleContentsStatus(0, ids, 3));
            // update status of these contents from reducer
            const newContents = contents.map(content => {
              if (ids.includes(content.id)) {
                return {
                  ...content,
                  status: content.status === 2 ? 3 : content.status,
                }
              }
              return content;
            });
            dispatch({
              type: MANAGE_GET_SCHEDULE_CONTENTS_SUCCESS,
              payload: newContents,
            });
          }
        },
        {
          label: 'Há»§y',
          onClick: () => {}
        }
      ]
    });
  }

  const handlePlay = () => {
    confirmAlert({
      title: 'Tiáº¿p tá»¥c Ä‘Äƒng bÃ i',
      message: 'Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n tiáº¿p tá»¥c Ä‘Äƒng táº¥t cáº£ cÃ¡c bÃ i Ä‘Ã£ chá»n? LÆ°u Ã½: chÃºng tÃ´i sáº½ chá»‰ Ä‘Äƒng bÃ i Ä‘Ã£ chá»n vÃ  Ä‘ang á»Ÿ tráº¡ng thÃ¡i táº¡m dá»«ng.',
      buttons: [
        {
          label: 'Äá»“ng Ã½',
          onClick: () => {
            const ids = listSelected.map(item => item.id);
            dispatch(updateScheduleContentsStatus(0, ids, 2));
            // update status of these contents from reducer
            const newContents = contents.map(content => {
              if (ids.includes(content.id)) {
                return {
                  ...content,
                  status: content.status === 3 ? 2 : content.status,
                }
              }
              return content;
            });
            dispatch({
              type: MANAGE_GET_SCHEDULE_CONTENTS_SUCCESS,
              payload: newContents,
            });
          }
        },
        {
          label: 'Há»§y',
          onClick: () => {}
        }
      ]
    });
  }

  const handleDelete = () => {
    confirmAlert({
      title: 'XÃ³a bÃ i Ä‘Äƒng',
      message: 'Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n xÃ³a táº¥t cáº£ cÃ¡c bÃ i Ä‘Ã£ chá»n? Dá»¯ liá»‡u Ä‘Ã£ xÃ³a khÃ´ng thá»ƒ khÃ´i phá»¥c.',
      buttons: [
        {
          label: 'Äá»“ng Ã½',
          onClick: () => {
            const ids = listSelected.map(item => item.id);
            dispatch(removeScheduleContents(ids));
            // remove these contents from reducer
            const newContents = contents.filter(content => !ids.includes(content.id));
            dispatch({
              type: MANAGE_GET_SCHEDULE_CONTENTS_SUCCESS,
              payload: newContents,
            });
          }
        },
        {
          label: 'Há»§y',
          onClick: () => {}
        }
      ]
    });
  }

  return (
    <div className="flex gap-2 items-center">
      {/* total selected */}
      <p>Báº¡n Ä‘Ã£ chá»n <span className="font-bold">{listSelected.length}</span> / <span className="font-bold">{contents.length}</span></p>
      {/* actions */}
      {hasPause && <img className="w-6 h-6 cursor-pointer" src={playIcon} alt="play" title="Tiáº¿p tá»¥c Ä‘Äƒng bÃ i" onClick={handlePlay} />}
      {hasWaiting && <img className="w-6 h-6 cursor-pointer" src={pauseIcon} alt="pause" title="Táº¡m dá»«ng Ä‘Äƒng bÃ i" onClick={handlePause} />}
      <img className="w-6 h-6 cursor-pointer" src={binIcon} alt="delete" title="XÃ³a cÃ¡c bÃ i Ä‘Ã£ chá»n" onClick={handleDelete} />
    </div>
  );
};

export default ScheduleActions;

