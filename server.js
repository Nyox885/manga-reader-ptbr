const http = require("http");
const { URL } = require("url");

const PORT = process.env.PORT || 3000;

const HTML = `<!DOCTYPE html>
<html lang="pt-BR" data-theme="dark">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover,maximum-scale=5"/>
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
<meta name="theme-color" content="#0c0c0e"/>
<title>MangaBR — Leitor de Mangás PT-BR</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"/>
<style>
:root{--bg:#0c0c0e;--sf:#151519;--sf2:#1e1e24;--bd:rgba(255,255,255,.08);--tx:#f4f4f6;--mu:#9b9ba8;--ac:#e11d48;--as:rgba(225,29,72,.14);--st:env(safe-area-inset-top,0px);--sb:env(safe-area-inset-bottom,0px)}
[data-theme=light]{--bg:#f6f6f8;--sf:#fff;--sf2:#eceef2;--bd:rgba(15,23,42,.09);--tx:#111115;--mu:#646473;--as:rgba(225,29,72,.1)}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{margin:0;padding:0;background:var(--bg);color:var(--tx);font-family:'Inter',-apple-system,sans-serif;font-size:15px;overflow-x:hidden}
.hidden{display:none!important}
button{font-family:inherit;cursor:pointer;border:none;background:none;color:inherit}
.top-header{position:sticky;top:0;z-index:30;padding-top:var(--st);background:var(--bg);border-bottom:1px solid var(--bd)}
.header-inner{height:56px;max-width:960px;margin:0 auto;padding:0 16px;display:flex;align-items:center;justify-content:space-between}
.brand{display:flex;align-items:center;gap:10px;cursor:pointer}
.brand-mark{width:34px;height:34px;border-radius:10px;background:var(--ac);color:#fff;font-weight:800;font-size:18px;display:grid;place-items:center}
.brand-name{font-weight:800;font-size:18px}
.brand-sub{font-size:11px;font-weight:700;color:var(--ac);background:var(--as);padding:2px 6px;border-radius:6px}
.icon-btn{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;background:var(--sf);border:1px solid var(--bd)}
.main-content{max-width:960px;margin:0 auto;padding:16px 16px calc(78px + var(--sb))}
.section{margin-bottom:26px}
.section-title{margin:0 0 12px;font-size:18px;font-weight:700}
.continue-banner{display:flex;align-items:center;gap:14px;background:var(--sf);border:1px solid var(--bd);border-radius:14px;padding:12px;cursor:pointer}
.continue-cover{width:54px;height:76px;border-radius:8px;object-fit:cover;background:var(--sf2);flex-shrink:0}
.continue-info{flex:1;min-width:0}
.continue-label{font-size:11px;font-weight:700;color:var(--ac);text-transform:uppercase}
.continue-title{font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.continue-chap{font-size:13px;color:var(--mu)}
.continue-cta{background:var(--ac);color:#fff;padding:8px 14px;border-radius:10px;font-size:13px;font-weight:600;flex-shrink:0}
.horizontal-list{display:flex;gap:12px;overflow-x:auto;padding-bottom:6px;scrollbar-width:none}
.horizontal-list::-webkit-scrollbar{display:none}
.horizontal-list .manga-card{flex:0 0 132px}
.manga-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
@media(min-width:600px){.manga-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}}
@media(min-width:840px){.manga-grid{grid-template-columns:repeat(5,minmax(0,1fr))}}
.manga-card{display:flex;flex-direction:column;gap:6px;cursor:pointer;min-width:0}
.manga-cover-wrap{position:relative;aspect-ratio:2/3;border-radius:10px;overflow:hidden;background:var(--sf2);border:1px solid var(--bd)}
.manga-cover{width:100%;height:100%;object-fit:cover;display:block}
.manga-badge{position:absolute;top:6px;left:6px;background:rgba(12,12,14,.82);color:#fff;font-size:10px;font-weight:700;padding:2px 6px;border-radius:5px}
.manga-title{font-size:13px;font-weight:600;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-break:break-word}
.manga-meta{font-size:11px;color:var(--mu)}
.btn-secondary{background:var(--sf);border:1px solid var(--bd);padding:11px 22px;border-radius:12px;font-size:14px;font-weight:600;margin:18px auto 0;display:block}
.search-bar{display:flex;align-items:center;gap:8px;background:var(--sf);border:1px solid var(--bd);border-radius:14px;padding:0 12px;height:46px}
.search-bar input{flex:1;border:none;background:none;color:var(--tx);font-size:15px;outline:none;min-width:0}
.chips-row{display:flex;gap:8px;overflow-x:auto;padding:10px 0;scrollbar-width:none}
.chips-row::-webkit-scrollbar{display:none}
.chip{flex-shrink:0;padding:6px 13px;border-radius:999px;font-size:13px;background:var(--sf);border:1px solid var(--bd);color:var(--mu)}
.chip.active{background:var(--ac);border-color:var(--ac);color:#fff;font-weight:600}
.status-text{font-size:13px;color:var(--mu);margin:8px 0 12px}
.library-tabs{display:flex;gap:8px;background:var(--sf);padding:4px;border-radius:12px;border:1px solid var(--bd);margin-bottom:16px}
.tab-btn{flex:1;padding:9px;border-radius:9px;font-size:14px;font-weight:600;color:var(--mu)}
.tab-btn.active{background:var(--sf2);color:var(--tx)}
.pill-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:999px;background:var(--sf);border:1px solid var(--bd);font-size:14px;font-weight:600}
.detail-hero{display:flex;gap:14px;margin:14px 0 18px;align-items:flex-start}
.detail-cover{width:112px;height:164px;border-radius:10px;object-fit:cover;background:var(--sf2);flex-shrink:0}
.detail-meta{flex:1;min-width:0}
.detail-title{margin:0 0 6px;font-size:19px;font-weight:800;line-height:1.25;word-break:break-word}
.detail-author{font-size:13px;color:var(--mu);margin-bottom:8px}
.detail-tags{display:flex;flex-wrap:wrap;gap:6px}
.tag-pill{font-size:11px;font-weight:600;padding:3px 8px;border-radius:6px;background:var(--sf2);color:var(--mu)}
.detail-actions{display:flex;gap:10px;margin-bottom:16px}
.btn-primary{flex:1;background:var(--ac);color:#fff;padding:12px 16px;border-radius:12px;font-size:15px;font-weight:700;text-align:center}
.btn-primary:disabled{opacity:.45}
.btn-fav{padding:12px 16px;border-radius:12px;background:var(--sf);border:1px solid var(--bd);font-size:14px;font-weight:600;flex-shrink:0}
.btn-fav.saved{border-color:var(--ac);color:var(--ac);background:var(--as)}
.detail-desc{font-size:14px;color:var(--mu);line-height:1.55;margin-bottom:20px;word-break:break-word}
.chapters-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;gap:8px}
.chapters-list{display:flex;flex-direction:column;gap:8px}
.chapter-item{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px;background:var(--sf);border:1px solid var(--bd);border-radius:12px;text-align:left;width:100%}
.chapter-item.read{opacity:.55}
.chapter-info{flex:1;min-width:0}
.chapter-num{font-weight:700;font-size:14px;word-break:break-word}
.chapter-sub{font-size:12px;color:var(--mu);margin-top:2px}
.chapter-badge{font-size:11px;font-weight:700;color:var(--ac);background:var(--as);padding:3px 8px;border-radius:6px;flex-shrink:0}
.bottom-nav{position:fixed;bottom:0;left:0;right:0;z-index:30;height:calc(62px + var(--sb));padding-bottom:var(--sb);background:var(--bg);border-top:1px solid var(--bd);display:flex;justify-content:space-around}
.nav-item{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;color:var(--mu);font-size:11px;font-weight:600}
.nav-item.active{color:var(--ac)}
.reader-overlay{position:fixed;inset:0;z-index:100;background:#000;color:#fff;display:flex;flex-direction:column}
.reader-hud{position:fixed;left:0;right:0;z-index:110;background:rgba(12,12,14,.92);transition:transform .2s,opacity .2s}
.reader-hud.hud-hidden.reader-top{transform:translateY(-100%);opacity:0;pointer-events:none}
.reader-hud.hud-hidden.reader-bottom{transform:translateY(100%);opacity:0;pointer-events:none}
.reader-top{top:0;padding:calc(var(--st) + 8px) 12px 10px;display:flex;align-items:center;gap:10px}
.reader-icon-btn{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;background:rgba(255,255,255,.12);flex-shrink:0}
.reader-title-wrap{flex:1;min-width:0}
.reader-manga-title{font-size:14px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.reader-chapter-title{font-size:12px;color:#a1a1aa}
.reader-settings{position:fixed;top:calc(var(--st) + 60px);right:12px;left:12px;max-width:340px;margin-left:auto;z-index:120;background:#18181c;border:1px solid rgba(255,255,255,.14);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:12px}
.setting-row{display:flex;align-items:center;justify-content:space-between;font-size:13px;font-weight:600}
.segmented{display:flex;background:#0c0c0e;padding:3px;border-radius:9px}
.seg-btn{padding:6px 11px;border-radius:7px;font-size:12px;font-weight:600;color:#a1a1aa}
.seg-btn.active{background:var(--ac);color:#fff}
.reader-stage{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch}
.reader-loading{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#a1a1aa;padding:24px;text-align:center;gap:12px}
.reader-pages.mode-vertical{display:flex;flex-direction:column;align-items:center;max-width:800px;margin:0 auto;padding:56px 0 90px}
.reader-pages.mode-vertical img{width:100%;height:auto;display:block;min-height:180px;background:#111}
.reader-pages.mode-paged{height:100%;display:flex;align-items:center;justify-content:center;padding:56px 0 68px}
.reader-pages.mode-paged img{max-width:100%;max-height:100%;object-fit:contain}
.reader-bottom{bottom:0;padding:10px 14px calc(var(--sb) + 10px);display:flex;align-items:center;justify-content:space-between}
.reader-nav-btn{padding:8px 12px;border-radius:9px;background:rgba(255,255,255,.12);font-size:13px;font-weight:600}
.reader-nav-btn:disabled{opacity:.35;pointer-events:none}
.toast{position:fixed;bottom:calc(78px + var(--sb));left:50%;transform:translateX(-50%);background:var(--sf2);color:var(--tx);border:1px solid var(--bd);padding:10px 16px;border-radius:999px;font-size:13px;font-weight:600;z-index:200}
</style>
</head>
<body>
<header class="top-header"><div class="header-inner">
  <div class="brand" id="brand-home"><span class="brand-mark">漫</span><span class="brand-name">MangaBR</span><span class="brand-sub">PT-BR</span></div>
  <button id="theme-toggle" class="icon-btn" type="button">🌓</button>
</div></header>
<main class="main-content">
  <section id="view-home" class="view">
    <div id="continue-reading-slot" class="section hidden"></div>
    <div class="section"><h1 class="section-title">Populares em Português</h1><div id="popular-carousel" class="horizontal-list"><p class="status-text">Carregando...</p></div></div>
    <div class="section"><h2 class="section-title">Atualizados Recentemente</h2><div id="recent-grid" class="manga-grid"></div><button id="btn-load-more" class="btn-secondary hidden" type="button">Carregar mais</button></div>
  </section>
  <section id="view-search" class="view hidden">
    <form id="search-form" class="search-bar"><input id="search-input" type="search" placeholder="Buscar mangá..." enterkeyhint="search"/><button id="search-clear" class="hidden" type="button">✕</button></form>
    <div id="genre-chips" class="chips-row">
      <button class="chip active" data-tag="" type="button">Todos</button>
      <button class="chip" data-tag="391b0423-d847-456f-aff0-8b0cfc03066b" type="button">Ação</button>
      <button class="chip" data-tag="cdc58593-87dd-415e-bbc0-2aef27bf404e" type="button">Fantasia</button>
      <button class="chip" data-tag="423e2eae-a7a2-4a8b-ac03-a8351462d71d" type="button">Romance</button>
      <button class="chip" data-tag="4d32cc48-9f00-4cca-9b5a-a839f0764984" type="button">Comédia</button>
      <button class="chip" data-tag="ace04997-f6bd-436e-b261-779182193d3d" type="button">Isekai</button>
      <button class="chip" data-tag="b9af3a63-f058-46de-a9a0-e0c13906197a" type="button">Drama</button>
    </div>
    <div id="search-status" class="status-text"></div>
    <div id="search-results" class="manga-grid"></div>
  </section>
  <section id="view-library" class="view hidden">
    <div class="library-tabs"><button class="tab-btn active" data-lib-tab="favorites" type="button">Favoritos</button><button class="tab-btn" data-lib-tab="history" type="button">Histórico</button></div>
    <div id="library-content" class="manga-grid"></div>
    <p id="library-empty" class="status-text hidden"></p>
  </section>
  <section id="view-detail" class="view hidden">
    <button id="detail-back" class="pill-btn" type="button">← Voltar</button>
    <div id="detail-body"></div>
  </section>
</main>
<nav class="bottom-nav">
  <button class="nav-item active" data-tab="home" type="button"><span>🏠</span><span>Início</span></button>
  <button class="nav-item" data-tab="search" type="button"><span>🔍</span><span>Buscar</span></button>
  <button class="nav-item" data-tab="library" type="button"><span>📚</span><span>Biblioteca</span></button>
</nav>
<div id="reader-overlay" class="reader-overlay hidden">
  <header id="reader-top" class="reader-hud reader-top">
    <button id="reader-close" class="reader-icon-btn" type="button">←</button>
    <div class="reader-title-wrap"><div id="reader-manga-title" class="reader-manga-title"></div><div id="reader-chapter-title" class="reader-chapter-title"></div></div>
    <button id="reader-settings-btn" class="reader-icon-btn" type="button">⚙️</button>
  </header>
  <div id="reader-settings-panel" class="reader-settings hidden">
    <div class="setting-row"><span>Modo</span><div class="segmented"><button class="seg-btn active" data-mode="vertical" type="button">Webtoon</button><button class="seg-btn" data-mode="paged" type="button">Página</button></div></div>
    <div class="setting-row"><span>Qualidade</span><div class="segmented"><button class="seg-btn active" data-quality="data" type="button">Normal</button><button class="seg-btn" data-quality="dataSaver" type="button">Econômica</button></div></div>
  </div>
  <div id="reader-stage" class="reader-stage"><div id="reader-loading" class="reader-loading">Carregando páginas...</div><div id="reader-pages" class="reader-pages"></div></div>
  <footer id="reader-bottom" class="reader-hud reader-bottom">
    <button id="reader-prev-chap" class="reader-nav-btn" type="button">← Anterior</button>
    <span id="reader-page-counter">1/1</span>
    <button id="reader-next-chap" class="reader-nav-btn" type="button">Próximo →</button>
  </footer>
</div>
<div id="toast" class="toast hidden"></div>
<script>
const K={TH:"mbr_th",FAV:"mbr_fav",HIS:"mbr_his",READ:"mbr_read",MODE:"mbr_mode",QUAL:"mbr_qual"};
const S={tab:"home",prev:"home",off:0,load:false,q:"",tag:"",lib:"favorites",manga:null,chaps:[],desc:true,r:{idx:-1,pages:[],fallbacks:[],pg:0,mode:localStorage.getItem(K.MODE)||"vertical",qual:localStorage.getItem(K.QUAL)||"data",hud:true}};
const $=id=>document.getElementById(id);
const gJ=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch{return d}};
const sJ=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
const api=p=>fetch("/api"+p).then(r=>{if(!r.ok)throw new Error("HTTP "+r.status);return r.json()});
const gTitle=a=>(a.title["pt-br"]||a.title.pt||(a.altTitles||[]).find(x=>x["pt-br"])?.["pt-br"]||a.title.en||a.title["ja-ro"]||Object.values(a.title)[0]||"Sem título");
const gDesc=a=>(a.description["pt-br"]||a.description.pt||a.description.en||"Sinopse não disponível.");
const gCov=(m,sz=256)=>{const c=(m.relationships||[]).find(r=>r.type==="cover_art")?.attributes?.fileName;return c?"/img?url="+encodeURIComponent("https://uploads.mangadex.org/covers/"+m.id+"/"+c+"."+sz+".jpg"):""};
const stMap={ongoing:"Em andamento",completed:"Completo",hiatus:"Hiato",cancelled:"Cancelado"};
function toast(m){const t=$("toast");t.textContent=m;t.classList.remove("hidden");clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.add("hidden"),2200)}
function switchTab(t){if(t!=="detail")S.prev=t;S.tab=t;document.querySelectorAll(".view").forEach(v=>v.classList.add("hidden"));$("view-"+t).classList.remove("hidden");document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.tab===(t==="detail"?S.prev:t)));window.scrollTo(0,0);if(t==="library")renderLib();if(t==="search"&&!$("search-results").children.length)runSearch()}
function mkCard(m,sub=""){const d=document.createElement("div");d.className="manga-card";const t=gTitle(m.attributes),c=gCov(m,256),st=stMap[m.attributes.status]||"";d.innerHTML='<div class="manga-cover-wrap">'+(c?'<img class="manga-cover" src="'+c+'" loading="lazy"/>':'')+(st?'<span class="manga-badge">'+st+'</span>':'')+'</div><div class="manga-title"></div>'+(sub?'<div class="manga-meta"></div>':'');d.querySelector(".manga-title").textContent=t;if(sub)d.querySelector(".manga-meta").textContent=sub;d.onclick=()=>openDetail(m.id,m);return d}
async function loadHome(){
  renderCont();
  try{const d=await api("/manga?limit=12&availableTranslatedLanguage[]=pt-br&includes[]=cover_art&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive");const el=$("popular-carousel");el.innerHTML="";(d.data||[]).forEach(m=>el.appendChild(mkCard(m)))}catch{$("popular-carousel").innerHTML='<p class="status-text">Erro ao carregar populares.</p>'}
  loadRecent(true);
}
async function loadRecent(reset){
  if(S.load)return;S.load=true;if(reset)S.off=0;
  try{const d=await api("/manga?limit=18&offset="+S.off+"&availableTranslatedLanguage[]=pt-br&includes[]=cover_art&order[latestUploadedChapter]=desc&contentRating[]=safe&contentRating[]=suggestive");const g=$("recent-grid");if(reset)g.innerHTML="";const it=d.data||[];it.forEach(m=>g.appendChild(mkCard(m)));S.off+=it.length;$("btn-load-more").classList.toggle("hidden",it.length<18)}catch{}finally{S.load=false}
}
function renderCont(){
  const h=gJ(K.HIS,[]),sl=$("continue-reading-slot");if(!h.length)return sl.classList.add("hidden");
  const l=h[0];sl.classList.remove("hidden");
  sl.innerHTML='<div class="continue-banner"><img class="continue-cover" src="'+(l.cover||"")+'"/><div class="continue-info"><div class="continue-label">Continuar lendo</div><div class="continue-title"></div><div class="continue-chap"></div></div><span class="continue-cta">Ler</span></div>';
  sl.querySelector(".continue-title").textContent=l.title;sl.querySelector(".continue-chap").textContent="Capítulo "+(l.chapterNum||"?");
  sl.firstChild.onclick=()=>openDetail(l.mangaId);
}
async function runSearch(){
  const st=$("search-status"),g=$("search-results");st.textContent="Buscando...";g.innerHTML="";
  const p=new URLSearchParams({limit:"24","order[followedCount]":"desc"});
  p.append("availableTranslatedLanguage[]","pt-br");p.append("includes[]","cover_art");p.append("contentRating[]","safe");p.append("contentRating[]","suggestive");
  if(S.q)p.set("title",S.q);if(S.tag)p.append("includedTags[]",S.tag);
  try{const d=await api("/manga?"+p.toString());const l=d.data||[];st.textContent=l.length?l.length+" resultado(s)":"Nenhum mangá encontrado em PT-BR.";l.forEach(m=>g.appendChild(mkCard(m)))}catch{st.textContent="Erro na busca."}
}
function renderLib(){
  const c=$("library-content"),e=$("library-empty");c.innerHTML="";
  const it=gJ(S.lib==="favorites"?K.FAV:K.HIS,[]);
  if(!it.length){e.classList.remove("hidden");e.textContent=S.lib==="favorites"?"Nenhum favorito ainda.":"Seu histórico aparecerá aqui.";return}
  e.classList.add("hidden");
  it.forEach(x=>{const d=document.createElement("div");d.className="manga-card";d.innerHTML='<div class="manga-cover-wrap">'+(x.cover?'<img class="manga-cover" src="'+x.cover+'" loading="lazy"/>':'')+'</div><div class="manga-title"></div>'+(x.chapterNum?'<div class="manga-meta">Cap. '+x.chapterNum+'</div>':'');d.querySelector(".manga-title").textContent=x.title;d.onclick=()=>openDetail(x.mangaId);c.appendChild(d)});
}
async function fetchAllChapters(id){
  let all=[],offset=0,total=1;
  while(offset<total&&offset<2000){
    const f=await api("/manga/"+id+"/feed?translatedLanguage[]=pt-br&translatedLanguage[]=pt&order[chapter]=desc&limit=500&offset="+offset+"&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&includes[]=scanlation_group");
    const batch=f.data||[];
    all=all.concat(batch);
    total=f.total||batch.length;
    if(batch.length<500)break;
    offset+=500;
  }
  return all.filter(c=>c.attributes.pages>0||c.attributes.externalUrl);
}
async function openDetail(id,cached){
  switchTab("detail");$("detail-body").innerHTML='<p class="status-text">Carregando capítulos em português...</p>';
  try{
    let m=cached;if(!m||!m.relationships?.some(r=>r.type==="author"))m=(await api("/manga/"+id+"?includes[]=cover_art&includes[]=author")).data;
    S.manga=m;
    S.chaps=await fetchAllChapters(id);
    renderDetail();
  }catch{$("detail-body").innerHTML='<p class="status-text">Erro ao carregar detalhes.</p>'}
}
function renderDetail(){
  const m=S.manga,t=gTitle(m.attributes),ds=gDesc(m.attributes),cv=gCov(m,512);
  const au=(m.relationships||[]).find(r=>r.type==="author")?.attributes?.name||"Autor desconhecido";
  const tags=(m.attributes.tags||[]).slice(0,5).map(x=>x.attributes?.name?.["pt-br"]||x.attributes?.name?.en).filter(Boolean);
  const fav=gJ(K.FAV,[]).some(f=>f.mangaId===m.id),rd=new Set(gJ(K.READ,[]));
  S.chaps.sort((a,b)=>S.desc?(parseFloat(b.attributes.chapter)||0)-(parseFloat(a.attributes.chapter)||0):(parseFloat(a.attributes.chapter)||0)-(parseFloat(b.attributes.chapter)||0));
  const firstIdx=S.chaps.findIndex(c=>c.attributes.pages>0);
  const startIdx=S.desc?[...S.chaps].reverse().findIndex(c=>c.attributes.pages>0):-1;
  const playIdx=S.desc?(startIdx>=0?S.chaps.length-1-startIdx:0):(firstIdx>=0?firstIdx:0);
  const b=$("detail-body");
  b.innerHTML='<div class="detail-hero"><img class="detail-cover" src="'+cv+'"/><div class="detail-meta"><h1 class="detail-title"></h1><div class="detail-author"></div><div class="detail-tags">'+tags.map(x=>'<span class="tag-pill">'+x+'</span>').join("")+'</div></div></div><div class="detail-actions"><button id="btn-read" class="btn-primary" type="button">'+(S.chaps.length?"Ler agora":"Sem capítulos PT-BR")+'</button><button id="btn-fav" class="btn-fav '+(fav?"saved":"")+'" type="button">'+(fav?"♥ Salvo":"♡ Favoritar")+'</button></div><div class="detail-desc"></div><div class="chapters-header"><h2 class="section-title" style="margin:0">Capítulos ('+S.chaps.length+')</h2><button id="btn-sort" class="pill-btn" type="button">'+(S.desc?"Recentes ↓":"Cap. 1 ↑")+'</button></div><div id="ch-list" class="chapters-list"></div>';
  b.querySelector(".detail-title").textContent=t;b.querySelector(".detail-author").textContent=au+" • "+(stMap[m.attributes.status]||"");b.querySelector(".detail-desc").textContent=ds;
  $("btn-fav").onclick=()=>{const fv=gJ(K.FAV,[]),i=fv.findIndex(x=>x.mangaId===m.id);if(i>=0){fv.splice(i,1);toast("Removido")}else{fv.unshift({mangaId:m.id,title:t,cover:gCov(m,256)});toast("Salvo!")}sJ(K.FAV,fv);renderDetail()};
  $("btn-sort").onclick=()=>{S.desc=!S.desc;renderDetail()};
  if(S.chaps.length)$("btn-read").onclick=()=>openChap(playIdx);else $("btn-read").disabled=true;
  const cl=$("ch-list");
  S.chaps.forEach((ch,i)=>{
    const btn=document.createElement("button");btn.type="button";btn.className="chapter-item"+(rd.has(ch.id)?" read":"");
    const sc=(ch.relationships||[]).find(r=>r.type==="scanlation_group")?.attributes?.name||"Scan";
    const isExt=ch.attributes.externalUrl&&ch.attributes.pages===0;
    btn.innerHTML='<div class="chapter-info"><div class="chapter-num">Capítulo '+(ch.attributes.chapter||"?")+(ch.attributes.title?" — "+ch.attributes.title:"")+'</div><div class="chapter-sub">'+sc+" • "+(isExt?"Link externo":ch.attributes.pages+" págs")+'</div></div><span class="chapter-badge">'+(isExt?"EXTERNO ↗":ch.attributes.translatedLanguage.toUpperCase())+'</span>';
    btn.onclick=()=>openChap(i);cl.appendChild(btn);
  });
}
function adjIdx(dir){return S.desc?S.r.idx-dir:S.r.idx+dir}
async function openChap(i){
  const ch=S.chaps[i];if(!ch)return;
  if(ch.attributes.externalUrl&&ch.attributes.pages===0){window.location.href=ch.attributes.externalUrl;return}
  S.r.idx=i;S.r.pg=0;$("reader-overlay").classList.remove("hidden");document.body.style.overflow="hidden";setHud(true);
  $("reader-manga-title").textContent=gTitle(S.manga.attributes);$("reader-chapter-title").textContent="Capítulo "+(ch.attributes.chapter||"?");
  const p=adjIdx(-1),n=adjIdx(1);$("reader-prev-chap").disabled=p<0||p>=S.chaps.length;$("reader-next-chap").disabled=n<0||n>=S.chaps.length;
  $("reader-loading").classList.remove("hidden");$("reader-loading").textContent="Carregando páginas...";$("reader-pages").innerHTML="";
  const rl=gJ(K.READ,[]);if(!rl.includes(ch.id)){rl.push(ch.id);sJ(K.READ,rl.slice(-300))}
  const hs=gJ(K.HIS,[]).filter(x=>x.mangaId!==S.manga.id);hs.unshift({mangaId:S.manga.id,title:gTitle(S.manga.attributes),cover:gCov(S.manga,256),chapterNum:ch.attributes.chapter||"?"});sJ(K.HIS,hs.slice(0,40));
  try{
    const sv=await api("/at-home/server/"+ch.id);
    if(!sv.chapter||!sv.baseUrl)throw new Error("Sem servidor");
    const fs=S.r.qual==="dataSaver"&&sv.chapter.dataSaver?.length?sv.chapter.dataSaver:sv.chapter.data;
    const fld=S.r.qual==="dataSaver"?"data-saver":"data";
    S.r.pages=fs.map(f=>"/img?url="+encodeURIComponent(sv.baseUrl+"/"+fld+"/"+sv.chapter.hash+"/"+f));
    S.r.fallbacks=fs.map(f=>"/img?url="+encodeURIComponent("https://uploads.mangadex.org/"+fld+"/"+sv.chapter.hash+"/"+f));
    $("reader-loading").classList.add("hidden");renderPages();
  }catch(err){
    $("reader-loading").innerHTML='<div>Erro ao carregar páginas ('+(err.message||"rede")+').</div><button class="pill-btn" type="button" onclick="openChap('+i+')">Tentar novamente</button>';
  }
}
function mkReaderImg(src,fallback){
  const img=document.createElement("img");
  img.src=src;
  img.onerror=()=>{if(!img.dataset.retried&&fallback){img.dataset.retried="1";img.src=fallback}};
  return img;
}
function renderPages(){
  const c=$("reader-pages"),st=$("reader-stage"),cnt=$("reader-page-counter"),tot=S.r.pages.length;
  c.innerHTML="";c.className="reader-pages mode-"+S.r.mode;st.scrollTop=0;
  if(!tot)return cnt.textContent="0/0";
  if(S.r.mode==="paged"){
    c.appendChild(mkReaderImg(S.r.pages[S.r.pg],S.r.fallbacks[S.r.pg]));cnt.textContent=(S.r.pg+1)+"/"+tot;
    if(S.r.pg+1<tot){new Image().src=S.r.pages[S.r.pg+1]}
  }else{
    cnt.textContent=tot+" págs";
    S.r.pages.forEach((src,i)=>c.appendChild(mkReaderImg(src,S.r.fallbacks[i])));
    const n=adjIdx(1);if(n>=0&&n<S.chaps.length){const b=document.createElement("button");b.className="btn-primary";b.style.margin="24px 0 40px";b.textContent="Próximo Capítulo →";b.onclick=()=>openChap(n);c.appendChild(b)}
  }
}
function setHud(v){S.r.hud=typeof v==="boolean"?v:!S.r.hud;$("reader-top").classList.toggle("hud-hidden",!S.r.hud);$("reader-bottom").classList.toggle("hud-hidden",!S.r.hud)}
document.addEventListener("DOMContentLoaded",()=>{
  const th=localStorage.getItem(K.TH)||"dark";document.documentElement.setAttribute("data-theme",th);
  $("theme-toggle").onclick=()=>{const n=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",n);localStorage.setItem(K.TH,n)};
  document.querySelectorAll(".nav-item").forEach(b=>b.onclick=()=>switchTab(b.dataset.tab));
  $("brand-home").onclick=()=>switchTab("home");$("detail-back").onclick=()=>switchTab(S.prev);$("btn-load-more").onclick=()=>loadRecent(false);
  let db;$("search-form").onsubmit=e=>{e.preventDefault();$("search-input").blur();runSearch()};
  $("search-input").oninput=()=>{S.q=$("search-input").value.trim();$("search-clear").classList.toggle("hidden",!S.q);clearTimeout(db);db=setTimeout(runSearch,450)};
  $("search-clear").onclick=()=>{$("search-input").value="";S.q="";$("search-clear").classList.add("hidden");runSearch()};
  document.querySelectorAll("#genre-chips .chip").forEach(c=>c.onclick=()=>{document.querySelectorAll("#genre-chips .chip").forEach(x=>x.classList.remove("active"));c.classList.add("active");S.tag=c.dataset.tag;runSearch()});
  document.querySelectorAll(".tab-btn[data-lib-tab]").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tab-btn[data-lib-tab]").forEach(x=>x.classList.remove("active"));b.classList.add("active");S.lib=b.dataset.libTab;renderLib()});
  $("reader-close").onclick=()=>{$("reader-overlay").classList.add("hidden");$("reader-settings-panel").classList.add("hidden");document.body.style.overflow="";renderCont();if(S.tab==="detail")renderDetail()};
  $("reader-settings-btn").onclick=e=>{e.stopPropagation();$("reader-settings-panel").classList.toggle("hidden")};
  document.querySelectorAll(".seg-btn[data-mode]").forEach(b=>{b.classList.toggle("active",b.dataset.mode===S.r.mode);b.onclick=()=>{S.r.mode=b.dataset.mode;localStorage.setItem(K.MODE,S.r.mode);document.querySelectorAll(".seg-btn[data-mode]").forEach(x=>x.classList.toggle("active",x===b));renderPages()}});
  document.querySelectorAll(".seg-btn[data-quality]").forEach(b=>{b.classList.toggle("active",b.dataset.quality===S.r.qual);b.onclick=()=>{S.r.qual=b.dataset.quality;localStorage.setItem(K.QUAL,S.r.qual);document.querySelectorAll(".seg-btn[data-quality]").forEach(x=>x.classList.toggle("active",x===b));openChap(S.r.idx)}});
  $("reader-prev-chap").onclick=()=>openChap(adjIdx(-1));$("reader-next-chap").onclick=()=>openChap(adjIdx(1));
  $("reader-stage").onclick=e=>{$("reader-settings-panel").classList.add("hidden");if(e.target.closest("button"))return;if(S.r.mode==="paged"){const w=window.innerWidth,x=e.clientX;if(x<w*.28){if(S.r.pg>0){S.r.pg--;renderPages()}return}if(x>w*.72){if(S.r.pg<S.r.pages.length-1){S.r.pg++;renderPages()}else openChap(adjIdx(1));return}}setHud()};
  loadHome();
});
</script>
</body>
</html>`;

function isAllowedImageHost(h) {
  return h === "uploads.mangadex.org" || h.endsWith(".mangadex.org") || h.endsWith(".mangadex.network");
}

async function handleApiProxy(res, u) {
  try {
    const r = await fetch("https://api.mangadex.org" + u.pathname.replace(/^\/api/, "") + u.search, {
      headers: { "User-Agent": "MangaBR-Reader/1.0", Accept: "application/json" }
    });
    const b = Buffer.from(await r.arrayBuffer());
    res.writeHead(r.status, {
      "Content-Type": r.headers.get("content-type") || "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=120"
    });
    res.end(b);
  } catch (e) {
    res.writeHead(502, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: e.message }));
  }
}

async function handleImageProxy(res, u) {
  const s = u.searchParams.get("url");
  if (!s) { res.writeHead(400); return res.end("Missing url"); }
  let img;
  try { img = new URL(s); } catch { res.writeHead(400); return res.end("Invalid url"); }
  if (img.protocol !== "https:" || !isAllowedImageHost(img.hostname)) { res.writeHead(403); return res.end("Forbidden"); }
  try {
    const r = await fetch(img.toString(), {
      headers: { "User-Agent": "MangaBR-Reader/1.0", Referer: "https://mangadex.org/" }
    });
    if (!r.ok) { res.writeHead(r.status); return res.end("Image error"); }
    const b = Buffer.from(await r.arrayBuffer());
    res.writeHead(200, {
      "Content-Type": r.headers.get("content-type") || "image/jpeg",
      "Cache-Control": "public, max-age=86400",
      "Access-Control-Allow-Origin": "*"
    });
    res.end(b);
  } catch {
    res.writeHead(502);
    res.end("Proxy error");
  }
}

http.createServer((req, res) => {
  const u = new URL(req.url, "http://localhost:" + PORT);
  if (u.pathname.startsWith("/api/")) return handleApiProxy(res, u);
  if (u.pathname === "/img") return handleImageProxy(res, u);
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(HTML);
}).listen(PORT, "0.0.0.0", () => console.log("MangaBR running on " + PORT));
