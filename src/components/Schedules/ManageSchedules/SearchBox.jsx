import React from 'react';
import { Label } from 'reactstrap';
import Select from 'react-select';
import { FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { filter } from 'lodash';
import { confirmAlert } from 'react-confirm-alert';
import { useDispatch } from 'react-redux';
import { removeSchedules } from '@/store/actions/Schedules';

const orderOptions = [
  {
    label: 'Thá»i gian táº¡o',
    value: 'date',
  },
  {
    label: 'TÃªn',
    value: 'name',
  },
];

const orderTypeOptions = [
  {
    label: 'Giáº£m dáº§n',
    value: 'desc',
  },
  {
    label: 'TÄƒng dáº§n',
    value: 'asc',
  },
];
// create new component to quick search and quick sort by date and name schedules
const SearchBox = (props) => {
  const {
    schedules,
    filteredSchedules,
    setFilteredSchedules,
    selectedSchedules = [],
    setSelectedSchedules,
  } = props;
  const [order, setOrder] = useState(orderOptions[0]);
  const [orderType, setOrderType] = useState(orderTypeOptions[0]);
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (schedules) {
      let filtered = schedules;
      if (inputValue === '') {
        filtered = schedules;
      } else {
        filtered = filter(schedules, (item) => {
          return item.name.toLowerCase().includes(inputValue.toLowerCase());
        });
      }

      switch (order.value) {
        case 'date':
          filtered = filtered.sort((a, b) => {
            if (orderType.value === 'asc') {
              return new Date(a.created) - new Date(b.created);
            } else {
              return new Date(b.created) - new Date(a.created);
            }
          });
          break;

        case 'name':
          filtered = filtered.sort((a, b) => {
            if (orderType.value === 'asc') {
              return a.name.localeCompare(b.name);
            } else {
              return b.name.localeCompare(a.name);
            }
          });
          break;

        default:
          filtered = schedules;
          break;
      }

      if (filtered) setFilteredSchedules([...filtered]);
    }
  }, [inputValue, order, orderType]);

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const onClear = () => {
    setInputValue('');
  };

  const onRemoveSchedule = () => {
    if (selectedSchedules.length > 0) {
      const schedulesIds = selectedSchedules.map((item) => item.id);
      confirmAlert({
        title: 'XÃ¡c nháº­n',
        message:
          'Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n xoÃ¡ lá»‹ch Ä‘Ã£ chá»n? ToÃ n bá»™ bÃ i viáº¿t trong lá»‹ch cÅ©ng sáº½ bá»‹ xoÃ¡! HÃ£y cÃ¢n nháº¯c trÆ°á»›c khi thá»±c hiá»‡n!',
        buttons: [
          {
            label: 'TÃ´i cháº¯c cháº¯n',
            onClick: () => {
              dispatch(removeSchedules(schedulesIds));
              setSelectedSchedules([]);
            },
          },
          {
            label: 'KhÃ´ng',
            onClick: () => {},
          },
        ],
      });
    }
  };

  return (
    <div
      className={`SearchBoxContainer flex items-center relative w-full mb-2 gap-2 ${
        filteredSchedules && filteredSchedules.length > 6 ? 'pr-4' : 'pr-2'
      }`}
    >
      <div className="w-2/3 flex items-center gap-2">
        <div className="searchInput relative w-1/2">
          <input
            className="w-full h-10 rounded-md border-gray-300 outline-none p-2 border"
            placeholder="Nháº­p tá»« khoÃ¡ Ä‘á»ƒ tÃ¬m kiáº¿m nhanh"
            value={inputValue}
            onChange={(e) => onChangeInput(e)}
          />
          {inputValue !== '' ? (
            <button
              className="w-8 h-8 text-red-600 flex justify-center items-center rounded-lg hover:bg-gray-200 absolute right-1 top-1"
              type="button"
              onClick={onClear}
            >
              <FaTimes size={20} />
            </button>
          ) : null}
        </div>
        {filteredSchedules && filteredSchedules.length > 0 && (
          <div className="flex items-center gap-2 ml-auto">
            <Label>
              ÄÃ£ chá»n: {selectedSchedules.length} / {filteredSchedules.length}
            </Label>
            <button
              className="btn border border-gray-400 rounded-lg p-2"
              onClick={() => setSelectedSchedules([])}
              disabled={selectedSchedules.length === 0}
            >
              Bá» chá»n
            </button>
            {/* select all button */}
            <button
              className="btn border bg-green-600 text-white rounded-lg p-2"
              onClick={() => setSelectedSchedules(filteredSchedules)}
              disabled={selectedSchedules.length === filteredSchedules.length}
            >
              Chá»n táº¥t cáº£
            </button>
            <button
              className="btn bg-red-500 text-white rounded-lg p-2"
              onClick={onRemoveSchedule}
              disabled={selectedSchedules.length === 0}
            >
              XoÃ¡ lá»‹ch
            </button>
          </div>
        )}
      </div>
      <div className="filter flex w-1/3 gap-2 justify-end">
        <div className="flex flex-nowrap items-center gap-2">
          <Label>Sáº¯p xáº¿p</Label>
          <Select
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
            options={orderOptions}
            onChange={(e) => setOrder(e)}
            defaultValue={order}
          />
        </div>
        <div className="flex flex-nowrap items-center gap-2">
          <Label>Thá»© tá»±</Label>
          <Select
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
            options={orderTypeOptions}
            onChange={(e) => setOrderType(e)}
            defaultValue={orderType}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBox;


