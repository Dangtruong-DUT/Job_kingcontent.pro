import React from 'react';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import SelectCustom from '@/SelectCustom';

const ByLikeList = [
  {
    name: 'DÆ°á»›i 20',
    value: '0-20',
    icon: faThumbsUp,
  },
  {
    name: 'Tá»« 21 - 50',
    value: '21-50',
    icon: faThumbsUp,
  },
  {
    name: 'Tá»« 50 - 100',
    value: '50-100',
    icon: faThumbsUp,
  },
  {
    name: 'Tá»« 100 - 300',
    value: '100-300',
    icon: faThumbsUp,
  },
  {
    name: 'Tá»« 300 - 1000',
    value: '300-1000',
    icon: faThumbsUp,
  },
  {
    name: 'TrÃªn 1000',
    value: '1000-10000000',
    icon: faThumbsUp,
  },
];

const initSelect = {
  name: 'Chá»n sá»‘ lÆ°á»£t like ...',
  value: '',
  icon: faThumbsUp,
};

function ByLikeSelect(props) {
  const { numsLikeToFilter, setRelationShipFilter, handleRefreshFillter } =
    props;
  const handleSelected = (selected) => {
    setRelationShipFilter('FILTER');
    numsLikeToFilter(selected.value);
  };

  return (
    <div className="flex-grow">
      <SelectCustom
        initSelect={initSelect}
        listSelect={ByLikeList}
        handleSelected={handleSelected}
        handleRefreshFillter={handleRefreshFillter}
      />
    </div>
  );
}

export default ByLikeSelect;

