import{_ as p,a as S,r as o,j as e,U as P,b as I}from"./index-B-kRxooo.js";import{L}from"./Loading-BD0Jc0I2.js";const A=()=>{const d="http://35.154.167.170:3000",c=localStorage.getItem("token");return{getUserDetail:async()=>{try{const t=await fetch(`${d}/user/customer`,{method:"GET",headers:{Authorization:`Bearer ${c}`}}),s=await t.json();if(t.ok)return s.data;p.error("Failed to fetch user deatil!")}catch{p.error("Failed to fetch user deatil!")}}}},E=()=>{const d="http://35.154.167.170:3000",c=localStorage.getItem("token");return{updateUserDetail:async t=>{var m,g;let s=new FormData;s.append("first_name",t.first_name),s.append("last_name",t.last_name),s.append("email",t.email),s.append("mobile_number",t.mobile_number),s.append("gender",t.gender),t.image&&s.append("image",t.image),t.id_proof&&s.append("id_proof",t.id_proof);try{const f=await fetch(`${d}/user/customer`,{method:"PUT",headers:{Authorization:`Bearer ${c}`},body:s}),r=await f.json();return f.ok?(p.success("user data updated successfully"),(g=(m=r==null?void 0:r.data)==null?void 0:m.user)==null?void 0:g.updatedData):(p.error(r.message),null)}catch{return p.error("Failed to update user data!"),null}}}},B=()=>{const d=S(),{getUserDetail:c}=A(),{updateUserDetail:x}=E(),[t,s]=o.useState(null),[m,g]=o.useState(null),[f,r]=o.useState(!1),[l,u]=o.useState({first_name:"",last_name:"",email:"",mobile_number:"",gender:0,id_proof:null,image:null}),[v,N]=o.useState(!0),_=async n=>{if(n.preventDefault(),f){const a=await x(l);a&&d(I(a))}},h=n=>{const{name:a,value:i}=n.target;a=="gender"?(r(!0),u({...l,[a]:Number(i)})):(r(!0),u({...l,[a]:i}))},y=n=>{let a=n.target.files[0];a&&(r(!0),u({...l,id_proof:a}))},F=n=>{let a=n.target.files[0];if(a){r(!0);const i=URL.createObjectURL(a);s(i),u({...l,image:a})}};return o.useEffect(()=>{(async()=>{const a=await c();if(a){const{first_name:i,last_name:U,email:w,mobile_number:k,gender:C,image:b,id_proof:j}=a.user;u({first_name:i,last_name:U,email:w,mobile_number:k,gender:C});const D=b||"/default_avatar.png";j&&g(j),s(D),N(!1)}})()},[]),v?e.jsx(L,{}):e.jsxs(e.Fragment,{children:[e.jsx("h3",{className:"dash-section-head mb-5",children:"Customer Master - Details"}),e.jsx("div",{className:"cus-detail-container",children:e.jsxs("div",{className:"p-14 flex items-start gap-20",children:[e.jsxs("div",{className:"profile-img-container relative",children:[e.jsx("img",{src:t,alt:"Avatar",className:"h-full w-full rounded-full border-[1.5px] border-[var(--black)]"}),e.jsx("button",{className:"edit-profile-img",onClick:()=>document.getElementById("profileImageInput").click(),children:e.jsx(P,{className:"inline-block h-full w-full fill-white p-3"})}),e.jsx("input",{type:"file",id:"profileImageInput",className:"hidden",accept:"image/*",onChange:F})]}),e.jsx("div",{className:"grow",children:e.jsx("form",{className:"user-detail",onSubmit:_,children:e.jsxs("div",{className:"grid grid-cols-2 gap-x-12 gap-y-14",children:[e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx("label",{htmlFor:"firstname",children:"first name"}),e.jsx("input",{id:"firstname",type:"text",name:"first_name",value:l.first_name,onChange:h,className:"border-[1.5px] border-indigo-200 focus:border-indigo-500 focus:outline-none"})]}),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx("label",{htmlFor:"lastname",children:"last name"}),e.jsx("input",{id:"lastname",type:"text",name:"last_name",value:l.last_name,onChange:h,className:"border-[1.5px] border-indigo-200 focus:border-indigo-500 focus:outline-none"})]}),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx("label",{htmlFor:"email",children:"email"}),e.jsx("input",{readOnly:!0,id:"email",type:"text",name:"email",value:l.email,className:"readonly-input border-[1.5px] border-indigo-200 focus:border-indigo-500 focus:outline-none"})]}),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx("label",{htmlFor:"mobile",children:"mobile"}),e.jsx("input",{readOnly:!0,id:"mobile",type:"text",name:"mobile_number",value:l.mobile_number,className:"readonly-input border-[1.5px] border-indigo-200 focus:border-indigo-500 focus:outline-none"})]}),e.jsxs("div",{className:"col-span-2 flex flex-col gap-4",children:[e.jsx("label",{htmlFor:"document",children:"Update/Add document"}),e.jsx("input",{id:"document",type:"file",onChange:y,className:"border-[1.5px] border-indigo-200 focus:border-indigo-500 focus:outline-none"}),m&&e.jsx("div",{className:"flex items-start gap-8",children:e.jsx("a",{href:m,className:"inline-block text-indigo-600 hover:underline",target:"__blank",children:"view document"})})]}),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx("label",{htmlFor:"gender",children:"gender"}),e.jsxs("div",{className:"grow flex items-stretch justify-stretch gap-8",children:[e.jsxs("label",{htmlFor:"male",className:"flex items-center justify-center gap-2 border border-indigo-300 py-[1.25rem] rounded-lg px-4",children:[e.jsx("input",{id:"male",type:"radio",name:"gender",value:1,onChange:h,checked:l.gender==1}),e.jsx("span",{className:"text-[1.5rem] leading-[1.7rem] text-[var(--black)]",children:"Male"})]}),e.jsxs("label",{htmlFor:"female",className:"flex items-center justify-center gap-2 border border-indigo-300 py-[1.25rem] rounded-lg px-4",children:[e.jsx("input",{id:"female",type:"radio",name:"gender",value:2,onChange:h,checked:l.gender==2}),e.jsx("span",{className:"text-[1.5rem] leading-[1.7rem] text-[var(--black)]",children:"Female"})]})]})]}),e.jsx("div",{className:"col-span-2",children:e.jsx("button",{className:"update-btn",type:"submit",children:"update"})})]})})})]})})]})};export{B as default};