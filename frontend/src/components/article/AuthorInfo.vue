<template>
  <div class="author-info">
      <p class="author-name">{{author}}</p>
      <p class="author-date">{{printTime(date)}}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props:['author','date'],
  setup(){
    const printTime = (time: string|number|Date) => {
      return new Date(time).toDateString();
    }

    return { printTime };
  }
})
</script>

<style lang="scss" scoped>
.author-info {
  width: calc(100% - 202px);
  padding-right: 20px;
  min-width: 120px;

  .author-name {
    display: inline-block;
    margin-bottom: 1px;
    color: #038dbe;
    font-size: 16px;
    line-height: 1.2em;
    max-width: 300px;
  }

  .author-date {
    font-size: 16px;
    line-height: 1.2em;
  }
}
</style>