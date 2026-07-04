// 素材サイトごとのクレジット表記ルール
// policy: required=表記必須 / optional=任意（歓迎） / none=不要 / conditional=素材による
// verified: 規約ページを確認した日付。公開前・定期的に再確認すること。
const SITE_RULES = [
  {
    id: "maou",
    name: "魔王魂",
    label: "魔王魂",
    suffix: "",
    url: "https://maou.audio/",
    ruleUrl: "https://maou.audio/rule/",
    policy: "required",
    note: "著作表記は必須。動画内または概要欄のどちらに記載してもOK（公式例：「音楽：魔王魂」）。",
    verified: "2026-07-04"
  },
  {
    id: "otologic",
    name: "OtoLogic",
    label: "OtoLogic",
    suffix: "（CC BY 4.0）",
    url: "https://otologic.jp/",
    ruleUrl: "https://otologic.jp/free/license.html",
    policy: "required",
    note: "CC BY 4.0。OtoLogicの素材利用が伝わる表記が必要。URLまたは「CC BY 4.0」の併記を推奨（公式例：「BGM by OtoLogic(CC BY 4.0)」）。",
    verified: "2026-07-04"
  },
  {
    id: "dova",
    name: "DOVA-SYNDROME",
    label: "DOVA-SYNDROME",
    suffix: "",
    url: "https://dova-s.jp/",
    ruleUrl: "https://dova-s.jp/_contents/license/",
    policy: "conditional",
    note: "原則表記不要だが、曲によっては作曲者名などの表記が必要。必ず曲の配布ページの利用条件を確認し、必要なら作者名欄に作曲者名を入力。",
    verified: "2026-07-04"
  },
  {
    id: "selab",
    name: "効果音ラボ",
    label: "効果音ラボ",
    suffix: "",
    url: "https://soundeffect-lab.info/",
    ruleUrl: "https://soundeffect-lab.info/agreement/",
    policy: "none",
    note: "報告・クレジット・リンクは一切不要。記載するかは任意。",
    verified: "2026-07-04"
  },
  {
    id: "amacha",
    name: "甘茶の音楽工房",
    label: "甘茶の音楽工房",
    suffix: "",
    url: "https://amachamusic.chagasi.com/",
    ruleUrl: "https://amachamusic.chagasi.com/terms.html",
    policy: "optional",
    note: "表記は必須ではないが歓迎（サイト名・作曲者名・URLのいずれか1つでOK）。注意：この素材を使った動画をYouTubeのContent IDに登録するのは禁止。",
    verified: "2026-07-04"
  },
  {
    id: "irasutoya",
    name: "いらすとや",
    label: "いらすとや",
    suffix: "",
    url: "https://www.irasutoya.com/",
    ruleUrl: "https://www.irasutoya.com/p/terms.html",
    policy: "optional",
    note: "表記は推奨（必須ではない）。注意：1作品につき素材21点以上の利用は有償。",
    verified: "2026-07-04"
  },
  {
    id: "ytaudio",
    name: "YouTube オーディオライブラリ",
    label: "YouTube オーディオライブラリ",
    suffix: "",
    url: "",
    ruleUrl: "https://support.google.com/youtube/answer/3376882",
    policy: "conditional",
    note: "多くの曲は表記不要。ただし帰属表示（人形アイコン）付きの曲は、曲ごとにYouTubeが指定する表記文をそのままコピーして使うこと（このツールの汎用形式では不十分）。",
    verified: "2026-07-04"
  },
  {
    id: "custom",
    name: "その他のサイト（手入力）",
    label: "",
    suffix: "",
    url: "",
    ruleUrl: "",
    policy: "conditional",
    note: "利用する素材サイトの規約ページで、表記の要否と指定の書式を必ず確認してください。",
    verified: ""
  }
];

// 素材の種類 → クレジット行の先頭ラベル
const TYPE_LABELS = {
  "BGM": "音楽",
  "効果音": "効果音",
  "ボイス": "ボイス",
  "イラスト": "イラスト",
  "写真": "写真",
  "フォント": "フォント",
  "動画素材": "動画素材",
  "その他": "素材"
};

// 表記ポリシーのバッジ表示
const POLICY_BADGES = {
  required:    { text: "表記必須",     cls: "badge-required" },
  optional:    { text: "表記任意（歓迎）", cls: "badge-optional" },
  none:        { text: "表記不要",     cls: "badge-none" },
  conditional: { text: "素材により必要", cls: "badge-conditional" }
};
