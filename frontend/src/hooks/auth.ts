import { UserModel } from "@/models/user.model";
import { computed, reactive, ref } from "vue";

let timer: number | undefined;
const state = reactive({
  userId: '',
  token: '',
  didAutoLogout: false,
  error: '',
  isAuth: false
});

const authApiUrl = 'http://localhost:3000/auth'; //for compose
//const authApiUrl = '/api/auth'; //for k8s

// mutations
function setUser(payload: { token: string; userId: string; isAuth: boolean }) {
  state.token = payload.token;
  state.userId = payload.userId;
  state.didAutoLogout = false;
  state.isAuth = payload.isAuth;
}

function setAutoLogout() {
  state.didAutoLogout = true;
}

//actions
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('tokenExpiration');
  clearTimeout(timer);

  setUser({
    token: '',
    userId: '',
    isAuth:false,
  });
  state.error = '';
  
}

function autoLogout() {
  logout();
  setAutoLogout();
}

async function auth(payload: { email: string; password: string }, mode: string) {
  let url =
    `${authApiUrl}/login`;
  if (mode === 'signup') {
    url =
      `${authApiUrl}/signup`;
  }

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  
  const responseData = await response.json();

  if (!response.ok) {
    state.error = responseData.message || 'Failed to authneticate. check your credentials';
  }
  else {
    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;
    localStorage.setItem('token', responseData.token);
    localStorage.setItem('userId', responseData.userId);
    localStorage.setItem('tokenExpiration', expirationDate.toString());

    timer = setTimeout(() => {
      autoLogout();
    }, expiresIn);

    setUser({
      token: responseData.token,
      userId: responseData.userId,
      isAuth:true
    });
  }
}

async function login(user: UserModel) {
 await auth(user, 'login');
}
async function signup(user: UserModel) {
 await auth(user, 'signup');
}

export function tryLogin() {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const tokenExpiration = localStorage.getItem('tokenExpiration') ?? 0;

  const expiresIn = +tokenExpiration - new Date().getTime();
  if (expiresIn < 0) {
    return;
  }

  timer = setTimeout(() => {
    autoLogout()
  }, expiresIn);

  if (token && userId) {
    setUser({
      token: token,
      userId: userId,
      isAuth:true
    });
  }
}

// getters
export const isAuth = computed(() => state.isAuth);
export const authError = computed(() => state.error);
export const didAutoLogout = computed(() => state.didAutoLogout);



export const authMode = ref<"login" | "signup">("login");
export const isLoading = ref(false);
export const authData = reactive({
  email: { value: "", error: "" },
  password: { value: "", error: "" },
});

export const validatEmail = (val: string) => {
  if (!val.length) {
    authData.email.error = "Email is required!";
  }
  else if (!val.includes('@')) {
    authData.email.error = "Valid Email must have a @";
  }
  else {
    authData.email.error = "";
  }
}

export const validatePassword = (val: string) => {
  if (!val.length) {
    authData.password.error = "Password is required!";
  } else if (val.length < 6) {
    authData.password.error =
      "Password must be 6 chars long";
  } else {
    authData.password.error = "";
  }
}

export async function send() {
  state.error = '';
  isLoading.value = true;
  try {
    const method = authMode.value === "login" ? "login" : "signup";
    const user: UserModel = {
      email: authData.email.value,
      password: authData.password.value,
    };

    const authFunc = method === 'login' ?  login :  signup;
    await authFunc(user);
    authData.email.value = '';
    authData.password.value = '';

  } catch (ex) {
    console.log(ex);
  }
  finally {
    isLoading.value = false;
  }
}

export function switchMode() {
  authMode.value = authMode.value === "login" ? "signup" : "login";
}

export const isAuthDataInvalid = computed(
  () =>
    !authData.email.value ||
    !authData.password.value ||
    Boolean(authData.email.error) ||
    Boolean(authData.password.error)
);