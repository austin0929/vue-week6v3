import{_,o as d,c as v,b as a,a as s,g as e,h as o,w as u,r as p}from"./index-DwjhUn82.js";var h={VITE_APP_URL:"https://vue3-course-api.hexschool.io/v2",VITE_APP_PATH:"david777",BASE_URL:"./",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const g={methods:{logOut(){const{VITE_APP_URL:l}=h,n=`${l}/logout`;this.$http.post(n).then(i=>{i.data.success&&(alert("已登出"),this.$router.push("/login"))})}}},b={class:"navbar navbar-expand-lg bg-body-tertiary"},f={class:"container-fluid"},m=a("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation"},[a("span",{class:"navbar-toggler-icon"})],-1),k={class:"collapse navbar-collapse",id:"navbarNav"},x={class:"navbar-nav"},N={class:"nav-item"},P={class:"nav-item"},E={class:"nav-item"},V={class:"nav-item"},T={class:"nav-item"};function A(l,n,i,B,O,r){const t=p("router-link");return d(),v("nav",b,[a("div",f,[s(t,{to:"/",class:"navbar-brand"},{default:e(()=>[o("首頁")]),_:1}),m,a("div",k,[a("ul",x,[a("li",N,[s(t,{to:"/admin",class:"nav-link"},{default:e(()=>[o("後台")]),_:1})]),a("li",P,[s(t,{to:"/products",class:"nav-link"},{default:e(()=>[o("產品列表")]),_:1})]),a("li",E,[s(t,{to:"/carts",class:"nav-link"},{default:e(()=>[o("購物車")]),_:1})]),a("li",V,[s(t,{to:"/login",class:"nav-link"},{default:e(()=>[o("登入")]),_:1})]),a("li",T,[a("a",{class:"nav-link","aria-current":"page",href:"#",onClick:n[0]||(n[0]=u((...c)=>r.logOut&&r.logOut(...c),["prevent"]))},"登出")])])])])])}const $=_(g,[["render",A]]);export{$ as N};
