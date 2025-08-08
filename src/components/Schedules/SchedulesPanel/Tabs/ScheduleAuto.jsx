﻿import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GrPieChart } from 'react-icons/gr';
import {
  setShowSchedulesPane,
  setShowReportPane,
} from '@/store/actions/Schedules';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { VscCalendar } from 'react-icons/vsc';
import { setShowSourceIdeasAutoPopup } from '@/../../../store/actions/Schedules';

const ScheduleAuto = (props) => {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(setShowSourceIdeasAutoPopup(true));
  }, [dispatch]);

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer inline-block px-2 py-2 ml-0.5 rounded-t-md font-bold select-none uppercase border bg-red-500 text-white hover:bg-white hover:text-red-500 border-red-500 "
    >
      <div className="flex items-center">
        <VscCalendar className="h-6 w-6" />
        <span className="ml-2">LÃªn lá»‹ch tá»± Ä‘á»™ng</span>
      </div>
    </div>
  );
};

export default React.memo(ScheduleAuto);

