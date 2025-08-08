import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import LoadingApp from '@/../components/LoadingApp';
import ListVideos from '@/../components/VideoEditor/ListVideos';
import ContentDetail from '@/../components/CategoriesContent/ContentDetail';
import ModalHashTag from '@/../components/VideoEditor/ModalHashTag';
import { useDispatch, useSelector } from 'react-redux';
import { actionSetShowModal } from '@/store/actions/videoEditor';
import auth from '@/../utils/auth';
import { useHistory } from 'react-router-dom';
// @ts-ignore
import CreateVideoIcon from '@/assets/images/icon/video-editing.png';
import { confirmAlert } from 'react-confirm-alert';
import { VIDEO_EDITOR_URL } from '@/../configs';

export default function VideoList() {
  // @ts-ignore
const { isLoading, showModal } = useSelector((state) => state.videoEditor);
// @ts-ignore
const {contentDetailToShow } = useSelector((state) => state.contents);
const dispatch = useDispatch();
const [hasPermission, setHasPermission] = useState(false);
const [isCheckingPermission, setIsCheckingPermission] = useState(true);
const history = useHistory();

useEffect(() => {
  if(!isCheckingPermission) {
    if (!hasPermission) {
      history.push("/chua-kich-hoat-vip3");
    }
  }
}, [hasPermission, isCheckingPermission, history]);

useEffect(() => {
  setHasPermission(auth.isHasVip3());
  setIsCheckingPermission(false);

  return () => {
    setHasPermission(false);
  };
}, []);

  const onClickVideoEditor = () => {
    const accessToken = auth.getToken();
    if (!accessToken) {
      confirmAlert({
        title: 'ThÃ´ng bÃ¡o',
        message: 'Báº¡n cáº§n Ä‘Äƒng nháº­p Ä‘á»ƒ sá»­ dá»¥ng tÃ­nh nÄƒng nÃ y.',
        buttons: [
          {
            label: 'OK',
            onClick: () => window.location.href = '/login',
          },
        ],
      });
      return;
    }
    const url = new URL(`${VIDEO_EDITOR_URL}/`);
    url.searchParams.set('access_token', accessToken);
    window.open(url.toString(), '_blank');
  }

  return (
    <div className="min-h-screen text-gray-900">
      <Helmet>
        <title>Video cá»§a báº¡n</title>
      </Helmet>

      <div className="flex bg-white rounded-md mb-4 p-6 items-center gap-3">
        {auth.isHasVip3() && (
          <button className="h-10 flex items-center px-4 rounded-lg bg-red-600 text-white transform shadow-sm hover:shadow-md hover:scale-105 transition-all duration-350" onClick={onClickVideoEditor}>
            <img
              src={CreateVideoIcon}
              alt="Táº¡o video"
              className="w-4 h-4 mr-2 text-white"
              style={{ filter: 'invert(1)' }}
            />
            Táº¡o video
          </button>
        )}
        <h1 className="text-2xl font-bold">Video cá»§a báº¡n</h1>
      </div>
      {isCheckingPermission ? (
        <LoadingApp />
      ) : hasPermission ? (
        <ListVideos />
      ) : null}

      {contentDetailToShow && <ContentDetail />}

      {showModal && (
        <ModalHashTag
          modalHashTagOpen={showModal}
          onClose={() => dispatch(actionSetShowModal(false))}
        />
      )}
    </div>
  );
}





