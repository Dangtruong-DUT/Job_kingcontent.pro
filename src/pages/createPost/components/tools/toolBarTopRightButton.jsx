import React, { useEffect, useState } from 'react';
import { FaLayerGroup, FaTrash } from 'react-icons/fa';
import {
  KEY_EDITOR_IMAGE,
  KEY_INDEX_IMAGE_SELECT,
} from '@/../../../reducers/createContent';
import { REDUX_NAME_CREATE_POST } from '@/../../../utils/utilityFunc';
import { useSelector } from 'react-redux';
import { IoSaveSharp } from 'react-icons/io5';
import { isArrayEmpty } from '@/../../../configs';
import { MdLibraryAdd } from 'react-icons/md';
import { IoMdArrowRoundBack } from 'react-icons/io';

const ToolBarTopRightButton = ({
  setLayerStatus,
  layerStatus,
  editor,
  removeObject,
  handleSaveEdit,
  resetCanvas,
  downloadImage,
  isSaveImage,
  setIsEditor,
  handleAddToEditor,
}) => {
  const {
    [KEY_EDITOR_IMAGE]: initalImage,
    [KEY_INDEX_IMAGE_SELECT]: indexImageSelect,
  } = useSelector((state) => state[REDUX_NAME_CREATE_POST]);

  return (
    <div className="flex items-center gap-3">
      {editor && editor.canvas.getActiveObject() && (
        <>
          <div
            className="bg-gray-500 p-2 gap-1 text-white rounded-md hover:bg-indigo-600 font-bold flex items-center hover:text-white"
            onClick={() => removeObject(5)}
            color="#2d1be4"
            tooltip="Remove"
          >
            <FaTrash size={20} />
            <span>XoÃ¡</span>
          </div>
        </>
      )}
      {initalImage && location.pathname !== '/chinh-sua-anh' && (
        <div>
          <button
            className="bg-gray-500 p-2 gap-2 text-white rounded-md hover:bg-indigo-600 font-bold flex items-center hover:text-white cursor-pointer"
            onClick={() => {
              setIsEditor(false);
              editor.deleteAll();
            }}
          >
            <IoMdArrowRoundBack size={20} />
            <span>Trá»Ÿ vá» trÃ¬nh soáº¡n tháº£o</span>
          </button>
        </div>
      )}
      {editor && !isArrayEmpty(editor.canvas.getObjects()) && (
        <button
          className="bg-gray-500 p-2 text-white download-tool rounded-md hover:bg-indigo-600 font-bold flex items-center gap-2 hover:text-white"
          onClick={() => resetCanvas()}
          color="#2d1be4"
        >
          <MdLibraryAdd size={20} />
          <span>Táº¡o má»›i</span>
        </button>
      )}
      {indexImageSelect !== null ? (
        <button
          className="bg-gray-500 p-2 text-white download-tool rounded-md hover:bg-indigo-600 font-bold flex items-center gap-2 hover:text-white"
          onClick={() => handleSaveEdit()}
          color="#2d1be4"
          title="LÆ°u áº£nh"
          disabled={isSaveImage}
        >
          <IoSaveSharp size={20} />
          <span>{isSaveImage ? 'Äang lÆ°u ...' : 'LÆ°u hÃ¬nh áº£nh'} </span>
        </button>
      ) : (
        <button
          className="bg-gray-500 p-2 text-white rounded-md hover:bg-indigo-600 font-bold flex items-center gap-2 hover:text-white"
          onClick={() => handleAddToEditor()}
          color="#2d1be4"
          title="ÄÆ°a vÃ o trÃ¬nh soáº¡n tháº£o"
        >
          <IoSaveSharp size={20} />
          <span>LÆ°u hÃ¬nh áº£nh</span>
        </button>
      )}
      {!layerStatus && (
        <button
          className={`bg-gray-500 p-2 text-white download-tool rounded-md hover:bg-indigo-600 ${
            layerStatus && 'bg-indigo-600'
          } font-bold flex items-center gap-2 hover:text-white`}
          onClick={() => setLayerStatus(!layerStatus)}
          color="#2d1be4"
        >
          <FaLayerGroup size={20} />
          {/* <span>ThÃ nh pháº§n</span> */}
        </button>
      )}
    </div>
  );
};

export default ToolBarTopRightButton;

