
/* ── URL de Google Apps Script ──────────────────── */
const SHEET_URL = "https://script.google.com/macros/s/AKfycbzJeBCfC7O4KtWRYzooCUQxnunSG5N6MQFcpHMSQTJ-0Lq93KZguTtn8BzcR9RBj0LV/exec";

/* ── PREGUNTAS ────────────────────────────────── */
/* Enfocadas en el tema real de la investigación: el dominio del esquema
   de control WASD + Shift + Ctrl + Espacio para el manejo de vehículos,
   drones y robots, y los factores humanos detrás del rendimiento con
   el teclado (memoria muscular, tiempo de reacción, ergonomía, multitarea).
   Redactadas como escenarios GENERALES, sin dar por hecho que la persona
   ya pasó por el test de teclas (este cuestionario va ANTES de esa prueba). */
const QUESTIONS = [
  {
    text: "El esquema W-A-S-D se convirtió en el estándar para controlar vehículos y personajes en simuladores y videojuegos. ¿Cuál es la razón principal, más allá de la costumbre?",
    options: [
      "Son las únicas cuatro teclas que existen físicamente en todos los teclados del mundo",
      "Están ubicadas de forma que la mano izquierda cubre las 4 direcciones y, sin moverse, alcanza también Shift, Ctrl y Espacio con los dedos meñique y pulgar",
      "Corresponden a las iniciales de 'Walk, Attack, Stop, Defend' en inglés",
      "Fueron elegidas al azar por los primeros desarrolladores de videojuegos"
    ],
    correct: 1,
    explanation: "El diseño ergonómico es la clave: con la mano izquierda apoyada en W-A-S-D, el meñique llega naturalmente a Shift y Ctrl, y el pulgar a la barra espaciadora, sin necesidad de desplazar la mano. Esto permite controlar movimiento, velocidad (turbo) y acciones (saltar/disparar) de forma simultánea, mientras la mano derecha queda libre para el mouse o para otros controles."
  },
  {
    text: "Un operador maneja un dron de forma remota usando el teclado. El 'tiempo de reacción' es el intervalo entre que aparece un obstáculo en pantalla y el momento en que presiona la tecla correcta para evitarlo. ¿Por qué esta métrica es tan relevante para evaluar su desempeño?",
    options: [
      "No tiene ninguna relevancia práctica, solo interesa a nivel teórico",
      "Porque un tiempo de reacción más corto generalmente indica mayor capacidad de respuesta ante imprevistos, algo crítico para evitar colisiones o errores de maniobra en tiempo real",
      "Porque cuanto más lento se reacciona, más preciso es el control del vehículo",
      "Porque el tiempo de reacción solo depende del modelo de teclado, no de la persona"
    ],
    correct: 1,
    explanation: "Un tiempo de reacción corto refleja que la señal viaja rápido desde la percepción visual hasta la respuesta motora (el dedo presionando la tecla correcta). En control remoto de vehículos, drones o robots, esto se traduce directamente en menos margen de error ante obstáculos o cambios repentinos del entorno."
  },
  {
    text: "Un piloto de simulador practica repetidamente la misma combinación de teclas (por ejemplo, W + Shift para avanzar con turbo), hasta que logra ejecutarla cada vez más rápido y sin mirar el teclado. ¿Cómo se conoce este fenómeno?",
    options: [
      "Fatiga muscular, que reduce la precisión con la práctica",
      "Memoria muscular (o memoria motora): el sistema nervioso automatiza el movimiento repetido, haciéndolo más rápido y con menor esfuerzo consciente",
      "Sobrecarga cognitiva, que ocurre cuando se memorizan demasiadas teclas",
      "Efecto placebo aplicado al uso de periféricos"
    ],
    correct: 1,
    explanation: "La memoria muscular es la capacidad del sistema nervioso de automatizar secuencias de movimiento tras la repetición, reduciendo el tiempo de reacción y la carga cognitiva necesaria para ejecutarlas. Es la misma razón por la que un piloto experimentado o un gamer avanzado responde casi de forma instintiva ante ciertos estímulos."
  },
  {
    text: "Al controlar un dron real, rara vez se usa una sola tecla a la vez: por ejemplo, avanzar y activar el turbo simultáneamente (W + Shift) es una acción común. ¿Qué habilidad se pone a prueba principalmente al tener que mantener presionadas dos teclas al mismo tiempo, en lugar de una sola?",
    options: [
      "La velocidad de escritura general de la persona (palabras por minuto)",
      "La capacidad de coordinar ambas manos en tareas completamente distintas",
      "La coordinación motora fina para sostener varias teclas a la vez, equivalente a combinar dirección y velocidad (o altitud) de forma simultánea en un vehículo o dron real",
      "La memoria a largo plazo de la persona"
    ],
    correct: 2,
    explanation: "Las órdenes combinadas simulan situaciones reales de control: un piloto de dron rara vez usa una sola entrada a la vez, sino que combina dirección, aceleración y altitud de forma simultánea. Presionar dos teclas al mismo tiempo (por ejemplo, avanzar + turbo) mide la coordinación motora fina necesaria para ese tipo de maniobras."
  },
  {
    text: "Un operador de un robot debe vigilar el entorno en pantalla, recordar el estado de la batería y, al mismo tiempo, ejecutar los comandos de movimiento correctos según lo que va viendo. ¿Qué concepto psicológico describe mejor esta capacidad de atender varias cosas a la vez sin perder rendimiento?",
    options: [
      "Memoria fotográfica, ya que se debe recordar exactamente cómo se veía cada elemento en pantalla",
      "Atención dividida (o multitarea cognitiva): la capacidad de procesar y responder a varios estímulos o demandas de forma casi simultánea",
      "Visión periférica, que es un fenómeno exclusivamente físico y no cognitivo",
      "Amnesia retrógrada, que ocurre naturalmente al operar bajo presión"
    ],
    correct: 1,
    explanation: "La atención dividida es la capacidad de gestionar varias fuentes de información o tareas a la vez sin que el rendimiento colapse. En el control de vehículos, drones o robots, el operador debe monitorear el entorno, el estado del equipo y ejecutar comandos al mismo tiempo, por lo que esta habilidad es determinante para un buen desempeño."
  },
  {
    text: "En sesiones largas de operación remota (por ejemplo, un piloto de dron que lleva varios minutos volando bajo presión de tiempo), es común observar que los errores de control aumentan con el paso del tiempo, incluso si la persona domina bien las teclas. ¿A qué se debe generalmente este patrón?",
    options: [
      "A que el equipo de control (teclado o mando) se va dañando progresivamente durante el uso",
      "A la fatiga o saturación cognitiva: el estrés de responder rápido de forma sostenida reduce la precisión, un patrón común en operadores reales de maquinaria o vehículos",
      "A que la persona mejora tanto su concentración que empieza a cometer errores a propósito",
      "A un fallo típico del software de control, no de la persona"
    ],
    correct: 1,
    explanation: "Es un patrón bien documentado en tareas de control prolongado: el esfuerzo sostenido de reaccionar rápido puede generar fatiga cognitiva o ansiedad, aumentando los errores incluso si la persona domina las teclas. Este mismo fenómeno es relevante en el control real de vehículos, drones o robots, donde el estrés operativo puede afectar la precisión de las respuestas."
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

/* Órdenes combinadas (dos teclas a la vez), como el control real de un
   vehículo/dron: avanzar + turbo, girar + turbo, frenar + descender, etc. */
const COMBOS = [
  { keys: ["w","shift"], action: "IMPULSO ADELANTE (TURBO)" },
  { keys: ["a","shift"], action: "GIRO RÁPIDO IZQUIERDA" },
  { keys: ["d","shift"], action: "GIRO RÁPIDO DERECHA" },
  { keys: ["s","ctrl"],  action: "FRENAR Y DESCENDER" },
  { keys: ["w","space"], action: "DESPEGUE ACELERADO" },
  { keys: ["a","ctrl"],  action: "DESCENDER GIRANDO IZQ." },
  { keys: ["d","ctrl"],  action: "DESCENDER GIRANDO DER." }
];
const COMBO_CHANCE   = 0.32;   // probabilidad de orden doble tras el 4º objetivo
const COMBO_MIN_HITS = 4;      // nº de objetivos simples antes de permitir combos

/* ── ESTADO ──────────────────────────────────── */
const state = {
  name: "",
  gamingExp: "",
  dominantHand: "",
  qScore: 0,
  keyHits: 0,
  keyMiss: 0,
  keyAcc: 0,
  keyReactAvg: 0,
  keyBestStreak: 0,
  simCheckpoints: 0,
  simCollisions: 0,
  simScore: 0,
  multi: 0,
  total: 0
};

let currentStep   = 0;
const TOTAL_STEPS = 5;
const STEP_NAMES  = ["Inicio","Preguntas","Control","Simulación","Multitarea","Resultado"];

let questionsDone = [];
let keyTarget    = null;   // string (single) o array de 2 (combo)
let keyIsCombo   = false;
let keyTimer     = null;
let keyTime      = 30;
let keyRunning   = false;
let kH = 0, kM = 0;
let kTargetsShown = 0;
let reactionTimes = [];
let targetShownAt  = 0;
let streak = 0, bestStreak = 0;
let pressedSet = new Set();

/* sonido */
let soundOn = true;
let audioCtx = null;

/* almacenamiento local de la mejor marca */
const STORAGE_KEY = "pylanor_best_v1";

/* teclas físicamente sostenidas (usado por la simulación de pilotaje) */
let heldKeys = new Set();

/* ── PASO 3: SIMULACIÓN DE PILOTAJE ── */
let simCanvas = null, simCtx = null;
let simRunning = false;
let simTime = 25;
const SIM_DURATION = 25;
let simTimerInterval = null;
let simAnimFrame = null;
let simShip = null;
let simObstacles = [];
let simCheckpoint = null;
let simCheckpoints = 0, simCollisions = 0;
let simDashCooldownUntil = 0;
let simLastDashAt = 0;
const SIM_SHIP_R = 9;

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
  if (n === 3) initSimTest();
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
  state.gamingExp = document.getElementById("gamingExpSelect").value;
  state.dominantHand = document.getElementById("handSelect").value;
  buildQuestions();
  goStep(1);
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("nameInput").addEventListener("keydown", function(e) {
    if (e.key === "Enter") startQuiz();
  });

  // preferencia de sonido guardada
  try {
    var pref = localStorage.getItem("pylanor_sound");
    if (pref === "off") {
      soundOn = false;
      var btn = document.getElementById("soundToggle");
      if (btn) { btn.textContent = "🔇"; btn.classList.add("muted"); }
    }
  } catch (e) {}

  // mostrar mejor marca guardada, si existe
  renderBestScorePanel();
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
   SONIDO (Web Audio API) — feedback de aciertos/fallos
════════════════════════════════════════════════ */
function getAudioCtx() {
  if (!audioCtx) {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (AC) audioCtx = new AC();
  }
  return audioCtx;
}

function playTone(freq, duration, type) {
  if (!soundOn) return;
  var ctx = getAudioCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  var osc  = ctx.createOscillator();
  var gain = ctx.createGain();
  osc.type = type || "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.16, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

function playHitSound(combo) {
  playTone(combo ? 720 : 880, 0.09, "triangle");
  if (combo) setTimeout(function() { playTone(1040, 0.1, "triangle"); }, 70);
}
function playMissSound() { playTone(160, 0.18, "sawtooth"); }

function toggleSound() {
  soundOn = !soundOn;
  var btn = document.getElementById("soundToggle");
  if (btn) {
    btn.textContent = soundOn ? "🔊" : "🔇";
    btn.classList.toggle("muted", !soundOn);
  }
  try { localStorage.setItem("pylanor_sound", soundOn ? "on" : "off"); } catch (e) {}
}

/* ════════════════════════════════════════════════
   MEJOR MARCA (localStorage)
════════════════════════════════════════════════ */
function loadBestScore() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}

function saveBestScoreIfBetter(total, reactAvg) {
  var best = loadBestScore();
  var isNew = !best || total > best.total;
  if (isNew) {
    best = { total: total, reactAvg: reactAvg, streak: Math.max(bestStreak, best ? best.streak : 0) };
  } else if (best) {
    best.streak = Math.max(best.streak || 0, bestStreak);
  }
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(best)); } catch (e) {}
  return isNew;
}

function renderBestScorePanel() {
  var best = loadBestScore();
  var panel = document.getElementById("bestScorePanel");
  if (!panel) return;
  if (!best) { panel.classList.add("hidden"); return; }
  panel.classList.remove("hidden");
  document.getElementById("bestTotal").textContent  = best.total + "%";
  document.getElementById("bestStreak").textContent = (best.streak || 0);
  document.getElementById("bestReact").textContent  = best.reactAvg ? best.reactAvg + " ms" : "—";
}

/* ════════════════════════════════════════════════
   HUD (indicadores del vehículo / dron)
════════════════════════════════════════════════ */
function flashHud(keys) {
  keys.forEach(function(k) {
    var icon = document.querySelector('.hud-icon[data-hud="' + k + '"]');
    if (!icon) return;
    icon.classList.add("lit");
    setTimeout(function() { icon.classList.remove("lit"); }, 260);
  });
}

/* ════════════════════════════════════════════════
   PASO 2 — CONTROL WASD (VEHÍCULOS / DRONES / ROBOTS)
   Acepta pulsaciones REALES de teclado (keydown) y,
   como alternativa táctil, clics en los botones.
   Incluye órdenes combinadas (dos teclas a la vez),
   racha de aciertos y tiempo de reacción promedio.
════════════════════════════════════════════════ */
function initKeyTest() {
  clearInterval(keyTimer);
  kH = 0; kM = 0; keyTime = 30; keyRunning = false;
  kTargetsShown = 0; reactionTimes = []; streak = 0; bestStreak = 0;
  pressedSet.clear();
  document.getElementById("kHits").textContent  = "0";
  document.getElementById("kMiss").textContent  = "0";
  document.getElementById("kAcc").textContent   = "—";
  document.getElementById("kReact").textContent = "—";
  document.getElementById("keyDone").classList.add("hidden");
  document.getElementById("streakBadge").classList.add("hidden");
  document.getElementById("comboTag").classList.add("hidden");
  document.getElementById("timerArc").style.strokeDashoffset = "0";
  document.getElementById("timerArc").style.stroke = "url(#tg)";
  document.getElementById("timerNumber").textContent = "30";
  document.getElementById("keyTargetWrap").innerHTML = '<div class="target-emoji key-target-cap">❄</div>';
  document.getElementById("keyTargetName").textContent = "PULSA «COMENZAR» PARA INICIAR";
  // los botones quedan deshabilitados hasta que el usuario decida empezar
  document.querySelectorAll(".key-btn").forEach(function(b) { b.disabled = true; });
  var gate = document.getElementById("keyStartGate");
  if (gate) gate.classList.remove("hidden");
}

/* Se dispara al presionar "Comenzar prueba": recién aquí arranca el
   cronómetro de 30s, así el tiempo de lectura de instrucciones no cuenta. */
function startKeyRun() {
  var gate = document.getElementById("keyStartGate");
  if (gate) gate.classList.add("hidden");
  document.querySelectorAll(".key-btn").forEach(function(b) { b.disabled = false; });
  keyRunning = true;
  setNextKey();
  keyTimer = setInterval(tickTimer, 1000);
}

function setNextKey() {
  kTargetsShown++;
  pressedSet.clear();
  document.querySelectorAll(".key-btn").forEach(function(b) { b.classList.remove("pressed"); });

  var useCombo = kTargetsShown > COMBO_MIN_HITS && Math.random() < COMBO_CHANCE;
  var wrap    = document.getElementById("keyTargetWrap");
  var nameEl  = document.getElementById("keyTargetName");
  var comboEl = document.getElementById("comboTag");

  if (useCombo) {
    var c = COMBOS[Math.floor(Math.random() * COMBOS.length)];
    keyTarget  = c.keys;
    keyIsCombo = true;
    wrap.innerHTML =
      '<div class="target-emoji key-target-cap">' + KEY_CAP[c.keys[0]] + '</div>' +
      '<div class="combo-plus">+</div>' +
      '<div class="target-emoji key-target-cap">' + KEY_CAP[c.keys[1]] + '</div>';
    nameEl.textContent = c.action;
    comboEl.classList.remove("hidden");
  } else {
    var single = keyIsCombo ? null : keyTarget;
    var next = single;
    while (next === single || Array.isArray(next)) {
      next = CONTROL_KEYS[Math.floor(Math.random() * CONTROL_KEYS.length)];
    }
    keyTarget  = next;
    keyIsCombo = false;
    wrap.innerHTML = '<div class="target-emoji key-target-cap">' + KEY_CAP[keyTarget] + '</div>';
    nameEl.textContent = KEY_ACTION[keyTarget];
    comboEl.classList.add("hidden");
  }

  targetShownAt = performance.now();
  var capEls = wrap.querySelectorAll(".key-target-cap");
  capEls.forEach(function(el) {
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = "";
  });
}

function resolveHit() {
  var reaction = Math.round(performance.now() - targetShownAt);
  reactionTimes.push(reaction);
  kH++;
  streak++;
  if (streak > bestStreak) bestStreak = streak;
  var badge = document.getElementById("streakBadge");
  if (streak >= 3) {
    badge.classList.remove("hidden");
    document.getElementById("streakCount").textContent = streak;
  } else {
    badge.classList.add("hidden");
  }
  playHitSound(keyIsCombo);
  flashHud(keyIsCombo ? keyTarget : [keyTarget]);
}

function resolveMiss() {
  kM++;
  streak = 0;
  document.getElementById("streakBadge").classList.add("hidden");
  playMissSound();
}

function refreshStats() {
  var total = kH + kM;
  document.getElementById("kHits").textContent = kH;
  document.getElementById("kMiss").textContent = kM;
  document.getElementById("kAcc").textContent  = total ? Math.round(kH / total * 100) + "%" : "—";
  if (reactionTimes.length) {
    var avg = Math.round(reactionTimes.reduce(function(a, b) { return a + b; }, 0) / reactionTimes.length);
    document.getElementById("kReact").textContent = avg + " ms";
  }
}

function flashBtn(btn, ok) {
  if (!btn) return;
  btn.classList.remove("hit", "miss");
  void btn.offsetWidth;
  btn.classList.add(ok ? "hit" : "miss");
  setTimeout(function() { btn.classList.remove(ok ? "hit" : "miss"); }, ok ? 300 : 350);
}

/* Procesa una pulsación (teclado físico o clic) para el modo de tecla única */
function registerSingleKey(pressedKey) {
  var btn = document.querySelector('.key-btn[data-key="' + pressedKey + '"]');
  if (pressedKey === keyTarget) {
    resolveHit();
    flashBtn(btn, true);
  } else {
    resolveMiss();
    flashBtn(btn, false);
  }
  refreshStats();
  setNextKey();
}

/* Procesa una pulsación para el modo de orden combinada (dos teclas) */
function registerComboKey(pressedKey) {
  var btn = document.querySelector('.key-btn[data-key="' + pressedKey + '"]');
  if (keyTarget.indexOf(pressedKey) === -1) {
    resolveMiss();
    flashBtn(btn, false);
    refreshStats();
    setNextKey();
    return;
  }
  pressedSet.add(pressedKey);
  btn && btn.classList.add("pressed");
  var complete = keyTarget.every(function(k) { return pressedSet.has(k); });
  if (complete) {
    resolveHit();
    keyTarget.forEach(function(k) {
      flashBtn(document.querySelector('.key-btn[data-key="' + k + '"]'), true);
    });
    refreshStats();
    setNextKey();
  }
}

function registerKeyPress(pressedKey) {
  if (!keyRunning) return;
  if (keyIsCombo) registerComboKey(pressedKey);
  else            registerSingleKey(pressedKey);
}

/* clic / toque en el botón en pantalla (fallback móvil) */
function keyBtnClick(btn) {
  registerKeyPress(btn.dataset.key);
}

/* pulsación real del teclado físico */
function normalizeKeyEvent(e) {
  if (e.code === "Space") return "space";
  if (e.key === "Shift")   return "shift";
  if (e.key === "Control") return "ctrl";
  var k = (e.key || "").toLowerCase();
  if (k === "w" || k === "a" || k === "s" || k === "d") return k;
  return null;
}

document.addEventListener("keydown", function(e) {
  var k = normalizeKeyEvent(e);
  if (!k) return;
  // evita que Espacio haga scroll de la página durante cualquiera de los tests
  if (k === "space" && (keyRunning || simRunning)) e.preventDefault();

  // simulación de pilotaje: mantiene el registro de teclas sostenidas
  if (simRunning) {
    heldKeys.add(k);
    if (k === "space" && !e.repeat) triggerSimDash();
  }

  if (e.repeat) return;

  if (keyRunning) {
    if (!keyIsCombo) {
      var btn = document.querySelector('.key-btn[data-key="' + k + '"]');
      if (btn) btn.classList.add("pressed");
    }
    registerKeyPress(k);
  }
});
document.addEventListener("keyup", function(e) {
  var k = normalizeKeyEvent(e);
  if (!k) return;
  heldKeys.delete(k);
  pressedSet.delete(k);
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
  document.getElementById("keyTargetWrap").innerHTML = '<div class="target-emoji key-target-cap">✅</div>';
  document.getElementById("keyTargetName").textContent = "¡COMPLETADO!";
  document.getElementById("comboTag").classList.add("hidden");
  document.getElementById("streakBadge").classList.add("hidden");
  var total = kH + kM;
  var acc   = total ? Math.round(kH / total * 100) : 0;
  var reactAvg = reactionTimes.length
    ? Math.round(reactionTimes.reduce(function(a, b) { return a + b; }, 0) / reactionTimes.length)
    : 0;
  state.keyHits      = kH;
  state.keyMiss      = kM;
  state.keyAcc       = acc;
  state.keyReactAvg  = reactAvg;
  state.keyBestStreak = bestStreak;
  document.getElementById("kAcc").textContent = acc + "%";
  document.getElementById("keyDone").classList.remove("hidden");
}

/* ════════════════════════════════════════════════
   PASO 3 — SIMULACIÓN DE PILOTAJE
   Control práctico de una nave sobre canvas: W/A/S/D
   mueven y giran, Shift acelera (turbo), Ctrl frena y
   Espacio ejecuta un impulso rápido (dash) con cooldown.
   El objetivo es atravesar checkpoints evitando obstáculos.
════════════════════════════════════════════════ */
function generateSimObstacles() {
  var W = simCanvas.width, H = simCanvas.height;
  var cx = W / 2, cy = H / 2;
  simObstacles = [];
  var count = 4;
  for (var i = 0; i < count; i++) {
    var x, y, tries = 0, ok;
    do {
      x = 45 + Math.random() * (W - 90);
      y = 45 + Math.random() * (H - 90);
      ok = Math.hypot(x - cx, y - cy) > 75 &&
           simObstacles.every(function(o) { return Math.hypot(x - o.x, y - o.y) > 70; });
      tries++;
    } while (!ok && tries < 40);
    simObstacles.push({ x: x, y: y, r: 15 + Math.random() * 9, justHit: false });
  }
}

function spawnSimCheckpoint() {
  var W = simCanvas.width, H = simCanvas.height;
  var x, y, tries = 0, ok;
  do {
    x = 32 + Math.random() * (W - 64);
    y = 32 + Math.random() * (H - 64);
    ok = simObstacles.every(function(o) { return Math.hypot(x - o.x, y - o.y) > o.r + 42; }) &&
         Math.hypot(x - simShip.x, y - simShip.y) > 60;
    tries++;
  } while (!ok && tries < 40);
  simCheckpoint = { x: x, y: y, r: 14 };
}

function triggerSimDash() {
  var now = performance.now();
  if (now < simDashCooldownUntil) return;
  simShip.vx += Math.cos(simShip.angle) * 7.2;
  simShip.vy += Math.sin(simShip.angle) * 7.2;
  simDashCooldownUntil = now + 1500;
  simLastDashAt = now;
  playHitSound(true);
}

function drawSim() {
  var ctx = simCtx, W = simCanvas.width, H = simCanvas.height;
  ctx.clearRect(0, 0, W, H);

  // obstáculos
  simObstacles.forEach(function(o) {
    ctx.beginPath();
    ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
    ctx.fillStyle = o.justHit ? "rgba(240,120,120,0.55)" : "rgba(240,120,120,0.22)";
    ctx.fill();
    ctx.strokeStyle = "rgba(240,120,120,0.65)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  // checkpoint (anillo pulsante)
  if (simCheckpoint) {
    var pulse = 1 + 0.18 * Math.sin(performance.now() / 180);
    ctx.beginPath();
    ctx.arc(simCheckpoint.x, simCheckpoint.y, simCheckpoint.r * pulse, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(93,219,166,0.9)";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(simCheckpoint.x, simCheckpoint.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(93,219,166,1)";
    ctx.fill();
  }

  // nave
  ctx.save();
  ctx.translate(simShip.x, simShip.y);
  ctx.rotate(simShip.angle);
  ctx.beginPath();
  ctx.moveTo(14, 0);
  ctx.lineTo(-8, -8);
  ctx.lineTo(-3, 0);
  ctx.lineTo(-8, 8);
  ctx.closePath();
  ctx.fillStyle = "#A8D8EA";
  ctx.shadowColor = "rgba(168,216,234,0.85)";
  ctx.shadowBlur = 12;
  ctx.fill();
  ctx.restore();
}

function simStep() {
  if (!simRunning) return;

  if (heldKeys.has("a")) simShip.angle -= 0.055;
  if (heldKeys.has("d")) simShip.angle += 0.055;

  var thrust = 0;
  if (heldKeys.has("w")) thrust = 0.22;
  else if (heldKeys.has("s")) thrust = -0.12;
  if (thrust > 0 && heldKeys.has("shift")) thrust *= 2;

  simShip.vx += Math.cos(simShip.angle) * thrust;
  simShip.vy += Math.sin(simShip.angle) * thrust;

  if (heldKeys.has("ctrl")) { simShip.vx *= 0.9; simShip.vy *= 0.9; }
  simShip.vx *= 0.985; simShip.vy *= 0.985;

  simShip.x += simShip.vx;
  simShip.y += simShip.vy;

  var W = simCanvas.width, H = simCanvas.height;
  if (simShip.x < SIM_SHIP_R)     { simShip.x = SIM_SHIP_R;     simShip.vx *= -0.5; }
  if (simShip.x > W - SIM_SHIP_R) { simShip.x = W - SIM_SHIP_R; simShip.vx *= -0.5; }
  if (simShip.y < SIM_SHIP_R)     { simShip.y = SIM_SHIP_R;     simShip.vy *= -0.5; }
  if (simShip.y > H - SIM_SHIP_R) { simShip.y = H - SIM_SHIP_R; simShip.vy *= -0.5; }

  simObstacles.forEach(function(o) {
    var dx = simShip.x - o.x, dy = simShip.y - o.y;
    var dist = Math.hypot(dx, dy);
    if (dist < SIM_SHIP_R + o.r) {
      if (!o.justHit) {
        simCollisions++;
        document.getElementById("simCollisions").textContent = simCollisions;
        playMissSound();
        o.justHit = true;
        setTimeout(function() { o.justHit = false; }, 450);
      }
      var nx = dist ? dx / dist : 1, ny = dist ? dy / dist : 0;
      simShip.x = o.x + nx * (SIM_SHIP_R + o.r);
      simShip.y = o.y + ny * (SIM_SHIP_R + o.r);
      simShip.vx *= -0.4; simShip.vy *= -0.4;
    }
  });

  if (simCheckpoint) {
    var cdx = simShip.x - simCheckpoint.x, cdy = simShip.y - simCheckpoint.y;
    if (Math.hypot(cdx, cdy) < SIM_SHIP_R + simCheckpoint.r) {
      simCheckpoints++;
      document.getElementById("simCheckpoints").textContent = simCheckpoints;
      playHitSound(false);
      spawnSimCheckpoint();
    }
  }

  var dashEl = document.getElementById("simDashState");
  if (dashEl) dashEl.textContent = (performance.now() < simDashCooldownUntil) ? "⏳" : "✅";

  ["w","a","s","d","shift","ctrl","space"].forEach(function(k) {
    var icon = document.querySelector('.hud-icon[data-simhud="' + k + '"]');
    if (!icon) return;
    var active = heldKeys.has(k) || (k === "space" && performance.now() - simLastDashAt < 150);
    icon.classList.toggle("lit", active);
  });

  drawSim();
  simAnimFrame = requestAnimationFrame(simStep);
}

function initSimTest() {
  simCanvas = document.getElementById("simCanvas");
  simCtx    = simCanvas.getContext("2d");
  clearInterval(simTimerInterval);
  cancelAnimationFrame(simAnimFrame);
  simRunning = false;
  simCheckpoints = 0; simCollisions = 0;
  heldKeys.clear();
  simDashCooldownUntil = 0; simLastDashAt = 0;

  document.getElementById("simCheckpoints").textContent = "0";
  document.getElementById("simCollisions").textContent  = "0";
  document.getElementById("simDashState").textContent   = "✅";
  document.getElementById("simTimer").textContent       = SIM_DURATION;
  document.getElementById("simDone").classList.add("hidden");
  document.getElementById("simEndOverlay").classList.add("hidden");
  document.getElementById("simCountdown").classList.add("hidden");
  document.querySelectorAll('#simHudPanel .hud-icon').forEach(function(i) { i.classList.remove("lit"); });

  simShip = { x: simCanvas.width / 2, y: simCanvas.height / 2, angle: -Math.PI / 2, vx: 0, vy: 0 };
  generateSimObstacles();
  spawnSimCheckpoint();
  drawSim();

  // muestra la puerta de inicio: el usuario decide cuándo empezar
  var gate = document.getElementById("simStartGate");
  if (gate) gate.classList.remove("hidden");
}

/* Se dispara al presionar "Comenzar simulación": recién aquí arranca la
   cuenta regresiva 3-2-1 y luego el cronómetro de 25s. */
function beginSimCountdown() {
  var gate = document.getElementById("simStartGate");
  if (gate) gate.classList.add("hidden");

  var cd = document.getElementById("simCountdown");
  cd.classList.remove("hidden");
  var n = 3;
  cd.textContent = n;
  var cdInterval = setInterval(function() {
    n--;
    if (n <= 0) {
      clearInterval(cdInterval);
      cd.classList.add("hidden");
      startSimRun();
    } else {
      cd.textContent = n;
    }
  }, 700);
}

function startSimRun() {
  simRunning = true;
  simTime = SIM_DURATION;
  simAnimFrame = requestAnimationFrame(simStep);
  simTimerInterval = setInterval(function() {
    simTime--;
    document.getElementById("simTimer").textContent = simTime;
    if (simTime <= 0) endSimTest();
  }, 1000);
}

function endSimTest() {
  simRunning = false;
  clearInterval(simTimerInterval);
  cancelAnimationFrame(simAnimFrame);
  heldKeys.clear();
  document.querySelectorAll('#simHudPanel .hud-icon').forEach(function(i) { i.classList.remove("lit"); });

  var raw   = simCheckpoints * 20 - simCollisions * 8;
  var score = Math.max(0, Math.min(100, Math.round(raw)));
  state.simCheckpoints = simCheckpoints;
  state.simCollisions  = simCollisions;
  state.simScore       = score;

  document.getElementById("simOverlayScore").textContent = score + "%";
  document.getElementById("simEndOverlay").classList.remove("hidden");
  document.getElementById("simDone").classList.remove("hidden");
}

/* ════════════════════════════════════════════════
   PASO 4 — MULTITAREA
════════════════════════════════════════════════ */
function updateLiveScore() {
  var v = parseInt(document.getElementById("multiScoreInput").value) || 0;
  document.getElementById("liveScore").textContent = v > 0 ? v : "—";
}

function submitMulti() {
  state.multi = parseInt(document.getElementById("multiScoreInput").value) || 0;
  buildResults();
  goStep(5);
  saveToSheets();
}

/* ════════════════════════════════════════════════
   PASO 5 — RESULTADOS
════════════════════════════════════════════════ */
function buildResults() {
  var qPct  = Math.round(state.qScore / QUESTIONS.length * 100);
  var kPct  = state.keyAcc;
  var sPct  = state.simScore;
  var mPct  = Math.min(Math.round(state.multi / 200 * 100), 100);
  var total = Math.round((qPct + kPct + sPct + mPct) / 4);
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

  // nivel + medalla
  var grade = "", color = "", medal = "";
  if      (total >= 90) { grade = "EXPERTO";      color = "#5DDBA6"; medal = "🏆"; }
  else if (total >= 70) { grade = "AVANZADO";     color = "#A8D8EA"; medal = "🥈"; }
  else if (total >= 50) { grade = "INTERMEDIO";   color = "#F5D06A"; medal = "🥉"; }
  else                  { grade = "PRINCIPIANTE"; color = "#F07878"; medal = "🔰"; }

  var medalEl = document.getElementById("resultMedal");
  if (medalEl) medalEl.textContent = medal;

  var gradeEl = document.getElementById("resultGrade");
  if (gradeEl) {
    gradeEl.textContent        = grade;
    gradeEl.style.color        = color;
    gradeEl.style.borderColor  = color + "44";
  }

  var nameEl = document.getElementById("resultUsername");
  if (nameEl) nameEl.textContent = "— " + state.name + " —";

  // guardar mejor marca localmente y mostrar insignia si es récord
  var isNewRecord = saveBestScoreIfBetter(total, state.keyReactAvg);
  var recordBadge = document.getElementById("newRecordBadge");
  if (recordBadge) recordBadge.classList.toggle("hidden", !isNewRecord);

  var statsEl = document.getElementById("resultStats");
  if (statsEl) {
    statsEl.innerHTML = [
      '<div class="stat-card"><div class="stat-value">' + state.qScore + "/" + QUESTIONS.length + '</div><div class="stat-label">Preguntas</div></div>',
      '<div class="stat-card"><div class="stat-value">' + state.keyHits + '</div><div class="stat-label">Aciertos teclas</div></div>',
      '<div class="stat-card"><div class="stat-value">' + state.keyAcc + '%</div><div class="stat-label">Precisión</div></div>',
      '<div class="stat-card"><div class="stat-value">' + state.keyMiss + '</div><div class="stat-label">Fallos teclas</div></div>',
      '<div class="stat-card"><div class="stat-value">' + (state.keyReactAvg || "—") + '</div><div class="stat-label">Reacción (ms)</div></div>',
      '<div class="stat-card"><div class="stat-value">🔥 ' + state.keyBestStreak + '</div><div class="stat-label">Mejor racha</div></div>',
      '<div class="stat-card"><div class="stat-value">' + state.simCheckpoints + '</div><div class="stat-label">Checkpoints</div></div>',
      '<div class="stat-card"><div class="stat-value">' + state.simCollisions + '</div><div class="stat-label">Colisiones</div></div>',
      '<div class="stat-card"><div class="stat-value">' + state.simScore + '%</div><div class="stat-label">Puntaje piloto</div></div>',
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
    nombre:            state.name,
    fecha:             new Date().toLocaleString("es-PE"),
    experiencia_gamer: state.gamingExp,
    mano_dominante:    state.dominantHand,
    preguntas:         state.qScore + "/" + QUESTIONS.length,
    teclas_aciertos:   state.keyHits,
    teclas_fallos:     state.keyMiss,
    teclas_precision:  state.keyAcc + "%",
    teclas_reaccion_ms: state.keyReactAvg,
    teclas_racha_max:  state.keyBestStreak,
    sim_checkpoints:   state.simCheckpoints,
    sim_colisiones:    state.simCollisions,
    sim_puntaje:       state.simScore + "%",
    multitarea:        state.multi,
    total:             state.total + "%"
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
  state.name         = "";
  state.gamingExp    = "";
  state.dominantHand = "";
  state.qScore       = 0;
  state.keyHits      = 0;
  state.keyMiss      = 0;
  state.keyAcc       = 0;
  state.keyReactAvg  = 0;
  state.keyBestStreak = 0;
  state.simCheckpoints = 0;
  state.simCollisions  = 0;
  state.simScore       = 0;
  state.multi        = 0;
  state.total        = 0;

  questionsDone = [];
  clearInterval(keyTimer);
  keyTime    = 30;
  keyRunning = false;
  streak = 0; bestStreak = 0; reactionTimes = [];
  pressedSet.clear();

  clearInterval(simTimerInterval);
  cancelAnimationFrame(simAnimFrame);
  simRunning = false;
  simCheckpoints = 0; simCollisions = 0;
  heldKeys.clear();
  var simCountdownEl = document.getElementById("simCountdown");
  if (simCountdownEl) simCountdownEl.classList.add("hidden");

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
  var recordBadge = document.getElementById("newRecordBadge");
  if (recordBadge) recordBadge.classList.add("hidden");

  renderBestScorePanel();
  goStep(0);
  updateProgress(0);
}
