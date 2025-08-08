import React from 'react';
import {
  faImage,
  faVideo,
  faComment,
  faSearchDollar,
  faStoreAltSlash,
  faHandPointer,
  faCertificate,
  faEnvelopeOpenText,
} from '@fortawesome/free-solid-svg-icons';
import SelectCustom from '@/SelectCustom';

const kindOfContentList = [
  { name: 'Táº¥t cáº£', value: '', icon: faCertificate },
  { name: 'Táº¡o hÃ ng loáº¡t', value: 'for_ai_generate', icon: faCertificate },
  { name: 'HÃ¬nh áº£nh', value: 'image', icon: faImage },
  { name: 'Video', value: 'video', icon: faVideo },
  { name: 'VÄƒn báº£n', value: 'text', icon: faEnvelopeOpenText },
  { name: 'Feedback', value: 'feedback', icon: faComment },
  { name: 'BÃ¡n hÃ ng', value: 'sale', icon: faSearchDollar },
  { name: 'Phi bÃ¡n hÃ ng', value: 'nonsale', icon: faStoreAltSlash },
];

function KindOfContentSelect(props) {
  const { kindOfContentToSearch, validOptionValues } = props;
  const handleSelected = (selected) => kindOfContentToSearch(selected.value);
  let options = [...kindOfContentList];
  if (validOptionValues && Array.isArray(validOptionValues)) {
    options = options.filter(option => validOptionValues.includes(option.value));
  }
  options[0].name = "Chá»n loáº¡i content";
  let initSelect = options[0];

  return (
    <div className="flex-grow my-0.5">
      <SelectCustom
        initSelect={initSelect}
        listSelect={options}
        handleSelected={handleSelected}
      />
    </div>
  );
}

export default KindOfContentSelect;

