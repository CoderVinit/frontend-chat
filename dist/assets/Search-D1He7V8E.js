import{c as h,u as x,r as o,aA as S,a1 as f,j as t,S as g,aB as j,E as I}from"./index-BRYrtOYy.js";import{u as F}from"./index-DdwGzNOV.js";import{b as v}from"./Delete-BT8gj__Z.js";import{U as A}from"./UserItems-m5sG-z-p.js";import{D as T,a as U}from"./DialogTitle-on2HWKW6.js";import{T as y}from"./TextField-CUotFnna.js";import{I as D}from"./InputAdornment-KVEnJoAv.js";import{c as E}from"./AppLayout-BF_uULWe.js";import{e as L}from"./Menu-Cy-i2GGQ.js";import"./Modal-CADgA5Of.js";import"./Features-VHPfM-O5.js";import"./ListItem-B4dopy2O.js";import"./isMuiElement-DvTSXCug.js";import"./AvatarCard-CUbOGxQa.js";import"./Toolbar-ITnAtlz5.js";import"./Group-BQiUClK4.js";import"./Tooltip-BgeYST1d.js";import"./ExitToApp-U3kPwFHq.js";const K=()=>{const{isSearch:n}=h(e=>e.misc),r=F(""),i=x(),[s,c]=o.useState([]),[m]=S(),[d,l]=v(j),u=async e=>{await d("Sending Friend Request...",{userId:e})},p=()=>i(I(!1));return o.useEffect(()=>{const e=setTimeout(()=>{r.value&&m(r.value).then(({data:a})=>c(a.others)).catch(a=>f.error("Something Went Wrong"))},1e3);return()=>{clearTimeout(e)}},[r.value]),t.jsx(T,{open:n,onClose:p,children:t.jsxs(g,{p:"2rem",direction:"column",width:"25rem",children:[t.jsx(U,{textAlign:"center",children:"Find People"}),t.jsx(y,{label:"",value:r.value,onChange:r.changeHandler,variant:"outlined",size:"small",InputProps:{startAdornment:t.jsx(D,{position:"start",children:t.jsx(E,{})})}}),t.jsx(L,{children:s==null?void 0:s.map(e=>t.jsx(A,{user:e,handler:u,handlerIsLoading:l},e._id))})]})})};export{K as default};
