<template>
  <div class="article">
  <article-header :title="currentArticle.title" :subtitle="currentArticle.subtitle"></article-header>
    <article-image :imageUrl="currentArticle.imageUrl" :title="currentArticle.title"></article-image>
    <author-info :author="currentArticle.author" :date="currentArticle.date"></author-info>
    <article-content :content="currentArticle.content"></article-content>
  </div>
</template>

<script lang="ts">
import Article from "@/models/article.model";
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import ArticleContent from "../article/ArticleContent.vue";
import ArticleHeader from "../article/ArticleHeader.vue";
import ArticleImage from "../article/ArticleImage.vue";
import AuthorInfo from "../article/AuthorInfo.vue";
import {articles} from '../../hooks/articles';

export default defineComponent({
  components:{ArticleHeader, ArticleImage, AuthorInfo, ArticleContent},
  setup(){
    const route = useRoute();
    const currentArticle = computed(() => articles.value?.find((art: Article) => art._id === route.params.id));

    return {currentArticle};
  }
});
</script>

<style lang="scss" scoped>
.article {
  margin: 3rem auto;
  width: 70%;
}
</style>