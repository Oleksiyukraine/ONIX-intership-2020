import Vue from 'vue';
import { Cookies } from 'quasar';
import * as types from './mutation-types';

export const check = () => {
  const cookies = Cookies.has('accessToken');
  if (cookies) {
    Vue.prototype.$api.defaults.headers.common.Authorization = `Bearer ${Cookies.get('accessToken')}`;
    return true;
  }
  Vue.prototype.$api.defaults.headers.common.Authorization = '';
  return false;
};

export const find = ({ commit }) => new Promise((resolve, reject) => {
  const cookies = Cookies.get('accessToken');
  Vue.prototype.$api.get(`/auth/sign/in/by/token/?token=${cookies}`).then((response) => {
    commit(types.LOGIN, response.data.user);
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');

    Cookies.set('accessToken', response.data.accessToken);
    Cookies.set('refreshToken', response.data.refreshToken);

    resolve(response);
  }, (err) => {
    reject(err);
  });
});

export const registration = ({ commit }, user) => new Promise((resolve, reject) => {
  Vue.prototype.$api.post('/auth/sign-up', user).then((response) => {
    console.log(commit);
    resolve(response);
  }, (err) => {
    reject(err);
  });
});

export const login = ({ commit }, user) => new Promise((resolve, reject) => {
  Vue.prototype.$api.post('/auth/sign-in', user).then((response) => {
    commit(types.LOGIN, response.data.user);

    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');

    Cookies.set('accessToken', response.data.accessToken);
    Cookies.set('refreshToken', response.data.refreshToken);

    Vue.prototype.$api.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;
    resolve(response);
  }, (err) => {
    reject(err);
  });
});

export const logout = ({ commit }, data) => new Promise((resolve, reject) => {
  Vue.prototype.$api.delete(`/auth/logout/${Cookies.get('accessToken')}`).then((response) => {
    Vue.prototype.$api.defaults.headers.common.Authorization = '';
    commit(types.LOGOUT, data);
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    resolve(response);
  }, (err) => {
    reject(err);
  });
});

export default {
  check,
  login,
  logout,
  find,
  registration,
};
