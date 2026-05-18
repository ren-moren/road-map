
// ── NAVIGATION ──
const TCOLS=[['xr'],['xr'],['xb'],['xg'],['xa'],['xp'],['xc'],['xo']];
function go(i,btn){
  document.querySelectorAll('.pg').forEach(p=>p.classList.remove('on'));
  document.getElementById('pg'+i).classList.add('on');
  document.querySelectorAll('.topnav .tnb').forEach((b,j)=>{
    ['xr','xb','xg','xa','xp','xc','xo'].forEach(c=>b.classList.remove(c));
    if(j===i) b.classList.add(TCOLS[i][0]);
  });
  window.scrollTo({top:0,behavior:'smooth'});
}

// ── OS SUBTABS ──
function os(i,btn){
  document.querySelectorAll('.ostab').forEach((t,j)=>t.classList.toggle('on',j===i));
  const cols=['xr','xb','xg','xa','xp','xc','xb','xr','xa'];
  for(let j=0;j<9;j++){
    const b=document.getElementById('ost'+j);
    if(b){['xr','xb','xg','xa','xp','xc','xo'].forEach(c=>b.classList.remove(c));if(j===i)b.classList.add(cols[j]);}
  }
}

// ── BACKEND SUBTABS ──
function be(i,btn){
  const tabs=document.querySelectorAll('#pg7 .ostab');
  tabs.forEach((t,j)=>t.classList.toggle('on',j===i));
  const cols=['xo','xb','xg','xa','xr','xp','xc','xo'];
  for(let j=0;j<8;j++){
    const b=document.getElementById('bet'+j);
    if(b){['xr','xb','xg','xa','xp','xc','xo'].forEach(c=>b.classList.remove(c));if(j===i)b.classList.add(cols[j]);}
  }
}

// ── ACCORDION ──
function ac(hdr){
  const body=hdr.nextElementSibling;
  const chv=hdr.querySelector('.chv');
  body.classList.toggle('on',!body.classList.contains('on'));
  chv.classList.toggle('on',!chv.classList.contains('on'));
}

// ── CHECKLIST ──
function tk(el){
  el.classList.toggle('ckd');
  el.querySelector('.cbox').classList.toggle('ck');
  updateBar();
}
function updateBar(){
  const all=document.querySelectorAll('.ci').length;
  const done=document.querySelectorAll('.ci.ckd').length;
  const pct=all?Math.round(done/all*100):0;
  document.getElementById('gbar').style.width=pct+'%';
  document.getElementById('gpct').textContent=pct+'%';
}

// ── MULTITASKING SIM ──
const SC=['#60A5FA','#4ADE80','#FBBF24','#A78BFA'];
let SI=null;
function startSim(){
  const tl=document.getElementById('simtl');
  tl.innerHTML=''; let t=0;
  if(SI)clearInterval(SI);
  SI=setInterval(()=>{
    if(t>=80){clearInterval(SI);return;}
    const s=document.createElement('div');
    s.style.cssText=`flex:1;background:${SC[Math.floor(Math.random()*4)]};min-width:3px`;
    tl.appendChild(s);
    if(tl.children.length>80)tl.removeChild(tl.children[0]);
    t++;
  },100);
}

// ── PROCESS STATUS ──
const SI2={
  new:'<strong>New</strong>: OS baru buat proses — alokasi PID, siapkan PCB, muat program ke RAM.',
  ready:'<strong>Ready</strong>: Proses siap, menunggu giliran CPU di ready queue.',
  running:'<strong>Running</strong>: Proses pakai CPU. Hanya 1 per core bersamaan.',
  blocked:'<strong>Blocked</strong>: Nunggu I/O (disk/network/keyboard). CPU dibebaskan.',
  term:'<strong>Terminated</strong>: Proses selesai/di-kill. OS simpan exit code lalu hapus.'
};
function showSts(s){document.getElementById('stsinfo').innerHTML=SI2[s];}

// ── COPY ──
function cp(btn){
  const pre=btn.closest('.cb').querySelector('pre');
  navigator.clipboard.writeText(pre.innerText).then(()=>{
    btn.textContent='copied!';
    setTimeout(()=>btn.textContent='copy',1800);
  });
}

// init
document.getElementById('ost0').classList.add('xr');
document.getElementById('bet0').classList.add('xo');
