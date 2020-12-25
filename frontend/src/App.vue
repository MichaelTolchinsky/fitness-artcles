<template>
  <the-header></the-header>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent, watch,onMounted } from 'vue';
import { useRouter } from 'vue-router';
import TheHeader from './components/layout/TheHeader.vue';
import {tryLogin,didAutoLogout} from './hooks/auth';

export default defineComponent({
  components: { TheHeader },
  setup(){
    onMounted(() => tryLogin());
    
    const router = useRouter();

    watch(didAutoLogout,(curValue,oldValue) => {
      if(curValue !== oldValue){
        //router.replace('/articles');
      }
    });
  }
})
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}
</style>
