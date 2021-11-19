import Vue from 'vue';

export const listByRole = ({}, role) => new Promise((resolve, reject) => {
  Vue.prototype.$api.get(`users/by-role/?role=${role}`).then((response) => {
    resolve(response);
  }, (err) => {
    reject(err);
  });
});

export const update = ({}, payload) => new Promise((resolve, reject) => {
  Vue.prototype.$api.patch(`users/${payload.userId}`, payload.query).then((response) => {
    resolve(response);
  }, (err) => {
    reject(err);
  });
});

export const getById = ({}, id) => new Promise((resolve, reject) => {
  Vue.prototype.$api.get(`users/${id}`).then((response) => {
    resolve(response);
  }, (err) => {
    reject(err);
  });
});

export const toggleCar = ({}, payload) => new Promise((resolve, reject) => {
  Vue.prototype.$api.patch(`users/toggle-car/${payload.userId}`, { carId: payload.carId }).then((response) => {
    resolve(response);
  }, (err) => {
    reject(err);
  });
});

export default {
  listByRole,
  getById,
  toggleCar,
  update,
};
