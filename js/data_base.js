  window.BASE_DATA = [
  {
    id: "quests",
    dataset: "base",
    title: "Для квестов",
    subtitle: "Квестовые предметы",
    groups: [{ groupTitle: "Список", items: [
      { name: "Импульсный блок «Прыгуна»", need: 1 },
      { name: "Элемент питания", need: 1 },
      { name: "Драйвер «Ракетчика»", need: 1 },
      { name: "Магнетрон", need: 1 },
      { name: "Регулятор потока", need: 1 },
      { name: "Водяной насос", need: 1 },
      { name: "Сейф «Наблюдателя»", need: 1 },
      { name: "Антисептик", need: 2 },
      { name: "Драйвер «Шершня»", need: 2 },
      { name: "Шприц", need: 1 },
      { name: "Драйвер «Осы»", need: 2 },
      { name: "Сканер «Стукача»", need: 2 },
      { name: "Провода", need: 18 },
      { name: "Батарея", need: 3 },
      { name: "Сплав ARC", need: 3 },
      { name: "Бурлетта", need: 1 },
      { name: "Прочная ткань", need: 1 },
      { name: "Коровяк", need: 1 },
      { name: "Удобрение", need: 1 },
    ]}]
  },
  {
    id: "plushkin",
    dataset: "base",
    title: "Для Плюшкина",
    subtitle: "По уровням",
    groups: [
      { groupTitle: "УР. 2", items: [{ name: "Собачий ошейник", need: 1 }] },
      { groupTitle: "УР. 3", items: [{ name: "Лимон", need: 3 }, { name: "Абрикос", need: 3 }]},
      { groupTitle: "УР. 4", items: [{ name: "Опунция", need: 6 }, { name: "Оливки", need: 6 }, { name: "Кошачья лежанка", need: 1 }]},
      { groupTitle: "УР. 5", items: [{ name: "Гриб", need: 12 }, { name: "Абрикос", need: 12 }, { name: "Очень удобная подушка", need: 3 }]},
    ]
  },

  // Верстаки (как ты хотел: по левелам, по 3 предмета)
  { id:"wb_weapon_2", dataset:"base", title:"Оруж. верстак — УР.2", subtitle:"Прокачка", groups:[{groupTitle:"УР.2", items:[
    { name:"Ржавые инструменты", need:3 },
    { name:"Механические компоненты", need:5 },
    { name:"Драйвер «Осы»", need:8 },
  ]}]},
  { id:"wb_weapon_3", dataset:"base", title:"Оруж. верстак — УР.3", subtitle:"Прокачка", groups:[{groupTitle:"УР.3", items:[
    { name:"Ржавая шестеренка", need:3 },
    { name:"Продвинутые механические компоненты", need:5 },
    { name:"Огневое ядро «Часового»", need:4 },
  ]}]},

  { id:"wb_gear_2", dataset:"base", title:"Верстак для снаряж. — УР.2", subtitle:"Прокачка", groups:[{groupTitle:"УР.2", items:[
    { name:"Силовой кабель", need:3 },
    { name:"Драйвер «Шершня»", need:5 },
    { name:"Электрические компоненты", need:5 },
  ]}]},
  { id:"wb_gear_3", dataset:"base", title:"Верстак для снаряж. — УР.3", subtitle:"Прокачка", groups:[{groupTitle:"УР.3", items:[
    { name:"Промышленная батарея", need:3 },
    { name:"Продвинутые электрические компоненты", need:5 },
    { name:"Ячейка «Бастиона»", need:6 },
  ]}]},

  { id:"wb_med_2", dataset:"base", title:"Мед. лаборатория — УР.2", subtitle:"Прокачка", groups:[{groupTitle:"УР.2", items:[
    { name:"Треснувший биосканер", need:2 },
    { name:"Прочная ткань", need:5 },
    { name:"Оболочка «Блохи»", need:8 },
  ]}]},
  { id:"wb_med_3", dataset:"base", title:"Мед. лаборатория — УР.3", subtitle:"Прокачка", groups:[{groupTitle:"УР.3", items:[
    { name:"Аптечка с ржавым замком", need:3 },
    { name:"Антисептик", need:8 },
    { name:"Сейф «Наблюдателя»", need:5 },
  ]}]},

  { id:"wb_purifier_2", dataset:"base", title:"Очиститель — УР.2", subtitle:"Прокачка", groups:[{groupTitle:"УР.2", items:[
    { name:"Тостер", need:3 },
    { name:"Движущее ядро ARC", need:5 },
    { name:"Горелка «Огнешара»", need:8 },
  ]}]},
  { id:"wb_purifier_3", dataset:"base", title:"Очиститель — УР.3", subtitle:"Прокачка", groups:[{groupTitle:"УР.3", items:[
    { name:"Мотор", need:3 },
    { name:"Электронная схема ARC", need:10 },
    { name:"Ячейка «Бомбардира»", need:6 },
  ]}]},

  { id:"wb_tools_2", dataset:"base", title:"Верстак для инструментов — УР.2", subtitle:"Прокачка", groups:[{groupTitle:"УР.2", items:[
    { name:"Поврежденный теплопоглотитель", need:2 },
    { name:"Электрические компоненты", need:5 },
    { name:"Сканер «Стукача»", need:6 },
  ]}]},
  { id:"wb_tools_3", dataset:"base", title:"Верстак для инструментов — УР.3", subtitle:"Прокачка", groups:[{groupTitle:"УР.3", items:[
    { name:"Сгоревшая материнская плата", need:3 },
    { name:"Продвинутые электрические компоненты", need:5 },
    { name:"Импульсный блок «Прыгуна»", need:4 },
  ]}]},

  { id:"wb_explosives_2", dataset:"base", title:"Верстак для взрывчатки — УР.2", subtitle:"Прокачка", groups:[{groupTitle:"УР.2", items:[
    { name:"Синтезированное топливо", need:3 },
    { name:"Самодельная взрывчатка", need:5 },
    { name:"Пусковое устройство «Взрывобота»", need:5 },
  ]}]},
  { id:"wb_explosives_3", dataset:"base", title:"Верстак для взрывчатки — УР.3", subtitle:"Прокачка", groups:[{groupTitle:"УР.3", items:[
    { name:"Лабораторные реагенты", need:3 },
    { name:"Взрывчатое вещество", need:5 },
    { name:"Драйвер «Ракетчика»", need:3 },
  ]}]},

  // Экспедиции
  {
    id: "exp1",
    dataset: "base",
    title: "Экспедиция №1",
    subtitle: "Этапы 1–4",
    groups: [{ groupTitle: "Список", items: [
      { name: "Импульсный блок «Прыгуна»", need: 3 },
      { name: "Магнитный ускоритель", need: 3 },
      { name: "Модули исхода", need: 1 },
      { name: "Продвинутые электрические компоненты", need: 5 },
      { name: "Увлажнитель", need: 5 },
      { name: "Датчики", need: 20 },
      { name: "Вентилятор охлаждения", need: 5 },
      { name: "Батарея", need: 30 },
      { name: "Лампочка", need: 5 },
      { name: "Провода", need: 30 },
      { name: "Прочная ткань", need: 35 },
      { name: "Стальная пружина", need: 15 },
      { name: "Сплав ARC", need: 80 },
      { name: "Электрические компоненты", need: 30 },
      { name: "Резиновые детали", need: 200 },
      { name: "Металлические детали", need: 150 },
    ]}]
  },
  {
    id: "exp2",
    dataset: "base",
    title: "Экспедиция №2",
    subtitle: "Этапы 1–4",
    groups: [{ groupTitle: "Список", items: [
      { name: "Импульсный блок «Прыгуна»", need: 3 },
      { name: "Ионный распылитель", need: 3 },
      { name: "Модули исхода", need: 1 },
      { name: "Продвинутые электрические компоненты", need: 5 },
      { name: "Модулятор частот", need: 5 },
      { name: "Гироскоп измельчителя", need: 10 },
      { name: "Змеевик охлаждения", need: 4 },
      { name: "Батарея", need: 30 },
      { name: "Лампочка", need: 4 },
      { name: "Провода", need: 25 },
      { name: "Прочная ткань", need: 35 },
      { name: "Стальная пружина", need: 15 },
      { name: "Сплав ARC", need: 80 },
      { name: "Электрические компоненты", need: 20 },
      { name: "Пластиковые детали", need: 200 },
      { name: "Металлические детали", need: 150 },
    ]}]
  },
];