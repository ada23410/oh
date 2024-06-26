<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div aria-label="Page navigation">
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ 'disabled' : !pages.has_pre }">
                <a class="page-link" href="#" aria-label="Previous" @click.prevent="updatePage(pages.current_page - 1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item" v-for="page in pages.total_pages" :key="page" :class="{ 'active': page === pages.current_page }">
                <a class="page-link" href="#" @click.prevent="updatePage(page)">
                {{ page }}
                </a>
            </li>
            <li class="page-item" :class="{ 'disabled' : !pages.has_next }">
                <a class="page-link" href="#" aria-label="Next" @click.prevent="updatePage(pages.current_page + 1)">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
// :pages="{ 頁碼資訊 }"
// @emitPages="更新頁面事件"
export default {
  props: ['pages'],
  methods: {
    updatePage (page) {
      this.$emit('emit-pages', page)
    }
  }
}
</script>
