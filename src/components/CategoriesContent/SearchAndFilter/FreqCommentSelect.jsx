import React from 'react';
import {
  faLevelUpAlt,
  faLevelDownAlt,
  faRandom,
  faComment,
} from '@fortawesome/free-solid-svg-icons';
import SelectCustom from '@/SelectCustom';

const FreqCommentList = [
  {
    name: 'Comment TÄƒng dáº§n',
    value: '1',
    icon: faLevelUpAlt,
  },
  {
    name: 'Comment Giáº£m dáº§n',
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
  name: 'Chá»n táº§n suáº¥t comment ...',
  value: '',
  icon: faComment,
};

function FreqCommentSelect(props) {
  const { freqCommentToFilter, isDisabledFreqComment, setRelationShipFilter } =
    props;
  const handleSelected = (selected) => {
    setRelationShipFilter('SORT');
    freqCommentToFilter(selected.value);
  };

  return (
    <div className="flex-grow">
      <SelectCustom
        initSelect={initSelect}
        listSelect={FreqCommentList}
        handleSelected={handleSelected}
        isDisabled={isDisabledFreqComment}
      />
    </div>
  );
}

export default FreqCommentSelect;

