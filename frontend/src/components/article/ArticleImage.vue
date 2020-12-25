<template>
  <img
      :src="imageUrl"
      :alt="title"
    />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  props:['imageUrl','title'],
});
</script>

<style lang="scss" scoped>

img {
  vertical-align: middle;
  border-style: none;
  max-width: 100%;
}
</style>
