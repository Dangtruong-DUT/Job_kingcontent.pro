import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import LoginLogo from '@/assets/images/login.png';
import LoginForm from '@/components/LoginForm';
import { useHistory } from 'react-router';
import TermConditions from '@/components/LoginForm/TermConditions';
import { useState } from 'react';

const Login = () => {
  const loggedIn = useSelector((state) => state.userReducer.loggedIn);
  const history = useHistory();
  const [isShowTermConditions, setIsShowTermConditions] = useState(false);

  useEffect(() => {
    if (loggedIn === true) {
      history.push('/user-info');
    }
  }, [loggedIn]);
  return (
    <>
      {loggedIn === false && (
        <>
          <Helmet>
            <title>ÄÄƒng nháº­p</title>
          </Helmet>
          <div className="text-sm pr-96">
            <div className="h-screen px-24 flex items-center flex-wrap justify-center">
              <img src={LoginLogo} />
            </div>
            <div className="p-8 fixed top-8 bottom-8 right-8 bg-white rounded-zenius shadow-zenius flex items-center w-1/4">
              <LoginForm
                isShowTermConditions={isShowTermConditions}
                setIsShowTermConditions={setIsShowTermConditions}
              />
            </div>
          </div>
          {isShowTermConditions && (
            <TermConditions
              isOpen={isShowTermConditions}
              setIsOpen={setIsShowTermConditions}
            />
          )}
        </>
      )}
    </>
  );
};

export default Login;

