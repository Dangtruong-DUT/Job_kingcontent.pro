// @ts-nocheck
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'rsuite';
import { Dialog, Transition } from '@headlessui/react';
import { FiX } from 'react-icons/fi';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import { COLLECTION_MAX_ITEMS_WARNING } from '@/../../configs';
import {
  actionSaveCollection,
  actionSavePostsToCollection,
  actionSetCollectionModalOpen,
  actionSetCollectionType,
  actionUpdateChosenPosts,
} from '@/store/actions/instagram';

const ModalCollection = () => {
  const {
    modalCollectionType = 'add',
    modalCollectionOpen = false,
    currentCollection = null,
    collections = null,
    chosenPosts = [],
    loadingSaveCollection = false,
  } = useSelector((state) => state.instagram);
  const dispatch = useDispatch();

  const [modalTile, setModalTile] = useState('');
  const [isShowSelection, setIsShowSelection] = useState(false);
  const [colOptions, setColOptions] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [collectionName, setCollectionName] = useState('');

  const onClose = () => {
    dispatch(actionSetCollectionModalOpen(false));
    dispatch(actionSetCollectionType(''));
  };

  useEffect(() => {
    switch (modalCollectionType) {
      case 'add':
        setModalTile('ThÃªm bá»™ sÆ°u táº­p');
        setIsShowSelection(false);
        break;

      case 'edit':
        setModalTile('Sá»­a bá»™ sÆ°u táº­p');
        setIsShowSelection(false);
        break;

      case 'addPosts':
        setModalTile('ThÃªm bÃ i viáº¿t vÃ o bá»™ sÆ°u táº­p');
        if (colOptions.length > 0) setIsShowSelection(true);
        break;

      default:
        break;
    }
  }, [modalCollectionType, colOptions]);

  useEffect(() => {
    if (collections) {
      const options = collections.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setColOptions(options);
    } else {
      setColOptions([]);
    }
  }, [collections]);

  useEffect(() => {
    if (currentCollection) {
      setCollectionName(currentCollection.name);
    } else {
      setCollectionName('');
    }
  }, [currentCollection]);

  const onSave = async () => {
    switch (modalCollectionType) {
      case 'add':
        dispatch(
          actionSaveCollection({
            name: collectionName,
          })
        );
        onClose();
        break;

      case 'edit':
        dispatch(
          actionSaveCollection({
            id: currentCollection.id,
            name: collectionName,
          })
        );
        onClose();
        break;

      case 'addPosts':
        if (!collectionName && !selectedCollection) {
          toast.error('Vui lÃ²ng chá»n hoáº·c nháº­p tÃªn bá»™ sÆ°u táº­p');
          return;
        }

        // Check collection limit for existing collection
        if (selectedCollection && !collectionName) {
          const selectedCol = collections.find(col => col.id === selectedCollection.value);
          const currentPostCount = selectedCol?.posts_count ?? 0;
          const newPostCount = chosenPosts.length;
          const totalCount = currentPostCount + newPostCount;

          if (totalCount > COLLECTION_MAX_ITEMS_WARNING) {
            confirmAlert({
              title: 'Cáº£nh bÃ¡o sá»‘ lÆ°á»£ng bÃ i viáº¿t',
              message: `Má»—i bá»™ sÆ°u táº­p cÃ³ nhiá»u hÆ¡n ${COLLECTION_MAX_ITEMS_WARNING} bÃ i viáº¿t cÃ³ thá»ƒ lÃ m cháº­m tá»‘c Ä‘á»™ xá»­ lÃ½. Báº¡n Ä‘ang thÃªm ${newPostCount} bÃ i viáº¿t vÃ o BST "${selectedCol?.name}" cÃ³ ${currentPostCount} bÃ i viáº¿t. Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n thÃªm?`,
              buttons: [
                {
                  label: 'Tiáº¿p tá»¥c',
                  onClick: () => {
                    dispatch(
                      actionSavePostsToCollection(
                        selectedCollection?.value,
                        collectionName,
                        chosenPosts,
                        onClose
                      )
                    );
                    dispatch(actionUpdateChosenPosts([]));
                  },
                },
                {
                  label: 'Há»§y',
                  onClick: () => {},
                },
              ],
            });
            return;
          }
        }

        if (collectionName) {
          const newPostCount = chosenPosts.length;
          
          if (newPostCount > COLLECTION_MAX_ITEMS_WARNING) {
            confirmAlert({
              title: 'Cáº£nh bÃ¡o sá»‘ lÆ°á»£ng bÃ i viáº¿t',
              message: `Báº¡n Ä‘ang táº¡o bá»™ sÆ°u táº­p má»›i vá»›i ${newPostCount} bÃ i viáº¿t. Má»—i bá»™ sÆ°u táº­p cÃ³ nhiá»u hÆ¡n ${COLLECTION_MAX_ITEMS_WARNING} bÃ i viáº¿t cÃ³ thá»ƒ lÃ m cháº­m tá»‘c Ä‘á»™ xá»­ lÃ½. Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n táº¡o?`,
              buttons: [
                {
                  label: 'Tiáº¿p tá»¥c',
                  onClick: () => {
                    dispatch(
                      actionSavePostsToCollection(0, collectionName, chosenPosts, onClose)
                    );
                    dispatch(actionUpdateChosenPosts([]));
                  },
                },
                {
                  label: 'Há»§y',
                  onClick: () => {},
                },
              ],
            });
            return;
          }
          
          dispatch(
            actionSavePostsToCollection(0, collectionName, chosenPosts, onClose)
          );
          dispatch(actionUpdateChosenPosts([]));
        } else {
          // save posts to collection
          dispatch(
            actionSavePostsToCollection(
              selectedCollection?.value,
              collectionName,
              chosenPosts,
              onClose
            )
          );
          dispatch(actionUpdateChosenPosts([]));
        }
        break;

      default:
        break;
    }
  };

  return (
    <Transition appear show={modalCollectionOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-9999 max-w-md mt-1"
        style={{ maxWidth: '30%' }}
        onClose={onClose}
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
          <div className="flex items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-30% transform rounded-lg pb-3 bg-white text-left align-middle shadow-xl transition-all relative">
                {loadingSaveCollection && (
                  <div className="loading absolute w-full h-full top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-gray-300 bg-opacity-50 z-10">
                    <FaSpinner
                      size={32}
                      color="primary"
                      className="animate-spin"
                    />
                  </div>
                )}
                <div className="flex justify-between border-b border-gray-200 pb-2 px-3 pt-3">
                  <h5 className="font-bold text-base">{modalTile}</h5>
                  <FiX
                    size={35}
                    onClick={onClose}
                    className="bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 p-1"
                  />
                </div>
                <div className="px-3">
                  {/* form collection name */}
                  <div className="mt-4">
                    <label className="block font-bold mb-2">
                      {isShowSelection
                        ? 'ThÃªm má»›i bá»™ sÆ°u táº­p'
                        : 'TÃªn bá»™ sÆ°u táº­p'}
                    </label>
                    <input
                      type="text"
                      placeholder="Nháº­p tÃªn bá»™ sÆ°u táº­p"
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={collectionName}
                      name="collection_name"
                      onChange={(e) => setCollectionName(e.target.value)}
                    />

                    {/* selection */}

                    {isShowSelection && (
                      <div className="mt-2">
                        <label className="block font-bold mb-2">
                          Hoáº·c chá»n BST Ä‘Ã£ cÃ³
                        </label>
                        <div className="mt-4">
                          <Select
                            options={colOptions}
                            placeholder="Chá»n bá»™ sÆ°u táº­p"
                            value={selectedCollection}
                            onChange={(e) => setSelectedCollection(e)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {/* button */}
                  <div className="flex justify-end mt-4 px-3">
                    <Button
                      color="blue"
                      className="mr-2"
                      onClick={() => onSave()}
                    >
                      LÆ°u
                    </Button>
                    <Button color="red" onClick={onClose}>
                      Há»§y
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalCollection;


