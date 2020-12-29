import Article from "@/models/article.model";
import { computed, reactive, ref } from "vue";

const Articles = ref<Article[]>();

export const articleData = reactive({
  title: '',
  subtitle: '',
  imageUrl: '',
  author: '',
  date: new Date().toLocaleDateString(),
  content: '',
});

const setArticles = (articles: Article[]) => Articles.value = articles;

//const articlesApiUrl = 'http://localhost:4000/articles'; //for compose
const articlesApiUrl = '/api/articles'; //for k8s

export const addArticle = async () => {
  try {
    const response = await fetch(articlesApiUrl + '/add-article', {
      method: 'POST',
      body: JSON.stringify(articleData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = new Error('failed to add article');
      throw error;
    }
  } catch (error) {
    console.log(error);
  }

};

export const loadArticles = async () => {
  try {
    const response = await fetch(articlesApiUrl + '/articles');
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'failed to fetch');
      throw error;
    }
    
    setArticles(responseData.articles);
  } catch (error) {
    console.log(error);
  }
};

export const articles = computed(() => Articles.value);

export const isArticleDataInvalid = computed(
  () =>
    !articleData.title ||
    !articleData.subtitle ||
    !articleData.imageUrl ||
    !articleData.author ||
    !articleData.content
);