window.APP = window.APP || {};

APP.applySearchToCards = function(query, noResultsEl){
  const q = (query || "").toLowerCase().trim();
  const cards = [...document.querySelectorAll(".card")];

  if(!q){
    cards.forEach(c => c.style.display = "block");
    noResultsEl.classList.remove("show");
    return;
  }

  let any = false;

  cards.forEach(card=>{
    // Weapons table карточка не содержит .item — она фильтруется при рендере, поэтому тут просто оставляем видимость
    const items = [...card.querySelectorAll(".item")];
    const groupTitles = [...card.querySelectorAll(".groupTitle")];

    if(items.length === 0){
      // таблица оружия: оставляем как есть (она уже отфильтрована)
      // но если таблица пустая — скроем карточку
      const hasRows = card.querySelectorAll("tbody tr").length > 0;
      card.style.display = hasRows ? "block" : "none";
      if(hasRows) any = true;
      return;
    }

    // базовые карточки
    items.forEach(it=>{
      const name = it.dataset.name || "";
      const match = name.includes(q);
      it.style.display = match ? "grid" : "none";
      if(match) any = true;
    });

    // скрываем заголовки групп без видимых элементов
    groupTitles.forEach(gt=>{
      let next = gt.nextElementSibling;
      let hasVisible = false;
      while(next && !next.classList.contains("groupTitle")){
        if(next.classList.contains("item") && next.style.display !== "none"){
          hasVisible = true; break;
        }
        next = next.nextElementSibling;
      }
      gt.style.display = hasVisible ? "block" : "none";
    });

    // скрываем карточку если нет видимых items
    const hasAnyVisible = items.some(it => it.style.display !== "none");
    card.style.display = hasAnyVisible ? "block" : "none";
  });

  if(!any) noResultsEl.classList.add("show");
  else noResultsEl.classList.remove("show");
};
