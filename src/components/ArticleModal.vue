<template>
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">新增文章</h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-md-4">
                    <div class="mb-3">
                      <label for="image" class="form-label">輸入圖片網址</label>
                      <input type="text" class="form-control" id="image" placeholder="請輸入圖片連結" v-model="tempArticle.imageUrl">
                    </div>
                    <div class="mb-3">
                        <label for="customFile" class="form-label">或上傳圖片
                        <i class="fas fa-spinner fa-spin"></i>
                        </label>
                        <input type="file" id="customFile" class="form-control" ref="fileInput" @change="uploadFile">
                    </div>
                    <img class="img-fluid" :src="tempArticle.imageUrl" alt="">
                </div>
                <div class="col-md-8">
                    <div class="mb-3">
                        <label for="title" class="form-label">標題</label>
                        <input type="text" class="form-control" id="title" v-model="tempArticle.title"
                            placeholder="請輸入標題">
                    </div>
                    <div class="mb-3">
                        <label for="author" class="form-label">作者</label>
                        <input type="text" class="form-control" id="author" v-model="tempArticle.author"
                            placeholder="請輸入作者">
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">文章敘述</label>
                        <textarea type="text" class="form-control" id="description" v-model="tempArticle.description"
                            placeholder="請輸入敘述"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="content" class="form-label">內容</label>
                        <textarea type="text" class="form-control" id="content" v-model="tempArticle.content"
                            placeholder="請輸入內容"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="tag" class="form-label">分類</label>
                        <textarea type="text" class="form-control" id="tag" v-model="tempArticle.tag"
                            placeholder="請輸入關鍵字" rows="10" cols="50"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="create_at">建立日期</label>
                        <input type="date" class="form-control" id="create_at"
                            v-model="tempArticle.create_at" @input="updateCreateAt">
                    </div>
                    <div class="mb-3">
                        <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                                :true-value="1"
                                :false-value="0"
                                v-model="tempArticle.isPublic" id="isPublic">
                        <label class="form-check-label" for="isPublic">
                            是否啟用
                        </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary"
                  @click="$emit('update-article', tempArticle)">確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default ({
  name: 'articleModal',
  props: {
    article: {
      type: Object,
      default () { return {} }
    }
  },
  watch: {
    article () {
      this.tempArticle = this.article
    }
  },
  methods: {
    updateCreateAt () {
      this.tempArticle.create_at = Math.floor(new Date(this.tempArticle.create_at).getTime() / 1000)
    }
  },
  data () {
    return {
      tempArticle: {
        create_at: '',
        isPublic: false
      }
    }
  },
  mixins: [modalMixin],
  inject: ['emitter'],
  emits: ['update-article']
})

</script>
