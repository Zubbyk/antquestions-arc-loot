window.APP = window.APP || {};
APP.LS_KEY = "antquestions_loot_progress_v3";

APP.loadState = function(){
  try { return JSON.parse(localStorage.getItem(APP.LS_KEY) || "{}"); }
  catch { return {}; }
};
APP.saveState = function(st){
  localStorage.setItem(APP.LS_KEY, JSON.stringify(st));
};

APP.downloadTextFile = function(filename, text){
  const blob = new Blob([text], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

APP.validateImportedProgress = function(obj){
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
  for (const [k, v] of Object.entries(obj)) {
    if (typeof k !== "string") return false;
    if (typeof v !== "number" || !Number.isFinite(v) || v < 0) return false;
  }
  return true;
};
