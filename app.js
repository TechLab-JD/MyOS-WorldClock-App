// MyOS World Clock
const root = document.getElementById('WorldClockApp');
if (root) {
  const ZONES=[['New York','America/New_York'],['Los Angeles','America/Los_Angeles'],['Chicago','America/Chicago'],['Denver','America/Denver'],['Toronto','America/Toronto'],['Mexico City','America/Mexico_City'],['São Paulo','America/Sao_Paulo'],['London','Europe/London'],['Paris','Europe/Paris'],['Berlin','Europe/Berlin'],['Moscow','Europe/Moscow'],['Dubai','Asia/Dubai'],['Mumbai','Asia/Kolkata'],['Bangkok','Asia/Bangkok'],['Singapore','Asia/Singapore'],['Hong Kong','Asia/Hong_Kong'],['Tokyo','Asia/Tokyo'],['Seoul','Asia/Seoul'],['Sydney','Australia/Sydney'],['Auckland','Pacific/Auckland'],['Honolulu','Pacific/Honolulu'],['UTC','UTC']];
  const KEY='myos.worldclock'; const sel=document.getElementById('wc-tz');
  sel.innerHTML=ZONES.map((z,i)=>'<option value="'+i+'">'+z[0]+'</option>').join('');
  let cities=[]; try{ cities=JSON.parse(localStorage.getItem(KEY)||'null')||[0,7,16]; }catch(e){ cities=[0,7,16]; }
  function save(){ try{ localStorage.setItem(KEY,JSON.stringify(cities)); }catch(e){} }
  function render(){
    const l=document.getElementById('wc-list'); l.innerHTML=cities.length?'':'<div style="opacity:.6;text-align:center;padding:16px">Add a city above.</div>';
    cities.forEach((zi,idx)=>{ const z=ZONES[zi]; if(!z)return;
      const now=new Date();
      const tm=new Intl.DateTimeFormat('en-US',{timeZone:z[1],hour:'2-digit',minute:'2-digit',hour12:false}).format(now);
      const day=new Intl.DateTimeFormat('en-US',{timeZone:z[1],weekday:'short',month:'short',day:'numeric'}).format(now);
      const card=document.createElement('div'); card.className='wc-card';
      card.innerHTML='<div class="nm"><b>'+z[0]+'</b><small>'+day+'</small></div><div class="tm">'+tm+'</div>';
      const x=document.createElement('button'); x.className='x'; x.textContent='×'; x.onclick=()=>{ cities.splice(idx,1); save(); render(); };
      card.appendChild(x); l.appendChild(card);
    });
  }
  document.getElementById('wc-add').onclick=()=>{ cities.push(Number(sel.value)); save(); render(); };
  render(); setInterval(render,1000);
}
