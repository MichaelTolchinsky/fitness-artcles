<template>
  <header>
    <nav>
      <h1>
        <router-link to="/">Fitness Atricles</router-link>
      </h1>
      <ul>
        <li>
          <router-link to="/articles">Articles</router-link>
        </li>
        <li v-if="isAuth">
          <router-link to="/add">Add Article</router-link>
        </li>
        <li v-if="!isAuth">
          <router-link to="/auth">Login</router-link>
        </li>
        <li v-else>
          <base-button @click="Logout">Logout</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import BaseButton from "../ui/BaseButton.vue";
import { isAuth, logout } from "../../hooks/auth";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { BaseButton },
  setup() {
    const router = useRouter();

    const Logout = () => {
      logout();
      router.replace("/articles");
    };
    return { isAuth, Logout };
  },
});
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #064988;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    text-decoration: none;
    color: #ececec;
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid transparent;

    &:active,
    &:hover,
    &.router-link-active {
      border: 1px solid #c2c2c2;
    }
  }
}

h1 {
  margin: 0;

  a {
    color: white;
    margin: 0;

    &:hover,
    &:active,
    &.router-link-active {
      border-color: transparent;
    }
  }
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>