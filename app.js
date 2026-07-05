// クレジット文ジェネレーター 本体ロジック
(function () {
  "use strict";

  const rowsEl = document.getElementById("rows");
  const resultEl = document.getElementById("result");
  const outputEl = document.getElementById("output");
  const checklistEl = document.getElementById("checklist");
  const copyMsgEl = document.getElementById("copy-msg");

  const siteById = (id) => SITE_RULES.find((s) => s.id === id);
  const track = (name, params) => { if (typeof gtag === "function") gtag("event", name, params || {}); };

  // ---- 入力行 ----
  function addRow() {
    const row = document.createElement("div");
    row.className = "row";

    const typeOptions = Object.keys(TYPE_LABELS)
      .map((t) => `<option value="${t}">${t}</option>`)
      .join("");
    const siteOptions = SITE_RULES.map(
      (s) => `<option value="${s.id}">${s.name}</option>`
    ).join("");

    row.innerHTML = `
      <div class="row-fields">
        <select class="f-type" aria-label="素材の種類">${typeOptions}</select>
        <select class="f-site" aria-label="素材サイト">${siteOptions}</select>
        <input class="f-name" type="text" placeholder="素材名（曲名など）" aria-label="素材名">
        <input class="f-author" type="text" placeholder="作者名（任意）" aria-label="作者名">
        <input class="f-csite" type="text" placeholder="サイト名（手入力）" aria-label="サイト名" hidden>
        <input class="f-curl" type="text" placeholder="サイトURL（任意）" aria-label="サイトURL" hidden>
        <button class="f-del" type="button" title="この行を削除">✕</button>
      </div>
      <div class="row-note"></div>
    `;

    row.querySelector(".f-site").addEventListener("change", () => updateRowNote(row));
    row.querySelector(".f-del").addEventListener("click", () => {
      row.remove();
      if (!rowsEl.children.length) addRow();
    });

    rowsEl.appendChild(row);
    updateRowNote(row);
    return row;
  }

  function updateRowNote(row) {
    const site = siteById(row.querySelector(".f-site").value);
    const noteEl = row.querySelector(".row-note");
    const isCustom = site.id === "custom";
    row.querySelector(".f-csite").hidden = !isCustom;
    row.querySelector(".f-curl").hidden = !isCustom;

    const badge = POLICY_BADGES[site.policy];
    noteEl.innerHTML =
      `<span class="badge ${badge.cls}">${badge.text}</span><span>${site.note}</span>`;
  }

  // ---- 生成 ----
  function collectEntries() {
    const entries = [];
    for (const row of rowsEl.children) {
      const name = row.querySelector(".f-name").value.trim();
      if (!name) continue; // 素材名が空の行はスキップ
      const siteId = row.querySelector(".f-site").value;
      entries.push({
        type: row.querySelector(".f-type").value,
        site: siteById(siteId),
        name,
        author: row.querySelector(".f-author").value.trim(),
        customSite: row.querySelector(".f-csite").value.trim(),
        customUrl: row.querySelector(".f-curl").value.trim()
      });
    }
    return entries;
  }

  function generate() {
    const entries = collectEntries();
    if (!entries.length) {
      alert("素材名を1件以上入力してください。");
      return;
    }

    // サイト×種類ごとにまとめる
    const groups = new Map();
    for (const e of entries) {
      const label = e.site.id === "custom" ? (e.customSite || "素材サイト") : e.site.label;
      const url = e.site.id === "custom" ? e.customUrl : e.site.url;
      const key = `${label}|${e.type}`;
      if (!groups.has(key)) {
        groups.set(key, { typeLabel: TYPE_LABELS[e.type], label, suffix: e.site.suffix, url, items: [], site: e.site });
      }
      groups.get(key).items.push(e.author ? `「${e.name}」／${e.author}` : `「${e.name}」`);
    }

    const line = "━━━━━━━━━━━━━━━━";
    const blocks = [];
    for (const g of groups.values()) {
      let block = `${g.typeLabel}：${g.label}${g.suffix}\n${g.items.join("")}`;
      if (g.url) block += `\n${g.url}`;
      blocks.push(block);
    }
    outputEl.value = `${line}\n【使用素材】\n\n${blocks.join("\n\n")}\n${line}`;

    // コピー文には入れない確認事項（規約上の注意）を表示
    const cautions = new Map();
    for (const e of entries) {
      if (e.site.policy === "conditional" || /注意：/.test(e.site.note)) {
        cautions.set(e.site.id, `${e.site.name}：${e.site.note}`);
      }
    }
    if (cautions.size) {
      checklistEl.innerHTML =
        "<strong>公開前の確認事項</strong><ul>" +
        [...cautions.values()].map((c) => `<li>${c}</li>`).join("") +
        "</ul>";
      checklistEl.hidden = false;
    } else {
      checklistEl.hidden = true;
    }

    resultEl.hidden = false;
    copyMsgEl.textContent = "";
    resultEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    track("generate_credit", { asset_count: entries.length, site_count: groups.size });
  }

  // ---- コピー ----
  async function copyOutput() {
    const text = outputEl.value;
    try {
      await navigator.clipboard.writeText(text);
      copyMsgEl.textContent = "コピーしました ✓";
    } catch {
      // file:// 直開きなど clipboard API が使えない環境向けフォールバック
      outputEl.select();
      document.execCommand("copy");
      copyMsgEl.textContent = "コピーしました ✓";
    }
    setTimeout(() => (copyMsgEl.textContent = ""), 3000);
    track("copy_credit");
  }

  // ---- 対応サイト一覧テーブル ----
  function renderSiteTable() {
    const tbody = document.getElementById("site-table-body");
    tbody.innerHTML = SITE_RULES.filter((s) => s.id !== "custom")
      .map((s) => {
        const badge = POLICY_BADGES[s.policy];
        const link = s.ruleUrl ? `<a href="${s.ruleUrl}" target="_blank" rel="noopener">規約ページ</a>` : "－";
        return `<tr><td>${s.name}</td><td><span class="badge ${badge.cls}">${badge.text}</span></td><td>${s.note}</td><td>${link}</td></tr>`;
      })
      .join("");
  }

  // ---- 初期化 ----
  document.getElementById("add-row").addEventListener("click", addRow);
  document.getElementById("generate").addEventListener("click", generate);
  document.getElementById("copy").addEventListener("click", copyOutput);
  renderSiteTable();
  addRow();
})();
