import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteHistory,
  getHistory,
  removeHistoryHashtag,
} from '@/../../../store/actions/createContent';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { confirmAlert } from 'react-confirm-alert';

const PopupTag = ({
  isOpen = false,
  toggle,
  handleSaveHistory,
  isContent,
  setIsContent,
  isEdit = false,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [editHashTag, setEditHashTag] = useState('');
  const dispatch = useDispatch();
  const { tagList } = useSelector((state) => state.createPost);
  useEffect(() => {
    if (isContent) {
      setInputValue(isContent.tag);
    }
    dispatch(getHistory());
  }, []);

  const handleEditHashTag = (tag) => {
    confirmAlert({
      title: 'Chá»‰nh sá»­a tháº»',
      message:
        'Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n chá»‰nh sá»­a tháº» nÃ y khÃ´ng? ToÃ n bá»™ káº¿t quáº£ Ä‘Ã£ lÆ°u sáº½ Ä‘Æ°á»£c cáº­p nháº­t theo tháº» má»›i !',
      buttons: [
        {
          label: 'CÃ³',
          onClick: () => {
            setInputValue(tag);
            setEditHashTag(tag);
          },
        },
        {
          label: 'KhÃ´ng',
          onClick: () => {},
        },
      ],
    });
  };

  const handleDeleteHashtag = (tag) => {
    confirmAlert({
      title: 'XoÃ¡ tháº»',
      message:
        'Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n xoÃ¡ tháº» nÃ y khÃ´ng? ChÃºng tÃ´i sáº½ chá»‰ xoÃ¡ tháº» cá»§a toÃ n bá»™ káº¿t quáº£ Ä‘Ã£ lÆ°u !',
      buttons: [
        {
          label: 'CÃ³',
          onClick: () => {
            dispatch(removeHistoryHashtag(tag));
          },
        },
        {
          label: 'KhÃ´ng',
          onClick: () => {},
        },
      ],
    });
  };

  const onSaveHistory = () => {
    if (editHashTag !== '') {
      const editingHashtag = {
        oldTag: editHashTag,
        newTag: inputValue,
      };
      handleSaveHistory(editingHashtag);
    } else {
      handleSaveHistory();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-9999 max-w-lg mt-1"
        style={{ maxWidth: '50%' }}
        onClose={toggle}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="w-2/4 transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all"
                style={{ height: '50%' }}
              >
                <div className="mb-3">
                  <input
                    value={inputValue}
                    className="w-full h-14 rounded-md shadow-sm border-gray-100 border-2 outline-none p-2"
                    placeholder="Vui lÃ²ng Ä‘iá»n má»™t tháº» phÃ¢n loáº¡i Ä‘á»ƒ lÆ°u content gá»£i Ã½ nÃ y"
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      setIsContent({ ...isContent, tag: e.target.value });
                    }}
                  />
                  {editHashTag && (
                    <span className="text-xs text-red-500">
                      Báº¡n Ä‘ang chá»‰nh sá»­a tháº»: {editHashTag}
                    </span>
                  )}
                </div>
                {tagList.length === 0 ? null : (
                  <div className="relative">
                    <span className="uppercase text-md font-bold">
                      Tháº» gá»£i Ã½
                    </span>
                    <div
                      className="w-full h-1 bg-gray-600 mb-3 mt-2"
                      style={{ height: '1px' }}
                    ></div>
                    {editHashTag && (
                      <div className="absolute left-0 top-0 w-full h-full z-10 cursor-not-allowed"></div>
                    )}
                    <ul className="rounded-md max-h-96 overflow-y-scroll">
                      {tagList.length > 0 &&
                        tagList.map(
                          (_elt, index) =>
                            // only show _elt has not empty
                            _elt &&
                            _elt.trim() && (
                              <li
                                className={`flex mb-2 font-bold hover:text-red-500 cursor-pointer items-center ${
                                  inputValue === _elt
                                    ? 'text-red-500'
                                    : 'text-gray-500'
                                }`}
                                key={index}
                              >
                                <span
                                  className="w-full"
                                  onClick={() => {
                                    if (inputValue === _elt) {
                                      toast.warning('Báº¡n Ä‘ang chá»n tháº» nÃ y !');
                                      return;
                                    }
                                    setInputValue(_elt);
                                    setIsContent({ ...isContent, tag: _elt });
                                  }}
                                >
                                  {_elt}
                                </span>
                                <div className="flex items-center ml-auto gap-2">
                                  <FiEdit
                                    size={25}
                                    color="green"
                                    onClick={() => handleEditHashTag(_elt)}
                                    title={'Chá»‰nh sá»­a tháº»'}
                                  />
                                  <FiTrash
                                    size={25}
                                    color="red"
                                    onClick={() => handleDeleteHashtag(_elt)}
                                    title={'XoÃ¡ tháº»'}
                                  />
                                </div>
                              </li>
                            )
                        )}
                    </ul>
                  </div>
                )}
                <div className="flex justify-end gap-5 mt-3">
                  <button
                    onClick={() => toggle()}
                    className="bg-red-400 px-3 h-10 rounded-md text-white"
                  >
                    ÄÃ³ng
                  </button>
                  <button
                    onClick={() => onSaveHistory()}
                    disabled={inputValue === ''}
                    className="bg-blue-400 h-10 px-10 rounded-md text-white"
                  >
                    {isEdit ? 'Cáº­p nháº­t' : 'LÆ°u'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PopupTag;

