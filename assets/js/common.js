const API_BASE = "https://localflow.ddns.net/lf";

const THEMES = [
  { primary: "#0d9488", primaryLight: "#f0fdfa", primaryDark: "#115e59", badgeBg: "#f0fdfa", badgeBorder: "#ccfbf1", badgeText: "#115e59" },
  { primary: "#2563eb", primaryLight: "#eff6ff", primaryDark: "#1d4ed8", badgeBg: "#eff6ff", badgeBorder: "#bfdbfe", badgeText: "#1d4ed8" },
  { primary: "#059669", primaryLight: "#ecfdf5", primaryDark: "#047857", badgeBg: "#ecfdf5", badgeBorder: "#d1fae5", badgeText: "#047857" },
  { primary: "#7c3aed", primaryLight: "#f5f3ff", primaryDark: "#6d28d9", badgeBg: "#f5f3ff", badgeBorder: "#ede9fe", badgeText: "#6d28d9" },
  { primary: "#ea580c", primaryLight: "#fff7ed", primaryDark: "#c2410c", badgeBg: "#fff7ed", badgeBorder: "#ffedd5", badgeText: "#c2410c" },
  { primary: "#e11d48", primaryLight: "#fff1f2", primaryDark: "#be123c", badgeBg: "#fff1f2", badgeBorder: "#ffe4e6", badgeText: "#be123c" },
  { primary: "#4f46e5", primaryLight: "#eef2ff", primaryDark: "#3730a3", badgeBg: "#eef2ff", badgeBorder: "#e0e7ff", badgeText: "#3730a3" }
];

function applyDailyTheme() {
  const theme = THEMES[new Date().getDay()];
  const root = document.documentElement;
  root.style.setProperty("--primary", theme.primary);
  root.style.setProperty("--primary-light", theme.primaryLight);
  root.style.setProperty("--primary-dark", theme.primaryDark);
  root.style.setProperty("--badge-bg", theme.badgeBg);
  root.style.setProperty("--badge-border", theme.badgeBorder);
  root.style.setProperty("--badge-text", theme.badgeText);
}

function escapeHtml(text) {
  return String(text ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function apiUrl(url) {
  if (/^https?:\/\//i.test(url)) return url;
  return `${API_BASE}${url.startsWith("/") ? url : "/" + url}`;
}

async function apiGet(url) {
  const res = await fetch(apiUrl(url), {
    method: "GET",
    mode: "cors"
  });
  return await res.json();
}

async function apiSend(url, method, body) {
  const res = await fetch(apiUrl(url), {
    method,
    mode: "cors",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  });
  return await res.json();
}

applyDailyTheme();
