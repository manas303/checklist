(this.webpackJsonpchecklist=this.webpackJsonpchecklist||[]).push([[0],{13:function(e,t,n){e.exports={navigator:"Nav_navigator__1TeUC",bmwdiv:"Nav_bmwdiv__vLPEm",bmwlogo:"Nav_bmwlogo__3KX5j",navigatorcontainer:"Nav_navigatorcontainer__1F5qJ"}},27:function(e,t,n){},28:function(e,t,n){},34:function(e,t,n){"use strict";n.r(t);var i=n(2),c=n.n(i),s=n(19),o=n.n(s),a=(n(27),n.p,n(28),n(13)),r=n.n(a),l=n.p+"static/media/bmw.a590455f.png",u=n(1),j=function(){return Object(u.jsxs)("div",{className:r.a.navigatorcontainer,children:[Object(u.jsx)("div",{className:r.a.bmwdiv,children:Object(u.jsx)("img",{className:r.a.bmwlogo,src:l,alt:"some logo"})}),Object(u.jsx)("div",{className:r.a.navigator,children:Object(u.jsx)("nav",{children:Object(u.jsxs)("ul",{children:[Object(u.jsx)("li",{children:"Home"}),Object(u.jsx)("li",{children:"Checklist"})]})})})]})},d=n(11),p=n(49),h=n(51),b=n(50),g=n(12),m=(n(20),n(6)),O=n.n(m),f=function(e){var t=Object(i.useState)([]),n=Object(d.a)(t,2),c=n[0],s=n[1];Object(i.useEffect)((function(){a().then((function(e){console.log("response received",JSON.stringify(e)),s((function(t){return e.toppings.length>0?e.toppings:t}))}))}),[]);var o,a=function(){var t={id:e.id,method:"get"};return console.log("posting request",JSON.stringify(t)),fetch("https://gaha9omme7.execute-api.ap-southeast-2.amazonaws.com/default/checklist-api",{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}}).then((function(e){var t=e.json();return console.log("response"+JSON.stringify(t)),t}))},r=Object(i.useState)(0),l=Object(d.a)(r,2),j=l[0],p=l[1],h=function e(t){if(null===t)return null;if(Array.isArray(t)){for(var n=[],i=0;i<t.length;i++)"object"===typeof t[i]?n.push(e(t[i])):n.push(t[i]);return n}var c=Object.create(t);for(var s in c)"object"===typeof c[s]?c[s]=e(c[s]):c[s]=c[s];return c},b=function(e){if("undefined"==typeof e&&null==e)return!0},m=function(e){var t;return 0!=Array.isArray(e)?e:((t=Object.values(e)).splice(-1),console.log("After making array"+JSON.stringify(t)),t)};return Object(u.jsxs)("div",{className:O.a.App,children:[Object(u.jsx)("h3",{children:e.name}),Object(u.jsxs)("ul",{className:O.a.toppingsList,children:[c.map((function(e,t){var n=e.name,i=e.price,o=e.isChecked;return Object(u.jsx)("li",{children:Object(u.jsxs)("div",{className:O.a.toppingsListItem,children:[Object(u.jsxs)("div",{className:"left-section",children:[Object(u.jsx)("input",{type:"checkbox",id:"custom-checkbox-".concat(t),name:n,value:n,checked:o,onChange:function(){return function(e){var t=Object.create(c),n=t[e];n.isChecked=!n.isChecked,s(t);var i=t.reduce((function(e,t,n){return!0===t.isChecked?e+t.price:e}),0);p(i)}(t)}}),Object(u.jsx)("label",{htmlFor:"custom-checkbox-".concat(t),children:Object(u.jsx)("input",{type:"text",name:"name",value:n,onChange:function(e){return function(e,t){s((function(n){var i=Object(g.a)(n);return console.log(t),console.log("splicing "),i.splice(t,1,{name:e.target.value,price:0,isChecked:!1}),console.log("newToppings - > ",i),i})),console.log("toppings -> ",c)}(e,t)}})})]}),Object(u.jsx)("button",{type:"button",className:O.a.smallbutton,onClick:function(){return function(e){var t=Object(g.a)(c);-1!==e&&(t.splice(e,1),s(t))}(t)},children:"Delete"}),Object(u.jsx)("div",{className:"right-section",children:i})]})},t)})),Object(u.jsx)("li",{children:Object(u.jsxs)("div",{className:O.a.toppingsListItem,children:[Object(u.jsx)("div",{className:"left-section",children:"Total:"}),Object(u.jsx)("div",{className:"right-section",children:(o=j,"$".concat(o.toFixed(2)))})]})})]}),Object(u.jsx)("button",{type:"button",className:O.a.Button,onClick:function(){var e=Object.create(c);e.push({name:"",price:0,isChecked:!1}),console.log("updated value"+e),s(e)},children:"Add Item"}),"\xa0\xa0\xa0",Object(u.jsx)("button",{type:"button",className:O.a.Button,onClick:function(){var t=Object.assign(c);console.log("updated value"+t);var n=h(t);console.log("posting request",JSON.stringify(n));var i=m(n);if(i.every(b))alert("Please fix empty fields");else{console.log("posting request",JSON.stringify(i));var s={id:e.id,toppings:i};fetch("https://gaha9omme7.execute-api.ap-southeast-2.amazonaws.com/default/checklist-api",{method:"POST",body:JSON.stringify(s),headers:{"Content-Type":"application/json"}}).then((function(e){console.log("response"+JSON.stringify(e.json()))}));alert("Saved!")}},children:"Save"})]})},v=n(17),x=n.n(v);function _(){var e=Object(i.useState)([x()(),x()(),x()()]),t=Object(d.a)(e,2);t[0],t[1];return Object(u.jsxs)(c.a.Fragment,{children:[Object(u.jsx)(p.a,{}),Object(u.jsx)(b.a,{maxWidth:"md",children:Object(u.jsxs)(h.a,{component:"div",style:{backgroundColor:"#3163c7",height:"180vh"},children:[Object(u.jsx)(f,{name:"Coles",id:"1"}),Object(u.jsx)("br",{}),Object(u.jsx)(f,{name:"Indian Store ",id:"2"}),Object(u.jsx)("br",{}),Object(u.jsx)(f,{name:"Big Daddy's",id:"3"})]})})]})}var y=function(){return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsx)(j,{}),Object(u.jsx)(_,{})]})},k=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,52)).then((function(t){var n=t.getCLS,i=t.getFID,c=t.getFCP,s=t.getLCP,o=t.getTTFB;n(e),i(e),c(e),s(e),o(e)}))};o.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(y,{})}),document.getElementById("root")),k()},6:function(e,t,n){e.exports={App:"Checklist-original_App__351OV",topping:"Checklist-original_topping__Mb7PH",result:"Checklist-original_result__Ub6UI",toppingsList:"Checklist-original_toppingsList__1Ezhd",total:"Checklist-original_total__2ROo5",toppingsListItem:"Checklist-original_toppingsListItem__3dyQm",Button:"Checklist-original_Button__1h9U9",smallbutton:"Checklist-original_smallbutton__1ezz-"}}},[[34,1,2]]]);
//# sourceMappingURL=main.19835c6c.chunk.js.map