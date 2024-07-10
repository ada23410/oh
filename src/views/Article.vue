<template>
    <div class="article">
        <div class="cover" :style="{backgroundImage: `url(${article.imageUrl})`}"></div>
        <div class="container">
            <div class="content-wrap">
                <div class="article-content">
                  <span class="tag">{{ article.tag }}</span>
                  <div class="title">{{ article.title }}</div>
                  <div class="description">{{ article.description }}</div>
                  <div class="article-info">
                    <div class="author">
                      <div class="author-title">作者</div>
                      <div class="author-content">{{ article.author }}</div>
                    </div>
                    <div class="update-date">
                      <div class="date-title">刊登日期</div>
                      <div class="date-content">{{ $filters.date(article.create_at) }}</div>
                    </div>
                  </div>
                  <p class="content">{{ article.content }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default ({
  data () {
    return {
      article: {}
    }
  },
  inject: ['emitter'],
  methods: {
    getArticle (articleId) {
      //  console.log(articleId)
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/article/${articleId}`
      this.$http.get(api).then((res) => {
        console.log(res.data)
        this.article = res.data.article
      })
    }
  },
  created () {
    const articleId = this.$route.params.articleId
    this.getArticle(articleId)
  }
})
</script>
