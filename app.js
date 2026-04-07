// ============================================================
//  Tech Excuse Generator — App Logic
// ============================================================

(function () {
  "use strict";

  // ── State ──────────────────────────────────────────────────
  let currentCategory = "all";
  let currentExcuse = null;
  let history = [];
  let totalGenerated = 0;

  // ── DOM References ─────────────────────────────────────────
  const generateBtn = document.getElementById("generateBtn");
  const randomCatBtn = document.getElementById("randomCatBtn");
  const excuseCard = document.getElementById("excuseCard");
  const excuseInner = document.getElementById("excuseInner");
  const excuseActions = document.getElementById("excuseActions");
  const copyBtn = document.getElementById("copyBtn");
  const shareSlackBtn = document.getElementById("shareSlackBtn");
  const teamsBtn = document.getElementById("teamsBtn");
  const anotherBtn = document.getElementById("anotherBtn");
  const categoryBtns = document.querySelectorAll(".cat-btn");
  const severityZone = document.getElementById("severityZone");
  const severityFill = document.getElementById("severityFill");
  const severityText = document.getElementById("severityText");
  const statTotal = document.getElementById("statTotal");
  const historyToggle = document.getElementById("historyToggle");
  const historyClose = document.getElementById("historyClose");
  const historyPanel = document.getElementById("historyPanel");
  const historyOverlay = document.getElementById("historyOverlay");
  const historyList = document.getElementById("historyList");
  const clearHistory = document.getElementById("clearHistory");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const showcaseCta = document.getElementById("showcaseCta");
  const excuseCount = document.getElementById("excuseCount");
  const statUnique = document.getElementById("statUnique");

  // Set dynamic excuse count
  if (excuseCount) {
    excuseCount.textContent = window.EXCUSES.length;
  }
  if (statUnique) {
    statUnique.textContent = window.EXCUSES.length;
  }

  // ── Helpers ────────────────────────────────────────────────
  function getFilteredExcuses() {
    if (currentCategory === "all") return window.EXCUSES;
    return window.EXCUSES.filter((e) => e.category === currentCategory);
  }

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getCredibilityLabel(score) {
    if (score >= 90) return { label: "Rock solid", color: "var(--color-success)" };
    if (score >= 80) return { label: "Very convincing", color: "var(--color-primary)" };
    if (score >= 70) return { label: "Plausible", color: "var(--color-gold)" };
    if (score >= 60) return { label: "Use with caution", color: "var(--color-warning)" };
    return { label: "High risk", color: "var(--color-error)" };
  }

  function getCategoryLabel(cat) {
    const labels = {
      connectivity: "Connectivity",
      app: "Apps & Software",
      device: "Device",
      security: "Security",
      infra: "Infra / VPN",
    };
    return labels[cat] || cat;
  }

  // ── Generate Excuse ────────────────────────────────────────
  function generateExcuse(forceCategory) {
    const pool = forceCategory
      ? window.EXCUSES.filter((e) => e.category === forceCategory)
      : getFilteredExcuses();

    if (!pool.length) return;

    // Avoid repeating the same excuse twice in a row
    let excuse = pickRandom(pool);
    let attempts = 0;
    while (excuse === currentExcuse && pool.length > 1 && attempts < 10) {
      excuse = pickRandom(pool);
      attempts++;
    }
    currentExcuse = excuse;
    totalGenerated++;

    // Add to history
    history.unshift({ excuse, timestamp: new Date() });
    if (history.length > 20) history.pop();

    // Render
    renderExcuse(excuse);
    renderSeverity(excuse);
    updateStat();
    renderHistory();
  }

  function renderExcuse(excuse) {
    excuseInner.classList.remove("excuse-visible");

    // Typewriter reveal
    setTimeout(() => {
      const catLabel = getCategoryLabel(excuse.category);
      excuseInner.innerHTML = `
        <div class="excuse-category-tag cat-${excuse.category}">${catLabel}</div>
        <blockquote class="excuse-text">"${excuse.text}"</blockquote>
        <div class="excuse-tags">
          ${excuse.tags.map((t) => `<span class="excuse-tag">#${t}</span>`).join("")}
        </div>
      `;
      excuseInner.classList.add("excuse-visible");
      excuseActions.style.display = "flex";
      excuseCard.classList.add("has-excuse");
    }, 80);
  }

  function renderSeverity(excuse) {
    const { label, color } = getCredibilityLabel(excuse.credibility);
    severityZone.style.display = "flex";
    severityFill.style.width = `${excuse.credibility}%`;
    severityFill.style.background = color;
    severityText.textContent = `${label} — ${excuse.credibility}% credibility`;
    severityText.style.color = color;
  }

  function updateStat() {
    statTotal.textContent = totalGenerated;
  }

  // ── Copy / Share ───────────────────────────────────────────
  function copyText(text, btn) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        const original = btn.innerHTML;
        btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
        btn.classList.add("copied");
        setTimeout(() => {
          btn.innerHTML = original;
          btn.classList.remove("copied");
        }, 2000);
      })
      .catch(() => {
        // Fallback
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      });
  }

  copyBtn.addEventListener("click", () => {
    if (currentExcuse) copyText(currentExcuse.text, copyBtn);
  });

  shareSlackBtn.addEventListener("click", () => {
    if (currentExcuse) copyText(`> ${currentExcuse.text}\n_🖥️ Tech excuse — credibility: ${currentExcuse.credibility}%_`, shareSlackBtn);
  });

  teamsBtn.addEventListener("click", () => {
    if (currentExcuse) copyText(`**[Tech Excuse]** ${currentExcuse.text}`, teamsBtn);
  });

  anotherBtn.addEventListener("click", () => generateExcuse());

  // ── Category Filter ────────────────────────────────────────
  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.dataset.cat;
    });
  });

  // ── Main Buttons ───────────────────────────────────────────
  generateBtn.addEventListener("click", () => generateExcuse());

  randomCatBtn.addEventListener("click", () => {
    const cats = ["connectivity", "app", "device", "security", "infra"];
    const randomCat = pickRandom(cats);
    // briefly highlight the category
    categoryBtns.forEach((b) => {
      b.classList.remove("active");
      if (b.dataset.cat === randomCat) b.classList.add("active");
    });
    currentCategory = randomCat;
    generateExcuse();
  });

  showcaseCta && showcaseCta.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => generateExcuse(), 400);
  });

  // ── History Panel ──────────────────────────────────────────
  function renderHistory() {
    if (!history.length) {
      historyList.innerHTML = `<p class="history-empty">No excuses generated yet.<br/>Get to work! 😅</p>`;
      return;
    }
    historyList.innerHTML = history
      .map(
        ({ excuse, timestamp }) => `
          <div class="history-item">
            <span class="history-cat cat-${excuse.category}">${getCategoryLabel(excuse.category)}</span>
            <p class="history-text">${excuse.text}</p>
            <span class="history-time">${formatTime(timestamp)}</span>
          </div>`
      )
      .join("");
  }

  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function openHistory() {
    historyPanel.classList.add("open");
    historyOverlay.classList.add("open");
    historyPanel.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    renderHistory();
  }

  function closeHistory() {
    historyPanel.classList.remove("open");
    historyOverlay.classList.remove("open");
    historyPanel.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  historyToggle.addEventListener("click", openHistory);
  historyClose.addEventListener("click", closeHistory);
  historyOverlay.addEventListener("click", closeHistory);

  clearHistory.addEventListener("click", () => {
    history = [];
    renderHistory();
  });

  // ── Theme Toggle ───────────────────────────────────────────
  (function () {
    const root = document.documentElement;
    let d = root.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    root.setAttribute("data-theme", d);
    updateThemeIcon(d);

    themeToggle &&
      themeToggle.addEventListener("click", () => {
        d = d === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", d);
        updateThemeIcon(d);
      });

    function updateThemeIcon(theme) {
      if (!themeToggle) return;
      themeToggle.innerHTML =
        theme === "dark"
          ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
          : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  })();

  // ── Keyboard shortcut ──────────────────────────────────────
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && !["INPUT", "TEXTAREA", "BUTTON"].includes(document.activeElement.tagName)) {
      e.preventDefault();
      generateExcuse();
    }
  });

  // ── Auto-generate one on load for fun ─────────────────────
  setTimeout(() => {
    generateExcuse();
  }, 600);
})();
