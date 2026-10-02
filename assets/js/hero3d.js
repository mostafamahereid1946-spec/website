/* =========================================================
   COREVIA — real-time 3D hero objects (Three.js)
   <canvas class="hero3d" data-variant="logo|knot|cubes|orb|rings">
   ========================================================= */
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const CYAN = 0x1ad4e6, GOLD = 0xd4a23e;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

function logoMesh() {
  const g = new THREE.Group();
  // the "C" — a thick ring sector open to the right
  const s = new THREE.Shape();
  s.absarc(0, 0, 1, Math.PI / 4, Math.PI * 7 / 4, false);
  s.absarc(0, 0, 0.68, Math.PI * 7 / 4, Math.PI / 4, true);
  s.closePath();
  const cGeo = new THREE.ExtrudeGeometry(s, { depth: 0.32, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.04, bevelSegments: 6, curveSegments: 96 });
  cGeo.center();
  const cMat = new THREE.MeshPhysicalMaterial({ color: CYAN, metalness: 0.35, roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.1, emissive: CYAN, emissiveIntensity: 0.18 });
  const c = new THREE.Mesh(cGeo, cMat);
  g.add(c);

  // the gold check — built from three bars
  const gMat = new THREE.MeshPhysicalMaterial({ color: GOLD, metalness: 0.85, roughness: 0.22, clearcoat: 1, emissive: GOLD, emissiveIntensity: 0.12 });
  const pts = [[-0.475, 0.325], [0.05, -0.275], [0.5, 0.25], [0.8, 0.25]].map(([x, y]) => new THREE.Vector2(x + 0.06, y));
  const th = 0.22;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i + 1];
    const len = a.distanceTo(b) + th * (i === 2 ? 0.5 : 0.95);
    const bar = new THREE.Mesh(new THREE.BoxGeometry(len, th, 0.3, 1, 1, 1), gMat);
    bar.position.set((a.x + b.x) / 2, (a.y + b.y) / 2, 0.08);
    bar.rotation.z = Math.atan2(b.y - a.y, b.x - a.x);
    g.add(bar);
  }
  return g;
}

function glassMat(tint = 0xffffff) {
  return new THREE.MeshPhysicalMaterial({ color: tint, metalness: 0, roughness: 0.08, transmission: 1, thickness: 0.6, ior: 1.4, clearcoat: 1, transparent: true, opacity: 0.95 });
}

function build(variant, scene) {
  const root = new THREE.Group();
  scene.add(root);
  const floaters = [];

  if (variant === "logo") {
    root.add(logoMesh());
  } else if (variant === "knot") {
    const k = new THREE.Mesh(new THREE.TorusKnotGeometry(0.8, 0.26, 260, 40, 2, 3),
      new THREE.MeshPhysicalMaterial({ color: CYAN, metalness: 0.5, roughness: 0.15, clearcoat: 1, emissive: CYAN, emissiveIntensity: 0.15 }));
    root.add(k);
  } else if (variant === "cubes") {
    const geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    for (let i = 0; i < 14; i++) {
      const gold = i % 4 === 0;
      const m = new THREE.Mesh(geo, gold
        ? new THREE.MeshPhysicalMaterial({ color: GOLD, metalness: 0.9, roughness: 0.2 })
        : glassMat(i % 3 ? 0xcff8ff : CYAN));
      m.position.set((Math.random() - 0.5) * 3.6, (Math.random() - 0.5) * 2.4, (Math.random() - 0.5) * 2);
      m.rotation.set(Math.random() * 3, Math.random() * 3, 0);
      m.scale.setScalar(0.5 + Math.random() * 0.8);
      m.userData.spin = (Math.random() - 0.5) * 0.8;
      root.add(m); floaters.push(m);
    }
  } else if (variant === "orb") {
    const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 12), glassMat(0xbff6ff));
    root.add(orb);
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.42, 1),
      new THREE.MeshPhysicalMaterial({ color: GOLD, metalness: 1, roughness: 0.25, flatShading: true, emissive: GOLD, emissiveIntensity: 0.2 }));
    root.add(core); floaters.push(core); core.userData.spin = 0.9;
  } else if (variant === "rings") {
    for (let i = 0; i < 4; i++) {
      const t = new THREE.Mesh(new THREE.TorusGeometry(0.6 + i * 0.28, 0.035 + (i === 0 ? 0.03 : 0), 24, 160),
        new THREE.MeshPhysicalMaterial({ color: i % 2 ? GOLD : CYAN, metalness: 0.8, roughness: 0.2, emissive: i % 2 ? GOLD : CYAN, emissiveIntensity: 0.25 }));
      t.rotation.set(Math.random() * 3, Math.random() * 3, 0);
      t.userData.spin = 0.25 + i * 0.12;
      root.add(t); floaters.push(t);
    }
  }

  // orbit rings around everything
  const ringMat = new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.35 });
  const orbit = new THREE.Group();
  [1.55, 1.85].forEach((r, i) => {
    const m = new THREE.Mesh(new THREE.TorusGeometry(r, 0.006, 8, 220), i ? new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.35 }) : ringMat);
    m.rotation.x = Math.PI / 2.4 + i * 0.3; m.rotation.y = i * 0.5;
    orbit.add(m);
  });
  // satellites
  const sat = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), new THREE.MeshBasicMaterial({ color: GOLD }));
  const sat2 = new THREE.Mesh(new THREE.SphereGeometry(0.035, 16, 16), new THREE.MeshBasicMaterial({ color: CYAN }));
  orbit.add(sat, sat2);
  scene.add(orbit);

  // particle field
  const N = innerWidth < 760 ? 450 : 1100;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const r = 2.2 + Math.random() * 4.5, a = Math.random() * Math.PI * 2, y = (Math.random() - 0.5) * 6;
    pos.set([Math.cos(a) * r, y, Math.sin(a) * r - 1.5], i * 3);
  }
  const pg = new THREE.BufferGeometry(); pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const particles = new THREE.Points(pg, new THREE.PointsMaterial({ color: CYAN, size: 0.018, transparent: true, opacity: 0.7, depthWrite: false }));
  scene.add(particles);

  return { root, orbit, sat, sat2, particles, floaters };
}

function init(canvas) {
  const variant = canvas.dataset.variant || "logo";
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch (e) { canvas.remove(); return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 6.2);

  const key = new THREE.PointLight(CYAN, 30, 20); key.position.set(-3, 2, 3); scene.add(key);
  const rim = new THREE.PointLight(GOLD, 26, 20); rim.position.set(3, -1.5, 2); scene.add(rim);
  scene.add(new THREE.AmbientLight(0xffffff, 0.25));

  const o = build(variant, scene);

  function size() {
    const r = canvas.getBoundingClientRect();
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / Math.max(r.height, 1);
    camera.position.z = (camera.aspect < 0.8 ? 8 : 6.2) * (variant === "logo" ? 1.25 : 1);
    camera.updateProjectionMatrix();
  }
  size(); new ResizeObserver(size).observe(canvas);

  let mx = 0, my = 0, tx = 0, ty = 0;
  addEventListener("pointermove", e => { tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5; }, { passive: true });

  let onScreen = true;
  new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; if (onScreen) requestAnimationFrame(loop); }).observe(canvas);

  const clock = new THREE.Clock();
  function loop() {
    if (!onScreen) return;
    const t = reduce ? 1 : clock.getElapsedTime();
    mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
    const sec = canvas.closest("section") || document.body;
    const rect = sec.getBoundingClientRect();
    const sp = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1); // 0 → 1 while scrolling past the hero

    o.root.rotation.y = Math.sin(t * 0.5) * 0.35 + mx * 0.9 + sp * Math.PI * 1.2;
    o.root.rotation.x = Math.cos(t * 0.4) * 0.15 + my * 0.6 + sp * 0.6;
    o.root.position.y = Math.sin(t * 1.1) * 0.08 + sp * 0.8;
    o.root.scale.setScalar(1 - sp * 0.35);
    o.floaters.forEach((f, i) => {
      f.rotation.x += 0.004 * (f.userData.spin || 1);
      f.rotation.y += 0.006 * (f.userData.spin || 1);
      if (variant === "cubes") f.position.y += Math.sin(t + i) * 0.0015;
    });
    o.orbit.rotation.z = t * 0.12;
    o.orbit.rotation.y = mx * 0.4;
    o.sat.position.set(Math.cos(t * 0.8) * 1.55, 0, Math.sin(t * 0.8) * 1.55).applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2.4 - Math.PI / 2);
    o.sat2.position.set(Math.cos(-t * 0.6 + 2) * 1.85, Math.sin(-t * 0.6 + 2) * 0.5, Math.sin(-t * 0.6 + 2) * 1.6);
    o.particles.rotation.y = t * 0.02 + sp * 0.8;
    camera.position.x = mx * 0.6; camera.position.y = -my * 0.4;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    if (!reduce) requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
  if (reduce) addEventListener("scroll", () => requestAnimationFrame(loop), { passive: true });
  canvas.classList.add("is-ready");
}

document.querySelectorAll("canvas.hero3d").forEach(init);
