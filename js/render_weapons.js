window.APP = window.APP || {};

APP.renderWeaponsTable = function(section, query){
  const q = (query || "").toLowerCase().trim();

  const card = document.createElement("section");
  card.className = "card";
  card.dataset.dataset = section.dataset;

  const header = document.createElement("div");
  header.className = "cardheader";
  header.innerHTML = `
    <div class="title">
      <h2>${section.title}</h2>
      <p class="meta">${section.subtitle || ""}</p>
    </div>
    <div class="progress">
      <div class="pct">Таблица</div>
      <div class="bar"><div style="width:0%"></div></div>
    </div>
  `;

  const wrap = document.createElement("div");
  wrap.className = "weaponTableWrap";

  const table = document.createElement("table");
  table.className = "weaponTable";

  table.innerHTML = `
    <thead>
      <tr>
        <th style="width:34%">Оружие</th>
        <th>Материалы</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody");

  // Берём все items (оружие) в одном списке
  const weapons = section.groups.flatMap(g => g.items);

  // Фильтр: совпадение по названию оружия ИЛИ по любому ингредиенту
  const filtered = !q ? weapons : weapons.filter(w => {
    const nameHit = (w.name || "").toLowerCase().includes(q);
    const ingrHit = (w.recipe || []).some(r => (r.name || "").toLowerCase().includes(q));
    return nameHit || ingrHit;
  });

  filtered.forEach(w=>{
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.innerHTML = `<div class="weaponName">${w.name}</div>`;

    const tdRecipe = document.createElement("td");
    const line = document.createElement("div");
    line.className = "recipeLine";

    (w.recipe || []).forEach(r=>{
      const tag = document.createElement("span");
      tag.className = "tag";
      const isMatch = q && (r.name || "").toLowerCase().includes(q);
      if(isMatch) tag.classList.add("match");
      tag.innerHTML = `${r.name} <b>×${r.qty}</b>`;
      line.appendChild(tag);
    });

    tdRecipe.appendChild(line);

    tr.appendChild(tdName);
    tr.appendChild(tdRecipe);
    tbody.appendChild(tr);
  });

  wrap.appendChild(table);
  card.appendChild(header);
  card.appendChild(wrap);

  return card;
};
