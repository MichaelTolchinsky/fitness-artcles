<template>
  <div class="main-grid">
    <ul class="articleBlock-list bb-list--plain">
      <li class="articleBlock-listItem" v-for="art in articles" :key="art.id">
        <figure class="articleCard">
          <router-link :to="'/articles/'+art.id" class="articleCard-link" :title="art.subtitle">
            <div class="articleCard-imageContainer">
            <img class="articleCard-image" :src="art.imageUrl" :alt="art.title">
            </div>  
          </router-link>
          <figcaption class="articleCard-figcaption">
            <h3 class="articleCard-title">
              <router-link class="articleCard-descriptionLink" :to="'/articles/'+art.id">{{art.title}}</router-link>
            </h3>
          </figcaption>
        </figure>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import {articles,loadArticles} from '../../hooks/articles';

export default defineComponent({
   setup() {
    loadArticles();

    return {articles};
  },
});
</script>

<style lang="scss" scoped>
.main-grid{
  margin: 3rem auto;
  width:70%;
}
.articleBlock-list {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 15px;
}

.articleBlock-listItem {
  display: list-item;
  text-align: -webkit-match-parent;
}

li:first-child{  
  grid-column: 1/span 2;
  grid-row: 1/span 2;
}

.articleCard {
  position: relative;
  overflow: hidden;
  margin: 0;
}

.articleCard-link:before {
    content: "";
    display: block;
    opacity: 0;
    transition: opacity .1s ease-out;
    background: rgba(0,0,0,.6);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 3;
}

.articleCard-link:after {
    content: "";
    display: block;
    background: linear-gradient(transparent,#000);
    width: 100%;
    height: 75%;
    position: absolute;
    left: 0;
    bottom: -1px;
    z-index: 3;
}

.articleCard-imageContainer{
  position: relative;
  background-color: #f2f2f2;
}

.articleCard-imageContainer:before {
    content: "";
    display: block;
    padding-bottom: 57.74278%;
}

.articleCard-image{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    -o-object-fit: cover;
    object-fit: cover;
    -o-object-position: center center;
    object-position: center center;
}

.articleCard-figcaption{
  position: absolute;
    width: auto;
    left: 15px;
    bottom: 8px;
    padding-right: 15px;
    z-index: 4;
    bottom: 6px;
}

.articleCard-titleLink{
  display: block;
    font-family: ProximaNovaSemiBold ,Arial,sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1rem;
}

a {
    color: #fff;
    cursor: pointer;
    text-decoration: none;
}

.bb-list--plain {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
</style>