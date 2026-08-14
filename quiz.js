
/* ── URL de Google Apps Script ──────────────────── */
const SHEET_URL = "https://script.google.com/macros/s/AKfycbzJeBCfC7O4KtWRYzooCUQxnunSG5N6MQFcpHMSQTJ-0Lq93KZguTtn8BzcR9RBj0LV/exec";

/* ── PREGUNTAS ────────────────────────────────── */
const QUESTIONS = [
  {
    text: "En un programa que controla un LED, ¿qué sucede si el pin está configurado como OUTPUT y se cambia de HIGH a LOW?",
    options: [
      "El LED aumenta su brillo al máximo",
      "El pin comienza a recibir datos en lugar de enviarlos",
      "El voltaje del pin baja a 0V y el LED se apaga",
      "El microcontrolador se reinicia automáticamente"
    ],
    correct: 2,
    explanation: "Cuando un pin configurado como OUTPUT cambia de HIGH a LOW, deja de suministrar voltaje (pasa a 0V). Esto provoca que el LED conectado se apague, ya que no recibe energía."
  },
  {
    text: "La memoria caché es un componente clave en el rendimiento de los procesadores modernos. ¿Cuál es su función principal dentro de un sistema informático?",
    options: [
      "Almacenar de forma permanente el sistema operativo y los archivos del usuario",
      "Conectar el procesador con periféricos como el teclado y el ratón",
      "Servir como memoria ultrarrápida que guarda temporalmente los datos e instrucciones más usados por el procesador, reduciendo los tiempos de acceso a la RAM",
      "Regular el voltaje que reciben los distintos componentes de la placa base"
    ],
    correct: 2,
    explanation: "La caché es una memoria de muy alta velocidad integrada cerca del procesador. Guarda los datos e instrucciones que la CPU usa con más frecuencia, evitando accesos repetidos a la RAM más lenta y mejorando notablemente el rendimiento del sistema."
  },
  {
    text: "En programación, el tipo de dato booleano solo admite dos valores posibles. Observa estas declaraciones e identifica cuál corresponde a una variable booleana:\n\n  nombre  = 'Carlos'\n  edad    = 28\n  activo  = true\n  precio  = 19.99",
    options: [
      "nombre = 'Carlos'  →  almacena texto (string)",
      "edad = 28  →  almacena un número entero (int)",
      "activo = true  →  almacena un valor booleano (true / false)",
      "precio = 19.99  →  almacena un número decimal (float)"
    ],
    correct: 2,
    explanation: "Un booleano únicamente puede contener true o false. Las otras tres variables almacenan texto, número entero y número decimal respectivamente: tipos de datos completamente distintos."
  },
  {
    text: "JavaScript tiene dos operadores para comparar igualdad: == y ===. ¿Cuál es la diferencia fundamental y cuál es el operador de igualdad estricta?",
    options: [
      "= es la igualdad estricta; == se usa para asignar valores a variables",
      "== compara simultáneamente el valor y el tipo de dato de ambos operandos",
      "=== compara tanto el valor como el tipo de dato; es el operador de igualdad estricta",
      "!= realiza la misma función que === pero en forma de desigualdad"
    ],
    correct: 2,
    explanation: "=== es la igualdad estricta: exige que el valor Y el tipo de dato sean idénticos. Por ejemplo, 5 === '5' devuelve false porque uno es número y el otro string. Con ==, ese mismo caso devuelve true por conversión automática de tipos, lo que puede causar errores inesperados."
  }
];

/* Teclas de control de vehículos / drones / robots: WASD + Shift + Ctrl + Espacio */
const CONTROL_KEYS = ["w","a","s","d","shift","space","ctrl"];
const KEY_CAP = {
  w: "W", a: "A", s: "S", d: "D",
  shift: "⇧ SHIFT", space: "␣ ESPACIO", ctrl: "⌃ CTRL"
};
const KEY_ACTION = {
  w: "AVANZAR", a: "GIRAR IZQUIERDA", s: "RETROCEDER", d: "GIRAR DERECHA",
  shift: "TURBO / ACELERAR", space: "DESPEGAR / SALTAR", ctrl: "DESCENDER"
};

/* ── ESTADO ──────────────────────────────────── */
const state = {
  name: "",
  qScore: 0,
  keyHits: 0,
  keyMiss: 0,
  keyAcc: 0,
  multi: 0,
  total: 0
};

let currentStep   = 0;
const TOTAL_STEPS = 4;
const STEP_NAMES  = ["Inicio","Preguntas","Control","Multitarea","Resultado"];

let questionsDone = [];
let keyTarget   = null;
let keyTimer    = null;
let keyTime     = 30;
let keyRunning  = false;
let kH = 0, kM = 0;

const ARC_LEN = 326.7; // 2π × 52

/* ════════════════════════════════════════════════
   NIEVE + AURORA BOREAL (canvas)
════════════════════════════════════════════════ */
(function initSnow() {
  const canvas = document.getElementById("snowCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H, flakes = [], aurora_t = 0;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const COLORS = [
    "rgba(200,240,255,", "rgba(168,216,234,",
    "rgba(230,248,255,", "rgba(126,200,227,"
  ];

  function makeFlake() {
    return {
      x: Math.random() * W,
      y: Math.random() * H - H,
      r: Math.random() * 2.6 + 0.4,
      vy: Math.random() * 0.65 + 0.15,
      vx: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.15,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      isCrystal: Math.random() > 0.8,
      wob: Math.random() * Math.PI * 2,
      wobSpeed: (Math.random() - 0.5) * 0.018
    };
  }

  for (let i = 0; i < 140; i++) {
    const f = makeFlake();
    f.y = Math.random() * H;
    flakes.push(f);
  }

  function drawCrystal(x, y, r, alpha, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = color + alpha + ")";
    ctx.lineWidth = r * 0.28;
    for (let i = 0; i < 6; i++) {
      ctx.rotate(Math.PI / 3);
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(r * 2.8, 0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(r * 1.2, 0); ctx.lineTo(r * 1.7,  r * 0.38); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(r * 1.2, 0); ctx.lineTo(r * 1.7, -r * 0.38); ctx.stroke();
    }
    ctx.restore();
  }

  function drawAurora(t) {
    const g = ctx.createLinearGradient(0, 0, W, H * 0.55);
    const a1 = 0.028 + Math.sin(t * 0.26) * 0.013;
    const a2 = 0.020 + Math.cos(t * 0.18) * 0.011;
    g.addColorStop(0,    "rgba(38,168,215," + a1 + ")");
    g.addColorStop(0.30, "rgba(88,208,188," + a2 + ")");
    g.addColorStop(0.65, "rgba(68,148,232," + (a1 * 0.55) + ")");
    g.addColorStop(1,    "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H * 0.55);

    for (let i = 0; i < 4; i++) {
      const yBase = H * (0.07 + i * 0.065);
      const amp   = 34 + i * 12;
      const freq  = 0.0025 + i * 0.0008;
      ctx.beginPath();
      ctx.moveTo(0, yBase);
      for (let x = 0; x <= W; x += 5) {
        ctx.lineTo(x, yBase + Math.sin(x * freq + t * (0.35 + i * 0.12)) * amp);
      }
      ctx.strokeStyle = "rgba(108,208,255," + (0.058 - i * 0.011) + ")";
      ctx.lineWidth = 50 - i * 10;
      ctx.stroke();
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    aurora_t += 0.007;
    drawAurora(aurora_t);

    for (const f of flakes) {
      f.wob += f.wobSpeed;
      f.y   += f.vy;
      f.x   += f.vx + Math.sin(f.wob) * 0.25;
      if (f.y > H + 10) { Object.assign(f, makeFlake()); f.y = -10; }
      if (f.x > W + 10) f.x = -10;
      if (f.x < -10)    f.x = W + 10;

      if (f.isCrystal && f.r > 1.3) {
        drawCrystal(f.x, f.y, f.r, f.alpha, f.color);
      } else {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = f.color + f.alpha + ")";
        ctx.fill();
      }
    }
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ════════════════════════════════════════════════
   CURSOR TRAIL
════════════════════════════════════════════════ */
document.addEventListener("mousemove", function(e) {
  const dot = document.createElement("div");
  dot.className = "trail-dot";
  const size = Math.random() * 7 + 2;
  dot.style.left   = e.clientX + "px";
  dot.style.top    = e.clientY + "px";
  dot.style.width  = size + "px";
  dot.style.height = size + "px";
  dot.style.opacity = (0.25 + Math.random() * 0.4).toString();
  document.body.appendChild(dot);
  setTimeout(function() { dot.remove(); }, 480);
});

/* ════════════════════════════════════════════════
   SVG GRADIENT INJECT (para timer y resultados)
════════════════════════════════════════════════ */
(function injectGrads() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;";
  svg.innerHTML = [
    "<defs>",
    '<linearGradient id="tg" x1="0%" y1="0%" x2="100%" y2="100%">',
    '  <stop offset="0%"   stop-color="#E0F4FD"/>',
    '  <stop offset="50%"  stop-color="#7EC8E3"/>',
    '  <stop offset="100%" stop-color="#A8D8EA"/>',
    "</linearGradient>",
    "</defs>"
  ].join("");
  document.body.prepend(svg);
})();

/* ════════════════════════════════════════════════
   CONFETTI DE HIELO
════════════════════════════════════════════════ */
function spawnConfetti(count) {
  count = count || 28;
  var symbols = ["❄","❅","❆","◆","◇","·","*"];
  for (var i = 0; i < count; i++) {
    var el = document.createElement("span");
    el.className = "confetti";
    var size = Math.random() * 14 + 7;
    var x    = Math.random() * window.innerWidth;
    var y    = Math.random() * (window.innerHeight * 0.4);
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left   = x + "px";
    el.style.top    = y + "px";
    el.style.fontSize = size + "px";
    el.style.animationDelay    = (Math.random() * 0.7) + "s";
    el.style.animationDuration = (1.6 + Math.random() * 0.9) + "s";
    var r = 160 + Math.floor(Math.random() * 60);
    var g = 210 + Math.floor(Math.random() * 35);
    var b = 195 + Math.floor(Math.random() * 55);
    el.style.color = "rgba(" + r + "," + g + "," + b + "," + (0.5 + Math.random() * 0.5) + ")";
    document.body.appendChild(el);
    setTimeout(function(e) { e.remove(); }, 3200, el);
  }
}

/* ════════════════════════════════════════════════
   PROGRESO
════════════════════════════════════════════════ */
function updateProgress(step) {
  var pct = Math.round((step / TOTAL_STEPS) * 100);
  document.getElementById("progressBar").style.width  = pct + "%";
  document.getElementById("stepLabel").textContent    = STEP_NAMES[step] || "";
  document.getElementById("stepPct").textContent      = pct + "%";

  for (var i = 0; i <= TOTAL_STEPS; i++) {
    var dot = document.getElementById("dot" + i);
    if (!dot) continue;
    dot.classList.remove("active", "done");
    if (i === step) dot.classList.add("active");
    if (i < step)   dot.classList.add("done");
  }
}

/* ════════════════════════════════════════════════
   NAVEGACIÓN
════════════════════════════════════════════════ */
function goStep(n) {
  document.getElementById("step" + currentStep).classList.remove("active");
  currentStep = n;
  document.getElementById("step" + n).classList.add("active");
  updateProgress(n);
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (n === 2) initKeyTest();
}

/* ════════════════════════════════════════════════
   PASO 0 — NOMBRE
════════════════════════════════════════════════ */
function startQuiz() {
  var name = document.getElementById("nameInput").value.trim();
  if (!name) {
    var inp = document.getElementById("nameInput");
    inp.style.borderColor = "#F07878";
    inp.style.boxShadow   = "0 0 0 3px rgba(240,120,120,0.2)";
    inp.focus();
    setTimeout(function() {
      inp.style.borderColor = "";
      inp.style.boxShadow   = "";
    }, 1800);
    return;
  }
  state.name = name;
  buildQuestions();
  goStep(1);
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("nameInput").addEventListener("keydown", function(e) {
    if (e.key === "Enter") startQuiz();
  });
});

/* ════════════════════════════════════════════════
   PASO 1 — PREGUNTAS
════════════════════════════════════════════════ */
function buildQuestions() {
  questionsDone = new Array(QUESTIONS.length).fill(false);
  state.qScore  = 0;

  var container = document.getElementById("questionsContainer");
  container.innerHTML = "";

  QUESTIONS.forEach(function(q, qi) {
    var block = document.createElement("div");
    block.className = "q-block";
    block.style.animationDelay = (qi * 0.12) + "s";

    var sep = qi > 0 ? '<div class="q-separator"></div>' : "";

    var optionsHTML = q.options.map(function(opt, oi) {
      return [
        '<div class="option" id="opt_' + qi + '_' + oi + '" onclick="pickOption(' + qi + ',' + oi + ')">',
        '  <div class="option-key">' + "ABCD"[oi] + "</div>",
        '  <div class="option-text">' + opt + "</div>",
        "</div>"
      ].join("");
    }).join("");

    block.innerHTML = [
      sep,
      '<div class="q-number">Pregunta ' + (qi + 1) + ' <span>/ ' + QUESTIONS.length + "</span></div>",
      '<div class="q-text">' + q.text + "</div>",
      '<div class="options-list" id="opts_' + qi + '">' + optionsHTML + "</div>",
      '<div class="feedback-msg" id="fb_' + qi + '"></div>'
    ].join("");

    container.appendChild(block);
  });

  document.getElementById("questionsNextBtn").disabled = true;
}

function pickOption(qi, oi) {
  if (questionsDone[qi]) return;
  questionsDone[qi] = true;

  var q = QUESTIONS[qi];
  var opts = document.querySelectorAll("#opts_" + qi + " .option");
  opts.forEach(function(el, i) {
    el.style.pointerEvents = "none";
    if (i === q.correct)             el.classList.add("correct");
    else if (i === oi && i !== q.correct) el.classList.add("wrong");
  });

  var fb = document.getElementById("fb_" + qi);
  if (oi === q.correct) {
    state.qScore++;
    fb.textContent = "✅  " + q.explanation;
    fb.className   = "feedback-msg show ok";
  } else {
    fb.textContent = "❌  " + q.explanation;
    fb.className   = "feedback-msg show err";
  }

  if (questionsDone.every(function(d) { return d; })) {
    document.getElementById("questionsNextBtn").disabled = false;
    setTimeout(function() { spawnConfetti(32); }, 200);
  }
}

/* ════════════════════════════════════════════════
   PASO 2 — CONTROL WASD (VEHÍCULOS / DRONES / ROBOTS)
   Acepta pulsaciones REALES de teclado (keydown) y,
   como alternativa táctil, clics en los botones.
════════════════════════════════════════════════ */
function initKeyTest() {
  kH = 0; kM = 0; keyTime = 30; keyRunning = true;
  document.getElementById("kHits").textContent = "0";
  document.getElementById("kMiss").textContent = "0";
  document.getElementById("kAcc").textContent  = "—";
  document.getElementById("keyDone").classList.add("hidden");
  document.getElementById("timerArc").style.strokeDashoffset = "0";
  document.getElementById("timerArc").style.stroke = "url(#tg)";
  document.getElementById("timerNumber").textContent = "30";
  document.querySelectorAll(".key-btn").forEach(function(b) { b.disabled = false; });
  setNextKey();
  keyTimer = setInterval(tickTimer, 1000);
}

function setNextKey() {
  var next = keyTarget;
  // evitar repetir la misma tecla dos veces seguidas
  while (next === keyTarget) {
    next = CONTROL_KEYS[Math.floor(Math.random() * CONTROL_KEYS.length)];
  }
  keyTarget = next;
  var capEl  = document.getElementById("keyTarget");
  var nameEl = document.getElementById("keyTargetName");
  capEl.textContent = KEY_CAP[keyTarget];
  nameEl.textContent = KEY_ACTION[keyTarget];
  // reiniciar animación
  capEl.style.animation = "none";
  void capEl.offsetWidth;
  capEl.style.animation = "";
}

/* Normaliza el evento de teclado físico a uno de nuestros CONTROL_KEYS */
function normalizeKeyEvent(e) {
  if (e.code === "Space") return "space";
  if (e.key === "Shift")   return "shift";
  if (e.key === "Control") return "ctrl";
  var k = (e.key || "").toLowerCase();
  if (k === "w" || k === "a" || k === "s" || k === "d") return k;
  return null;
}

function registerKeyPress(pressedKey, btnEl) {
  if (!keyRunning) return;
  var btn = btnEl || document.querySelector('.key-btn[data-key="' + pressedKey + '"]');
  if (btn) {
    btn.classList.remove("hit", "miss");
    void btn.offsetWidth;
  }
  if (pressedKey === keyTarget) {
    kH++;
    if (btn) { btn.classList.add("hit"); setTimeout(function() { btn.classList.remove("hit"); }, 300); }
  } else {
    kM++;
    if (btn) { btn.classList.add("miss"); setTimeout(function() { btn.classList.remove("miss"); }, 350); }
  }
  var total = kH + kM;
  document.getElementById("kHits").textContent = kH;
  document.getElementById("kMiss").textContent = kM;
  document.getElementById("kAcc").textContent  = total ? Math.round(kH / total * 100) + "%" : "—";
  setNextKey();
}

/* clic / toque en el botón en pantalla (fallback móvil) */
function keyBtnClick(btn) {
  registerKeyPress(btn.dataset.key, btn);
}

/* pulsación real del teclado físico */
document.addEventListener("keydown", function(e) {
  if (!keyRunning || e.repeat) return;
  var k = normalizeKeyEvent(e);
  if (!k) return;
  // evita que Espacio haga scroll de la página durante el test
  if (k === "space") e.preventDefault();
  var btn = document.querySelector('.key-btn[data-key="' + k + '"]');
  if (btn) btn.classList.add("pressed");
  registerKeyPress(k, btn);
});
document.addEventListener("keyup", function(e) {
  var k = normalizeKeyEvent(e);
  if (!k) return;
  var btn = document.querySelector('.key-btn[data-key="' + k + '"]');
  if (btn) btn.classList.remove("pressed");
});

function tickTimer() {
  keyTime--;
  document.getElementById("timerNumber").textContent = keyTime;
  var offset = ARC_LEN * (1 - keyTime / 30);
  document.getElementById("timerArc").style.strokeDashoffset = offset;
  if (keyTime <= 10)      document.getElementById("timerArc").style.stroke = "#F07878";
  else if (keyTime <= 20) document.getElementById("timerArc").style.stroke = "#F5D06A";
  if (keyTime <= 0) endKeyTest();
}

function endKeyTest() {
  clearInterval(keyTimer);
  keyRunning = false;
  document.querySelectorAll(".key-btn").forEach(function(b) { b.disabled = true; b.classList.remove("pressed"); });
  document.getElementById("keyTarget").textContent     = "✅";
  document.getElementById("keyTargetName").textContent = "¡COMPLETADO!";
  var total = kH + kM;
  var acc   = total ? Math.round(kH / total * 100) : 0;
  state.keyHits = kH;
  state.keyMiss = kM;
  state.keyAcc  = acc;
  document.getElementById("kAcc").textContent = acc + "%";
  document.getElementById("keyDone").classList.remove("hidden");
}

/* ════════════════════════════════════════════════
   PASO 3 — MULTITAREA
════════════════════════════════════════════════ */
function updateLiveScore() {
  var v = parseInt(document.getElementById("multiScoreInput").value) || 0;
  document.getElementById("liveScore").textContent = v > 0 ? v : "—";
}

function submitMulti() {
  state.multi = parseInt(document.getElementById("multiScoreInput").value) || 0;
  buildResults();
  goStep(4);
  saveToSheets();
}

/* ════════════════════════════════════════════════
   PASO 4 — RESULTADOS
════════════════════════════════════════════════ */
function buildResults() {
  var qPct  = Math.round(state.qScore / QUESTIONS.length * 100);
  var kPct  = state.keyAcc;
  var mPct  = Math.min(Math.round(state.multi / 200 * 100), 100);
  var total = Math.round((qPct + kPct + mPct) / 3);
  state.total = total;

  // animar anillo
  setTimeout(function() {
    var arc = document.getElementById("resultArc");
    if (arc) arc.style.strokeDashoffset = 515 - (515 * total / 100);

    // animar número
    var current = 0;
    var step    = total / 60;
    var pctEl   = document.getElementById("resultPct");
    var counter = setInterval(function() {
      current = Math.min(current + step, total);
      if (pctEl) pctEl.textContent = Math.floor(current) + "%";
      if (current >= total) clearInterval(counter);
    }, 25);
  }, 400);

  // nivel
  var grade = "", color = "";
  if      (total >= 90) { grade = "EXPERTO";      color = "#5DDBA6"; }
  else if (total >= 70) { grade = "AVANZADO";     color = "#A8D8EA"; }
  else if (total >= 50) { grade = "INTERMEDIO";   color = "#F5D06A"; }
  else                  { grade = "PRINCIPIANTE"; color = "#F07878"; }

  var gradeEl = document.getElementById("resultGrade");
  if (gradeEl) {
    gradeEl.textContent        = grade;
    gradeEl.style.color        = color;
    gradeEl.style.borderColor  = color + "44";
  }

  var nameEl = document.getElementById("resultUsername");
  if (nameEl) nameEl.textContent = "— " + state.name + " —";

  var statsEl = document.getElementById("resultStats");
  if (statsEl) {
    statsEl.innerHTML = [
      '<div class="stat-card"><div class="stat-value">' + state.qScore + "/" + QUESTIONS.length + '</div><div class="stat-label">Preguntas</div></div>',
      '<div class="stat-card"><div class="stat-value">' + state.keyHits + '</div><div class="stat-label">Aciertos teclas</div></div>',
      '<div class="stat-card"><div class="stat-value">' + state.keyAcc + '%</div><div class="stat-label">Precisión</div></div>',
      '<div class="stat-card"><div class="stat-value">' + state.keyMiss + '</div><div class="stat-label">Fallos teclas</div></div>',
      '<div class="stat-card"><div class="stat-value">' + state.multi + '</div><div class="stat-label">Multitarea</div></div>',
      '<div class="stat-card"><div class="stat-value" style="color:#5DDBA6">' + total + '%</div><div class="stat-label">Total</div></div>'
    ].join("");
  }

  setTimeout(function() { spawnConfetti(36); }, 600);
  setTimeout(function() { spawnConfetti(20); }, 1300);
}

/* ════════════════════════════════════════════════
   GOOGLE SHEETS
════════════════════════════════════════════════ */
function saveToSheets() {
  var statusEl = document.getElementById("saveStatus");
  var okEl     = document.getElementById("saveOk");
  var errEl    = document.getElementById("saveErr");

  if (statusEl) statusEl.style.display = "flex";
  if (okEl)  okEl.classList.add("hidden");
  if (errEl) errEl.classList.add("hidden");

  if (!SHEET_URL || SHEET_URL === "PEGA_AQUI_TU_URL_DE_APPS_SCRIPT") {
    if (statusEl) statusEl.style.display = "none";
    if (errEl) {
      errEl.innerHTML = "⚠️ <strong>Google Sheets no configurado.</strong><br/>Abre <strong>guia-google-sheets.html</strong> para ver las instrucciones.";
      errEl.classList.remove("hidden");
    }
    return;
  }

  var payload = {
    nombre:          state.name,
    fecha:           new Date().toLocaleString("es-PE"),
    preguntas:        state.qScore + "/" + QUESTIONS.length,
    teclas_aciertos:  state.keyHits,
    teclas_fallos:    state.keyMiss,
    teclas_precision: state.keyAcc + "%",
    multitarea:      state.multi,
    total:           state.total + "%"
  };

  fetch(SHEET_URL, {
    method:  "POST",
    mode:    "no-cors",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(payload)
  })
  .then(function() {
    if (statusEl) statusEl.style.display = "none";
    if (okEl) okEl.classList.remove("hidden");
  })
  .catch(function(err) {
    if (statusEl) statusEl.style.display = "none";
    if (errEl) {
      errEl.innerHTML = "❌ Error al guardar: " + err.message;
      errEl.classList.remove("hidden");
    }
  });
}

/* ════════════════════════════════════════════════
   RESET COMPLETO
════════════════════════════════════════════════ */
function resetAll() {
  state.name     = "";
  state.qScore   = 0;
  state.keyHits  = 0;
  state.keyMiss  = 0;
  state.keyAcc   = 0;
  state.multi    = 0;
  state.total    = 0;

  questionsDone = [];
  clearInterval(keyTimer);
  keyTime    = 30;
  keyRunning = false;

  document.getElementById("nameInput").value      = "";
  document.getElementById("multiScoreInput").value = "";
  document.getElementById("liveScore").textContent = "—";
  document.getElementById("timerNumber").textContent = "30";
  document.getElementById("timerArc").style.strokeDashoffset = "0";
  document.getElementById("timerArc").style.stroke = "url(#tg)";

  var arcEl = document.getElementById("resultArc");
  if (arcEl) arcEl.style.strokeDashoffset = "515";
  var pctEl = document.getElementById("resultPct");
  if (pctEl) pctEl.textContent = "0%";

  goStep(0);
  updateProgress(0);
}
