/* ============ STATE ============ */
const LS="reelverdict.v1";
let S = {genres:[],themes:[],langs:[],decades:[],moods:[],runtime:null,minScore:null,
         sort:"rel", aiIds:null, aiWhy:{}, aiNote:"", view:"browse", listTab:"want"};
let U = {want:[], seen:{}}; // seen: {id: rating 1-5}
try{ const s=localStorage.getItem(LS); if(s) U=Object.assign(U,JSON.parse(s)); }catch(e){}
function save(){ try{ localStorage.setItem(LS,JSON.stringify(U)); }catch(e){} }

const uniq=a=>[...new Set(a)];
const GENRES = uniq(MOVIES.flatMap(m=>m.g)).sort();
const LANGS  = uniq(MOVIES.map(m=>m.lang)).sort((a,b)=>
  MOVIES.filter(m=>m.lang===b).length - MOVIES.filter(m=>m.lang===a).length);
const THEMES = uniq(MOVIES.flatMap(m=>m.th))
  .filter(t=>MOVIES.filter(m=>m.th.includes(t)).length>1).sort();
const MOODS = ["dark","tense","feelgood","funny","sad","thoughtful","epic","romantic","weird","cozy","adrenaline"];
const DECADES = ["2020s","2010s","2000s","1990s","Pre-1990"];

/* ============ POSTER ART ============ */
function hash(s){let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h}

/* palettes: [deep, mid, accent, titleColor] */
const PALS={
  horror:["#050306","#2A0508","#D01A25","#F0E3E3"],
  scifi:["#03060F","#0B2540","#5AD4E6","#EAF4F7"],
  romance:["#1A0610","#63183A","#F0A8B4","#FFF0F2"],
  crime:["#070608","#241C22","#C9A227","#F2EDE2"],
  comedy:["#130903","#6A3310","#F0B429","#FFF6E2"],
  drama:["#09080C","#2E2836","#C9BCC3","#F4EFEA"],
  action:["#0C0406","#59101A","#FF6B2C","#FFF1E8"],
  family:["#03141B","#0F5065","#FFD166","#F2FAFD"],
  war:["#080806","#2E2E1E","#B8A46A","#F0EDE0"],
  fantasy:["#0A0418","#3A1560","#B98CF0","#F4EEFF"]
};
function palOf(m){
  const g=m.g.join(",").toLowerCase(), th=m.th.join(",");
  if(/horror/.test(g))return PALS.horror;
  if(/animation|family/.test(g))return PALS.family;
  if(/war|history/.test(g))return PALS.war;
  if(/sci-fi/.test(g))return PALS.scifi;
  if(/fantasy/.test(g))return PALS.fantasy;
  if(/romance/.test(g))return PALS.romance;
  if(/action|sport/.test(g))return PALS.action;
  if(/crime|thriller|mystery/.test(g))return PALS.crime;
  if(/comedy/.test(g))return PALS.comedy;
  return PALS.drama;
}
/* composition templates, viewBox 200x300 */
const ART={
  // lone figure with long shadow
  figure:(c,h)=>`<rect width="200" height="300" fill="url(#g${h})"/>
    <ellipse cx="100" cy="196" rx="86" ry="10" fill="#000" opacity=".5"/>
    <path d="M100 196 L72 300 L128 300 Z" fill="#000" opacity=".55"/>
    <g fill="#000" opacity=".9"><circle cx="100" cy="128" r="9"/>
    <path d="M91 140 h18 l7 40 -8 2 -3 -22 -2 36 h-16 l-2 -36 -3 22 -8 -2 z"/></g>`,
  // eclipse / sun disc
  eclipse:(c,h)=>`<rect width="200" height="300" fill="url(#g${h})"/>
    <circle cx="100" cy="118" r="58" fill="none" stroke="${c[2]}" stroke-width="1.5" opacity=".55"/>
    <circle cx="100" cy="118" r="44" fill="${c[2]}" opacity=".26"/>
    <circle cx="100" cy="118" r="44" fill="url(#r${h})"/>
    <rect y="150" width="200" height="150" fill="#000" opacity=".4"/>
    <path d="M0 176 Q50 160 100 172 T200 166 V300 H0 Z" fill="#000" opacity=".75"/>`,
  // diagonal split, two faces
  split:(c,h)=>`<rect width="200" height="300" fill="${c[0]}"/>
    <path d="M0 0 H200 V300 Z" fill="${c[1]}"/>
    <path d="M0 0 H200 V300 Z" fill="url(#g${h})" opacity=".6"/>
    <path d="M200 0 L0 300" stroke="${c[2]}" stroke-width="1.2" opacity=".65"/>
    <g fill="#000" opacity=".62">
      <path d="M22 132 q22 -30 44 0 q6 34 -22 46 q-28 -12 -22 -46z"/>
      <path d="M134 108 q22 -30 44 0 q6 34 -22 46 q-28 -12 -22 -46z"/></g>`,
  // radial burst
  burst:(c,h)=>`<rect width="200" height="300" fill="url(#g${h})"/>
    <g stroke="${c[2]}" stroke-width="1" opacity=".3">${
      Array.from({length:18},(_,i)=>{const a=i*20*Math.PI/180;
      return `<line x1="100" y1="132" x2="${100+Math.cos(a)*220}" y2="${132+Math.sin(a)*220}"/>`}).join("")}</g>
    <circle cx="100" cy="132" r="34" fill="${c[2]}" opacity=".3"/>
    <path d="M100 100 l9 24 h24 l-19 15 8 25 -22 -15 -22 15 8 -25 -19 -15 h24z" fill="${c[3]}" opacity=".8"/>
    <rect y="170" width="200" height="130" fill="#000" opacity=".45"/>`,
  // lit doorway in the dark
  door:(c,h)=>`<rect width="200" height="300" fill="${c[0]}"/>
    <rect x="72" y="74" width="56" height="112" fill="${c[2]}" opacity=".85"/>
    <rect x="72" y="74" width="56" height="112" fill="url(#r${h})"/>
    <path d="M72 186 L34 300 H166 L128 186 Z" fill="${c[2]}" opacity=".16"/>
    <path d="M96 96 h8 v90 h-8z" fill="#000" opacity=".5"/>
    <rect width="200" height="300" fill="url(#v${h})"/>`,
  // two figures facing
  duo:(c,h)=>`<rect width="200" height="300" fill="url(#g${h})"/>
    <circle cx="100" cy="112" r="52" fill="${c[2]}" opacity=".2"/>
    <g fill="#000" opacity=".78">
      <path d="M62 104 q18 -26 36 0 q4 30 -18 40 q-22 -10 -18 -40z"/>
      <path d="M138 104 q-18 -26 -36 0 q-4 30 18 40 q22 -10 18 -40z"/></g>
    <rect y="152" width="200" height="148" fill="#000" opacity=".42"/>`,
  // city skyline
  city:(c,h)=>`<rect width="200" height="300" fill="url(#g${h})"/>
    <circle cx="146" cy="70" r="20" fill="${c[2]}" opacity=".5"/>
    <g fill="#000" opacity=".82">${
      [[0,150,26],[26,122,40],[66,166,30],[96,104,54],[150,140,30],[180,170,20]]
      .map(([x,y,w])=>`<rect x="${x}" y="${y}" width="${w}" height="${300-y}"/>`).join("")}</g>
    <g fill="${c[2]}" opacity=".55">${
      Array.from({length:22},(_,i)=>`<rect x="${8+(i*17)%180}" y="${140+((i*37)%110)}" width="3" height="4"/>`).join("")}</g>`,
  // horizontal bands
  bands:(c,h)=>`<rect width="200" height="300" fill="${c[1]}"/>
    ${Array.from({length:7},(_,i)=>`<rect y="${i*44}" width="200" height="22" fill="${i%2?c[2]:c[0]}" opacity="${i%2?.5:.85}"/>`).join("")}
    <circle cx="100" cy="122" r="46" fill="${c[0]}" opacity=".9"/>
    <circle cx="100" cy="122" r="46" fill="url(#r${h})"/>
    <rect y="188" width="200" height="112" fill="#000" opacity=".55"/>`
};
function tmplOf(m){
  const g=m.g.join(",").toLowerCase(), th=m.th.join(",");
  if(/horror/.test(g)) return /haunting|cult|monster/.test(th)?"door":"figure";
  if(/romance/.test(g)) return "duo";
  if(/sci-fi|fantasy/.test(g)) return /space|multiverse|time-loop|aliens/.test(th)?"eclipse":"burst";
  if(/action|sport/.test(g)) return "burst";
  if(/crime/.test(g)) return /gangster|city|slum/.test(th)?"city":"split";
  if(/thriller|mystery/.test(g)) return "split";
  if(/comedy/.test(g)) return "bands";
  if(/animation|family/.test(g)) return "eclipse";
  if(/war|history/.test(g)) return "figure";
  return hash(m.t)%2 ? "figure":"eclipse";
}
function posterArt(m){
  const c=palOf(m), h=m.id, t=tmplOf(m);
  return `<svg class="art" viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="g${h}" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[0]}"/></linearGradient>
      <radialGradient id="r${h}" cx="0.5" cy="0.4" r="0.6">
        <stop offset="0" stop-color="${c[2]}" stop-opacity=".95"/>
        <stop offset="1" stop-color="${c[2]}" stop-opacity="0"/></radialGradient>
      <radialGradient id="v${h}" cx="0.5" cy="0.42" r="0.75">
        <stop offset="0.35" stop-color="#000" stop-opacity="0"/>
        <stop offset="1" stop-color="#000" stop-opacity=".9"/></radialGradient>
    </defs>${ART[t](c,h)}
    <rect width="200" height="300" fill="url(#v${h})" opacity=".75"/>
  </svg>`;
}
function poster(m, extra=""){
  const c=palOf(m);
  const flag = U.want.includes(m.id) ? `<span class="flag">On your list</span>`
             : (m.id in U.seen ? `<span class="flag seen">Seen</span>` : "");
  const names = m.cast.split(", ").join("   ·   ");
  const L=m.t.length;
  const size = L>26?"1.02em":L>19?"1.22em":L>13?"1.5em":"1.85em";
  return `<div class="poster">
    ${posterArt(m)}<div class="veil"></div>
    <div class="lay">
      <div class="billing">${esc(names)}</div>
      <div>
        <div class="ptitle" style="font-size:${size};color:${c[3]}">${esc(m.t)}</div>
        <div class="ptag">${esc(m.th[0].replace(/-/g," "))}</div>
        <div class="pfoot">A film by ${esc(m.dir.split(",")[0])}<br>${m.y} · ${esc(m.lang)} · ${m.rt} min</div>
      </div>
    </div>
    <span class="score">${m.sc.toFixed(1)}</span>
    ${flag}${extra}
  </div>`;
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}

/* ============ FILTER RAIL ============ */
function chipSet(list, key, label){
  return `<div class="fgroup"><h4>${label}</h4><div class="chips">` +
    list.map(v=>`<button class="chip" data-key="${key}" data-v="${esc(v)}" aria-pressed="false">${esc(v)}</button>`).join("") +
    `</div></div>`;
}
document.getElementById("rail").innerHTML =
  chipSet(GENRES,"genres","Genre") +
  chipSet(MOODS,"moods","Mood") +
  chipSet(LANGS.slice(0,10),"langs","Language") +
  chipSet(DECADES,"decades","Era") +
  `<div class="fgroup"><h4>Runtime</h4><div class="chips">
     <button class="chip" data-key="runtime" data-v="100" aria-pressed="false">Under 100 min</button>
     <button class="chip" data-key="runtime" data-v="130" aria-pressed="false">Under 130 min</button>
     <button class="chip" data-key="runtime" data-v="999" aria-pressed="false">Epic, 150+ min</button>
   </div></div>
   <div class="fgroup"><h4>Rating</h4><div class="chips">
     <button class="chip" data-key="minScore" data-v="8" aria-pressed="false">8.0 and up</button>
     <button class="chip" data-key="minScore" data-v="8.5" aria-pressed="false">8.5 and up</button>
   </div></div>` +
  chipSet(THEMES.slice(0,34),"themes","Theme");

document.getElementById("rail").addEventListener("click",e=>{
  const b=e.target.closest(".chip"); if(!b) return;
  const k=b.dataset.key, v=b.dataset.v;
  if(k==="runtime"||k==="minScore"){
    const on = S[k]===v; S[k]= on?null:v;
    document.querySelectorAll(`.chip[data-key="${k}"]`).forEach(c=>c.setAttribute("aria-pressed","false"));
    b.setAttribute("aria-pressed", on?"false":"true");
  }else{
    const i=S[k].indexOf(v);
    if(i>-1){S[k].splice(i,1); b.setAttribute("aria-pressed","false")}
    else{S[k].push(v); b.setAttribute("aria-pressed","true")}
  }
  render();
});

/* ============ FILTER + RENDER ============ */
function decadeOf(y){ return y>=2020?"2020s":y>=2010?"2010s":y>=2000?"2000s":y>=1990?"1990s":"Pre-1990" }
function filtered(){
  let out = MOVIES.filter(m=>{
    if(S.genres.length && !S.genres.some(g=>m.g.includes(g))) return false;
    if(S.themes.length && !S.themes.some(t=>m.th.includes(t))) return false;
    if(S.moods.length  && !S.moods.some(x=>m.mood.includes(x))) return false;
    if(S.langs.length  && !S.langs.includes(m.lang)) return false;
    if(S.decades.length&& !S.decades.includes(decadeOf(m.y))) return false;
    if(S.runtime){ const r=+S.runtime; if(r===999){ if(m.rt<150) return false } else if(m.rt>=r) return false }
    if(S.minScore && m.sc < +S.minScore) return false;
    if(S.aiIds && !S.aiIds.includes(m.id)) return false;
    return true;
  });
  const s=S.sort;
  if(s==="rating") out.sort((a,b)=>b.sc-a.sc);
  else if(s==="new") out.sort((a,b)=>b.y-a.y);
  else if(s==="old") out.sort((a,b)=>a.y-b.y);
  else if(s==="short") out.sort((a,b)=>a.rt-b.rt);
  else if(S.aiIds) out.sort((a,b)=>S.aiIds.indexOf(a.id)-S.aiIds.indexOf(b.id));
  else out.sort((a,b)=>b.sc-a.sc);
  return out;
}
function cardHTML(m, why){
  return `<button class="card" data-id="${m.id}">
    ${poster(m)}
    <div class="cinfo"><h3>${esc(m.t)}</h3><p>${m.g.join(" · ")} · ${m.rt} min</p>
    ${why?`<p class="why">${esc(why)}</p>`:""}</div></button>`;
}
function render(){
  const list = filtered();
  document.getElementById("n").textContent = list.length;
  document.getElementById("nlabel").textContent = list.length===1?"film":"films";
  const nt=document.getElementById("notice");
  nt.innerHTML = S.aiNote ? `<div class="notice">${S.aiNote}</div>` : "";
  document.getElementById("grid").innerHTML = list.length
    ? list.map(m=>cardHTML(m, S.aiWhy[m.id])).join("")
    : `<div class="empty" style="grid-column:1/-1"><h3>Nothing fits all of that</h3>
       <p>Your filters are cancelling each other out. Drop one and the shelf fills back up.</p></div>`;
  document.getElementById("wlCount").textContent = U.want.length? U.want.length : "";
}
document.getElementById("sort").addEventListener("change",e=>{S.sort=e.target.value;render()});
document.getElementById("clear").addEventListener("click",()=>{
  S={...S, genres:[],themes:[],langs:[],decades:[],moods:[],runtime:null,minScore:null,aiIds:null,aiWhy:{},aiNote:""};
  document.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed","false"));
  document.getElementById("ask").value=""; render();
});

/* ============ DETAIL SHEET ============ */
const scrim=document.getElementById("scrim"), sheet=document.getElementById("sheet");
function similar(m){
  return MOVIES.filter(x=>x.id!==m.id).map(x=>{
    let s=0;
    x.th.forEach(t=>{if(m.th.includes(t))s+=3});
    x.g.forEach(g=>{if(m.g.includes(g))s+=2});
    x.mood.forEach(d=>{if(m.mood.includes(d))s+=1});
    if(x.dir===m.dir)s+=4; if(x.lang===m.lang)s+=1;
    return {x,s};
  }).sort((a,b)=>b.s-a.s).slice(0,5).map(o=>o.x);
}
function openSheet(id){
  const m=MOVIES[id], onList=U.want.includes(id), seen=id in U.seen;
  sheet.innerHTML=`<button class="x" id="closeX" aria-label="Close">&times;</button>
  <div class="head"><div>${poster(m)}</div>
  <div>
    <h2>${esc(m.t)}</h2>
    <p class="credits">${m.y} · ${m.lang} · ${m.rt} min · Directed by ${esc(m.dir)}</p>
    <p style="margin:0 0 10px">${esc(m.syn)}</p>
    <p class="credits">Starring ${esc(m.cast)} · Rated ${m.sc.toFixed(1)}</p>
    <div class="tagrow">${m.g.map(g=>`<span class="tag hot">${esc(g)}</span>`).join("")}
      ${m.th.map(t=>`<span class="tag">${esc(t)}</span>`).join("")}
      ${m.mood.map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div>
    <div class="acts">
      <button id="bWant" class="${onList?"on":""}">${onList?"On your watchlist":"Add to watchlist"}</button>
      <button id="bSeen" class="${seen?"on":""}">${seen?"Seen":"Mark as seen"}</button>
      ${seen?`<span style="display:flex;gap:4px;align-items:center">${
        [1,2,3,4,5].map(r=>`<button class="rate" data-r="${r}" style="padding:8px 11px;${U.seen[m.id]>=r?"color:var(--gold);border-color:var(--gold)":""}">&#9733;</button>`).join("")
      }</span>`:""}
    </div>
  </div></div>
  <div class="simwrap"><h4>If you liked this, try these</h4>
    <div class="simgrid">${similar(m).map(x=>`<button class="card" data-id="${x.id}">${poster(x)}</button>`).join("")}</div>
  </div>`;
  scrim.hidden=false; document.body.style.overflow="hidden";
  document.getElementById("closeX").onclick=closeSheet;
  document.getElementById("bWant").onclick=()=>{
    const i=U.want.indexOf(id); i>-1?U.want.splice(i,1):U.want.push(id); save(); openSheet(id); render(); renderList();
  };
  document.getElementById("bSeen").onclick=()=>{
    if(id in U.seen) delete U.seen[id]; else U.seen[id]=0;
    save(); openSheet(id); render(); renderList(); renderTaste();
  };
  sheet.querySelectorAll(".rate").forEach(b=>b.onclick=()=>{
    U.seen[id]= U.seen[id]===+b.dataset.r ? 0 : +b.dataset.r; save(); openSheet(id); renderTaste();
  });
}
function closeSheet(){scrim.hidden=true;document.body.style.overflow=""}
scrim.addEventListener("click",e=>{if(e.target===scrim)closeSheet()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!scrim.hidden)closeSheet()});
document.addEventListener("click",e=>{
  const c=e.target.closest(".card"); if(c) openSheet(+c.dataset.id);
});

/* ============ AI VIBE SEARCH ============ */
let sampler=null, sampleTried=false;
async function getSampler(){
  if(sampleTried) return sampler;
  sampleTried=true;
  try{ sampler = await window.claude?.use?.("sample") ?? null; }catch(e){ sampler=null }
  return sampler;
}
const CATALOG = MOVIES.map(m=>`${m.id}:${m.t} (${m.y}, ${m.lang}, ${m.rt}min, ${m.g.join("/")}, ${m.th.join("/")}, ${m.mood.join("/")})`).join("\n");

function keywordSearch(q){
  const words = q.toLowerCase().replace(/[^a-z0-9\s]/g," ").split(/\s+/).filter(w=>w.length>2);
  const stop=new Set(["the","and","for","with","but","that","not","something","movie","film","films","movies","like","want","give","watch","some","really","very"]);
  const ws=words.filter(w=>!stop.has(w));
  const scored = MOVIES.map(m=>{
    const hay=(m.t+" "+m.g.join(" ")+" "+m.th.join(" ")+" "+m.mood.join(" ")+" "+m.lang+" "+m.dir+" "+m.syn+" "+m.cast).toLowerCase();
    let s=0; ws.forEach(w=>{ if(hay.includes(w)) s += m.t.toLowerCase().includes(w)?5:2 });
    return {m,s};
  }).filter(o=>o.s>0).sort((a,b)=>b.s-a.s||b.m.sc-a.m.sc).slice(0,24);
  return scored.map(o=>o.m.id);
}

async function vibeSearch(q){
  const btn=document.getElementById("askBtn");
  btn.disabled=true; btn.innerHTML=`<span class="spin"></span>Thinking`;
  S.aiWhy={}; S.aiNote="";
  try{
    const s = await getSampler();
    if(!s) throw new Error("no-sample");
    const out = await s.json([{role:"user",content:
`You are a film curator. From ONLY the catalogue below, choose the 6-10 films that best answer the request. Order them best-first. For each, write "why" as one short sentence (max 18 words) explaining why it matches THIS request specifically — never a generic plot summary.

REQUEST: "${q}"

CATALOGUE (id:title (year, language, runtime, genres, themes, moods)):
${CATALOG}

Reply with JSON only, no markdown fence:
{"picks":[{"id":12,"why":"..."}],"note":"one sentence addressed to the user about how you read their request"}`}],
      {modelTier:"default"});
    const picks=(out?.picks||[]).filter(p=>MOVIES[p.id]);
    if(!picks.length) throw new Error("empty");
    S.aiIds=picks.map(p=>p.id);
    picks.forEach(p=>{S.aiWhy[p.id]=p.why});
    S.aiNote = `<b>Matched to:</b> “${esc(q)}” — ${esc(out.note||"here's what fits.")}`;
    S.sort="rel"; document.getElementById("sort").value="rel";
  }catch(err){
    const ids=keywordSearch(q);
    if(ids.length){
      S.aiIds=ids; S.sort="rel"; document.getElementById("sort").value="rel";
      S.aiNote = `<b>Matched to:</b> “${esc(q)}” — matched on keywords and tags. ${err.message==="no-sample"?(window.claude?"The AI matcher isn't available in this view.":"Running locally, so this used keyword and tag matching instead of AI."):"The AI matcher didn't respond, so this is the tag-based fallback."}`;
    }else{
      S.aiIds=null;
      S.aiNote = `Nothing in the library matched “${esc(q)}”. Try a mood, a genre, or a film you loved.`;
    }
  }
  btn.disabled=false; btn.textContent="Find it";
  render();
  document.getElementById("grid").scrollIntoView({behavior:"smooth",block:"start"});
}
document.getElementById("askBtn").onclick=()=>{const q=document.getElementById("ask").value.trim(); if(q) vibeSearch(q)};
document.getElementById("ask").addEventListener("keydown",e=>{if(e.key==="Enter"){const q=e.target.value.trim(); if(q)vibeSearch(q)}});
document.querySelectorAll(".ex").forEach(b=>b.onclick=()=>{
  document.getElementById("ask").value=b.textContent; vibeSearch(b.textContent);
});

/* ============ TONIGHT ============ */
const T={mood:null,time:null,with:null,last:[]};
function mkChips(el,vals,key){
  el.innerHTML=vals.map(v=>`<button class="chip" data-v="${v}">${v}</button>`).join("");
  el.onclick=e=>{const b=e.target.closest(".chip");if(!b)return;
    el.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed","false"));
    b.setAttribute("aria-pressed","true"); T[key]=b.dataset.v;};
}
mkChips(document.getElementById("tMood"),["Switch my brain off","Make me think","Wreck me","Make me laugh","Scare me","Feel-good"],"mood");
mkChips(document.getElementById("tTime"),["Under 100 min","Around 2 hours","I've got all night"],"time");
mkChips(document.getElementById("tWith"),["Alone","Partner","Friends","Family"],"with");
const MOODMAP={"Switch my brain off":["adrenaline","funny"],"Make me think":["thoughtful","weird"],
  "Wreck me":["sad"],"Make me laugh":["funny","feelgood"],"Scare me":["dark","tense"],"Feel-good":["feelgood","cozy"]};
document.getElementById("tGo").onclick=()=>pick(true);
document.getElementById("tAgain").onclick=()=>pick(false);
function pick(reset){
  if(reset) T.last=[];
  let pool=MOVIES.filter(m=>!(m.id in U.seen));
  if(T.mood) pool=pool.filter(m=>MOODMAP[T.mood].some(x=>m.mood.includes(x)));
  if(T.time==="Under 100 min") pool=pool.filter(m=>m.rt<=100);
  else if(T.time==="Around 2 hours") pool=pool.filter(m=>m.rt<=135);
  if(T.with==="Family") pool=pool.filter(m=>!m.mood.includes("dark")&&m.sc>=7.3);
  if(T.with==="Friends") pool=pool.filter(m=>m.mood.some(x=>["funny","adrenaline","weird","feelgood"].includes(x)));
  pool=pool.filter(m=>!T.last.includes(m.id));
  if(!pool.length){ T.last=[]; pool=MOVIES.filter(m=>!(m.id in U.seen)); }
  pool.sort((a,b)=>b.sc-a.sc);
  const top=pool.slice(0,12);
  const m=top[Math.floor(Math.random()*top.length)];
  T.last.push(m.id);
  const reasons=[];
  if(T.mood)reasons.push(`you asked for “${T.mood.toLowerCase()}”`);
  if(T.time)reasons.push(`it runs ${m.rt} minutes`);
  if(T.with&&T.with!=="Alone")reasons.push(`it holds up with ${T.with.toLowerCase()}`);
  document.getElementById("tAgain").hidden=false;
  document.getElementById("tOut").innerHTML=`<div class="pickwrap">
    <div>${poster(m)}</div>
    <div><h3>${esc(m.t)}</h3>
      <p class="credits">${m.y} · ${m.lang} · ${m.rt} min · ${esc(m.dir)} · ${m.sc.toFixed(1)}</p>
      <p>${esc(m.syn)}</p>
      <p class="why" style="font-size:14px">Picked because ${reasons.join(", ")||"it's one of the best things here"}.</p>
      <div class="acts"><button id="pOpen">See full details</button>
      <button id="pAdd">Add to watchlist</button></div></div></div>`;
  document.getElementById("pOpen").onclick=()=>openSheet(m.id);
  document.getElementById("pAdd").onclick=e=>{
    if(!U.want.includes(m.id))U.want.push(m.id); save(); render(); renderList();
    e.target.textContent="Added"; e.target.classList.add("on");
  };
}

/* ============ WATCHLIST ============ */
document.getElementById("listTabs").innerHTML=
  `<button class="chip" data-t="want" aria-pressed="true">Want to watch</button>
   <button class="chip" data-t="seen" aria-pressed="false">Already seen</button>`;
document.getElementById("listTabs").onclick=e=>{
  const b=e.target.closest(".chip"); if(!b)return;
  S.listTab=b.dataset.t;
  document.querySelectorAll("#listTabs .chip").forEach(c=>c.setAttribute("aria-pressed", c===b?"true":"false"));
  renderList();
};
function renderList(){
  const ids = S.listTab==="want" ? U.want : Object.keys(U.seen).map(Number);
  const g=document.getElementById("listGrid");
  g.innerHTML = ids.length ? ids.map(i=>cardHTML(MOVIES[i])).join("")
    : `<div class="empty" style="grid-column:1/-1"><h3>${S.listTab==="want"?"Nothing saved yet":"No films marked seen"}</h3>
       <p>${S.listTab==="want"?"Open any film and hit Add to watchlist. It stays here on this device.":"Mark films as seen and rate them — that's what builds your taste profile."}</p></div>`;
  document.getElementById("wlCount").textContent = U.want.length? U.want.length : "";
}

/* ============ TASTE ============ */
function renderTaste(){
  const ids=Object.keys(U.seen).map(Number);
  const out=document.getElementById("tasteOut");
  if(ids.length<3){
    out.innerHTML=`<div class="empty"><h3>Mark ${3-ids.length} more film${3-ids.length===1?"":"s"} as seen</h3>
      <p>Your profile needs at least three watched films before it says anything useful.</p></div>`;
    return;
  }
  const films=ids.map(i=>MOVIES[i]);
  const tally=(key)=>{const c={};films.forEach(m=>m[key].forEach(v=>{
      const w=1+(U.seen[m.id]||0)*0.5; c[v]=(c[v]||0)+w}));
    return Object.entries(c).sort((a,b)=>b[1]-a[1]).slice(0,6)};
  const bars=(arr)=>{const max=arr[0][1]||1; return `<div class="bars">`+arr.map(([k,v])=>
    `<div class="bar"><span>${esc(k)}</span><span class="track"><span class="fill" style="width:${Math.round(v/max*100)}%"></span></span><span class="n">${v.toFixed(1)}</span></div>`).join("")+`</div>`};
  const avgY=Math.round(films.reduce((s,m)=>s+m.y,0)/films.length);
  const avgR=Math.round(films.reduce((s,m)=>s+m.rt,0)/films.length);
  const langs=tally("g"); // placeholder not used
  const topLang=Object.entries(films.reduce((c,m)=>(c[m.lang]=(c[m.lang]||0)+1,c),{})).sort((a,b)=>b[1]-a[1])[0][0];
  // recommendations from taste
  const likedThemes=tally("th").map(x=>x[0]), likedMoods=tally("mood").map(x=>x[0]);
  const recs=MOVIES.filter(m=>!(m.id in U.seen)&&!U.want.includes(m.id)).map(m=>{
    let s=0; m.th.forEach(t=>{if(likedThemes.includes(t))s+=3});
    m.mood.forEach(t=>{if(likedMoods.includes(t))s+=2});
    return {m,s}}).filter(o=>o.s>2).sort((a,b)=>b.s-a.s||b.m.sc-a.m.sc).slice(0,6);
  out.innerHTML=`
  <div class="stats">
    <div class="stat"><b>${ids.length}</b><span>films watched</span></div>
    <div class="stat"><b>${avgY}</b><span>average year</span></div>
    <div class="stat"><b>${avgR}</b><span>average minutes</span></div>
    <div class="stat"><b>${esc(topLang)}</b><span>most-watched language</span></div>
  </div>
  <div class="qs" style="max-width:1000px">
    <div class="card2"><h4>Genres you return to</h4>${bars(tally("g"))}</div>
    <div class="card2"><h4>Themes you're drawn to</h4>${bars(tally("th"))}</div>
    <div class="card2"><h4>The mood you chase</h4>${bars(tally("mood"))}</div>
  </div>
  ${recs.length?`<h2 style="font-size:30px;margin:46px 0 14px">Built from your taste</h2>
  <div class="grid" style="padding-top:0">${recs.map(o=>cardHTML(o.m,
     `Shares ${o.m.th.filter(t=>likedThemes.includes(t)).concat(o.m.mood.filter(t=>likedMoods.includes(t))).slice(0,2).join(" and ")} with what you rate highly`)).join("")}</div>`:""}`;
}

/* ============ VIEWS ============ */
document.querySelectorAll("nav.tabs button").forEach(b=>b.onclick=()=>{
  document.querySelectorAll("nav.tabs button").forEach(x=>x.setAttribute("aria-selected","false"));
  b.setAttribute("aria-selected","true");
  ["browse","tonight","list","taste"].forEach(v=>document.getElementById("v-"+v).hidden = v!==b.dataset.view);
  if(b.dataset.view==="list") renderList();
  if(b.dataset.view==="taste") renderTaste();
  window.scrollTo({top:0,behavior:"smooth"});
});

render(); renderList();
