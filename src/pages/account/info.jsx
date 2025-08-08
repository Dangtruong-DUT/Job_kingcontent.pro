import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { FaFacebook, FaLock, FaUserShield } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { IoLogOut } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import logo from '@/assets/images/logo.jpg';
import { userServices } from '@/../services/users';
import { logoutFunction } from '@/store/actions/user';
import { _dashed_border } from '@/createPost/utility';
import ChangePassword from '@/changePassword';
import Facebook from '@/facebook';
import { Accordion, AccordionTab } from 'primereact/accordion';
import Threads from '@/threads';
import { maskEmail } from '@/../helpers';
import auth from '@/../utils/auth';
import { OK } from '@/../configs';
import { useLocation } from 'react-router-dom';
import { threadsService } from '@/../services/threads';
import { toast } from 'react-toastify';
import TikTokAccount from '@/tiktok';
import { tiktokService } from '@/../services/tiktok';
import { isDevMode } from '@/../utils/utilityFunc';

const Info = () => {
  const dispatch = useDispatch();
  const INFO = 'ThÃ´ng tin cÃ¡ nhÃ¢n';
  const SECURITY = 'CÃ i Ä‘áº·t báº£o máº­t';
  const SOCIAL = 'Káº¿t ná»‘i tÃ i khoáº£n';
  const LOGOUT = 'ÄÄƒng xuáº¥t';
  const [type, setType] = useState(SOCIAL);
  // @ts-ignore
  const { user } = useSelector((state) => state.userReducer);
  const [text, setText] = useState('');
  const changeType = (type) => {
    setType(type);
  };

  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code');
  const scopes = new URLSearchParams(location.search).get('scopes');
  const isDev = isDevMode();

  const renderRole = () => {
    let roleName = '';
    if (auth.isVip3()) {
      roleName = 'ThÃ nh viÃªn Vip 3';
    } else if (auth.isVip2()) {
      roleName = 'ThÃ nh viÃªn Vip 2';
    } else if (auth.isVip()) {
      roleName = 'ThÃ nh viÃªn Vip';
    } else if (auth.isVip3b()) {
      roleName = 'ThÃ nh viÃªn Vip 3B';
    } else if (auth.isVip3c()) {
      roleName = 'ThÃ nh viÃªn Vip 3C';
    } else {
      roleName = 'ThÃ nh viÃªn thÆ°á»ng';
    }
    return (
      <div className={`flex justify-between py-3 px-2`}>
        <span className="text-gray-400 text-base w-2/12">GÃ³i dá»‹ch vá»¥</span>
        <IoIosArrowForward size={25} className="w-1/12 text-gray-400" />
        <span className="text-base w-9/12">{roleName}</span>
      </div>
    );
  };

  const renderRow = (title, value, diver = true) => {
    return (
      <div
        className={`flex justify-between ${diver && 'border-b-2'} py-3 px-2`}
      >
        <span className="text-gray-400 text-base w-2/12">{title}</span>
        <IoIosArrowForward size={25} className="w-1/12 text-gray-400" />
        <span className="text-base w-9/12">{value}</span>
      </div>
    );
  };

  const handleLogout = () => {
    confirmAlert({
      title: 'ÄÄƒng xuáº¥t',
      // @ts-ignore
      message: (
        <span className="warning-content">
          Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n Ä‘Äƒng xuáº¥t ?
        </span>
      ),
      buttons: [
        {
          label: 'XÃ¡c nháº­n',
          onClick: async () => {
            dispatch(logoutFunction());
          },
        },
        {
          label: 'Huá»·',
          onClick: () => {},
        },
      ],
    });
  };

  useEffect(() => {
    const getMessageAdmin = async () => {
      const res = await userServices.getMessage();
      if (res.status === OK) {
        setText(res?.data?.data || '');
      }
    };
    getMessageAdmin();
  }, []);

  const getThreadsAccessToken = async (code) => {
    const res = await threadsService.getThreadsAccessToken(code);
    if (res.status === OK) {
      const isSuccess =
        res?.data?.success === 'true' || res?.data?.success === true;
      if (isSuccess) {
        window.location.href = '/user-info';
      } else {
        toast.error('Káº¿t ná»‘i tÃ i khoáº£n Threads tháº¥t báº¡i, vui lÃ²ng thá»­ láº¡i sau');
        setTimeout(() => {
          window.location.href = '/user-info';
        }, 2000);
      }
    }
  };

  const getTikTokAccessToken = async (code) => {
    const res = await tiktokService.getTikTokAccessToken(code);
    if (res.status === OK) {
      const isSuccess =
        res?.data?.success === 'true' || res?.data?.success === true;
      if (isSuccess) {
        window.location.href = '/user-info';
      } else {
        toast.error('Káº¿t ná»‘i tÃ i khoáº£n TIKTOK tháº¥t báº¡i, vui lÃ²ng thá»­ láº¡i sau');
        setTimeout(() => {
          window.location.href = '/user-info';
        }, 2000);
      }
    }
  };

  useEffect(() => {
    if (code) {
      if (scopes && isDev) {
        getTikTokAccessToken(code);
      } else {
        getThreadsAccessToken(code);
      }
    }
  }, [code, scopes]);

  return (
    <Fragment>
      {code ? (
        <div className="p-3 text-base uppercase h-80 flex items-center justify-center">
          Äang láº¥y thÃ´ng tin tÃ i khoáº£n, vui lÃ²ng Ä‘á»£i trong chá»‘c lÃ¡t...
        </div>
      ) : (
        <div className="bg-white rounded-lg mb-5 p-5 gap-2">
          <div>
            <h3 className="text-xl font-bold">
              Xin chÃ o , {user?.first_name} {user?.last_name}{' '}
            </h3>
          </div>
          {/* CONTENT ADMIN WRITE */}
          <div className="mt-2 mb-2">
            <div className="card">
              <Accordion activeIndex={0}>
                <AccordionTab header="ThÃ´ng bÃ¡o há»‡ thá»‘ng ">
                  <p
                    dangerouslySetInnerHTML={{ __html: text }}
                    className="mb-5"
                  ></p>
                </AccordionTab>
              </Accordion>
            </div>
          </div>
          <div className="flex mt-3 gap-2">
            <div className="w-1/4 border-r-2 border-dashed border-gray-100">
              <div className="flex items-center">
                <img
                  src={`${
                    user.facebook_id
                      ? `https://graph.facebook.com/${user?.facebook_id}/picture?width=1000&height=1000`
                      : logo
                  }`}
                  alt=""
                  className="rounded-full"
                  width={60}
                  height={60}
                />
                <span className="ml-2 font-bold text-base">{user?.name}</span>
              </div>
              <div className={_dashed_border}></div>
              <div className="mt-2">
                <div className="mb-5">
                  <div className="flex justify-between items-center hover:underline hover:text-red-500">
                    <div
                      className={`flex items-center ${
                        type === INFO
                          ? 'font-bold text-red-500 cursor-pointer'
                          : ''
                      }`}
                      onClick={() => changeType(INFO)}
                    >
                      {' '}
                      <FaUserShield
                        size={30}
                        color={type === INFO ? '#EF4040' : '#000'}
                      />
                      <span className="ml-2 text-md cursor-pointer">
                        ThÃ´ng tin cÃ¡ nhÃ¢n
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <div className="flex justify-between items-center hover:underline hover:text-red-500">
                    <div
                      className={`flex items-center ${
                        type === SECURITY
                          ? 'font-bold text-red-500 cursor-pointer'
                          : ''
                      }`}
                      onClick={() => changeType(SECURITY)}
                    >
                      {' '}
                      <FaLock
                        size={25}
                        color={type === SECURITY ? '#EF4040' : '#000'}
                      />
                      <span className="ml-2 text-md cursor-pointer">
                        CÃ i Ä‘áº·t báº£o máº­t
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <div className="flex justify-between items-center hover:underline hover:text-red-500">
                    <div
                      className={`flex items-center ${
                        type === SOCIAL
                          ? 'font-bold text-red-500 cursor-pointer'
                          : ''
                      }`}
                      onClick={() => changeType(SOCIAL)}
                    >
                      <FaFacebook
                        size={25}
                        color={type === SOCIAL ? '#EF4040' : '#000'}
                      />
                      <span className="ml-2 text-md cursor-pointer">
                        {SOCIAL}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <div className="flex justify-between items-center hover:underline hover:text-red-500">
                    <div
                      className={`flex items-center ${
                        type === LOGOUT
                          ? 'font-bold text-red-500 cursor-pointer'
                          : ''
                      }`}
                      onClick={() => handleLogout()}
                    >
                      <IoLogOut
                        size={35}
                        color={type === LOGOUT ? '#EF4040' : '#000'}
                      />
                      <span className="ml-2 text-md cursor-pointer">
                        {LOGOUT}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-3/4">
              {type === INFO ? (
                <>
                  <h2 className="font-bold text-xl">{type}</h2>
                  <div className="mt-2">
                    {renderRow(
                      'TÃªn Ä‘áº§y Ä‘á»§',
                      `${user.first_name} ${user.last_name}`
                    )}
                    {renderRow('TÃªn hiá»ƒn thá»‹', user.name)}
                    {/* only show parts of email */}
                    {renderRow('TÃªn email', maskEmail(user.email))}
                    {/* {renderRow(
                    'Sá»‘ Ä‘iá»‡n thoáº¡i',
                    user.phone_number ? user.phone_number : ''
                  )} */}
                    {renderRow(
                      'NgÃ y tham gia',
                      user.created_at
                        ? moment(user.created_at).format('DD-MM-YYYY')
                        : '',
                      true
                    )}
                    {/* expired day */}
                    {renderRow(
                      'NgÃ y háº¿t háº¡n',
                      user.date_expired
                        ? moment
                            .unix(user.date_expired)
                            .utc(true)
                            .format('DD-MM-YYYY')
                        : '',
                      true
                    )}
                    {/* current package */}
                    {renderRole()}
                  </div>
                </>
              ) : type === SECURITY ? (
                <ChangePassword />
              ) : type === SOCIAL ? (
                <div
                  className={`socials w-full grid gap-2 ${
                    isDev ? 'grid-cols-3' : 'grid-cols-2'
                  }`}
                >
                  <div className="">
                    <Facebook user={user} />
                  </div>
                  <div className="">
                    <Threads />
                  </div>
                  {isDev ? (
                    <div className="">
                      <TikTokAccount />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Info;




