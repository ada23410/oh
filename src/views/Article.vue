<template>
    <div class="article">
        <div class="cover" :style="{backgroundImage: `url(${article.imageUrl})`}"></div>
        <div class="container">
            <div class="content">
                <div class="title">{{ article.title }}</div>
                <div class="date">{{ $filters.date(article.create_at) }}</div>
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
