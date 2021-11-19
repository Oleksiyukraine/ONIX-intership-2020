import Vue from 'vue';

export const list = () => new Promise((resolve, reject) => {
  Vue.prototype.$api.get('/rooms').then((response) => {
    resolve(response);
  }, (err) => {
    reject(err);
  });
});

export const getById = ({}, id) => new Promise((resolve, reject) => {
  Vue.prototype.$api.get(`rooms/${id}`).then((response) => {
    resolve(response);
  }, (err) => {
    reject(err);
  });
});

export const create = ({}, payload) => new Promise((resolve, reject) => {
  console.log('payload', payload);
  Vue.prototype.$api.post('rooms/', payload).then((response) => {
    resolve(response);
  }, (err) => {
    reject(err);
  });
});

export default {
  create,
  list,
  getById,
};
