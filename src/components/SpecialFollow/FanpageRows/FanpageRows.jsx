import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { BiRefresh } from 'react-icons/bi';
import { BsEye } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';
import HashtagsSearch from '@/../ContentLiked/HashtagsSearch';
import { formatDate } from '@/../../helpers/date';
import client from '@/../../Client';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { isObjEmpty } from '@/../../utils/utilityFunc';
import CreatableSelect from 'react-select/creatable';
import PopupSelectTag from '@/popupSelectTag';
import PopoverTag from '@/popoverTag';
import { Dialog } from 'primereact/dialog';
import Fanpage from '@/Fanpage';
import { userServices } from '@/../../services/users';
import { OK } from '@/../../configs';

const FanpageRows = (props) => {
  const {
    fanpages = [],
    setIsShowPopup,
    getFanpages,
    setFanpages,
    labels,
    handleChageHashTag,
  } = props;

  const ref = useRef(null);
  const [isShowHashtag, setIsShowHashtag] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [itemEdit, setItemEdit] = useState(null);
  const oppp = useRef(null);
  const [visible, setVisible] = useState(false);
  const handleClickOutside = (event) => {
    setIsShowHashtag(false);
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  const reRenderList = () => {
    getFanpages && getFanpages().then(setFanpages).catch(console.error);
  };
  const updateContent = async (fanpage) => {
    const { is_queue = false, fanpage_id } = fanpage;
    if (!is_queue) {
      toast.info('Äang thÃªm trang vÃ o hÃ ng Ä‘á»£i....');
      const postData = {
        feed_id: fanpage_id,
      };
      const res = await userServices.putFanpageToQueue(postData);
      if (res.status === OK) {
        toast.dismiss();
        toast.success(
          'Vui lÃ²ng Ä‘á»£i trong Ã­t phÃºt Ä‘á»ƒ há»‡ thá»‘ng tiáº¿n hÃ nh cáº­p nháº­t'
        );
        setFanpages(res?.data?.data || []);
      }
    }
  };

  const deleteContent = async (fanpage) => {
    confirmAlert({
      title: 'Cáº£nh bÃ¡o !',
      message: (
        <span className="warning-content">
          Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n xoÃ¡ trang nÃ y khÃ´ng?
        </span>
      ),
      buttons: [
        {
          label: 'XÃ¡c nháº­n',
          onClick: async () => {
            const res = await client.delete(`/fanpages/${fanpage.fanpage_id}`);
            if (res.status === OK) {
              toast.success('XoÃ¡ trang thÃ nh cÃ´ng !');
              getFanpages &&
                getFanpages().then(setFanpages).catch(console.error);
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
      {fanpages &&
        fanpages.length > 0 &&
        fanpages.map((fanpage, key) => {
          return (
            <Fragment key={key}>
              <Fanpage
                fanpage={fanpage}
                index={key}
                setIsShowPopup={setIsShowPopup}
                setItemEdit={setItemEdit}
                setVisible={setVisible}
                visible={visible}
                updateContent={updateContent}
                deleteContent={deleteContent}
              />
            </Fragment>
          );
        })}
      <PopupSelectTag
        isOpen={isOpen}
        options={labels}
        handleChageHashTag={handleChageHashTag}
        setOpen={setIsOpen}
        item={itemEdit}
        reRenderList={reRenderList}
      />
      <Dialog
        header="Chá»‰nh sá»­a nhÃ£n"
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => setVisible(false)}
      >
        <PopoverTag
          editOp={ref}
          isEdit={true}
          item={itemEdit}
          reRenderList={reRenderList}
          setVisible={setVisible}
        />
      </Dialog>
    </>
  );
};

export default FanpageRows;

