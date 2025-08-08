import { Dialog } from 'primereact/dialog';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiTrash, FiX } from 'react-icons/fi';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ColorPicker from 'react-pick-color';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import uploadCloud from '@/../../../assets/images/icon/plan/cloud-computing.png';

import { InputSwitch } from 'primereact/inputswitch';
import {
  KEY_HASH_TAG_PLANS,
  KEY_IMAGES,
} from '@/../../../reducers/createContent';
import { CreateContent } from '@/../../../services/createContent';
import {
  actionGetLabels,
  actionGetPlans,
  updateProps,
} from '@/../../../store/actions/createContent';

import { Tab } from '@headlessui/react';
import axios from 'axios';
import { ResourcesService } from '@/../../../services/resources';
import {
  UPLOAD_TYPE_IMAGE,
  _text_title,
  getBodyCreatePlan,
  getObject_create_post,
} from '@/../utility';
import PopupSuggTagChatgpt from '@/popupSuggTagChatgpt';
import { initialColor, initialValues } from '@/utility';
import './custom.css';
import { isArrayEmpty, OK } from '@/../../../configs';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
const userTag = {
  id: 0,
  name: '',
};

const maxUserTag = 10;

const PopupCreatePlan = ({
  isOpen = true,
  setOpen,
  setOriginalPlans,
  editItem = undefined,
  isEdit = false,
  setIsEdit,
  handleSelectPlan,
}) => {
  const [isAdvance, setIsAdvance] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: initialValues,
  });
  const { user } = useSelector((state) => state.userReducer);
  const [tagsSelect, setTagsSelect] = useState(new Set() || []);

  const { [KEY_HASH_TAG_PLANS]: tags, [KEY_IMAGES]: images } = useSelector(
    (state) => state.createPost
  );
  const [isLoadingUploadFile, setIsLoadingUploadFile] = useState(false);
  const [isLoadingCreatePlan, setIsLoadingCreatePlan] = useState(false);
  const cancelButtonRef = useRef();
  const [color, setColor] = useState(null);
  const dispatch = useDispatch(``);
  const watchAllFields = watch();
  const [userTags, setUserTags] = useState([]);
  const [currentTag, setCurrentTag] = useState(null);

  const getLatestTagId = () => {
    if (isArrayEmpty(userTags)) {
      return 0;
    } else {
      return userTags[userTags.length - 1].id;
    }
  };

  const onAddUserTag = () => {
    if (userTags.length >= maxUserTag) {
      toast.error(
        'Sá»‘ lÆ°á»£ng cá»™t content tá»‘i Ä‘a lÃ  10, vui lÃ²ng táº¡o káº¿ hoáº¡ch má»›i !'
      );
      return;
    }
    const newUserTag = {
      ...userTag,
      id: getLatestTagId() + 1,
    };
    setCurrentTag(newUserTag);
  };

  const onSaveUserTag = (userTag) => {
    if (userTags.length === 0) {
      setUserTags([userTag]);
    } else {
      const searchIndex = userTags.findIndex((tag) => tag.id === userTag.id);
      if (searchIndex === -1) {
        setUserTags([...userTags, userTag]);
      } else {
        const updatedUserTags = [...userTags];
        updatedUserTags[searchIndex] = userTag;
        setUserTags(updatedUserTags);
      }
    }
  };

  const onDeleteUserTag = (tag) => {
    const updatedUserTags = userTags.filter((item) => item.id !== tag.id);
    setUserTags(updatedUserTags);
  };

  const onSubmit = async (data) => {
    setIsLoadingCreatePlan(true);
    if (data.color === null && data.thumbnail === null) {
      toast.error('Vui lÃ²ng chá»n hÃ¬nh áº£nh hoáº·c mÃ u ná»n !');
      setIsLoadingCreatePlan(false);
      return;
    }

    if (!isEdit) {
      if (
        (data.productName === null || data.productName === '') &&
        isAdvance &&
        tagsSelect.size !== 0
      ) {
        toast.error('Vui lÃ²ng nháº­p tÃªn sáº£n pháº©m !');
        setIsLoadingCreatePlan(false);
        return;
      }
      const requestData = getBodyCreatePlan(data, tagsSelect, userTags);
      const res = await CreateContent.createPlan(requestData);
      const { status, data: resData } = res;
      if (status === OK) {
        toast.success('Táº¡o má»›i thÃ nh cÃ´ng !');
        setIsLoadingCreatePlan(false);
        reset();
        setTagsSelect(new Set());
        dispatch(actionGetPlans(setOriginalPlans));
        setOpen(false);
        handleSelectPlan({
          name: resData?.data?.name,
          id: resData?.data?.id,
        });
        setCurrentTag(null);
        setUserTags([]);
        dispatch(actionGetLabels());
      }
    } else {
      const res = await CreateContent.updatePlan(
        editItem.id,
        getBodyCreatePlan(data)
      );
      if (res.status === OK) {
        toast.success('Cáº­p nháº­t thÃ nh cÃ´ng !');
        setIsLoadingCreatePlan(false);
        reset();
        dispatch(actionGetPlans(setOriginalPlans));
        setOpen(false);
        dispatch(actionGetLabels());
      }
    }
  };

  const getAllImage = async () => {
    const res = await ResourcesService.getAllFile();
    if (res.status === OK) {
      const imageFilter = res.data.data.filter(
        (_elt) => _elt.type === UPLOAD_TYPE_IMAGE
      );
      dispatch(
        updateProps([
          {
            prop: KEY_IMAGES,
            value: imageFilter,
          },
        ])
      );
    }
  };

  const handleUploadFile = async (evt) => {
    const file = event.target.files[0];
    if (file.size > MAX_FILE_SIZE) {
      toast.warning('Vui lÃ²ng chá»n áº£nh cÃ³ dung lÆ°á»£ng nhá» hÆ¡n 2MB !');
      return;
    }
    toast.info('Äang táº£i áº£nh lÃªn ... Vui lÃ²ng chá» trong giÃ¢y lÃ¡t !');
    setIsLoadingUploadFile(true);
    const formData = new FormData();
    formData.append('files[]', evt.target.files[0], evt.target.files[0].name);
    const res = await ResourcesService.uploadFile(formData);
    if (res.status === OK) {
      setIsLoadingUploadFile(false);
      dispatch(
        updateProps([
          {
            prop: KEY_IMAGES,
            value: res.data.data,
          },
        ])
      );
      toast.dismiss();
      toast.success('Táº£i áº£nh thÃ nh cÃ´ng !');
    }
  };

  const deleteFile = async (id) => {
    const res = await ResourcesService.deleteFile(id);
    if (res.status === OK) {
      getAllImage();
    }
  };

  useEffect(() => {
    setIsAdvance(false);
    getAllImage();
    reset();
    setTagsSelect(new Set());
  }, [isOpen]);

  useEffect(() => {
    if (isEdit) {
      setValue('name', editItem?.name);
      setValue('color', editItem?.color);
      setValue('hashtag', editItem?.hashtag);
      setValue('thumbnail', editItem?.thumbnail);
      setColor(editItem?.color);
    }
  }, [isEdit, editItem]);

  return (
    <Dialog
      header={isEdit ? 'Cáº¬P NHáº¬T Káº¾ HOáº CH' : 'Láº¬P Káº¾ HOáº CH Má»šI'}
      visible={isOpen}
      baseZIndex={999999}
      className={isAdvance ? 'w-2/3' : 'w-1/3'}
      onHide={() => setOpen(false)}
      dismissableMask
    >
      <div className="flex items-center gap-3 mb-3 mt-2">
        <span className="font-bold">CÆ¡ báº£n</span>
        <InputSwitch
          checked={isAdvance}
          onChange={(e) => setIsAdvance(e.value)}
          className="switchCustom"
        />
        <span className="font-bold">NÃ¢ng cao</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5">
          <div className={isAdvance ? 'w-1/2' : 'w-full'}>
            <div className="mb-2">
              <p className={`${_text_title} text-blue-500`}>TÃªn káº¿ hoáº¡ch *</p>
              <input
                type="text"
                className={`w-full rounded-lg border-2  ${
                  errors['name'] ? 'border-red-400' : 'border-gray-400'
                }`}
                {...register('name', { required: true })}
              />
            </div>
            <p className={`${_text_title} text-blue-500`}>
              Chá»n mÃ u ná»n hoáº·c hÃ¬nh ná»n
            </p>
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-gray-200 p-1">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 font-medium leading-5 text-blue-700',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 btn__update-text',
                      selected
                        ? 'bg-white shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-black'
                    )
                  }
                >
                  <div className="flex justify-between items-center">
                    <div></div>
                    <span>MÃ u ná»n</span>
                    {watchAllFields.color !== null ? (
                      <FiX
                        color="#CD1818"
                        onClick={() => {
                          setColor(initialColor);
                          setValue('color', null);
                        }}
                        size={20}
                        className="cursor-pointer hover:bg-gray-200 rounded-md mr-3"
                      />
                    ) : (
                      <div></div>
                    )}
                  </div>
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 font-medium leading-5 text-blue-700',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 btn__update-text',
                      selected
                        ? 'bg-white shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-black'
                    )
                  }
                >
                  <div className="flex justify-between items-center">
                    <div></div>
                    <span>HÃ¬nh ná»n</span>
                    {watchAllFields.thumbnail !== null ? (
                      <FiX
                        color="#CD1818"
                        onClick={() => {
                          setValue('thumbnail', null);
                        }}
                        size={20}
                        className="cursor-pointer hover:bg-gray-200 rounded-md mr-3"
                      />
                    ) : (
                      <div></div>
                    )}
                  </div>
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-2 overflow-x-hidden max-h-screen">
                <Tab.Panel>
                  <div
                    className={`mb-2 ${
                      watchAllFields.thumbnail !== null
                        ? 'pointer-events-none opacity-50'
                        : ''
                    } `}
                  >
                    <div className="flex items-center justify-between"></div>
                    <ColorPicker
                      color={color}
                      width={470}
                      className="w-full"
                      theme={{
                        boxShadow: 'none',
                        minWidth: '470px',
                        overflow: 'hidden',
                      }}
                      onChange={(color) => {
                        setColor(color.hex);
                        setValue('thumbnail', null);
                        setValue('color', color.hex);
                      }}
                    />
                  </div>
                </Tab.Panel>
                <Tab.Panel className="mt-2 overflow-scroll overflow-x-hidden max-h-screen">
                  <div
                    className={`mb-2 ${
                      watchAllFields.color !== null
                        ? 'pointer-events-none opacity-50'
                        : ''
                    } `}
                  >
                    {/* //, image/png, image/gif, image/jpeg */}
                    {/* max size 2MB */}
                    <input
                      type="file"
                      onChange={handleUploadFile}
                      accept="image/*"
                      id="img-upload"
                      name="fav_language"
                      className="hidden"
                    />
                    <label
                      for="img-upload"
                      className="ml-2 flex justify-center items-center cursor-pointer"
                    >
                      <img
                        src={uploadCloud}
                        alt="kingcontent upload file"
                        className="h-24"
                      />
                    </label>
                    <PerfectScrollbar
                      className="grid grid-cols-3 gap-2"
                      style={{ height: '230px' }}
                    >
                      {images.map((_elt, index) => (
                        <div
                          key={index}
                          className={`p-1 h-28 relative rounded-lg border-2 shadow-lg cursor-pointer ${
                            watchAllFields.thumbnail === _elt.url
                              ? 'border-red-500'
                              : ''
                          }`}
                          onClick={() => {
                            setValue('thumbnail', _elt.url);
                            setValue('color', null);
                          }}
                        >
                          <button className="absolute top-0 right-1 border-red-500 p-1 border rounded-full bg-opacity-40 bg-gray-900 hover:bg-white">
                            <FiX
                              size={16}
                              color="red"
                              onClick={() => deleteFile(_elt.id)}
                            />
                          </button>
                          {_elt.type === 'image' && (
                            <img
                              src={_elt.url}
                              className="rounded-lg max-h-full max-w-full object-fit m-auto"
                            />
                          )}
                        </div>
                      ))}
                    </PerfectScrollbar>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
          {isAdvance && (
            <div className="w-1/2">
              <div className="mb-2">
                <p className={`${_text_title} text-blue-500`}>Gáº®N NHÃƒN</p>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="VÃ­ dá»¥ : Content bÃ¡n hÃ ng , Content báº¯t trends ..."
                    className={`w-full rounded-lg border-2  ${
                      errors['hashtag'] ? 'border-red-500' : 'border-gray-400'
                    }`}
                    {...register('hashtag', { required: isAdvance })}
                  />
                </div>
                <div className="mt-2">
                  <span className={`${_text_title} text-blue-500`}>
                    CÃC Cá»˜T CONTENT BÃŠN TRONG
                  </span>
                  <PopupSuggTagChatgpt
                    setTagsSelect={setTagsSelect}
                    tagsSelect={tagsSelect}
                    userTags={userTags}
                    onAddUserTag={onAddUserTag}
                    onSaveUserTag={onSaveUserTag}
                    onDeleteUserTag={onDeleteUserTag}
                    currentTag={currentTag}
                    setCurrentTag={setCurrentTag}
                  />
                </div>
                {tagsSelect.size || userTags.length ? (
                  <>
                    <p className={`${_text_title} text-blue-500 mt-2`}>
                      TÃªn sáº£n pháº©m
                    </p>
                    <p className="text-red-500 italic font-bold mb-2">
                      (*)MÃ¡y tÃ­nh sáº½ tá»± Ä‘á»™ng gá»£i Ã½ content cÃ³ sáºµn cho báº¡n
                    </p>
                    <input
                      type="text"
                      className={`w-full rounded-lg border-2 `}
                      {...register('productName')}
                    />
                  </>
                ) : null}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center mt-5 gap-2">
          <button
            disabled={isLoadingUploadFile || isLoadingCreatePlan}
            className="p-3 rounded-md bg-blue-500 text-white w-full hover:bg-gray-500"
            type="submit"
          >
            {isLoadingCreatePlan
              ? 'Äang xá»­ lÃ½ ...'
              : isEdit
              ? 'Cáº­p nháº­t'
              : 'Táº¡o má»›i'}
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default PopupCreatePlan;

