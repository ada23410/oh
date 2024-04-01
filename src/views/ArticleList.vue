<template>
    <div class="text-end mt-3">
        <button class="btn btn-primary" type="button" @click="openModal(true)">新增文章</button>
    </div>
    <table class="table mt-4">
        <thead>
            <tr>
            <th width="120">標題</th>
            <th width="120">敘述</th>
            <th width="120">作者</th>
            <th width="120">建立日期</th>
            <th width="100">是否啟用</th>
            <th width="120">編輯</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, key) in articles" :key="key">
            <td>{{ item.title }}</td>
            <td>{{ item.description }}</td>
            <td class="text-right">
                {{ item.author }}
            </td>
            <td class="text-right">
                {{ $filters.date(item.create_at) }}
            </td>
            <td>
              <span class="text-success" v-if="item.isPublic">啟用</span>
              <span class="text-mute" v-else>未啟用</span>
            </td>
            <td>
                <div class="btn-group">
                  <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
                  <button class="btn btn-outline-danger btn-sm" @click="openDeleteArticleModal(item)">刪除</button>
                </div>
            </td>
            </tr>
        </tbody>
    </table>
    <articleModal ref="articleModal" :article="tempArticle" @update-article="updateArticle"></articleModal>
    <deleteArticleModal ref="deleteArticleModal" @confirm-delete="deleteArticle"></deleteArticleModal>
</template>

<script>
import articleModal from '../components/ArticleModal.vue'
import deleteArticleModal from '../components/DeleteModal.vue'

export default ({
  components: {
    articleModal,
    // eslint-disable-next-line vue/no-unused-components
    deleteArticleModal
  },
  data () {
    return {
      articles: {},
      tempArticle: {},
      pagination: {},
      isNew: false
    }
  },
  methods: {
    getArticles () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/articles`
      this.$http.get(api).then((res) => {
        // console.log(res.data)
        this.articles = res.data.articles
        this.pagination = res.data.pagination
      })
    },
    openModal (isNew, item) {
      this.isNew = isNew
      console.log(this.isNew)
      if (this.isNew) {
        this.tempArticle = {}
      } else {
        this.tempArticle = { ...item }
      }
      const articleComponent = this.$refs.articleModal
      articleComponent.showModal()
    },
    openDeleteArticleModal (item) {
      this.tempArticle = { ...item }
      const deleteArticleComponent = this.$refs.deleteArticleModal
      deleteArticleComponent.showModal()
    },
    updateArticle (tempArticle) {
      if (this.isNew) {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article`
        const articleComponent = this.$refs.articleModal
        this.$http.post(api, { data: tempArticle }).then((res) => {
          // console.log(res.data)
          this.$httpMessageState(res, '新增文章')
          this.getArticles()
          articleComponent.hideModal()
        })
      } else {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`
        const articleComponent = this.$refs.articleModal
        this.$http.put(api, { data: tempArticle }).then((res) => {
          // console.log(res.data)
          this.$httpMessageState(res, '更新文章')
          this.getArticles()
          articleComponent.hideModal()
        })
      }
    },
    deleteArticle () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`
      const deleteArticleComponent = this.$refs.deleteArticleModal
      this.$http.delete(api).then((res) => {
        this.$httpMessageState(res, '刪除文章')
        deleteArticleComponent.hideModal()
        this.getArticles()
      })
    }
  },
  created () {
    this.getArticles()
  }
})
</script>
