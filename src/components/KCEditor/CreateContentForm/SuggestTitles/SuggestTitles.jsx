import { useCallback } from 'react';
import { connect } from 'react-redux';
import { getContentSuggestions } from '@/../../../store/actions/editor/createContentActions';

const listTitles = [
  {
    id: 1,
    color: 'manual',
    number: '01',
    text: 'Táº¡o tiÃªu Ä‘á»',
    description_title: 'Báº¡n Ä‘ang á»Ÿ bÆ°á»›c 1: Táº¡o tiÃªu Ä‘á»',
    description_text:
      'Má»™t tiÃªu Ä‘á» xuáº¥t sáº¯c quyáº¿t Ä‘á»‹nh tá»›i 90% kháº£ nÄƒng xem tiáº¿p content cá»§a báº¡n. HÃ£y thá»ƒ hiá»‡n má»™t tiÃªu Ä‘á» tháº­t hoÃ n háº£o nhÃ©!',
    keywords: [],
  },
  {
    id: 2,
    color: 'formular',
    number: '02',
    text: 'Lá»£i Ã­ch sáº£n pháº©m',
    description_title: 'Báº¡n Ä‘ang á»Ÿ bÆ°á»›c 2: TrÃ¬nh bÃ y lá»£i Ã­ch sáº£n pháº©m',
    description_text:
      'KhÃ¡ch hÃ ng chá»‰ mua nhá»¯ng sáº£n pháº©m Ä‘em láº¡i lá»£i Ã­ch hoáº·c thoáº£ mÃ£n nhu cáº§u cá»§a há». VÃ¬ váº­y hÃ£y táº­p trung mÃ´ táº£ nhá»¯ng tháº¿ máº¡nh ná»•i báº­t nháº¥t trong sáº£n pháº©m cá»§a báº¡n!',
    keywords: ['giÃ¡', 'Ä‘t', '0', 'táº¡i', 'http'],
  },
  {
    id: 3,
    color: 'feedback',
    number: '03',
    text: 'Cam káº¿t máº¡nh',
    description_title: 'Báº¡n Ä‘ang á»Ÿ bÆ°á»›c 3: Cam káº¿t máº¡nh',
    description_text:
      'KhÃ¡ch hÃ ng chá»‰ rÃºt háº§u bao khi há» tin tÆ°á»Ÿng báº¡n. VÃ¬ váº­y hÃ£y cam káº¿t máº¡nh nhá»¯ng lá»£i Ã­ch vá» sáº£n pháº©m, dá»‹ch vá»¥ báº¡n mÃ´ táº£ táº¡i bÆ°á»›c 2, cÃ³ Ä‘Æ°á»£c niá»m tin cá»§a khÃ¡ch chÃ­nh lÃ  cÃ³ doanh sá»‘!',
    keywords: ['cam káº¿t', 'hoÃ n tiá»n', 'Ä‘áº£m báº£o'],
  },
  {
    id: 4,
    color: 'special',
    number: '04',
    text: 'ChiÃªu trÃ² khuyáº¿n mÃ£i',
    description_title: 'Báº¡n Ä‘ang á»Ÿ bÆ°á»›c 4: ChiÃªu trÃ² khuyáº¿n mÃ£i',
    description_text:
      'HÃ£y táº¡o ra má»™t lÃ½ do khuyáº¿n mÃ£i Ä‘á»§ sá»©c thuyáº¿t phá»¥c Ä‘á»ƒ khÃ¡ch hÃ ng tin ráº±ng há» Ä‘ang thá»±c sá»± cÃ³ cÆ¡ há»™i sá»Ÿ há»¯u má»™t mÃ³n há»i khi mua sáº£n pháº©m!',
    keywords: [
      'khuyáº¿n mÃ£i',
      'giáº£m giÃ¡',
      'nay chá»‰ cÃ²n',
      'táº·ng ngay',
      'táº·ng kÃ¨m',
      'quÃ  táº·ng',
      'giÃ¡ chá»‰',
    ],
  },
  {
    id: 5,
    color: 'trend',
    number: '05',
    text: 'KÃªu gá»i hÃ nh Ä‘á»™ng',
    description_title: 'Báº¡n Ä‘ang á»Ÿ bÆ°á»›c 5: KÃªu gá»i hÃ nh Ä‘á»™ng',
    description_text:
      'Äá»«ng Ä‘á»ƒ khÃ¡ch hÃ ng cÃ³ thÃªm báº¥t kÃ¬ giÃ¢y phÃºt cháº§n chá»« nÃ o Ä‘á»ƒ quyáº¿t Ä‘á»‹nh mua hÃ ng. Má»—i ngÃ y trÃ´i qua sáº½ khiáº¿n tá»· lá»‡ chá»‘t Ä‘Æ¡n hÃ ng giáº£m Ä‘i rÃµ rá»‡t!',
    keywords: ['inbox', 'liÃªn há»‡', 'Ä‘á»‹a chá»‰', 'nhanh tay', 'chá»‰ duy nháº¥t'],
  },
];

const SuggestTitles = (props) => {
  const { selectedCatId, getContentSuggestions, setIsSearch } = props;

  const handleOnClickTitle = useCallback(
    (title) => {
      setIsSearch(true);
      const { id, keywords } = title;
      // will change to selectedCatId
      const currentCatId = '60ee76549d46428815950d39';
      switch (id) {
        case 1:
          break;

        case 2:
          getContentSuggestions(currentCatId, keywords, 1, true);
          break;

        default:
          getContentSuggestions(currentCatId, keywords, 1);
          break;
      }
    },
    [selectedCatId, getContentSuggestions]
  );

  return (
    <div className="suggestion-steps flex whitespace-nowrap flex-nowrap w-full gap-1">
      {listTitles.map((title, index) => {
        const { color, number, text, description_text, description_title } =
          title;
        const cls = index === 4 || index === 3 ? 'right-0' : 'left-0';
        return (
          <div
            key={index}
            className={`step relative cursor-pointer rounded-md flex flex-1 p-1 bg-editor-${color}`}
            onClick={() => handleOnClickTitle(title)}
          >
            <span className="number rounded-full bg-white text-black px-2 py-1">
              {number}
            </span>
            <span className="text text-white p-1">{text}</span>
            <div
              className={`desciption invisible z-9999 step-hover:block transition-all ease-out absolute top-full p-3 rounded-lg w-80 mt-0.5 bg-opacity-80 text-white bg-editor-${color} ${cls}`}
            >
              <p className="whitespace-pre-line font-bold text-base mb-2">
                {description_title}
              </p>
              <p className="whitespace-pre-line">{description_text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedCatId: state.editor.selectedCatId,
  };
};

export default connect(mapStateToProps, {
  getContentSuggestions,
})(SuggestTitles);

