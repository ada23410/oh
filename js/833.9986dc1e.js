"use strict";(self["webpackChunkoh"]=self["webpackChunkoh"]||[]).push([[833],{4976:function(t,e,a){a(4114);e.A={loadFavorites(){try{const t=localStorage.getItem("favorites");return t?JSON.parse(t):[]}catch(t){return console.error("Failed to load favorites:",t),[]}},saveFavorites(t){try{localStorage.setItem("favorites",JSON.stringify(t))}catch(e){console.error("Failed to save favorites:",e)}},toggleFavorite(t,e){const a=t.indexOf(e);return-1===a?t.push(e):t.splice(a,1),this.saveFavorites(t),t}}},4245:function(t,e,a){a.d(e,{A:function(){return p}});var s=a(6768),i=a(4232),r=a(5130);const o={"aria-label":"Page navigation"},c={class:"pagination justify-content-center"},n=["onClick"];function l(t,e,a,l,d,u){return(0,s.uX)(),(0,s.CE)("div",o,[(0,s.Lk)("ul",c,[(0,s.Lk)("li",{class:(0,i.C4)(["page-item",{disabled:!a.pages.has_pre}])},[(0,s.Lk)("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:e[0]||(e[0]=(0,r.D$)((t=>u.updatePage(a.pages.current_page-1)),["prevent"]))},e[2]||(e[2]=[(0,s.Lk)("span",{"aria-hidden":"true"},"«",-1)]))],2),((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(a.pages.total_pages,(t=>((0,s.uX)(),(0,s.CE)("li",{class:(0,i.C4)(["page-item",{active:t===a.pages.current_page}]),key:t},[(0,s.Lk)("a",{class:"page-link",href:"#",onClick:(0,r.D$)((e=>u.updatePage(t)),["prevent"])},(0,i.v_)(t),9,n)],2)))),128)),(0,s.Lk)("li",{class:(0,i.C4)(["page-item",{disabled:!a.pages.has_next}])},[(0,s.Lk)("a",{class:"page-link",href:"#","aria-label":"Next",onClick:e[1]||(e[1]=(0,r.D$)((t=>u.updatePage(a.pages.current_page+1)),["prevent"]))},e[3]||(e[3]=[(0,s.Lk)("span",{"aria-hidden":"true"},"»",-1)]))],2)])])}var d={props:["pages"],methods:{updatePage(t){this.$emit("emit-pages",t)}}},u=a(1241);const g=(0,u.A)(d,[["render",l]]);var p=g},833:function(t,e,a){a.r(e),a.d(e,{default:function(){return x}});var s=a(6768),i=a(4232);const r={class:"product-navigation"},o={class:"container"},c={class:"navigation"},n={class:"category"},l={class:"nav nav-underline"},d=["onClick"],u={class:"products-list"},g={class:"container"},p={class:"row"},h={class:"card"},v=["onClick"],k={class:"card-title"},f={class:"card-img-top rounded border-0"},m=["src"],P={class:"card-body"},L={class:"price"},C=["onClick"],y=["onClick"];function b(t,e,a,b,_,F){const $=(0,s.g2)("Loading"),E=(0,s.g2)("font-awesome-icon"),w=(0,s.g2)("Pagination");return(0,s.uX)(),(0,s.CE)(s.FK,null,[(0,s.bF)($,{active:_.isLoading},null,8,["active"]),e[3]||(e[3]=(0,s.Lk)("div",{class:"cover"},[(0,s.Lk)("div",{class:"container"},[(0,s.Lk)("h1",{class:"title"},"Collections")])],-1)),(0,s.Lk)("div",r,[(0,s.Lk)("div",o,[(0,s.Lk)("div",c,[e[1]||(e[1]=(0,s.Fv)('<div aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item"><a href="#">Home</a></li><li class="breadcrumb-item active" aria-current="page">Collections</li></ol></div>',1)),(0,s.Lk)("div",n,[(0,s.Lk)("ul",l,[(0,s.Lk)("button",{type:"button",class:"nav-link",onClick:e[0]||(e[0]=t=>F.setFilter(""))},"全部產品"),((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(F.categoryData,(t=>((0,s.uX)(),(0,s.CE)("button",{type:"button",class:"nav-link",key:t,onClick:e=>F.setFilter(t)},(0,i.v_)(t),9,d)))),128))])])])])]),(0,s.Lk)("div",u,[(0,s.Lk)("div",g,[(0,s.Lk)("div",p,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(F.paginatedProducts,(t=>((0,s.uX)(),(0,s.CE)("div",{class:"col-12 col-sm-6 col-md-4 my-3 my-sm-3 my-md-5",key:t.id},[(0,s.Lk)("div",h,[(0,s.Lk)("a",{onClick:e=>F.getProduct(t.id)},[(0,s.Lk)("h5",k,(0,i.v_)(t.title),1),(0,s.Lk)("div",f,[(0,s.Lk)("img",{src:t.imageUrl},null,8,m)])],8,v),(0,s.Lk)("div",P,[(0,s.Lk)("div",L,"NT$"+(0,i.v_)(t.origin_price),1),(0,s.Lk)("div",{class:"add-to-cart",onClick:e=>F.addCart(t.id)},[(0,s.bF)(E,{class:"bars me-2",icon:"fas fa-bag-shopping"}),e[2]||(e[2]=(0,s.eW)("放入袋中 "))],8,C),(0,s.Lk)("div",{class:"add-to-favorite",onClick:e=>F.toggleFavorite(t)},[(0,s.bF)(E,{icon:["fas","heart"],class:(0,i.C4)({like:_.favorites.includes(t.id)})},null,8,["class"])],8,y)])])])))),128))]),(0,s.bF)(w,{pages:_.pagination,onEmitPages:F.goToPage},null,8,["pages","onEmitPages"])])])],64)}a(4114);var _=a(4245),F=a(4976),$={components:{Pagination:_.A},data(){return{products:[],filter:"",currentPage:1,perPage:9,filteredProducts:[],pagination:{current_page:1,total_pages:1,has_next:!1,has_pre:!1},favorites:[],isLoading:!1}},inject:["emitter"],methods:{getProducts(){const t="https://vue3-course-api.hexschool.io/api/aida-api/products/all";this.isLoading=!0,this.$http.get(t).then((t=>{this.isLoading=!1,t.data.success&&(this.products=t.data.products,this.updateProducts())})).catch((t=>{console.error("Error fetching products:",t),this.pagination={current_page:1,total_pages:1,has_next:!1,has_pre:!1}}))},getProduct(t){this.$router.push(`/product/${t}`)},setFilter(t){this.filter=t,this.currentPage=1,this.$router.push({query:{category:t}})},goToPage(t){this.currentPage=t,this.updateProducts()},toggleFavorite(t){this.favorites=F.A.toggleFavorite(this.favorites,t.id),this.emitter.emit("push-message",{style:"success",title:"已加入最愛！"})},updateProducts(){const t=this.filter||this.$route.query.category||"";this.filteredProducts=t?this.products.filter((e=>e.category===t)):this.products;const e=(this.currentPage-1)*this.perPage,a=e+this.perPage;this.pagination.total_pages=Math.ceil(this.filteredProducts.length/this.perPage),this.pagination.has_pre=this.currentPage>1,this.pagination.has_next=this.currentPage<this.pagination.total_pages,this.paginatedProducts=this.filteredProducts.slice(e,a)},addCart(t){const e="https://vue3-course-api.hexschool.io/api/aida-api/cart",a={product_id:t,qty:1};this.$http.post(e,{data:a}).then((t=>{if(!t.data.success)throw new Error(t.data.message||"加入商品失敗！");this.emitter.emit("addCart",t.data),this.emitter.emit("push-message",{style:"success",title:"商品已加入購物車！"})}))}},computed:{categoryData(){if(!this.products||0===this.products.length)return[];const t=this.products.map((t=>t.category));return Array.from(new Set(t))},totalPages(){return this.pagination.total_pages},paginatedProducts(){const t=(this.currentPage-1)*this.perPage,e=t+this.perPage;return this.filteredProducts.slice(t,e)}},watch:{"$route.query.category"(t){this.filter=t||"",this.currentPage=1,this.updateProducts()}},created(){this.favorites=F.A.loadFavorites(),this.filter=this.$route.query.category||"",this.getProducts()}},E=a(1241);const w=(0,E.A)($,[["render",b]]);var x=w}}]);
//# sourceMappingURL=833.9986dc1e.js.map