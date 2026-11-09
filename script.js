const burger=document.querySelector(".burger"),nav=document.getElementById("nav");
burger.addEventListener("click",()=>{const o=burger.getAttribute("aria-expanded")!=="true";burger.setAttribute("aria-expanded",o);nav.classList.toggle("open",o)});
nav.addEventListener("click",e=>{if(e.target.closest("a")){burger.setAttribute("aria-expanded","false");nav.classList.remove("open")}});

(function(){
const cv=document.getElementById("stage"),T=window.THREE;if(!T||!cv)return;
try{go()}catch(e){console.warn("3D off",e)}
function go(){
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches,SPD=reduce?.25:1;
const R=new T.WebGLRenderer({canvas:cv,antialias:true});
R.outputEncoding=T.sRGBEncoding;R.toneMapping=T.ACESFilmicToneMapping;R.toneMappingExposure=1.15;R.setClearColor(0x06090a);
const S=new T.Scene();S.fog=new T.Fog(0x06090a,13,34);
const FOV=48,D=14,C=new T.PerspectiveCamera(FOV,1,.1,80);C.position.z=D;

const studio=new T.Scene();studio.background=new T.Color(0x0a1512);
[[9,5,0xffffff,7,0,8,2],[3,9,0xffd9a0,6,-8,0,3],[3,9,0x5df2c0,4,8,0,2],[12,3,0xfff4e0,3,0,-6,6],[6,6,0xffffff,2,0,0,-8]].forEach(([w,h,c,i,x,y,z])=>{
 const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({color:new T.Color(c).multiplyScalar(i),side:T.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);studio.add(m)});
S.environment=new T.PMREMGenerator(R).fromScene(studio,.03).texture;
const k=new T.DirectionalLight(0xffe2b0,1.6);k.position.set(4,6,8);const r=new T.DirectionalLight(0x5df2c0,1.2);r.position.set(-6,2,-4);
S.add(k,r,new T.AmbientLight(0x88aa99,.25));

const P=(c,o={})=>new T.MeshPhysicalMaterial(Object.assign({color:c,roughness:.2,clearcoat:1,clearcoatRoughness:.05,envMapIntensity:1.3},o));
const M={em:P(0x0d8a5f,{roughness:.16}),ob:P(0x0a0d10,{roughness:.1,envMapIntensity:1.8}),pe:P(0xf3efe4,{roughness:.28}),
 mint:P(0x5df2c0,{emissive:0x14a07a,emissiveIntensity:.55,roughness:.25}),
 gold:new T.MeshStandardMaterial({color:0xd9b878,metalness:1,roughness:.2,envMapIntensity:1.6})};
const pal=[[M.em,M.gold],[M.ob,M.gold],[M.pe,M.em],[M.mint,M.ob],[M.gold,M.ob],[M.em,M.pe]];
const lathe=p=>new T.LatheGeometry(p.map(a=>new T.Vector2(a[0],a[1])),56);
const rnd=(a,b)=>a+Math.random()*(b-a),pick=a=>a[Math.floor(Math.random()*a.length)];
const capH=(r,h)=>{const p=[[r,0],[r,h]];for(let i=1;i<=16;i++){const a=i/16*Math.PI/2;p.push([r*Math.cos(a),h+r*Math.sin(a)])}return lathe(p)};
const CAP=capH(.34,.5);
function capsule(){const[a,b]=pick(pal),g=new T.Group(),t=new T.Mesh(CAP,a),u=new T.Mesh(CAP,b);u.rotation.x=Math.PI;
 const s=new T.Mesh(new T.TorusGeometry(.342,.014,12,56),M.gold);s.rotation.x=Math.PI/2;g.add(t,u,s);return g}
function tablet(){const[a,b]=pick(pal),h=.16,q=.06,r=.42,p=[[0,-h/2]];
 for(let i=0;i<=8;i++){const t=-Math.PI/2+i/8*Math.PI/2;p.push([r-q+q*Math.cos(t),-h/2+q+q*Math.sin(t)])}
 for(let i=0;i<=8;i++){const t=i/8*Math.PI/2;p.push([r-q+q*Math.cos(t),h/2-q+q*Math.sin(t)])}p.push([0,h/2]);
 const g=new T.Group();g.add(new T.Mesh(lathe(p),a));const m=new T.Mesh(new T.BoxGeometry(r*1.7,.035,.05),b);m.position.y=h/2-.014;g.add(m);return g}
const CRG=(()=>{const s=new T.Shape(),a=.15,L=.46;[[-a,-L],[a,-L],[a,-a],[L,-a],[L,a],[a,a],[a,L],[-a,L],[-a,a],[-L,a],[-L,-a],[-a,-a]].forEach((q,i)=>i?s.lineTo(...q):s.moveTo(...q));
 const g=new T.ExtrudeGeometry(s,{depth:.14,bevelEnabled:true,bevelThickness:.06,bevelSize:.06,bevelSegments:12,curveSegments:1});g.center();return g})();
const cross=()=>new T.Mesh(CRG,pick([M.em,M.mint,M.gold,M.pe]));
const SPH=new T.SphereGeometry(1,36,24),CYL=new T.CylinderGeometry(.02,.02,1,10),UP=new T.Vector3(0,1,0);
function molecule(){const g=new T.Group(),n=[[0,0,0,.2],[.5,.3,.1,.12],[-.45,.35,-.1,.14],[.05,-.55,.1,.13],[.6,-.4,-.1,.09]];
 n.forEach((q,i)=>{const m=new T.Mesh(SPH,i?pick([M.gold,M.pe,M.mint,M.em]):M.em);m.scale.setScalar(q[3]);m.position.set(q[0],q[1],q[2]);g.add(m)});
 [1,2,3,4].forEach(j=>{const a=new T.Vector3(0,0,0),b=new T.Vector3(n[j][0],n[j][1],n[j][2]),d=b.clone().sub(a),c=new T.Mesh(CYL,M.gold);c.scale.y=d.length();c.position.copy(b).multiplyScalar(.5);c.quaternion.setFromUnitVectors(UP,d.normalize());g.add(c)});return g}
const ring=()=>{const m=new T.Mesh(new T.TorusGeometry(.4,.045,20,72),pick([M.gold,M.em,M.mint]));return m};
const makers=[capsule,capsule,capsule,tablet,tablet,cross,molecule,ring];

const objs=[];let W=1,H=1,hw=1,hh=1,aspect=1;
const span=z=>{const h=(D-z)*Math.tan(FOV*Math.PI/360);return[h*aspect+1.5,h+1.5]};
function build(n){objs.forEach(o=>S.remove(o.g));objs.length=0;
 for(let i=0;i<n;i++){const g=pick(makers)(),z=i<3?rnd(-9,-6):rnd(-7,5),big=i<3?rnd(2.2,3.2):rnd(.7,1.5),[sx,sy]=span(z);
  g.scale.setScalar(big);g.position.set(rnd(-sx,sx),rnd(-sy,sy),z);g.rotation.set(rnd(0,6),rnd(0,6),rnd(0,6));
  const v=new T.Vector3(rnd(-1.2,1.2),rnd(-.9,.9),0);if(Math.abs(v.x)<.5)v.x+=v.x<0?-.6:.6;
  S.add(g);objs.push({g,base:v,v:v.clone(),sp:new T.Vector3(rnd(-1.4,1.4),rnd(-1.4,1.4),rnd(-.8,.8)),ph:rnd(0,6),z})}}
function size(){W=cv.clientWidth||innerWidth;H=cv.clientHeight||innerHeight;aspect=W/H;
 R.setPixelRatio(Math.min(devicePixelRatio||1,W<700?1.6:2));R.setSize(W,H,false);C.aspect=aspect;C.updateProjectionMatrix();
 const n=W<700?15:W<1100?24:34;if(objs.length!==n)build(n)}
const dust=(()=>{const n=500,a=new Float32Array(n*3);for(let i=0;i<n;i++){a[i*3]=rnd(-22,22);a[i*3+1]=rnd(-14,14);a[i*3+2]=rnd(-12,8)}
 const g=new T.BufferGeometry();g.setAttribute("position",new T.BufferAttribute(a,3));
 const p=new T.Points(g,new T.PointsMaterial({color:0xd9b878,size:.06,transparent:true,opacity:.7,depthWrite:false}));S.add(p);return p})();

const ptr={x:0,y:0,on:false,t:-99},tg={x:0,y:0};let burst=0,t=0,last=performance.now(),sy0=scrollY,svel=0;
const setP=(x,y)=>{tg.x=x/innerWidth*2-1;tg.y=-(y/innerHeight*2-1);ptr.on=true;ptr.t=t};
addEventListener("pointermove",e=>setP(e.clientX,e.clientY),{passive:true});
addEventListener("pointerdown",e=>{setP(e.clientX,e.clientY);ptr.x=tg.x;ptr.y=tg.y;burst=1},{passive:true});
addEventListener("touchmove",e=>{const q=e.touches[0];if(q)setP(q.clientX,q.clientY)},{passive:true});
document.addEventListener("pointerleave",()=>{ptr.on=false});
addEventListener("resize",size);

const wr=(v,m)=>v>m?-m:v<-m?m:v;
function frame(now){requestAnimationFrame(frame);if(document.hidden)return;
 const dt=Math.min((now-last)/1000,.05)*SPD;last=now;t+=dt;
 const dy=scrollY-sy0;sy0=scrollY;svel+=(Math.min(Math.abs(dy),90)/30-svel)*.1;
 const wander=!ptr.on||t-ptr.t>3;
 if(wander){tg.x=Math.sin(t*.9)*.75;tg.y=Math.cos(t*.7)*.55}
 ptr.x+=(tg.x-ptr.x)*.12;ptr.y+=(tg.y-ptr.y)*.12;
 const sp=document.documentElement.scrollHeight-innerHeight,prog=sp>0?scrollY/sp:0;
 C.position.set(ptr.x*1.1+Math.sin(t*.3)*.5,ptr.y*.7-prog*3,D-prog*3);C.lookAt(ptr.x*.4,-prog*3,0);
 const boost=1+svel*1.6+burst*3;
 objs.forEach(o=>{const g=o.g,[sx,sy]=span(o.z);
  const px=ptr.x*sx*.9,py=ptr.y*sy*.9,dx=g.position.x-px,dyy=g.position.y-py,d=Math.hypot(dx,dyy)+.001,rad=4.2+burst*5;
  if(d<rad){const f=Math.pow(1-d/rad,2)*(wander?26:46);o.v.x+=dx/d*f*dt+(-dyy/d)*f*dt*.4;o.v.y+=dyy/d*f*dt+(dx/d)*f*dt*.4}
  o.v.lerp(o.base,Math.min(1,dt*.9));
  g.position.x=wr(g.position.x+o.v.x*dt*1.3,sx);g.position.y=wr(g.position.y+(o.v.y+Math.sin(t*1.3+o.ph)*.35)*dt*1.3,sy);
  const near=d<rad?1+(1-d/rad)*4:1;
  g.rotation.x+=o.sp.x*dt*boost*near;g.rotation.y+=o.sp.y*dt*boost*near;g.rotation.z+=o.sp.z*dt*boost})
 burst*=.93;dust.rotation.y=t*.03;dust.position.y=(t*.3)%2-1;
 R.render(S,C)}
size();requestAnimationFrame(frame);
}})();
