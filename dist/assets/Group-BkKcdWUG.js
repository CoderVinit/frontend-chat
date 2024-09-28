function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/ConfirmDeleteDialog-D50kQlK3.js","assets/index-BRYrtOYy.js","assets/DialogTitle-on2HWKW6.js","assets/Modal-CADgA5Of.js","assets/Menu-Cy-i2GGQ.js","assets/Button-CgSTDiwQ.js","assets/AddMemberDialog-BnbWfz7e.js","assets/UserItems-m5sG-z-p.js","assets/Features-VHPfM-O5.js","assets/ListItem-B4dopy2O.js","assets/isMuiElement-DvTSXCug.js","assets/Delete-BT8gj__Z.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{j as e,r as o,C as A,u as X,c as Z,U as J,h as ee,W as se,i as re,X as oe,Q as g,S as c,n as te,L as ae,Y as ne,Z as ie,$ as le,a0 as ce}from"./index-BRYrtOYy.js";import{A as de}from"./AvatarCard-CUbOGxQa.js";import{U as me}from"./UserItems-m5sG-z-p.js";import{b as j,a as ue,D as pe,A as xe}from"./Delete-BT8gj__Z.js";import{c as f,T as u,B as E,M as m}from"./Modal-CADgA5Of.js";import{D as he,B as ge,M as je}from"./Features-VHPfM-O5.js";import{M as fe}from"./Tooltip-BgeYST1d.js";import{T as be}from"./TextField-CUotFnna.js";import{B as S}from"./Button-CgSTDiwQ.js";import"./Menu-Cy-i2GGQ.js";import"./ListItem-B4dopy2O.js";import"./isMuiElement-DvTSXCug.js";const Me=f(e.jsx("path",{d:"M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"}),"Done"),ve=f(e.jsx("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"}),"Edit"),De=f(e.jsx("path",{d:"M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"}),"KeyboardBackspace"),Ie=o.lazy(()=>A(()=>import("./ConfirmDeleteDialog-D50kQlK3.js"),__vite__mapDeps([0,1,2,3,4,5]))),Ge=o.lazy(()=>A(()=>import("./AddMemberDialog-BnbWfz7e.js"),__vite__mapDeps([6,1,7,8,3,9,4,10,11,2,5]))),Te=()=>{var C,y;const l=X(),{isAddMember:i}=Z(t=>t.misc),s=J()[0].get("group"),n=ee(),r=se(""),a=re({chatId:s,populate:!0},{skip:!s}),[_,b]=j(ne),[w,B]=j(ie),[N,Ce]=j(le),[z,M]=o.useState(!1),[R,p]=o.useState(!1),[U,x]=o.useState(""),[v,d]=o.useState(""),[D,I]=o.useState(!1),[h,T]=o.useState([]),H=[{isError:r.isError,error:r.error},{isError:a.isError,error:a.error}];ue(H),o.useEffect(()=>{a.data&&(x(a.data.chat.name),d(a.data.chat.name),T(a.data.chat.members))},[a.data]);const F=()=>{n("/")},V=()=>{M(t=>!t)},O=()=>{M(!1)},P=()=>{p(!1),_("Updating Group Name...",{chatId:s,name:v})},$=()=>{I(!0)},G=()=>{I(!1)},Q=()=>{l(ce(!0))},Y=()=>{N("Deleting Group...",s),G(),n("/groups")},K=t=>{w("Removing Group Member...",{chatId:s,userId:t})};o.useEffect(()=>(s&&(x(`Group Name ${s}`),d(`Group Name ${s}`)),()=>{x(""),d(""),p(!1)}),[s]);const W=e.jsxs(e.Fragment,{children:[e.jsx(ge,{sx:{display:{xs:"block",sm:"none"},position:"fixed",right:"1rem",top:"1rem"},children:e.jsx(m,{onClick:V,children:e.jsx(je,{})})}),e.jsx(fe,{title:"back",children:e.jsx(m,{sx:{position:"absolute",top:"2rem",left:"2rem",bgcolor:"rgba(0,0,0,0.7)",color:"white","&:hover":{bgcolor:"rgba(0,0,0,0.8)"}},onClick:F,children:e.jsx(De,{})})})]}),k=e.jsx(c,{direction:"row",alignItems:"center",justifyContent:"center",p:"2rem",spacing:"1rem",children:R?e.jsxs(e.Fragment,{children:[e.jsx(be,{value:v,onChange:t=>d(t.target.value)}),e.jsx(m,{onClick:P,disabled:b,children:e.jsx(Me,{})})]}):e.jsxs(e.Fragment,{children:[e.jsx(u,{variant:"h4",children:U}),e.jsx(m,{onClick:()=>p(!0),disabled:b,children:e.jsx(ve,{})})]})}),q=e.jsxs(c,{direction:{xs:"column-reverse",sm:"row"},spacing:"1rem",p:{sm:"1rem",xs:"0",md:"1rem 4rem"},children:[e.jsx(S,{size:"large",color:"error",variant:"outlined",startIcon:e.jsx(pe,{}),onClick:$,children:"Delete Group"}),e.jsx(S,{variant:"contained",size:"large",startIcon:e.jsx(xe,{}),onClick:Q,children:"Add Member"})]});return r.isLoading?e.jsx(oe,{}):e.jsxs(g,{container:!0,height:"100vh",children:[e.jsxs(g,{item:!0,sx:{display:{xs:"none",sm:"block"},overflowY:"auto",height:"100%"},position:"relative",sm:4,bgcolor:"bisque",children:[" ",e.jsx(L,{myGroup:(C=r==null?void 0:r.data)==null?void 0:C.groups,chatId:s})]}),e.jsxs(g,{item:!0,xs:12,sm:8,sx:{display:"flex",flexDirection:"column",alignItems:"center",position:"relative",padding:"1rem 3rem"},children:[W,k&&e.jsxs(e.Fragment,{children:[k,e.jsx(u,{margin:"1rem",alignSelf:"flex-start",variant:"body1",children:"Members"}),e.jsx(c,{maxWidth:"45rem",width:"100%",boxSizing:"border-box",padding:{sm:"1rem",xs:"0",md:"1rem 4rem"},spacing:"2rem",height:"50vh",sx:{overflowY:"auto"},children:B?e.jsx(te,{}):h==null?void 0:h.map(t=>e.jsx(me,{user:t,isAdded:!0,styling:{boxShadow:"0 0 0.5rem rgba(0,0,0,0.2)",padding:"1rem 2rem",borderRadius:"1rem"},handler:K},t._id))}),q]})]}),i&&e.jsx(o.Suspense,{fallback:e.jsx(E,{open:!0}),children:e.jsx(Ge,{chatId:s})}),D&&e.jsx(o.Suspense,{fallback:e.jsx(E,{open:!0}),children:e.jsx(Ie,{open:D,handleClose:G,deleteHandler:Y})}),e.jsx(he,{sx:{display:{xs:"block",sm:"none"}},open:z,onClose:O,anchor:"left",children:e.jsx(L,{w:"50vw",myGroup:(y=r==null?void 0:r.data)==null?void 0:y.groups,chatId:s})})]})},L=({w:l="100%",myGroup:i=[],chatId:s})=>e.jsx(c,{width:l,children:i.length>0?i.map((n,r)=>e.jsx(ke,{group:n,chatId:s},r)):e.jsx(u,{textAlign:"center",padding:"1rem",children:"No Groups"})}),ke=o.memo(({group:l,chatId:i})=>{const{name:s,_id:n,avatar:r}=l;return e.jsx(ae,{to:`?group=${n}`,onClick:a=>{i===n&&a.preventDefault()},children:e.jsxs(c,{direction:"row",spacing:"1rem",alignItems:"center",children:[e.jsx(de,{avatar:r}),e.jsx(u,{children:s})]})})});export{Te as default};
