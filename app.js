(() => {
  'use strict';
  const KEY='lunea-v1';
  const defaultState={theme:'light',reminders:true,thoughts:[],journal:[],sounds:{rain:false,ocean:false,forest:false,space:false,room:false,wind:false,piano:false,fire:false},soundVolumes:{},timer:0};
  let state=loadState();
  let audioCtx=null, master=null, soundNodes=new Map(), timerId=null, breathTimer=null;
  const $=(s)=>document.querySelector(s); const $$=(s)=>[...document.querySelectorAll(s)];
  const save=()=>localStorage.setItem(KEY,JSON.stringify(state));
  function loadState(){try{return {...defaultState,...JSON.parse(localStorage.getItem(KEY)||'{}')};}catch{return {...defaultState}}}
  function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),2600)}
  function navigate(view){
    $$('.view').forEach(v=>v.classList.toggle('active',v.dataset.view===view));
    $$('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.nav===view));
    $('#app').focus({preventScroll:true});
    if(view==='journal') renderJournal(); if(view==='thoughts') renderThoughts(); if(view==='sounds') renderSoundState();
    history.replaceState(null,'','#'+view);
    window.scrollTo({top:0,behavior:'smooth'});
  }
  document.addEventListener('click',e=>{const b=e.target.closest('[data-nav]');if(b){e.preventDefault();navigate(b.dataset.nav)}});
  $('#settingsBtn').addEventListener('click',()=>navigate('settings'));
  $('#themeToggle').addEventListener('click',()=>setTheme(state.theme==='dark'?'light':'dark'));
  function setTheme(t){state.theme=t;document.body.classList.toggle('night',t==='dark');$('#darkToggle').checked=t==='dark';$('#themeToggle').textContent=t==='dark'?'☀':'☾';save()}
  function greeting(){const h=new Date().getHours();$('#greeting').textContent=h<12?'GOOD MORNING, DREAMER':h<18?'GOOD EVENING, DREAMER':'GOOD EVENING, DREAMER'}
  const soundDefs=[['rain','🌧️','Rain','brown-noise'],['ocean','🌊','Ocean','wave'],['forest','🌲','Night forest','noise'],['space','🌌','Deep space','drone'],['room','🏡','Cozy room','noise'],['wind','🍃','Soft wind','noise'],['piano','🎹','Soft piano','tone'],['fire','🕯️','Fireplace','crackle']];
  function renderSounds(){const grid=$('#soundGrid');grid.innerHTML=soundDefs.map(([id,emoji,name])=>`<button class="sound-card ${state.sounds[id]?'active':''}" data-sound="${id}"><span class="emoji">${emoji}</span><b>${name}</b></button>`).join('');grid.querySelectorAll('[data-sound]').forEach(b=>b.addEventListener('click',()=>toggleSound(b.dataset.sound)))}
  function renderSoundState(){renderSounds();const active=soundDefs.filter(([id])=>state.sounds[id]);$('#activeSoundList').innerHTML=active.length?active.map(([id,emoji,name])=>`<div class="track-row"><span class="track-icon">${emoji}</span><div class="track-name">${name}</div><input class="track-range" data-volume="${id}" type="range" min="0" max="1" step="0.01" value="${state.soundVolumes[id]??.35}" aria-label="${name} volume"></div>`).join(''):'<span class="empty-state">Choose a sound above.</span>';
    $$('#activeSoundList [data-volume]').forEach(r=>r.addEventListener('input',e=>{state.soundVolumes[e.target.dataset.volume]=Number(e.target.value);save();if(soundNodes.has(e.target.dataset.volume)) soundNodes.get(e.target.dataset.volume).gain.gain.value=Number(e.target.value)}));
    $('#soundStatus').textContent=soundNodes.size?'Playing gently':'Ready';$('#soundStatusDot').classList.toggle('live',soundNodes.size>0);$('#timerLabel').textContent=state.timer?`${state.timer} min timer`:'No timer';
  }
  function toggleSound(id){state.sounds[id]=!state.sounds[id];save();if(state.sounds[id]) startSound(id);else stopSound(id);renderSoundState()}
  function ensureAudio(){if(!audioCtx){audioCtx=new (window.AudioContext||window.webkitAudioContext)();master=audioCtx.createGain();master.gain.value=.55;master.connect(audioCtx.destination)} if(audioCtx.state==='suspended') audioCtx.resume();}
  function startSound(id){ensureAudio();if(soundNodes.has(id))return;const vol=state.soundVolumes[id]??.35;const gain=audioCtx.createGain();gain.gain.value=vol;gain.connect(master);let node;
    if(id==='piano'){node=makeTone(gain,220,.25);}
    else if(id==='space'){node=makeDrone(gain,55);}
    else if(id==='ocean'){node=makeWave(gain);}
    else if(id==='rain'){node=makeNoise(gain,'brown');}
    else if(id==='fire'){node=makeCrackle(gain);}
    else {node=makeNoise(gain,'pink');}
    soundNodes.set(id,{gain,node});
  }
  function stopSound(id){const item=soundNodes.get(id);if(!item)return;try{item.node.stop?.()}catch{};try{item.node.disconnect()}catch{};try{item.gain.disconnect()}catch{};soundNodes.delete(id)}
  function stopAll(){soundNodes.forEach((_,id)=>stopSound(id));clearTimeout(timerId);state.timer=0;save();renderSoundState()}
  function makeNoise(gain,type){const buffer=audioCtx.createBuffer(1,audioCtx.sampleRate*2,audioCtx.sampleRate),data=buffer.getChannelData(0);let last=0;for(let i=0;i<data.length;i++){const white=Math.random()*2-1;if(type==='brown'){last=(last+.02*white)/1.02;data[i]=last*3.5}else{data[i]=white*.35}}const src=audioCtx.createBufferSource();src.buffer=buffer;src.loop=true;src.connect(gain);src.start();return src}
  function makeWave(gain){const osc=audioCtx.createOscillator(),lfo=audioCtx.createOscillator(),lg=audioCtx.createGain();osc.type='sine';osc.frequency.value=90;lfo.frequency.value=.08;lg.gain.value=30;lfo.connect(lg).connect(osc.frequency);osc.connect(gain);osc.start();lfo.start();return {stop(){osc.stop();lfo.stop()}}}
  function makeDrone(gain,f){const osc=audioCtx.createOscillator(),osc2=audioCtx.createOscillator();osc.type='sine';osc2.type='sine';osc.frequency.value=f;osc2.frequency.value=f*1.498;osc2.detune.value=-4;const g2=audioCtx.createGain();g2.gain.value=.35;osc2.connect(g2).connect(gain);osc.connect(gain);osc.start();osc2.start();return {stop(){osc.stop();osc2.stop()}}}
  function makeTone(gain,f,dur){const osc=audioCtx.createOscillator();osc.type='sine';osc.frequency.value=f;const lfo=audioCtx.createOscillator(),lg=audioCtx.createGain();lfo.frequency.value=.12;lg.gain.value=2;lfo.connect(lg).connect(osc.frequency);osc.connect(gain);osc.start();lfo.start();return {stop(){osc.stop();lfo.stop()}}}
  function makeCrackle(gain){const node=makeNoise(gain,'pink');return node}
  $('#playAllBtn').addEventListener('click',()=>{ensureAudio();soundDefs.filter(([id])=>state.sounds[id]).forEach(([id])=>startSound(id));if(!soundNodes.size){state.sounds.rain=true;startSound('rain');renderSoundState()}toast('Your soundscape is playing gently 🌙')});
  $('#stopAllBtn').addEventListener('click',stopAll);
  $('#timerSelect').addEventListener('change',e=>{state.timer=Number(e.target.value);save();clearTimeout(timerId);if(state.timer){timerId=setTimeout(stopAll,state.timer*60000);toast(`Timer set for ${state.timer} minutes 🌙`)}renderSoundState()});
  function renderThoughts(){const list=$('#thoughtsList');list.innerHTML=state.thoughts.length?state.thoughts.slice().reverse().map(x=>`<article class="thought-item"><time>${escapeHTML(new Date(x.created).toLocaleString([], {dateStyle:'medium',timeStyle:'short'}))}</time><p>${escapeHTML(x.text)}</p></article>`).join(''):'<div class="empty-state card" style="padding:20px">Your saved thoughts will appear here. 🌸</div>'}
  $('#thoughtText').addEventListener('input',e=>$('#thoughtCount').textContent=`${e.target.value.length} / 4000`);
  $('#saveThoughtBtn').addEventListener('click',()=>{const text=$('#thoughtText').value.trim();if(!text){toast('Write anything that feels useful to release.');return}state.thoughts.push({text,created:new Date().toISOString()});save();$('#thoughtText').value='';$('#thoughtCount').textContent='0 / 4000';renderThoughts();toast('Saved somewhere safe. 🌷')});
  const reframes=['Tomorrow can hold tomorrow’s problems. Tonight can simply be tonight.','You do not need to solve every thought before you rest.','A restless night is a difficult moment, not a personal failure.','You can pause without making tonight perfect.','Let this moment be small. You only need to be here for it.'];
  $('#newReframe').addEventListener('click',()=>$('#reframeText').textContent=reframes[Math.floor(Math.random()*reframes.length)]);
  function escapeHTML(s){return s.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
  let phase='ready',count=4;
  $('#breathBtn').addEventListener('click',()=>{if(breathTimer){stopBreathing();return}phase='in';count=4;$('#breathBtn').textContent='Pause';runBreath()});
  function runBreath(){const ring=$('#breathRing');ring.className='breath-ring '+(phase==='in'?'breath-in':'breath-out');$('#breathPhase').textContent=phase==='in'?'Breathe in':'Breathe out';$('#breathCountdown').textContent=count;breathTimer=setTimeout(()=>{count--;if(count<=0){phase=phase==='in'?'out':'in';count=phase==='in'?4:6}runBreath()},1000)}
  function stopBreathing(){clearTimeout(breathTimer);breathTimer=null;$('#breathRing').className='breath-ring';$('#breathPhase').textContent='Ready';$('#breathCountdown').textContent='4';$('#breathBtn').textContent='Begin'}
  function todayISO(){return new Date().toISOString().slice(0,10)}
  function renderJournal(){const date=$('#sleepDate');if(!date.value)date.value=todayISO();$('#restedValue').textContent=`${$('#restedRange').value} / 5`;const entries=state.journal.slice().sort((a,b)=>a.date.localeCompare(b.date));$('#journalSummary').textContent=entries.length?`${entries.length} night${entries.length===1?'':'s'} recorded`:'No entries yet';const recent=entries.slice(-7);$('#nightBars').innerHTML=recent.length?recent.map(x=>{const d=new Date(x.date+'T12:00:00');return `<div class="night-bar"><em>${['','🌧️','☁️','🌙','🌸','✨'][x.feeling]}</em><i style="height:${20+x.rested*18}px" title="${x.rested}/5"></i><small>${d.toLocaleDateString([], {weekday:'short'}).slice(0,3)}</small></div>`}).join(''):'<span class="empty-state">Add your first night above. 🌙</span>'}
  $('#restedRange').addEventListener('input',e=>$('#restedValue').textContent=`${e.target.value} / 5`);
  $('#sleepForm').addEventListener('submit',e=>{e.preventDefault();const entry={date:$('#sleepDate').value,feeling:Number($('#sleepFeeling').value),rested:Number($('#restedRange').value),notes:$('#sleepNotes').value.trim()};const i=state.journal.findIndex(x=>x.date===entry.date);if(i>=0)state.journal[i]=entry;else state.journal.push(entry);save();renderJournal();toast('Your night has been saved. 🌙')});
  $('#reminderToggle').addEventListener('change',e=>{state.reminders=e.target.checked;save();toast(e.target.checked?'Gentle reminders are on.':'Gentle reminders are off.')});
  $('#darkToggle').addEventListener('change',e=>setTheme(e.target.checked?'dark':'light'));
  $('#exportBtn').addEventListener('click',()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`lunea-backup-${todayISO()}.json`;a.click();URL.revokeObjectURL(url);toast('Your Lunéa backup is ready. ✨')});
  $('#clearBtn').addEventListener('click',()=>{if(!confirm('Clear all locally stored Lunéa data? This cannot be undone.'))return;localStorage.removeItem(KEY);state=loadState();stopAll();renderThoughts();renderJournal();renderSoundState();setTheme('light');toast('Local data cleared.')});
  window.addEventListener('hashchange',()=>navigate(location.hash.slice(1)||'home'));
  greeting();setTheme(state.theme);$('#reminderToggle').checked=state.reminders;renderSoundState();renderThoughts();renderJournal();navigate(location.hash.slice(1)||'home');
})();
