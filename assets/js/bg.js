/* =========================================================
   COREVIA — live WebGL background
   Domain-warped flowing light in brand colours, diagonal
   "card" lines and rings. Reacts to scroll + mouse.
   Optional Gemini Omni video layer on top (see config.js).
   ========================================================= */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const page = document.body.dataset.page || "home";

  /* ---------- optional generated video layer ---------- */
  const cfg = (window.COREVIA && window.COREVIA.backgrounds && window.COREVIA.backgrounds[page]) || {};
  if (cfg.src) {
    const v = document.createElement("video");
    v.className = "bg-video";
    v.src = cfg.src;
    v.muted = true;
    v.playsInline = true;
    v.preload = "auto";
    v.style.opacity = cfg.opacity ?? 0.5;
    if (cfg.poster) v.poster = cfg.poster;
    if (cfg.mode === "scrub" && !reduce) {
      v.pause();
      let target = 0;
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - innerHeight;
        target = max > 0 ? scrollY / max : 0;
      };
      addEventListener("scroll", onScroll, { passive: true });
      let cur = 0;
      const tick = () => {
        if (v.duration) {
          const t = target * (v.duration - 0.05);
          cur += (t - cur) * 0.1;
          // only seek when the position really moved — constant seeking is expensive
          if (Math.abs(cur - v.currentTime) > 0.04 && !v.seeking) v.currentTime = cur;
        }
        requestAnimationFrame(tick);
      };
      v.addEventListener("loadedmetadata", () => { onScroll(); tick(); }, { once: true });
      // iOS only buffers a video after play() — prime it, then pause
      v.play().then(() => v.pause()).catch(() => {});
    } else {
      v.loop = true;
      v.autoplay = true;
      v.play().catch(() => {});
    }
    v.addEventListener("error", () => v.remove());
    document.body.prepend(v);
  }

  /* ---------- WebGL shader ---------- */
  const canvas = document.createElement("canvas");
  canvas.className = "bg-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
  if (!gl) { canvas.classList.add("bg-fallback"); return; }

  const variants = { home: 0, services: 1, work: 2, pricing: 3, about: 4, contact: 5, notfound: 2 };

  const vert = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
  const frag = `
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform float uScroll; uniform vec2 uMouse; uniform float uVar;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 r=mat2(.8,-.6,.6,.8);for(int i=0;i<5;i++){v+=a*noise(p);p=r*p*2.02;a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/uRes; vec2 p=(gl_FragCoord.xy-.5*uRes)/uRes.y;
  float t=uTime*.045; float s=uScroll;
  vec2 m=(uMouse-.5)*vec2(uRes.x/uRes.y,1.);
  p+=m*.05;
  // scroll morphs the field: zoom + twist
  float ang=s*1.6+uVar*.7; mat2 rot=mat2(cos(ang),-sin(ang),sin(ang),cos(ang));
  vec2 q=rot*p*(1.15+s*.9);
  vec2 w=vec2(fbm(q+t+uVar),fbm(q-t*1.3+3.1));
  vec2 w2=vec2(fbm(q+2.2*w+vec2(1.7,9.2)+t*.6),fbm(q+2.2*w+vec2(8.3,2.8)-t*.4));
  float f=fbm(q+2.6*w2);
  vec3 navy=vec3(.020,.055,.075), deep=vec3(.035,.11,.14);
  vec3 cyan=vec3(.10,.83,.90), gold=vec3(.83,.63,.24);
  vec3 col=mix(navy,deep,smoothstep(.2,.8,f));
  float glow=smoothstep(.55,.95,f*length(w2)*1.6);
  col+=cyan*glow*.38;
  col+=gold*smoothstep(.72,1.,w2.x*f*1.5)*(.16+.25*s);
  // mouse light
  col+=cyan*.06*exp(-length(p-m)*3.5);
  // diagonal card lines
  float d=fract((p.x*1.0-p.y*.48)*5.0+t*.6);
  col+=cyan*.035*smoothstep(.985,1.,d);
  // big ring from the business card
  vec2 rc=p-vec2(.55-s*.9,.28+s*.4);
  float r=abs(length(rc)-(.42+s*.35));
  col+=cyan*.11*smoothstep(.006,.0,r)+cyan*.035*smoothstep(.06,.0,r);
  // vignette + grain
  col*=1.-.55*pow(length(uv-.5)*1.25,2.);
  col+=(hash(gl_FragCoord.xy+uTime)-.5)*.018;
  gl_FragColor=vec4(col,1.);
}`;

  function sh(type, src) {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
    return s;
  }
  const vs = sh(gl.VERTEX_SHADER, vert), fs = sh(gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) { canvas.classList.add("bg-fallback"); return; }
  const prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog); gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const U = n => gl.getUniformLocation(prog, n);
  const uRes = U("uRes"), uTime = U("uTime"), uScroll = U("uScroll"), uMouse = U("uMouse"), uVar = U("uVar");
  gl.uniform1f(uVar, variants[page] ?? 0);

  // render at reduced resolution — it's a soft background, keeps phones cool
  const scale = Math.min(window.devicePixelRatio || 1, 1.5) * (innerWidth < 760 ? 0.45 : 0.6);
  function resize() {
    canvas.width = Math.floor(innerWidth * scale);
    canvas.height = Math.floor(innerHeight * scale);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
  }
  resize(); addEventListener("resize", resize);

  let mouse = [0.5, 0.5], mTarget = [0.5, 0.5], scroll = 0;
  addEventListener("pointermove", e => { mTarget = [e.clientX / innerWidth, 1 - e.clientY / innerHeight]; }, { passive: true });

  let visible = true;
  document.addEventListener("visibilitychange", () => { visible = !document.hidden; if (visible) requestAnimationFrame(frame); });

  const start = performance.now();
  function frame(now) {
    if (!visible) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    const target = max > 0 ? scrollY / max : 0;
    scroll += (target - scroll) * 0.06;
    mouse[0] += (mTarget[0] - mouse[0]) * 0.05;
    mouse[1] += (mTarget[1] - mouse[1]) * 0.05;
    gl.uniform1f(uTime, reduce ? 20 : (now - start) / 1000);
    gl.uniform1f(uScroll, scroll);
    gl.uniform2f(uMouse, mouse[0], mouse[1]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (!reduce) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  if (reduce) addEventListener("scroll", () => requestAnimationFrame(frame), { passive: true });
})();
