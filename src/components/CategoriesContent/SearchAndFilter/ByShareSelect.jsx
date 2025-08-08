import React from 'react';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons';
import SelectCustom from '@/SelectCustom';

const ByShareList = [
  {
    name: 'DÆ°á»›i 20',
    value: '0-20',
    icon: faShareSquare,
  },
  {
    name: 'Tá»« 21 - 50',
    value: '21-50',
    icon: faShareSquare,
  },
  {
    name: 'Tá»« 50 - 100',
    value: '50-100',
    icon: faShareSquare,
  },
  {
    name: 'Tá»« 100 - 300',
    value: '100-300',
    icon: faShareSquare,
  },
  {
    name: 'Tá»« 300 - 1000',
    value: '300-1000',
    icon: faShareSquare,
  },
  {
    name: 'TrÃªn 1000',
    value: '1000-10000000',
    icon: faShareSquare,
  },
];

const initSelect = {
  name: 'Chá»n sá»‘ lÆ°á»£t share ...',
  value: '',
  icon: faShareSquare,
};

function ByShareSelect(props) {
  const { numsShareToFilter, setRelationShipFilter } = props;
  const handleSelected = (selected) => {
    setRelationShipFilter('FILTER');
    numsShareToFilter(selected.value);
  };

  return (
    <div className="flex-grow">
      <SelectCustom
        initSelect={initSelect}
        listSelect={ByShareList}
        handleSelected={handleSelected}
      />
    </div>
  );
}

export default ByShareSelect;

