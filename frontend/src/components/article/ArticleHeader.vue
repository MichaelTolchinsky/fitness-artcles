<template>
  <div class="article-header">
    <h1 class="title">
      {{ headerTitle }}
    </h1>
    <p class="subtitle">
      {{ headerSubtitle }}
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: ["title", "subtitle"],
  setup(props) {
     const headerTitle = computed(() => props.title);
     const headerSubtitle = computed(() => props.subtitle);
     return {headerTitle,headerSubtitle};
  },
});
</script>

<style lang="scss" scoped>
.article-header {
  margin-bottom: 30px;
  padding-bottom: 23px;
  border-bottom: 1px solid #e1e1e1;

  .title {
    font-size: 40px;
    line-height: 1.1em;
    margin: 0 0 10px;
  }

  .subtitle {
    font-size: 20px;
    line-height: 1.4em;
    margin: 0;
    color: #919191;
  }
}
</style>