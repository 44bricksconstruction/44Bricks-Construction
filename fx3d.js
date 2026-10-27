// 44 BRICKS — WebGL scenes (ambient floating bricks + Property Hub construction site). Requires three.min.js.
(function(){
if(window.FX44)return;
if(!window.THREE&&!window.__threeLoading){
  window.__threeLoading=true;
  const s=document.createElement('script');
  const base=(document.currentScript&&document.currentScript.src)||location.href;
  s.src=new URL('three.min.js',base).href;
  document.head.appendChild(s);
}
// ---------- ambient 3D "floating bricks" layer (single shared WebGL context) ----------
function ambient(canvas){
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!canvas||reducedMotion||typeof THREE==='undefined')return null;
  if(matchMedia('(max-width:760px)').matches)return null;
  let renderer,alive=true;
  try{ renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true}); }
  catch(e){ canvas.style.display='none'; return null; }
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));
  renderer.setClearColor(0x000000,0);
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(55,innerWidth/innerHeight,.1,200);
  camera.position.z=34;
  const geo=new THREE.BoxGeometry(2.2,1.1,1.1); // brick proportions
  const edges=new THREE.EdgesGeometry(geo);
  const matCobalt=new THREE.LineBasicMaterial({color:0x3E6BE6,transparent:true,opacity:.5});
  const matGold=new THREE.LineBasicMaterial({color:0xE3B75B,transparent:true,opacity:.45});
  const bricks=[];
  const N=window.innerWidth>1200?26:16;
  for(let i=0;i<N;i++){
    const m=new THREE.LineSegments(edges, i%6===0?matGold:matCobalt);
    m.position.set((Math.random()-0.5)*70,(Math.random()-0.5)*46,(Math.random()-0.5)*40);
    m.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,0);
    m.userData={sx:(Math.random()-0.5)*0.08,sy:(Math.random()-0.5)*0.06,
                rx:(Math.random()-0.5)*0.003,ry:(Math.random()-0.5)*0.003,
                baseY:m.position.y};
    scene.add(m);bricks.push(m);
  }
  let mx=0,my=0;
  addEventListener('pointermove',e=>{mx=(e.clientX/innerWidth-0.5);my=(e.clientY/innerHeight-0.5);},{passive:true});
  function resize(){
    renderer.setSize(innerWidth,innerHeight,false);
    camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();
  }
  addEventListener('resize',resize);resize();
  let running=true;
  document.addEventListener('visibilitychange',()=>{running=!document.hidden;});
  const clock=new THREE.Clock();
  function frame(){
    if(!alive)return;
    requestAnimationFrame(frame);
    if(!running)return;
    const dt=Math.min(clock.getDelta(),.05);
    bricks.forEach(b=>{
      b.position.x+=b.userData.sx*dt*6;
      b.position.y+=b.userData.sy*dt*6;
      b.rotation.x+=b.userData.rx;
      b.rotation.y+=b.userData.ry;
      if(b.position.x>38)b.position.x=-38; if(b.position.x<-38)b.position.x=38;
      if(b.position.y>26)b.position.y=-26; if(b.position.y<-26)b.position.y=26;
    });
    // gentle parallax
    camera.position.x+=((mx*6)-camera.position.x)*0.04;
    camera.position.y+=((-my*4)-camera.position.y)*0.04;
    camera.lookAt(0,0,0);
    renderer.render(scene,camera);
  }
  frame();
  return {destroy(){alive=false;removeEventListener('resize',resize);renderer.dispose();}};
}

// ---------- PROPERTY HUB: 3D construction site ----------
function site(wrap,canvas,phaseSlider,onFail){
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(typeof THREE==='undefined'){onFail&&onFail();return null}
  let renderer;
  try{
    renderer=new THREE.WebGLRenderer({canvas,antialias:devicePixelRatio<2,powerPreference:'low-power'});
  }catch(e){onFail&&onFail();return null}
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();onFail&&onFail();});
  let alive=true;
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));

  const scene=new THREE.Scene();
  scene.background=new THREE.Color(0x08142F);
  scene.fog=new THREE.Fog(0x08142F,55,110);
  const camera=new THREE.PerspectiveCamera(46,16/9,.1,220);

  // lights
  scene.add(new THREE.HemisphereLight(0xBFD2FF,0x0A1A3C,.85));
  const sun=new THREE.DirectionalLight(0xFFE9C4,.9);
  sun.position.set(24,32,14);scene.add(sun);

  // palette
  const M={
    concrete:new THREE.MeshLambertMaterial({color:0xAEB9CF}),
    concreteDark:new THREE.MeshLambertMaterial({color:0x7E8CA8}),
    slab:new THREE.MeshLambertMaterial({color:0xC7D0E2}),
    gold:new THREE.MeshLambertMaterial({color:0xC9972C}),
    goldSoft:new THREE.MeshLambertMaterial({color:0xE3B75B}),
    cobalt:new THREE.MeshLambertMaterial({color:0x2B5BE3}),
    brick:new THREE.MeshLambertMaterial({color:0xA85A38}),
    sand:new THREE.MeshLambertMaterial({color:0xD9BE8A}),
    steel:new THREE.MeshLambertMaterial({color:0x5E6B85}),
    glow:new THREE.MeshBasicMaterial({color:0xE3B75B}),
    dark:new THREE.MeshLambertMaterial({color:0x1A2B52}),
    tyre:new THREE.MeshLambertMaterial({color:0x22293B}),
    red:new THREE.MeshBasicMaterial({color:0xFF4D4D}),
  };
  const box=(w,h,d,m)=>new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);
  const cyl=(rt,rb,h,m,seg=10)=>new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,seg),m);

  // ground + roads + grid
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(160,160),new THREE.MeshLambertMaterial({color:0x0E2148}));
  ground.rotation.x=-Math.PI/2;scene.add(ground);
  const grid=new THREE.GridHelper(140,46,0x27407A,0x1A2E5C);
  grid.position.y=.02;scene.add(grid);
  const road=box(9,.06,90,M.dark);road.position.set(14,.05,0);scene.add(road);

  // ---- Building A: under construction (floors rise in a loop) ----
  const FLOORS=6,FH=2.2,BW=10,BD=8;
  const bA=new THREE.Group();bA.position.set(-9,0,-6);scene.add(bA);
  const floors=[];
  for(let i=0;i<FLOORS;i++){
    const fl=new THREE.Group();
    const slab=box(BW,.35,BD,M.slab);slab.position.y=FH;fl.add(slab);
    for(const[cx,cz]of[[-BW/2+.5,-BD/2+.5],[BW/2-.5,-BD/2+.5],[-BW/2+.5,BD/2-.5],[BW/2-.5,BD/2-.5],[0,-BD/2+.5],[0,BD/2-.5]]){
      const col=box(.5,FH,.5,M.concreteDark);col.position.set(cx,FH/2,cz);fl.add(col);
    }
    fl.position.y=i*FH;fl.scale.y=0;fl.visible=false;
    floors.push(fl);bA.add(fl);
  }
  const base=box(BW+1.4,.5,BD+1.4,M.concreteDark);base.position.y=.25;bA.add(base);
  // scaffolding hint on one face
  for(let i=0;i<4;i++){const p=cyl(.07,.07,FLOORS*FH*.75,M.steel);p.position.set(-9-BW/2-.7+0.01, FLOORS*FH*.375, -6-BD/2+1+i*2);scene.add(p)}

  // ---- Building B: completed tower with lit windows ----
  const bB=new THREE.Group();bB.position.set(-24,0,8);scene.add(bB);
  const tower=box(7,16,7,M.concrete);tower.position.y=8;bB.add(tower);
  const roof=box(7.6,.5,7.6,M.concreteDark);roof.position.y=16.2;bB.add(roof);
  for(let fy=0;fy<6;fy++)for(let wx=0;wx<3;wx++){
    if((fy+wx)%3===0)continue;
    const win=box(1.1,.9,.08,M.glow);
    win.position.set(-2+wx*2,2.2+fy*2.3,3.56);bB.add(win);
    const win2=win.clone();win2.position.z=-3.56;bB.add(win2);
  }

  // ---- Tower crane (gold) ----
  const crane=new THREE.Group();crane.position.set(1.5,0,-6);scene.add(crane);
  const mast=box(1,20,1,M.gold);mast.position.y=10;crane.add(mast);
  const slew=new THREE.Group();slew.position.y=20;crane.add(slew);
  const cab=box(1.6,1.4,1.6,M.goldSoft);cab.position.y=.7;slew.add(cab);
  const jib=box(14,.6,.8,M.gold);jib.position.set(7,1.6,0);slew.add(jib);
  const cjib=box(5,.6,.8,M.gold);cjib.position.set(-2.5,1.6,0);slew.add(cjib);
  const cw=box(1.6,1.2,1.4,M.steel);cw.position.set(-4.6,1.2,0);slew.add(cw);
  const tie1=cyl(.05,.05,7.3,M.steel);tie1.position.set(3.5,3.1,0);tie1.rotation.z=1.08;slew.add(tie1);
  const trolley=new THREE.Group();trolley.position.set(11,1.3,0);slew.add(trolley);
  const cable=cyl(.05,.05,1,M.steel);trolley.add(cable);
  const hook=new THREE.Group();trolley.add(hook);
  const load=box(1.6,1,1.2,M.brick);hook.add(load);

  // ---- materials yard ----
  for(let s=0;s<3;s++)for(let i=0;i<3;i++)for(let j=0;j<2;j++){
    const b=box(.9,.45,.55,M.brick);
    b.position.set(7+s*1.6+(j%2)*.05,.28+j*.5,4+i*.75);
    b.rotation.y=(i+j+s)*.06;scene.add(b);
  }
  const sand=new THREE.Mesh(new THREE.ConeGeometry(2.2,1.7,14),M.sand);sand.position.set(3.5,.85,6.5);scene.add(sand);
  for(let i=0;i<4;i++){const p=cyl(.28,.28,5,M.cobalt);p.rotation.z=Math.PI/2;p.position.set(8,.3+(i>1?.56:0),9.5+(i%2)*.62);scene.add(p)}

  // ---- dump truck (moves along road) ----
  const truck=new THREE.Group();scene.add(truck);
  const bed=box(2.6,1,1.8,M.gold);bed.position.set(-.6,1.15,0);truck.add(bed);
  const cab2=box(1.2,1.2,1.7,M.goldSoft);cab2.position.set(1.4,1.2,0);truck.add(cab2);
  const chassis=box(4,.35,1.6,M.steel);chassis.position.y=.62;truck.add(chassis);
  const wheels=[];
  for(const[wx,wz]of[[1.4,.95],[1.4,-.95],[-1.2,.95],[-1.2,-.95]]){
    const w=cyl(.42,.42,.32,M.tyre,14);w.rotation.x=Math.PI/2;w.position.set(wx,.42,wz);truck.add(w);wheels.push(w);
  }
  truck.position.set(14,0,18);truck.rotation.y=Math.PI/2;

  // ---- drone ----
  const drone=new THREE.Group();scene.add(drone);
  const body=box(.9,.28,.9,M.dark);drone.add(body);
  const eye=box(.3,.18,.3,M.cobalt);eye.position.set(0,-.18,.3);drone.add(eye);
  const rotors=[];
  for(const[ax,az]of[[.7,.7],[.7,-.7],[-.7,.7],[-.7,-.7]]){
    const arm=box(.6,.08,.12,M.steel);arm.position.set(ax*.6,.05,az*.6);arm.rotation.y=Math.atan2(az,ax);drone.add(arm);
    const r=cyl(.42,.42,.04,new THREE.MeshLambertMaterial({color:0x9FB2D8,transparent:true,opacity:.55}),12);
    r.position.set(ax,.16,az);drone.add(r);rotors.push(r);
  }
  const led=new THREE.Mesh(new THREE.SphereGeometry(.09,8,8),M.red);led.position.set(0,.2,-.42);drone.add(led);

  // ---- camera control ----
  let mode='site',az=.85,el=.42,dist=40,dragging=false,lx=0,ly=0,idle=0;
  const target=new THREE.Vector3(-4,5,0);
  function applyOrbit(){
    camera.position.set(
      target.x+dist*Math.cos(el)*Math.cos(az),
      target.y+dist*Math.sin(el),
      target.z+dist*Math.cos(el)*Math.sin(az));
    camera.lookAt(target);
  }
  canvas.addEventListener('pointerdown',e=>{dragging=true;lx=e.clientX;ly=e.clientY;idle=0;canvas.setPointerCapture(e.pointerId)});
  canvas.addEventListener('pointermove',e=>{
    if(!dragging||mode!=='site')return;
    az+=(e.clientX-lx)*.0055;el=Math.min(1.25,Math.max(.12,el+(e.clientY-ly)*.004));
    lx=e.clientX;ly=e.clientY;idle=0;
  });
  addEventListener('pointerup',()=>dragging=false);

  let manualPhase=null;
  function setMode(m){mode=m;}
  // ---- resize ----
  function resize(){
    const w=wrap.clientWidth,h=canvas.clientHeight||Math.min(innerHeight*.62,560);
    renderer.setSize(w,h,false);
    camera.aspect=w/h;camera.updateProjectionMatrix();
  }
  addEventListener('resize',resize);resize();
  const ro='ResizeObserver' in window?new ResizeObserver(resize):null;ro&&ro.observe(wrap);
  // ---- run only when visible ----
  let running=false;
  const clock=new THREE.Clock();
  const io=new IntersectionObserver(es=>es.forEach(e=>{running=e.isIntersecting;if(running)clock.getDelta();}),{threshold:.05});io.observe(wrap);

  let t=0;
  const CYCLE=3.2; // seconds per floor
  function frame(){
    if(!alive)return;
    requestAnimationFrame(frame);
    if(!running||document.hidden)return;
    const dt=Math.min(clock.getDelta(),.05);
    t+=reducedMotion?0:dt;

    // floors rise sequentially: auto loop, or manual scrub via the BUILD PHASE slider
    const total=FLOORS*CYCLE+2.5;
    const ct=t%total;
    floors.forEach((fl,i)=>{
      let p;
      if(manualPhase!==null){
        p=Math.min(Math.max(manualPhase*FLOORS-i,0),1);
      }else{
        p=Math.min(Math.max((ct-i*CYCLE)/CYCLE*1.25,0),1);
      }
      fl.visible=p>0;fl.scale.y=p;
    });
    if(manualPhase===null&&phaseSlider){
      // mirror the loop's progress on the slider so AUTO feels alive
      const auto=Math.min(ct/(FLOORS*CYCLE),1);
      phaseSlider.value=Math.round(auto*100);
    }

    // crane
    slew.rotation.y=Math.sin(t*.16)*1.3+.4;
    trolley.position.x=9+Math.sin(t*.35)*3.4;
    const drop=2.6+Math.sin(t*.5)*2.2;
    cable.scale.y=drop;cable.position.y=-drop/2;
    hook.position.y=-drop-.5;

    // truck along the road
    const tp=(t*.11)%2;
    const z=tp<1?THREE.MathUtils.lerp(24,-24,tp):THREE.MathUtils.lerp(-24,24,tp-1);
    truck.position.z=z;truck.rotation.y=tp<1?Math.PI:0;
    wheels.forEach(w=>w.rotation.y+=dt*4);

    // drone flight
    const da=t*.4;
    drone.position.set(Math.cos(da)*17-4,10.5+Math.sin(t*.9)*1.2,Math.sin(da)*13);
    drone.rotation.y=-da+Math.PI/2;
    drone.rotation.z=Math.sin(t*.8)*.06;
    rotors.forEach(r=>r.rotation.y+=dt*26);
    led.visible=(t%1)<.55;

    // camera
    if(mode==='site'){
      idle+=dt;
      if(idle>2.2&&!reducedMotion)az+=dt*.07;
      applyOrbit();
    }else{
      const ahead=new THREE.Vector3(Math.cos(da+.5)*13-4,3.5,Math.sin(da+.5)*10);
      camera.position.lerp(new THREE.Vector3(drone.position.x,drone.position.y-.35,drone.position.z),.12);
      camera.lookAt(ahead);
    }
    renderer.render(scene,camera);
  }
  applyOrbit();frame();
  return {setMode, setManual:(p)=>{manualPhase=p}, destroy(){alive=false;io.disconnect();ro&&ro.disconnect();removeEventListener('resize',resize);renderer.dispose();}};
}
window.FX44={ambient,site};
})();
