
/* ══════════════════════════════════════
  THEME TOGGLE
══════════════════════════════════════ */
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';

  html.setAttribute('data-theme', newTheme);
  document.getElementById('themeIcon').textContent  = isDark ? '☀️' : '🌙';
  document.getElementById('themeLabel').textContent = isDark ? 'Terang' : 'Gelap';
  localStorage.setItem('theme', newTheme);
}

// Load saved theme saat halaman dibuka
(function() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    if (saved === 'light') {
      document.getElementById('themeIcon').textContent  = '☀️';
      document.getElementById('themeLabel').textContent = 'Terang';
    }
  }
})();

/* ══════════════════════════════════════
  NAVIGATION
══════════════════════════════════════ */
const TC=[['xr'],['xr'],['xb'],['xg'],['xa'],['xp'],['xc'],['xo']];
function go(i,btn){
  document.querySelectorAll('.pg').forEach(p=>p.classList.remove('on'));
  document.getElementById('pg'+i).classList.add('on');
  document.querySelectorAll('.topnav .tnb').forEach((b,j)=>{
    ['xr','xb','xg','xa','xp','xc','xo'].forEach(c=>b.classList.remove(c));
    if(j===i)b.classList.add(TC[i][0]);
  });
  window.scrollTo({top:0,behavior:'smooth'});
}

function os(i,btn){
  const tabs=document.querySelectorAll('#pg1 .ostab');
  tabs.forEach((t,j)=>t.classList.toggle('on',j===i));
  const cols=['xr','xb','xg','xa','xp','xc','xb','xr','xa'];
  for(let j=0;j<9;j++){const b=document.getElementById('ost'+j);if(b){['xr','xb','xg','xa','xp','xc','xo'].forEach(c=>b.classList.remove(c));if(j===i)b.classList.add(cols[j]);}}
}

function be(i,btn){
  const tabs=document.querySelectorAll('#pg7 .ostab');
  tabs.forEach((t,j)=>t.classList.toggle('on',j===i));
  const cols=['xo','xb','xg','xa','xr','xp','xc','xo'];
  for(let j=0;j<8;j++){const b=document.getElementById('bet'+j);if(b){['xr','xb','xg','xa','xp','xc','xo'].forEach(c=>b.classList.remove(c));if(j===i)b.classList.add(cols[j]);}}
}

/* ══════════════════════════════════════
  ACCORDION
══════════════════════════════════════ */
function ac(hdr){
  const body=hdr.nextElementSibling;
  const chv=hdr.querySelector('.chv');
  body.classList.toggle('on',!body.classList.contains('on'));
  chv.classList.toggle('on',!chv.classList.contains('on'));
}

/* ══════════════════════════════════════
  CHECKLIST
══════════════════════════════════════ */
function tk(el){
  el.classList.toggle('ckd');
  el.querySelector('.cbox').classList.toggle('ck');
  const all=document.querySelectorAll('.ci').length;
  const done=document.querySelectorAll('.ci.ckd').length;
  const pct=all?Math.round(done/all*100):0;
  document.getElementById('gbar').style.width=pct+'%';
  document.getElementById('gpct').textContent=pct+'% selesai';
}

/* ══════════════════════════════════════
  CPU SIM
══════════════════════════════════════ */
const SC=['#60A5FA','#4ADE80','#FBBF24','#A78BFA'];
let SI=null;
function startSim(){
  const tl=document.getElementById('simtl');
  tl.innerHTML='';let t=0;if(SI)clearInterval(SI);
  SI=setInterval(()=>{
    if(t>=80){clearInterval(SI);return;}
    const s=document.createElement('div');
    s.style.cssText=`flex:1;background:${SC[Math.floor(Math.random()*4)]};min-width:3px`;
    tl.appendChild(s);
    if(tl.children.length>80)tl.removeChild(tl.children[0]);
    t++;
  },100);
}

/* ══════════════════════════════════════
  STATUS PROSES
══════════════════════════════════════ */
const SI2={
  new:'<strong>New</strong>: OS buat proses — alokasi PID, siapkan PCB, muat ke RAM.',
  ready:'<strong>Ready</strong>: Siap, menunggu giliran CPU di ready queue.',
  running:'<strong>Running</strong>: Pakai CPU. Hanya 1 per core.',
  blocked:'<strong>Blocked</strong>: Nunggu I/O. CPU dibebaskan.',
  term:'<strong>Terminated</strong>: Selesai. OS hapus resource.'
};
function showSts(s){document.getElementById('stsinfo').innerHTML=SI2[s];}

/* ══════════════════════════════════════
   COPY CODE
══════════════════════════════════════ */
function cp(btn){
  const pre=btn.closest('.cb').querySelector('pre');
  navigator.clipboard.writeText(pre.innerText).then(()=>{
    btn.textContent='copied!';
    setTimeout(()=>btn.textContent='copy',1800);
  });
}

// Init
document.getElementById('ost0').classList.add('xr');
document.getElementById('bet0').classList.add('xo');
