import {reactive} from 'vue';

export const state = reactive({
  userId: '',
  token: '',
  didAutoLogout: false,
  error: '',
  isAuth: false
});