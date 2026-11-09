var Ks=Object.defineProperty;var qs=(o,t,n)=>t in o?Ks(o,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[t]=n;var hn=(o,t,n)=>qs(o,typeof t!="symbol"?t+"":t,n);import{r as d,j as a,R as pn,a as Xs}from"./vendor-react-CaWfk93z.js";import{g as Ro,h as Fn,G as Zs}from"./vendor-CBCmFtqW.js";import{u as x,f as Kt}from"./vendor-styled-Nm-b085n.js";import{I as Lt,R as Nn,L as kt,K as gn,S as Gs,a as Js,G as mn}from"./vendor-konva-CTFnODSI.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const Nt={BASE_URL:"https://krklw5qhvnewm2tgmsimbb3eva0twxkm.lambda-url.eu-north-1.on.aws",EXCHANGE_ENDPOINT:"/oauth/exchange",REFRESH_ENDPOINT:"/oauth/refresh"},Et={AUTHORIZE_URL:"https://panoptes.zooniverse.org/oauth/authorize",CLIENT_ID:"LrhZwulhoxS3nplhpKg6cJb22Gilyjz3gaRGlubAtEk",REDIRECT_URI:"https://hughdickinson.github.io",SCOPES:["public","classification"]},yt={BUFFER_SECONDS:300,MAX_RETRIES:3,RETRY_DELAY_BASE_MS:1e3},$t={TOKENS_KEY:"zoo_tokens"},Vs={CODE:"code"};function Qs(o,t){return!1}const Pe=o=>function(...n){if(!Qs())return;const s=new Date,i=`${s.toLocaleTimeString("en-US",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"})}.${String(s.getMilliseconds()).padStart(3,"0")}`;console.log(`%c${o}%c [${i}]`,"color: #0099ff; font-weight: bold;","color: #888;",...n)},v={app:Pe("app:main"),canvas:Pe("app:canvas"),sam2:Pe("app:sam2"),store:Pe("app:store"),auth:Pe("app:auth"),debug:Pe("app:debug"),masks:Pe("app:masks"),annotationRenderer:Pe("app:annotationRenderer"),history:Pe("app:history"),panoptes:Pe("app:panoptes")};let qt=null,wt=0;function fn(o){if(qt=o,o&&o.expires_in?wt=Date.now()+o.expires_in*1e3:wt=0,o){const t={...o,token_expires_at:wt};localStorage.setItem($t.TOKENS_KEY,JSON.stringify(t))}else localStorage.removeItem($t.TOKENS_KEY)}function er(){return qt}function tr(){try{const o=localStorage.getItem($t.TOKENS_KEY);if(!o)return null;const t=JSON.parse(o),n=t.token_expires_at;if(n&&Date.now()>n)return localStorage.removeItem($t.TOKENS_KEY),null;const s={access_token:t.access_token,refresh_token:t.refresh_token,expires_in:t.expires_in};return qt=s,wt=n||0,s}catch(o){return v.auth("Failed to load token from storage:",o),null}}function or(){qt=null,wt=0,localStorage.removeItem($t.TOKENS_KEY)}function nr(o,t){const n=d.useRef(null),s=d.useRef(!1),{onTokenRefreshed:r,onRefreshFailed:i}=t,c=d.useCallback(async(p=0)=>{if(s.current)return v.auth("[useTokenRefresh] Refresh already in progress, skipping"),!1;if(!(o!=null&&o.refresh_token))return v.auth("[useTokenRefresh] No refresh token available"),p===0&&(i==null||i()),!1;s.current=!0;try{const u=`${Nt.BASE_URL}${Nt.REFRESH_ENDPOINT}`,y=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({refresh_token:o.refresh_token})});if(s.current=!1,!y.ok)throw new Error(`Refresh failed with status ${y.status}`);const g=await y.json();return r(g),v.auth("[useTokenRefresh] Token refreshed successfully"),!0}catch(u){if(s.current=!1,v.auth(`[useTokenRefresh] Token refresh error (attempt ${p+1}/${yt.MAX_RETRIES}):`,u),p<yt.MAX_RETRIES-1){const y=Math.pow(2,p)*yt.RETRY_DELAY_BASE_MS;return v.auth(`[useTokenRefresh] Retrying refresh in ${y}ms...`),await new Promise(g=>setTimeout(g,y)),c(p+1)}else return v.auth(`[useTokenRefresh] Token refresh failed after ${yt.MAX_RETRIES} attempts`),i==null||i(),!1}},[o,r,i]),h=d.useCallback(p=>{n.current&&clearTimeout(n.current);const u=Math.max(0,p-yt.BUFFER_SECONDS);v.auth(`[useTokenRefresh] Scheduling refresh in ${u}s (token expires in ${p}s)`),u<=0?c():n.current=setTimeout(()=>{v.auth("[useTokenRefresh] Refresh deadline reached, refreshing token..."),c()},u*1e3)},[c]),l=d.useCallback(()=>{n.current&&(clearTimeout(n.current),n.current=null)},[]);return d.useEffect(()=>()=>{l()},[l]),{scheduleRefresh:h,refreshToken:c,cancelRefresh:l}}async function Ue(o,t,n={}){const{token:s,method:r="GET",body:i}=n,c={Accept:"application/vnd.api+json; version=1","Content-Type":r==="GET"||r==="HEAD"?"application/vnd.api+json; version=1":"application/json"};s&&(c.Authorization=`Bearer ${s}`);const h=`${o}${t}`;try{const l={method:r,headers:c};i&&(l.body=JSON.stringify(i));const p=await fetch(h,l);if(!p.ok){let u;try{const y=await p.json();u=y.detail??y.error??`HTTP ${p.status}`}catch{u=`HTTP ${p.status}`}throw new Error(`${r} ${t} failed: ${u}`)}return p.json()}catch(l){throw l instanceof Error?l:new Error(`API call failed: ${String(l)}`)}}function Xt(o){const t=new URLSearchParams;for(const[s,r]of Object.entries(o))r!==void 0&&t.set(s,r);const n=t.toString();return n?`?${n}`:""}const Ne="https://www.zooniverse.org/api",We="https://panoptes-staging.zooniverse.org/api",Eo="30908",lt="32554".trim()??"29070",_o=!1,yn="138809".trim()||void 0,Bt={staging:_o};yn&&(Bt.subjectSetId=yn);function sr(o,t="application/vnd.api+json; version=1"){const n={Accept:"application/vnd.api+json; version=1","Content-Type":t};return o&&(n.Authorization=`Bearer ${o}`),n}async function rr(o,t,n){const s=typeof n=="boolean"?{staging:n}:n??{},{staging:r=!1,subjectSetId:i}=s,c=r?We:Ne,h=Xt({workflow_id:o,subject_set_id:i});return(await Ue(c,`/subjects/queued${h}`,{token:t})).subjects??[]}const jo=100;async function po(o,t,n,s,r){var c;const i=[];for(let h=1;;h++){const l=Xt({...n,page_size:String(jo),page:String(h)}),p=await Ue(o,`${t}${l}`,{token:r});i.push(...p[s]??[]);const u=(c=p.meta)==null?void 0:c[s];if(!(u!=null&&u.next_page))return i}}async function ar(o,t,n=!1){const s=n?We:Ne,r=await po(s,"/subject_sets",{workflow_id:o},"subject_sets",t);if(r.length===0)return[];const i=await po(s,"/set_member_subjects",{subject_set_id:r.map(l=>l.id).join(",")},"set_member_subjects",t),c=[...new Set(i.map(l=>l.links.subject))],h=new Map;for(let l=0;l<c.length;l+=jo){const p=await po(s,"/subjects",{id:c.slice(l,l+jo).join(",")},"subjects",t);for(const u of p)h.set(u.id,u)}return c.map(l=>h.get(l)).filter(l=>!!l)}async function ir(o,t,n=!1){var i;return(i=(await Ue(n?We:Ne,`/subjects/${o}`,{token:t})).subjects)==null?void 0:i[0]}async function cr(o,t,n=!1){var i;return(i=(await Ue(n?We:Ne,`/workflows/${o}`,{token:t})).workflows)==null?void 0:i[0]}async function lr(o,t,n=!1){var i,c;return{id:((c=(i=(await Ue(n?We:Ne,"/classifications",{token:t,method:"POST",body:{classifications:o}})).classifications)==null?void 0:i[0])==null?void 0:c.id)??""}}async function dr(o,t,n,s=!1){const r=s?We:Ne,i=Xt({subject_id:o,workflow_id:t,sort:"-created_at",page_size:"20"}),h=((await Ue(r,`/classifications${i}`,{token:n})).classifications??[]).filter(l=>{var p,u;return(!((p=l.links)!=null&&p.workflow)||String(l.links.workflow)===String(t))&&(((u=l.links)==null?void 0:u.subjects)??[]).map(String).includes(String(o))});return h.sort((l,p)=>Date.parse(p.created_at??"")-Date.parse(l.created_at??"")),h[0]??null}async function ur(o,t,n=!1){var i;return(i=(await Ue(n?We:Ne,`/users/${o}`,{token:t})).users)==null?void 0:i[0]}async function hr(o,t,n=!1){var i;return(i=(await Ue(n?We:Ne,`/projects/${o}`,{token:t})).projects)==null?void 0:i[0]}async function pr(o,t,n=!1){return await Ue(n?We:Ne,o,{token:t})}const qe=Ro(o=>({user:null,isLoading:!1,error:null,setUser:t=>o({user:t,error:null}),setLoading:t=>o({isLoading:t}),setError:t=>o({error:t}),clearUser:()=>o({user:null,error:null})}));function gr(o){if(!o)return{header:{alg:"",typ:""},payload:{},signature:""};const[t,n,s]=o.split("."),r=i=>JSON.parse(atob(i.replace(/-/g,"+").replace(/_/g,"/")));return{header:r(t),payload:r(n),signature:s}}const Wn=d.createContext({token:null,login:()=>{},logout:()=>{}}),mr=({children:o})=>{const[t,n]=d.useState(null),s=d.useRef(!1);d.useEffect(()=>{(async()=>{var y,g,b;const u=(b=(g=(y=gr((t==null?void 0:t.access_token)||"").payload)==null?void 0:y.data)==null?void 0:g.id)==null?void 0:b.toString();if(!t||!u){qe.getState().clearUser();return}try{qe.getState().setLoading(!0);const m=await ur(u,t.access_token);v.auth("User details fetched:",m),qe.getState().setUser(m)}catch(m){v.auth("Failed to fetch user details:",m),qe.getState().setError(m instanceof Error?m.message:"Failed to fetch user details")}finally{qe.getState().setLoading(!1)}})()},[t]),d.useEffect(()=>{const l=tr();l&&(n(l),v.auth("[AuthContext] Token loaded from localStorage"))},[]);const{scheduleRefresh:r}=nr(t,{onTokenRefreshed:l=>{n(l),fn(l)},onRefreshFailed:()=>{c()}});d.useEffect(()=>{t!=null&&t.expires_in&&r(t.expires_in)},[t==null?void 0:t.access_token,r]),d.useEffect(()=>{if(s.current)return;s.current=!0;const p=new URL(window.location.href).searchParams.get(Vs.CODE);p&&(async()=>{try{const u=`${Nt.BASE_URL}${Nt.EXCHANGE_ENDPOINT}`,g=await(await fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:p})})).json();n(g),fn(g),window.history.replaceState({},"","/")}catch(u){v.auth("Token exchange error:",u)}})()},[]);const i=()=>{const l=new URL(Et.AUTHORIZE_URL);l.searchParams.set("response_type","code"),l.searchParams.set("client_id",Et.CLIENT_ID),l.searchParams.set("redirect_uri",Et.REDIRECT_URI),l.searchParams.set("scope",Et.SCOPES.join(" ")),window.location.href=l.toString()},c=()=>{n(null),or(),qe.getState().clearUser()},h=d.useMemo(()=>({token:t,login:i,logout:c}),[t]);return a.jsx(Wn.Provider,{value:h,children:o})},Zt=()=>d.useContext(Wn),fr={primary:"#00979d",primaryLight:"#addde0",secondary:"#0F191E",neutral:{light:"#DEE3E9",medium:"#A8B0B8",dark:"#667788"},success:"#1ED359",error:"#E45950",warning:"#CC9200",info:"#009B9B",text:{primary:"#0F191E",secondary:"#667788",light:"#A8B0B8",inverse:"#FFFFFF"},background:{default:"#F5F7FA",surface:"#FFFFFF",elevated:"#F5F7FA"},border:"#DEE3E9"},yr={fontFamily:'"Karla", Arial, sans-serif',fontWeight:{regular:400,medium:500,bold:700},size:{xs:"12px",sm:"14px",base:"16px"},lineHeight:{tight:1.2,normal:1.5},heading:{h1:{fontSize:"36px",letterSpacing:"0.01em"},h2:{fontSize:"28px"},h3:{fontSize:"24px"},h4:{fontSize:"20px"},h5:{fontSize:"18px"},h6:{fontSize:"16px"}}},xr={xs:"4px",sm:"8px",md:"12px",lg:"16px",xl:"24px"},br={radius:{sm:"4px",base:"6px",lg:"8px",full:"9999px"},width:{thin:"1px"}},kr={sm:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",md:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"},wr={base:"250ms ease-in-out"},e={colors:fr,typography:yr,spacing:xr,borders:br,shadows:kr,transitions:wr},Gt=x.button`
  padding: ${e.spacing.sm} ${e.spacing.lg};
  font-family: ${e.typography.fontFamily};
  font-size: ${e.typography.size.sm};
  font-weight: ${e.typography.fontWeight.medium};
  border: ${e.borders.width.thin} solid transparent;
  border-radius: ${e.borders.radius.base};
  cursor: pointer;
  transition: all ${e.transitions.base};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${e.spacing.sm};
  white-space: nowrap;

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,$r=x(Gt)`
  background-color: ${e.colors.primary};
  color: ${e.colors.text.inverse};
  border-color: ${e.colors.primary};

  &:hover:not(:disabled) {
    background-color: ${e.colors.primaryLight};
    border-color: ${e.colors.primaryLight};
  }

  &:focus {
    outline: 2px solid ${e.colors.primary};
    outline-offset: 2px;
  }
`;x(Gt)`
  background-color: transparent;
  color: ${e.colors.primary};
  border-color: ${e.colors.primary};

  &:hover:not(:disabled) {
    background-color: ${e.colors.primaryLight};
    color: ${e.colors.secondary};
  }

  &:focus {
    outline: 2px solid ${e.colors.primary};
    outline-offset: 2px;
  }
`;x(Gt)`
  background-color: ${e.colors.error};
  color: ${e.colors.text.inverse};
  border-color: ${e.colors.error};

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:focus {
    outline: 2px solid ${e.colors.error};
    outline-offset: 2px;
  }
`;x(Gt)`
  background-color: transparent;
  color: ${e.colors.primary};
  border: none;

  &:hover:not(:disabled) {
    color: ${e.colors.secondary};
  }

  &:focus {
    outline: 2px solid ${e.colors.primary};
    outline-offset: 2px;
  }
`;const St=x.button`
  padding: ${e.spacing.sm} ${e.spacing.lg};
  border: 1px solid ${o=>o.$active?e.colors.primary:e.colors.border};
  border-radius: ${e.borders.radius.base};
  background: ${o=>o.$active?e.colors.primary:e.colors.secondary};
  color: ${o=>o.$active?e.colors.secondary:e.colors.text.inverse};
  cursor: pointer;
  font-family: ${e.typography.fontFamily};
  font-size: ${e.typography.size.sm};
  font-weight: ${e.typography.fontWeight.medium};
  transition: all ${e.transitions.base};
  text-align: left;
  width: 100%;

  &:hover:not(:disabled) {
    background: ${e.colors.primary};
    color: ${e.colors.secondary};
    border-color: ${e.colors.primary};
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: ${e.colors.secondary};
    color: ${e.colors.neutral.dark};
    border-color: ${e.colors.border};
  }
`;x.input`
  padding: ${e.spacing.sm} ${e.spacing.md};
  font-family: ${e.typography.fontFamily};
  font-size: ${e.typography.size.sm};
  border: ${e.borders.width.thin} solid ${e.colors.border};
  border-radius: ${e.borders.radius.sm};
  background-color: ${e.colors.background.surface};
  color: ${e.colors.text.primary};
  transition: all ${e.transitions.base};

  &:focus {
    outline: none;
    border-color: ${e.colors.primary};
    box-shadow: 0 0 0 3px ${e.colors.primaryLight}80;
  }

  &:disabled {
    background-color: ${e.colors.neutral.light};
    color: ${e.colors.neutral.dark};
    cursor: not-allowed;
  }
`;x.select`
  padding: ${e.spacing.sm} ${e.spacing.md};
  font-family: ${e.typography.fontFamily};
  font-size: ${e.typography.size.sm};
  border: ${e.borders.width.thin} solid ${e.colors.border};
  border-radius: ${e.borders.radius.sm};
  background-color: ${e.colors.background.surface};
  color: ${e.colors.text.primary};
  cursor: pointer;
  transition: all ${e.transitions.base};

  &:focus {
    outline: none;
    border-color: ${e.colors.primary};
    box-shadow: 0 0 0 3px ${e.colors.primaryLight}80;
  }

  &:disabled {
    background-color: ${e.colors.neutral.light};
    color: ${e.colors.neutral.dark};
    cursor: not-allowed;
  }
`;x.textarea`
  padding: ${e.spacing.md};
  font-family: ${e.typography.fontFamily};
  font-size: ${e.typography.size.sm};
  border: ${e.borders.width.thin} solid ${e.colors.border};
  border-radius: ${e.borders.radius.sm};
  background-color: ${e.colors.background.surface};
  color: ${e.colors.text.primary};
  transition: all ${e.transitions.base};
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${e.colors.primary};
    box-shadow: 0 0 0 3px ${e.colors.primaryLight}80;
  }

  &:disabled {
    background-color: ${e.colors.neutral.light};
    color: ${e.colors.neutral.dark};
    cursor: not-allowed;
  }
`;const vr=x.label`
  display: block;
  font-family: ${e.typography.fontFamily};
  font-size: ${e.typography.size.sm};
  font-weight: ${e.typography.fontWeight.medium};
  color: ${e.colors.text.primary};
  margin-bottom: ${e.spacing.xs};
`;x.div`
  background-color: ${e.colors.background.surface};
  border: ${e.borders.width.thin} solid ${e.colors.border};
  border-radius: ${e.borders.radius.lg};
  padding: ${e.spacing.lg};
  box-shadow: ${e.shadows.sm};
  transition: all ${e.transitions.base};

  &:hover {
    box-shadow: ${e.shadows.md};
  }
`;x.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${e.spacing.lg};
`;x.div`
  display: flex;
  flex-direction: ${o=>o.direction||"row"};
  align-items: ${o=>o.align||"center"};
  justify-content: ${o=>o.justify||"flex-start"};
  gap: ${o=>o.gap||e.spacing.md};
`;x.div`
  display: grid;
  grid-template-columns: repeat(${o=>o.columns||1}, 1fr);
  gap: ${o=>o.gap||e.spacing.lg};
`;const dt=x.h1`
  font-family: ${e.typography.fontFamily};
  font-weight: ${e.typography.fontWeight.medium};
  color: ${e.colors.text.primary};
  margin: 0;
  line-height: ${e.typography.lineHeight.tight};
`;x(dt)`
  font-size: ${e.typography.heading.h1.fontSize};
  letter-spacing: ${e.typography.heading.h1.letterSpacing};
`;x(dt)`
  font-size: ${e.typography.heading.h2.fontSize};
`;const Yn=x(dt)`
  font-size: ${e.typography.heading.h3.fontSize};
`;x(dt)`
  font-size: ${e.typography.heading.h4.fontSize};
`;x(dt)`
  font-size: ${e.typography.heading.h5.fontSize};
`;x(dt)`
  font-size: ${e.typography.heading.h6.fontSize};
`;const Sr=x.p`
  font-family: ${e.typography.fontFamily};
  font-size: ${o=>o.size||e.typography.size.base};
  font-weight: ${o=>o.weight||e.typography.fontWeight.regular};
  color: ${o=>o.color||e.colors.text.primary};
  margin: 0;
  line-height: ${e.typography.lineHeight.normal};
`;x(Sr)`
  font-size: ${e.typography.size.sm};
  color: ${e.colors.text.secondary};
`;const Cr=x.div`
  background-color: ${o=>o.bg||e.colors.background.surface};
  border: ${e.borders.width.thin} solid ${e.colors.border};
  border-radius: ${e.borders.radius.lg};
  padding: ${e.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${e.spacing.md};
`;x(Cr)`
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  min-width: 280px;
`;x.div`
  display: flex;
  flex-direction: column;
  gap: ${e.spacing.sm};
`;x.span`
  display: inline-flex;
  padding: ${e.spacing.xs} ${e.spacing.md};
  border-radius: ${e.borders.radius.full};
  font-size: ${e.typography.size.xs};
  font-weight: ${e.typography.fontWeight.medium};
  background-color: ${o=>{switch(o.variant){case"success":return e.colors.success;case"error":return e.colors.error;case"warning":return e.colors.warning;case"info":return e.colors.info;default:return e.colors.primary}}};
  color: ${e.colors.text.inverse};
`;x.hr`
  border: none;
  border-top: ${e.borders.width.thin} solid ${e.colors.border};
  margin: ${e.spacing.md} 0;
`;x.div`
  height: ${o=>o.size||e.spacing.md};
`;const Ir=x.div`
  min-height: 100vh;
  background-color: ${e.colors.background.default};
  color: ${e.colors.text.primary};
  font-family: ${e.typography.fontFamily};
  display: flex;
  flex-direction: column;
`,jr=x.header`
  padding: ${e.spacing.lg};
  border-bottom: ${e.borders.width.thin} solid ${e.colors.border};
  background-color: ${e.colors.secondary};
  color: ${e.colors.text.inverse};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`,Ar=x.div`
  flex: 1;
`,Mr=x.h1`
  margin: 0;
  font-size: ${e.typography.heading.h2.fontSize};
  font-weight: ${e.typography.fontWeight.medium};
`,Rr=x.p`
  margin: ${e.spacing.xs} 0 ${e.spacing.md};
  color: ${e.colors.neutral.light};
  font-size: ${e.typography.size.sm};
`,Er=x.div`
  display: flex;
  gap: ${e.spacing.md};
  align-items: center;
`,_r=x.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;x.div`
  display: flex;
  align-self: center;
  justify-content: center;
  padding: 0 ${e.spacing.lg};
`;const Tr=x.div`
  display: flex;
  flex-direction: column;
  gap: ${e.spacing.sm};
  padding: ${e.spacing.md};
  margin: 0 0 ${e.spacing.sm} 0;
  background: ${e.colors.background.surface};
  border: ${e.borders.width.thin} solid ${e.colors.border};
  border-radius: ${e.borders.radius.lg};
  width: 100%;
`,Pr=x.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1;
  padding: ${e.spacing.sm} ${e.spacing.lg};
  border-radius: ${e.borders.radius.base};
  background-color: ${e.colors.primary};
  color: ${e.colors.text.inverse};
  font-weight: ${e.typography.fontWeight.medium};
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    background-color: ${e.colors.primaryLight};
  }
`,Dr=x.img`
  width: 8em;
  height: 8em;
  margin-right:20px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${e.colors.secondary};
  opacity: ${o=>o.$loaded?1:0};
  transition: opacity ${e.transitions.base};
`,xt=x.img`
  // width: 4em;
  height: 4em;
  margin-right:20px;
  vertical-align: middle;
  // border-radius: 50%;
  object-fit: cover;
  background-color: ${e.colors.secondary};
  opacity: ${o=>o.$loaded?1:0};
  transition: opacity ${e.transitions.base};
`,Ur=x.main`
  display: flex;
  gap: ${e.spacing.xl};
  padding: ${e.spacing.xl};
  align-items: flex-start;
  flex: 1;
  min-width: 1400px;
  overflow: hidden;
`,zr=x.aside`
  flex-shrink: 0;
  width: 15%;
  min-width: 280px;
`,Or=x.section`
  flex: 1;
  min-width: 700px;
  overflow: visible;
  min-height: 70vh;
  background-color: ${e.colors.background.surface};
  border-radius: ${e.borders.radius.lg};
  box-shadow: ${e.shadows.sm};
`,Lr=x.aside`
  flex-shrink: 0;
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: ${e.spacing.lg};
  max-height: calc(100vh - 120px);
  min-height: 0;
  overflow-y: auto;
`,xn=x.header`
  padding: ${e.spacing.lg};
  border-bottom: ${e.borders.width.thin} solid ${e.colors.border};
  background-color: ${e.colors.secondary};
  color: ${e.colors.text.inverse};
  display: flex;
  flex-direction: column;
  gap: ${e.spacing.md};
  justify-content: center;
  align-items: center;
  text-align: center;

  p {
    margin: 0;
  }

  // p:first-child {
  //   text-align: center;
  // }

  // p:not(:first-child) {
  //   align-self: flex-start;
  //   text-align: left;
  // }
`,ct=x.a`
  color: ${e.colors.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: ${e.colors.primaryLight};
  }
`,Br=x.div`
  display: inline-block;
`,bn=$r,Hr="Login to Zooniverse",Fr="Logout of Zooniverse";function Nr(){const{token:o,login:t,logout:n}=Zt();return a.jsxs(Br,{children:[!o&&a.jsx(bn,{onClick:t,children:Hr}),o&&a.jsx(bn,{onClick:n,children:Fr})]})}const Wr=x.div`
  display: flex;
  align-items: center;
  gap: ${e.spacing.sm};
`,Yr=x.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${e.colors.text.inverse};
`,Kr=x.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid ${e.colors.text.inverse};
  background-color: ${e.colors.neutral.dark};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
    color: ${e.colors.text.inverse};
  }
`,qr=x.span`
  font-size: ${e.typography.size.sm};
  font-weight: ${e.typography.fontWeight.medium};
  color: ${e.colors.text.inverse};
  white-space: nowrap;
`,kn=20;function Xr(){const{user:o,isLoading:t}=qe();return!o||t?null:a.jsxs(Wr,{children:[o.avatar_url?a.jsx(Yr,{src:o.avatar_url,alt:o.display_name||o.login,title:o.display_name||o.login}):a.jsx(Kr,{title:o.display_name||o.login,children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",width:kn,height:kn,children:[a.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),a.jsx("circle",{cx:"12",cy:"7",r:"4"})]})}),a.jsx(qr,{children:o.display_name||o.login})]})}const se={detected:"#17eb81",userCreated:"#008cff",saved:"#c77dff",previouslyInspected:"#859cf6",previouslyAnnotated:"#ffcd44",repeatedlyAnnotated:"#ff9844"},Ae={inProgress:[5,5],previouslyAnnotated:[]},Zr=[{color:se.saved,label:"Saved box (ready to submit)"},{color:se.previouslyInspected,label:"Previously inspected box"},{color:se.previouslyInspected,label:"Previously inspected box with unsaved edits",dash:Ae.inProgress},{color:se.userCreated,label:"Volunteer-created box"},{color:se.userCreated,label:"Volunteer-created box with unsaved edits",dash:Ae.inProgress},{color:se.previouslyAnnotated,label:"Box has one other classification",dash:Ae.previouslyAnnotated},{color:se.previouslyAnnotated,label:"Box has one other classification and unsaved edits",dash:Ae.inProgress},{color:se.repeatedlyAnnotated,label:"Box has several other classifications",dash:Ae.previouslyAnnotated},{color:se.repeatedlyAnnotated,label:"Box has several other classifications and unsaved edits",dash:Ae.inProgress}],Gr="https://caesar.zooniverse.org/graphql",go={bboxCounts:"bbox_per_rect_counter_launch".trim()||"bbox_per_rect_counter",userBboxes:"user_bbox_anno_reducer_launch".trim()||"user_bbox_anno_reducer",machineLearnt:"machineLearnt"},mo={staging:_o,defaultToolSpec:{type:"rectangle",color:se.detected,label:"Unknown artifact"}},Jr=Fn`
    query FetchSubjectReductions($workflowId: ID!, $subjectId: ID!, $reducerKey: String!) {
        workflow(id: $workflowId) {
            subject_reductions(subjectId: $subjectId, reducerKey: $reducerKey) {
                data
            }
        }
    }
`,Vr=Fn`
    query FetchUserReductions($workflowId: ID!, $userId: ID!, $reducerKey: String) {
        workflow(id: $workflowId) {
            user_reductions(userId: $userId, reducerKey: $reducerKey) {
                data
            }
        }
    }
`;function Qr(o,t){const n=Gr;return new Zs(n,{headers:sr(o,"application/json")})}async function wn(o,t,n,s){var r;if(!t)return v.app("fetchCaesarReductions: reducerKey is required"),[];try{if(!s||!n)throw new Error(`Invalid workflow or subject ID: workflowID=${s}, subjectID=${n}`);console.debug("Fetching Caesar reductions:",{workflowID:s,subjectID:n,reducerKey:t});const i=await o.request(Jr,{workflowId:s,subjectId:n,reducerKey:t});return console.debug("Caesar reductions response:",i),((r=i.workflow)==null?void 0:r.subject_reductions)??[]}catch(i){const c=i instanceof Error?i.message:String(i),h=i instanceof Error?i:{error:i};return v.app(`Failed to fetch Caesar reductions for subject ${n}:`,{message:c,details:h,stack:i instanceof Error?i.stack:void 0}),[]}}async function ea(o,t,n,s){var r;try{if(!n||!t)throw new Error(`Invalid workflow or user ID: workflowID=${n}, userID=${t}`);return((r=(await o.request(Vr,{workflowId:n,userId:t,reducerKey:s??null})).workflow)==null?void 0:r.user_reductions)??[]}catch(i){const c=i instanceof Error?i.message:String(i);return v.app(`Failed to fetch Caesar user reductions for user ${t}:`,{message:c,details:i instanceof Error?i:{error:i},stack:i instanceof Error?i.stack:void 0}),[]}}function ta(o,t){return d.useMemo(()=>Qr(o),[o])}const Fe=[30,144,255],_t={BRUSH_MODE:"add",BRUSH_RADIUS:20,ENABLE_BRUSH:!1,ADD_COLOR:`rgba(${Fe[0]},${Fe[1]},${Fe[2]},0.6)`},De={STROKE_ALPHA:.2,SELECTED_ALPHA:.45,LINE_WIDTH_MULTIPLIER:4,ERASE_COMPOSITE:"destination-out",ADD_COMPOSITE:"lighter",ERASE_STROKE_COLOR:"rgba(0,0,0,1)",LINE_CAP:"round",LINE_JOIN:"round"},Tt={RED:30,GREEN:144,BLUE:255,ALPHA:.6};function oa(o){const{data:t,width:n,height:s}=o,r=n*s,i=new Uint8Array(r);for(let c=0,h=0;c<t.length;c+=4,h++){const l=t[c+2];i[h]=l>0?1:0}return i}function na(o,t,n,s,r,i,c,h=[0,255,200]){const l=new Uint8ClampedArray(t*n*4);var p=0;for(let u=n-c;u<n-c+r;u++)for(let y=i;y<i+s;y++){const g=t*u+y,b=o[p];l[4*g]=h[0],l[4*g+1]=h[1],l[4*g+2]=h[2],l[4*g+3]=b>0?255*1:0,p++}return new ImageData(l,t,n)}function sa(o,t,n,s,r,i,c,h=[0,255,200]){const l=i,p=n-c,u=Math.max(0,l),y=Math.max(0,p),g=Math.min(t,l+s),b=Math.min(n,p+r);if(g<=u||b<=y)return{imageData:new ImageData(1,1),bounds:null,canvasWidth:t,canvasHeight:n};const m=g-u,S=b-y,f=new ImageData(m,S);let w=!1;for(let $=y;$<b;$++){const I=($-p)*s,j=($-y)*m;for(let A=u;A<g;A++){const R=o[I+A-l],O=(j+A-u)*4;f.data[O]=h[0],f.data[O+1]=h[1],f.data[O+2]=h[2],f.data[O+3]=R>0?255:0,w||(w=R>0)}}return{imageData:w?f:new ImageData(1,1),bounds:w?{x:u,y,width:m,height:S}:null,canvasWidth:t,canvasHeight:n}}function tt(o){const t=document.createElement("canvas");t.width=o.width,t.height=o.height;const n=t.getContext("2d");if(!n)throw new Error("Failed to get canvas context");return n.putImageData(o,0,0),t.toDataURL("image/png")}function $n(o){let t="";for(let n=0;n<o.length;n++)t+=String.fromCharCode(o[n]);return btoa(t)}function Pt(o){const t=atob(o),n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n}async function ra(o){const t=new CompressionStream("gzip"),n=t.writable.getWriter();n.write(new Uint8Array(o)),n.close();const s=await new Response(t.readable).arrayBuffer();return new Uint8Array(s)}async function vn(o){const t=new DecompressionStream("gzip"),n=t.writable.getWriter();n.write(new Uint8Array(o)),n.close();const s=await new Response(t.readable).arrayBuffer();return new Uint8Array(s)}class vt{constructor(t,n,s,r="array",i="composite",c){hn(this,"_preparedJson",null);this.width=t,this.height=n,this.mask=s,this.encoding=r,this.maskType=i,this.placement=c}get header(){const t=this.placement??{imageWidth:this.width,imageHeight:this.height,x0:0,y0:0};return{width:this.width,height:this.height,image_width:t.imageWidth,image_height:t.imageHeight,mask_x0:t.x0,mask_y0:t.y0}}async prepareForJson(){if(this.encoding==="array")this._preparedJson={...this.header,encoding:this.encoding,maskType:this.maskType,mask:Array.from(this.mask)};else if(this.encoding==="base64")this._preparedJson={...this.header,encoding:this.encoding,maskType:this.maskType,mask:$n(this.mask)};else if(this.encoding==="gzip-base64"){const t=await ra(this.mask);this._preparedJson={...this.header,encoding:this.encoding,maskType:this.maskType,mask:$n(t)}}}toJSON(){if(!this._preparedJson)throw new Error("CompressedMask must be prepared first: await mask.prepareForJson()");return this._preparedJson}static async decodeMaskArray(t){if(!t.mask||!t.mask_width||!t.mask_height||!t.image_width||!t.image_height)throw new Error(`Supplied JSON must contain \`mask\`, \`mask_width\`, \`mask_height\`, \`image_width\` and \`image_height\` attribute: ${JSON.stringify(t)}`);t.encoding||(t.encoding="gzip-base64");let n;if(t.encoding=="array")n=new Uint8Array(JSON.parse(t.mask));else if(t.encoding=="base64")n=Pt(t.mask);else if(t.encoding=="gzip-base64")n=await vn(Pt(t.mask));else throw new Error(`Usupported encoding ${t.encoding} supplied`);return n}static async imageDatafromJSON(t){const n=await vt.decodeMaskArray(t);return na(n,t.image_width,t.image_height,t.mask_width,t.mask_height,t.mask_x0||0,t.mask_y0||0,[...Fe])}static async maskSnapshotfromJSON(t){const n=await vt.decodeMaskArray(t);return sa(n,t.image_width,t.image_height,t.mask_width,t.mask_height,t.mask_x0||0,t.mask_y0||0,[...Fe])}static async snapshotFromExportedJSON(t){const{width:n,height:s,image_width:r,image_height:i,mask_x0:c,mask_y0:h,encoding:l,mask:p}=t,u=m=>typeof m=="number"&&Number.isInteger(m)&&m>=0;if(!u(n)||!u(s)||!u(r)||!u(i)||r===0||i===0)throw new Error("Exported mask has invalid dimensions");if(n===0||s===0)return{imageData:new ImageData(1,1),bounds:null,canvasWidth:r,canvasHeight:i};if(!u(c)||!u(h)||c+n>r||h+s>i)throw new Error("Exported mask does not fit inside its image");let y;if(l==="array"&&Array.isArray(p))y=Uint8Array.from(p);else if(l==="base64"&&typeof p=="string")y=Pt(p);else if(l==="gzip-base64"&&typeof p=="string")y=await vn(Pt(p));else throw new Error(`Unsupported exported mask encoding: ${String(l)}`);if(y.length!==n*s)throw new Error("Exported mask data does not match its dimensions");const g=new ImageData(n,s);let b=!1;for(let m=0;m<y.length;m++){const S=m*4;g.data[S]=Fe[0],g.data[S+1]=Fe[1],g.data[S+2]=Fe[2],g.data[S+3]=y[m]>0?255:0,b||(b=y[m]>0)}return b?{imageData:g,bounds:{x:c,y:h,width:n,height:s},canvasWidth:r,canvasHeight:i}:{imageData:new ImageData(1,1),bounds:null,canvasWidth:r,canvasHeight:i}}}async function Sn(o,t="gzip-base64",n="composite"){const{bounds:s,canvasWidth:r,canvasHeight:i}=o,c=s?oa(o.imageData):new Uint8Array(0),h=new vt(s?s.width:0,s?s.height:0,c,t,n,{imageWidth:r,imageHeight:i,x0:(s==null?void 0:s.x)??0,y0:(s==null?void 0:s.y)??0});return await h.prepareForJson(),h}function aa(o){const t=o.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d\.]+)?\)/);return t?[Number(t[1]),Number(t[2]),Number(t[3]),Math.floor(Number(t[4]??1)*255)]:[Tt.RED,Tt.GREEN,Tt.BLUE,Math.floor(Tt.ALPHA*255)]}function ia(o){if(o instanceof ImageData)return{data:o,width:o.width,height:o.height};const t=o.width||o.naturalWidth,n=o.height||o.naturalHeight,s=document.createElement("canvas");s.width=t,s.height=n;const r=s.getContext("2d");return r.drawImage(o,0,0),{data:r.getImageData(0,0,t,n),width:t,height:n}}function ca(o,t,n){const[s,r,i]=n,c=o.data,h=t.data;for(let l=0;l<c.length;l+=4){const p=h[l+3]||c[l+3];c[l]=s,c[l+1]=r,c[l+2]=i,c[l+3]=p}return o}function la(o,t,n){const s=o.data,r=Math.floor(n*255);for(let i=0;i<s.length;i+=4)s[i+3]>0&&(s[i]=t[0],s[i+1]=t[1],s[i+2]=t[2],s[i+3]=r)}function Cn(o,t){const n=o.data,s=Math.floor(t*255);for(let r=0;r<n.length;r+=4)n[r+3]>0&&(n[r+3]=s)}function Ao(o,t){if(!o)return t;if(!t)return o;const n=Math.min(o.x,t.x),s=Math.min(o.y,t.y),r=Math.max(o.x+o.width,t.x+t.width),i=Math.max(o.y+o.height,t.y+t.height);return{x:n,y:s,width:r-n,height:i-s}}function Kn(o,t,n){const s=Math.max(0,Math.min(o.x,t)),r=Math.max(0,Math.min(o.y,n)),i=Math.max(s,Math.min(o.x+o.width,t)),c=Math.max(r,Math.min(o.y+o.height,n));return{x:s,y:r,width:i-s,height:c-r}}function To(o){const{data:t,width:n}=o;let s=1/0,r=-1/0,i=1/0,c=-1/0;for(let h=3;h<t.length;h+=4)if(t[h]>0){const l=(h-3)/4,p=l%n,u=l/n|0;p<s&&(s=p),p>r&&(r=p),u<i&&(i=u),u>c&&(c=u)}return r<0||r===-1/0?null:{x:s,y:i,width:r-s+1,height:c-i+1}}function qn(o,t){const n=new ImageData(t.width,t.height),s=o.data,r=n.data;for(let i=0;i<t.height;i++){const c=((t.y+i)*o.width+t.x)*4,h=i*t.width*4;r.set(s.subarray(c,c+t.width*4),h)}return n}function da(o,t,n,s){const r=s?Kn(s,t,n):{x:0,y:0,width:t,height:n};if(r.width<=0||r.height<=0)return{imageData:new ImageData(1,1),bounds:null,canvasWidth:t,canvasHeight:n};const i=o.getImageData(r.x,r.y,r.width,r.height),c=To(i);if(!c)return{imageData:new ImageData(1,1),bounds:null,canvasWidth:t,canvasHeight:n};const h={x:r.x+c.x,y:r.y+c.y,width:c.width,height:c.height};return{imageData:qn(i,c),bounds:h,canvasWidth:t,canvasHeight:n}}function ua(o){const t=o.width,n=o.height,s=To(o);return s?{imageData:qn(o,s),bounds:s,canvasWidth:t,canvasHeight:n}:{imageData:new ImageData(1,1),bounds:null,canvasWidth:t,canvasHeight:n}}function Wt(o){const t=document.createElement("canvas");t.width=o.canvasWidth,t.height=o.canvasHeight;const n=t.getContext("2d");return o.bounds&&n.putImageData(o.imageData,o.bounds.x,o.bounds.y),n.getImageData(0,0,o.canvasWidth,o.canvasHeight)}function Ht(o,t){if(o.length===0||t<0)return null;const n=Math.min(t,o.length-1),s=o[n];if(s.type==="modifier_brush")return v.masks(`[getSimpleComposite] modifier_brush at index=${n}, using snapshot directly`),Wt(s);if(n===0)return v.masks("[getSimpleComposite] sam at index=0, single entry - expanding directly"),Wt(o[0]);v.masks(`[getSimpleComposite] sam at index=${n}, OR-compositing ${n+1} entries`);const{canvasWidth:r,canvasHeight:i}=o[0],c=new Uint8ClampedArray(r*i*4);for(let h=0;h<=n&&h<o.length;h++){const l=o[h].bounds;if(!l)continue;const p=o[h].imageData.data;for(let u=0;u<l.height;u++){const y=u*l.width*4,g=((l.y+u)*r+l.x)*4;for(let b=0;b<l.width*4;b++)c[g+b]|=p[y+b]}}return new ImageData(c,r,i)}function Ft(o,t){if(o.length===0||t<0)return null;const n=Math.min(t,o.length-1),s=o[n];if(s.type==="modifier_brush")return s;let r=null;for(let l=0;l<=n;l++)r=Ao(r,o[l].bounds);const{canvasWidth:i,canvasHeight:c}=o[0];if(!r)return{imageData:new ImageData(1,1),bounds:null,canvasWidth:i,canvasHeight:c};const h=new ImageData(r.width,r.height);for(let l=0;l<=n;l++){const p=o[l],u=p.bounds;if(!u)continue;const y=p.imageData.data,g=u.x-r.x,b=u.y-r.y;for(let m=0;m<u.height;m++){const S=m*u.width*4,f=((b+m)*r.width+g)*4;for(let w=0;w<u.width*4;w++)h.data[f+w]|=y[S+w]}}return{imageData:h,bounds:r,canvasWidth:i,canvasHeight:c}}function ha(o,t){if(o.length===0||t<0)return null;const n=Math.min(t,o.length-1);return Ht(o,n)}function Po(o){return(o==null?void 0:o.status)==="in_progress"}function In(o,t){return o.lastSavedHistoryIndex>=0&&t===o.lastSavedHistoryIndex?"committed":"in_progress"}function Xn(o,t){const n=o.activePointsPerHistoryIndex;let r=n[t];if(!r){for(let i=Math.min(t-1,n.length-1);i>=0;i-=1)if(n[i]){r=n[i];break}}return r?r.map(i=>o.allSamPoints[i]).filter(i=>!!i):[]}function pa(o,t){return t.findIndex(n=>n.x===o.x&&n.y===o.y&&n.label===o.label)}function jn(o){const t={};for(const r of o.annotations){if(r.type!=="point")continue;const i=String(r.annotationId??"-1");t[i]=(t[i]??0)+1}const n=new Set([...Object.keys(o.perAnnotationMasks),...Object.keys(t)]),s=[];for(const r of[...n].sort()){const i=o.perAnnotationMasks[r],c=(i==null?void 0:i.status)??"untouched",h=t[r]??0;h===0&&c==="untouched"||s.push(`${r}:${c}:${(i==null?void 0:i.historyIndex)??-1}:${h}`)}return s.join("|")}const fo=()=>({subjectId:null,imageUrl:null,imageDimensions:null,annotations:[],taskAnswers:{},debugImageUrl:null,debugMasks:null,maskSelectionInfo:null,debugCrop:null,debugPrompts:null,finishedAt:null,perAnnotationMasks:{},activeAnnotationId:null,globalCompositeMask:null,compositeExcludingActiveMask:null,userRects:{},nextUserRectId:-2,submittedWorkSignature:null,isRestoringWork:!1,startedAt:new Date().toISOString()}),P=Ro((o,t)=>({...fo(),setSubject:(n,s,r)=>o({...fo(),subjectId:n,imageUrl:s,imageDimensions:r??null,startedAt:new Date().toISOString()}),addAnnotation:n=>o(s=>({annotations:[...s.annotations,{...n,id:crypto.randomUUID()}]})),removeAnnotation:n=>o(s=>({annotations:s.annotations.filter(r=>(r.id??"")!==n)})),undoLastAnnotation:()=>{const{annotations:n}=t();if(n.length===0)return;const s=n[n.length-1];return o({annotations:n.slice(0,-1)}),s},clearAnnotations:(n,s)=>o(r=>{if(n===void 0&&s===void 0)return{annotations:[],debugImageUrl:null};const i=s?Array.isArray(s)?s:[s]:null;return{annotations:r.annotations.filter(h=>!!(i&&!i.includes(h.type)||n!==void 0&&(h.annotationId??"-1")!==n))}}),clearSamPoints:n=>o(s=>{const r=s.annotations.filter(i=>i.type==="point"&&(i.annotationId||"-1")===n).length;return v.history(`[clearSamPoints] annotationId=${n}, pointsCleared=${r}`),{annotations:s.annotations.filter(i=>!(i.type==="point"&&(i.annotationId||"-1")===n))}}),setTaskAnswer:(n,s)=>o(r=>({taskAnswers:{...r.taskAnswers,[n]:s}})),setDebugImage:n=>o({debugImageUrl:n}),setDebugMasks:(n,s,r,i)=>o({debugMasks:n,maskSelectionInfo:s,debugCrop:r||null,debugPrompts:i||null}),setActiveAnnotation:n=>o({activeAnnotationId:n}),setPerAnnotationMask:(n,s,r=null)=>o(i=>({perAnnotationMasks:{...i.perAnnotationMasks,[n]:{...i.perAnnotationMasks[n]||{history:[],historyIndex:-1,lastSavedHistoryIndex:-1},maskUrl:s,maskBounds:r}}})),setGlobalCompositeMask:n=>o({globalCompositeMask:n}),setCompositeExcludingActiveMask:n=>o({compositeExcludingActiveMask:n}),pushPerAnnotationMaskHistory:(n,s,r)=>o(i=>{var g,b,m;const c=i.perAnnotationMasks[n]||{maskUrl:null,history:[],historyIndex:-1,lastSavedHistoryIndex:-1},h=c.history.slice(0,c.historyIndex+1),l=h.length+1,p=h.length;v.store(`[pushPerAnnotationMaskHistory] annotationId=${n}, type=${s.type}, newHistoryLength=${l}, historyIndex=${p}`);const u=r??(s.type==="sam"?i.annotations.filter(S=>S.type==="point"&&String(S.annotationId??"-1")===String(n)).map(S=>({x:S.x,y:S.y,label:S.label})):void 0);let y=c.samPointHistory;if(u){let S=[...((g=c.samPointHistory)==null?void 0:g.allSamPoints)??[]];const f=u.map(j=>{const A=pa(j,S);return A!==-1?A:(S.push(j),S.length-1)}),$=[...((m=(b=c.samPointHistory)==null?void 0:b.activePointsPerHistoryIndex)==null?void 0:m.slice(0,c.historyIndex+1))??[]],I=$.length>0?$[$.length-1]:[];for(;$.length<p;)$.push([...I]);y={allSamPoints:S,activePointsPerHistoryIndex:[...$,f]},v.history(`[pushPerAnnotationMaskHistory] samPointHistory updated, historyIndex=${p}, pointCount=${u.length}, poolSize=${S.length}`)}else if(c.samPointHistory){const f=[...c.samPointHistory.activePointsPerHistoryIndex.slice(0,c.historyIndex+1)],w=f.length>0?f[f.length-1]:[];for(;f.length<p;)f.push([...w]);y={allSamPoints:c.samPointHistory.allSamPoints,activePointsPerHistoryIndex:[...f,[...w]]}}return{perAnnotationMasks:{...i.perAnnotationMasks,[n]:{...c,history:[...h,s],historyIndex:p,samPointHistory:y,status:"in_progress"}}}}),pushPerAnnotationMaskHistoryBatch:n=>o(s=>{const r={...s.perAnnotationMasks};for(const{annotationId:i,entry:c,maskUrl:h,toolIndex:l}of n){const p=r[i]||{maskUrl:null,history:[],historyIndex:-1,lastSavedHistoryIndex:-1},u=p.history.slice(0,p.historyIndex+1);r[i]={...p,history:[...u,c],historyIndex:u.length,maskUrl:h!==void 0?h:p.maskUrl,maskBounds:c.bounds,toolIndex:l??p.toolIndex}}return v.store(`[pushPerAnnotationMaskHistoryBatch] Pushed ${n.length} entries in a single update`),{perAnnotationMasks:r}}),undoPerAnnotationMask:n=>{const r=t().perAnnotationMasks[n];if(!r||r.historyIndex<0)return v.store(`[undoPerAnnotationMask] annotationId=${n}, cannotUndo=true (historyIndex=${(r==null?void 0:r.historyIndex)??"N/A"})`),null;const i=r.historyIndex-1;v.store(`[undoPerAnnotationMask] annotationId=${n}, oldIndex=${r.historyIndex}, newIndex=${i}, historyLength=${r.history.length}`);let c=null,h=null;if(i>=0){const l=Ft(r.history,i);l&&(c=tt(l.imageData),h=l.bounds)}return o(l=>({perAnnotationMasks:{...l.perAnnotationMasks,[n]:{...l.perAnnotationMasks[n],historyIndex:i,maskUrl:c,maskBounds:h,status:In(l.perAnnotationMasks[n],i)}}})),v.history(`[undoPerAnnotationMask] annotationId=${n}, historyIndex=${r.historyIndex} -> ${i}`),r.samPointHistory&&t().syncAnnotationsToHistoryIndex(n),i>=0?r.history[i]:null},redoPerAnnotationMask:n=>{const r=t().perAnnotationMasks[n];if(!r||r.historyIndex>=r.history.length-1)return v.store(`[redoPerAnnotationMask] annotationId=${n}, cannotRedo=true (historyIndex=${(r==null?void 0:r.historyIndex)??"N/A"}, historyLength=${(r==null?void 0:r.history.length)??"N/A"})`),null;const i=r.historyIndex+1;v.store(`[redoPerAnnotationMask] annotationId=${n}, oldIndex=${r.historyIndex}, newIndex=${i}, historyLength=${r.history.length}`);let c=null,h=null;if(i<r.history.length){const l=Ft(r.history,i);l&&(c=tt(l.imageData),h=l.bounds)}return o(l=>({perAnnotationMasks:{...l.perAnnotationMasks,[n]:{...l.perAnnotationMasks[n],historyIndex:i,maskUrl:c,maskBounds:h,status:In(l.perAnnotationMasks[n],i)}}})),v.history(`[redoPerAnnotationMask] annotationId=${n}, historyIndex=${r.historyIndex} -> ${i}`),r.samPointHistory&&t().syncAnnotationsToHistoryIndex(n),r.history[i]},syncAnnotationsToHistoryIndex:n=>{o(s=>{v.history("[syncAnnotationsToHistoryIndex] Called");const r=s.perAnnotationMasks[n];if(!(r!=null&&r.samPointHistory))return v.history("[syncAnnotationsToHistoryIndex] No SAM point history"),s;const i=Xn(r.samPointHistory,r.historyIndex);v.history(`[syncAnnotationsToHistoryIndex] annotationId=${n}, historyIndex=${r.historyIndex}, activePointsCount=${i.length}`);const c=s.annotations.filter(p=>!(p.type==="point"&&(p.annotationId||"-1")===n)),h=s.annotations.length-c.length,l=i.map((p,u)=>({type:"point",x:p.x,y:p.y,label:p.label,annotationId:n,id:`${n}-point-${u}`}));return v.history(`[syncAnnotationsToHistoryIndex] removed=${h} points, adding=${l.length} points`),{...s,annotations:[...c,...l]}})},saveMask:n=>o({activeAnnotationId:null}),markPerAnnotationMaskSaved:n=>o(s=>{const r=s.perAnnotationMasks[n];return r?{perAnnotationMasks:{...s.perAnnotationMasks,[n]:{...r,lastSavedHistoryIndex:r.historyIndex,status:"committed"}}}:s}),clearPerAnnotationMaskHistory:n=>o(s=>(v.store(`[clearPerAnnotationMaskHistory] Clearing all history for ${n}`),{perAnnotationMasks:{...s.perAnnotationMasks,[n]:{maskUrl:null,history:[],historyIndex:-1,lastSavedHistoryIndex:-1,status:"untouched"}}})),addUserRect:n=>{const s=t(),r=String(s.nextUserRectId);return o(i=>({userRects:{...i.userRects,[r]:{...n,markLabel:"Volunteer-defined object",markColour:se.userCreated,markStroke:"dashed"}},nextUserRectId:i.nextUserRectId-1})),v.store(`[addUserRect] Created rect ${r}: x=${n.x}, y=${n.y}, width=${n.width}, height=${n.height}`),r},updateUserRect:(n,s)=>{o(r=>{const i=r.userRects[n];return{userRects:{...r.userRects,[n]:{...i,...s}}}}),v.store(`[updateUserRect] Updated rect ${n}: x=${s.x}, y=${s.y}, width=${s.width}, height=${s.height}`)},removeUserRect:n=>{o(s=>{const{[n]:r,...i}=s.userRects,{[n]:c,...h}=s.perAnnotationMasks;return{userRects:i,perAnnotationMasks:h,annotations:s.annotations.filter(l=>String(l.annotationId??"-1")!==n),activeAnnotationId:s.activeAnnotationId===n?null:s.activeAnnotationId}}),v.store(`[removeUserRect] Removed rect ${n}`)},clearUserRects:()=>{o({userRects:{},nextUserRectId:-2}),v.store("[clearUserRects] Cleared all user rects")},buildPanoptesAnnotations:async()=>{const{annotations:n,taskAnswers:s,perAnnotationMasks:r,userRects:i}=t(),c=[],h=[],l=new Set(n.filter(y=>y.type==="point").map(y=>String(y.annotationId??"-1"))),p=new Set([...Object.keys(r).map(y=>String(y)),...l]);for(const y of p){const g=r[y],m=n.filter(j=>j.type==="point"&&String(j.annotationId??"-1")===y).map((j,A)=>({x:j.x,y:j.y,label:j.label,pointId:A})),S=g!=null&&g.samPointHistory?{allSamPoints:g.samPointHistory.allSamPoints,activePointsPerHistoryIndex:g.samPointHistory.activePointsPerHistoryIndex}:{allSamPoints:m.map(({x:j,y:A,label:R})=>({x:j,y:A,label:R})),activePointsPerHistoryIndex:m.length>0?[m.map((j,A)=>A)]:[]},f=(g==null?void 0:g.status)??"untouched";if(m.length===0&&f==="untouched")continue;let w="",$="";if(g&&g.history.length>0){const j=g.history.slice(0,g.historyIndex+1);for(let A=j.length-1;A>=0;A--){const R=j[A];if(R.type==="sam"){w=await Sn(R,"gzip-base64","sam"),$=R.modelId;break}}}let I="";if(g&&g.history.length>0){const j=g.history.slice(0,g.historyIndex+1),A=Ft(j,g.historyIndex);A&&(I=await Sn(A,"gzip-base64","composite"))}h.push({annotationId:y,samPoints:m,samPointHistory:S,latestSamMask:w,compositeMask:I,samModelId:$,status:f==="untouched"?"in_progress":f,...(g==null?void 0:g.toolIndex)!==void 0?{toolIndex:g.toolIndex}:{},...i[y]?{userRect:i[y]}:{}})}h.length>0&&c.push({task:"rect-annotations",value:h});let u=0;return n.forEach(y=>{y.type!=="point"&&c.push({task:`drawing-${u++}`,value:ga(y)})}),Object.entries(s).forEach(([y,g])=>{c.push({task:y,value:g})}),c},buildPanoptesClassification:async(n=Eo,s=lt)=>{if(!n||!s)throw new Error("Project ID and Workflow ID are required to build classification");const{subjectId:r,startedAt:i}=t();if(!r)throw new Error("No subject is set for classification");return{metadata:{user_agent:navigator.userAgent,started_at:i,finished_at:new Date().toISOString(),user_language:navigator.language,workflow_version:"1.1"},annotations:await t().buildPanoptesAnnotations(),links:{subjects:t().subjectId?[t().subjectId]:[],workflow:s,project:n}}},setRestoringWork:n=>o({isRestoringWork:n}),restoreRect:({annotationId:n,entries:s,maskUrl:r,samPoints:i,status:c,toolIndex:h,userRect:l})=>o(p=>{const u=p.perAnnotationMasks[n],y=u?u.history.slice(0,u.historyIndex+1):[],g=[...y,...s],b=g.length-1,m=g[b],S=i.length>0?{allSamPoints:i,activePointsPerHistoryIndex:g.map(($,I)=>I>=y.length||y.length===0?i.map((j,A)=>A):[])}:u==null?void 0:u.samPointHistory,f=p.annotations.filter($=>!($.type==="point"&&String($.annotationId??"-1")===n)),w=i.map($=>({type:"point",x:$.x,y:$.y,label:$.label,annotationId:n,id:crypto.randomUUID()}));return{annotations:[...f,...w],perAnnotationMasks:{...p.perAnnotationMasks,[n]:{...u??{maskUrl:null,history:[],historyIndex:-1,lastSavedHistoryIndex:-1},history:g,historyIndex:b,lastSavedHistoryIndex:b,maskUrl:r,maskBounds:(m==null?void 0:m.bounds)??null,toolIndex:h??(u==null?void 0:u.toolIndex),samPointHistory:S,status:c}},...l?{userRects:{...p.userRects,[n]:l},nextUserRectId:Math.min(p.nextUserRectId,Number(n)-1)}:{}}}),markWorkSubmitted:()=>o({submittedWorkSignature:jn(t())}),hasUnsubmittedWork:()=>{const n=t(),s=jn(n);return s!==""&&s!==n.submittedWorkSignature},reset:()=>o(fo())}));function ga(o){switch(o.type){case"point":return{type:"point",x:o.x,y:o.y,label:o.label};case"polyline":return{type:"polyline",points:o.points};case"brush":return{type:"brush",strokes:o.strokes};case"sam2_mask":return{type:"sam2_mask",prompts:o.prompts,maskUrl:o.maskUrl};default:return o}}const oe=Ro(o=>({annotations:[],workflowBoxTypes:[],previouslyInspectedBoxIds:[],selectedAnnotationId:null,isLoading:!1,error:null,setAnnotations:t=>o({annotations:t,error:null}),setWorkflowBoxTypes:t=>o({workflowBoxTypes:t}),setGoodBoxColor:t=>o({goodBoxColor:t}),setPreviouslyInspectedBoxIds:t=>o({previouslyInspectedBoxIds:[...new Set(t.filter(n=>n!=="-1"))]}),markBoxesSubmitted:t=>o(n=>({previouslyInspectedBoxIds:[...new Set([...n.previouslyInspectedBoxIds,...t.filter(s=>s!=="-1")])]})),clearAnnotations:()=>o({annotations:[],workflowBoxTypes:[],goodBoxColor:void 0,previouslyInspectedBoxIds:[],error:null}),setSelectedAnnotationId:t=>o({selectedAnnotationId:t}),setLoading:t=>o({isLoading:t}),setError:t=>o({error:t})})),ma="rect-annotations",An="Volunteer-defined object";function Jt(o){return typeof o=="object"&&o!==null}function Yt(o){return typeof o=="number"&&Number.isFinite(o)}function fa(o){return Array.isArray(o)?o.flatMap(t=>!Jt(t)||!Yt(t.x)||!Yt(t.y)?[]:t.label!==0&&t.label!==1?[]:[{x:t.x,y:t.y,label:t.label}]):[]}function ya(o){return o==="committed"?"committed":"in_progress"}async function Mn(o){if(!Jt(o))return null;try{return await vt.snapshotFromExportedJSON(o)}catch(t){return console.warn("Could not decode a previously saved mask; skipping it",t),null}}function xa(o,t){const n=o.userRect;if(Jt(n)&&[n.x,n.y,n.width,n.height].every(Yt))return{x:n.x,y:n.y,width:n.width,height:n.height,markLabel:typeof n.markLabel=="string"?n.markLabel:An,markColour:typeof n.markColour=="string"?n.markColour:se.userCreated,markStroke:typeof n.markStroke=="string"?n.markStroke:"solid"};if(t)return{...t,markLabel:An,markColour:se.userCreated,markStroke:"solid"}}async function ba(o){const t=o.find(s=>s.task===ma);if(!t||!Array.isArray(t.value))return[];const n=[];for(const s of t.value){if(!Jt(s)||typeof s.annotationId!="string"&&typeof s.annotationId!="number")continue;const r=String(s.annotationId),i=await Mn(s.latestSamMask),c=await Mn(s.compositeMask),h=fa(s.samPoints),l=c??i,p=Number(r)<-1,u=[];if(i&&u.push({type:"sam",modelId:typeof s.samModelId=="string"&&s.samModelId?s.samModelId:"sam2",...i}),c&&u.push({type:"modifier_brush",mode:"restored",...c}),u.length===0&&h.length===0&&!p)continue;const y=p?xa(s,(l==null?void 0:l.bounds)??null):void 0;p&&!y||n.push({annotationId:r,entries:u,maskUrl:l!=null&&l.bounds?tt(l.imageData):null,samPoints:h,status:ya(s.status),toolIndex:Yt(s.toolIndex)?s.toolIndex:void 0,userRect:y})}return n}function ka(o,t,n){return dr(o,t,n,_o).catch(s=>(console.warn("Could not check for previous work",s),null))}async function wa(o,t){if(t)try{const n=await ba(t.annotations??[]);if(P.getState().subjectId!==o)return;const s=new Set(oe.getState().annotations.flatMap(h=>h.toolType==="rectangle"?[String(h.markId)]:[])),{restoreRect:r,markWorkSubmitted:i}=P.getState(),c=[];for(const h of n){const l=Number(h.annotationId)<-1;!l&&h.annotationId!=="-1"&&!s.has(h.annotationId)||(r(h),!l&&h.annotationId!=="-1"&&c.push(h.annotationId))}c.length>0&&oe.getState().markBoxesSubmitted(c),i()}catch(n){console.warn("Could not restore previous work",n)}}const Rn=x.div`
  display: inline-flex;
  flex-direction: column;
  gap: ${e.spacing.sm};
`,$a=x.div`
  display: flex;
  align-items: center;
  gap: ${e.spacing.sm};
  flex-wrap: wrap;
`,yo=x.button`
  padding: ${e.spacing.sm} ${e.spacing.lg};
  background: ${e.colors.secondary};
  border: 1px solid ${e.colors.primary};
  border-radius: ${e.borders.radius.base};
  color: ${e.colors.text.inverse};
  cursor: pointer;
  font-family: ${e.typography.fontFamily};
  font-size: ${e.typography.size.sm};
  font-weight: ${e.typography.fontWeight.medium};
  transition: all ${e.transitions.base};

  &:hover {
    background: ${e.colors.primary};
    color: ${e.colors.secondary};
  }

  &:active {
    transform: scale(0.95);
  }
`;x.input`
  display: none;
`;x.input`
  padding: ${e.spacing.sm} ${e.spacing.md};
  background: ${e.colors.secondary};
  border: 1px solid ${e.colors.primary};
  border-radius: ${e.borders.radius.base};
  color: ${e.colors.text.light};
  font-family: ${e.typography.fontFamily};
  font-size: ${e.typography.size.sm};
  min-width: 12rem;

  &::placeholder {
    color: ${e.colors.text.secondary};
  }
`;const va=x.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
`,Sa=x.div`
  display: flex;
  flex-direction: column;
  gap: ${e.spacing.md};
  max-width: 420px;
  padding: ${e.spacing.lg};
  background: ${e.colors.secondary};
  border: 1px solid ${e.colors.primary};
  border-radius: ${e.borders.radius.base};
  color: ${e.colors.text.inverse};
  font-size: ${e.typography.size.sm};
`,Ca=x.div`
  display: flex;
  justify-content: flex-end;
  gap: ${e.spacing.sm};
`;function Ia(o){return new Promise((t,n)=>{const s=new FileReader;s.onload=()=>{typeof s.result=="string"?t(s.result):n(new Error("Failed to encode Caesar mask image"))},s.onerror=()=>n(s.error??new Error("Failed to read Caesar mask image")),s.readAsDataURL(o)})}async function ja(o){if(o.length===0)return[];const t=new Worker(new URL("/assets/caesarMask.worker-DlHI8dgk.js",import.meta.url),{type:"module"});try{const n=await new Promise((s,r)=>{t.onmessage=({data:i})=>{if("error"in i){r(new Error(i.error));return}s(i.results)},t.onerror=i=>r(new Error(i.message||"Caesar mask worker failed")),t.postMessage({marks:o})});return await Promise.all(n.map(async({pixels:s,pixelWidth:r,pixelHeight:i,bounds:c,canvasWidth:h,canvasHeight:l,png:p})=>({snapshot:{imageData:new ImageData(s,r,i),bounds:c,canvasWidth:h,canvasHeight:l},maskUrl:await Ia(p)})))}finally{t.terminate()}}function Aa(o){const t=new Set,n=s=>{if(Array.isArray(s)){s.forEach(n);return}if(typeof s!="object"||s===null)return;const r=s,i=r.bbox_keys,c=r.bbox_num_masks;if(Array.isArray(i)&&Array.isArray(c)){i.forEach((h,l)=>{const p=Number(c[l]);typeof h=="string"&&h!=="-1"&&Number.isFinite(p)&&p>0&&t.add(h)});return}if("data"in r){n(r.data);return}for(const[h,l]of Object.entries(r)){const p=typeof l=="number"?l:Number(l);h!=="-1"&&Number.isFinite(p)&&p>0&&t.add(h)}};return o.forEach(s=>n(s.data)),[...t]}const Ma={maxRetries:3,retryDelayMs:1e3};function Ra(o){return o.reduce((t,n)=>((Array.isArray(n.data)?n.data:[n.data]).forEach(r=>{const i=r,c=typeof i=="object"&&i!==null&&"data"in i?i.data:i,h=typeof c=="object"&&c!==null?c:{},l=Array.isArray(h.bbox_keys)?h.bbox_keys:[],p=Array.isArray(h.bbox_num_masks)?h.bbox_num_masks:[];l.forEach((u,y)=>{if(typeof u!="string")return;const g=p[y],b=typeof g=="number"?g:Number(g);t[u]=Number.isFinite(b)?b:0})}),t),{})}function Ea(o,t,n,s=Ma){const r=d.useRef(o),i=d.useRef(n),c=P(p=>p.pushPerAnnotationMaskHistoryBatch);d.useEffect(()=>{r.current=o},[o]),d.useEffect(()=>{i.current=n},[n]);const h=d.useCallback(async(p,u,y)=>{const g=[],b=p.flatMap(m=>(Array.isArray(m.data)?m.data:[m.data]).flatMap(f=>(Array.isArray(f==null?void 0:f.data)?f.data??[]:[]).map($=>{var K,ne;const I=$.taskIndex??0,j=$.toolIndex??0;if(j<1)return{toolType:"hidden"};const R=(u==null?void 0:u.tasks)&&Object.keys(u.tasks).length>0?{...mo.defaultToolSpec,...(ne=(K=u.tasks[`T${I}`])==null?void 0:K.tools)==null?void 0:ne[j]}:mo.defaultToolSpec,T=$.markId?String($.markId):crypto.randomUUID(),O=$.x_center,E=$.y_center,C=$.mask_width,_=$.mask_height,D=typeof O=="number"&&typeof E=="number"&&typeof C=="number"&&typeof _=="number",G=$.mask??"";return G.length?g.push({annotationId:T,toolIndex:j,mark:$}):v.panoptes(`[Caesar] No mask supplied for annotation ${T}`),(R==null?void 0:R.type)==="rectangle"&&D?{toolType:"rectangle",x_center:O,y_center:E,width:C,height:_,markId:T,toolIndex:j,previousAnnotationCount:y[T]??0,markColour:R.color,markLabel:R.label,mask:G}:{toolType:"custom",data:void 0}}).filter($=>$.toolType!="hidden")));if(g.length>0){const S=(await ja(g.map(({mark:f})=>f))).map(({snapshot:f,maskUrl:w},$)=>({annotationId:g[$].annotationId,entry:{type:"sam",modelId:"sam2",...f},maskUrl:w,toolIndex:g[$].toolIndex}));c(S)}return b},[c]);return d.useCallback(async p=>{if(!r.current||!i.current){const y="Cannot process Caesar reductions: missing caesarClient or accessToken";console.debug(y),oe.getState().setError(y);return}oe.getState().setLoading(!0),oe.getState().setWorkflowBoxTypes([]),oe.getState().setPreviouslyInspectedBoxIds([]);const u=async(y=0)=>{var g;try{v.panoptes(`[Caesar] Fetching volunteer bounding box annotation reductions for subject ${p} (attempt ${y+1}/${s.maxRetries})`);const b=await wn(r.current,go.bboxCounts,p,t),m=(g=qe.getState().user)==null?void 0:g.id,S=m?await ea(r.current,String(m),t,go.userBboxes):[];v.panoptes("[Caesar] Raw user bounding box reductions:",JSON.stringify(S,null,2)),v.panoptes("[Caesar] User bounding box reductions:",S);const f=Aa(S);oe.getState().setPreviouslyInspectedBoxIds(f);const w=Ra(b);v.panoptes("[Caesar] Raw bbox count reductions:",JSON.stringify(b,null,2)),v.panoptes("[Caesar] Volunteer bounding box counts:",w),v.panoptes(`[Caesar] Fetching ML reductions/predictions for subject ${p} (attempt ${y+1}/${s.maxRetries})`);const $=await wn(r.current,go.machineLearnt,p,t),I=await cr(t,i.current,mo.staging),j=Object.values((I==null?void 0:I.tasks)??{}).flatMap(T=>(T.tools??[]).flatMap((O,E)=>E>=1&&O.type==="rectangle"&&typeof O.color=="string"?[{label:O.label||"Workflow box",color:O.color}]:[]));oe.getState().setWorkflowBoxTypes(j);const A=Object.values((I==null?void 0:I.tasks)??{}).map(T=>{var O;return(O=T.tools)==null?void 0:O[2]}).find(T=>(T==null?void 0:T.type)==="rectangle"&&typeof T.color=="string");oe.getState().setGoodBoxColor(A==null?void 0:A.color);const R=await h($,I,w);oe.getState().setAnnotations(R),oe.getState().setLoading(!1),v.panoptes(`[Caesar] Successfully fetched ${R.length} annotations for subject ${p}`)}catch(b){if(y<s.maxRetries-1){const m=s.retryDelayMs*Math.pow(2,y);return v.app(`[Caesar] Fetch failed (attempt ${y+1}), retrying in ${m}ms...`,b),await new Promise(S=>setTimeout(S,m)),u(y+1)}else{const m=`Caesar annotation fetch failed after ${s.maxRetries} attempts`;v.app(`[Caesar] ${m}:`,b),oe.getState().setError(m),oe.getState().setLoading(!1)}}};return u()},[t,h,s])}async function _a(o,t=3e4){if(o instanceof File)return new Promise((n,s)=>{const r=new FileReader,i=setTimeout(()=>{r.abort(),s(new Error(`File reading timeout after ${t}ms`))},t);r.onload=()=>{clearTimeout(i),n(r.result)},r.onerror=()=>{var c;clearTimeout(i),s(new Error(`Failed to read file: ${((c=r.error)==null?void 0:c.message)??"unknown error"}`))},r.readAsDataURL(o)});try{const n=new AbortController,s=setTimeout(()=>n.abort(),t),r=await fetch(o,{signal:n.signal});if(clearTimeout(s),!r.ok)throw new Error(`Failed to fetch image from URL: HTTP ${r.status}`);const i=await r.blob();return URL.createObjectURL(i)}catch(n){throw n instanceof Error?n.name==="AbortError"?new Error(`Image fetch timeout after ${t}ms`):n:new Error(`Failed to load image from URL: ${String(n)}`)}}async function Ta(o,t=1e4){return new Promise((n,s)=>{const r=new Image,i=setTimeout(()=>{s(new Error(`Image normalization timeout after ${t}ms`))},t);r.onload=()=>{clearTimeout(i);try{const c=document.createElement("canvas");c.width=r.naturalWidth,c.height=r.naturalHeight;const h=c.getContext("2d");if(!h)throw new Error("Could not get canvas context for image normalization");h.drawImage(r,0,0),n(c.toDataURL("image/png"))}catch(c){s(c instanceof Error?c:new Error(String(c)))}},r.onerror=()=>{clearTimeout(i),s(new Error("Failed to load image for normalization"))},r.src=o})}function Pa(o,t=1e4){return new Promise((n,s)=>{const r=new Image,i=setTimeout(()=>{s(new Error(`Image dimension loading timeout after ${t}ms`))},t);r.onload=()=>{clearTimeout(i),n({width:r.naturalWidth,height:r.naturalHeight})},r.onerror=()=>{clearTimeout(i),s(new Error(`Failed to load image from URL: ${o}`))},r.src=o})}function Da(o,t,n){const[s,r]=d.useState(0),[i,c]=d.useState(!1),h=d.useRef(!1),l=P(w=>w.setSubject),p=P(w=>w.reset),u=d.useRef(null),y=d.useRef(null),g=d.useRef(0),b=d.useRef(!1),m=d.useRef(t);d.useEffect(()=>{m.current=t},[t]);const S=d.useCallback(async w=>{var $;try{const I=await _a(w.locations[0]["image/png"]),j=await Ta(I),A=await Pa(j);l(w.id,j,A),await(($=m.current)==null?void 0:$.call(m,w.id))}catch(I){v.app("Failed to load and process subject:",I)}},[l]),f=d.useCallback(async w=>{if(!o||h.current)return;const $=w==null?void 0:w.trim();h.current=!0,c(!0),n==null||n(!0);try{if(p(),$)try{const T=await ir($,o,Bt.staging);if(!T){v.app(`Subject ${$} was not found`);return}await S(T);return}catch(T){v.app(`Failed to fetch subject ${$}:`,T);return}if(!b.current)try{const T=await ar(lt,o,Bt.staging);y.current=T,g.current=0,b.current=!0}catch(T){v.app("Failed to fetch all workflow subjects, falling back to queue:",T)}const I=y.current;if(I&&I.length>0){const T=I[g.current%I.length];g.current=(g.current+1)%I.length,r(I.length-1),await S(T);return}if(!u.current||u.current.length===0)try{u.current=await rr(lt,o,Bt)}catch(T){v.app("Failed to fetch queued subjects:",T);return}const j=u.current;if(!j||j.length===0){v.app("No subjects available in queue");return}const[A,...R]=j;u.current=R,r(R.length),await S(A)}finally{h.current=!1,c(!1),n==null||n(!1)}},[o,n,S,p]);return{queueSize:s,isLoading:i,loadNextSubject:f}}function Ua({onLoadingChange:o}){const{token:t}=Zt(),[n,s]=d.useState(""),[r,i]=d.useState(null),c=t==null?void 0:t.access_token,h=!1,l=ta(c),p=Ea(l,lt,c),u=async S=>{const{setRestoringWork:f}=P.getState();f(!0);try{const w=c?ka(S,lt,c):Promise.resolve(null);await p(S),await wa(S,await w)}finally{P.getState().subjectId===S&&f(!1)}},{loadNextSubject:y,isLoading:g}=Da(c,u,o),b=S=>{P.getState().hasUnsubmittedWork()?i({subjectId:S}):y(S)},m=()=>{const S=r==null?void 0:r.subjectId;i(null),y(S)};return c?a.jsxs(Rn,{children:[a.jsxs($a,{children:[a.jsx(yo,{onClick:()=>b(),disabled:g,children:g?"Loading...":"Next subject"}),h,h]}),r&&a.jsx(va,{children:a.jsxs(Sa,{role:"alertdialog","aria-modal":"true","aria-label":"Unsubmitted work",children:[a.jsx("span",{children:"⚠️ You have work on this subject that hasn't been submitted. If you move on now it will be discarded. Submit your classification first if you want to keep it."}),a.jsxs(Ca,{children:[a.jsx(yo,{type:"button",autoFocus:!0,onClick:()=>i(null),children:"Stay on this subject"}),a.jsx(yo,{type:"button",onClick:m,children:"Discard & continue"})]})]})})]}):a.jsx(Rn,{})}function za(){const{activeAnnotationId:o,perAnnotationMasks:t,pushPerAnnotationMaskHistory:n,setPerAnnotationMask:s,undoPerAnnotationMask:r,redoPerAnnotationMask:i}=P(g=>({activeAnnotationId:g.activeAnnotationId,perAnnotationMasks:g.perAnnotationMasks,pushPerAnnotationMaskHistory:g.pushPerAnnotationMaskHistory,setPerAnnotationMask:g.setPerAnnotationMask,undoPerAnnotationMask:g.undoPerAnnotationMask,redoPerAnnotationMask:g.redoPerAnnotationMask})),c=()=>o||"-1";return{handlePushMaskHistory:(g,b)=>{const m=c(),S={type:"modifier_brush",mode:b,...g};n(m,S)},handleUndoMask:()=>{const g=c(),b=r(g);return b?{imageData:Wt(b),bounds:b.bounds}:null},handleRedoMask:()=>{const g=c(),b=i(g);return b?{imageData:Wt(b),bounds:b.bounds}:null},handleUpdateMaskDisplay:(g,b=null)=>{const m=c();s(m,g,b)},getActiveMaskState:()=>{const g=c();return t[g]||{maskUrl:null,history:[],historyIndex:0}},activeAnnotationId:o,perAnnotationMasks:t}}const Oa=d.forwardRef(({enableBrush:o=_t.ENABLE_BRUSH,brushRadius:t=_t.BRUSH_RADIUS,brushMode:n=_t.BRUSH_MODE,addColor:s=_t.ADD_COLOR,image:r,externalMask:i,externalMaskBounds:c,contentScale:h,...l},p)=>{const u=d.useRef(null),y=d.useRef(!1),g=d.useRef(o);g.current=o;const b=d.useRef(null),m=d.useRef(null),S=d.useRef(null),[f]=d.useState(()=>document.createElement("canvas")),[w]=d.useState(()=>document.createElement("canvas")),$=E=>{var _,D;(w.width!==f.width||w.height!==f.height)&&(w.width=f.width,w.height=f.height);const C=w.getContext("2d");if(C.imageSmoothingEnabled=!1,E&&E.width>0&&E.height>0)C.clearRect(E.x,E.y,E.width,E.height),C.drawImage(f,E.x,E.y,E.width,E.height,E.x,E.y,E.width,E.height);else if(!E)C.clearRect(0,0,w.width,w.height),C.drawImage(f,0,0);else return;(D=(_=u.current)==null?void 0:_.getLayer())==null||D.batchDraw()},{handlePushMaskHistory:I,handleUndoMask:j,handleRedoMask:A,handleUpdateMaskDisplay:R}=za(),T=()=>{if(n!=="add")return;const E=P.getState(),C=E.activeAnnotationId||"-1",_=E.perAnnotationMasks[C];if(_&&_.history.length>0)return;f.getContext("2d",{willReadFrequently:!0}).clearRect(0,0,f.width,f.height),S.current=null};d.useEffect(()=>{if(!i){const le=f.getContext("2d",{willReadFrequently:!0});le.imageSmoothingEnabled=!1,le.clearRect(0,0,f.width,f.height),S.current=null,$();return}const E=f.getContext("2d",{willReadFrequently:!0});E.imageSmoothingEnabled=!1;const{data:C,width:_,height:D}=ia(i),G=(r==null?void 0:r.naturalWidth)||l.width||f.width,K=(r==null?void 0:r.naturalHeight)||l.height||f.height;f.width!==G&&(f.width=G),f.height!==K&&(f.height=K),E.clearRect(0,0,G,K);const ne=aa(s),z=new ImageData(_,D);ca(z,C,ne),Cn(z,De.SELECTED_ALPHA),E.putImageData(z,(c==null?void 0:c.x)??0,(c==null?void 0:c.y)??0),S.current=c??To(C),$()},[i,c,r]),d.useEffect(()=>{if(!r)return;const E=r.width||r.naturalWidth,C=r.height||r.naturalHeight;if(!E||!C)return;f.width=E,f.height=C,f.getContext("2d",{willReadFrequently:!0}).clearRect(0,0,E,C),S.current=null,$()},[r]);const O=E=>{const C=f.getContext("2d",{willReadFrequently:!0}),_=u.current;if(!_)return;const D=_.getRelativePointerPosition();if(!D)return;n==="add"?(C.globalCompositeOperation=De.ADD_COMPOSITE,C.strokeStyle=s):(C.globalCompositeOperation=De.ERASE_COMPOSITE,C.strokeStyle=De.ERASE_STROKE_COLOR);const G=h??1;C.lineWidth=De.LINE_WIDTH_MULTIPLIER*t/G,C.lineCap=De.LINE_CAP,C.lineJoin=De.LINE_JOIN;const K=b.current??D,ne=C.lineWidth/2+1,z=Kn({x:Math.floor(Math.min(K.x,D.x)-ne),y:Math.floor(Math.min(K.y,D.y)-ne),width:Math.ceil(Math.abs(D.x-K.x)+ne*2),height:Math.ceil(Math.abs(D.y-K.y)+ne*2)},f.width,f.height);if(C.beginPath(),C.moveTo(K.x,K.y),C.lineTo(D.x,D.y),C.stroke(),b.current=D,y.current&&z.width>0&&z.height>0){m.current=Ao(m.current,z);const le=C.getImageData(z.x,z.y,z.width,z.height);if(n==="subtract"){const ae=le.data,Ce=Math.floor(De.SELECTED_ALPHA*255);for(let be=3;be<ae.length;be+=4)ae[be]>0&&ae[be]<.5*Ce&&(ae[be]=0);C.putImageData(le,z.x,z.y)}else Cn(le,De.SELECTED_ALPHA),C.putImageData(le,z.x,z.y)}$(z.width>0&&z.height>0?z:void 0)};return d.useImperativeHandle(p,()=>({pointerDown:E=>{g.current&&E.evt.buttons===1&&!y.current&&(T(),y.current=!0,m.current=null,O())},pointerMove:E=>{!g.current||!y.current||O()},pointerUp:()=>{if(y.current){const E=f.getContext("2d",{willReadFrequently:!0}),C=Ao(S.current,m.current),_=da(E,f.width,f.height,C);I(_,n),S.current=_.bounds;const D=tt(_.imageData);R(D,_.bounds)}y.current=!1,b.current=null,m.current=null},undo:()=>{const E=f.getContext("2d",{willReadFrequently:!0}),C=j();C&&(E.putImageData(C.imageData,0,0),S.current=C.bounds,$())},redo:()=>{const E=f.getContext("2d",{willReadFrequently:!0}),C=A();C&&(E.putImageData(C.imageData,0,0),S.current=C.bounds,$())}})),a.jsx(Lt,{ref:u,image:w,...l})}),La=2,Ba=5,Ha=2,Fa="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32'%3E%3Cpolygon points='0,0 7,2 2,7' fill='black'/%3E%3Ccircle cx='10' cy='10' r='8' fill='none' stroke='black' stroke-width='2'/%3E%3Cline x1='16' y1='16' x2='24' y2='24' stroke='black' stroke-width='2'/%3E%3Cline x1='10' y1='6' x2='10' y2='14' stroke='black' stroke-width='1.5' stroke-linecap='round'/%3E%3Cline x1='6' y1='10' x2='14' y2='10' stroke='black' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E",Na="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32'%3E%3Cpolygon points='0,0 7,2 2,7' fill='black'/%3E%3Ccircle cx='10' cy='10' r='8' fill='none' stroke='black' stroke-width='2'/%3E%3Cline x1='16' y1='16' x2='24' y2='24' stroke='black' stroke-width='2'/%3E%3Cline x1='6' y1='10' x2='14' y2='10' stroke='black' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E";function Mo(o){return`url("${o?Na:Fa}") 0 0, auto`}const Zn="default",Wa=1,Ya=5;function Ka(o,t,n=!1,s){if(n)return{color:se.previouslyInspected,label:"Previously inspected box"};if(t)return{color:se.saved,label:"Saved mask"};const r=o.previousAnnotationCount??0;return r>0?r>=Ya&&s?{color:s,label:"Retired box"}:r>=Wa?{color:se.repeatedlyAnnotated,label:"Previously annotated repeatedly"}:{color:se.previouslyAnnotated,label:"Previously annotated once"}:{color:typeof o.markColour=="string"?o.markColour:se.detected,label:typeof o.markLabel=="string"&&o.markLabel?o.markLabel:"Detected box"}}function qa(o,t,n,s){const r=n/2,i=s/2;return{x:o-r,y:t-i,width:n,height:s}}function En(o,t){return{x:o+32+-5,y:t+32+-5}}function Gn(o,t,n,s=!1){const r=d.useCallback(h=>{if(!n)return;const l=h.target.getStage(),p=l==null?void 0:l.container();if(l&&p){const u=l.getPointerPosition();if(u){const{x:y,y:g}=En(u.x,u.y);o({visible:!0,x:y,y:g,text:s?"Deselect this box":n})}p.style.cursor=Mo(s)}},[n,s,o]),i=d.useCallback(h=>{if(!n)return;const l=h.target.getStage(),p=l==null?void 0:l.container();if(l&&p){const u=l.getPointerPosition();if(u){const{x:y,y:g}=En(u.x,u.y),b=s?"Deselect this box":n;o(m=>({...m,x:y,y:g,text:b}))}p.style.cursor=Mo(s)}},[n,s,o]),c=d.useCallback(h=>{var p;o(u=>({...u,visible:!1}));const l=(p=h.target.getStage())==null?void 0:p.container();l&&(l.style.cursor=t??Zn)},[t,o]);return{handleMouseEnter:r,handleMouseMove:i,handleMouseLeave:c}}const Xa=d.memo(function({annotation:t,strokeWidth:n,onAnnotationClick:s,selectedId:r,hoveredRectId:i,toolCursor:c,setToolTip:h,onMouseEnterRect:l,onMouseLeaveRect:p,isUserRectHovered:u}){const y=qa(t.x_center,t.y_center,t.width,t.height),g=P(_=>{var D;return((D=_.perAnnotationMasks[t.markId])==null?void 0:D.status)==="committed"}),b=P(_=>Po(_.perAnnotationMasks[t.markId])),m=oe(_=>_.previouslyInspectedBoxIds.includes(t.markId)),S=oe(_=>_.goodBoxColor),f=d.useRef(null),w=d.useRef(null),$=t.previousAnnotationCount,I=typeof $=="number"&&$>0,j=[...g&&!m?["Ready to submit"]:[],...m?["Already seen"]:[],...I?[`${$} previous annotation${$===1?"":"s"}`]:[]],A=j.length>0?`${t.markLabel??"Box"} (${j.join(", ")})`:t.markLabel,R=r===t.markId,T=i===t.markId,O=Ka(t,g,m,S);let E;u||r===void 0&&i!==void 0&&!T?E=.5:r===void 0||R||T?E=1:E=.5,d.useEffect(()=>{if(f.current){const _=w.current,D=f.current;if(_===null)D.opacity(E);else if(E!==_){const K=E>_?.2:.1;D.to({opacity:E,duration:K})}}w.current=E},[E,u]);const C=Gn(h,c,A,R);return a.jsx(Nn,{ref:f,x:y.x,y:y.y,width:y.width,height:y.height,stroke:O.color,strokeWidth:R?n*Ha:n,strokeScaleEnabled:!1,dash:b?Ae.inProgress:I?Ae.previouslyAnnotated:void 0,dashEnabled:b||I,listening:!0,hitStrokeWidth:n*Ba,fillEnabled:!1,onMouseEnter:_=>{C.handleMouseEnter(_),l==null||l(t.markId)},onMouseMove:C.handleMouseMove,onMouseLeave:_=>{C.handleMouseLeave(_),p==null||p()},onClick:_=>{_.cancelBubble=!0,s==null||s(y,t.markId)}},t.markId)}),Za=d.memo(function({annotations:t,strokeWidth:n=La,onAnnotationClick:s,selectedId:r,showTool2Boxes:i=!1,toolCursor:c,setToolTip:h,onMouseEnterRect:l,onMouseLeaveRect:p,isUserRectHovered:u=!1}){const[y,g]=d.useState();return a.jsx(a.Fragment,{children:t.filter(b=>b.toolType==="rectangle"&&(i||b.toolIndex!==2)).map(b=>a.jsx(Xa,{annotation:b,strokeWidth:n,onAnnotationClick:s,selectedId:r,hoveredRectId:y,toolCursor:c,setToolTip:h,isUserRectHovered:u,onMouseEnterRect:m=>{g(m),l==null||l()},onMouseLeaveRect:()=>{g(void 0),p==null||p()}},b.markId))})});function Ga({rectId:o,rect:t,isSelected:n,opacity:s,baseStrokeWidth:r,onMouseEnter:i,onMouseLeave:c,onMouseMove:h,onClick:l,onTap:p,toolCursor:u,markLabel:y,hasUnsavedChanges:g,setToolTip:b}){const m=d.useRef(null),S=d.useRef(t),f=d.useRef(null),[w,$]=d.useState(t);d.useEffect(()=>{const A=S.current,R=t;A.x!==R.x||A.y!==R.y||A.width!==R.width||A.height!==R.height?(m.current&&m.current.to({x:R.x,y:R.y,width:R.width,height:R.height,duration:.2,onFinish:()=>{$(R)}}),S.current=R):$(R)},[t]),d.useEffect(()=>{if(m.current){const A=f.current,R=m.current;if(A===null)R.opacity(s);else if(s!==A){const O=s>A?.2:.1;R.to({opacity:s,duration:O})}}f.current=s},[s]);const I=n?r*2:r,j=Gn(b,u,y,n);return a.jsx(Nn,{ref:m,x:w.x,y:w.y,width:w.width,height:w.height,stroke:t.markColour,strokeWidth:I,strokeScaleEnabled:!1,dash:g?Ae.inProgress:void 0,fillEnabled:!1,listening:!0,hitStrokeWidth:r*4,onMouseEnter:A=>{i(),j.handleMouseEnter(A)},onMouseLeave:A=>{c(),j.handleMouseLeave(A)},onMouseMove:A=>{h(A),j.handleMouseMove(A)},onClick:A=>{A.cancelBubble=!0,l(A)},onTap:A=>{A.cancelBubble=!0,p(A)}},o)}const Ja=d.memo(function({onRectClick:t,selectedRectId:n,toolCursor:s=Zn,onMouseEnter:r,onMouseLeave:i,isHoveringOverCaesarRect:c=!1,setToolTip:h}){const l=P(b=>b.userRects),p=P(b=>b.perAnnotationMasks),[u,y]=d.useState();if(Object.keys(l).length===0)return null;const g=u!==void 0;return a.jsx(a.Fragment,{children:Object.entries(l).map(([b,m])=>{const S=n===b,f=u===b,w=2;let $=1;(g&&!f||c||n!==void 0&&!S)&&($=.5);const I=p[b],j=Po(I);return a.jsx(Ga,{rectId:b,rect:m,isSelected:S,isHovered:f,opacity:$,baseStrokeWidth:w,toolCursor:s,markLabel:m.markLabel,hasUnsavedChanges:j,setToolTip:h,onMouseEnter:()=>{y(b),r==null||r()},onMouseLeave:()=>{y(void 0),i==null||i()},onMouseMove:A=>{var T;const R=(T=A.target.getStage())==null?void 0:T.container();R&&(R.style.cursor=Mo(S))},onClick:()=>{t==null||t(m,b)},onTap:()=>{t==null||t(m,b)}},b)})})});async function Jn(o){return o?new Promise(t=>{const n=new Image;n.onload=()=>{try{const s=document.createElement("canvas");s.width=n.width,s.height=n.height;const r=s.getContext("2d");if(!r){v.masks("[computeMaskBounds] Failed to get canvas context"),t(null);return}r.drawImage(n,0,0);const i=r.getImageData(0,0,n.width,n.height),c=Va(i);c?v.masks(`[computeMaskBounds] Extracted bounds: x=${c.x}, y=${c.y}, width=${c.width}, height=${c.height} from ${n.width}x${n.height}`):v.masks("[computeMaskBounds] No non-transparent pixels found in mask"),t(c)}catch(s){v.masks(`[computeMaskBounds] Error extracting bounds: ${s}`),t(null)}},n.onerror=()=>{v.masks("[computeMaskBounds] Failed to load image from mask URL"),t(null)},n.src=o}):(v.masks("[computeMaskBounds] No mask URL provided"),null)}function Va(o){const{data:t,width:n,height:s}=o;let r=n,i=-1,c=s,h=-1,l=!1;for(let p=0;p<t.length;p+=4)if(t[p+3]>0){const y=p/4,g=y%n,b=Math.floor(y/n);r=Math.min(r,g),i=Math.max(i,g),c=Math.min(c,b),h=Math.max(h,b),l=!0}return l?{x:r,y:c,width:i-r+1,height:h-c+1}:null}async function Qa(o){return o?new Promise(t=>{const n=new Image;n.onload=()=>{try{const s=document.createElement("canvas");s.width=n.width,s.height=n.height;const r=s.getContext("2d");if(!r){t(!1);return}r.drawImage(n,0,0);const i=r.getImageData(0,0,n.width,n.height),{data:c}=i;for(let h=3;h<c.length;h+=4)if(c[h]>0){t(!0);return}t(!1)}catch(s){v.masks(`[hasMaskPixels] Error checking mask pixels: ${s}`),t(!1)}},n.onerror=()=>{t(!1)},n.src=o}):!1}async function Vn(o){const t=P.getState(),n=t.perAnnotationMasks[o];if(!o||o==="-1"||!n||n.history.length===0||n.historyIndex<0)return v.canvas("[commitRectMask] Nothing to commit for "+o),!1;const s=ha(n.history,n.historyIndex);if(!s)return v.canvas("[commitRectMask] Failed to create composite"),!1;const r=document.createElement("canvas");r.width=s.width,r.height=s.height,r.getContext("2d").putImageData(s,0,0);const i=await Jn(r.toDataURL());return i&&o.startsWith("-")&&t.updateUserRect(o,i),t.markPerAnnotationMaskSaved(o),t.clearAnnotations(o,"sam2_mask"),!0}function _n(){const{perAnnotationMasks:o}=P.getState();return Object.keys(o).filter(t=>{var n;return t!=="-1"&&((n=o[t])==null?void 0:n.status)==="in_progress"})}const Qn=d.memo(({annotation:o,index:t,contentScale:n,debugImageUrl:s,showPoints:r})=>{if(o.type==="point"&&!s&&r){const i=12/n,c=o.label===0?"#e94560":"lime",h=2/n;return a.jsxs(pn.Fragment,{children:[a.jsx(kt,{points:[o.x-i,o.y,o.x+i,o.y],stroke:c,strokeWidth:h,listening:!1}),a.jsx(kt,{points:[o.x,o.y-i,o.x,o.y+i],stroke:c,strokeWidth:h,listening:!1})]},o.id??t)}return o.type==="polyline"&&o.points.length>1?a.jsx(kt,{points:o.points.flatMap(i=>[i.x,i.y]),stroke:"lime",strokeWidth:3,lineCap:"round",lineJoin:"round",listening:!1},o.id??t):o.type==="brush"?a.jsx(pn.Fragment,{children:o.strokes.map((i,c)=>a.jsx(kt,{points:i.points.flatMap(h=>[h.x,h.y]),stroke:"lime",strokeWidth:i.radius*2/n,lineCap:"round",lineJoin:"round",listening:!1},c))},o.id??t):null});Qn.displayName="AnnotationRenderer";const Vt=Kt`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,ei=Kt`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`,ti=Kt`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,oi=Kt`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`,ni=x.div`
  background: ${e.colors.secondary};
  border-radius: ${e.borders.radius.lg};
  padding: ${e.spacing.lg};
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 700px;
  min-height: 70vh;
  position: relative;
  overflow: hidden;
`,si=x.div`
  width: 100%;
  height: auto;
  min-height: calc(70vh - 60px);
  max-height: calc(70vh - 60px);
  position: relative;
  overflow: hidden;
  background: ${e.colors.background.surface};
  border-radius: ${e.borders.radius.lg};
  display: block;
`,ri=x.div`
  display: flex;
  align-items: center;
  gap: calc(${e.spacing.xs});
  margin-bottom: ${e.spacing.md};
`,Xe=x.button`
  padding: 6px 12px;
  border: 1px solid ${o=>o.$active?e.colors.primary:e.colors.border};
  border-radius: ${e.borders.radius.base};
  background: ${o=>o.$active?e.colors.primary:e.colors.secondary};
  color: ${o=>o.$active?e.colors.secondary:e.colors.text.inverse};
  cursor: pointer;
  font-family: ${e.typography.fontFamily};
  font-size: ${e.typography.size.sm};
  transition: all ${e.transitions.base};

  &:hover:not(:disabled) {
    background: ${e.colors.primary};
    color: ${e.colors.secondary};
    border-color: ${e.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,ai=x(Xe)`
  padding: 8px 16px;
  background: ${e.colors.primary};
  color: ${e.colors.secondary};
  border: none;
  border-radius: ${e.borders.radius.base};
  font-family: ${e.typography.fontFamily};
  font-size: ${e.typography.size.sm};
  font-weight: ${e.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${e.transitions.base};

  &:hover {
    background: ${e.colors.border};
    opacity: 0.8;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`,ii=x(Xe)`
  padding: 8px 16px;
  background: ${e.colors.primary};
  color: ${e.colors.secondary};
  border: none;
  border-radius: ${e.borders.radius.base};
  font-family: ${e.typography.fontFamily};
  font-size: ${e.typography.size.sm};
  font-weight: ${e.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${e.transitions.base};

  &:hover {
    background: ${e.colors.border};
    opacity: 0.8;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`,ci=x(Xe)`
  padding: 8px 16px;
  background: ${e.colors.primary};
  color: ${e.colors.secondary};
  border: none;
  border-radius: ${e.borders.radius.base};
  font-family: ${e.typography.fontFamily};
  font-size: ${e.typography.size.sm};
  font-weight: ${e.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${e.transitions.base};

  &:hover {
    background: ${e.colors.border};
    opacity: 0.8;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`,li=x.span`
  font-size: ${e.typography.size.sm};
  color: ${e.colors.text.secondary};
  min-width: 58px;
  text-align: center;
`,di=x.div`
  width: 100%;
  height: calc(70vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: ${e.colors.background.surface};
  border-radius: ${e.borders.radius.lg};
  color: ${e.colors.text.secondary};
  font-size: ${e.typography.size.base};
`,ui=x.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  animation: ${oi} 220ms ease-out forwards;
`,hi=x.div`
  display: inline-flex;
  align-items: center;
  gap: ${e.spacing.sm};
  position: relative;
  z-index: 1;
  padding: 8px 12px;
  border-radius: ${e.borders.radius.base};
  background: rgba(255, 255, 255, 0.82);
`,Tn=x.span`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid ${e.colors.border};
  border-top-color: ${e.colors.primary};
  animation: ${ti} 0.9s linear infinite;
`,pi=x.div`
  background: ${e.colors.error};
  color: ${e.colors.text.inverse};
  padding: 6px 12px;
  border-radius: ${e.borders.radius.base};
  margin-bottom: ${e.spacing.md};
  font-size: ${e.typography.size.sm};
`;x.img`
  max-width: 100%;
  max-height: 600px;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: ${e.borders.radius.lg};
  border: 3px solid ${e.colors.error};
  display: block;
`;const xo=x.div`
  background: ${e.colors.error};
  color: ${e.colors.text.inverse};
  padding: 12px 16px;
  border-radius: ${e.borders.radius.base};
  font-size: ${e.typography.size.sm};
  font-weight: ${e.typography.fontWeight.medium};
  display: flex;
  align-items: center;
  gap: ${e.spacing.sm};
  flex-wrap: wrap;
  position: absolute;
  bottom: ${e.spacing.lg};
  right: ${e.spacing.lg};
  max-width: 600px;
  z-index: 20;
  animation: ${o=>o.$isLeaving?ei:Vt} 0.1s ease-in-out;
`;x.div`
  position: relative;
  width: 100%;
`;const gi=x.div`
  position: relative;
  display: flex;
  margin-left: auto;
  gap: calc(${e.spacing.sm} / 2);
  z-index: 20;
  transition: top 0.1s ease-out, right 0.1s ease-out;
`,mi=x.div`
  background: ${e.colors.secondary};
  color: ${o=>o.$isEditingMinusOne?e.colors.error:e.colors.text.inverse};
  border: 1px solid ${o=>o.$isEditingMinusOne?e.colors.error:e.colors.border};
  padding: 12px 16px;
  border-radius: ${e.borders.radius.base};
  font-size: ${e.typography.size.sm};
  font-weight: ${e.typography.fontWeight.medium};
  display: flex;
  align-items: center;
  gap: ${e.spacing.sm};
  position: absolute;
  top: ${e.spacing.lg};
  left: ${e.spacing.lg};
  max-width: 400px;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  animation: ${Vt} 0.1s ease-in-out;
`,fi=x.div`
  background: ${o=>o.$expanded?"rgba(0, 0, 0, 0.9)":"rgba(0, 0, 0, 0.66)"};
  color: ${e.colors.text.inverse};
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 10px 12px;
  border-radius: ${e.borders.radius.base};
  font-size: ${e.typography.size.sm};
  line-height: 1.4;
  position: absolute;
  bottom: ${e.spacing.lg};
  left: ${e.spacing.lg};
  max-width: 60%;
  z-index: 9;
  pointer-events: auto;
  white-space: pre-line;
  overflow-wrap: anywhere;
  max-height: 75%;
  overflow-y: auto;
  overflow-x: hidden;
  animation: ${Vt} 0.1s ease-in-out;

  p {
    margin: ${e.spacing.sm} 0;
  }

  ul {
    margin: ${e.spacing.xs} 0 ${e.spacing.sm} 1.1rem;
    padding: 0;
  }

  li {
    margin: 0 0 ${e.spacing.xs} 0;
  }
`,yi=x.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${e.spacing.sm};
`,xi=x.div`
  animation: ${Vt} 0.12s ease-in-out;
`,bi=x.button`
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.12);
  color: ${e.colors.text.inverse};
  border-radius: ${e.borders.radius.base};
  min-width: 48px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${e.typography.size.xs};
  line-height: 1;
  cursor: pointer;
  padding: 0 ${e.spacing.xs};

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`,es=x.button`
  padding: 8px 16px;
  background: ${e.colors.primary};
  color: ${e.colors.secondary};
  border: none;
  border-radius: ${e.borders.radius.base};
  font-family: ${e.typography.fontFamily};
  font-size: ${e.typography.size.sm};
  font-weight: ${e.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${e.transitions.base};

  &:hover {
    background: ${e.colors.border};
    opacity: 0.8;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`,ki=x(es)`
  background: transparent;
  color: ${e.colors.text.inverse};
  border: 1px solid ${e.colors.text.inverse};
`,at=x.button`
  padding: 6px 14px;
  background: transparent;
  color: ${e.colors.text.inverse};
  border: 1px solid ${e.colors.text.inverse};
  border-radius: ${e.borders.radius.base};
  font-family: ${e.typography.fontFamily};
  font-size: ${e.typography.size.sm};
  font-weight: ${e.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${e.transitions.base};
  flex-shrink: 0;
  white-space: nowrap;

  &:hover {
    background: ${e.colors.text.inverse};
    color: ${e.colors.error};
  }

  &:active {
    opacity: 0.8;
  }
`;x.button`
  padding: 8px 16px;
  background: ${e.colors.primary};
  color: ${e.colors.secondary};
  border: none;
  border-radius: ${e.borders.radius.base};
  font-family: ${e.typography.fontFamily};
  font-size: ${e.typography.size.sm};
  font-weight: ${e.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${e.transitions.base};

  &:hover {
    background: ${e.colors.border};
    opacity: 0.8;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;const bo={display:"inline-flex",alignItems:"center",gap:4},ko=()=>a.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round","aria-hidden":"true",children:[a.jsx("circle",{cx:"6.5",cy:"6.5",r:"4.5"}),a.jsx("line",{x1:"10",y1:"10",x2:"14.5",y2:"14.5"})]}),wi=()=>a.jsx("svg",{style:{margin:"-3px 0"},width:"18",height:"18",viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:a.jsx("path",{d:"M5.5 8V3a1 1 0 0 1 2 0v4M7.5 7V2a1 1 0 0 1 2 0v5M9.5 7V3a1 1 0 0 1 2 0v5M11.5 6.5a1 1 0 0 1 2 0V10c0 3-2 5-5 5-2 0-3.2-.9-4.2-2.3L2 10.5a1 1 0 0 1 1.6-1.2L5.5 11V8"})}),ts=d.memo(({zoom:o,isPanMode:t,isDebugMode:n,activeAnnotationId:s,disableUndo:r,disableRedo:i,hasWholeImageMask:c=!1,isUserRectSelected:h=!1,hasUnsavedUserRectMaskChanges:l=!1,onZoomIn:p,onZoomOut:u,onZoomFit:y,onZoom100:g,onTogglePan:b,onUndo:m,onRedo:S,onIdentifyNewObject:f,onSaveUserRect:w,onDiscardUserRect:$})=>n?null:a.jsxs(ri,{children:[a.jsx(Xe,{type:"button",onClick:u,title:"Zoom out one step","aria-label":"Zoom out one step",children:"-"}),a.jsxs(li,{children:[a.jsx("span",{style:{position:"relative",top:2,display:"inline-flex"},children:a.jsx(ko,{})})," ",Math.round(o*100),"%"]}),a.jsx(Xe,{type:"button",onClick:p,title:"Zoom in one step","aria-label":"Zoom in one step",children:"+"}),a.jsxs(Xe,{type:"button",onClick:y,title:"Fit the entire image in the viewer","aria-label":"Fit the entire image in the viewer",style:bo,children:[a.jsx(ko,{}),"Fit"]}),a.jsxs(Xe,{type:"button",onClick:g,title:"Show image at native pixel size (1 image pixel per screen pixel)","aria-label":"Show image at native pixel size",style:bo,children:[a.jsx(ko,{}),"100%"]}),a.jsxs(Xe,{type:"button",$active:t,onClick:b,title:t?"Exit pan mode and return to the annotation tool":"Enter pan mode, then drag the image to reposition it","aria-label":t?"Exit pan mode":"Enter pan mode",style:bo,children:[a.jsx(wi,{}),"Pan"]}),(s||!r||!i||f&&c)&&a.jsxs(gi,{children:[f&&c&&a.jsx(ci,{type:"button",onClick:f,title:"Create a new bounding box from the mask",children:"Identify new object"}),w&&h&&l&&a.jsx(es,{type:"button",onClick:w,title:"Mark this mask as finished and ready to submit (user-created boxes are also resized to the mask)",children:"Ready to submit"}),$&&(s==null?void 0:s.startsWith("-"))&&s!=="-1"&&a.jsx(ki,{type:"button",onClick:$,title:"Delete this box and its mask",children:"Discard"}),a.jsx(ai,{type:"button",onClick:m,disabled:r,title:"Undo last mask operation (Ctrl+Z / ⌘Z)",children:"Undo"}),a.jsx(ii,{type:"button",onClick:S,disabled:i,title:"Redo last undone mask operation (Ctrl+Shift+Z / ⌘Shift+Z)",children:"Redo"})]})]}));ts.displayName="CanvasToolbar";const Pn={PRIMARY:"#32ff00",MODIFIER:"#00ffff"},wo={BORDER_WIDTH:1,Z_INDEX:9999,BOX_SHADOW:"none"},$i=({tool:o,size:t,visible:n,x:s,y:r})=>{if(!n)return null;const i=o==="modifier_brush"?Pn.MODIFIER:Pn.PRIMARY,c=t*2;return a.jsx("div",{style:{position:"fixed",left:`${s-t}px`,top:`${r-t}px`,width:`${c}px`,height:`${c}px`,border:`${wo.BORDER_WIDTH}px solid ${i}`,borderRadius:"50%",pointerEvents:"none",zIndex:wo.Z_INDEX,boxShadow:wo.BOX_SHADOW,transition:"none"}})},vi=x.aside`
  position: absolute;
  right: ${e.spacing.lg};
  bottom: ${e.spacing.lg};
  z-index: 9;
  width: max-content;
  max-width: min(320px, calc(100% - ${e.spacing.lg} - ${e.spacing.lg}));
  max-height: 65%;
  overflow: auto;
  padding: 10px 12px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: ${e.borders.radius.base};
  background: ${({$expanded:o})=>o?"rgba(0, 0, 0, 0.9)":"rgba(0, 0, 0, 0.66)"};
  color: ${e.colors.text.inverse};
  font-size: ${e.typography.size.sm};
  line-height: 1.4;
`,Si=x.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${e.spacing.sm};
  font-weight: ${e.typography.fontWeight.medium};
`,Ci=x.button`
  min-width: 48px;
  height: 24px;
  padding: 0 ${e.spacing.xs};
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${e.borders.radius.base};
  background: rgba(255, 255, 255, 0.12);
  color: ${e.colors.text.inverse};
  font: inherit;
  font-size: ${e.typography.size.xs};
  line-height: 1;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`,Ii=x.ul`
  display: grid;
  gap: ${e.spacing.xs};
  margin: ${e.spacing.sm} 0 0;
  padding: 0;
  list-style: none;
`,ji=x.li`
  display: flex;
  align-items: center;
  gap: ${e.spacing.sm};
`,Ai=x.svg`
  display: inline-block;
  flex: 0 0 24px;
  width: 24px;
  height: 14px;
`;function Mi({annotations:o,userRects:t,workflowBoxTypes:n,expanded:s,onToggleExpanded:r,onMouseEnter:i,onMouseLeave:c}){const h=d.useMemo(()=>{const l=new Map,p=u=>{const y=`${u.color}\0${u.label}`;l.has(y)||l.set(y,u)};for(const{color:u,label:y}of n)p({color:u,label:y}),p({color:u,label:`${y} with unsaved edits`,dash:Ae.inProgress});for(const u of Zr)p(u);for(const u of o){if(u.toolType!=="rectangle")continue;const y=typeof u.markColour=="string"?u.markColour:se.detected;if(y===se.detected||n.some(b=>b.color===y))continue;const g=typeof u.markLabel=="string"&&u.markLabel?`${u.markLabel}`:"Workflow box colour";p({color:y,label:g}),p({color:y,label:`${g} with unsaved edits`,dash:Ae.inProgress})}for(const u of Object.values(t))!u.markColour||u.markColour===se.userCreated||(p({color:u.markColour,label:`User-created box: ${u.markLabel}`}),p({color:u.markColour,label:`User-created box: ${u.markLabel} with unsaved edits`,dash:Ae.inProgress}));return Array.from(l.values())},[o,t,n]);return a.jsxs(vi,{$expanded:s,"aria-label":"Bounding box colour key",onMouseEnter:i,onMouseLeave:c,children:[a.jsxs(Si,{children:[a.jsx("span",{children:"Box colour key"}),a.jsx(Ci,{type:"button",onClick:r,"aria-expanded":s,"aria-label":s?"Collapse box colour key":"Expand box colour key",title:s?"Collapse box colour key":"Expand box colour key",children:s?"Hide":"Show"})]}),s&&a.jsx(Ii,{children:h.map(({color:l,label:p,dash:u})=>a.jsxs(ji,{children:[a.jsx(Ai,{viewBox:"0 0 24 14","aria-hidden":"true",children:a.jsx("rect",{x:"1",y:"1",width:"22",height:"12",rx:"2",fill:"none",stroke:l,strokeWidth:"2",strokeDasharray:u==null?void 0:u.join(" ")})}),a.jsx("span",{children:p})]},`${l}\0${p}`))})]})}const Ri=x.div`
  background: ${e.colors.background};
  border: 2px solid ${e.colors.border};
  border-radius: ${e.borders.radius.lg};
  padding: ${e.spacing.md};
  margin-top: ${e.spacing.md};
`,Ei=x.h3`
  margin: 0 0 ${e.spacing.md} 0;
  font-size: ${e.typography.size.base};
  font-weight: ${e.typography.fontWeight.bold};
  color: ${e.colors.text.primary};
`,_i=x.div`
  display: flex;
  gap: ${e.spacing.md};
  margin-bottom: ${e.spacing.md};
  align-items: center;
  flex-wrap: wrap;
`,Dn=x.label`
  font-size: ${e.typography.size.sm};
  color: ${e.colors.text.secondary};
  font-weight: ${e.typography.fontWeight.medium};
`,Ti=x.select`
  padding: ${e.spacing.xs} ${e.spacing.sm};
  border: 1px solid ${e.colors.border};
  border-radius: ${e.borders.radius.base};
  background: ${e.colors.secondary};
  color: ${e.colors.text.light};
  font-size: ${e.typography.size.sm};
  cursor: pointer;

  &:hover {
    border-color: ${e.colors.primary};
  }

  &:focus {
    outline: none;
    border-color: ${e.colors.primary};
    box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.1);
  }
`,Pi=x.div`
  display: flex;
  align-items: center;
  gap: ${e.spacing.sm};
`,Di=x.input`
  width: 150px;
`,Ui=x.span`
  font-size: ${e.typography.size.xs};
  color: ${e.colors.text.secondary};
  min-width: 40px;
`,zi=x.div`
  position: relative;
  display: block;
  margin-bottom: ${e.spacing.md};
  border: 1px solid ${e.colors.border};
  border-radius: ${e.borders.radius.base};
  background: ${e.colors.secondary};
  overflow: auto;
  width: 100%;
  max-height: 700px;
`,Oi=x.canvas`
  display: block;
  width: 100%;
  height: auto;
  image-rendering: crisp-edges;
`,Li=x.svg`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
`,Bi=x.div`
  background: ${e.colors.secondary};
  border-radius: ${e.borders.radius.base};
  padding: ${e.spacing.sm};
  font-size: ${e.typography.size.xs};
  color: ${e.colors.text.secondary};
  line-height: 1.6;
`,bt=x.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${e.spacing.xs};

  &:last-child {
    margin-bottom: 0;
  }
`,Dt=x.span`
  display: inline-block;
  background: ${o=>o.$color};
  color: white;
  padding: 2px 6px;
  border-radius: ${e.borders.radius.base};
  font-size: ${e.typography.size.xs};
  font-weight: ${e.typography.fontWeight.bold};
  margin: 0 ${e.spacing.xs};
`,Hi=({debugImageUrl:o,debugMasks:t,maskSelectionInfo:n,debugCrop:s,debugPrompts:r})=>{var f;const i=d.useRef(null),c=d.useRef(null),h=d.useRef(null),[l,p]=d.useState(null),[u,y]=d.useState(.5),[g,b]=d.useState({width:0,height:0});if(d.useEffect(()=>{t&&t.length>0&&n&&p(n.selected_idx)},[t,n]),d.useEffect(()=>{if(!i.current||!o)return;const w=i.current,$=w.getContext("2d");if(!$)return;const I=new Image;I.onload=()=>{if(w.width=I.width,w.height=I.height,b({width:I.width,height:I.height}),$.drawImage(I,0,0),l!==null&&typeof l=="number"&&t){const A=t.find(R=>R.idx===l);if(A){const R=new Image;R.onload=()=>{$.globalAlpha=u,$.drawImage(R,0,0),$.globalAlpha=1},R.onerror=()=>{v.debug("[DebugMasksPanel] Failed to load mask image")},R.src=A.url}}},I.src=o},[o,l,u,t]),!o||!t||!n||!r)return null;const m=r.filter(w=>w.label===1).length,S=r.filter(w=>w.label===0).length;return a.jsxs(Ri,{children:[a.jsx(Ei,{children:"Debug: SAM Mask Analysis"}),a.jsxs(_i,{children:[a.jsxs("div",{children:[a.jsx(Dn,{htmlFor:"mask-selector",children:"Overlay mask:"})," ",a.jsxs(Ti,{id:"mask-selector",value:l!==null?l:"",onChange:w=>p(w.target.value===""?null:parseInt(w.target.value)),children:[a.jsx("option",{value:"",children:"None (image only)"}),t.map(w=>a.jsxs("option",{value:w.idx,children:["Mask ",w.idx," (IoU: ",w.iou.toFixed(3),")",w.is_selected?" [SAM Selected]":""]},w.idx))]})]}),l!==null&&a.jsxs(Pi,{children:[a.jsx(Dn,{htmlFor:"opacity-slider",children:"Opacity:"}),a.jsx(Di,{id:"opacity-slider",type:"range",min:"0",max:"1",step:"0.1",value:u,onChange:w=>y(parseFloat(w.target.value))}),a.jsxs(Ui,{children:[Math.round(u*100),"%"]})]})]}),a.jsxs(zi,{ref:h,children:[a.jsx(Oi,{ref:i}),a.jsx(Li,{ref:c,viewBox:`0 0 ${g.width} ${g.height}`,style:{width:"100%",height:"auto",display:"block"},children:r&&s&&r.map((w,$)=>{const I=w.x-s.crop_x0,j=w.y-s.crop_y0,R=w.label===1?"#22c55e":"#ef4444",T=Math.max(3,Math.min(g.width,g.height)/40),O=T+5;return I<0||j<0||I>g.width||j>g.height?null:a.jsxs("g",{children:[a.jsx("circle",{cx:I,cy:j,r:T,fill:R,fillOpacity:.75}),a.jsx("circle",{cx:I,cy:j,r:T,fill:"none",stroke:"white",strokeWidth:"0.5"}),a.jsx("circle",{cx:I,cy:j,r:T-1,fill:"none",stroke:R,strokeWidth:"1"}),a.jsx("line",{x1:I-O,y1:j,x2:I+O,y2:j,stroke:"white",strokeWidth:"0.5"}),a.jsx("line",{x1:I,y1:j-O,x2:I,y2:j+O,stroke:"white",strokeWidth:"0.5"})]},$)})})]}),a.jsxs(Bi,{children:[a.jsx(bt,{children:a.jsxs("span",{children:["Prompts:",a.jsxs(Dt,{$color:"#22c55e",children:[m," positive"]}),a.jsxs(Dt,{$color:"#ef4444",children:[S," negative"]})]})}),a.jsx(bt,{children:a.jsxs("span",{children:["Crop region: ",s==null?void 0:s.crop_w,"×",s==null?void 0:s.crop_h,"px"]})}),l!==null&&a.jsxs(bt,{children:[a.jsxs("span",{children:["Selected mask:",l===n.selected_idx&&a.jsxs(Dt,{$color:"#4285f4",children:["Alternative ",l," (SAM Selected)"]}),l!==n.selected_idx&&a.jsxs(Dt,{$color:"#42f4c2",children:["Alternative ",l]})]}),a.jsxs("span",{children:["IoU: ",(f=t.find(w=>w.idx===l))==null?void 0:f.iou.toFixed(3)]})]}),n.has_background_prompts&&a.jsx(bt,{children:a.jsx("span",{style:{color:"#ef9800",fontStyle:"italic"},children:"⚠ Background prompts detected. Check if mask respects them."})}),a.jsx(bt,{children:a.jsxs("span",{children:["All IoU scores: ",n.all_iou_scores.map(w=>w.toFixed(3)).join(", ")]})})]})]})};function Fi(o,t,n){const[s,r]=d.useState(null),[i,c]=d.useState(null),[h,l]=d.useState(null),[p,u]=d.useState({width:1200,height:800}),[y,g]=d.useState({zoom:1,pan:{x:0,y:0}}),b=d.useRef(null),m=d.useRef(null),S=d.useRef(!1),f=d.useRef(null),{zoom:w,pan:$}=y,I=d.useCallback((C,_)=>{u(D=>D.width===C&&D.height===_?D:{width:C,height:_})},[]),j=d.useCallback(C=>{if(f.current=C,!C)return;const{width:_,height:D}=C.getBoundingClientRect();_>0&&D>0&&I(_,D)},[I]);d.useLayoutEffect(()=>{if(!f.current)return;const{clientWidth:C,clientHeight:_}=f.current;C>0&&_>0&&I(C,_)},[I]),d.useEffect(()=>{if(!f.current)return;const C=new ResizeObserver(([_])=>{const{width:D,height:G}=_.contentRect;D>0&&G>0&&!S.current&&I(D,G)});return C.observe(f.current),()=>C.disconnect()},[I]),d.useEffect(()=>{s&&(p.width===0||p.height===0||g({zoom:1,pan:{x:0,y:0}}))},[s,p.width,p.height]);const A=d.useMemo(()=>!s||p.width===0||p.height===0?1:Math.min(p.width/s.naturalWidth,p.height/s.naturalHeight),[s,p.width,p.height]),R=d.useMemo(()=>A*w,[A,w]),{groupX:T,groupY:O}=d.useMemo(()=>{if(!s||p.width===0||p.height===0)return{groupX:0,groupY:0};const C=R,_=(p.width-s.naturalWidth*C)/2,D=(p.height-s.naturalHeight*C)/2;return{groupX:_+$.x,groupY:D+$.y}},[s,R,$,p.width,p.height]),E=d.useCallback((C,_)=>{const G=w,K=$,ne=performance.now();S.current=!0;function z(le){const ae=Math.min((le-ne)/250,1),Ce=ae<.5?2*ae*ae:-1+(4-2*ae)*ae;g({zoom:G+(C-G)*Ce,pan:{x:K.x+(_.x-K.x)*Ce,y:K.y+(_.y-K.y)*Ce}}),ae<1?requestAnimationFrame(z):S.current=!1}requestAnimationFrame(z)},[w,$]);return d.useEffect(()=>{if(!o){r(null);return}const C=new window.Image;C.crossOrigin="anonymous",C.onload=()=>{r(C),P.setState({imageDimensions:{width:C.naturalWidth,height:C.naturalHeight}})},C.src=o},[o]),d.useEffect(()=>{if(!t){c(null);return}const C=new window.Image;C.onload=()=>c(C),C.src=t},[t]),d.useEffect(()=>{if(!n){l(null);return}const C=new window.Image;C.onload=()=>l(C),C.src=n},[n]),{viewportState:y,setViewportState:g,stageSize:p,image:s,maskImage:i,debugImage:h,stageRef:b,contentRef:m,canvasWrapperRef:f,isInteractingRef:S,setCanvasWrapper:j,updateStageSize:I,animateTo:E,zoom:w,pan:$,baseScale:A,contentScale:R,groupX:T,groupY:O}}function Ni(o){const{tool:t,brushProps:n,image:s,isPanMode:r,suppressNextClick:i,setSuppressNextClick:c,selectedCaesarAnnotation:h,activeAnnotationId:l,setNoRectangleWarning:p,drawingPoints:u,setDrawingPoints:y,zoom:g,baseScale:b,contentScale:m,groupX:S,groupY:f,stageSize:w,stageRef:$,isInteractingRef:I,addAnnotation:j,onPointClick:A,setViewportState:R,animateTo:T}=o,O=.25,E=30,C=1.25,_=d.useCallback(q=>({x:(q.x-S)/m,y:(q.y-f)/m}),[S,f,m]),D=d.useCallback(q=>{var fe;if(r)return;if(i){c(!1);return}if(q.evt.button!==0)return;const X=q.target;if(X!=null&&X.getClassName&&["Circle","Line"].includes(X.getClassName())||!$.current||!s)return;const L=$.current.getPointerPosition();if(!L)return;const F=$.current.getIntersection(L),Z=((fe=F==null?void 0:F.getClassName)==null?void 0:fe.call(F))==="Rect";t==="point"&&!l&&!h&&!Z&&p(!0);const{x:J,y:N}=_(L);if(t==="point"){const ze=l||(h?String(h):"-1");j({type:"point",x:J,y:N,label:1,annotationId:ze});const Je={x:J,y:N,label:1};v.canvas("[handleStageClick] Adding positive point (left-click):",Je),A==null||A(J,N,1)}else(t==="freehand"||t==="brush")&&y([...u,{x:J,y:N}])},[t,s,j,A,_,r,i,h,l,p,u,y,$]),G=d.useCallback(q=>{if(q.evt.preventDefault(),r||t!=="point"||!$.current||!s)return;c(!0);const X=$.current.getPointerPosition();if(!X)return;const{x:L,y:F}=_(X),Z=l||(h?String(h):"-1");j({type:"point",x:L,y:F,label:0,annotationId:Z});const J={x:L,y:F,label:0};v.canvas("[handleContextMenu] Adding negative point (right-click):",J),A==null||A(L,F,0)},[t,s,j,A,_,r,$,c,l,h]),K=d.useCallback(q=>{if(r||t!=="freehand"&&t!=="brush"||!(q.evt.buttons===1)||!$.current||!s)return;const L=$.current.getPointerPosition();if(!L)return;const{x:F,y:Z}=_(L);y([...u,{x:F,y:Z}])},[t,s,_,r,u,y,$]),ne=d.useCallback(()=>{if(r)return;const q=l||(h?String(h):"-1");t==="freehand"&&u.length>1?(j({type:"polyline",points:[...u],annotationId:q}),y([])):t==="brush"&&u.length>1?(j({type:"brush",strokes:[{points:[...u],radius:2*n.brushSize}],annotationId:q}),y([])):(t==="freehand"||t==="brush")&&u.length<=1&&y([])},[t,u,j,r,n.brushSize,y,h,l]),z=d.useCallback(q=>{if(!s)return;const X=Math.max(O,Math.min(E,q)),L=w.width/2,F=w.height/2,Z=(L-S)/m,J=(F-f)/m,N=b*X,fe=(w.width-s.naturalWidth*N)/2,ze=(w.height-s.naturalHeight*N)/2;R({zoom:X,pan:{x:L-fe-Z*N,y:F-ze-J*N}})},[s,w,S,f,m,b,R]),le=d.useCallback(()=>z(g*C),[g,z]),ae=d.useCallback(()=>z(g/C),[g,z]),Ce=d.useCallback(()=>{R({zoom:1,pan:{x:0,y:0}})},[R]),be=d.useCallback(()=>{if(!s)return;const q=Math.min(w.width/s.naturalWidth,w.height/s.naturalHeight);z(1/q)},[s,w,z]),Ze=d.useCallback(()=>{s&&T(1,{x:0,y:0})},[s,T]),Ge=d.useCallback(q=>{var Oe;I.current=!0,q.evt.preventDefault();const X=1.08,L=(Oe=$.current)==null?void 0:Oe.getPointerPosition();if(!L||!s)return;const F=q.evt.deltaY<0?g*X:g/X,Z=Math.max(O,Math.min(E,F)),J=b*Z,N=(L.x-S)/m,fe=(L.y-f)/m,ze=(w.width-s.naturalWidth*J)/2,Je=(w.height-s.naturalHeight*J)/2;R({zoom:Z,pan:{x:L.x-ze-N*J,y:L.y-Je-fe*J}}),requestAnimationFrame(()=>{I.current=!1})},[g,b,m,S,f,s,w,R,$,I]),ke=d.useCallback(q=>{const X=q.target,L=(w.width-((s==null?void 0:s.naturalWidth)??0)*m)/2,F=(w.height-((s==null?void 0:s.naturalHeight)??0)*m)/2;R({zoom:g,pan:{x:X.x()-L,y:X.y()-F}})},[m,s,w,g,R]);return{pointerToImage:_,handleStageClick:D,handleContextMenu:G,handleStageMouseMove:K,handleStageMouseUp:ne,handleWheel:Ge,handleContentDragMove:ke,zoomIn:le,zoomOut:ae,zoomFit:Ce,zoom100:be,zoomFitAnimated:Ze}}function Wi(o){const{tool:t,toolCursor:n,isBrushCursorVisible:s,debugImageUrl:r,selectedCaesarAnnotation:i,onUndo:c,onRedo:h,stageRef:l,setIsPanMode:p,setNoRectangleWarning:u}=o,y=g=>{if(!(g instanceof HTMLElement))return!1;if(g.isContentEditable)return!0;const b=g.tagName.toLowerCase();if(b==="textarea"||b==="select")return!0;if(b==="input"){const m=g;return m.type!=="button"&&m.type!=="checkbox"&&m.type!=="radio"&&m.type!=="range"}return!1};d.useEffect(()=>{const g=l.current;g&&(g.container().style.cursor=s?"none":r?"default":n)},[n,s,r,l]),d.useEffect(()=>{p(!1)},[t,p]),d.useEffect(()=>{const g=b=>{if(y(b.target))return;const m=l.current;if(!m||!m.container().matches(":hover"))return;const f=b.key.toLowerCase();if(!(b.metaKey||b.ctrlKey))return;const $=f==="z"&&!b.shiftKey,I=f==="z"&&b.shiftKey&&b.metaKey||f==="y"&&b.ctrlKey&&!b.metaKey;if($){b.preventDefault(),c==null||c();return}I&&(b.preventDefault(),h==null||h())};return window.addEventListener("keydown",g),()=>window.removeEventListener("keydown",g)},[c,h,l]),d.useEffect(()=>{i&&u(!1)},[i,u])}function $o(o){const t=window.requestIdleCallback;typeof t=="function"?t(o):setTimeout(o,0)}const Yi=({tool:o,brushProps:t,onPointClick:n,showPoints:s=!0,showTool2Boxes:r,isSubjectLoading:i=!1})=>{var sn,rn,an,cn,ln,dn;const{token:c}=Zt(),h=P(k=>k.imageUrl),l=P(k=>k.debugImageUrl),p=P(k=>k.debugMasks),u=P(k=>k.maskSelectionInfo),y=P(k=>k.debugCrop),g=P(k=>k.debugPrompts),b=P(k=>k.annotations),m=P(k=>k.activeAnnotationId),S=P(k=>k.undoPerAnnotationMask),f=P(k=>k.setActiveAnnotation),w=P(k=>k.addAnnotation),$=P(k=>k.perAnnotationMasks),I=P(k=>k.compositeExcludingActiveMask),j=P(k=>k.userRects),A=P(k=>k.setDebugImage),R=P(k=>{if(!(!m||m==="-1"))return k.perAnnotationMasks[m]}),T=oe(k=>k.annotations),O=oe(k=>k.workflowBoxTypes),E=oe(k=>k.selectedAnnotationId),C=oe(k=>k.setSelectedAnnotationId),_=oe(k=>k.isLoading),D=P(k=>k.isRestoringWork),G=i||_||D,K=Po(R),[ne,z]=d.useState(!1),[le,ae]=d.useState(!1),[Ce,be]=d.useState(!0),[Ze,Ge]=d.useState(!1),[ke,q]=d.useState(!1),[X,L]=d.useState(null),F=d.useRef(new Set),Z=d.useRef(new Set),J=d.useCallback(k=>{Z.current.has(k)||F.current.has(k)||(F.current.add(k),L(k))},[]),[N,fe]=d.useState(!1),[ze,Je]=d.useState(!1),[Oe,Qt]=d.useState([]),[Ve,Ct]=d.useState({visible:!1,text:"",x:0,y:0}),[ut,eo]=d.useState({x:0,y:0}),[to,ht]=d.useState(!1),[oo,no]=d.useState(!1),[ot,Q]=d.useState(!1),[we,ge]=d.useState(null),[ee,he]=d.useState(),[W,ye]=d.useState(!1),[de,B]=d.useState(!1),[pe,ie]=d.useState(!0),[$e,Ie]=d.useState(!1),[Me,ve]=d.useState(!1),[pt,xe]=d.useState(!1),Le=$e||Me||pt,[Uo,ss]=d.useState(null),[rs,zo]=d.useState(1),[as,so]=d.useState(null),[is,Oo]=d.useState(0),ro=d.useRef(null),Lo=d.useRef(null),cs=o==="point"||o==="modifier_brush",Bo=d.useRef(!1),Ye=d.useRef(null),Ho=d.useRef(null),It=d.useRef(null),jt=d.useMemo(()=>r?new Set:new Set(Object.entries($).filter(([,k])=>k.toolIndex===2).map(([k])=>k)),[$,r]);d.useLayoutEffect(()=>{var U;const k=Ho.current;if(!k)return;(U=It.current)==null||U.destroy();const M=new gn.Tween({node:k,opacity:G?0:1,duration:.12,easing:gn.Easings.EaseOut});return It.current=M,M.play(),()=>{M.destroy(),It.current===M&&(It.current=null)}},[G]);const Fo=d.useRef(t.nonSelectedMaskOpacity);Fo.current=t.nonSelectedMaskOpacity;const ao=as===(m||"-1");d.useEffect(()=>{const k=Lo.current;!k||!ao||(k.opacity(0),k.to({opacity:Fo.current,duration:.25}))},[ao,we]);const gt=m||"-1";d.useEffect(()=>{ne&&!ke&&(be(!0),ae(!1))},[ne,ke]),d.useEffect(()=>{const k=ro.current;if(!I){ge(null),so(k);return}let M=!1;const U=document.createElement("img");return U.onload=()=>{M||(ge(U),so(k))},U.onerror=()=>{M||(v.canvas("[useEffect] Failed to load composite excluding active mask image"),ge(null),so(k))},U.src=I,()=>{M=!0}},[I,is]),d.useEffect(()=>{h&&(Bo.current=!0,ss(h))},[h]);const At=m||"-1",No=!jt.has(At),ls=No&&$[At]?$[At].maskUrl:null,ds=((sn=$[At])==null?void 0:sn.maskBounds)??null,Se=Fi(h,ls,l),{setViewportState:us,stageRef:mt,contentRef:hs,isInteractingRef:Wo,setCanvasWrapper:ps,animateTo:io,zoom:Yo,baseScale:co,contentScale:nt,groupX:Ko,groupY:qo,image:H,maskImage:gs,debugImage:Mt}=Se;d.useEffect(()=>{if(!H)return;Ye.current!==null&&cancelAnimationFrame(Ye.current);const k=220,M=performance.now();zo(0);const U=V=>{const re=V-M,te=Math.min(re/k,1);zo(te),te<1?Ye.current=requestAnimationFrame(U):Ye.current=null};return Ye.current=requestAnimationFrame(U),()=>{Ye.current!==null&&(cancelAnimationFrame(Ye.current),Ye.current=null)}},[H]);const ms=Ni({tool:o,brushProps:t,image:H,isPanMode:N,suppressNextClick:ze,setSuppressNextClick:Je,selectedCaesarAnnotation:E,activeAnnotationId:m,setNoRectangleWarning:z,drawingPoints:Oe,setDrawingPoints:Qt,zoom:Yo,baseScale:co,contentScale:nt,groupX:Ko,groupY:qo,stageSize:{width:Se.stageSize.width,height:Se.stageSize.height},stageRef:mt,isInteractingRef:Wo,addAnnotation:w,onPointClick:n,setViewportState:us,animateTo:io}),{handleStageClick:fs,handleContextMenu:ys,handleStageMouseMove:xs,handleStageMouseUp:Xo,handleWheel:bs,handleContentDragMove:ks,zoomIn:ws,zoomOut:$s,zoomFit:vs,zoom100:Ss,zoomFitAnimated:st}=ms,lo=Le?"default":(ot||W)&&!N?"auto":N?"grab":"crosshair",Zo=!N&&!l&&to&&!ot&&!W&&!Le,Cs=d.useRef(new Map),Go=d.useRef(null),uo=d.useRef(0),Jo=d.useCallback(()=>{const k=P.getState(),M=k.activeAnnotationId||"-1";let U=`active:${M}`;for(const[_e,et]of Object.entries(k.perAnnotationMasks))_e===M||jt.has(_e)||(U+=`|${_e}:${et.historyIndex}:${et.history.length}`);if(U===Go.current){v.canvas("[displayCompositeExcludingActive] No other annotation changed - skipping recompute");return}Go.current=U,v.canvas("[displayCompositeExcludingActive] Computing composite excluding "+M);const V=++uo.current,re=Cs.current,te=Object.entries(k.perAnnotationMasks).filter(([_e])=>_e!==M&&!jt.has(_e));let ce=null,Y=null,ue=null,Re=null,me=0,Ee=0;const Qe=15,ft=()=>{if(V!==uo.current)return;if(Wo.current){$o(ft);return}const _e=Math.min(Ee+Qe,te.length);for(;Ee<_e;Ee++){const[Be,Te]=te[Ee];if(Te.history.length===0||Te.historyIndex<0){re.delete(Be);continue}const Rt=re.get(Be);let je;if(Rt&&Rt.historyLength===Te.history.length&&Rt.historyIndex===Te.historyIndex?je=Rt.snapshot:(je=Ft(Te.history,Te.historyIndex),je?re.set(Be,{historyLength:Te.history.length,historyIndex:Te.historyIndex,snapshot:je}):re.delete(Be)),!(je!=null&&je.bounds))continue;ce||(ce=document.createElement("canvas"),ce.width=je.canvasWidth,ce.height=je.canvasHeight,Y=ce.getContext("2d",{willReadFrequently:!0}),Y.globalCompositeOperation="lighter",ue=document.createElement("canvas"),ue.width=je.imageData.width,ue.height=je.imageData.height,Re=ue.getContext("2d"));const{imageData:He,bounds:un}=je;ue.width<He.width&&(ue.width=He.width),ue.height<He.height&&(ue.height=He.height),Re.putImageData(He,0,0),Y.drawImage(ue,0,0,He.width,He.height,un.x,un.y,He.width,He.height),me++,v.canvas(`  - Including composite from ${Be}, historyIndex=${Te.historyIndex} (${Te.history.length} total entries)`)}if(Ee<te.length){$o(ft);return}if(V!==uo.current)return;if(v.canvas(`[displayCompositeExcludingActive] Found ${me} visible masks (excluding active)`),!ce||!Y||me===0){v.canvas("[displayCompositeExcludingActive] No masks - clearing display"),ro.current=M,P.setState({compositeExcludingActiveMask:null}),Oo(Be=>Be+1);return}const et=Y.getImageData(0,0,ce.width,ce.height);la(et,Fe,De.STROKE_ALPHA),Y.putImageData(et,0,0);const Ys=ce.toDataURL();v.canvas(`[displayCompositeExcludingActive] Setting composite with ${me} masks`),ro.current=M,P.setState({compositeExcludingActiveMask:Ys}),Oo(Be=>Be+1)};$o(ft)},[jt]),Vo=d.useCallback(()=>{const k=m||"-1";v.canvas(`[handleUndoMask] Undoing for annotationId=${k}`),S(k)},[m,S]),Qo=d.useCallback(()=>{const k=m||"-1";v.canvas(`[handleRedoMask] Redoing for annotationId=${k}`);const{redoPerAnnotationMask:M}=P.getState();M(k)},[m]),Is=d.useCallback(async()=>{const k=P.getState(),M=m;if(!M||M==="-1"){v.canvas("[handleSaveUserRect] Invalid rect ID: "+M);return}const U=k.perAnnotationMasks[M];if(!U||U.history.length===0||U.historyIndex<0){v.canvas("[handleSaveUserRect] No mask history available for "+M);return}try{he(M),await Vn(M)&&J("save")}catch(V){v.canvas(`[handleSaveUserRect] Error: ${V}`)}},[m,J]),js=d.useCallback(()=>Ge(!0),[]),As=d.useCallback(()=>{Ge(!1);const k=m;!k||!k.startsWith("-")||k==="-1"||(P.getState().removeUserRect(k),he(void 0),st(),v.canvas(`[handleDiscardUserRect] Discarded rect ${k}`))},[m,st]);d.useEffect(()=>{v.canvas("[useEffect] activeAnnotationId or masks changed - recomputing excluding-active composite"),Jo()},[m,$,Jo]),d.useEffect(()=>{(async()=>{var V;const M=(V=$[-1])==null?void 0:V.maskUrl,U=await Qa(M??null);no(U)})()},[(rn=$[-1])==null?void 0:rn.maskUrl]),Wi({tool:o,toolCursor:lo,isBrushCursorVisible:Zo,debugImageUrl:l,selectedCaesarAnnotation:E,onUndo:Vo,onRedo:Qo,stageRef:mt,setIsPanMode:fe,setNoRectangleWarning:z});const rt=d.useCallback(({x:k,y:M,width:U,height:V})=>{if(!H)return;const re=40,te=(Se.stageSize.width-2*re)/U,ce=(Se.stageSize.height-2*re)/V,Y=Math.min(te,ce),ue=Y/co,Re=k+U/2,me=M+V/2,Ee=Se.stageSize.width/2-Re*Y,Qe=Se.stageSize.height/2-me*Y,ft=(Se.stageSize.width-H.naturalWidth*Y)/2,_e=(Se.stageSize.height-H.naturalHeight*Y)/2,et={x:Ee-ft,y:Qe-_e};io(ue,et)},[H,co,io,Se.stageSize.width,Se.stageSize.height]),Ms=d.useCallback(k=>{var te,ce,Y,ue,Re;if(N)return;const M=mt.current;if(!M){(ce=(te=t.predModBrushRef)==null?void 0:te.current)==null||ce.pointerDown(k);return}const U=M.getPointerPosition(),V=U?M.getIntersection(U):null,re=((Y=V==null?void 0:V.getClassName)==null?void 0:Y.call(V))==="Rect";!m&&!E&&!re&&z(!0),!re&&((Re=(ue=t.predModBrushRef)==null?void 0:ue.current)==null||Re.pointerDown(k))},[N,m,E,t.predModBrushRef,mt]),Rs=d.useCallback(k=>{var M,U;(U=(M=t.predModBrushRef)==null?void 0:M.current)==null||U.pointerMove(k)},[t.predModBrushRef]),Es=d.useCallback(()=>{var k,M;(M=(k=t.predModBrushRef)==null?void 0:k.current)==null||M.pointerUp()},[t.predModBrushRef]),_s=d.useCallback((k,M)=>{if(z(!1),E===M){st(),C(null),f(null);return}C(M),f(M),rt(k)},[E,st,C,f,rt,z]),Ts=d.useCallback((k,M)=>{if(z(!1),ee===M){st(),he(void 0),f(null);return}he(M),f(M),rt(k)},[ee,st,f,rt,z]),Ps=d.useCallback(()=>Q(!0),[]),Ds=d.useCallback(()=>Q(!1),[]),Us=d.useCallback(()=>ye(!0),[]),zs=d.useCallback(()=>ye(!1),[]),Os=d.useCallback(async()=>{const k=P.getState(),M=k.perAnnotationMasks[-1];if(!M||M.historyIndex<0){v.canvas("[handleIdentifyNewObject] No mask available for -1");return}try{const U=M.history[M.historyIndex],V=M.maskUrl;if(!V||!U){v.canvas("[handleIdentifyNewObject] No valid mask for -1");return}v.canvas("[handleIdentifyNewObject] Computing bounds from -1 mask");const re=await Jn(V);if(!re){v.canvas("[handleIdentifyNewObject] Could not extract bounds from mask");return}const te=M.maskBounds??U.bounds,ce={...re,x:re.x+((te==null?void 0:te.x)??0),y:re.y+((te==null?void 0:te.y)??0)},Y=k.addUserRect(ce);v.canvas(`[handleIdentifyNewObject] Created user rect ${Y}: ${JSON.stringify(ce)}`);const ue=M.history.slice(0,M.historyIndex+1);k.setPerAnnotationMask(Y,V,te);for(let me=0;me<ue.length;me+=1){const Ee=ue[me],Qe=M.samPointHistory?Xn(M.samPointHistory,me):void 0;k.pushPerAnnotationMaskHistory(Y,Ee,Qe)}k.markPerAnnotationMaskSaved(Y),v.canvas(`[handleIdentifyNewObject] Initialized mask history for ${Y} with ${ue.length} entries`),k.clearAnnotations("-1","sam2_mask"),k.clearPerAnnotationMaskHistory("-1"),v.canvas("[handleIdentifyNewObject] Cleared -1 mask history and mask URL");const Re=k.annotations.filter(me=>me.type==="point"&&(me.annotationId??"-1")==="-1");if(Re.length>0){k.clearAnnotations("-1","point");for(const me of Re){const{id:Ee,...Qe}=me;k.addAnnotation({...Qe,annotationId:Y})}v.canvas(`[handleIdentifyNewObject] Transferred ${Re.length} SAM points from -1 to ${Y}`)}f(Y),v.canvas(`[handleIdentifyNewObject] Set new user rect ${Y} as active annotation`),he(Y),v.canvas(`[handleIdentifyNewObject] Selected user rect ${Y} for visual highlight`),rt(ce),v.canvas(`[handleIdentifyNewObject] Zoomed to new rect at bounds: ${JSON.stringify(ce)}`),J("identify")}catch(U){v.canvas(`[handleIdentifyNewObject] Error: ${U}`)}},[f,he,rt,J]),Ls=d.useCallback(()=>{ht(!0)},[]),Bs=d.useCallback(()=>{var k,M;ht(!1),o==="modifier_brush"&&((M=(k=t.predModBrushRef)==null?void 0:k.current)==null||M.pointerUp())},[o,t.predModBrushRef]),Hs=d.useCallback(()=>{var k,M;N||(M=(k=t.predModBrushRef)==null?void 0:k.current)==null||M.pointerUp(),fe(!N)},[N,t.predModBrushRef]);d.useEffect(()=>{if(l)return;let k=0,M=0,U=null;const V=()=>{eo({x:k,y:M}),U=null},re=te=>{k=te.clientX,M=te.clientY,U===null&&(U=requestAnimationFrame(V))};return document.addEventListener("mousemove",re),()=>{document.removeEventListener("mousemove",re),U!==null&&cancelAnimationFrame(U)}},[l]);const Fs=t.predModBrushSize*2,en=!!(Ze||X||(ne||le)&&Ce&&!ke||m||(((an=$[gt])==null?void 0:an.historyIndex)??-1)>=0||(((cn=$[gt])==null?void 0:cn.historyIndex)??-1)<(((ln=$[gt])==null?void 0:ln.history.length)??0)-1||_||D);if(d.useEffect(()=>{en||xe(!1)},[en]),d.useEffect(()=>{xe(!1)},[X,Ze,ne,le]),!h){const k=!!c&&Bo.current;return a.jsxs(di,{children:[k&&Uo&&a.jsx(ui,{src:Uo,alt:"","aria-hidden":"true"}),k?a.jsxs(hi,{children:[a.jsx(Tn,{"aria-hidden":"true"}),a.jsx("span",{children:"Image loading..."})]}):c?"Click 'Next subject' to start classifying":"Log in to get started"]})}const ho=$[gt]||{history:[],historyIndex:-1},tn=ho.historyIndex<0,on=ho.historyIndex>=ho.history.length-1,nn=m&&j[m]?j[m].markLabel:E&&T?(dn=T.filter(k=>k.toolType==="rectangle").find(k=>k.markId===E))==null?void 0:dn.markLabel:void 0,Ns=()=>{ae(!0),setTimeout(()=>{be(!1)},100)},Ws=()=>{q(!0),ae(!0),setTimeout(()=>{be(!1)},100)};return a.jsxs(ni,{children:[a.jsx(ts,{zoom:Yo,isPanMode:N,isDebugMode:!!l,activeAnnotationId:m,disableUndo:tn,disableRedo:on,hasWholeImageMask:oo,isUserRectSelected:!!m&&m!=="-1",hasUnsavedUserRectMaskChanges:K,onZoomIn:ws,onZoomOut:$s,onZoomFit:vs,onZoom100:Ss,onTogglePan:Hs,onUndo:Vo,onRedo:Qo,onIdentifyNewObject:Os,onSaveUserRect:Is,onDiscardUserRect:js}),l&&a.jsxs(a.Fragment,{children:[a.jsxs(pi,{children:["Debug: Green = foreground (positive), Red = background (negative) ",a.jsx("button",{style:{marginLeft:"auto",padding:"4px 8px",cursor:"pointer",background:"rgba(255,255,255,0.3)",border:"1px solid white",color:"white",borderRadius:"4px"},onClick:()=>A(null),children:"Close ✕"})]}),a.jsx(Hi,{debugImageUrl:l,debugMasks:p,maskSelectionInfo:u,debugCrop:y,debugPrompts:g})]}),!l&&a.jsx("div",{style:{width:"100%"},children:a.jsxs(si,{ref:ps,onMouseEnter:Ls,onMouseLeave:Bs,children:[a.jsx(Gs,{ref:mt,width:Se.stageSize.width,height:Se.stageSize.height,onClick:fs,onContextMenu:ys,onMouseMove:xs,onMouseUp:Xo,onMouseLeave:Xo,onWheel:bs,onPointerDown:o==="modifier_brush"?Ms:void 0,onPointerMove:o==="modifier_brush"?Rs:void 0,onPointerUp:o==="modifier_brush"?Es:void 0,children:a.jsx(Js,{imageSmoothingEnabled:!1,children:a.jsxs(mn,{ref:hs,x:Ko,y:qo,scaleX:nt,scaleY:nt,draggable:N,onDragMove:ks,imageSmoothingEnabled:!1,children:[H&&a.jsx(Lt,{image:H,width:(H==null?void 0:H.naturalWidth)??0,height:(H==null?void 0:H.naturalHeight)??0,opacity:rs,listening:N,scaleY:-1,offsetY:H==null?void 0:H.naturalWidth}),a.jsxs(mn,{ref:Ho,listening:!G,children:[we&&a.jsx(Lt,{ref:Lo,image:we,visible:ao,width:(H==null?void 0:H.naturalWidth)??0,height:(H==null?void 0:H.naturalHeight)??0,opacity:t.nonSelectedMaskOpacity,listening:!1}),a.jsx(Oa,{image:H,externalMask:gs,externalMaskBounds:ds,opacity:t.selectedMaskOpacity,enableBrush:!N&&No&&o==="modifier_brush"&&!ot&&!W&&!Le,brushRadius:t.predModBrushSize,brushMode:t.predModBrushMode,width:(H==null?void 0:H.naturalWidth)??0,height:(H==null?void 0:H.naturalHeight)??0,ref:t.predModBrushRef,contentScale:nt}),T&&a.jsx(Za,{annotations:T,showTool2Boxes:r,selectedId:E||void 0,toolCursor:lo,setToolTip:Ct,onAnnotationClick:_s,onMouseEnterRect:Ps,onMouseLeaveRect:Ds,isUserRectHovered:W}),a.jsx(Ja,{onRectClick:Ts,selectedRectId:ee,toolCursor:lo,onMouseEnter:Us,onMouseLeave:zs,isHoveringOverCaesarRect:ot,setToolTip:Ct})]}),Mt&&a.jsx(Lt,{image:Mt,width:Mt.naturalWidth??0,height:Mt.naturalHeight??0,listening:!1,opacity:1}),b.map((k,M)=>a.jsx(Qn,{annotation:k,index:M,contentScale:nt,debugImageUrl:l,showPoints:s},k.id??M)),Oe.length>1&&a.jsx(kt,{points:Oe.flatMap(k=>[k.x,k.y]),stroke:o==="brush"?"lime":"cyan",strokeWidth:o==="brush"?t.brushSize*4/nt:3,lineCap:"round",lineJoin:"round"})]})})}),(m||!tn||!on||_||D)&&a.jsxs(mi,{$isEditingMinusOne:gt==="-1",onMouseEnter:()=>xe(!0),onMouseLeave:()=>xe(!1),children:[(_||D)&&a.jsx(Tn,{"aria-hidden":"true"}),_?"AI-generated masks loading...":D?"Checking for previous work...":nn?`Marking a ${nn.toLowerCase()}`:"Marking a new object"]}),Ze&&(m==null?void 0:m.startsWith("-"))&&m!=="-1"&&a.jsxs(xo,{role:"alertdialog","aria-label":"Confirm discard",onMouseEnter:()=>xe(!0),onMouseLeave:()=>xe(!1),children:["⚠️ Are you sure you want to delete the mask for this object?",a.jsx(at,{type:"button",onClick:As,title:"Delete this box and its mask",children:"Delete"}),a.jsx(at,{type:"button",onClick:()=>Ge(!1),title:"Keep this box and its mask",children:"Cancel"})]}),X&&a.jsxs(xo,{role:"alertdialog","aria-label":"Submit reminder",onMouseEnter:()=>xe(!0),onMouseLeave:()=>xe(!1),children:["⚠️ Remember that you must submit your classification to send your changes to Zooniverse.",a.jsx(at,{type:"button",onClick:()=>L(null),title:"Dismiss reminder",children:"Okay"}),a.jsx(at,{type:"button",onClick:()=>{Z.current.add(X),L(null)},title:"Hide this reminder for the rest of this session",children:"Do not remind me again"})]}),(ne||le)&&Ce&&!ke&&a.jsxs(xo,{$isLeaving:le,onMouseEnter:()=>xe(!0),onMouseLeave:()=>xe(!1),children:[`⚠️ You have not selected a bounding box so we assume you are annotating an artifact or contaminant that was completely missed by the machine learning model. Did you remember to check that good boxes using the "Show good boxes" button to make sure the object hasn't already been masked?`,a.jsx(at,{type:"button",onClick:Ns,title:"Dismiss warning",children:"Okay"}),a.jsx(at,{type:"button",onClick:Ws,title:"Hide this warning for the rest of this session",children:"Do not remind me again"})]}),cs&&a.jsxs(fi,{$expanded:!de,onMouseEnter:()=>Ie(!0),onMouseLeave:()=>Ie(!1),children:[a.jsxs(yi,{children:[a.jsx("strong",{children:de?"Instructions":o==="point"?"Instructions for the SAM Point Tool":"Instructions for the Mask Modifier Tool"}),a.jsx(bi,{type:"button",onClick:()=>B(k=>!k),"aria-label":de?"Show instructions":"Hide instructions",title:de?"Show instructions":"Hide instructions",children:de?"Show":"Hide"})]}),!de&&a.jsxs(xi,{children:[a.jsxs("p",{children:["These instructions are intended as a quick reference. Click the ",a.jsx("i",{children:"Tutorial"})," button (or ",a.jsx(ct,{href:"https://www.astronaimee.com/Artifact-InSPECtor-CFE/",target:"_blank",rel:"noopener noreferrer",children:"this link"}),") to open a more detailed tutorial in another browser window."]}),o==="point"?a.jsxs(a.Fragment,{children:[a.jsx("p",{children:"Add SAM prompts by clicking in the image area for the currently selected bounding box."}),a.jsx("p",{children:"Point types:"}),a.jsxs("ul",{children:[a.jsx("li",{children:"Left-click adds a positive point (green) to include that region."}),a.jsx("li",{children:"Right-click adds a negative point (red) to exclude that region."})]}),a.jsx("p",{children:"Each new point updates the mask prediction for the selected bounding box."}),a.jsx("p",{children:'Use the "Clear SAM points" button in the Tools panel to reset the point prompts for the currently selected bounding box. The button becomes active when you have added at least one SAM point — either while annotating a new object (with no bounding box selected), or after selecting a bounding box that already has SAM points associated with it.'}),a.jsx("p",{children:"If no bounding box is selected, we assume you are marking an object that was missed by our automatic detectors."}),a.jsx("p",{children:'Once you have finished marking a new object, click the "Identify new object" button in the subject viewer toolbar.'}),a.jsx("p",{children:"You can undo or redo your edits using the buttons in the subject viewer toolbar or using the following keyboard shortcuts while the mouse pointer is over the subject viewer."}),a.jsxs("ul",{children:[a.jsx("li",{children:"Undo: Ctrl+Z / ⌘Z"}),a.jsx("li",{children:"Redo: Ctrl+Y / ⌘⇧Z"})]})]}):a.jsxs(a.Fragment,{children:[a.jsx("p",{children:a.jsx("strong",{children:"How to edit an existing mask"})}),"Before you start, remember that we don't need you to mask horizontal stripes or small clusters of bright pixels because these are known side-effects of the way we made the images and we already know their locations. See step 3 of the ",a.jsx(ct,{href:"https://www.astronaimee.com/Artifact-InSPECtor-CFE/",target:"_blank",rel:"noopener noreferrer",children:" tutorial "})," for more details.",a.jsxs("ol",{children:[a.jsx("li",{children:"Click a box border once to select that box and zoom in to make editing easier. You can click the selected box border again to deselect it."}),a.jsxs("li",{children:["Choose ",a.jsx("em",{children:"Paint"})," (add to the mask) or ",a.jsx("em",{children:"Erase"})," (remove from the mask) in the ",a.jsx("em",{children:"Mask Modifier Tools"})," section of the tool palette."]}),a.jsxs("li",{children:["Click and drag inside the image, away from the box border. Your strokes change the selected box's existing mask by adding or subtracting pixels, depending on whether ",a.jsx("em",{children:"Paint"})," or ",a.jsx("em",{children:"Erase"})," is selected."]}),a.jsxs("li",{children:["You can adjust ",a.jsx("em",{children:"Modifier size"})," in the ",a.jsx("em",{children:"Mask Modifier Tools"})," section to change the brush diameter; the grey wedge below the slider shows the brush size at each point along it."]}),a.jsxs("li",{children:["In the ",a.jsx("em",{children:"Mask Visibility Tools"})," section, use ",a.jsx("em",{children:"Other masks opacity"})," to fade the unselected masks. If the selected mask is hard to see past, use ",a.jsx("em",{children:"Selected mask opacity"})," to fade it out (down to fully transparent). Painting and erasing still work while it is faded."]}),a.jsxs("li",{children:["Once you have painted on a box, its border becomes dashed. Click ",a.jsx("em",{children:"Ready to submit"})," in the viewer toolbar when you have finished editing it. Boxes marked as ready are outlined in violet."]})]}),a.jsx("p",{children:a.jsx("strong",{children:"How to show masks that were classified as good"})}),a.jsxs("p",{children:["By default, the viewer shows boxes and masks that Classic Artifact InSPECtor volunteers marked as needing fixes. To inspect or edit masks they marked as good, click ",a.jsx("em",{children:"Show good masks"})," under ",a.jsx("em",{children:"Good mask visibility"})," in the ",a.jsx("em",{children:"Mask Visibility Tools"})," section of the tool palette."]}),a.jsx("p",{children:a.jsx("strong",{children:"How to create a box and mask for a new object"})}),a.jsxs("ol",{children:[a.jsx("li",{children:"First make sure you have checked the set of good masks to make sure the object you want to add has not already been detected."}),a.jsxs("li",{children:["Make sure no box is selected, then select ",a.jsx("em",{children:"Paint"}),"."]}),a.jsxs("li",{children:["Click and drag over the object to paint its mask. A warning appears to explain that you are marking a new object; dismiss it or choose ",a.jsx("em",{children:"Do not remind me again"})," to suppress future warnings for this session."]}),a.jsxs("li",{children:["When the mask is ready, click ",a.jsx("em",{children:"Identify new object"})," in the viewer toolbar to create a box around it."]}),a.jsxs("li",{children:["To edit a box you created, select it and paint as usual. Click ",a.jsx("em",{children:"Ready to submit"})," afterward to commit the updated mask (and box). To remove a box you created, select it and click ",a.jsx("em",{children:"Discard"}),", then confirm that you want to delete its mask."]})]}),a.jsx("p",{children:a.jsx("strong",{children:"Undo and redo"})}),a.jsxs("p",{children:["Each box has its own editing history. Select a box, then use ",a.jsx("em",{children:"Undo"})," or ",a.jsx("em",{children:"Redo"})," in the viewer toolbar to step through that box's mask edits."]})]}),a.jsx("p",{children:a.jsx("strong",{children:"Submitting your classification"})}),a.jsxs("p",{children:["When you have finished, click ",a.jsx("em",{children:"Submit Classification"})," in the sidebar. If any boxes have been edited but not marked as ",a.jsx("em",{children:"Ready to submit"}),", you will be asked whether to mark them all as ready first. After a successful submission you can keep working on this image or click ",a.jsx("em",{children:"Next Subject"})," to load a new one."]}),a.jsx("p",{children:a.jsx("strong",{children:"Zoom and pan"})}),a.jsxs("ul",{children:[a.jsxs("li",{children:["You can use ",a.jsx("em",{children:"+"})," and ",a.jsx("em",{children:"-"})," in the viewer toolbar to zoom in and out."]}),a.jsx("li",{children:"Alternatively, scroll the mouse wheel over the image to zoom toward or away from the pointer. You can zoom in up to 3000%."}),a.jsxs("li",{children:["Click ",a.jsx("em",{children:"Fit"})," to fit the whole image in the viewer, or ",a.jsx("em",{children:"100%"})," to view image pixels at screen-pixel size."]}),a.jsxs("li",{children:["Click ",a.jsx("em",{children:"Pan"}),", then click and drag the image to move it. Click ",a.jsx("em",{children:"Pan"})," again to return to the mask modifier tool."]})]})]},o)]}),a.jsx(Mi,{annotations:T,userRects:j,workflowBoxTypes:O,expanded:pe,onToggleExpanded:()=>ie(k=>!k),onMouseEnter:()=>ve(!0),onMouseLeave:()=>ve(!1)})]})}),a.jsx($i,{tool:"modifier_brush",size:Fs,visible:Zo,x:ut.x,y:ut.y}),Ve.visible&&a.jsx("div",{style:{position:"absolute",top:Ve.y,left:Ve.x,background:"rgba(0,0,0,0.75)",color:"white",padding:"4px 8px",borderRadius:"4px",pointerEvents:"none",whiteSpace:"nowrap",zIndex:1e3},children:Ve.text})]})},Ki=x.div`
  display: flex;
  flex-direction: column;
  gap: ${e.spacing.sm};
  padding: ${e.spacing.md};
  background: ${e.colors.background.surface};
  border: ${e.borders.width.thin} solid ${e.colors.border};
  border-radius: ${e.borders.radius.lg};
  width: 100%;
`,it=vr,vo=St,Un=Yn;x(St)`
  color: ${e.colors.error};
  border-color: ${e.colors.error};
  background: ${e.colors.secondary};
  margin-top: ${e.spacing.xs};

  &:hover:not(:disabled) {
    background: ${e.colors.error};
    color: ${e.colors.text.inverse};
  }
`;const qi=x(St)`
  display: none;
`,Xi=x(St)`
  display: none;
`;x(St)`
  display: none;
`;const Zi=x.div`
  display: none;
`;x.label`
  display: flex;
  align-items: center;
  gap: ${e.spacing.md};
  font-size: ${e.typography.size.sm};
  color: ${e.colors.text.primary};
  cursor: pointer;

  input {
    cursor: pointer;
  }
`;const Ut=x.div`
  display: flex;
  align-items: center;
  gap: ${e.spacing.sm};
`,zt=x.input`
  cursor: pointer;
  max-width: 120px;
  flex: 1;
`,Gi=x.div`
  display: flex;
  flex-direction: column;
  gap: ${e.spacing.sm};
  align-items: flex-start;
  margin-top: ${e.spacing.xs};
`;x.input`
  width: 40px;
  cursor: ${o=>o.$inactive?"not-allowed":"pointer"};
  background: ${o=>{if(o.$inactive)return`${e.colors.neutral.dark}`;const t=o.$mode==="subtract"?"5%":"95%";return`linear-gradient(
      to right,
      ${e.colors.success} 0%,
      ${e.colors.success} ${t},
      ${e.colors.error} ${t},
      ${e.colors.error} 100%
    )`}};
  border-radius: ${e.borders.radius.base};
  border: 1px solid ${e.colors.text.inverse};
  height: 11px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:disabled {
    opacity: 0.7;
  }
    
`;x.span`
  font-size: 11px;
  line-height: 1.5;
  color: ${e.colors.text.secondary};
  margin-top: ${e.spacing.md};
  display: block;
  white-space: pre-line;
`;const So=x.div`
  display: flex;
  flex-direction: column;
  gap: ${e.spacing.sm};
  width: 100%;
`;function Ji({tool:o,brushProps:t,showTool2Boxes:n,onToggleTool2Boxes:s,onBrushSizeChange:r,onPredModBrushModeChange:i,onPredModBrushSizeChange:c,onSelectedMaskOpacityChange:h,onNonSelectedMaskOpacityChange:l,coordinateFix:p,onCoordinateFixChange:u,debugCoords:y,onDebugCoordsChange:g}){const b=o==="modifier_brush",m={margin:0,minWidth:"110px"},S=f=>{const w=f.currentTarget.getBoundingClientRect(),$=Math.max(w.width-20,1),I=Math.min(Math.max((f.clientX-w.left)/$,0),1);c(Math.round((1+9*I)*10)/10)};return a.jsxs(Ki,{children:[a.jsx(Un,{children:"Mask Modifier Tools"}),a.jsxs(Gi,{children:[a.jsxs(So,{children:[a.jsx(qi,{disabled:!0,onClick:()=>{var f,w;return(w=(f=t.predModBrushRef)==null?void 0:f.current)==null?void 0:w.undo()},children:"Undo"}),a.jsx(Xi,{disabled:!0,onClick:()=>{var f,w;return(w=(f=t.predModBrushRef)==null?void 0:f.current)==null?void 0:w.redo()},children:"Redo"})]}),a.jsxs(Ut,{style:{flexDirection:"column",alignItems:"stretch",width:"100%"},children:[a.jsx(it,{style:m,children:"Modifier mode:"}),a.jsxs(So,{style:{flexDirection:"row"},children:[a.jsxs(vo,{style:{display:"flex",alignItems:"center",justifyContent:"center"},type:"button",$active:t.predModBrushMode==="add","aria-pressed":t.predModBrushMode==="add","aria-label":"Paint brush: add to the mask",title:"Paint brush: add to the mask",disabled:!b,onClick:()=>i("add"),children:[a.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",style:{transform:"translateY(2px) scale(1.35)"},fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[a.jsx("path",{d:"M18.4 2.6a2 2 0 0 1 2.8 2.8L12 14.6l-3.2-3.2z"}),a.jsx("path",{d:"M8.8 11.4C6.4 11.4 5 13 5 15c0 1.6-.8 2.6-2 3.4 3.6 1.6 8 .4 8-3.4"})]}),a.jsx("span",{style:{marginLeft:6},children:"Paint"})]}),a.jsxs(vo,{style:{display:"flex",alignItems:"center",justifyContent:"center"},type:"button",$active:t.predModBrushMode==="subtract","aria-pressed":t.predModBrushMode==="subtract","aria-label":"Eraser: remove from the mask",title:"Eraser: remove from the mask",disabled:!b,onClick:()=>i("subtract"),children:[a.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",style:{transform:"scale(1.35)"},fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[a.jsx("path",{d:"M20 20H9l-5.3-5.3a1 1 0 0 1 0-1.4l9-9a1 1 0 0 1 1.4 0l6.6 6.6a1 1 0 0 1 0 1.4L12 20"}),a.jsx("path",{d:"M7 11l6 6"})]}),a.jsx("span",{style:{marginLeft:6},children:"Erase"})]})]})]}),a.jsxs(Ut,{style:{flexDirection:"column",alignItems:"stretch",width:"100%"},children:[a.jsx(it,{style:m,children:"Modifier size:"}),a.jsx(zt,{type:"range",min:"1",max:"10",step:"0.1",value:t.predModBrushSize,id:"predmod_brush_size_slider",style:{maxWidth:"none",width:"100%",margin:0},disabled:!b,onChange:f=>c(parseFloat(f.target.value))}),a.jsxs("div",{"aria-hidden":"true",onPointerDown:f=>{b&&(f.currentTarget.setPointerCapture(f.pointerId),S(f))},onPointerMove:f=>{f.currentTarget.hasPointerCapture(f.pointerId)&&S(f)},style:{position:"relative",width:"100%",height:40,marginTop:2,opacity:b?1:.4,cursor:b?"ew-resize":"default",touchAction:"none"},children:[a.jsx("svg",{viewBox:"0 0 100 40",preserveAspectRatio:"none",shapeRendering:"crispEdges",style:{position:"absolute",left:0,top:0,width:"calc(100% - 20px)",height:40},children:a.jsx("polygon",{points:"0,18 100,0 100,40 0,22",fill:"#888"})}),a.jsx("div",{style:{position:"absolute",right:0,top:0,width:40,height:40,borderRadius:"50%",background:"#888"}}),a.jsx("div",{style:{position:"absolute",top:0,width:2,height:40,left:`calc((100% - 20px) * ${(t.predModBrushSize-1)/9})`,background:"#1e90ff"}})]})]}),a.jsx(Un,{style:{marginTop:e.spacing.md,marginBottom:e.spacing.xs},children:"Mask Visibility Tools"}),a.jsxs(Ut,{style:{flexDirection:"column",alignItems:"stretch",width:"100%"},children:[a.jsx(it,{style:m,children:"Selected mask opacity:"}),a.jsx(zt,{type:"range",min:"0",max:"1",step:"0.05",value:t.selectedMaskOpacity,id:"selected_mask_opacity_slider",style:{maxWidth:"none",width:"100%",margin:0},onChange:f=>h(parseFloat(f.target.value))}),a.jsx(it,{style:m,children:"Other masks opacity:"}),a.jsx(zt,{type:"range",min:"0",max:"1",step:"0.05",value:t.nonSelectedMaskOpacity,id:"non_selected_mask_opacity_slider",style:{maxWidth:"none",width:"100%",margin:0},onChange:f=>l(parseFloat(f.target.value))}),a.jsx(it,{style:m,children:"Good mask visibility:"}),a.jsx(So,{children:a.jsx(vo,{type:"button",$active:n,"aria-pressed":n,onClick:s,children:n?"Hide good masks":"Show good masks"})})]})]}),a.jsx(Zi,{children:a.jsxs(Ut,{children:[a.jsx(it,{style:{margin:0},children:"Brush size"}),a.jsx(zt,{type:"range",min:"1",max:"10",defaultValue:"5",id:"brush_size_slider",onChange:f=>{r(parseFloat(f.target.value))}})]})}),!1]})}const Vi=x.div`
  width: 320px;
  padding: ${e.spacing.lg};
  background: ${e.colors.background.surface};
  border: ${e.borders.width.thin} solid ${e.colors.border};
  border-radius: ${e.borders.radius.lg};
  display: flex;
  flex-direction: column;
  gap: ${e.spacing.lg};
`;x.h3`
  margin: 0;
  color: ${e.colors.text.primary};
  font-size: ${e.typography.heading.h4.fontSize};
  font-weight: ${e.typography.fontWeight.medium};
`;x.div`
  display: flex;
  flex-direction: column;
  gap: ${e.spacing.sm};
`;x.label`
  color: ${e.colors.text.primary};
  font-size: ${e.typography.size.sm};
  font-weight: ${e.typography.fontWeight.medium};
  cursor: default;
`;x.div`
  display: flex;
  flex-direction: column;
  gap: ${e.spacing.xs};
`;x.label`
  color: ${e.colors.text.secondary};
  font-size: ${e.typography.size.sm};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${e.spacing.sm};

  input {
    cursor: pointer;
  }

  &:hover {
    color: ${e.colors.text.primary};
  }
`;x.textarea`
  padding: ${e.spacing.md};
  border-radius: ${e.borders.radius.base};
  border: ${e.borders.width.thin} solid ${e.colors.border};
  background: ${e.colors.secondary};
  color: ${e.colors.text.inverse};
  font-family: ${e.typography.fontFamily};
  font-size: ${e.typography.size.sm};
  resize: vertical;
  transition: all ${e.transitions.base};

  &:focus {
    outline: none;
    border-color: ${e.colors.primary};
    box-shadow: 0 0 0 3px ${e.colors.primaryLight}40;
  }

  &::placeholder {
    color: ${e.colors.neutral.dark};
  }
`;const Qi=x.button`
  padding: ${e.spacing.md} ${e.spacing.lg};
  background: ${e.colors.primary};
  border: none;
  border-radius: ${e.borders.radius.base};
  color: ${e.colors.secondary};
  font-family: ${e.typography.fontFamily};
  font-size: ${e.typography.size.sm};
  font-weight: ${e.typography.fontWeight.medium};
  cursor: pointer;
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  transition: all ${e.transitions.base};

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.95);
  }
`;x.button`
  padding: ${e.spacing.sm} ${e.spacing.md};
  background: ${e.colors.neutral.light};
  border: 1px solid ${e.colors.border};
  border-radius: ${e.borders.radius.base};
  color: ${e.colors.text.secondary};
  font-family: ${e.typography.fontFamily};
  font-size: ${e.typography.size.xs};
  font-weight: ${e.typography.fontWeight.regular};
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  transition: all ${e.transitions.base};

  &:hover {
    background: ${e.colors.neutral.medium};
    color: ${e.colors.text.primary};
  }

  &:active {
    transform: scale(0.95);
  }
`;const ec=x.section`
  display: flex;
  flex-direction: column;
  gap: ${e.spacing.sm};
  min-width: 0;
  padding: ${e.spacing.lg};
  background: ${e.colors.background.surface};
  border: ${e.borders.width.thin} solid ${e.colors.border};
  border-radius: ${e.borders.radius.lg};
`,tc=x(Yn).attrs({as:"h3"})``,oc=x.h4`
  margin: 0;
  color: ${e.colors.text.primary};
  font-size: ${e.typography.size.base};
  font-weight: ${e.typography.fontWeight.medium};
  overflow-wrap: anywhere;
`,nc=x.a`
  color: ${e.colors.primary};
  text-decoration: underline;
  text-decoration-color: ${e.colors.primary};
  text-underline-offset: 2px;

  &:hover {
    color: ${e.colors.primary};
  }
`,zn=x.button`
  align-self: stretch;
  margin-top: ${e.spacing.sm};
  padding: ${e.spacing.md} ${e.spacing.lg};
  border: none;
  border-radius: ${e.borders.radius.base};
  background: ${e.colors.background.surface};
  color: ${e.colors.primary};
  font-family: ${e.typography.fontFamily};
  font-size: ${e.typography.size.sm};
  font-weight: ${e.typography.fontWeight.medium};
  cursor: pointer;
  box-shadow: inset 0 0 0 1px ${e.colors.primary};

  &:hover {
    background: ${e.colors.primaryLight};
    color: ${e.colors.secondary};
  }
`,Ke=x.p`
  margin: 0;
  color: ${e.colors.text.secondary};
  font-size: ${e.typography.size.sm};
  overflow-wrap: anywhere;
`,sc=x.div`
  display: flex;
  flex-direction: column;
  gap: ${e.spacing.sm};
`,rc=x.article`
  display: flex;
  flex-direction: column;
  gap: ${e.spacing.xs};
  padding: ${e.spacing.sm};
  border: ${e.borders.width.thin} solid ${e.colors.border};
  border-radius: ${e.borders.radius.base};
  background: ${e.colors.background.elevated};
  min-width: 0;
`,ac=x.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: ${e.colors.text.secondary};
  font-size: ${e.typography.size.xs};

  strong {
    color: ${e.colors.text.primary};
    overflow-wrap: anywhere;
  }
`,ic=x.p`
  margin: 0;
  color: ${e.colors.text.primary};
  font-size: ${e.typography.size.sm};
  white-space: pre-wrap;
  overflow-wrap: anywhere;
`,On=x.button`
  align-self: flex-start;
  padding: ${e.spacing.xs} ${e.spacing.sm};
  border: ${e.borders.width.thin} solid ${e.colors.border};
  border-radius: ${e.borders.radius.base};
  background: ${e.colors.background.surface};
  color: ${e.colors.text.primary};
  font: inherit;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }
`,os=x.div`
  margin-top: auto;
  background: ${e.colors.error};
  color: ${e.colors.text.inverse};
  padding: ${e.spacing.md};
  border-radius: ${e.borders.radius.base};
  font-size: ${e.typography.size.sm};
  font-weight: ${e.typography.fontWeight.medium};
  display: flex;
  flex-direction: column;
  gap: ${e.spacing.sm};

  & + button {
    margin-top: ${e.spacing.sm};
  }
`,cc=x(os)`
  background: #2e9e57;
`,Ot=x.button`
  padding: 6px 14px;
  background: transparent;
  color: ${e.colors.text.inverse};
  border: 1px solid ${e.colors.text.inverse};
  border-radius: ${e.borders.radius.base};
  font-family: ${e.typography.fontFamily};
  font-size: ${e.typography.size.sm};
  font-weight: ${e.typography.fontWeight.medium};
  cursor: pointer;

  &:hover {
    background: ${e.colors.text.inverse};
    color: ${e.colors.error};
  }
`,lc=x.pre`
  margin-top: auto;
  max-height: 300px;
  overflow: auto;
  padding: ${e.spacing.sm};
  border: 1px dashed ${e.colors.primary};
  border-radius: ${e.borders.radius.base};
  font-size: 11px;
  white-space: pre-wrap;
  word-break: break-all;

  & + button {
    margin-top: ${e.spacing.sm};
  }
`,dc="https://talk.zooniverse.org";function uc(o){const t=Object.fromEntries(Object.entries(o).map(([n,s])=>[n,s===void 0?void 0:String(s)]));return Xt(t)}async function Do(o,t,n){return Ue(dc,`/${o}${uc(t)}`,{token:n})}function hc(o={},t){const n=`project-${Eo}`;return Do("boards",{section:n,subject_default:!0,...o},t)}function pc(o={},t){return Do("discussions",o,t)}async function gc(o,t){const{boards:n}=await hc({},t),s=n.find(i=>i.subject_default);if(!s)return{};const{discussions:r}=await pc({board_id:s.id,focus_id:o,focus_type:"Subject",page:1,page_size:10},t);return{board:s,discussion:r.find(i=>i.focus_id===o&&i.focus_type==="Subject")}}function Ln(o,t={},n){return Do("comments",{...t,discussion_id:o},n)}const Bn=20,mc="https://www.zooniverse.org/projects";function ns(o){const t=o.split("/").map(n=>encodeURIComponent(n)).join("/");return`${mc}/${t}/talk`}function fc(o,t){return`${ns(o)}/${encodeURIComponent(t.board_id)}/${encodeURIComponent(t.id)}`}function yc(o,t){return`${ns(o)}/subjects/${encodeURIComponent(t)}`}function xc({projectSlug:o}){const t=P(f=>f.activeAnnotationId),{token:n}=Zt(),s=n==null?void 0:n.access_token,r=!!(t&&t!=="-1"&&t.startsWith("-")),i=t&&!t.startsWith("-")?t:null,[c,h]=d.useState({kind:"idle"}),[l,p]=d.useState(0),[u,y]=d.useState(!1),[g,b]=d.useState(null);d.useEffect(()=>{if(r){h({kind:"user-object"});return}if(!i){h({kind:"idle"});return}let f=!1;return h({kind:"loading"}),y(!1),b(null),(async()=>{try{const{board:$,discussion:I}=await gc(i,s);if(f)return;if(!I){h({kind:"not-found",board:$,subjectId:i});return}const j=await Ln(I.id,{page:1,page_size:Bn},s);if(f)return;h({kind:"loaded",discussion:I,comments:j.comments,nextPage:j.meta.comments.next_page})}catch($){if(f)return;h({kind:"error",error:$ instanceof Error?$.message:"Talk request failed"})}})(),()=>{f=!0}},[s,r,l,i]);const m=d.useCallback(async()=>{if(!(c.kind!=="loaded"||c.nextPage===null||u)){y(!0),b(null);try{const f=await Ln(c.discussion.id,{page:c.nextPage,page_size:Bn},s);h(w=>w.kind!=="loaded"||w.discussion.id!==c.discussion.id?w:{...w,comments:[...w.comments,...f.comments],nextPage:f.meta.comments.next_page})}catch(f){b(f instanceof Error?f.message:"Could not load more comments")}finally{y(!1)}}},[s,u,c]),S=c.kind==="not-found"&&c.board?yc(o||c.board.project_slug,c.subjectId):void 0;return a.jsxs(ec,{"aria-live":"polite",children:[a.jsx(tc,{children:"Mini Talk"}),c.kind==="idle"&&a.jsx(Ke,{children:"Select a box to view its Talk discussion."}),c.kind==="user-object"&&a.jsx(Ke,{children:"Talk is not available for user-identified objects."}),c.kind==="loading"&&a.jsx(Ke,{children:"Loading discussion…"}),c.kind==="not-found"&&a.jsxs(a.Fragment,{children:[a.jsx(Ke,{children:"No Talk posts exist for this subject yet."}),S&&a.jsx(zn,{type:"button",onClick:()=>window.open(S,"_blank","noopener,noreferrer"),title:"Open the Talk board to start a discussion about this subject",children:"Talk about this subject"})]}),c.kind==="error"&&a.jsxs(a.Fragment,{children:[a.jsx(Ke,{role:"alert",children:"Could not load the Talk discussion."}),a.jsx(Ke,{children:c.error}),a.jsx(On,{type:"button",onClick:()=>p(f=>f+1),children:"Retry"})]}),c.kind==="loaded"&&a.jsxs(a.Fragment,{children:[a.jsx(oc,{children:a.jsx(nc,{href:fc(o||c.discussion.project_slug,c.discussion),target:"_blank",rel:"noreferrer",title:"Click to open in a separate window",children:c.discussion.title})}),c.comments.length===0?a.jsx(Ke,{children:"This discussion has no comments yet."}):a.jsx(sc,{children:c.comments.map(f=>a.jsxs(rc,{children:[a.jsxs(ac,{children:[a.jsx("strong",{children:f.user_display_name||f.user_login}),a.jsx("time",{dateTime:f.created_at,children:new Date(f.created_at).toLocaleString()})]}),a.jsx(ic,{children:f.is_deleted?"This comment has been deleted.":f.body})]},f.id))}),c.nextPage!==null&&a.jsxs(a.Fragment,{children:[a.jsx(On,{type:"button",onClick:m,disabled:u,children:u?"Loading…":"Load older comments"}),g&&a.jsx(Ke,{role:"alert",children:g})]}),a.jsx(zn,{type:"button",onClick:()=>window.open(S,"_blank","noopener,noreferrer"),title:"Open the Talk board to start a discussion about this subject",children:"Talk more about this subject"})]})]})}function bc({projectSlug:o}){const{buildPanoptesClassification:t,subjectId:n}=P(m=>({buildPanoptesClassification:m.buildPanoptesClassification,subjectId:m.subjectId})),s="false"===!0,[r,i]=d.useState(!1),[c,h]=d.useState(!1),[l,p]=d.useState(null),u=async()=>{var f;const m=await t(Eo,lt);v.app("Classifications (Panoptes format):",m);const S=er();if(S){v.panoptes(JSON.stringify(m),S.access_token);const w=await lr(m,S.access_token);v.panoptes("Submission response:",w);const $=(f=m.annotations.find(I=>I.task==="rect-annotations"))==null?void 0:f.value;if(Array.isArray($)){const I=$.flatMap(j=>typeof j=="object"&&j!==null&&"annotationId"in j&&typeof j.annotationId=="string"?[j.annotationId]:[]);oe.getState().markBoxesSubmitted(I)}P.getState().markWorkSubmitted(),h(!0)}},y=()=>{_n().length>0?i(!0):u()},g=async()=>{i(!1);for(const m of _n())await Vn(m);await u()},b=()=>{i(!1),u()};return a.jsxs(a.Fragment,{children:[a.jsxs(Vi,{children:[r&&a.jsxs(os,{role:"alertdialog","aria-label":"Unsaved changes",children:["⚠️ You have edited one or more masks without marking them as ready to submit. Do you want to mark all of them as ready before submitting?",a.jsx(Ot,{type:"button",onClick:g,children:"Mark all ready & submit"}),a.jsx(Ot,{type:"button",onClick:b,children:"Submit anyway"}),a.jsx(Ot,{type:"button",onClick:()=>i(!1),children:"Cancel"})]}),c&&a.jsxs(cc,{role:"alertdialog","aria-label":"Classification submitted",children:[a.jsx("b",{children:"Thank you for your classification!"}),a.jsx("br",{}),'You can keep working on this image or click "Next Subject" to load a new one.',a.jsx(Ot,{type:"button",onClick:()=>h(!1),children:"Okay"})]}),l&&a.jsx(lc,{"aria-label":"Dry-run classification preview",children:`DRY RUN - not submitted
${l}`}),a.jsx(Qi,{onClick:y,children:"Submit Classification"}),s]}),a.jsx(xc,{projectSlug:o})]})}function kc(o,t,n){if(n==="none"||!t)return o;const{x:s,y:r}=o,{width:i,height:c}=t;switch(n){case"flipX":return{x:i-1-s,y:r};case"flipY":return{x:s,y:c-1-r};case"flipBoth":return{x:i-1-s,y:c-1-r};case"swapXY":return{x:r,y:s};default:return o}}function wc(o,t,n){return o.map(s=>{const r=kc({x:s.x,y:s.y},t,n);return{...s,x:Math.round(r.x),y:Math.round(r.y)}})}async function Hn(o,t,n="",s={}){var u;const{debug:r=!1,imageSize:i,coordinateFix:c="none",modelId:h="sam2-hiera-large"}=s;v.sam2("[SAM2 Service] segmentWithPoints called",{promptCount:t.length,prompts:t,options:{debug:r,imageSize:i,coordinateFix:c,modelId:h},imageSummary:o.substring(0,50)+(o.length>50?"...":"")});const l=wc(t,i,c);v.sam2("[SAM2 Service] Transformed prompts",{transformedPrompts:l});const p=n?`${n}/api/sam2/segment`:"/api/sam2/segment";try{const y={image_url:o,prompts:l,debug:r,model_id:h};v.sam2("[SAM2 Service] Sending request to",p,{debug:r,model_id:h,promptCount:l.length,imageSummary:o.substring(0,50)+(o.length>50?"...":"")});const g=await fetch(p,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(y)});if(v.sam2("[SAM2 Service] Response received",{status:g.status,statusText:g.statusText}),!g.ok){let m;try{const S=await g.json();m=S.detail??S.error??`HTTP ${g.status}`}catch{m=`HTTP ${g.status}`}throw v.sam2("[SAM2 Service] Request failed",{status:g.status,errorMessage:m}),new Error(`SAM2 segmentation failed: ${m}`)}const b=await g.json();return v.sam2("[SAM2 Service] Result received",{hasImage:!!((u=b.image)!=null&&u.url),hasDebugUrl:!!b.debug_url}),b}catch(y){throw v.sam2("[SAM2 Service] Error during segmentation",y),y instanceof Error?y:new Error(`SAM2 segmentation error: ${String(y)}`)}}function Co(o){return new Promise((t,n)=>{const s=new Image;s.onload=()=>{const r=document.createElement("canvas");r.width=s.naturalWidth,r.height=s.naturalHeight;const i=r.getContext("2d");if(!i){n(new Error("Failed to get canvas context"));return}i.drawImage(s,0,0);const c=i.getImageData(0,0,r.width,r.height);t(c)},s.onerror=()=>n(new Error("Failed to load image from data URI")),s.src=o})}function Io(o,t){return{type:"sam",modelId:t,...ua(o)}}function $c(){const[o,t]=d.useState("modifier_brush"),[n,s]=d.useState(5),[r,i]=d.useState(5),[c,h]=d.useState("sam1-vit_b"),[l,p]=d.useState("none"),[u,y]=d.useState(!1),[g,b]=d.useState(!0),[m,S]=d.useState(!1),[f,w]=d.useState(!1),[$,I]=d.useState(void 0),[j,A]=d.useState(!1),[R,T]=d.useState(!1),[O,E]=d.useState(!1),[C,_]=d.useState(!1),[D,G]=d.useState(!1),[K,ne]=d.useState(!1),[z,le]=d.useState(void 0),[ae,Ce]=d.useState(void 0),[be,Ze]=d.useState(void 0),Ge=d.useCallback(Q=>{if(w(Q),Q){const we=oe.getState();we.clearAnnotations(),we.setSelectedAnnotationId(null)}},[]),{imageUrl:ke,annotations:q,undoLastAnnotation:X,setDebugImage:L,setDebugMasks:F,setPerAnnotationMask:Z,pushPerAnnotationMaskHistory:J,imageDimensions:N,activeAnnotationId:fe}=P();d.useEffect(()=>{hr("30908").then(Q=>{var ge,ee;if(!Q)return;Ze(Q.slug),le(Q.display_name||"Defies definition"),Ce(Q.description||"Indescribable");const we=((ee=(ge=Q.links)==null?void 0:ge.avatar)==null?void 0:ee.href)||null;we&&pr(we).then(he=>{var W;I(((W=he.media)==null?void 0:W[0].src)||"https://zooniverse.github.io/panoptes/images/logo.png")})})},[]);const ze=d.useCallback(async()=>{var he;if(!X())return;const we=P.getState().annotations,ge=fe||"-1",ee=we.filter(W=>W.type==="point"&&(W.annotationId||"-1")===ge).map(W=>{const ye=W;return{x:ye.x,y:ye.y,label:ye.label}});if(ee.length===0){Z(ge,null),L(null),F(null,null);return}if(ke)try{const W=await Hn(ke,ee,"",{debug:u,imageSize:N??void 0,coordinateFix:l,modelId:c});if(u&&W.debug_url){if(L(W.debug_url),W.debug_masks&&W.mask_selection){const ye=ee.map(de=>({x:de.x,y:de.y,label:de.label}));F(W.debug_masks,W.mask_selection,W.debug_crop||void 0,ye)}Z(ge,null)}else if(L(null),F(null,null),(he=W.image)!=null&&he.url){const ye=W.image.url;Co(ye).then(de=>{const B=Io(de,c),pe=P.getState().perAnnotationMasks[ge];let ie=[],$e=0;if(pe){const ve=pe.history.slice(0,pe.historyIndex+1);ie=[...ve,B],$e=ve.length}else ie=[B],$e=0;const Ie=Ht(ie,$e)||de,Me=tt(Ie);J(ge,B,ee),Z(ge,Me)}).catch(de=>{v.app("Failed to convert SAM mask to ImageData:",de),Z(ge,ye)})}}catch(W){v.app("SAM2 not available:",W)}},[ke,X,Z,L,F,N,l,u,c,fe,J]),Je=d.useCallback(async(Q,we,ge)=>{var W,ye,de;if(!ke)return;const ee=fe||"-1",he=[...q.filter(B=>B.type==="point"&&(B.annotationId||"-1")===ee).map(B=>{const pe=B;return{x:pe.x,y:pe.y,label:pe.label}}),{x:Q,y:we,label:ge}];if(he.length!==0)try{const B=await Hn(ke,he,"",{debug:u,imageSize:N??void 0,coordinateFix:l,modelId:c});if(v.sam2("[handlePointClick] SAM response: %O",{debugMode:u,hasDebugUrl:!!B.debug_url,hasDebugMasks:!!B.debug_masks,maskSelection:B.mask_selection,debugMasksLength:(W=B.debug_masks)==null?void 0:W.length}),u){if(B.debug_url){if(L(B.debug_url),B.debug_masks&&B.mask_selection){v.debug("[handlePointClick] Setting debug masks: %d masks",B.debug_masks.length);const pe=he.map(ie=>({x:ie.x,y:ie.y,label:ie.label}));F(B.debug_masks,B.mask_selection,B.debug_crop||void 0,pe)}else v.debug("[handlePointClick] Debug masks missing: %O",{hasDebugMasks:!!B.debug_masks,hasMaskSelection:!!B.mask_selection});Z(ee,null)}else if(L(null),F(null,null),v.debug("Debug requested but no debug_url in response: %O",B),(ye=B.image)!=null&&ye.url){const pe=B.image.url;Co(pe).then(ie=>{const $e=Io(ie,c),Ie=P.getState().perAnnotationMasks[ee];let Me=[],ve=0;if(Ie){const Le=Ie.history.slice(0,Ie.historyIndex+1);Me=[...Le,$e],ve=Le.length}else Me=[$e],ve=0;const pt=Ht(Me,ve)||ie,xe=tt(pt);J(ee,$e,he),Z(ee,xe)}).catch(ie=>{v.app("Failed to convert SAM mask to ImageData: %O",ie),Z(ee,pe)})}}else if(L(null),F(null,null),(de=B.image)!=null&&de.url){const pe=B.image.url;Co(pe).then(ie=>{const $e=Io(ie,c),Ie=P.getState().perAnnotationMasks[ee];let Me=[],ve=0;if(Ie){const Le=Ie.history.slice(0,Ie.historyIndex+1);Me=[...Le,$e],ve=Le.length}else Me=[$e],ve=0;const pt=Ht(Me,ve)||ie,xe=tt(pt);J(ee,$e,he),Z(ee,xe)}).catch(ie=>{v.app("Failed to convert SAM mask to ImageData:",ie),Z(ee,pe)})}}catch(B){v.app("SAM2 not available:",B)}},[ke,q,Z,L,F,N,l,u,c,fe,J]),[Oe,Qt]=d.useState("add"),[Ve,Ct]=d.useState(1),[ut,eo]=d.useState(1),to=d.useRef(null),ht=d.useMemo(()=>({brushSize:n,predModBrushSize:r,predModBrushMode:Oe,selectedMaskOpacity:Ve,nonSelectedMaskOpacity:ut,predModBrushRef:to}),[n,r,Oe,Ve,ut]),oo=d.useCallback(Q=>{s(Q)},[]),no=d.useCallback(Q=>{Qt(Q)},[]),ot=d.useCallback(Q=>{i(Q)},[]);return a.jsxs(Ir,{children:[a.jsxs(jr,{children:[a.jsx(Dr,{src:$,$loaded:j,onLoad:()=>A(!0)}),a.jsxs(Ar,{children:[a.jsx(Mr,{children:z}),a.jsx(Rr,{children:ae}),a.jsxs(Er,{children:[a.jsx(Nr,{}),a.jsx(Ua,{onLoadingChange:Ge})]})]}),a.jsx(_r,{children:a.jsx(Xr,{})})]}),a.jsxs(Ur,{children:[a.jsxs(zr,{children:[a.jsx(Tr,{children:a.jsx(Pr,{href:"https://www.astronaimee.com/Artifact-InSPECtor-CFE/",target:"_blank",rel:"noopener noreferrer",children:"Tutorial"})}),a.jsx(Ji,{tool:o,onToolChange:t,brushProps:ht,showTool2Boxes:m,onToggleTool2Boxes:()=>S(Q=>!Q),onBrushSizeChange:oo,onPredModBrushModeChange:no,modelId:c,onModelChange:h,showPoints:g,onShowPointsChange:b,onPredModBrushSizeChange:ot,onSelectedMaskOpacityChange:Ct,onNonSelectedMaskOpacityChange:eo,coordinateFix:l,onCoordinateFixChange:p,debugCoords:u,onDebugCoordsChange:y})]}),a.jsx(Or,{children:a.jsx(Yi,{tool:o,brushProps:ht,onPointClick:Je,onUndo:ze,showPoints:g,showTool2Boxes:m,isSubjectLoading:f})}),a.jsx(Lr,{children:a.jsx(bc,{projectSlug:be})})]}),a.jsx(xn,{children:a.jsxs("p",{children:["This project's data is stored within the Zooniverse database and is governed by the Zooniverse Terms & Conditions (",a.jsx(ct,{href:"https://www.zooniverse.org/privacy",children:"User Agreement and Privacy Policy"})," and ",a.jsx(ct,{href:"https://www.zooniverse.org/security",children:"Security Policy"}),")."]})}),a.jsxs(xn,{children:[a.jsxs("p",{children:[a.jsx(xt,{src:"https://thumbnails.zooniverse.org/50x/panoptes-uploads.zooniverse.org/project_attached_image/c9885821-ab6c-4d7b-9bf1-99c03a057743.png",style:{backgroundColor:"#fff"},$loaded:R,onLoad:()=>T(!0)}),a.jsx("br",{}),"This work is funded by NASA. Learn more about NASA Citizen Science Projects by following ",a.jsx(ct,{href:"https://science.nasa.gov/citizen-science/",children:" this link"}),"."]}),a.jsxs("p",{children:[a.jsx(xt,{src:"https://thumbnails.zooniverse.org/50x/panoptes-uploads.zooniverse.org/project_attached_image/e0b1e0ef-d0f8-4ae8-846e-31cf47dc3556.png",$loaded:D,onLoad:()=>G(!0)}),a.jsx("br",{}),"This project makes use of Q1 data from European Space Agency's Euclid mission; learn more by following ",a.jsx(ct,{href:"https://www.cosmos.esa.int/web/euclid/euclid-q1-data-release",children:" this link"}),"."]}),a.jsxs("p",{children:[a.jsx(xt,{src:"https://thumbnails.zooniverse.org/50x/panoptes-uploads.zooniverse.org/project_attached_image/46278779-bb06-4747-91f9-1e8ea5dd749b.png",$loaded:O,onLoad:()=>E(!0)}),a.jsx(xt,{src:"https://thumbnails.zooniverse.org/200x/panoptes-uploads.zooniverse.org/project_attached_image/1817f12b-3dca-4d2b-bb7d-ccc18f882751.png",$loaded:C,onLoad:()=>_(!0)}),a.jsx("br",{}),"ELSA: Euclid Legacy Science Advanced analysis tools (Grant Agreement no. 101135203) is funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or Innovate UK. Neither the European Union nor the granting authority can be held responsible for them. UK participation is funded through the UK Horizon guarantee scheme under Innovate UK grant 10093177."]}),a.jsxs("p",{children:[a.jsx(xt,{src:"https://thumbnails.zooniverse.org/50x/panoptes-uploads.zooniverse.org/project_attached_image/6ccd5c0e-1edf-40c0-aac4-db826b04bbcb.png",$loaded:K,onLoad:()=>ne(!0)}),a.jsx("br",{}),"We acknowledge partial support from NSF award OAC 2513443."]})]})]})}Xs(document.getElementById("root")).render(a.jsx(d.StrictMode,{children:a.jsx(mr,{children:a.jsx($c,{})})}));
