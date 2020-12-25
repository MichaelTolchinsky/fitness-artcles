import Article from "@/models/article.model";
import { computed, reactive, ref } from "vue";

const Articles = ref<Article[]>();

export const articleData = reactive({
  id: new Date().toISOString(),
  title: '',
  subtitle: '',
  imageUrl: '',
  author: '',
  date: new Date().toLocaleDateString(),
  content: '',
});

const setArticles = (articles: Article[]) => Articles.value = articles;

export const addArticle = async () => {
  const response = await fetch(process.env.VUE_APP_DB_KEY, {
    method: 'POST',
    body: JSON.stringify(articleData),
  });

  if (!response.ok) {
    const error = new Error('failed to add article');
    throw error;
  }
};

export const loadArticles = async () => {
  const response = await fetch(process.env.VUE_APP_DB_KEY);

  const responseData = await response.json();
  if (!response.ok) {
    const error = new Error(responseData.message || 'failed to fetch');
    throw error;
  }

  const articles = [];
  for (const key in responseData) {
    const article = {
      id: key,
      title: responseData[key].title,
      subtitle: responseData[key].subtitle,
      imageUrl: responseData[key].imageUrl,
      author: responseData[key].author,
      date: responseData[key].date,
      content: responseData[key].content,

    };
    articles.push(article);
  }

  setArticles(articles);
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