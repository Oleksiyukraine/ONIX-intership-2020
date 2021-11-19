import {
  LOGIN,
  LOGOUT,
} from './mutation-types';

export default {
  [LOGIN](state, user) {
    state.authenticated = true;
    state.user = user;
  },
  [LOGOUT](state) {
    state.authenticated = false;
    state.user = null;
  },
};
