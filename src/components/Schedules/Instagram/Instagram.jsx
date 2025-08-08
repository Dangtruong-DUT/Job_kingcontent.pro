import { useDispatch } from 'react-redux';
import React from 'react';
import SearchBox from '@/../InstagramCpn/SearchBox';
import Manage from '@/../InstagramCpn/Manage';

const Instagram = (props) => {
  const { isAuto = false, handleAddToWaitingList = () => {} } = props;

  return (
    <>
      {/* <h2 className='text-center text-red-500 uppercase font-bold text-base py-32'>Chá»©c nÄƒng táº¡m báº£o trÃ¬ Ä‘á»ƒ nÃ¢ng cáº¥p vÃ¬ quÃ¡ táº£i ngÆ°á»i dÃ¹ng! Ráº¥t mong nháº­n Ä‘Æ°á»£c sá»± kiÃªn nháº«n cá»§a quÃ½ khÃ¡ch!</h2> */}
      <SearchBox />
      <Manage
        isSchedule={true}
        isAuto={isAuto}
        handleAddToWaitingList={handleAddToWaitingList}
      />
    </>
  );
};

export default Instagram;

