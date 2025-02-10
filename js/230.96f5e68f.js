"use strict";(self["webpackChunkoh"]=self["webpackChunkoh"]||[]).push([[230],{9230:function(o,e,t){t.r(e),t.d(e,{default:function(){return J}});var n=t(6768),a=t(4232);const l={class:"function"},s={class:"card p-3"},d={class:"table"},p={class:"text-right"},i={key:0,class:"text-success"},u={key:1,class:"text-mute"},c={class:"btn-group"},h=["onClick"],r=["onClick"];function m(o,e,t,m,b,k){const C=(0,n.g2)("couponModal"),L=(0,n.g2)("deleteCouponModal");return(0,n.uX)(),(0,n.CE)(n.FK,null,[(0,n.Lk)("div",l,[e[1]||(e[1]=(0,n.Lk)("h5",null,"優惠券管理",-1)),(0,n.Lk)("button",{class:"btn btn-primary",type:"button",onClick:e[0]||(e[0]=o=>k.openModal(!0))},"新增優惠券")]),(0,n.Lk)("div",s,[(0,n.Lk)("table",d,[e[2]||(e[2]=(0,n.Lk)("thead",null,[(0,n.Lk)("tr",null,[(0,n.Lk)("th",{width:"120"},"名稱"),(0,n.Lk)("th",{width:"120"},"折扣百分比"),(0,n.Lk)("th",{width:"120"},"到期日"),(0,n.Lk)("th",{width:"100"},"是否啟用"),(0,n.Lk)("th",{width:"120"},"編輯")])],-1)),(0,n.Lk)("tbody",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(b.coupons,((e,t)=>((0,n.uX)(),(0,n.CE)("tr",{key:t},[(0,n.Lk)("td",null,(0,a.v_)(e.title),1),(0,n.Lk)("td",null,(0,a.v_)(e.percent)+"%",1),(0,n.Lk)("td",p,(0,a.v_)(o.$filters.date(e.due_date)),1),(0,n.Lk)("td",null,[e.is_enabled?((0,n.uX)(),(0,n.CE)("span",i,"啟用")):((0,n.uX)(),(0,n.CE)("span",u,"未啟用"))]),(0,n.Lk)("td",null,[(0,n.Lk)("div",c,[(0,n.Lk)("button",{class:"btn btn-outline-primary btn-sm",onClick:o=>k.openModal(!1,e)},"編輯",8,h),(0,n.Lk)("button",{class:"btn btn-outline-danger btn-sm",onClick:o=>k.openDeleteCouponModal(e)},"刪除",8,r)])])])))),128))])])]),(0,n.bF)(C,{ref:"couponModal",coupon:b.tempCoupon,onUpdateCoupon:k.updateCoupon},null,8,["coupon","onUpdateCoupon"]),(0,n.bF)(L,{ref:"deleteCouponModal",onConfirmDelete:k.deleteCoupon},null,8,["onConfirmDelete"])],64)}var b=t(5130);const k={class:"modal fade",id:"couponModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},C={class:"modal-dialog",role:"document"},L={class:"modal-content"},f={class:"modal-body"},v={class:"mb-3"},M={class:"mb-3"},_={class:"mb-3"},g={class:"mb-3"},y={class:"mb-3"},w={class:"form-check"},$={class:"modal-footer"};function x(o,e,t,a,l,s){return(0,n.uX)(),(0,n.CE)("div",k,[(0,n.Lk)("div",C,[(0,n.Lk)("div",L,[e[12]||(e[12]=(0,n.Lk)("div",{class:"modal-header"},[(0,n.Lk)("h5",{class:"modal-title",id:"exampleModalLabel"},"新增優惠券"),(0,n.Lk)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1)),(0,n.Lk)("div",f,[(0,n.Lk)("div",v,[e[6]||(e[6]=(0,n.Lk)("label",{for:"title"},"標題",-1)),(0,n.bo)((0,n.Lk)("input",{type:"text",class:"form-control",id:"title","onUpdate:modelValue":e[0]||(e[0]=o=>l.tempCoupon.title=o),placeholder:"請輸入標題"},null,512),[[b.Jo,l.tempCoupon.title]])]),(0,n.Lk)("div",M,[e[7]||(e[7]=(0,n.Lk)("label",{for:"coupon_code"},"優惠碼",-1)),(0,n.bo)((0,n.Lk)("input",{type:"text",class:"form-control",id:"coupon_code","onUpdate:modelValue":e[1]||(e[1]=o=>l.tempCoupon.code=o),placeholder:"請輸入優惠碼"},null,512),[[b.Jo,l.tempCoupon.code]])]),(0,n.Lk)("div",_,[e[8]||(e[8]=(0,n.Lk)("label",{for:"due_date"},"到期日",-1)),(0,n.bo)((0,n.Lk)("input",{type:"date",class:"form-control",id:"due_date","onUpdate:modelValue":e[2]||(e[2]=o=>l.due_date=o)},null,512),[[b.Jo,l.due_date]])]),(0,n.Lk)("div",g,[e[9]||(e[9]=(0,n.Lk)("label",{for:"price"},"折扣百分比",-1)),(0,n.bo)((0,n.Lk)("input",{type:"number",class:"form-control",id:"price","onUpdate:modelValue":e[3]||(e[3]=o=>l.tempCoupon.percent=o),placeholder:"請輸入折扣百分比"},null,512),[[b.Jo,l.tempCoupon.percent,void 0,{number:!0}]])]),(0,n.Lk)("div",y,[(0,n.Lk)("div",w,[(0,n.bo)((0,n.Lk)("input",{class:"form-check-input",type:"checkbox","true-value":1,"false-value":0,"onUpdate:modelValue":e[4]||(e[4]=o=>l.tempCoupon.is_enabled=o),id:"is_enabled"},null,512),[[b.lH,l.tempCoupon.is_enabled]]),e[10]||(e[10]=(0,n.Lk)("label",{class:"form-check-label",for:"is_enabled"}," 是否啟用 ",-1))])])]),(0,n.Lk)("div",$,[e[11]||(e[11]=(0,n.Lk)("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"},"取消",-1)),(0,n.Lk)("button",{type:"button",class:"btn btn-primary",onClick:e[5]||(e[5]=e=>o.$emit("update-coupon",l.tempCoupon))},"確認 ")])])])],512)}var D=t(3286),U={name:"couponModal",props:{coupon:{}},watch:{coupon(){this.tempCoupon=this.coupon;const o=new Date(1e3*this.tempCoupon.due_date).toISOString().split("T");[this.due_date]=o},due_date(){this.tempCoupon.due_date=Math.floor(new Date(this.due_date)/1e3)}},data(){return{tempCoupon:{},due_date:""}},mixins:[D.A],inject:["emitter"],emits:["update-coupon"]},E=t(1241);const X=(0,E.A)(U,[["render",x]]);var S=X,V=t(3773),A={components:{couponModal:S,deleteCouponModal:V.A},data(){return{coupons:{},tempCoupon:{title:"",is_enabled:0,percent:100,code:""},pagination:{},isNew:!1}},methods:{getCoupons(){const o="https://vue3-course-api.hexschool.io/api/aida-api/admin/coupons";this.$http.get(o).then((o=>{this.coupons=o.data.coupons,this.pagination=o.data.pagination}))},openModal(o,e){this.isNew=o,this.isNew?this.tempCoupon={due_date:(new Date).getTime()/1e3}:this.tempCoupon={...e};const t=this.$refs.couponModal;t.showModal()},openDeleteCouponModal(o){this.tempCoupon={...o};const e=this.$refs.deleteCouponModal;e.showModal()},updateCoupon(o){if(this.isNew){const e="https://vue3-course-api.hexschool.io/api/aida-api/admin/coupon",t=this.$refs.couponModal;this.$http.post(e,{data:o}).then((o=>{this.$httpMessageState(o,"新增優惠券"),this.getCoupons(),t.hideModal()}))}else{const o=`https://vue3-course-api.hexschool.io/api/aida-api/admin/coupon/${this.tempCoupon.id}`,e=this.$refs.couponModal;this.$http.put(o,{data:this.tempCoupon}).then((o=>{this.$httpMessageState(o,"更新優惠券"),this.getCoupons(),e.hideModal()}))}},deleteCoupon(){const o=`https://vue3-course-api.hexschool.io/api/aida-api/admin/coupon/${this.tempCoupon.id}`,e=this.$refs.deleteCouponModal;this.$http.delete(o).then((o=>{this.$httpMessageState(o,"刪除優惠券"),e.hideModal(),this.getCoupons()}))}},created(){this.getCoupons()}};const F=(0,E.A)(A,[["render",m]]);var J=F}}]);
//# sourceMappingURL=230.96f5e68f.js.map