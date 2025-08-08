// @ts-nocheck
import trendIcon from '@/assets/images/icon/create-content/trending-topic.png';
import addUserIcon from '@/assets/images/icon/schedules/add-user.png';
import megaPhoneIcon from '@/assets/images/icon/schedules/megaphone.png';
import writingIcon from '@/assets/images/icon/schedules/writing.png';
import heartIcon from '@/assets/images/icon/schedules/heart.png';
import reactionIcon from '@/assets/images/icon/schedules/reaction.png';
import partyIcon from '@/assets/images/icon/schedules/party.png';
import InstagramIcon from '@/assets/images/icon/schedules/instagram.png';
import tiktokIcon from '@/assets/images/icon/schedules/tiktok.png';
import douyinIcon from '@/assets/images/icon/schedules/douyin.png';
import threadsIcon from '@/assets/images/icon/schedules/threads.png';
import chatGPTIcon from '@/assets/images/icon/create-content/chat-gpt-icon.png';
import videoEditorIcon from '@/assets/images/icon/video-editor.png';
import AIVideoIcon from '@/assets/images/icon/main-menu/menu-icon-videogen-full.png';
import styled from 'styled-components';

export const DEFAULT = 'Nguá»“n cáº¥p Ã½ tÆ°á»Ÿng';
export const TREND = 'Äu trend';
export const SPECIAL = 'Theo dÃµi Ä‘áº·c biá»‡t';
export const ADS = 'Äang cháº¡y Ads';
export const CREATED = 'Content Ä‘Ã£ táº¡o';
export const LIKED = 'Content Ä‘Ã£ thÃ­ch';
export const TIKTOK = 'TikTok';
export const INSTAGRAM = 'Instagram';
export const THREADS = 'Threads';
export const DOUYIN = 'Douyin';
export const SYSTEM = 'Content nuÃ´i dÆ°á»¡ng';
export const EVENT = 'Sá»± kiá»‡n ná»•i báº­t';
export const CHATGPT = 'ChatGPT';
export const VIDEO_EDITOR = 'Video Editor';
export const VIDEOGEN_AI = 'Video AI';

export const IDEAS_ARR = [
  {
    title: TREND,
    icon: trendIcon,
    type: TREND,
    description:
      'ÄÃ¢y lÃ  nhá»¯ng gÃ¬ cá»™ng Ä‘á»“ng Ä‘ang quan tÃ¢m, hÃ£y lá»“ng ghÃ©p vÃ  chá»‰nh sá»­a content cá»§a báº¡n theo cÃ¡c Ä‘á» tÃ i bÃªn dÆ°á»›i!',
  },
  {
    title: SPECIAL,
    icon: addUserIcon,
    type: SPECIAL,
    description:
      'ÄÃ¢y lÃ  nhá»¯ng content tá»« cÃ¡c Fanpage/Group/Profile trong danh sÃ¡ch theo dÃµi Ä‘áº·c biá»‡t cá»§a báº¡n (Kingcontent luÃ´n tá»± Ä‘á»™ng cáº­p nháº­t cÃ¡c bÃ i viáº¿t má»›i nháº¥t)',
  },
  {
    title: ADS,
    icon: megaPhoneIcon,
    type: ADS,
    description:
      'CÃ¡c bÃ i viáº¿t Ä‘ang cháº¡y Ads Ä‘Æ°á»£c Ä‘áº§u tÆ° khÃ¡ nghiÃªm tÃºc vá» ná»™i dung, hÃ£y sá»­ dá»¥ng nguá»“n cung cáº¥p ná»™i dung nÃ y Ä‘á»ƒ tham kháº£o',
  },

  {
    title: CREATED,
    icon: writingIcon,
    type: CREATED,
    description: 'Sá»­ dá»¥ng láº¡i content Ä‘Ã£ táº¡o tá»« trÃ¬nh soáº¡n tháº£o lÃºc trÆ°á»›c',
  },
  {
    title: LIKED,
    icon: heartIcon,
    type: LIKED,
    description: 'Danh sÃ¡ch nhá»¯ng content mÃ  báº¡n Ä‘Ã£ nháº¥n thÃ­ch trong há»‡ thá»‘ng',
  },
  {
    title: SYSTEM,
    icon: reactionIcon,
    type: SYSTEM,
    description: 'Nhá»¯ng content chÄƒm sÃ³c trang, khÃ´ng bÃ¡n hÃ ng',
  },
  {
    title: EVENT,
    icon: partyIcon,
    type: EVENT,
    description:
      'SÃ¡ng táº¡o ra nhá»¯ng content phÃ¹ há»£p vá»›i sá»± kiá»‡n sáº¯p tá»›i (ÄÄƒng thÃ´ng bÃ¡o, Ä‘Äƒng bÃ i cÃ¢u tÆ°Æ¡ng tÃ¡c, chÆ°Æ¡ng trÃ¬nh giáº£m giÃ¡...)',
  },
  {
    title: TIKTOK,
    icon: tiktokIcon,
    type: TIKTOK,
    description: 'Nhá»¯ng video xu hÆ°á»›ng tá»« tiktok',
  },
  {
    title: INSTAGRAM,
    icon: InstagramIcon,
    type: INSTAGRAM,
    description: 'Nhá»¯ng bÃ i viáº¿t má»›i nháº¥t tá»« Instagram',
  },
  {
    title: DOUYIN,
    icon: douyinIcon,
    type: DOUYIN,
    description: 'Nhá»¯ng bÃ i viáº¿t má»›i nháº¥t tá»« Douyin',
  },
  {
    title: THREADS,
    icon: threadsIcon,
    type: THREADS,
    description: 'Nhá»¯ng bÃ i viáº¿t má»›i nháº¥t tá»« Threads',
  },
  {
    title: CHATGPT,
    icon: chatGPTIcon,
    type: CHATGPT,
    description: 'Ná»™i dung Ä‘Æ°á»£c táº¡o bá»Ÿi ChatGPT Ä‘Ã£ Ä‘Æ°á»£c lÆ°u tá»« trÃ¬nh soáº¡n tháº£o',
  },
  {
    title: VIDEO_EDITOR,
    icon: videoEditorIcon,
    type: VIDEO_EDITOR,
    description:
      'Nhá»¯ng video Ä‘Ã£ Ä‘Æ°á»£c táº¡o tá»« Video Editor, báº¡n cÃ³ thá»ƒ sá»­ dá»¥ng láº¡i ná»™i dung nÃ y',
  },
  {
    title: VIDEOGEN_AI,
    icon: AIVideoIcon,
    type: VIDEOGEN_AI,
    description: 'Nhá»¯ng video táº¡o bá»Ÿi AI',
  },
];

export const IDEAS_AUTO_ARR = [
  {
    title: SPECIAL,
    icon: addUserIcon,
    type: SPECIAL,
    description:
      'ÄÃ¢y lÃ  nhá»¯ng content tá»« cÃ¡c Fanpage/Group/Profile trong danh sÃ¡ch theo dÃµi Ä‘áº·c biá»‡t cá»§a báº¡n (Kingcontent luÃ´n tá»± Ä‘á»™ng cáº­p nháº­t cÃ¡c bÃ i viáº¿t má»›i nháº¥t)',
  },
  {
    title: CREATED,
    icon: writingIcon,
    type: CREATED,
    description: 'Sá»­ dá»¥ng láº¡i content Ä‘Ã£ táº¡o tá»« trÃ¬nh soáº¡n tháº£o lÃºc trÆ°á»›c',
  },
  {
    title: LIKED,
    icon: heartIcon,
    type: LIKED,
    description: 'Danh sÃ¡ch nhá»¯ng content mÃ  báº¡n Ä‘Ã£ nháº¥n thÃ­ch trong há»‡ thá»‘ng',
  },
  {
    title: SYSTEM,
    icon: reactionIcon,
    type: SYSTEM,
    description: 'Nhá»¯ng content chÄƒm sÃ³c trang, khÃ´ng bÃ¡n hÃ ng',
  },
  // {
  //   title: EVENT,
  //   icon: partyIcon,
  //   type: EVENT,
  //   description:
  //     'SÃ¡ng táº¡o ra nhá»¯ng content phÃ¹ há»£p vá»›i sá»± kiá»‡n sáº¯p tá»›i (ÄÄƒng thÃ´ng bÃ¡o, Ä‘Äƒng bÃ i cÃ¢u tÆ°Æ¡ng tÃ¡c, chÆ°Æ¡ng trÃ¬nh giáº£m giÃ¡...)',
  // },
  {
    title: TIKTOK,
    icon: tiktokIcon,
    type: TIKTOK,
    description: 'Nhá»¯ng video xu hÆ°á»›ng tá»« tiktok',
  },
  {
    title: INSTAGRAM,
    icon: InstagramIcon,
    type: INSTAGRAM,
    description: 'Nhá»¯ng bÃ i viáº¿t má»›i nháº¥t tá»« Instagram',
  },
  {
    title: DOUYIN,
    icon: douyinIcon,
    type: DOUYIN,
    description: 'Nhá»¯ng bÃ i viáº¿t má»›i nháº¥t tá»« Douyin',
  },
  {
    title: THREADS,
    icon: threadsIcon,
    type: THREADS,
    description: 'Nhá»¯ng bÃ i viáº¿t má»›i nháº¥t tá»« Threads',
  },
  {
    title: CHATGPT,
    icon: chatGPTIcon,
    type: CHATGPT,
    description: 'Ná»™i dung Ä‘Æ°á»£c táº¡o bá»Ÿi ChatGPT Ä‘Ã£ Ä‘Æ°á»£c lÆ°u tá»« trÃ¬nh soáº¡n tháº£o',
  },
  {
    title: VIDEOGEN_AI,
    icon: AIVideoIcon,
    type: VIDEOGEN_AI,
    description: 'Nhá»¯ng video táº¡o bá»Ÿi AI',
  },
  {
    title: VIDEO_EDITOR,
    icon: videoEditorIcon,
    type: VIDEO_EDITOR,
    description:
      'Nhá»¯ng video Ä‘Ã£ Ä‘Æ°á»£c táº¡o tá»« Video Editor, báº¡n cÃ³ thá»ƒ sá»­ dá»¥ng láº¡i ná»™i dung nÃ y',
  },
];

export const ContentDataStyled = styled.div`
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #000000;
    border: 2px solid #555555;
  }
`;

const prepareOrders = (
  likesOrder = '',
  commentsOrder = '',
  sharesOrder = '',
  timeStampOrder = ''
) => {
  let orders = [];
  if (likesOrder) {
    orders.push({
      sort: 'likes',
      dir: parseInt(likesOrder) === 1 ? 'asc' : 'desc',
    });
  }
  if (commentsOrder) {
    orders.push({
      sort: 'comments',
      dir: parseInt(commentsOrder) === 1 ? 'asc' : 'desc',
    });
  }
  if (sharesOrder) {
    orders.push({
      sort: 'shares',
      dir: parseInt(sharesOrder) === 1 ? 'asc' : 'desc',
    });
  }
  if (timeStampOrder) {
    orders.push({
      sort: 'post_timestamp',
      dir: parseInt(timeStampOrder) === 1 ? 'desc' : 'asc',
    });
  }
  return orders;
};

export const destructSearchData = (data) => {
  const {
    keyword = '',
    likesOrder = '',
    commentsOrder = '',
    sharesOrder = '',
    feed_id = '',
    schedule = '',
    timeStampOrder = '',
    hashtag = '',
    kindOfContent = '',
  } = data;
  let query = '';
  let prefix = '';
  if (keyword) {
    prefix = query !== '' ? '&' : '';
    query += `${prefix}keyword=${keyword}`;
  }
  if (feed_id) {
    prefix = query !== '' ? '&' : '';
    query += `${prefix}feed_id=${feed_id}`;
  }
  const orders = prepareOrders(
    likesOrder,
    commentsOrder,
    sharesOrder,
    timeStampOrder
  );
  if (orders.length > 0) {
    orders.map((item, idx) => {
      const { sort, dir } = item;
      prefix = query !== '' ? '&' : '';
      query += `${prefix}orders[${idx}][sort]=${sort}&orders[${idx}][dir]=${dir}&`;
    });
  }
  if (schedule) {
    prefix = query !== '' ? '&' : '';
    query += `${prefix}scheduled_type=${schedule}`;
  }
  if (hashtag) {
    prefix = query !== '' ? '&' : '';
    query += `${prefix}hashtag=${hashtag}`;
  }
  if (kindOfContent) {
    prefix = query !== '' ? '&' : '';
    query += `${prefix}media_type=${kindOfContent}`;
  }
  return query;
};


