/*!
 * Silver Sphinx — animated 3D logo (embeddable)
 *
 * Markup:
 *   <div class="ss-logo" data-silversphinx-logo>
 *     <img src="/silversphinx-logo.png" alt="Silver Sphinx">
 *   </div>
 *   <script src="/silversphinx-logo.js" defer></script>
 *
 * The <img> is the static logo. It is what people see first, what people with reduced-motion settings keep seeing,
 * and what stays if WebGL is unavailable. The script fades the animated version in over it.
 *
 * Optional attributes on the container:
 *   data-mode="full" | "s"        full mark (default) or just the S
 *   data-sway="0.28"              sway in radians (0 = hold still)
 *   data-interactive="hover"      tilt slightly towards the pointer
 *   data-stars="true"             faint stars around the mark (full mode; needs a roomy container)
 *   data-animate="false"          draw a single still frame
 *   data-three-src="/vendor/three.min.js"   self-hosted three.js r128 (recommended for production)
 *
 * Needs three.js r128. Made for dark backgrounds.
 */
(function (global) {
  'use strict';

  var THREE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  var S_OUTLINE = [[0.341,1.696],[0.327,1.691],[0.254,1.631],[0.011,1.42],[-0.071,1.344],[-0.236,1.211],[-0.455,1.042],[-0.606,0.948],[-0.614,0.937],[-0.61,0.932],[-0.551,0.906],[-0.506,0.867],[-0.486,0.835],[-0.473,0.803],[-0.456,0.734],[-0.451,0.666],[-0.46,0.542],[-0.46,0.396],[-0.464,0.364],[-0.464,-0.016],[-0.452,-0.062],[-0.432,-0.087],[-0.419,-0.092],[-0.4,-0.084],[-0.332,-0.021],[0.213,0.398],[0.24,0.405],[0.277,0.404],[0.318,0.394],[0.368,0.374],[0.423,0.339],[0.46,0.309],[0.5,0.263],[0.536,0.213],[0.571,0.144],[0.591,0.085],[0.606,0.016],[0.611,-0.048],[0.611,-0.611],[0.606,-0.652],[0.606,-1.055],[0.599,-1.09],[0.584,-1.095],[0.573,-1.086],[0.493,-0.927],[0.367,-0.712],[0.248,-0.538],[0.153,-0.419],[0.089,-0.35],[0.039,-0.305],[-0.025,-0.257],[-0.076,-0.226],[-0.144,-0.191],[-0.222,-0.163],[-0.3,-0.145],[-0.396,-0.135],[-0.483,-0.14],[-0.57,-0.156],[-0.803,-0.307],[-0.959,-0.419],[-1.091,-0.529],[-1.132,-0.57],[-1.159,-0.606],[-1.169,-0.643],[-1.166,-0.658],[-1.153,-0.655],[-1.041,-0.524],[-0.995,-0.49],[-0.931,-0.474],[-0.826,-0.474],[-0.721,-0.489],[-0.643,-0.509],[-0.556,-0.539],[-0.483,-0.573],[-0.423,-0.608],[-0.364,-0.649],[-0.304,-0.698],[-0.263,-0.739],[-0.196,-0.817],[-0.091,-0.963],[-0.005,-1.11],[0.031,-1.178],[0.101,-1.348],[0.152,-1.508],[0.188,-1.663],[0.201,-1.691],[0.213,-1.698],[0.22,-1.694],[0.309,-1.604],[0.442,-1.486],[0.602,-1.348],[0.643,-1.319],[0.78,-1.205],[1.055,-0.964],[1.16,-0.878],[1.167,-0.867],[1.142,-0.789],[1.133,-0.707],[1.128,0.185],[1.118,0.286],[1.103,0.373],[1.079,0.446],[1.029,0.529],[0.985,0.583],[0.895,0.675],[0.803,0.746],[0.73,0.793],[0.698,0.808],[0.675,0.812],[0.661,0.807],[0.345,0.553],[0.14,0.394],[0.108,0.392],[0.089,0.398],[0.067,0.414],[0.045,0.451],[0.03,0.551],[0.021,0.684],[0.021,1.014],[0.031,1.146],[0.04,1.162],[0.053,1.163],[0.066,1.155],[0.144,1.069],[0.249,0.979],[0.304,0.942],[0.373,0.905],[0.474,0.867],[0.542,0.85],[0.602,0.84],[0.702,0.84],[0.725,0.846],[0.739,0.854],[1.014,1.069],[1.082,1.128],[1.108,1.16],[1.145,1.229],[1.158,1.274],[1.16,1.297],[1.153,1.315],[1.137,1.323],[1.124,1.318],[1.115,1.302],[1.103,1.224],[1.09,1.187],[1.077,1.169],[1.046,1.148],[1.018,1.143],[0.972,1.148],[0.904,1.169],[0.803,1.216],[0.666,1.302],[0.606,1.348],[0.529,1.421],[0.465,1.494],[0.431,1.54],[0.386,1.613],[0.351,1.686]];

  var threePromise = null;
  function loadThree(src) {
    if (global.THREE) return Promise.resolve(global.THREE);
    if (!threePromise) {
      threePromise = new Promise(function (resolve, reject) {
        var s = document.createElement('script');
        s.src = src || THREE_URL; s.async = true;
        s.onload = function () { global.THREE ? resolve(global.THREE) : reject(new Error('three.js did not load')); };
        s.onerror = function () { reject(new Error('three.js failed to load')); };
        document.head.appendChild(s);
      });
    }
    return threePromise;
  }

  var styled = false;
  function injectStyle() {
    if (styled) return; styled = true;
    var st = document.createElement('style');
    st.textContent =
      '[data-silversphinx-logo]{position:relative;display:block}' +
      '[data-silversphinx-logo]>img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;transition:opacity .9s ease}' +
      '[data-silversphinx-logo]>canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0;transition:opacity .9s ease}';
    document.head.appendChild(st);
  }

  function attrNum(el, name, dflt) { var v = parseFloat(el.getAttribute(name)); return isNaN(v) ? dflt : v; }
  function attrBool(el, name, dflt) { var v = el.getAttribute(name); return v === null ? dflt : v !== 'false'; }

  function mount(el, opts) {
    opts = opts || {};
    injectStyle();
    var reduce = false;
    try { reduce = global.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    var o = {
      mode: opts.mode || el.getAttribute('data-mode') || 'full',
      sway: opts.sway != null ? opts.sway : attrNum(el, 'data-sway', 0.28),
      hover: (opts.interactive || el.getAttribute('data-interactive')) === 'hover',
      stars: opts.stars != null ? opts.stars : attrBool(el, 'data-stars', false),
      animate: opts.animate != null ? opts.animate : attrBool(el, 'data-animate', true),
      threeSrc: opts.threeSrc || el.getAttribute('data-three-src') || null,
      time: attrNum(el, 'data-time', 3.0)
    };
    var img = el.querySelector('img');
    if (reduce) {
      if (img) return Promise.resolve(null);   // people who ask for less motion keep the static logo
      o.animate = false;                        // no image supplied: draw one still frame instead
    }
    return loadThree(o.threeSrc).then(function (THREE) { return build(THREE, el, o, img); })
      .catch(function (err) { if (global.console) console.warn('[silversphinx-logo]', err.message); return null; });
  }

  function build(THREE, el, o, img) {
    var V3 = THREE.Vector3, PI = Math.PI;
    var full = o.mode !== 's';

    var renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' }); }
    catch (e) { return null; }
    renderer.setPixelRatio(Math.min(global.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    var canvas = renderer.domElement;
    el.appendChild(canvas);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    var root = new THREE.Group(); scene.add(root);

    /* ---------- helpers ---------- */
    var glowTex = (function () {
      var c = document.createElement('canvas'); c.width = c.height = 128;
      var g = c.getContext('2d'), grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(0.2, 'rgba(255,255,255,.5)');
      grd.addColorStop(0.55, 'rgba(255,255,255,.1)'); grd.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = grd; g.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    })();
    function sprite(size, opacity) {
      var s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xffffff, transparent: true,
        opacity: opacity, blending: THREE.AdditiveBlending, depthWrite: false }));
      s.scale.set(size, size, 1); return s;
    }
    function hash(i) { var x = Math.sin(i * 91.7 + 13.1) * 43758.5453; return x - Math.floor(x); }

    /* ---------- materials ---------- */
    var sMat = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1,
      uniforms: { uTime: { value: 0 } },
      vertexShader: [
        'attribute float aT; varying vec3 vN; varying vec3 vV; varying float vT;',
        'void main(){ vT = aT; vec4 mv = modelViewMatrix * vec4(position,1.0);',
        ' vN = normalize(normalMatrix * normal); vV = -mv.xyz; gl_Position = projectionMatrix * mv; }'
      ].join('\n'),
      fragmentShader: [
        'varying vec3 vN; varying vec3 vV; varying float vT; uniform float uTime;',
        'void main(){',
        ' vec3 n = normalize(vN); if(!gl_FrontFacing) n = -n;',
        ' vec3 v = normalize(vV);',
        ' float f = 1.0 - max(dot(n, v), 0.0);',
        ' vec3 L1 = normalize(vec3(-0.5, 0.8, 0.6)); vec3 L2 = normalize(vec3(0.7, -0.2, 0.5));',
        ' float d1 = max(dot(n, L1), 0.0); float d2 = max(dot(n, L2), 0.0);',
        ' vec3 r = reflect(-v, n);',
        ' float sky = smoothstep(-0.1, 1.0, r.y);',
        ' float spec = pow(max(dot(reflect(-L1, n), v), 0.0), 28.0);',
        ' float base = 0.08 + 0.30 * d1 + 0.11 * d2 + 0.20 * pow(sky, 3.0);',
        ' float sweep = exp(-pow((fract(vT - uTime * 0.05) - 0.5) * 7.0, 2.0));',
        ' float g = base + spec * 0.9 + pow(f, 2.0) * 0.3 + sweep * 0.16 + sweep * 0.2 * f;',
        ' gl_FragColor = vec4(vec3(g) * vec3(0.93, 0.97, 1.0), 1.0);',
        '}'
      ].join('\n')
    });
    var ridgeMat = new THREE.LineBasicMaterial({ color: 0xf2f6ff, transparent: true, opacity: 0.9 });

    /* ---------- the S (traced from a blackletter reference) ---------- */
    var S_STRETCH = 1.4;
    var shape = new THREE.Shape(S_OUTLINE.map(function (p) { return new THREE.Vector2(p[0], p[1] * S_STRETCH); }));
    var DEPTH = 0.2, BEV = 0.025;
    var sGeo = new THREE.ExtrudeGeometry(shape, {
      depth: DEPTH, bevelEnabled: true, bevelThickness: BEV, bevelSize: BEV * 0.8, bevelSegments: 1, steps: 1, curveSegments: 1
    });
    sGeo.translate(0, 0, -DEPTH / 2);
    (function () {
      var p = sGeo.attributes.position, a = new Float32Array(p.count);
      for (var j = 0; j < p.count; j++) a[j] = (p.getY(j) + 2.5) / 5.0;
      sGeo.setAttribute('aT', new THREE.BufferAttribute(a, 1));
    })();
    root.add(new THREE.Mesh(sGeo, sMat));
    root.add(new THREE.LineSegments(new THREE.EdgesGeometry(sGeo, 28), ridgeMat));
    var sAura = sprite(6.0, 0.05); sAura.position.set(0, 0, -0.5); root.add(sAura);

    var flowMat, veilMat, solids = [], twinklers = [];

    if (full) {
      var sphereMat = new THREE.ShaderMaterial({
        vertexShader: [
          'varying vec3 vN; varying vec3 vV;',
          'void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0);',
          ' vN = normalize(normalMatrix * normal); vV = -mv.xyz; gl_Position = projectionMatrix * mv; }'
        ].join('\n'),
        fragmentShader: [
          'varying vec3 vN; varying vec3 vV;',
          'void main(){',
          ' vec3 n = normalize(vN); vec3 v = normalize(vV);',
          ' float f = 1.0 - max(dot(n, v), 0.0);',
          ' vec3 L = normalize(vec3(-0.45, 0.65, 0.6));',
          ' float diff = max(dot(n, L), 0.0);',
          ' float spec = pow(max(dot(reflect(-L, n), v), 0.0), 26.0);',
          ' float g = 0.03 + 0.14 * diff + 0.45 * spec + pow(f, 3.0) * 0.85 + smoothstep(0.84, 0.99, f) * 0.85;',
          ' gl_FragColor = vec4(vec3(g) * vec3(0.93, 0.97, 1.0), 1.0);',
          '}'
        ].join('\n')
      });

      // Paths of light: a soft filament with drifting motes and comets travelling along it.
      flowMat = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 } },
        vertexShader: [
          'attribute float aS; attribute float aLen; attribute float aSeed; attribute float aClosed; attribute float aBase;',
          'varying float vS; varying float vLen; varying float vSeed; varying float vClosed; varying float vBase;',
          'varying vec3 vN; varying vec3 vV;',
          'void main(){ vS = aS; vLen = aLen; vSeed = aSeed; vClosed = aClosed; vBase = aBase;',
          ' vec4 mv = modelViewMatrix * vec4(position,1.0);',
          ' vN = normalize(normalMatrix * normal); vV = -mv.xyz; gl_Position = projectionMatrix * mv; }'
        ].join('\n'),
        fragmentShader: [
          'varying float vS; varying float vLen; varying float vSeed; varying float vClosed; varying float vBase;',
          'varying vec3 vN; varying vec3 vV; uniform float uTime;',
          'const float TAU = 6.2831853;',
          'void main(){',
          ' vec3 n = normalize(vN); vec3 v = normalize(vV);',
          ' float ndv = max(dot(n, v), 0.0);',
          ' float prof = pow(ndv, 6.0) + 0.35 * pow(ndv, 1.5);',
          ' float dir = vSeed < 0.5 ? 1.0 : -1.0;',
          ' float s = vS;',
          ' float endFade = mix(smoothstep(0.0, 0.35, s) * smoothstep(0.0, 0.35, vLen - s), 1.0, vClosed);',
          ' float k1 = mix(4.0, TAU * floor(vLen * 4.0 / TAU + 0.5) / vLen, vClosed);',
          ' float shimmer = 0.72 + 0.28 * sin(s * k1 - uTime * 1.1 * dir + vSeed * 20.0);',
          ' float k2 = mix(10.0, TAU * floor(vLen * 10.0 / TAU + 0.5) / vLen, vClosed);',
          ' float motes = smoothstep(0.92, 1.0, sin(s * k2 - uTime * 0.7 * dir + vSeed * 31.0));',
          ' float sp = 0.55 + 0.5 * fract(vSeed * 7.31);',
          ' float period = mix(vLen + 2.8, vLen, vClosed);',
          ' float head = mod(uTime * sp + fract(vSeed * 3.17) * period, period) - mix(1.4, 0.0, vClosed);',
          ' float ss = dir > 0.0 ? s : vLen - s;',
          ' float d = head - ss;',
          ' d = mix(d, mod(d, vLen), vClosed);',
          ' float comet = d >= 0.0 ? exp(-d * 1.4) : exp(d * 26.0);',
          ' float a = (vBase * shimmer + 0.5 * motes + 1.6 * comet) * endFade * prof;',
          ' gl_FragColor = vec4(vec3(0.80, 0.90, 1.0), clamp(a, 0.0, 1.0));',
          '}'
        ].join('\n')
      });

      var veilMat = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uHalf: { value: 3.84 }, uCenter: { value: 0.34 } },
        vertexShader: [
          'varying vec3 vN; varying vec3 vV; varying float vY;',
          'void main(){ vY = position.y; vec4 mv = modelViewMatrix * vec4(position,1.0);',
          ' vN = normalize(normalMatrix * normal); vV = -mv.xyz; gl_Position = projectionMatrix * mv; }'
        ].join('\n'),
        fragmentShader: [
          'varying vec3 vN; varying vec3 vV; varying float vY; uniform float uTime; uniform float uHalf; uniform float uCenter;',
          'void main(){',
          ' float ndv = abs(dot(normalize(vN), normalize(vV)));',
          ' float rim = pow(1.0 - ndv, 3.2);',
          ' float band = 0.6 + 0.4 * sin((vY + uCenter) * 2.2 - uTime * 0.5);',
          ' float fade = smoothstep(uHalf, uHalf - 1.18, abs(vY));',
          ' gl_FragColor = vec4(0.78, 0.88, 1.0, rim * band * fade * 0.20);',
          '}'
        ].join('\n')
      });

      var ghostMat = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        vertexShader: [
          'varying vec3 vN; varying vec3 vV;',
          'void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0);',
          ' vN = normalize(normalMatrix * normal); vV = -mv.xyz; gl_Position = projectionMatrix * mv; }'
        ].join('\n'),
        fragmentShader: [
          'varying vec3 vN; varying vec3 vV;',
          'void main(){ float f = 1.0 - max(dot(normalize(vN), normalize(vV)), 0.0);',
          ' gl_FragColor = vec4(0.8, 0.9, 1.0, pow(f, 2.2) * 0.32); }'
        ].join('\n')
      });

      /* ---------- the Tree of Life on a circular tube ---------- */
      var R = 1.83, TOP = 4.18, BOT = 3.5;
      var NODES = [
        { p: new V3(  0,  TOP,   0), r: 0.30 },                 // 0 Keter
        { p: new V3( -R, 3.18,   0), r: 0.30 },                 // 1 Binah
        { p: new V3(  R, 3.18,   0), r: 0.30 },                 // 2 Chokhmah
        { p: new V3(  0, 2.10,   R), r: 0.34, dotted: true },   // 3 Da'at   (front)
        { p: new V3( -R, 1.03,   0), r: 0.30 },                 // 4 Gevurah
        { p: new V3(  R, 1.03,   0), r: 0.30 },                 // 5 Chesed
        { p: new V3(  0, 0.00,  -R), r: 0.34 },                 // 6 Tiferet (behind the S)
        { p: new V3( -R,-1.07,   0), r: 0.30 },                 // 7 Hod
        { p: new V3(  R,-1.07,   0), r: 0.30 },                 // 8 Netzach
        { p: new V3(  0,-2.10,   R), r: 0.30 },                 // 9 Yesod   (front)
        { p: new V3(  0, -BOT,   0), r: 0.30 }                  // 10 Malkuth
      ];
      var frame = new THREE.Group(); root.add(frame);

      var flowCount = 0;
      var flowTube = function (curve, radius, base, closed, segs) {
        var geo = new THREE.TubeGeometry(curve, segs, radius, 8, closed);
        var len = curve.getLength(), uv = geo.attributes.uv, n = uv.count;
        var aS = new Float32Array(n), aLen = new Float32Array(n).fill(len), aSeed = new Float32Array(n).fill(hash(flowCount++));
        var aClosed = new Float32Array(n).fill(closed ? 1 : 0), aBase = new Float32Array(n).fill(base);
        for (var i = 0; i < n; i++) aS[i] = uv.getX(i) * len;
        geo.setAttribute('aS', new THREE.BufferAttribute(aS, 1));
        geo.setAttribute('aLen', new THREE.BufferAttribute(aLen, 1));
        geo.setAttribute('aSeed', new THREE.BufferAttribute(aSeed, 1));
        geo.setAttribute('aClosed', new THREE.BufferAttribute(aClosed, 1));
        geo.setAttribute('aBase', new THREE.BufferAttribute(aBase, 1));
        frame.add(new THREE.Mesh(geo, flowMat));
      };
      var line = function (i, j, base) {
        var a = NODES[i].p, b = NODES[j].p, d = new V3().subVectors(b, a).normalize();
        var a2 = a.clone().addScaledVector(d, NODES[i].r * 0.9), b2 = b.clone().addScaledVector(d, -NODES[j].r * 0.9);
        flowTube(new THREE.LineCurve3(a2, b2), 0.03, base || 0.34, false, 2);
      };
      var TubeArc = class extends THREE.Curve {
        constructor(a0, a1, y0, y1) { super(); this.a0 = a0; this.a1 = a1; this.y0 = y0; this.y1 = y1; }
        getPoint(t, target) {
          var a = (this.a0 + (this.a1 - this.a0) * t) * PI / 180, y = this.y0 + (this.y1 - this.y0) * t;
          return (target || new V3()).set(R * Math.sin(a), y, R * Math.cos(a));
        }
      };
      var arc = function (a0, a1, y0, y1, base) { flowTube(new TubeArc(a0, a1, y0, y1), 0.03, base || 0.3, false, 96); };
      var ring = function (y, base) { flowTube(new TubeArc(0, 360, y, y), 0.028, base || 0.26, true, 160); };

      [[0,1],[0,2],[0,3],[1,3],[2,3],[3,4],[3,5],[1,6],[2,6],[4,6],[5,6],[6,7],[6,8],[7,9],[8,9],[9,10]]
        .forEach(function (e) { line(e[0], e[1]); });
      line(1, 4, 0.3); line(4, 7, 0.3); line(2, 5, 0.3); line(5, 8, 0.3);                 // the two pillars
      arc(90, 270, 3.18, 3.18, 0.28); arc(90, 270, 1.03, 1.03, 0.28); arc(90, 270, -1.07, -1.07, 0.28);
      arc(8, 172, 2.04, 0.06, 0.34);                                                       // central spiral
      arc(188, 352, -0.06, -2.04, 0.34);
      ring(TOP, 0.26); ring(-BOT, 0.26);
      var veil = new THREE.Mesh(new THREE.CylinderGeometry(R, R, TOP + BOT, 96, 1, true), veilMat);
      veil.position.y = (TOP - BOT) / 2; frame.add(veil);
      [TOP + 0.27, TOP + 0.52, -(BOT + 0.27), -(BOT + 0.52)].forEach(function (y) {
        var s = sprite(0.16, 0.9); s.position.set(0, y, 0); root.add(s);
      });

      var dottedSphere = function (r) {
        var pos = [], n = 44, grp = new THREE.Group();
        for (var k = 0; k < 3; k++) for (var i = 0; i < n; i++) {
          var a = i / n * PI * 2, c = Math.cos(a) * r, s = Math.sin(a) * r;
          if (k === 0) pos.push(c, s, 0); else if (k === 1) pos.push(c, 0, s); else pos.push(0, c, s);
        }
        var g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
        grp.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 0.2, sizeAttenuation: true, map: glowTex,
          transparent: true, opacity: 1.0, depthWrite: false, blending: THREE.AdditiveBlending })));
        grp.add(new THREE.Mesh(new THREE.SphereGeometry(r, 32, 24), ghostMat));
        return grp;
      };
      NODES.forEach(function (nd) {
        if (nd.dotted) {
          var d = dottedSphere(nd.r); d.position.copy(nd.p); frame.add(d);
          var dh = sprite(nd.r * 4.4, 0.22); dh.position.copy(nd.p); frame.add(dh);
          return;
        }
        var m = new THREE.Mesh(new THREE.SphereGeometry(nd.r, 48, 32), sphereMat); m.position.copy(nd.p); frame.add(m);
        var h = sprite(nd.r * 4.4, 0.3); h.position.copy(nd.p); frame.add(h);
        solids.push(m);
      });

      if (o.stars) {
        var onSphere = function (r0, r1) {
          var r = r0 + Math.random() * (r1 - r0), th = Math.random() * PI * 2, ph = Math.acos(2 * Math.random() - 1);
          return new V3(r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th));
        };
        var SN = 140, starPos = new Float32Array(SN * 3);
        for (var si = 0; si < SN; si++) { var sp = onSphere(3.2, 6.5); starPos[si * 3] = sp.x; starPos[si * 3 + 1] = sp.y * 1.3; starPos[si * 3 + 2] = sp.z; }
        var starGeo = new THREE.BufferGeometry(); starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        root.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.09, sizeAttenuation: true, map: glowTex,
          transparent: true, opacity: 0.7, depthWrite: false, blending: THREE.AdditiveBlending })));
        for (var ti = 0; ti < 10; ti++) {
          var ts = sprite(0.24 + Math.random() * 0.2, 0.8); ts.position.copy(onSphere(3.0, 5.5));
          root.add(ts); twinklers.push({ s: ts, ph: Math.random() * 6.28, sp: 0.5 + Math.random() * 0.9 });
        }
      }
    }

    /* ---------- framing ---------- */
    var view = full ? { cy: 0.34, halfH: 4.55, halfW: 2.45 } : { cy: 0, halfH: 2.6, halfW: 1.45 };
    function resize() {
      var w = el.clientWidth || 1, h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      var t = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      var dist = Math.max(view.halfH / t, view.halfW / (t * camera.aspect));
      camera.position.set(0, view.cy, dist); camera.lookAt(0, view.cy, 0);
      camera.updateProjectionMatrix();
    }
    resize();
    var ro = null;
    if (global.ResizeObserver) { ro = new ResizeObserver(function () { resize(); draw(); }); ro.observe(el); }
    else global.addEventListener('resize', resize);

    /* ---------- motion ---------- */
    var clock = 0, running = false, visible = true, raf = 0, last = 0;
    var hoverYaw = 0, hoverPitch = 0, tgtYaw = 0, tgtPitch = 0;
    var animate = o.animate;

    function onMove(e) {
      var r = el.getBoundingClientRect();
      tgtYaw = ((e.clientX - r.left) / r.width - 0.5) * 0.9;
      tgtPitch = ((e.clientY - r.top) / r.height - 0.5) * 0.3;
    }
    function onLeave() { tgtYaw = 0; tgtPitch = 0; }
    if (o.hover) { el.addEventListener('pointermove', onMove); el.addEventListener('pointerleave', onLeave); }

    function draw() {
      var sw = animate ? 1 : 0, amp = o.sway;
      root.rotation.y = hoverYaw + Math.sin(clock * 0.5) * amp * sw;
      root.rotation.x = hoverPitch + Math.sin(clock * 0.37 + 0.6) * amp * 0.32 * sw;
      root.position.y = Math.sin(clock * 0.7) * 0.02 * sw;
      sMat.uniforms.uTime.value = clock;
      if (full) {
        flowMat.uniforms.uTime.value = clock + o.time;
        veilMat.uniforms.uTime.value = clock;
        solids.forEach(function (m, i) { m.scale.setScalar(1 + 0.02 * Math.sin(clock * 1.4 + i * 0.9) * sw); });
        twinklers.forEach(function (t) { t.s.material.opacity = 0.25 + 0.65 * (0.5 + 0.5 * Math.sin(clock * t.sp + t.ph)); });
      }
      renderer.render(scene, camera);
    }
    function loop(now) {
      raf = 0;
      var dt = Math.min((now - last) / 1000, 0.05); last = now;
      clock += dt;
      var k = 1 - Math.exp(-dt * 6);
      hoverYaw += (tgtYaw - hoverYaw) * k; hoverPitch += (tgtPitch - hoverPitch) * k;
      draw();
      if (running && visible && !document.hidden) raf = requestAnimationFrame(loop);
    }
    function start() { if (!raf && animate && visible && !document.hidden) { running = true; last = performance.now(); raf = requestAnimationFrame(loop); } }
    function stop() { running = false; if (raf) { cancelAnimationFrame(raf); raf = 0; } }

    var io = null;
    if (global.IntersectionObserver && animate) {
      io = new IntersectionObserver(function (es) { visible = es[0].isIntersecting; visible ? start() : stop(); });
      io.observe(el);
    }
    function onVis() { document.hidden ? stop() : start(); }
    document.addEventListener('visibilitychange', onVis);

    draw();                                            // first frame straight away
    requestAnimationFrame(function () {
      canvas.style.opacity = '1';                      // fade the animation in over the static logo
      if (img) img.style.opacity = '0';
    });
    start();

    return {
      destroy: function () {
        stop(); if (io) io.disconnect(); if (ro) ro.disconnect();
        document.removeEventListener('visibilitychange', onVis);
        el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave);
        renderer.dispose(); if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
        if (img) img.style.opacity = '1';
      }
    };
  }

  function mountAll() {
    var els = document.querySelectorAll('[data-silversphinx-logo]');
    for (var i = 0; i < els.length; i++) if (!els[i].__ssMounted) { els[i].__ssMounted = true; mount(els[i]); }
  }
  global.SilverSphinxLogo = { mount: mount, mountAll: mountAll };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountAll); else mountAll();
})(window);
