import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { _button_styled } from '@/../pages/createPost/utility';
import { isObjEmpty } from '@/../utils/utilityFunc';
import { useEffect } from 'react';
import { LoginFBService } from '@/../services/loginFB';
import {
  LOGIN_SUCCESS,
  SET_COMPLETE_INFORMATION,
} from '@/store/types/user';
import { toast } from 'react-toastify';
import { OK } from '@/../configs';

const CompleteInfo = () => {
  const { isCompleteInformation } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    criteriaMode: 'all',
  });
  const watchAllFields = watch();
  const validatePhoneNumber = (value) => {
    const phoneNumberRegex = /^(\+)?\d{10,15}$/;
    if (!value) {
      return 'Vui lÃ²ng nháº­p thÃ´ng tin ';
    }
    if (!phoneNumberRegex.test(value)) {
      return 'Sá»‘ Ä‘iá»‡n thoáº¡i sai Ä‘á»‹nh dáº¡ng !';
    }
    return true;
  };

  const onSubmit = async (data) => {
    try {
      const res = await LoginFBService.completeInfo(
        isCompleteInformation.info.user_id,
        data
      );
      if (res.status === OK) {
        toast.success('Cáº­p nháº­t thÃ´ng tin thÃ nh cÃ´ng !');
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { ...res.data, rememberMe: true },
        });
        reset();
      }
    } catch (error) {
      // Handle API call error
      if (error.response) {
        // The request was made, but the server responded with a status code outside of the 2xx range
        if (error.response.status === 422) {
          // Handle 422 status code (validation errors)
          toast.error(error?.response?.data?.message);
        } else {
        }
      } else if (error?.request) {
        // The request was made, but no response was received
      } else {
        // Something happened in setting up the request that triggered an Error
      }
    }
  };

  const cancelLoginFB = () => {
    dispatch({
      type: SET_COMPLETE_INFORMATION,
      payload: { status: false, info: {} },
    });
  };
  useEffect(() => {
    if (
      !isObjEmpty(isCompleteInformation.info) &&
      isCompleteInformation.info.email
    ) {
      setValue('email', isCompleteInformation.info.email);
    }
  }, [isCompleteInformation.status]);

  return (
    <Transition appear show={isCompleteInformation.status} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-9999 max-w-lg mt-1 "
        style={{ maxWidth: '50%' }}
        onClose={() => {}}
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
                <div>
                  <div className="flex justify-center mb-2">
                    <span className="uppercase font-bold text-base">
                      HoÃ n thiá»‡n thÃ´ng tin
                    </span>
                  </div>
                  <div className="flex justify-center mb-2">
                    <span className="font-bold text-red-500">
                      *TÃ i khoáº£n cá»§a báº¡n chÆ°a hoÃ n thiá»‡n Ä‘áº§y Ä‘á»§ thÃ´ng tin , vui
                      lÃ²ng hoÃ n thiá»‡n Ä‘á»ƒ sá»­ dá»¥ng há»‡ thá»‘ng !
                    </span>
                  </div>

                  <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <div>
                        <span className="font-bold text-md">*Há»</span>
                        <input
                          type="text"
                          className={`w-full rounded-lg border-2  ${
                            errors['first_name']
                              ? 'border-red-400'
                              : 'border-gray-400'
                          }`}
                          {...register('first_name', { required: true })}
                        />
                      </div>
                      <div>
                        <span className="font-bold text-md">*TÃªn</span>
                        <input
                          type="text"
                          className={`w-full rounded-lg border-2  ${
                            errors['last_name']
                              ? 'border-red-400'
                              : 'border-gray-400'
                          }`}
                          {...register('last_name', { required: true })}
                        />
                      </div>
                      <div>
                        <span className="font-bold text-md">
                          *TÃªn ngÆ°á»i dÃ¹ng
                        </span>
                        <input
                          type="text"
                          className={`w-full rounded-lg border-2  ${
                            errors['user_name']
                              ? 'border-red-400'
                              : 'border-gray-400'
                          }`}
                          {...register('user_name', {
                            required: true,
                            minLength: {
                              value: 6,
                              message: 'TÃªn ngÆ°á»i dÃ¹ng pháº£i lá»›n hÆ¡n 6 kÃ½ tá»±',
                            },
                            pattern: {
                              value:
                                /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/,
                              message:
                                'TÃªn ngÆ°á»i dÃ¹ng khÃ´ng Ä‘Æ°á»£c chá»©a kÃ½ tá»± Ä‘áº·c biá»‡t',
                            },
                          })}
                        />
                        {errors.user_name && (
                          <span className="text-red-500">
                            {errors.user_name.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <span className="font-bold text-md">*Email</span>
                        <input
                          type="email"
                          disabled={watchAllFields['email'] !== ''}
                          className={`w-full rounded-lg border-2  ${
                            errors['email']
                              ? 'border-red-400'
                              : 'border-gray-400'
                          }`}
                          {...register('email', {
                            required: 'Email address is required',
                            pattern: {
                              value:
                                /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                              message: 'Äá»‹a chá»‰ email khÃ´ng Ä‘Ãºng Ä‘á»‹nh dáº¡ng !',
                            },
                          })}
                        />
                        <span className="text-red-500">
                          {errors.email && <p>{errors.email.message}</p>}
                        </span>
                      </div>
                      <div>
                        <span className="font-bold text-md">
                          *Sá»‘ Ä‘iá»‡n thoáº¡i
                        </span>
                        <input
                          type="number"
                          rules={{
                            validate: (value) => handleValidatePhone(value),
                          }}
                          className={`w-full rounded-lg border-2  ${
                            errors['phone']
                              ? 'border-red-400'
                              : 'border-gray-400'
                          }`}
                          {...register('phone', {
                            validate: validatePhoneNumber,
                          })}
                        />
                        <span className="text-red-500">
                          {errors.phone && <p>{errors.phone.message}</p>}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={cancelLoginFB}
                        className={`text-white p-3 hover:bg-gray-400 w-full rounded-md shadow-md bg-red-500`}
                      >
                        Huá»· bá»
                      </button>
                      <button type="submit" className={_button_styled}>
                        Cáº­p nháº­t
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CompleteInfo;


