import Vue from 'vue';

export const sendPushNitification = ({}, userId) => new Promise((resolve, reject) => {
  try {
    const body = {
      title: 'Наші вітання!',
      body: 'Вас вітає адміністратор',
      userId,
    };
    Vue.prototype.$api.post(`users/push/message/to-user/${userId}`, body).then((response) => {
      resolve(response);
    }, (err) => {
      reject(err);
    });
  } catch (e) {
    reject(e);
  }
});

export default {
  sendPushNitification,
};
