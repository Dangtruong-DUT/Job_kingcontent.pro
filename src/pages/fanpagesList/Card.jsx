import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Client from '@/../Client';
import { useDispatch } from 'react-redux';
import { ACTION_SEARCH_FANPAGE } from '@/store/actions/Fanpages';
import defaultAvatar from '@/assets/images/default_fb_avatar.jpg';
import { OK } from '@/../configs';

const Card = (props) => {
  const {
    pages,
    isShowSaved,
    setIsShowPopup,
    setFanpageSaved,
    fanpageSearchData,
    setIsShowPopupFanpageSaved,
  } = props;
  const dispatch = useDispatch();
  const handleSaveFanpage = (link) => {
    confirmAlert({
      title: 'ThÃ´ng bÃ¡o',
      message: (
        <span className="warning-content">
          Báº¡n cÃ³ muá»‘n Ä‘Æ°a trang nÃ y vÃ o má»¥c theo dÃµi Ä‘áº·c biá»‡t Ä‘á»ƒ tá»± Ä‘á»™ng láº¥y vá»
          nhá»¯ng bÃ i viáº¿t má»›i nháº¥t khÃ´ng ?
        </span>
      ),
      buttons: [
        {
          label: 'XÃ¡c nháº­n',
          onClick: async () => {
            toast.warning('Äang lÆ°u ...');
            const postingData = {
              fanpage: link,
              from_system: true,
              limit: 500,
            };
            const res = await Client.post(`/fanpages/import`, postingData);
            if (res.status === OK) {
              const resFanpage = await Client.get(`/saved-fanpages`);
              if (resFanpage.status === OK) {
                const newArray = pages.map((_fan) => {
                  return {
                    ..._fan,
                    isSaved: _fan.feed_id === link ? true : _fan.isSaved,
                  };
                });
                setFanpageSaved(res.data.data);
                setFanpageSaved(resFanpage.data.data);
                dispatch({
                  type: ACTION_SEARCH_FANPAGE,
                  payload: newArray || [],
                });
                toast.success('LÆ°u fanpage thÃ nh cÃ´ng !');
              }
            }
          },
        },
        {
          label: 'Huá»·',
          onClick: () => {},
        },
      ],
    });
  };
  const handleDisFanpage = (link, page_name) => {
    confirmAlert({
      title: 'ThÃ´ng bÃ¡o',
      message: (
        <span className="warning-content">
          Báº¡n cÃ³ muá»‘n bá» thÃ­ch trang nÃ y khÃ´ng ?
        </span>
      ),
      buttons: [
        {
          label: 'XÃ¡c nháº­n',
          onClick: async () => {
            const res = await Client.delete(`/fanpages/${link}`);
            if (res.status === OK) {
              const resFanpage = await Client.get(`/saved-fanpages`);
              if (resFanpage.status === OK) {
                const newArray = fanpageSearchData.map((_fan) => {
                  return {
                    ..._fan,
                    isSaved:
                      _fan.user_screenname === page_name ? false : _fan.isSaved,
                  };
                });
                setFanpageSaved(resFanpage.data.data);
                dispatch({
                  type: ACTION_SEARCH_FANPAGE,
                  payload: newArray || [],
                });
                toast.success('Thao tÃ¡c thÃ nh cÃ´ng !');
              }
            }
          },
        },
        {
          label: 'Huá»·',
          onClick: () => {},
        },
      ],
    });
  };
  return (
    <>
      {pages.map((_elt, index) => {
        return (
          <div
            className="singleFanpage shadow-lg bg-white rounded-lg min-h-full hover:bg-gray-200 transform duration-300 cursor-pointer text-center py-3"
            key={index}
          >
            <div
              className="bg-cover bg-center bg-no-repeat rounded-full inline-block text-center"
              onClick={() =>
                isShowSaved
                  ? setIsShowPopupFanpageSaved(_elt)
                  : setIsShowPopup(_elt)
              }
              style={{
                backgroundImage: `url(${_elt.user_pic}), url(${defaultAvatar})`,
                width: '200px',
                height: '200px',
              }}
              title={_elt.user_screenname}
            ></div>
            <div className="flex justify-between p-4 items-center text-left">
              <div className="w-8/12">
                <a href={_elt?.user_link} target="_blank" key={index}>
                  <p className="text-md font-bold truncate hover:text-clip hover:break-normal hover:underline">
                    {isShowSaved ? _elt.page_name : _elt.user_screenname}
                  </p>
                </a>
                <p className="font-bold text-red-600">
                  {isShowSaved ? _elt.total : _elt?.posts_count} content
                </p>
              </div>
              {!isShowSaved ? (
                <div className="w-4/12 flex justify-end">
                  <button
                    className={`p-1 h-10 rounded-md text-white  flex items-center justify-center gap-2`}
                    disabled={_elt.isSaved}
                    onClick={() => handleSaveFanpage(_elt?.feed_id)}
                  >
                    {!_elt.isSaved ? (
                      <FaHeart color="#cbcfd4" size="30" />
                    ) : (
                      <FaHeart color="#f9595f" size="30" />
                    )}
                    {/* <span>{_elt.isSaved  ? 'ÄÃ£ lÆ°u' : 'LÆ°u'} </span> */}
                  </button>
                </div>
              ) : (
                <div className="w-4/12 flex justify-end">
                  <button
                    className={`p-1 h-10 rounded-md text-white flex items-center justify-center gap-2`}
                    disabled={_elt.isSaved}
                    onClick={() =>
                      handleDisFanpage(_elt?.fanpage_id, _elt.page_name)
                    }
                  >
                    <FaHeart color="#f9595f" size="30" />
                    {/* <span>Bá» lÆ°u</span> */}
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Card;



