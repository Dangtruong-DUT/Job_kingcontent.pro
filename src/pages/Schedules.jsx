import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import SchedulesContents from '@/components/Schedules';
import './styleSchedules.css';

function Schedules(props) {
  return (
    <>
      <Helmet>
        <title>Káº¿ hoáº¡ch Ä‘Äƒng bÃ i</title>
      </Helmet>
      <SchedulesContents />
    </>
  );
}

export default React.memo(Schedules);

