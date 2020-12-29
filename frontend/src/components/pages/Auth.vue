<template>
  <div>
    <base-card>
      <form @submit.prevent="auth">
        <div class="form-control">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model.trim="authData.email.value"
            :class="{ error: authData.email.error }"
          />
          <p v-if="authData.email.error">{{ authData.email.error }}</p>
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="authData.password.value"
            :class="{ error: authData.password.error }"
          />
          <p v-if="authData.password.error">{{ authData.password.error }}</p>
        </div>
        <p v-if="isAuthDataInvalid">
          Please enter a valid email and password(must be at least 6 characters
          long)
        </p>
        <p v-if="authError">{{ authError }}</p>
        <base-button :disabled="isAuthDataInvalid || isLoading">{{
          authMode
        }}</base-button>
        <base-button
          :disabled="isLoading"
          type="button"
          mode="flat"
          @click="switchMode"
          >{{
            authMode === "signup" ? "Login Instead" : "signup Instead"
          }}</base-button
        >
      </form>
    </base-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import {
  send,
  switchMode,
  authData,
  validatEmail,
  validatePassword,
  isAuthDataInvalid,
  isLoading,
  authMode,
  isAuth,
  authError,
} from "../../hooks/auth";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    watch(() => authData.email.value, validatEmail);
    watch(() => authData.password.value, validatePassword);
    const router = useRouter();

    const auth = async () => {
      await send();
       
       if(isAuth.value === true){
         router.replace('/articles');
         authData.email.error = '';
         authData.password.error = '';
       }
       
    };

    return {
      auth,
      switchMode,
      authData,
      validatEmail,
      validatePassword,
      isAuthDataInvalid,
      isLoading,
      authMode,
      isAuth,
      authError,
    };
  },
});
</script>

<style lang="scss" scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus {
  border-color: #000a91;
  background-color: #faf6ff;
  outline: none;
}

.error {
  border: 2px solid #9b0000;
}
</style>