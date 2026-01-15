window.APP = window.APP || {};

APP.slugify = function(s){
  return s.toLowerCase().replaceAll("ё","е")
    .replace(/[^a-zа-я0-9]+/gi, "-")
    .replace(/^-+|-+$/g,"");
};
APP.itemKey = function(sectionId, groupTitle, name){
  return `${sectionId}__${APP.slugify(groupTitle)}__${APP.slugify(name)}`;
};
APP.clamp = function(n,a,b){ return Math.max(a, Math.min(b, n)); };

APP.computeSectionProgress = function(section, state){
  let needTotal = 0, gotTotal = 0;
  section.groups.forEach(g=>{
    g.items.forEach(it=>{
      const key = APP.itemKey(section.id, g.groupTitle, it.name);
      const got = APP.clamp(Number(state[key]||0), 0, it.need);
      needTotal += it.need;
      gotTotal += got;
    });
  });
  const pct = needTotal ? Math.round((gotTotal/needTotal)*100) : 0;
  return {needTotal, gotTotal, pct};
};

APP.renderBaseSection = function(section, state, onChange){
  const card = document.createElement("section");
  card.className = "card";
  card.dataset.dataset = section.dataset;

  const prog = APP.computeSectionProgress(section, state);

  const header = document.createElement("div");
  header.className = "cardheader";
  header.innerHTML = `
    <div class="title">
      <h2>${section.title}</h2>
      <p class="meta">${section.subtitle || ""}</p>
    </div>
    <div class="progress">
      <div class="pct"><b>${prog.gotTotal}</b> / ${prog.needTotal} • ${prog.pct}%</div>
      <div class="bar"><div style="width:${prog.pct}%"></div></div>
    </div>
  `;

  const list = document.createElement("div");
  list.className = "list";

  section.groups.forEach(group=>{
    const gt = document.createElement("div");
    gt.className = "groupTitle";
    gt.textContent = group.groupTitle;
    list.appendChild(gt);

    group.items.forEach(it=>{
      const key = APP.itemKey(section.id, group.groupTitle, it.name);
      const got = APP.clamp(Number(state[key]||0), 0, it.need);
      const done = got >= it.need;

      const row = document.createElement("div");
      row.className = "item" + (done ? " done" : "");
      row.dataset.name = it.name.toLowerCase();
      row.dataset.dataset = section.dataset;

      const left = document.createElement("div");
      left.className = "left";
      left.innerHTML = `
        <div class="check" title="Готово">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M16.6 6.2L8.7 14.1 3.4 8.8" stroke="rgba(37,208,127,.95)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="name">
          <div class="main">${it.name}</div>
          <div class="sub">${section.title} • ${group.groupTitle}</div>
        </div>
      `;

      const right = document.createElement("div");
      right.className = "right";

      const count = document.createElement("div");
      count.className = "count";
      count.innerHTML = `Собрано: <strong>${got}</strong> / ${it.need}`;

      const btnMinus = document.createElement("div");
      btnMinus.className = "mini";
      btnMinus.textContent = "−1";
      btnMinus.onclick = (e)=>{ e.stopPropagation(); onChange(key, it.need, -1, "delta"); };

      const btnPlus = document.createElement("div");
      btnPlus.className = "mini";
      btnPlus.textContent = "+1";
      btnPlus.onclick = (e)=>{ e.stopPropagation(); onChange(key, it.need, +1, "delta"); };

      const btnAll = document.createElement("div");
      btnAll.className = "mini all";
      btnAll.textContent = "ВСЁ";
      btnAll.onclick = (e)=>{ e.stopPropagation(); onChange(key, it.need, it.need, "set"); };

      right.appendChild(count);
      right.appendChild(btnMinus);
      right.appendChild(btnPlus);
      right.appendChild(btnAll);

      row.appendChild(left);
      row.appendChild(right);
      list.appendChild(row);
    });
  });

  card.appendChild(header);
  card.appendChild(list);
  return card;
};
