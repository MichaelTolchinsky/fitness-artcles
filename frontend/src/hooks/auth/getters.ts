import {computed} from 'vue';
import {state} from './state';

export const isAuth = computed(() => state.isAuth);
export const authError = computed(() => state.error);
export const didAutoLogout = computed(() => state.didAutoLogout);