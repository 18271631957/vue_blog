import { defineStore } from 'pinia'
import request from '../utils/request'



export default defineStore('article', {
  state() {
    return {
      article: {},
      articleNavigators: [],
      articleList: [],
      showDrawer: false
    }
  },
  getters: {

  },
  actions: {
    setShowDrawer(showDrawer) {
      this.showDrawer = showDrawer
    },
    setArticle(article) {
      this.article = article
    },
    setArticleNavigators(articleNavigators) {
      this.articleNavigators = articleNavigators
    },
    setArticleList(articleList) {
      this.articleList = articleList
    },
    async getArticle(queryParam) {
      const res = await request.post("/getArticles", queryParam);
      this.articleList = res.data.rows;
    }
  },
  persist: true,
})