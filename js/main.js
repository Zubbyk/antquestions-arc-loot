window.APP = window.APP || {};

const grid = document.getElementById("grid");
const pills = document.getElementById("categoryPills");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");

const viewButtons = [...document.querySelectorAll("[data-view]")];

let viewMode = "all";        // all | base | weapons
let activeFilter = "all";    // section id or "all"
let state = APP.loadState();

function toast(msg){
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(()=>el.classList.remove("show"), 1200);
}

function getAllSections(){
  return [...window.BASE_DATA, ...window.WEAPONS_DATA];
}

function getVisibleSections(){
  const all = getAllSections();
  if(viewMode === "all") return all;
  return all.filter(s => s.dataset === viewMode);
}

function buildCategoryPills(){
  const sections = getVisibleSections();
  const allPills = [{id:"all", title:"Все"}].concat(sections.map(s=>({id:s.id, title:s.title})));

  pills.innerHTML = "";
  allPills.forEach(c=>{
    const b = document.createElement("div");
    b.className = "pill" + (c.id===activeFilter ? " active" : "");
    b.textContent = c.title;
    b.onclick = ()=>{
      activeFilter = c.id;
      [...pills.children].forEach(x=>x.classList.remove("active"));
      b.classList.add("active");
      render();
    };
    pills.appendChild(b);
  });
}

function onBaseChange(key, need, value, mode){
  if(mode === "delta"){
    const cur = APP.clamp(Number(state[key]||0), 0, need);
    state[key] = APP.clamp(cur + value, 0, need);
  } else {
    state[key] = APP.clamp(value, 0, need);
  }
  APP.saveState(state);
  render();
}

function render(){
  grid.innerHTML = "";

  const q = searchInput.value.trim();
  const sections = getVisibleSections();
  const filteredSections = (activeFilter === "all") ? sections : sections.filter(s => s.id === activeFilter);

  filteredSections.forEach(section=>{
    if(section.dataset === "weapons"){
      // оружие — таблица (фильтруем сразу на рендере по query)
      const card = APP.renderWeaponsTable(section, q);
      grid.appendChild(card);
    } else {
      // убежище — карточки с кнопками
      const card = APP.renderBaseSection(section, state, onBaseChange);
      grid.appendChild(card);
    }
  });

  // общий фильтр для base-карточек + скрытие пустой оружейной таблицы
  APP.applySearchToCards(q, noResults);
}

// View buttons
viewButtons.forEach(btn=>{
  btn.addEventListener("click", ()=>{
    viewMode = btn.dataset.view;
    viewButtons.forEach(b => b.classList.toggle("active", b === btn));
    activeFilter = "all";
    buildCategoryPills();
    render();
  });
});

// Search
searchInput.addEventListener("input", ()=> render());
searchInput.addEventListener("keydown", (e)=>{
  if(e.key === "Escape"){
    searchInput.value = "";
    render();
  }
});

// Hotkeys
window.addEventListener("keydown", (e)=>{
  if(e.key === "/" && document.activeElement !== searchInput){
    e.preventDefault();
    searchInput.focus();
  }
  if(e.ctrlKey && e.key.toLowerCase()==="s"){
    e.preventDefault();
    document.getElementById("btnExport")?.click();
  }
  if(e.ctrlKey && e.key.toLowerCase()==="o"){
    e.preventDefault();
    document.getElementById("fileImport")?.click();
  }
});

// Export / Import
document.getElementById("btnExport")?.addEventListener("click", ()=>{
  const payload = {
    meta: { app:"antquestions-loot", version: 3, exportedAt: new Date().toISOString(), lsKey: APP.LS_KEY },
    progress: state
  };
  APP.downloadTextFile("antquestions-loot.json", JSON.stringify(payload, null, 2));
  toast("Экспорт ✅");
});

document.getElementById("fileImport")?.addEventListener("change", async (e)=>{
  const file = e.target.files?.[0];
  if(!file) return;

  try{
    const text = await file.text();
    const parsed = JSON.parse(text);
    const incoming = parsed?.progress ?? parsed;
    if(!APP.validateImportedProgress(incoming)){
      toast("Не тот JSON ❌");
      e.target.value = "";
      return;
    }

    // merge = max (чтобы ничего не потерять)
    let changed = 0;
    for(const [k,v] of Object.entries(incoming)){
      const cur = Number(state[k]||0);
      const next = Math.max(cur, Number(v));
      if(next !== cur){ state[k] = next; changed++; }
    }

    APP.saveState(state);
    render();
    toast(`Импорт: +${changed} ✅`);
  }catch{
    toast("Ошибка импорта ❌");
  }finally{
    e.target.value = "";
  }
});

document.getElementById("btnImportReplace")?.addEventListener("click", ()=>{
  const input = document.getElementById("fileImport");
  if(!input) return;

  input.click();

  const handler = async (e)=>{
    const file = e.target.files?.[0];
    if(!file){ input.removeEventListener("change", handler); return; }

    const ok = confirm("Заменить текущий прогресс прогрессом из файла?");
    if(!ok){
      input.value = "";
      input.removeEventListener("change", handler);
      return;
    }

    try{
      const text = await file.text();
      const parsed = JSON.parse(text);
      const incoming = parsed?.progress ?? parsed;
      if(!APP.validateImportedProgress(incoming)){
        toast("Не тот JSON ❌");
        return;
      }
      state = incoming;
      APP.saveState(state);
      render();
      toast("Импорт (замена) ✅");
    }catch{
      toast("Ошибка импорта ❌");
    }finally{
      input.value = "";
      input.removeEventListener("change", handler);
    }
  };

  input.addEventListener("change", handler);
});

// INIT
buildCategoryPills();
render();
