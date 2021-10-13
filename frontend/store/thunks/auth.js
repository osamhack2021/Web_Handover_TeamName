import {
  push,
} from 'connected-react-router';
import {
  camelToSnakeCase,
  snakeToCamelCase,
} from 'json-style-converter/es5';
import {
  store as RNC,
} from 'react-notifications-component';

import {
  postRegister,
  postLogin,
  postLogout,
} from '_api/auth';
import {
  login,
  logout,
} from '_actions/user';
import {
  dispatchError,
  handleSuccess,
} from '_utils/api';
import R from 'ramda';

import {
  attemptGetGroup,
} from './group';
import {
  attemptLoadItems,
} from './item';

export const attemptLogin = (userId) => (dispatch) => postLogin(userId)
  .then((data) => {
    dispatch(login(snakeToCamelCase(data.user)));

    // Save user information to localStorage to note the user is logged in
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('recents', JSON.stringify([]));
    RNC.addNotification({
      title: '로그인',
      message: `${data.user.name}님 환영합니다.`,
      type: 'success',
      container: 'top-center',
      animationIn: ['animated', 'fadeInRight'],
      animationOut: ['animated', 'fadeOutRight'],
      dismiss: {
        duration: 5000,
      },
    });

    dispatch(push('/home'));
    return data;
  })
  .catch(dispatchError(dispatch));

export const attemptRegister = (newUser) => (dispatch) => postRegister(newUser)
  .then((data) => {
    RNC.addNotification({
      title: '프로필 수정',
      message: '변경사항이 저장되었습니다.',
      type: 'success',
      container: 'top-center',
      animationIn: ['animated', 'fadeInRight'],
      animationOut: ['animated', 'fadeOutRight'],
      dismiss: {
        duration: 5000,
      },
    });

    return dispatch(attemptLogin(newUser));
  })
  .then(() => dispatch(push('/'))) // redirect to /
  .catch(dispatchError(dispatch));

export const attemptLogout = () => (dispatch) => postLogout()
  .then((data) => {
    dispatch(push('/'));
    dispatch(logout());

    // Remove user information from localStorage
    localStorage.clear();

    RNC.addNotification({
      title: '로그아웃',
      message: '정상적으로 로그아웃 되었습니다.',
      type: 'success',
      container: 'top-center',
      animationIn: ['animated', 'fadeInRight'],
      animationOut: ['animated', 'fadeOutRight'],
      dismiss: {
        duration: 5000,
      },
    });
    return data;
  })
  .catch(dispatchError(dispatch));
