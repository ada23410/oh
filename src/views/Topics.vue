<template>
    <Loading :active="isLoading"></Loading>
    <div class="cover">
        <div class="container">
        <h1 class="title">Topics</h1>
        </div>
    </div>
    <div class="product-navigation">
    <div class="container">
        <div class="navigation">
            <div aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Topics</li>
                </ol>
            </div>
        </div>
        </div>
    </div>
    <div class="articles-list">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 col-md-4 col-lg-4 col-xl-3 my-3 my-sm-3 my-md-5" v-for="(item, key) in articles" :key="key">
                    <a @click="getArticle(item.id)">
                        <div class="card">
                            <div class="card-img-top rounded border-0" :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
                            <div class="card-body">
                                <h5 class="card-title">{{ item.title }}</h5>
                                <div class="card-text">
                                    <div class="author">{{ item.author }}</div>
                                    <div class="date">{{ $filters.date(item.create_at)}}</div>
                                </div>
                                <div class="tags">
                                    <span class="tag">{{ item.tag }}</span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <Pagination :pages="pagination" @emit-pages="getArticles"></Pagination>
        </div>
    </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default ({
  data () {
    return {
      articles: [],
      pagination: {},
      isLoading: false
    }
  },
  component: {
    Pagination
  },
  methods: {
    getArticles (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/articles?page=${page}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.isLoading = false
        // console.log(res.data)
        this.articles = res.data.articles
        this.pagination = res.data.pagination
      }
      )
    },
    getArticle (id) {
      this.$router.push(`/articles/${id}`)
    }
  },
  created () {
    this.getArticles()
  }
})
</script>
