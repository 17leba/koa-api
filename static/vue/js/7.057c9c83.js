webpackJsonp([7],{JeKj:function(e,t){},x0ae:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("Xxa5"),s=n.n(r),a=n("exGp"),i=n.n(a),o=n("Dd8w"),u=n.n(o),c=n("qYvl"),d=n.n(c),l=n("NYxO"),f={data:function(){return{result:[]}},computed:u()({},Object(l.b)({userId:function(e){return e.user.userInfo.user_id},loveData:function(e){return e.random.loveData}})),watch:{userId:function(){this.getData()}},created:function(){this.userId&&this.getData()},methods:{getData:function(){var e=this;return i()(s.a.mark(function t(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.$store.dispatch("openLoading"),t.next=3,d.a.get("/api/love/list",{user_id:e.userId});case 3:e.result=t.sent,e.$store.dispatch("closeLoading");case 5:case"end":return t.stop()}},t,e)}))()},switchType:function(e){var t="";switch(e.type){case"question":t="/random/question?id="+e.love_id;break;case"news":t="/random/news?id="+e.love_id;break;case"music":break;case"book":t="/random/book?id="+e.love_id}return t}}},v={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",e._l(e.result,function(t,r){return n("router-link",{key:r,staticClass:"love-list",attrs:{to:e.switchType(t)}},[n("i",[e._v(e._s(t.type)+"：")]),e._v(e._s(t.title))])}))},staticRenderFns:[]};var p=n("VU/8")(f,v,!1,function(e){n("JeKj")},"data-v-422684c6",null);t.default=p.exports}});
//# sourceMappingURL=7.057c9c83.js.map