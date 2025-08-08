import React from 'react';
import {
  faLevelUpAlt,
  faLevelDownAlt,
  faRandom,
  faShareSquare,
} from '@fortawesome/free-solid-svg-icons';
import SelectCustom from '@/SelectCustom';

const FreqShareList = [
  {
    name: 'Share TÄƒng dáº§n',
    value: '1',
    icon: faLevelUpAlt,
  },
  {
    name: 'Share Giáº£m dáº§n',
    value: '2',
    icon: faLevelDownAlt,
  },
  // {
  //   name: "Ngáº«u nhiÃªn",
  //   value: "3",
  //   icon: faRandom,
  // },
];

const initSelect = {
  name: 'Chá»n táº§n suáº¥t share ...',
  value: '',
  icon: faShareSquare,
};

function FreqShareSelect(props) {
  const { freqShareToFilter, isDisabledFreqShare, setRelationShipFilter } =
    props;
  const handleSelected = (selected) => {
    setRelationShipFilter('SORT');
    freqShareToFilter(selected.value);
  };

  return (
    <div className="flex-grow">
      <SelectCustom
        initSelect={initSelect}
        listSelect={FreqShareList}
        handleSelected={handleSelected}
        isDisabled={isDisabledFreqShare}
      />
    </div>
  );
}

export default FreqShareSelect;

