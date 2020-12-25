<template>
  <div class="content">
      {{content}}
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props:['content']
})
</script>

<style lang="scss" scoped>
.content{
  font-size: 18px;
  width: 62%;
}
</style>