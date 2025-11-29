# ①課題名

**CSS Atelier（CSSスニペット管理アプリ）**

---

# ②課題内容（どんな作品か）

* CSSスニペットを保存・検索・タグ管理できる **LocalStorage Webアプリ**
* 左：スニペット一覧＋検索＋タグフィルタ
  中央：リアルタイムプレビュー（Light / Dark切替）
  右：エディタ（名前・CSSプロパティ入力）
* LocalStorage により **保存・更新・削除・タグ紐付け** をすべてブラウザ内で完結
* “プロパティのみ入力 → プレビューへ即適用” の **高速デザイン試作ツール**

さらに本アプリは、
**UIデザインを“視覚で確かめながら集めていける”CSSスニペットのスクラップブック**
となるよう設計。小さなスタイルの断片を試し、即座に見た目で評価し、そのままストックできる構造を重視した。

ソース：
HTML（UI構造）
JS（状態管理・タグ管理・LocalStorage制御）
CSS（レイアウト・UI・レスポンシブ）

---

# ③アプリのデプロイURL

https://chiyuria.github.io/gs-css-atelier-submit-04/

---

# ④アプリにログイン情報がある場合

なし

---

# ⑤こだわった点

* **タグ管理のUX特化：名前検索とタグフィルタをAND条件で組み合わせられる検索体験を設計**
  キーワード検索と複数タグ選択を同時に処理し、
  「求めているスニペットが素早く見つかる」検索UXを実現。
  タグとスニペットの紐付けはLocalStorageで持ち、タグ削除時には全スニペット側も自動更新して整合性を維持。

* **タグバッジのワンタップで即タグ付与できる直感的UI**
  コード入力中でも、エディタ右側のタグバッジをクリックするだけで即タグ付与／解除。
  **分類 → 保存 → 検索** までのループが止まらず回る“軽量タグシステム”を追求。

* **名前とプロパティを分離し、プロパティのみ即プレビュー可能な設計**
  CSSプロパティだけを扱うことで、
  *「このスタイル、どんな見た目だっけ？」* を一瞬で視覚確認できる。
  まさに **UIデザインのスクラップブック** として使える仕組みにした。

* **3カラム＋モバイル最適化のレイアウトにこだわった**
  PCでは
  **左：検索 & フィルタ / 中央：プレビュー / 右：エディタ**
  が同時表示され、UI試作時の作業効率を最大化。
  モバイルでは
  **プレビュー → エディタ → リスト**
  の順に並べ替え、縦スクロールでも扱いやすくした。
  viewport・高さ制御・scroll調整まで徹底して崩れにくいレイアウトを構築。

* **配色・シャドウ・透過を統一し“プロダクトの世界観”を作り込んだ**
  Interフォント、ダークUI、紫系アクセント、ガラス系のエフェクトを組み合わせ、
  ボタン・タグ・カードのブラーと影の強弱まで丁寧に調整。
  「学習用UI」ではなく、**実際に使えるデザイン試作ツール** として成り立つ質感に寄せた。

---

# ⑥ 難しかった点・次回トライしたいこと

* **スニペット削除時の影響範囲の整理**
  タグリストとスニペットがLocalStorageで別管理のため、
  タグ削除→スニペット側のtags更新→一覧描画→エディタ描画…と、
  **双方向同期の理解と処理順序** が難しかった。

* **refresh系関数の描画タイミングの把握**
  `refreshSnippetList()` が
  *検索キーワード → タグ → LocalStorage走査*
  を一度に扱うため、どのイベントで再描画されるか掴むまで混乱した。

* **配列操作と JSON.parse / stringify の理解不足**
  LocalStorageが文字列しか扱わないため、
  *読み込み → オブジェクト化 → 編集 → 文字列化 → 保存*
  の流れを理解するのに時間が必要だった。

* **AND検索（タグ＋名前）のロジック構築**
  小さな条件を積み上げてAND判定を成立させる部分で試行錯誤が多かった。

* **レスポンシブ時の高さ・余白・overflow調整**
  カラム変換後に崩れないよう、
  *min-width* やスクロール領域を何度も微調整した。

---

# ⑦ フリー項目

* 今回は最初に **PowerPointでワイヤーフレームを作成**し、画面構成とUIの動線を視覚化してから実装に入った。
  この事前設計で、HTML構造がブレず安定した。

* ワイヤーをそのまま **HTMLで“色付きブロックのパズル”として仮レイアウト** したことで、
  「どの要素がどの役割を持つのか」が立体的に理解できた。

* レイアウトが固まった後に **JSの機能を順番に流し込む進め方が自分に合っていた**。
  UIの土台がしっかりしていた分、ロジックに集中でき、動作の意図も整理しやすかった。

---

# 🎨 **CSS Atelier – README**

---

# 📝 概要（Overview）

**CSS Atelier** は、CSSスニペットを保存・検索・タグ管理し、即プレビューできる軽量Webアプリです。

単なるCRUDツールではなく、
**「UIデザインを視覚で確かめながら、小さなCSSフラグメントを集めていく“ビジュアル・スクラップブック”」**
として設計されています。

これは実務で頻出する、

*「再利用したいCSSをストックして、あとで取り出し、見た目を確かめながら使う」*

というワークフローを、
**LocalStorageだけで高速に実現** するためのアプローチです。

UIは3カラム構成：

1. **左** ― スニペット一覧、キーワード検索、タグフィルタ
2. **中央** ― プレビュー（Light/Dark切替）
3. **右** ― エディタ（名前・プロパティ入力・タグ付与）

スニペットはすべてLocalStorageに保存され、
**作成・更新・削除・タグ付け・タグ削除** がすべてクライアント内で完結します。

---

# 🎮 機能一覧（Features）

## ▼ スニペット管理（CRUD）

✔ 新規作成
✔ 上書き保存
✔ 削除（確認ダイアログ付き）
✔ クリップボードへコピー
✔ 選択時に「名前 / プロパティ / タグ」を自動復元

JSでは以下を実装：
`localStorage.setItem`、`removeItem`、選択→エディタへの反映など。

---

## ▼ プレビュー（Design Sandbox）

* スニペットのCSSプロパティを `style` 属性として即適用
* `.canvas-dark` の付け外しで Light/Dark を切替
* Remove で初期状態に戻す

“**視覚で即確認できる**”体験に重点を置き、
デザインのスクラップブックとしての使い心地を強化しています。

---

## ▼ タグ管理

* タグ追加（重複チェックあり）
* AND条件でのタグフィルタ
* バッジクリックでタグ付与／解除
* タグ削除 → 全スニペットから該当タグが自動除去

データ構造：

```
tagList = ["color", "layout"]
snippet = { snippet: "...", tags: ["color"] }
```

UIは2箇所：
左＝フィルタ用、右＝スニペット編集用。

---

## ▼ 検索（キーワード + タグのAND）

* タイトルの部分一致
* タグフィルタとの併用
* すべての条件を満たすスニペットのみ表示

---

## ▼ レスポンシブ対応

Desktop → 3カラム
Mobile →

1. プレビュー
2. エディタ
3. リスト

という順に再構成。
CSS Gridで領域を切り替え最適化しています。

---

# 🎨 UI / デザイン

## ▼ テーマ

* Interフォント
* ダークUI（#0d1117）
* ガラス風の透過・ぼかし
* 控えめなシャドウで“プロダクト感”を演出

全体として、
**「整理されたビジュアル・スクラップブック」**
の世界観に合わせて調整しています。

---

## ▼ レイアウト（Grid）

```
Left   : スニペット一覧 + タグ
Center : プレビュー
Right  : エディタ
```

Desktop：20% – 1fr – 30%
Mobile：1カラム化。

---

## ▼ コンポーネント仕様

### ● スニペットアイテム

タイトル長文を `text-overflow: ellipsis` で整形。

### ● タグバッジ

丸みのあるピル型、active時はグラデーションで状態を可視化。

---

# 🛠 UX / 補助機能

* 未入力時のアラート
* 空スニペットの保存防止
* 削除時の確認
* Apply / Remove のフィードバック
* コピー完了通知

---

# 🔥 実装のキモ（Key Implementation Points）

## 1. LocalStorage設計

スニペット保存形式：

```
key: "glass-card-base"
value: { snippet: "...", tags: [] }
```

タグは別の `tagList` で管理。

---

## 2. タグの双方向同期

タグ削除時に更新される要素：

* tagList
* 各スニペットの tags[]
* フィルタUI
* エディタUI
* スニペット一覧

アプリ全体の整合性を維持するための重要処理。

---

## 3. キーワード + タグのANDロジック

```js
if (keyword !== "" && !title.includes(keyword)) continue;
for (tag of selectedTags) {
  if (!snippetTags.includes(tag)) hit = false;
}
```

---

## 4. テーマ切替

`.canvas-dark` の add/remove により
背景・文字色・ボーダー・影などDark用スタイルを適用。

---

# 🔧 技術スタック（Tech Stack）

HTML5 / CSS3 / jQuery / LocalStorage / clipboard API / Responsive Grid

---

# 🕹 アプリフロー（App Flow）

1. スニペット読み込み
2. 検索・フィルタ
3. スニペット選択
4. Apply
5. 保存
6. タグ管理
7. 削除
8. モバイルでは「プレビュー → エディタ → リスト」の順

---

# 🗂 ディレクトリ構造

```
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── img/
    └── logo.svg
```

---

# ▶ 使い方（How to Run）

1. リポジトリをクローン
2. `index.html` をブラウザで開く
3. インストール不要（LocalStorageのみ使用）

---

# 📘 学習ポイント（Learning）

* LocalStorage を“ミニDB”として扱う発想
* UIコンポーネント間の状態同期
* jQueryイベント操作の理解深化
* Gridベースのレスポンシブ設計
* 実用的なタグ管理ロジック
* 即時プレビューを中心にしたUX設計

---

# 📄 ライセンス

学習目的で制作。
ロゴはAI生成素材を調整して使用。

---

# ✨ Author

Chiyuria

---

# 🎨 **CSS Atelier – README (English Version)**

*(with the “visual scrapbook” concept woven throughout)*

---

# 📝 Overview

**CSS Atelier** is a lightweight web application that lets you save, search, tag, and instantly preview CSS snippets.

More than just a CRUD tool, it is designed as a
**visual scrapbook for UI designers—where you can try out small CSS fragments, see their appearance instantly, and collect them for future use.**

This workflow mirrors a common real-world need:
*“Store reusable pieces of styling, retrieve them later, experiment visually, and apply them quickly.”*

The interface is structured into **three columns**:

1. **Left** — Snippet list, keyword search, tag filters
2. **Center** — Live Preview (Light/Dark theme switch)
3. **Right** — Editor for snippet name, properties, and tag assignment

All snippets are stored in LocalStorage:
**create, update, delete, tagging, and tag removal** are all handled client-side.

---

# 🎮 Features

## ▼ Snippet Management (CRUD)

✔ Create new snippet
✔ Update existing snippet
✔ Delete with confirmation
✔ Copy via clipboard API
✔ Auto-restore name / properties / tags when selected

JavaScript implementation:
`localStorage.setItem`, `removeItem`, selection → editor auto-fill.

---

## ▼ Preview (Design Sandbox)

* Apply snippet properties directly as inline CSS
* Switch Light/Dark using `.canvas-dark`
* Reset styles using Remove

Designed to support **instant visual checking**, reinforcing the “scrapbook” experience.

---

## ▼ Tag Management

* Add tags (duplicate-safe)
* Filter snippets with AND logic
* Assign tags via clickable badges
* Delete tags → auto-remove from all snippets

Data structure:

```
tagList = ["color", "layout"]
snippet = { snippet: "...", tags: ["color"] }
```

Two UIs:
Left = filters, Right = tag assignment.

---

## ▼ Search (Keyword + Tag AND)

* Partial match on snippet titles
* Combined with tag filters
* Only snippets that satisfy **all conditions** appear

---

## ▼ Responsive

Desktop → 3-column
Mobile → reorganized into:

1. Preview
2. Editor
3. List

Optimized with CSS Grid area switching.

---

# 🎨 UI / Design

## ▼ Theme

* Inter font
* Dark UI (#0d1117)
* Glass-style translucency + blur
* Subtle shadows for an elevated “product-like” feel

All tuned to support the concept of a **clean, visual design scrapbook**.

---

## ▼ Layout (Grid)

```
Left   : Snippet List + Tags
Center : Preview
Right  : Editor
```

Desktop: 20% – 1fr – 30%
Mobile: single-column.

---

## ▼ Component Behavior

### Snippet Item

Long titles handled via ellipsis.

### Tag Badge

Pill-style with gradient activation.

---

# 🛠 UX / Helper Features

* Alerts for missing fields
* Prevent saving empty snippets
* Confirmation on delete
* Feedback on Apply / Remove
* Clipboard copy notice

---

# 🔥 Key Implementation Points

## 1. LocalStorage Architecture

Snippets stored as:

```
key: "glass-card-base"
value: { snippet: "...", tags: [] }
```

Tag management handled separately.

---

## 2. Two-Way Tag Synchronization

Tag deletion updates:

* tagList
* each snippet’s tags
* filter UI
* editor UI
* snippet list

Ensures consistency across the app.

---

## 3. Combined Keyword + Tag AND Logic

```js
if (keyword !== "" && !title.includes(keyword)) continue;
for (tag of selectedTags) {
  if (!snippetTags.includes(tag)) hit = false;
}
```

---

## 4. Theme Switching

Dark mode toggled with `.canvas-dark`,
with CSS controlling color, background, border, shadow.

---

# 🔧 Tech Stack

HTML5 / CSS3 / jQuery / LocalStorage / Clipboard API / Responsive Grid

---

# 🕹 App Flow

1. Load snippets
2. Filter
3. Select snippet
4. Apply
5. Save
6. Manage tags
7. Delete when needed
8. Mobile: Preview → Editor → List

---

# 🗂 Directory Structure

```
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── img/
    └── logo.svg
```

---

# ▶ How to Run

Clone → open `index.html` → done.

---

# 📘 Learning Points

* Treating LocalStorage as a mini database
* Understanding state sync between UI components
* Deepening jQuery event handling
* Grid-based responsive design
* Implementing practical tag management
* Building an instant visual preview workflow

---

# 📄 License

Educational use.
Logo includes AI-generated assets.

---

# ✨ Author

Chiyuria

---
