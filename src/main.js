// ==================== PokePop - 宝可梦属性克制查询 ====================

const typeNamesZh = [
  '一般','格斗','飞行','毒','地面','岩石',
  '虫','幽灵','钢','火','水','草',
  '电','超能','冰','龙','恶','妖精'
];

const typeChart = {
  '一般':{'一般':1,'格斗':1,'飞行':1,'毒':1,'地面':1,'岩石':0.5,'虫':1,'幽灵':0,'钢':0.5,'火':1,'水':1,'草':1,'电':1,'超能':1,'冰':1,'龙':1,'恶':1,'妖精':1},
  '格斗':{'一般':2,'格斗':1,'飞行':0.5,'毒':0.5,'地面':1,'岩石':2,'虫':0.5,'幽灵':0,'钢':2,'火':1,'水':1,'草':1,'电':1,'超能':0.5,'冰':2,'龙':1,'恶':2,'妖精':0.5},
  '飞行':{'一般':1,'格斗':2,'飞行':1,'毒':1,'地面':1,'岩石':0.5,'虫':2,'幽灵':1,'钢':0.5,'火':1,'水':1,'草':2,'电':0.5,'超能':1,'冰':1,'龙':1,'恶':1,'妖精':1},
  '毒':{'一般':1,'格斗':1,'飞行':1,'毒':0.5,'地面':0.5,'岩石':0.5,'虫':1,'幽灵':0.5,'钢':0,'火':1,'水':1,'草':2,'电':1,'超能':1,'冰':1,'龙':1,'恶':1,'妖精':2},
  '地面':{'一般':1,'格斗':1,'飞行':0,'毒':2,'地面':1,'岩石':2,'虫':0.5,'幽灵':1,'钢':2,'火':2,'水':1,'草':0.5,'电':2,'超能':1,'冰':1,'龙':1,'恶':1,'妖精':1},
  '岩石':{'一般':1,'格斗':0.5,'飞行':2,'毒':1,'地面':0.5,'岩石':1,'虫':2,'幽灵':1,'钢':0.5,'火':2,'水':1,'草':1,'电':1,'超能':1,'冰':2,'龙':1,'恶':1,'妖精':1},
  '虫':{'一般':1,'格斗':0.5,'飞行':0.5,'毒':0.5,'地面':1,'岩石':1,'虫':1,'幽灵':0.5,'钢':0.5,'火':0.5,'水':1,'草':2,'电':1,'超能':2,'冰':1,'龙':1,'恶':2,'妖精':0.5},
  '幽灵':{'一般':0,'格斗':1,'飞行':1,'毒':1,'地面':1,'岩石':1,'虫':1,'幽灵':2,'钢':1,'火':1,'水':1,'草':1,'电':1,'超能':2,'冰':1,'龙':1,'恶':0.5,'妖精':1},
  '钢':{'一般':1,'格斗':1,'飞行':1,'毒':1,'地面':1,'岩石':2,'虫':1,'幽灵':1,'钢':0.5,'火':0.5,'水':0.5,'草':1,'电':0.5,'超能':1,'冰':2,'龙':1,'恶':1,'妖精':2},
  '火':{'一般':1,'格斗':1,'飞行':1,'毒':1,'地面':1,'岩石':0.5,'虫':2,'幽灵':1,'钢':2,'火':0.5,'水':0.5,'草':2,'电':1,'超能':1,'冰':2,'龙':0.5,'恶':1,'妖精':1},
  '水':{'一般':1,'格斗':1,'飞行':1,'毒':1,'地面':2,'岩石':2,'虫':1,'幽灵':1,'钢':1,'火':2,'水':0.5,'草':0.5,'电':1,'超能':1,'冰':1,'龙':0.5,'恶':1,'妖精':1},
  '草':{'一般':1,'格斗':1,'飞行':0.5,'毒':0.5,'地面':2,'岩石':2,'虫':0.5,'幽灵':1,'钢':0.5,'火':0.5,'水':2,'草':0.5,'电':1,'超能':1,'冰':1,'龙':0.5,'恶':1,'妖精':1},
  '电':{'一般':1,'格斗':1,'飞行':2,'毒':1,'地面':0,'岩石':1,'虫':1,'幽灵':1,'钢':1,'火':1,'水':2,'草':0.5,'电':0.5,'超能':1,'冰':1,'龙':0.5,'恶':1,'妖精':1},
  '超能':{'一般':1,'格斗':2,'飞行':1,'毒':2,'地面':1,'岩石':1,'虫':1,'幽灵':1,'钢':0.5,'火':1,'水':1,'草':1,'电':1,'超能':0.5,'冰':1,'龙':1,'恶':0,'妖精':1},
  '冰':{'一般':1,'格斗':1,'飞行':2,'毒':1,'地面':2,'岩石':1,'虫':1,'幽灵':1,'钢':0.5,'火':0.5,'水':0.5,'草':2,'电':1,'超能':1,'冰':0.5,'龙':2,'恶':1,'妖精':1},
  '龙':{'一般':1,'格斗':1,'飞行':1,'毒':1,'地面':1,'岩石':1,'虫':1,'幽灵':1,'钢':0.5,'火':1,'水':1,'草':1,'电':1,'超能':1,'冰':1,'龙':2,'恶':1,'妖精':0},
  '恶':{'一般':1,'格斗':0.5,'飞行':1,'毒':1,'地面':1,'岩石':1,'虫':1,'幽灵':2,'钢':1,'火':1,'水':1,'草':1,'电':1,'超能':2,'冰':1,'龙':1,'恶':0.5,'妖精':0.5},
  '妖精':{'一般':1,'格斗':2,'飞行':1,'毒':0.5,'地面':1,'岩石':1,'虫':1,'幽灵':1,'钢':0.5,'火':0.5,'水':1,'草':1,'电':1,'超能':1,'冰':1,'龙':2,'恶':2,'妖精':1}
};

const typeColors = {
  '一般':'#B5B4AF','格斗':'#BE4D47','飞行':'#81b9ef','毒':'#8943B0',
  '地面':'#9C5A59','岩石':'#D3A865','虫':'#9CAE1E','幽灵':'#704170',
  '钢':'#60a1b8','火':'#E75357','水':'#3F98EA','草':'#3fa129',
  '电':'#F9CE40','超能':'#F8669C','冰':'#3fd8ff','龙':'#5060e1',
  '恶':'#61484B','妖精':'#E259E7'
};

// ---------- 状态 ----------
let allPokemon = [];
let selectedAttack1 = null, selectedAttack2 = null;
let selectedDefense1 = null, selectedDefense2 = null;
let currentAttackPokemon = null, currentDefensePokemon = null;

// 属性选择器状态
let pickerSide = null;        // 'attack' | 'defense' | 'ts'
let pickerTemp1 = null;
let pickerTemp2 = null;

// 属性查宝可梦页面状态
let tsType1 = null, tsType2 = null;

// 闪光模式
let attackShiny = false, defenseShiny = false;


// ---------- DOM ----------
const $ = id => document.getElementById(id);
const attackSearch = $('attackSearch');
const defenseSearch = $('defenseSearch');
const attackResults = $('attackSearchResults');
const defenseResults = $('defenseSearchResults');
const attackTypeDisplay = $('attackTypeDisplay');
const defenseTypeDisplay = $('defenseTypeDisplay');
const attackPokemonDisplay = $('attackPokemonDisplay');
const defensePokemonDisplay = $('defensePokemonDisplay');
const attackPokemonImage = $('attackPokemonImage');
const defensePokemonImage = $('defensePokemonImage');
const attackPokemonName = $('attackPokemonName');
const defensePokemonName = $('defensePokemonName');
const clearAttackBtn = $('clearAttackPokemon');
const attackShinyStar = $('attackShinyStar');
const clearDefenseBtn = $('clearDefensePokemon');
const defenseShinyStar = $('defenseShinyStar');
const clearBtn = $('clearBtn');
const swapBtn = $('swapBtn');
const resultDisplay = $('resultDisplay');
const resultHint = $('resultHint');

// 属性选择器
const typePickerModal = $('typePickerModal');
const typePickerGrid = $('typePickerGrid');
const typePickerHint = $('typePickerHint');
const closeTypePicker = $('closeTypePicker');
const typePickerClear = $('typePickerClear');
const typePickerConfirm = $('typePickerConfirm');

// ==================== 初始化 ====================
async function init() {
  try {
    const resp = await fetch('./pokemon-data/pokedex.json');
    allPokemon = await resp.json();
  } catch (e) {
    console.error('加载数据失败', e);
  }
  updateTypeBadges();
  updateResultDisplay();
  try { await window.__TAURI__?.core?.invoke('mark_show'); } catch (_) {}
  await setupEvents();
}

// ==================== 搜索 ====================
function searchPokemon(query) {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const qu = query.toUpperCase();
  const scored = allPokemon.map(p => {
    let score = 0;
    const name = p.name || '';
    if (name === query) score = 100;
    else if (name.includes(query)) score = 98;
    else if (p.pinyinInitials === qu) score = 97;
    else if (p.pinyinInitials && p.pinyinInitials.startsWith(qu)) score = 95;
    else if ((p.pinyin || '').toLowerCase() === q) score = 94;
    else if ((p.pinyin || '').toLowerCase().includes(q)) score = 92;
    else if (`#${p.index}` === query || String(p.index) === query) score = 85;
    else if (p.pinyinInitials && p.pinyinInitials.includes(qu)) score = 80;
    return { pokemon: p, score };
  }).filter(i => i.score > 0).sort((a, b) => b.score - a.score || (a.pokemon.index - b.pokemon.index)).slice(0, 8);
  return scored.map(i => i.pokemon);
}

function renderSearchResults(results, list) {
  if (!results || results.length === 0) { list.classList.remove('show'); return; }
  list.innerHTML = results.map(p => `
    <div class="search-result-item" data-id="${p.index}">
      <span class="search-result-id">#${p.index}</span>
      <span class="search-result-name">${p.name}</span>
    </div>
  `).join('');
  list.classList.add('show');
}

// ==================== 选中宝可梦 ====================
async function selectAttackPokemon(pokemon) {
  if (!pokemon) return;
  currentAttackPokemon = pokemon;
  attackShiny = false;
  selectedAttack1 = pokemon.types[0] || null;
  selectedAttack2 = pokemon.types[1] || null;
  await showPokemonIndicator(attackPokemonImage, attackPokemonName, attackPokemonDisplay, pokemon);
  await loadAttackImage();
  attackSearch.value = '';
  attackResults.classList.remove('show');
  updateTypeBadges();
  updateResultDisplay();
}

async function selectDefensePokemon(pokemon) {
  if (!pokemon) return;
  currentDefensePokemon = pokemon;
  defenseShiny = false;
  selectedDefense1 = pokemon.types[0] || null;
  selectedDefense2 = pokemon.types[1] || null;
  await showPokemonIndicator(defensePokemonImage, defensePokemonName, defensePokemonDisplay, pokemon);
  await loadDefenseImage();
  defenseSearch.value = '';
  defenseResults.classList.remove('show');
  updateTypeBadges();
  updateResultDisplay();
}

async function showPokemonIndicator(imgEl, nameEl, displayEl, pokemon) {
  const hasImage = pokemon.image && pokemon.image.trim();
  if (hasImage) {
    await resolveImageSrc(pokemon.image, imgEl);
    imgEl.style.display = '';
  } else {
    imgEl.style.display = 'none';
  }
  imgEl.alt = pokemon.name;
  nameEl.textContent = pokemon.name;
  displayEl.style.display = 'flex';
}

async function resolveImageSrc(relativePath, imgEl) {
  const invoke = window.__TAURI__?.core?.invoke;
  if (invoke) {
    try {
      const dataUrl = await invoke('get_image_data_url', { relativePath });
      imgEl.src = dataUrl;
      return;
    } catch (_) {}
  }
  imgEl.src = `./${relativePath}`;
}

/** 加载防守方图片（普通/闪光） */
async function loadDefenseImage() {
  if (!currentDefensePokemon) return;
  const p = currentDefensePokemon;
  const path = defenseShiny && p['image-shiny'] ? p['image-shiny'] : p.image;
  const invoke = window.__TAURI__?.core?.invoke;
  if (invoke && path) {
    try {
      const dataUrl = await invoke('get_image_data_url', { relativePath: path });
      defensePokemonImage.src = dataUrl;
    } catch (_) {
      defensePokemonImage.src = `./${path}`;
    }
  } else if (path) {
    defensePokemonImage.src = `./${path}`;
  }
  defenseShinyStar.classList.toggle('show', defenseShiny);
}

function toggleDefenseShiny() {
  defenseShiny = !defenseShiny;
  loadDefenseImage();
}

/** 加载攻击方图片（普通/闪光） */
async function loadAttackImage() {
  if (!currentAttackPokemon) return;
  const p = currentAttackPokemon;
  const path = attackShiny && p['image-shiny'] ? p['image-shiny'] : p.image;
  const invoke = window.__TAURI__?.core?.invoke;
  if (invoke && path) {
    try {
      const dataUrl = await invoke('get_image_data_url', { relativePath: path });
      attackPokemonImage.src = dataUrl;
    } catch (_) {
      attackPokemonImage.src = `./${path}`;
    }
  } else if (path) {
    attackPokemonImage.src = `./${path}`;
  }
  attackShinyStar.classList.toggle('show', attackShiny);
}

function toggleAttackShiny() {
  attackShiny = !attackShiny;
  loadAttackImage();
}

function clearAttackPokemon() {
  currentAttackPokemon = null;
  attackShiny = false;
  attackPokemonDisplay.style.display = 'none';
  selectedAttack1 = null; selectedAttack2 = null;
  updateTypeBadges(); updateResultDisplay();
}

function clearDefensePokemon() {
  currentDefensePokemon = null;
  defenseShiny = false;
  defensePokemonDisplay.style.display = 'none';
  selectedDefense1 = null; selectedDefense2 = null;
  updateTypeBadges(); updateResultDisplay();
}

// ==================== 属性标签更新（取代下拉框） ====================
function updateTypeBadges() {
  renderTypeBadge(attackTypeDisplay, selectedAttack1, selectedAttack2);
  renderTypeBadge(defenseTypeDisplay, selectedDefense1, selectedDefense2);
}

function renderTypeBadge(container, t1, t2) {
  const clearBtn = container.querySelector('.badge-clear-btn');
  if (!t1 && !t2) {
    container.innerHTML = '<span class="type-badge type-badge-empty">点击选择属性</span>';
    // 重新追加清除按钮
    const cb = document.createElement('button');
    cb.className = 'badge-clear-btn';
    cb.setAttribute('aria-label', '清除');
    cb.setAttribute('title', '清除');
    cb.innerHTML = '<svg><use xlink:href="./icons/sprites.svg#icon-close"></use></svg>';
    cb.style.display = 'none';
    container.appendChild(cb);
  } else {
    const parts = [];
    if (t1) parts.push(`<span class="type-badge" style="background:${typeColors[t1]}">${t1}</span>`);
    if (t2) parts.push(`<span class="type-badge" style="background:${typeColors[t2]}">${t2}</span>`);
    parts.push(`<button class="badge-clear-btn" aria-label="清除" title="清除" style="display:inline-flex"><svg><use xlink:href="./icons/sprites.svg#icon-close"></use></svg></button>`);
    container.innerHTML = parts.join('');
  }
}

// ==================== 属性选择器模态框 ====================
function openTypePicker(side) {
  pickerSide = side;
  if (side === 'attack') {
    pickerTemp1 = selectedAttack1;
    pickerTemp2 = selectedAttack2;
  } else if (side === 'defense') {
    pickerTemp1 = selectedDefense1;
    pickerTemp2 = selectedDefense2;
  } else if (side === 'ts') {
    pickerTemp1 = tsType1;
    pickerTemp2 = tsType2;
  }
  // 去重
  if (pickerTemp1 && pickerTemp2 && pickerTemp1 === pickerTemp2) pickerTemp2 = null;

  renderPickerButtons();
  updatePickerHint();
  typePickerModal.style.display = 'flex';
  try { window.__TAURI__?.core?.invoke('set_ignore_blur', { ignore: true }); } catch (_) {}
}

function renderPickerButtons() {
  // 计算箭头标注
  const arrows = {};
  typeNamesZh.forEach(t => { arrows[t] = ''; });

  if (pickerSide === 'defense' && (selectedAttack1 || selectedAttack2)) {
    // 攻击方有 AB 双属性，只看防守方能防住几个
    typeNamesZh.forEach(t => {
      const a1 = selectedAttack1, a2 = selectedAttack2;
      if (!a1) { arrows[t] = ''; return; }
      const m1 = typeChart[a1]?.[t];
      if (m1 == null) { arrows[t] = ''; return; }
      const m2 = a2 ? (typeChart[a2]?.[t] ?? 1) : 1;
      // 任一攻击属性 > 1x → 防不住；都 < 1x → 防住了
      const hasStrong = m1 > 1 || m2 > 1;
      const allWeak = m1 < 1 && (a2 ? m2 < 1 : true);
      arrows[t] = hasStrong ? '↓' : allWeak ? '↑' : '';
    });
  } else if (pickerSide === 'attack' && (selectedDefense1 || selectedDefense2)) {
    typeNamesZh.forEach(t => {
      const d1 = selectedDefense1, d2 = selectedDefense2;
      if (!d1) { arrows[t] = ''; return; }
      const m1 = typeChart[t]?.[d1];
      if (m1 == null) { arrows[t] = ''; return; }
      let m = m1;
      if (d2) {
        const m2 = typeChart[t]?.[d2];
        if (m2 != null) m = (m1 === 0 || m2 === 0) ? 0 : m1 * m2;
      }
      arrows[t] = m > 1 ? '↑' : m < 1 ? '↓' : '';
    });
  }

  typePickerGrid.innerHTML = typeNamesZh.map(t => {
    const is1 = pickerTemp1 === t;
    const is2 = pickerTemp2 === t;
    let cls = 'type-picker-btn';
    if (is1) cls += ' selected1';
    if (is2) cls += ' selected2';
    const arrow = arrows[t] ? `<span class="picker-arrow ${arrows[t] === '↑' ? 'arrow-up' : 'arrow-down'}"><svg class="arrow-icon"><use xlink:href="./icons/sprites.svg#icon-arrow-up"></use></svg></span>` : '';
    return `<button class="${cls}" style="background:${typeColors[t]}" data-type="${t}">${t}${arrow}</button>`;
  }).join('');

  // 点击按钮选择
  typePickerGrid.querySelectorAll('.type-picker-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      if (pickerTemp1 === type) {
        pickerTemp1 = null;
      } else if (pickerTemp2 === type) {
        pickerTemp2 = null;
      } else if (!pickerTemp1) {
        pickerTemp1 = type;
      } else if (!pickerTemp2) {
        pickerTemp2 = type;
      }
      // 去重
      if (pickerTemp1 && pickerTemp2 && pickerTemp1 === pickerTemp2) pickerTemp2 = null;
      renderPickerButtons();
      updatePickerHint();
    });
  });
}

function updatePickerHint() {
  if (pickerTemp1 && pickerTemp2) {
    typePickerHint.textContent = `已选 ${pickerTemp1} + ${pickerTemp2}，点击可移除`;
  } else if (pickerTemp1) {
    typePickerHint.textContent = '点击选择第 2 个属性';
  } else {
    typePickerHint.textContent = '点击选择第 1 个属性';
  }
}

async function confirmPickedTypes() {
  if (pickerSide === 'attack') {
    if (currentAttackPokemon) { currentAttackPokemon = null; attackPokemonDisplay.style.display = 'none'; attackShiny = false; }
    selectedAttack1 = pickerTemp1;
    selectedAttack2 = pickerTemp2;
  } else if (pickerSide === 'defense') {
    if (currentDefensePokemon) { currentDefensePokemon = null; defensePokemonDisplay.style.display = 'none'; defenseShiny = false; }
    selectedDefense1 = pickerTemp1;
    selectedDefense2 = pickerTemp2;
  } else if (pickerSide === 'ts') {
    tsType1 = pickerTemp1;
    tsType2 = pickerTemp2;
    const badge = document.getElementById('tsTypeBadge');
    if (badge) renderTypeBadge(badge, tsType1, tsType2);
    if (typeof filterByTypePage === 'function') await filterByTypePage();
  }
  typePickerModal.style.display = 'none';
  pickerSide = null;
  updateTypeBadges();
  updateResultDisplay();
}

function clearPickedTypes() {
  pickerTemp1 = null;
  pickerTemp2 = null;
  renderPickerButtons();
  updatePickerHint();
}

// ==================== 倍率计算与显示 ====================
function calcMult(att, def1, def2) {
  if (!att || !def1) return null;
  const m1 = typeChart[att]?.[def1];
  if (m1 == null) return null;
  if (!def2) return m1;
  const m2 = typeChart[att]?.[def2];
  return (m1 === 0 || m2 === 0) ? 0 : m1 * m2;
}

function updateResultDisplay() {
  if (selectedAttack1 && selectedAttack2 && selectedAttack1 === selectedAttack2) { selectedAttack2 = null; updateTypeBadges(); }
  if (selectedDefense1 && selectedDefense2 && selectedDefense1 === selectedDefense2) { selectedDefense2 = null; updateTypeBadges(); }

  const hasAtk = selectedAttack1 || selectedAttack2;
  const hasDef = selectedDefense1 || selectedDefense2;

  if (!hasAtk || !hasDef) {
    resultDisplay.innerHTML = `<span class="type-pill">?</span><span class="result-arrow">→</span><span class="type-pill">?</span><span class="result-eq">=</span><span class="result-mult">?</span>`;
    resultHint.textContent = '';
    return;
  }

  const defHtml = selectedDefense2
    ? `<span class="type-pill dual-pill" style="--c1:${typeColors[selectedDefense1]};--c2:${typeColors[selectedDefense2]}">${selectedDefense1}+${selectedDefense2}</span>`
    : `<span class="type-pill" style="background:${typeColors[selectedDefense1]}">${selectedDefense1}</span>`;

  if (selectedAttack1 && selectedAttack2) {
    const m1 = calcMult(selectedAttack1, selectedDefense1, selectedDefense2);
    const m2 = calcMult(selectedAttack2, selectedDefense1, selectedDefense2);
    resultDisplay.innerHTML = `
      <div class="result-dual">
        <div class="result-dual-row">
          <span class="type-pill" style="background:${typeColors[selectedAttack1]}">${selectedAttack1}</span>
          <span class="result-arrow">→</span>${defHtml}<span class="result-eq">=</span>
          <span class="result-mult ${m1!=null ? multClass(m1) : ''}">${m1!=null ? m1+'×' : '?'}</span>
        </div>
        <div class="result-dual-row">
          <span class="type-pill" style="background:${typeColors[selectedAttack2]}">${selectedAttack2}</span>
          <span class="result-arrow">→</span>${defHtml}<span class="result-eq">=</span>
          <span class="result-mult ${m2!=null ? multClass(m2) : ''}">${m2!=null ? m2+'×' : '?'}</span>
        </div>
      </div>`;
    resultHint.textContent = '双属性攻击分别计算';
    return;
  }

  const m = calcMult(selectedAttack1, selectedDefense1, selectedDefense2);
  resultDisplay.innerHTML = `
    <span class="type-pill" style="background:${typeColors[selectedAttack1]}">${selectedAttack1}</span>
    <span class="result-arrow">→</span>${defHtml}<span class="result-eq">=</span>
    <span class="result-mult ${m!=null ? multClass(m) : ''}">${m!=null ? m+'×' : '?'}</span>
  `;
  resultHint.textContent = m != null ? hintText(m) : '';
}

function multClass(m) { return m > 1 ? 'strong' : m === 0 ? 'zero' : m < 1 ? 'weak' : ''; }
function hintText(m) { return m > 1 ? '效果拔群！' : m === 0 ? '没有效果…' : m < 1 ? '收效甚微' : ''; }

function clearSelection() {
  selectedAttack1 = null; selectedAttack2 = null;
  selectedDefense1 = null; selectedDefense2 = null;
  currentAttackPokemon = null; currentDefensePokemon = null;
  attackPokemonDisplay.style.display = 'none';
  defensePokemonDisplay.style.display = 'none';
  updateTypeBadges(); updateResultDisplay();
}

async function swapSelection() {
  if (!selectedAttack1 && !selectedAttack2 && !selectedDefense1 && !selectedDefense2) return;
  const a1 = selectedAttack1, a2 = selectedAttack2, cap = currentAttackPokemon, cdp = currentDefensePokemon;
  const as = attackShiny, ds = defenseShiny;
  selectedAttack1 = selectedDefense1; selectedAttack2 = selectedDefense2;
  selectedDefense1 = a1; selectedDefense2 = a2;
  currentAttackPokemon = cdp; currentDefensePokemon = cap;
  attackShiny = ds; defenseShiny = as;

  if (currentAttackPokemon) {
    await showPokemonIndicator(attackPokemonImage, attackPokemonName, attackPokemonDisplay, currentAttackPokemon);
    await loadAttackImage();
  } else {
    attackPokemonDisplay.style.display = 'none';
  }
  if (currentDefensePokemon) {
    await showPokemonIndicator(defensePokemonImage, defensePokemonName, defensePokemonDisplay, currentDefensePokemon);
    await loadDefenseImage();
  } else {
    defensePokemonDisplay.style.display = 'none';
  }
  updateTypeBadges(); updateResultDisplay();
}

// ==================== 搜索键盘导航 ====================
/** 键盘导航状态 - 每个 input 独立索引 */
const searchNavState = {};

function setupSearchKeyboard(input, results, selectFn) {
  const key = input.id || Math.random();
  searchNavState[key] = -1;

  input.addEventListener('keydown', function(e) {
    const items = results.querySelectorAll('.search-result-item');
    if (!items.length) return;
    let idx = searchNavState[key];

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      idx = idx < items.length - 1 ? idx + 1 : 0;
      items.forEach((it, i) => it.classList.toggle('highlight', i === idx));
      items[idx].scrollIntoView({ block: 'nearest' });
      searchNavState[key] = idx;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      idx = idx > 0 ? idx - 1 : items.length - 1;
      items.forEach((it, i) => it.classList.toggle('highlight', i === idx));
      items[idx].scrollIntoView({ block: 'nearest' });
      searchNavState[key] = idx;
    } else if (e.key === 'Enter' && idx >= 0 && idx < items.length) {
      e.preventDefault();
      const p = allPokemon.find(pp => pp.index === items[idx].dataset.id);
      if (p) { selectFn(p); searchNavState[key] = -1; }
    } else if (e.key === 'Escape') {
      results.classList.remove('show');
      searchNavState[key] = -1;
    }
  });

  input.addEventListener('input', () => { searchNavState[key] = -1; });
  input.addEventListener('blur', () => setTimeout(() => { results.classList.remove('show'); searchNavState[key] = -1; }, 150));
}

// ==================== 属性克制表（独立状态，不和首页关联） ====================
let typeChartSortCol = -1;
let typeChartSortAsc = true;
let tcAttack1 = null, tcAttack2 = null;
let tcDefense1 = null, tcDefense2 = null;

function tcCycle(state, type) {
  // 点击行/列标题的循环选择逻辑
  if (!state.a1 && !state.a2) {
    state.a1 = type; state.a2 = null;
  } else if (state.a1 === type) {
    if (state.a2) { state.a1 = state.a2; state.a2 = null; }
    else { state.a1 = null; }
  } else if (state.a2 === type) {
    state.a2 = null;
  } else if (state.a1 && !state.a2) {
    state.a2 = type;
  } else {
    state.a2 = type;
  }
  if (state.a1 && state.a2 && state.a1 === state.a2) state.a2 = null;
}

function renderTypeChart() {
  const container = document.getElementById('typeChartContainer');
  const types = typeNamesZh;
  const chart = typeChart;

  // 列排序
  let colOrder = types.map((_, i) => i);
  if (typeChartSortCol >= 0) {
    colOrder.sort((a, b) => {
      const defA = types[a], defB = types[b];
      let sumA = 0, sumB = 0;
      for (let i = 0; i < types.length; i++) {
        sumA += chart[types[i]]?.[defA] || 1;
        sumB += chart[types[i]]?.[defB] || 1;
      }
      let cmp = sumA - sumB;
      if (!typeChartSortAsc) cmp = -cmp;
      return cmp || a - b;
    });
  }

  // 行排序
  let rowOrder = types.map((_, i) => i);
  if (typeChartSortCol >= 0) {
    rowOrder.sort((a, b) => {
      let sumA = 0, sumB = 0;
      for (let j = 0; j < types.length; j++) {
        sumA += chart[types[a]]?.[types[colOrder[j]]] || 1;
        sumB += chart[types[b]]?.[types[colOrder[j]]] || 1;
      }
      let cmp = sumA - sumB;
      if (!typeChartSortAsc) cmp = -cmp;
      return cmp || a - b;
    });
  }

  const mergeDef = tcDefense1 && tcDefense2 && tcDefense1 !== tcDefense2;

  let html = '<table class="type-chart-table"><thead><tr>';
  html += '<th class="chart-corner">守方<br>攻方</th>';

  colOrder.forEach(i => {
    const t = types[i];
    if (mergeDef && t === tcDefense2) return;
    let label = t;
    let style = `background:${typeColors[t]}`;
    if (mergeDef && t === tcDefense1) {
      label = tcDefense1 + '+' + tcDefense2;
      style = `background:linear-gradient(135deg,${typeColors[tcDefense1]},${typeColors[tcDefense2]})`;
    }
    const selected = t === tcDefense1 || t === tcDefense2;
    const selCls = selected ? ' selected-col-header' : '';
    const useWidth = mergeDef && t === tcDefense1 ? `style="${style};width:${22*2}px"` : `style="${style}"`;
    html += `<th class="col-header${selCls}" data-type="${t}" ${useWidth}>${label}</th>`;
  });
  html += '</tr></thead><tbody>';

  rowOrder.forEach(ri => {
    const att = types[ri];
    const attSelected = att === tcAttack1 || att === tcAttack2;
    const rowCls = attSelected ? ' highlight-row' : '';
    const headerCls = attSelected ? ' selected-row-header' : '';
    
    html += `<tr class="${rowCls}"><td class="row-header${headerCls}" data-type="${att}" style="background:${typeColors[att]}">${att}</td>`;

    colOrder.forEach(ci => {
      const def = types[ci];
      if (mergeDef && def === tcDefense2) return;

      const rawM = chart[att]?.[def];
      let displayM = rawM;
      if (mergeDef && def === tcDefense1) {
        const m2 = chart[att]?.[tcDefense2] || 1;
        displayM = (rawM === 0 || m2 === 0) ? 0 : rawM * m2;
      }

      let colorCls = 'cell';
      if (displayM > 1) colorCls += ' cell-strong';
      else if (displayM === 0) colorCls += ' cell-zero';
      else if (displayM < 1) colorCls += ' cell-weak';

      const isDefHighlight = def === tcDefense1 || def === tcDefense2;
      if (isDefHighlight) colorCls += ' highlight-col';

      const isCross = attSelected && isDefHighlight;
      if (isCross) colorCls += ' highlight-cross';

      const useWidth = mergeDef && def === tcDefense1 ? ` style="width:${22*2}px"` : '';
      html += `<td class="${colorCls}" data-att="${att}" data-def="${def}"${useWidth}>${displayM}</td>`;
    });
    html += '</tr>';
  });

  html += '</tbody></table>';
  container.innerHTML = html;

  // 列标题点击
  container.querySelectorAll('th.col-header').forEach(th => {
    th.addEventListener('click', (e) => {
      const type = th.dataset.type;
      const s = { a1: tcDefense1, a2: tcDefense2 };
      tcCycle(s, type);
      tcDefense1 = s.a1; tcDefense2 = s.a2;
      renderTypeChart();
    });
  });

  // 行标题点击
  container.querySelectorAll('td.row-header').forEach(td => {
    td.addEventListener('click', (e) => {
      const type = td.dataset.type;
      const s = { a1: tcAttack1, a2: tcAttack2 };
      tcCycle(s, type);
      tcAttack1 = s.a1; tcAttack2 = s.a2;
      renderTypeChart();
    });
  });

  // 单元格点击
  container.querySelectorAll('td.cell').forEach(td => {
    td.addEventListener('click', () => {
      tcAttack1 = td.dataset.att; tcAttack2 = null;
      tcDefense1 = td.dataset.def; tcDefense2 = null;
      renderTypeChart();
    });
  });

  // 角落点击
  const corner = container.querySelector('.chart-corner');
  if (corner) {
    corner.addEventListener('click', () => {
      if (tcAttack1 || tcAttack2 || tcDefense1 || tcDefense2) {
        tcAttack1 = null; tcAttack2 = null;
        tcDefense1 = null; tcDefense2 = null;
        renderTypeChart();
      } else {
        if (typeChartSortCol === -1) {
          typeChartSortCol = 0; typeChartSortAsc = true;
        } else if (typeChartSortAsc) {
          typeChartSortAsc = false;
        } else {
          typeChartSortCol = -1; typeChartSortAsc = true;
        }
        renderTypeChart();
      }
    });
  }
}

// ==================== 按属性查宝可梦（全局函数） ====================
async function filterByTypePage() {
  const t1 = tsType1, t2 = tsType2;
  const container = document.getElementById('tsSearchResults');
  if (!container) return;
  if (!t1) { container.innerHTML = '<div class="type-search-empty">选择属性并查找对应宝可梦</div>'; return; }
  const filtered = allPokemon.filter(p => {
    const pts = p.types || [];
    if (t2) return pts.includes(t1) && pts.includes(t2);
    return pts.includes(t1);
  });
  if (!filtered.length) { container.innerHTML = '<div class="type-search-empty">未找到符合条件的宝可梦</div>'; return; }
  container.innerHTML = `
    <div class="type-search-count">共 ${filtered.length} 只</div>
    <div class="type-search-grid">
      ${filtered.map(p => `<div class="type-search-item" data-id="${p.index}">
        <img class="type-search-thumb" data-src="${p.image || ''}" alt="" />
        <span class="search-result-name">${p.name}</span>
        <span class="type-search-types">${(p.types||[]).map(ti => `<span class="type-pill-sm" style="background:${typeColors[ti]}">${ti}</span>`).join('')}</span>
      </div>`).join('')}
    </div>`;
  // 懒加载图片（用 requestIdleCallback 或 setTimeout 分批）
  const imgs = container.querySelectorAll('.type-search-thumb[data-src]');
  const invoke = window.__TAURI__?.core?.invoke;
  if (invoke) {
    for (const img of imgs) {
      const src = img.dataset.src;
      if (src) {
        try {
          const dataUrl = await invoke('get_image_data_url', { relativePath: src });
          img.src = dataUrl;
        } catch (_) {}
      }
    }
  }
  await Promise.resolve();
}

// ==================== 事件绑定 ====================
async function setupEvents() {
  // 搜索 input
  attackSearch.addEventListener('input', () => renderSearchResults(searchPokemon(attackSearch.value), attackResults));
  defenseSearch.addEventListener('input', () => renderSearchResults(searchPokemon(defenseSearch.value), defenseResults));

  // 搜索键盘导航
  setupSearchKeyboard(attackSearch, attackResults, selectAttackPokemon);
  setupSearchKeyboard(defenseSearch, defenseResults, selectDefensePokemon);

  // 搜索点击选择
  attackResults.addEventListener('click', (e) => {
    const item = e.target.closest('.search-result-item');
    if (item) { const p = allPokemon.find(pp => pp.index === item.dataset.id); if (p) selectAttackPokemon(p); }
  });
  defenseResults.addEventListener('click', (e) => {
    const item = e.target.closest('.search-result-item');
    if (item) { const p = allPokemon.find(pp => pp.index === item.dataset.id); if (p) selectDefensePokemon(p); }
  });

  // 宝可梦清除
  clearAttackBtn.addEventListener('click', clearAttackPokemon);
  clearDefenseBtn.addEventListener('click', clearDefensePokemon);

  // 属性标签点击打开选择器
  attackTypeDisplay.addEventListener('click', (e) => {
    if (e.target.closest('.badge-clear-btn')) {
      selectedAttack1 = null; selectedAttack2 = null;
      currentAttackPokemon = null; attackPokemonDisplay.style.display = 'none'; attackShiny = false;
      updateTypeBadges(); updateResultDisplay();
      return;
    }
    openTypePicker('attack');
  });
  defenseTypeDisplay.addEventListener('click', (e) => {
    if (e.target.closest('.badge-clear-btn')) {
      selectedDefense1 = null; selectedDefense2 = null;
      currentDefensePokemon = null; defensePokemonDisplay.style.display = 'none'; defenseShiny = false;
      updateTypeBadges(); updateResultDisplay();
      return;
    }
    openTypePicker('defense');
  });

  // 闪光切换（点击图片切换）
  attackPokemonImage.addEventListener('click', toggleAttackShiny);
  defensePokemonImage.addEventListener('click', toggleDefenseShiny);

  // 属性选择器
  closeTypePicker.addEventListener('click', () => { typePickerModal.style.display = 'none'; pickerSide = null; try { window.__TAURI__?.core?.invoke('set_ignore_blur', { ignore: false }); } catch (_) {} });
  typePickerModal.addEventListener('click', (e) => { if (e.target === typePickerModal) { typePickerModal.style.display = 'none'; pickerSide = null; try { window.__TAURI__?.core?.invoke('set_ignore_blur', { ignore: false }); } catch (_) {} } });
  typePickerClear.addEventListener('click', clearPickedTypes);
  typePickerConfirm.addEventListener('click', () => { confirmPickedTypes(); try { window.__TAURI__?.core?.invoke('set_ignore_blur', { ignore: false }); } catch (_) {} });

  // 操作按钮
  clearBtn.addEventListener('click', clearSelection);
  swapBtn.addEventListener('click', swapSelection);

  // === 属性查宝可梦页面（复用 typePickerModal） ===
  document.getElementById('tsTypeBadge').addEventListener('click', (e) => {
    if (e.target.closest('.badge-clear-btn')) {
      tsType1 = null; tsType2 = null;
      renderTypeBadge(document.getElementById('tsTypeBadge'), null, null);
      filterByTypePage();
      return;
    }
    openTypePicker('ts');
  });

  document.getElementById('tsSearchResults').addEventListener('click', (e) => {
    const item = e.target.closest('.type-search-item');
    if (item && item.dataset.id) {
      switchToPage('matchup');
      const p = allPokemon.find(pp => pp.index === item.dataset.id);
      if (p) setTimeout(() => selectAttackPokemon(p), 50);
    }
  });

  // 关闭 → 隐藏到托盘
  const closeBtn = document.querySelector('.control-btn.close');
  if (closeBtn) {
    closeBtn.addEventListener('click', async () => {
      try {
        const tw = window.__TAURI__?.window;
        if (tw?.getCurrentWindow) await tw.getCurrentWindow().hide();
        else if (tw?.appWindow?.hide) await tw.appWindow.hide();
      } catch (_) {}
    });
  }

  // 失焦隐藏由 Rust 侧 `on_window_event Focused(false)` 处理，拖拽不会触发
  
  // 大头针（同步到 Rust 侧）
  const PIN_KEY = 'pokepop:window:pinned';
  let isPinned = localStorage.getItem(PIN_KEY) === '1';
  const pinBtn = document.querySelector('.control-btn.window-pin');
  if (pinBtn) {
    pinBtn.classList.toggle('active', isPinned);
    if (isPinned) {
      try { await window.__TAURI__?.core?.invoke('set_window_pinned', { pinned: true }); } catch (_) {}
    }
    pinBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      isPinned = !isPinned;
      pinBtn.classList.toggle('active', isPinned);
      localStorage.setItem(PIN_KEY, isPinned ? '1' : '0');
      try { await window.__TAURI__?.core?.invoke('set_window_pinned', { pinned: isPinned }); } catch (_) {}
    });
  }

  // ==================== 3 页面切换系统 ====================
  const pageMatchup = document.getElementById('page-matchup');
  const pageTypeChart = document.getElementById('page-typechart');
  const pageTypesearch = document.getElementById('page-typesearch');
  const pageSettings = document.getElementById('page-settings');
  const btnChart = document.querySelector('.control-btn.type-chart-toggle');
  const btnTypesearch = document.querySelector('.control-btn.btn-typesearch');
  const btnSettings = document.querySelector('.control-btn.btn-settings');
  let chartRendered = false;

  function switchToPage(name) {
    pageMatchup.classList.remove('page-active');
    pageTypeChart.classList.remove('page-active');
    if (pageTypesearch) pageTypesearch.classList.remove('page-active');
    if (pageSettings) pageSettings.classList.remove('page-active');
    btnChart?.classList.remove('active');
    btnTypesearch?.classList.remove('active');
    if (btnSettings) btnSettings.classList.remove('active');
    if (name === 'matchup') {
      pageMatchup.classList.add('page-active');
    } else if (name === 'typechart') {
      pageTypeChart.classList.add('page-active');
      btnChart?.classList.add('active');
      if (!chartRendered) { renderTypeChart(); chartRendered = true; }
    } else if (name === 'typesearch') {
      pageTypesearch.classList.add('page-active');
      btnTypesearch?.classList.add('active');
    } else if (name === 'settings') {
      pageSettings.classList.add('page-active');
      btnSettings?.classList.add('active');
    }
  }

  btnChart?.addEventListener('click', () => {
    const nowChart = pageTypeChart.classList.contains('page-active');
    switchToPage(nowChart ? 'matchup' : 'typechart');
  });

  btnTypesearch?.addEventListener('click', () => {
    const nowSearch = pageTypesearch?.classList.contains('page-active');
    switchToPage(nowSearch ? 'matchup' : 'typesearch');
  });

  btnSettings?.addEventListener('click', () => {
    const nowSettings = pageSettings?.classList.contains('page-active');
    switchToPage(nowSettings ? 'matchup' : 'settings');
  });

  // 点击标题返回首页
  document.querySelector('.app-title')?.addEventListener('click', () => switchToPage('matchup'));

  // 键盘快捷键
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (typePickerModal.style.display === 'flex') { typePickerModal.style.display = 'none'; pickerSide = null; return; }
      attackResults.classList.remove('show');
      defenseResults.classList.remove('show');
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') { e.preventDefault(); attackSearch.focus(); }
  });
}

// ==================== 启动 ====================
document.addEventListener('DOMContentLoaded', init);
