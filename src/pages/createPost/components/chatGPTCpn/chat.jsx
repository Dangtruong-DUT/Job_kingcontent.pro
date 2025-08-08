import React, { Fragment, useEffect, useState } from 'react';
import {
  FiCheckCircle,
  FiMaximize,
  FiEdit,
  FiRefreshCcw,
  FiSave,
  FiSearch,
  FiTrash,
  FiX,
  FiEye,
} from 'react-icons/fi';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import LoadingApp from '@/../../../components/LoadingApp';
import {
  ACTION_QUESTION_CHAT_GPT,
  actionQuestionChatGPT,
  actionUpdateSyncRequestPedding,
  createContentToHomepage,
  saveHistory,
  toggleEditorText,
  updateHistoryHashtag,
  updateIsSavedChatGPT,
} from '@/../../../store/actions/createContent';
import { actionLoadingApp } from '@/../../../store/actions/loading';
import PopupDetailContentChat from '@/popupDetailContentChat';
import { toast } from 'react-toastify';
import PopupTag from '@/popupTag';
import { TYPE_GO_CHAT } from '@/../../../utils/utilityFunc';

import { confirmAlert } from 'react-confirm-alert';

const TextStyled = styled.div`
  span {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;


const Chat = (props) => {
  const { inputValue = '', setInputValue, type = 'chatgpt' } = props;
  const dispatch = useDispatch();
  const [inputLastValue, setInputLastValue] = useState('');
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const { chatGPTdata } = useSelector((state) => state['createPost']);
  const { isCreateToHomepage } = useSelector((state) => state['createPost']);
  const { isLoading } = useSelector((state) => state.isLoadingApp);
  const [isCoppied, setIsCoppied] = useState({ status: false, id: null });
  const { syncRequestPedding } = useSelector((state) => state['createPost']);
  const [isPopupTag, setisPopupTag] = useState(false);
  const [isContent, setIsContent] = useState('');

  const handleRenderAnswer = async () => {
    const { status = '', question = '' } = isCreateToHomepage;
    if (status && question !== '') {
      const _newSync = [...syncRequestPedding];
      _newSync.push({
        title: isCreateToHomepage.question,
        status: 'REJECT',
      });
      dispatch(actionUpdateSyncRequestPedding(_newSync));
      dispatch(actionQuestionChatGPT({ question: question }));
      return;
    }
    if (inputValue === '') alert('Vui lÃ²ng nháº­p cÃ¢u há»i !');
    if (inputValue !== '') {
      const _newSync = [...syncRequestPedding];
      _newSync.push({
        title: inputValue,
        status: 'REJECT',
      });
      setInputValue('');
      dispatch(actionUpdateSyncRequestPedding(_newSync));
      setInputLastValue(inputValue);
      dispatch(actionQuestionChatGPT({ question: inputValue }));
    }
  };

  const handleCoppyToClipBoard = (content, id) => {
    dispatch(toggleEditorText(content));
    setIsCoppied({ status: true, id: id });
    toast.success('Thao tÃ¡c thÃ nh cÃ´ng');
    setTimeout(() => {
      setIsCoppied({ status: false, id: null });
    }, 2000);
  };

  const handleReplaceQuestion = (question, id) => {
    confirmAlert({
      title: 'XÃ¡c nháº­n',
      message: 'Báº¡n cÃ³ muá»‘n Ä‘á»•i má»™t content má»›i?',
      buttons: [
        {
          label: 'Thay tháº¿ ná»™i dung cÅ©',
          onClick: () => {
            const _newSync = [...syncRequestPedding];
            _newSync.push({
              title: question,
              status: 'REJECT',
            });
            dispatch(actionUpdateSyncRequestPedding(_newSync));
            const _newData = chatGPTdata.filter((_elt) => _elt.id !== id);
            dispatch({
              type: ACTION_QUESTION_CHAT_GPT,
              payload: _newData,
            });
            dispatch(actionQuestionChatGPT({ question: question }));
          },
        },
        {
          label: 'Láº¥y ná»™i dung má»›i',
          onClick: () => {
            const _newSync = [...syncRequestPedding];
            _newSync.push({
              title: question,
              status: 'REJECT',
            });
            dispatch(actionUpdateSyncRequestPedding(_newSync));
            dispatch(actionQuestionChatGPT({ question: question }));
          },
        },
        {
          label: 'Há»§y',
          onClick: () => {},
        },
      ],
      overlayClassName: 'large-confirmation',
    });
  };

  const handleDeteleQuestion = (id) => {
    const comfirm = confirm('Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n xoÃ¡ ná»™i dung nÃ y ?');
    if (comfirm) {
      const _newData = chatGPTdata.filter((_elt) => _elt.id !== id);
      dispatch({
        type: ACTION_QUESTION_CHAT_GPT,
        payload: _newData,
      });
      toast.success('XoÃ¡ thÃ nh cÃ´ng !');
    }
  };

  const handleSaveHistory = (editingHashtag = null) => {
    if (editingHashtag) {
      dispatch(
        updateHistoryHashtag(editingHashtag.oldTag, editingHashtag.newTag)
      );
      setisPopupTag(false);
    } else {
      const obj = {
        question: isContent.question,
        answer: isContent.answer,
        tag: isContent.tag,
      };
      dispatch(saveHistory(obj));
      dispatch(updateIsSavedChatGPT(isContent.id));
      setisPopupTag(false);
    }
  };

  const contentStyled = {
    display: '-webkit-box',
    WebkitLineClamp: 5,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };
  const togglePopup = (question, answer = undefined, id) => {
    setIsOpenPopup(!isOpenPopup);
    if (answer) {
      setIsContent({ question: question, content: answer, id });
    }
  };
  const togglePopupTag = () => {
    setisPopupTag(!isPopupTag);
  };
  useEffect(() => {
    dispatch(actionLoadingApp(false));
    if (isCreateToHomepage.status && isCreateToHomepage.type === TYPE_GO_CHAT) {
      handleRenderAnswer();
      dispatch(
        createContentToHomepage({
          status: true,
          question: '',
          type: TYPE_GO_CHAT,
        })
      );
    }
  }, []);

  const renderSingleContent = (question, answer, id, isSaved = false) => {
    return (
      <div
      className="bg-gray-100 rounded-lg shadow-sm p-3 mb-4"
    >
      <div>
        <h3 className="font-bold text-base">{question}</h3>
        <TextStyled>
          <span
            style={contentStyled}
            dangerouslySetInnerHTML={{ __html: answer }}
          ></span>
        </TextStyled>
      </div>
      <div className="flex justify-end gap-5 mt-3">
        <button
          onClick={() => handleReplaceQuestion(question, id)}
          title="Äá»•i káº¿t quáº£"
        >
          <FiRefreshCcw size="25" color="#000" />
        </button>
        <button
          onClick={() => togglePopup(question, answer, id)}
          title="Xem thÃªm"
        >
          <FiMaximize
            size="25"
            color="#FF8B13"
            className="hover:text-green-500"
          />
        </button>
        {isCoppied.status && isCoppied.id === id ? (
          <FiCheckCircle
            size="25"
            color="green"
            className="hover:text-green-500"
          />
        ) : (
          <button
            title="ÄÆ°a vÃ o trÃ¬nh soáº¡n tháº£o"
            onClick={() => handleCoppyToClipBoard(answer, id)}
          >
            <FiEdit
              size="25"
              color="green"
              className="hover:text-green-500"
            />
          </button>
        )}
        <button title="LÆ°u káº¿t quáº£">
          {isSaved ? (
            <FiCheckCircle
              size="25"
              color="green"
              className="hover:text-green-500"
            />
          ) : (
            <FiSave
              size="25"
              color="#FFD95A"
              onClick={() => {
                setIsContent({
                  question,
                  answer,
                  content: answer,
                  id,
                  tag: '',
                });
                setisPopupTag(true);
              }}
              className="hover:text-green-500"
            />
          )}
        </button>
        <button
          onClick={() => handleDeteleQuestion(id)}
          title="XoÃ¡ káº¿t quáº£"
        >
          <FiTrash
            size="25"
            color="red"
            className="hover:text-green-500"
          />
        </button>
      </div>
    </div>
    )
  }

  return (
    <div className="px-3">
      {/* =======================INPUT QUESTION===============  */}
      <div className="flex">
        <textarea
          className="w-full rounded-md shadow-sm border-gray-100 border-2 outline-none p-2"
          placeholder="Nháº­p ná»™i dung cÃ¢u há»i ..."
          rows={2}
          // disabled={isLoading}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="gap-2 flex ml-1">
          <button
            className="bg-blue-500 px-3 rounded-md hover:bg-gray-400 disabled:bg-gray-400 text-white"
            onClick={handleRenderAnswer}
            alt="TÃ¬m kiáº¿m"
          >
            Gá»¬I
          </button>
        </div>
      </div>
      {/* =================== ANSWER HERE ===================== */}
      <PerfectScrollbar className="w-full mt-4" style={{ maxHeight: '450px' }}>
        {syncRequestPedding.length > 0
          ? syncRequestPedding.map((_elt, index) => (
              <div
                className="animate-pulse bg-gray-100 rounded-lg shadow-sm p-3 mb-4 text-gray-400"
                key={index}
              >
                <div>
                  <h3 className="font-bold text-base">{_elt.title}</h3>
                  <TextStyled>
                    <span className="text-gray-400">Äang xá»­ lÃ½ ...</span>
                  </TextStyled>
                </div>
              </div>
            ))
          : null}
        {isLoading && syncRequestPedding.length === 0 ? <LoadingApp /> : null}
        {chatGPTdata.length === 0 &&
        !isLoading &&
        syncRequestPedding.length === 0 ? (
          <div className="flex justify-center mb-80">
            <span className="text-md font-bold text-center">
              KhÃ´ng cÃ³ cÃ¢u tráº£ lá»i nÃ o hiá»ƒn thá»‹ táº¡i Ä‘Ã¢y !
            </span>
          </div>
        ) : null}
        {chatGPTdata.length > 0
          ? [...chatGPTdata]
              .reverse()
              .map(({ question, answer, id, isSaved = false }, index) => (
                <Fragment key={index}>
                  {renderSingleContent(question, answer, id, isSaved)}
                </Fragment>
              ))
          : null}
      </PerfectScrollbar>
      <PopupDetailContentChat
        isOpen={isOpenPopup}
        id={isContent.id}
        toggle={togglePopup}
        handleCoppyToClipBoard={handleCoppyToClipBoard}
        content={isContent.content}
        question={isContent.question}
        type={type}
        isCoppied={isCoppied}
      />
      <PopupTag
        isOpen={isPopupTag}
        toggle={togglePopupTag}
        handleSaveHistory={handleSaveHistory}
        isContent={isContent}
        setIsContent={setIsContent}
      />
    </div>
  );
};

export default Chat;

