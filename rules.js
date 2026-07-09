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
    id: "photoac",
    name: "写真AC",
    label: "写真AC",
    suffix: "",
    url: "https://www.photo-ac.com/",
    ruleUrl: "https://www.photo-ac.com/main/terms",
    policy: "optional",
    note: "クレジット表記は任意（不要でもOK）。商用利用・加工OK。注意：素材そのものが主役の商品化（グッズ等でほぼそのまま販売）は別途「商品化ライセンス（有料）」が必要。無料会員はダウンロード数などに制限あり。",
    verified: "2026-07-09"
  },
  {
    id: "illustac",
    name: "イラストAC",
    label: "イラストAC",
    suffix: "",
    url: "https://www.ac-illust.com/",
    ruleUrl: "https://www.ac-illust.com/main/terms.php",
    policy: "optional",
    note: "クレジット表記は任意（不要でもOK）。商用利用・加工OK。注意：素材そのものが主役の商品化（グッズ等でほぼそのまま販売）は別途「商品化ライセンス（有料）」が必要。無料会員はダウンロード数などに制限あり。",
    verified: "2026-07-09"
  },
  {
    id: "pakutaso",
    name: "ぱくたそ",
    label: "ぱくたそ",
    suffix: "",
    url: "https://www.pakutaso.com/",
    ruleUrl: "https://www.pakutaso.com/userpolicy.html",
    policy: "optional",
    note: "クレジット表記は任意。商用利用・加工OK。注意：素材をほぼそのまま販売する商品化はNG。人物写真はモデルの評価を下げる用途・なりすまし等がNG。素材の再配布・直リンクは禁止。",
    verified: "2026-07-09"
  },
  {
    id: "pixabay",
    name: "Pixabay",
    label: "Pixabay",
    suffix: "",
    url: "https://pixabay.com/",
    ruleUrl: "https://pixabay.com/service/license-summary/",
    policy: "none",
    note: "クレジット表記は不要。商用利用・加工OK。注意：素材そのものの再配布・他ストックサイトでの販売・ポスター等の物理商品化はNG。識別できる人物・商標・ロゴが写る素材は別途権利確認が必要。",
    verified: "2026-07-09"
  },
  {
    id: "pocketse",
    name: "ポケットサウンド",
    label: "ポケットサウンド",
    suffix: "",
    url: "https://pocket-se.info/",
    ruleUrl: "https://pocket-se.info/rules/",
    policy: "required",
    note: "表記必須。表記できない場合は有償プラン／月額プランが必要。注意：プラットフォーム別に指定形式あり（YouTube例「効果音：ポケットサウンド - @pocketse」／Webサイトはポケットサウンドへのリンク）。素材への直リンク・二次配布は禁止。",
    verified: "2026-07-09"
  },
  {
    id: "musmus",
    name: "MusMus",
    label: "MusMus",
    suffix: "",
    url: "https://musmus.main.jp/",
    ruleUrl: "https://musmus.main.jp/info.html",
    policy: "required",
    note: "表記必須（例：音楽：MusMus）。商用利用・加工OK。注意：YouTubeのContent ID登録は禁止。二次配布・著作権管理団体への登録・楽曲の視聴が主目的のコンテンツは禁止。",
    verified: "2026-07-09"
  },
  {
    id: "musicisvfr",
    name: "Music is VFR",
    label: "Music is VFR",
    suffix: "",
    url: "https://musicisvfr.com/",
    ruleUrl: "https://musicisvfr.com/",
    policy: "required",
    note: "表記必須（「Music is VFR」の表記）。商用利用・加工OK。有料契約（2,000円）で表記を不要にできる。注意：性的・暴力的なコンテンツへの使用は禁止。",
    verified: "2026-07-09"
  },
  {
    id: "bgmer",
    name: "BGMer",
    label: "BGMer",
    suffix: "",
    url: "https://bgmer.net/",
    ruleUrl: "https://bgmer.net/terms",
    policy: "none",
    note: "クレジット表記は不要（推奨。例：音楽：BGMer）。商用利用・加工・アレンジOK。注意：YouTubeのContent ID登録は禁止。自作と偽る行為・無許可販売・著作権管理団体への無断登録は禁止。",
    verified: "2026-07-09"
  },
  {
    id: "hurtrecord",
    name: "HURT RECORD",
    label: "HURT RECORD",
    suffix: "",
    url: "https://www.hurtrecord.com/",
    ruleUrl: "https://www.hurtrecord.com/about/terms.html",
    policy: "optional",
    note: "クレジット表記は任意（推奨。例：HURT RECORD）。加工OK。注意：商用利用は事前にサイトへ申請しメールでの承認が必要（利用者名・配信媒体・使用曲などを連絡）。用途によっては表記が必須になる。",
    verified: "2026-07-09"
  },
  {
    id: "kurage",
    name: "くらげ工匠",
    label: "くらげ工匠",
    suffix: "",
    url: "http://www.kurage-kosho.info/",
    ruleUrl: "http://www.kurage-kosho.info/guide.html",
    policy: "optional",
    note: "クレジット表記は任意（歓迎。例：フリー効果音素材 くらげ工匠）。商用利用・加工OK。注意：効果音素材そのもので利益を得る行為（素材の再配布・販売）は禁止。",
    verified: "2026-07-09"
  },
  {
    id: "coverr",
    name: "Coverr",
    label: "Coverr",
    suffix: "",
    url: "https://coverr.co/",
    ruleUrl: "https://coverr.co/license",
    policy: "required",
    note: "表記必須（無料利用時。制作者またはCoverr.coへの帰属表示。例：Video by Coverr.co）。有料のCoverr+なら表記不要。商用利用・加工OK。注意：素材の転売・再配布・AI学習データとしての利用は禁止。映像内のブランド／商標は別途権利確認が必要。",
    verified: "2026-07-09"
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
