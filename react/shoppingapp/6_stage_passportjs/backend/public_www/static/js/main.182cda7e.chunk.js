(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{152:function(e,t,n){},153:function(e,t,n){},161:function(e,t,n){"use strict";n.r(t);var r=n(2),o=n(0),i=n.n(o),c=n(39),s=n.n(c),a=(n(152),n(17)),u=n(18),p=n(20),l=n(19),d=(n.p,n(153),n(11)),h=n(176),j=n(174),b=function(e){Object(p.a)(n,e);var t=Object(l.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){var e=this;return Object(r.jsxs)(j.a.Row,{children:[Object(r.jsx)(j.a.Cell,{children:this.props.item.type}),Object(r.jsx)(j.a.Cell,{children:this.props.item.count}),Object(r.jsx)(j.a.Cell,{children:this.props.item.price}),Object(r.jsx)(j.a.Cell,{children:Object(r.jsx)(h.a,{color:"red",onClick:function(){return e.props.handleRemoveButton(e.props.item._id)},children:"Remove"})}),Object(r.jsx)(j.a.Cell,{children:Object(r.jsx)(h.a,{color:"green",onClick:function(){return e.props.handleEditButton(e.props.item._id)},children:"Edit"})})]})}}]),n}(i.a.Component),O=function(e){Object(p.a)(n,e);var t=Object(l.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){var e=this;return Object(r.jsxs)(j.a.Row,{children:[Object(r.jsx)(j.a.Cell,{children:this.props.item.type}),Object(r.jsx)(j.a.Cell,{children:this.props.item.count}),Object(r.jsx)(j.a.Cell,{children:this.props.item.price}),Object(r.jsx)(j.a.Cell,{children:Object(r.jsx)(h.a,{color:"grey",onClick:function(){return e.props.cancel()},children:"Cancel"})}),Object(r.jsx)(j.a.Cell,{children:Object(r.jsx)(h.a,{color:"green",onClick:function(){return e.props.removeFromList(e.props.item._id)},children:"Confirm"})})]})}}]),n}(i.a.Component),g=function(e){Object(p.a)(n,e);var t=Object(l.a)(n);function n(e){var r;return Object(a.a)(this,n),(r=t.call(this,e)).onChange=function(e){var t={};t[e.target.name]=e.target.value,r.setState(t)},r.saveItem=function(e){e.preventDefault();var t={_id:r.props.item._id,type:r.state.type,count:r.state.count,price:r.state.price};r.props.editItem(t)},r.state={type:e.item.type,count:e.item.count,price:e.item.price},r}return Object(u.a)(n,[{key:"render",value:function(){var e=this;return Object(r.jsxs)(j.a.Row,{children:[Object(r.jsx)(j.a.Cell,{children:Object(r.jsx)("input",{type:"text",name:"type",onChange:this.onChange,value:this.state.type})}),Object(r.jsx)(j.a.Cell,{children:Object(r.jsx)("input",{type:"number",name:"count",onChange:this.onChange,value:this.state.count})}),Object(r.jsx)(j.a.Cell,{children:Object(r.jsx)("input",{type:"number",step:"0.01",name:"price",onChange:this.onChange,value:this.state.price})}),Object(r.jsx)(j.a.Cell,{children:Object(r.jsx)(h.a,{color:"green",onClick:this.saveItem,children:"Save"})}),Object(r.jsx)(j.a.Cell,{children:Object(r.jsx)(h.a,{color:"grey",onClick:function(){return e.props.cancel()},children:"Cancel"})})]})}}]),n}(i.a.Component),f=n(30),m="LOADING",x="LOADING_DONE",v="REGISTER_SUCCESS",S="REGISTER_FAILED",y="LOGIN_SUCCESS",C="LOGIN_FAILED",I="LOGOUT_SUCCESS",k="LOGOUT_FAILED",L="CLEAR_LOGIN_STATE",E=function(){return{type:m}},_=function(){return{type:x}},T=function(){return{type:v}},w=function(e){return{type:S,error:e}},F=function(e){return{type:y,token:e}},P=function(e){return{type:C,error:e}},R=function(){return{type:I}},N=function(e){return{type:k,error:e}},D=function(){return{type:L}},A="FETCH_SHOPPINGLIST_SUCCESS",G="FETCH_SHOPPINGLIST_FAILED",H="ADD_TO_SHOPPINGLIST_SUCCESS",B="ADD_TO_SHOPPINGLIST_FAILED",U="REMOVE_FROM_SHOPPINGLIST_SUCCESS",J="REMOVE_FROM_SHOPPINGLIST_FAILED",M="EDIT_ITEM_SUCCESS",V="EDIT_ITEM_FAILED",q="CLEAR_SHOPPING_STATE",z=function(e,t){return function(n){var r={method:"GET",mode:"cors",headers:{"Content-type":"application/json",token:e}},o="/api/shopping";t&&(o=o+"?type="+t),n(E()),fetch(o,r).then((function(e){n(_()),e.ok?e.json().then((function(e){n(K(e))})).catch((function(e){n(Q("Error parsing shopping information"))})):403===e.status?(n(D()),n(te()),n(Q("Server responded with an expired session. Logging you out!"))):n(Q("Server responed with a status:"+e.statusText))})).catch((function(e){n(_()),n(Q("Server responded with an error:"+e))}))}},K=function(e){return{type:A,list:e}},Q=function(e){return{type:G,error:e}},W=function(){return{type:H}},X=function(e){return{type:B,error:e}},Y=function(){return{type:U}},Z=function(e){return{type:J,error:e}},$=function(){return{type:M}},ee=function(e){return{type:V,error:e}},te=function(){return{type:q}},ne=function(e){Object(p.a)(n,e);var t=Object(l.a)(n);function n(e){var r;return Object(a.a)(this,n),(r=t.call(this,e)).searchByType=function(e){r.props.dispatch(z(r.props.token,r.state.search)),r.setState({search:""})},r.onChange=function(e){var t={};t[e.target.name]=e.target.value,r.setState(t)},r.handleRemoveButton=function(e){for(var t=0;t<r.props.list.length;t++)e===r.props.list[t]._id&&r.setState({removeIndex:t,editIndex:-1})},r.handleEditButton=function(e){for(var t=0;t<r.props.list.length;t++)e===r.props.list[t]._id&&r.setState({removeIndex:-1,editIndex:t})},r.cancel=function(){r.setState({removeIndex:-1,editIndex:-1})},r.removeFromList=function(e){r.props.dispatch(function(e,t){return function(n){var r={method:"DELETE",mode:"cors",headers:{"Content-type":"application/json",token:t}};n(E()),fetch("/api/shopping/"+e,r).then((function(e){n(_()),e.ok?(n(z(t)),n(Y())):403===e.status?(n(D()),n(te()),n(Z("Server responded with an expired session. Logging you out!"))):n(Z("Server responed with a status:"+e.statusText))})).catch((function(e){n(_()),n(Z("Server responded with an error:"+e))}))}}(e,r.props.token)),r.cancel()},r.editItem=function(e){r.props.dispatch(function(e,t){return function(n){var r={method:"PUT",mode:"cors",headers:{"Content-type":"application/json",token:t},body:JSON.stringify(e)};n(E()),fetch("/api/shopping/"+e._id,r).then((function(e){n(_()),e.ok?(n(z(t)),n($())):403===e.status?(n(D()),n(te()),n(ee("Server responded with an expired session. Logging you out!"))):n(ee("Server responed with a status:"+e.statusText))})).catch((function(e){n(_()),n(ee("Server responded with an error:"+e))}))}}(e,r.props.token)),r.cancel()},r.state={removeIndex:-1,editIndex:-1,search:""},r}return Object(u.a)(n,[{key:"render",value:function(){var e=this,t=this.props.list.map((function(t,n){return n===e.state.removeIndex?Object(r.jsx)(O,{item:t,removeFromList:e.removeFromList,cancel:e.cancel},t._id):n===e.state.editIndex?Object(r.jsx)(g,{item:t,editItem:e.editItem,cancel:e.cancel},t._id):Object(r.jsx)(b,{item:t,handleRemoveButton:e.handleRemoveButton,handleEditButton:e.handleEditButton},t._id)}));return Object(r.jsxs)("div",{children:[Object(r.jsx)("label",{htmlFor:"search",children:"Search by type:"}),Object(r.jsx)("input",{type:"text",name:"search",onChange:this.onChange,value:this.state.search}),Object(r.jsx)(h.a,{onClick:this.searchByType,style:{marginLeft:10},children:"Search"}),Object(r.jsxs)(j.a,{striped:!0,children:[Object(r.jsx)(j.a.Header,{children:Object(r.jsxs)(j.a.Row,{children:[Object(r.jsx)(j.a.HeaderCell,{children:"Item type"}),Object(r.jsx)(j.a.HeaderCell,{children:"Count"}),Object(r.jsx)(j.a.HeaderCell,{children:"Price"}),Object(r.jsx)(j.a.HeaderCell,{children:"Remove"}),Object(r.jsx)(j.a.HeaderCell,{children:"Edit"})]})}),Object(r.jsx)(j.a.Body,{children:t})]})]})}}]),n}(i.a.Component),re=Object(f.b)((function(e){return{token:e.login.token,list:e.shopping.list}}))(ne),oe=n(173),ie=function(e){Object(p.a)(n,e);var t=Object(l.a)(n);function n(e){var r;return Object(a.a)(this,n),(r=t.call(this,e)).onChange=function(e){var t={};t[e.target.name]=e.target.value,r.setState(t)},r.onSubmit=function(e){e.preventDefault();var t={type:r.state.type,count:r.state.count,price:r.state.price};r.props.dispatch(function(e,t){return function(n){var r={method:"POST",mode:"cors",headers:{"Content-type":"application/json",token:t},body:JSON.stringify(e)};n(E()),fetch("/api/shopping",r).then((function(e){n(_()),e.ok?(n(z(t)),n(W())):403===e.status?(n(D()),n(te()),n(X("Server responded with an expired session. Logging you out!"))):n(X("Server responed with a status:"+e.statusText))})).catch((function(e){n(_()),n(X("Server responded with an error:"+e))}))}}(t,r.props.token)),r.setState({type:"",count:0,price:0})},r.state={type:"",count:0,price:0},r}return Object(u.a)(n,[{key:"render",value:function(){return Object(r.jsx)("div",{style:{width:500,margin:"auto"},children:Object(r.jsxs)(oe.a,{onSubmit:this.onSubmit,children:[Object(r.jsxs)(oe.a.Field,{children:[Object(r.jsx)("label",{htmlFor:"type",children:"Item type:"}),Object(r.jsx)("input",{type:"text",name:"type",onChange:this.onChange,value:this.state.type})]}),Object(r.jsxs)(oe.a.Field,{children:[Object(r.jsx)("label",{htmlFor:"count",children:"Count:"}),Object(r.jsx)("input",{type:"number",name:"count",onChange:this.onChange,value:this.state.count})]}),Object(r.jsxs)(oe.a.Field,{children:[Object(r.jsx)("label",{htmlFor:"price",children:"Price:"}),Object(r.jsx)("input",{type:"number",step:"0.01",name:"price",onChange:this.onChange,value:this.state.price})]}),Object(r.jsx)(h.a,{type:"submit",children:"Add"})]})})}}]),n}(i.a.Component),ce=Object(f.b)((function(e){return{token:e.login.token}}))(ie),se=function(e){Object(p.a)(n,e);var t=Object(l.a)(n);function n(e){var r;return Object(a.a)(this,n),(r=t.call(this,e)).onChange=function(e){var t={};t[e.target.name]=e.target.value,r.setState(t)},r.onSubmit=function(e){e.preventDefault();var t={username:r.state.username,password:r.state.password};"register"===e.target.name?r.props.dispatch(function(e){return function(t){var n={method:"POST",mode:"cors",headers:{"Content-type":"application/json"},body:JSON.stringify(e)};t(E()),fetch("/register",n).then((function(e){e.ok?t(T()):409===e.status?t(w("Username is already in use")):t(w("Server responded with a status:"+e.status))})).catch((function(e){t(w("Server responded with an error:"+e))}))}}(t)):r.props.dispatch(function(e){return function(t){var n={method:"POST",mode:"cors",headers:{"Content-type":"application/json"},body:JSON.stringify(e)};t(E()),fetch("/login",n).then((function(e){e.ok?e.json().then((function(e){t(F(e.token)),t(z(e.token))})).catch((function(e){t(P("Failed to parse JSON. Error:"+e))})):t(P("Server responded with a status:"+e.status))})).catch((function(e){t(P("Server responded with an error. Reason:"+e))}))}}(t))},r.state={username:"",password:""},r}return Object(u.a)(n,[{key:"render",value:function(){return Object(r.jsx)("div",{style:{width:500,margin:"auto"},children:Object(r.jsxs)(oe.a,{children:[Object(r.jsxs)(oe.a.Field,{children:[Object(r.jsx)("label",{htmlFor:"username",children:"Username:"}),Object(r.jsx)("input",{type:"text",name:"username",onChange:this.onChange,value:this.state.username})]}),Object(r.jsxs)(oe.a.Field,{children:[Object(r.jsx)("label",{htmlFor:"password",children:"Password:"}),Object(r.jsx)("input",{type:"password",name:"password",onChange:this.onChange,value:this.state.password})]}),Object(r.jsx)(h.a,{onClick:this.onSubmit,name:"register",children:"Register"}),Object(r.jsx)(h.a,{onClick:this.onSubmit,name:"login",children:"Login"})]})})}}]),n}(i.a.Component),ae=Object(f.b)()(se),ue=n(178),pe=n(175),le=n(59),de=function(e){Object(p.a)(n,e);var t=Object(l.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){var e=this,t=Object(r.jsx)(ue.a,{children:"Shopping App"});this.props.loading&&(t=Object(r.jsx)(ue.a,{children:"Loading ..."})),this.props.error&&(t=Object(r.jsx)(ue.a,{children:this.props.error}));var n={height:100,backgroundColor:"lightblue"};return this.props.isLogged?Object(r.jsxs)("div",{style:n,children:[t,Object(r.jsxs)(pe.a,{children:[Object(r.jsx)(pe.a.Item,{children:Object(r.jsx)(le.b,{to:"/list",children:"Shopping List"})}),Object(r.jsx)(pe.a.Item,{children:Object(r.jsx)(le.b,{to:"/form",children:"Add to list"})}),Object(r.jsx)(pe.a.Item,{children:Object(r.jsx)(le.b,{to:"/",onClick:function(){return e.props.dispatch((t=e.props.token,function(e){var n={method:"POST",mode:"cors",headers:{"Content-type":"application/json",token:t}};e(E()),fetch("/logout",n).then((function(t){t.ok?(e(R()),e(te())):(e(N("Server responded with a conflict. Logging you out!")),e(te()))})).catch((function(t){e(N("Server responded with an error:"+t+". Logging out!")),e(te())}))}));var t},children:"Logout"})})]})]}):Object(r.jsx)("div",{style:n,children:t})}}]),n}(i.a.Component),he=Object(f.b)((function(e){var t="";return e.shopping.error&&(t=e.shopping.error),e.login.error&&(t=e.login.error),{isLogged:e.login.isLogged,token:e.login.token,loading:e.login.loading,error:t}}))(de),je=function(e){Object(p.a)(n,e);var t=Object(l.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){var e=this;return Object(r.jsxs)("div",{className:"App",children:[Object(r.jsx)(he,{}),Object(r.jsx)("hr",{}),Object(r.jsxs)(d.d,{children:[Object(r.jsx)(d.b,{exact:!0,path:"/",render:function(){return e.props.isLogged?Object(r.jsx)(d.a,{to:"/list"}):Object(r.jsx)(ae,{})}}),Object(r.jsx)(d.b,{path:"/list",render:function(){return e.props.isLogged?Object(r.jsx)(re,{}):Object(r.jsx)(d.a,{to:"/"})}}),Object(r.jsx)(d.b,{path:"/form",render:function(){return e.props.isLogged?Object(r.jsx)(ce,{}):Object(r.jsx)(d.a,{to:"/"})}})]})]})}}]),n}(i.a.Component),be=Object(f.b)((function(e){return{token:e.login.token,isLogged:e.login.isLogged}}))(je),Oe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,179)).then((function(t){var n=t.getCLS,r=t.getFID,o=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),r(e),o(e),i(e),c(e)}))},ge=(n(160),n(10)),fe=function(e){sessionStorage.setItem("loginstate",JSON.stringify(e))},me=sessionStorage.getItem("loginstate")?JSON.parse(sessionStorage.getItem("loginstate")):{isLogged:!1,token:"",loading:!1,error:""},xe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:me,t=arguments.length>1?arguments[1]:void 0;console.log("LoginReducer:",t);var n={};switch(t.type){case m:return Object(ge.a)(Object(ge.a)({},e),{},{loading:!0,error:""});case x:return Object(ge.a)(Object(ge.a)({},e),{},{loading:!1,error:""});case v:return n=Object(ge.a)(Object(ge.a)({},e),{},{loading:!1,error:"Register Success"}),fe(n),n;case S:return n=Object(ge.a)(Object(ge.a)({},e),{},{loading:!1,error:t.error}),fe(n),n;case y:return n={isLogged:!0,token:t.token,loading:!1,error:""},fe(n),n;case C:return n=Object(ge.a)(Object(ge.a)({},e),{},{loading:!1,error:t.error}),fe(n),n;case I:return fe(n={isLogged:!1,token:"",loading:!1,error:""}),n;case k:return n={isLogged:!1,token:"",loading:!1,error:t.error},fe(n),n;case L:return fe(n={isLogged:!1,token:"",loading:!1,error:""}),n;default:return e}},ve=function(e){sessionStorage.setItem("shoppingstate",JSON.stringify(e))},Se=sessionStorage.getItem("shoppingstate")?JSON.parse(sessionStorage.getItem("shoppingstate")):{error:"",list:[]},ye=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Se,t=arguments.length>1?arguments[1]:void 0;console.log("Shoppingreducer:",t);var n={};switch(t.type){case A:return n={list:t.list,error:""},ve(n),n;case G:return n=Object(ge.a)(Object(ge.a)({},e),{},{error:t.error}),ve(n),n;case H:return n=Object(ge.a)(Object(ge.a)({},e),{},{error:""}),ve(n),n;case B:return n=Object(ge.a)(Object(ge.a)({},e),{},{error:t.error}),ve(n),n;case U:return n=Object(ge.a)(Object(ge.a)({},e),{},{error:""}),ve(n),n;case J:return n=Object(ge.a)(Object(ge.a)({},e),{},{error:t.error}),ve(n),n;case M:return n=Object(ge.a)(Object(ge.a)({},e),{},{error:""}),ve(n),n;case V:return n=Object(ge.a)(Object(ge.a)({},e),{},{error:t.error}),ve(n),n;case q:return ve(n={list:[],error:""}),n;default:return e}},Ce=n(80),Ie=n(133),ke=Object(Ce.c)({login:xe,shopping:ye}),Le=Object(Ce.d)(ke,Object(Ce.a)(Ie.a));s.a.render(Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)(f.a,{store:Le,children:Object(r.jsx)(le.a,{children:Object(r.jsx)(be,{})})})}),document.getElementById("root")),Oe()}},[[161,1,2]]]);
//# sourceMappingURL=main.182cda7e.chunk.js.map