<template>
  <div>
    <base-card>
      <form @submit.prevent="addArticle">
        <div class="form-control">
          <label for="title">Title</label>
          <input type="text" id="title" v-model.trim="articleData.title" />
        </div>
        <div class="form-control">
          <label for="subtitle">Subtitle</label>
          <input type="text" id="subtitle" v-model="articleData.subtitle" />
        </div>
        <div class="form-control">
          <label for="imageUrl">Image Url</label>
          <input type="text" id="imageUrl" v-model="articleData.imageUrl" />
        </div>
        <div class="form-control">
          <label for="author">Author</label>
          <input type="text" id="author" v-model="articleData.author" />
        </div>
        <div class="form-control">
          <label for="content">Content</label>
          <textarea
            rows="5"
            id="content"
            v-model="articleData.content"
          ></textarea>
        </div>
        <p v-if="isArticleDataInvalid">inputs can't be empty</p>
        <base-button :disabled="isArticleDataInvalid">Add Article</base-button>
      </form>
    </base-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  addArticle,
  articleData,
  isArticleDataInvalid,
} from "../../hooks/articles";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {

    return {
      addArticle,
      articleData,
      isArticleDataInvalid,
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

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #000a91;
  background-color: #faf6ff;
  outline: none;
}

.error {
  border: 2px solid #9b0000;
}
</style>