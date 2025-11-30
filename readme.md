# 🚀 **① 課題提出フォーマット）**

**CSS Atelier（CSSスニペット管理アプリ）**

---

## **① 課題名**

**CSS Atelier（CSSスニペット管理アプリ）**

---

## **② 課題内容（作品概要）**

本アプリは、
**CSSスニペットの保存・検索・タグ管理・即時プレビューを1つにまとめた LocalStorage 完全完結型のWebアプリ** です。

UIは **3カラム（List / Preview / Editor）構成** とし、CSSを視覚的にストックする
**“ビジュアルCSSスクラップブック”** をコンセプトに設計しました。

特徴：

* CSSプロパティだけを入力すれば即プレビューに反映
* タグの追加・削除・紐付けを LocalStorage 上で双方向同期
* キーワード検索 × タグフィルタのAND検索
* 削除や通知はすべて **カスタムPromiseモーダル（mkOk / mkConfirm）** に統一
* モバイルでは “プレビュー → エディタ → リスト” に並び替えて最適化

利用技術：

* HTML（UIレイアウト）
* CSS（デザイン・レスポンシブ）
* jQuery（イベント・状態管理）
* LocalStorage（データ保存）
* Clipboard API
* Promiseベースのカスタムモーダル（mkOk / mkConfirm）

---

## **③ デプロイURL**

[https://chiyuria.github.io/gs-css-atelier-submit-04/](https://chiyuria.github.io/gs-css-atelier-submit-04/)

---

## **④ ログイン情報**

なし

---

## **⑤ こだわった点**

### **① タグ検索UXの強化（ANDロジック × キーワード検索）**

複数タグ選択＋名前検索を同時に行えるUIを設計し、
目的のスニペットに高速でアクセスできる検索体験を重視した。

タグ削除時は
**① tagList → ② 各snippet → ③ 全UI**
の順で同期し、データ整合性を維持。

---

### **② プロパティだけで即プレビューできる構造**

スニペット名とCSSプロパティを分離し、
プロパティを `style=""` に直挿しする形式を採用。

CSSの “見た目確認” が圧倒的に速いデザイン試作環境にした。

---

### **③ 3カラムレイアウトの最適化**

* PC：左（検索）中央（プレビュー）右（エディタ）
* モバイル：プレビュー → エディタ → リスト の順へ再構成

Grid・高さ制御・レイアウト崩れ対策を徹底し、実際に使えるUIに寄せた。

---

### **④ 世界観を統一したダークUIデザイン**

* Interフォント
* 透明感 × ブラー × 紫アクセント
* シャドウの強弱調整
* 統一されたタグ／ボタンデザイン

「学習アプリ感」を排除し、**実務でそのまま使える質感** に寄せた。

---

### **⑤ 完全カスタムモーダル（Promiseベース）**

標準 alert / confirm を排除し、以下を独自実装：

* `mkOk(message)`（OKのみ）
* `mkConfirm(message)`（OK/Cancel → true/false）

どの操作でも一定したUXで扱えるように統一。
汎用的に別のアプリでも使いまわせるよう切り分けて管理。

---

## **⑥ 難しかった点・次回トライしたいこと**

* タグ削除 → 全Snippet → UI反映の**同期処理の順序整理**
* LocalStorage特有の
  **“文字列 ⇄ JSON” の変換** の理解
* AND検索ロジックの構築
* レスポンシブ時の
  **min-width / overflow / height** の3軸調整
* グリッドレイアウトの崩れを防ぐための
  **item-title の幅制御**

---

## **⑦ フリー項目**

* 初めに **PowerPointでワイヤーフレームを作成**し、UI構造を可視化してから実装。
* カラーボックスで仮レイアウト → HTML骨格化 → JS機能追加 の順に進め、
  **UIの揺れを最小限にした実装フロー** が非常に有効だった。
* 今後はプリセットスニペットの追加や、JSONエクスポート／インポートなどの
  **実用化に向けた機能拡張** を検討したい。

---

---

# 📘 **② README（日本語版）**

---

# 🎨 CSS Atelier – README

## 📝 概要

**CSS Atelier** は、CSSスニペットを保存・検索・タグ管理し、即プレビューできる
**クリエイター向けの軽量Webアプリ** です。

特徴：

* 小さなCSSの断片をどんどん集められる
* プレビューで “一瞬で見た目を確認”
* タグで整理し、後から取り出しやすい
* UIデザイン用の **“CSSビジュアルスクラップブック”**

全データは LocalStorage に保存され、
ログイン不要・インストール不要で利用できます。

---

## 🎮 機能一覧

### ✔ スニペット管理（CRUD）

* 新規作成
* 上書き保存
* 削除（mkConfirm）
* コピー（Clipboard API）
* 選択時の自動復元
* 空入力の保存防止（mkOk）

---

### ✔ プレビュー

* 入力したCSSプロパティを即適用
* Dark/Lightテーマ切替
* Removeで初期化
* デザインスケッチに最適な“即時反映方式”

---

### ✔ タグ管理

* タグ追加（重複チェック）
* バッジクリックで付与/解除
* ANDフィルタで検索性UP
* タグ削除時は全データを自動同期

---

### ✔ 検索

* 名前の部分一致
* タグのAND組み合わせ
* 小規模DBのように高速フィルタリング

---

### ✔ カスタムモーダル（mkOk / mkConfirm）

### （Promiseで処理をブロックしない通知UX）

```js
await mkOk("Saved!");
const ok = await mkConfirm("Delete?");
```

---

## 🎨 UIデザイン

* ダークUI
* ガラス系エフェクト
* 紫系アクセント
* Interフォント
* 3カラム〜モバイル対応のGrid構成

シンプルだが**プロダクト品質の質感**に寄せた。

---

## 🔧 技術

* HTML5
* CSS3（Grid, Responsive, Blur, Shadow）
* jQuery
* LocalStorage
* Clipboard API
* Promiseによるモーダル制御

---

## 🗂 ディレクトリ構造

```
.
├── index.html
├── css/
│   ├── style.css
│   └── modal.css
├── js/
│   ├── main.js
│   └── modal.js
└── img/
    └── logo.svg
```

---

## ▶ 使い方

1. ダウンロードまたはClone
2. `index.html`を開くだけで利用可能（LocalStorageを使用）

---

## 📘 学びポイント

* LocalStorageをミニDBとして扱う発想
* UIコンポーネント間の状態同期
* jQueryでのイベント制御
* Gridレイアウトとレスポンシブ
* AND検索ロジック
* Promiseモーダルの実装

---

## ✨ Author

Chiyuria

---

---

# 📗 **③ README（English Version）**

---

# 🎨 CSS Atelier – README (English)

## 📝 Overview

**CSS Atelier** is a lightweight web application that allows you to save, search, tag, and instantly preview reusable CSS snippets.

Designed as a
**“visual scrapbook for UI designers,”**
it helps you collect small fragments of CSS and immediately check how they look.

All data is stored in **LocalStorage**, so no login or backend is required.

---

## 🎮 Features

### ✔ Snippet Management

* Create / Update / Delete
* Confirmation with custom modal (mkConfirm)
* Copy to clipboard
* Auto-restore when selected
* Prevent empty save (mkOk)

---

### ✔ Live Preview

* CSS properties applied directly to inline style
* Light/Dark theme
* Reset with one click
* Instant visual feedback for design exploration

---

### ✔ Tag Management

* Add tags
* Assign or unassign with click
* AND filtering for high-precision search
* Automatic synchronization on tag deletion

---

### ✔ Search

* Partial keyword match
* Combined with tag filters
* Only snippets matching all conditions are displayed

---

## ✔ Custom Modal System (mkOk / mkConfirm)

Promise-based UI replacing native alerts.

```js
await mkOk("Saved!");
const ok = await mkConfirm("Delete?");
```

---

## 🎨 UI / Design

* Dark UI
* Glassy blur
* Purple accent
* Inter font
* 3-column grid + mobile layout reflow

A simple yet practical and polished tool.

---

## 🔧 Tech Stack

* HTML5
* CSS3 (Grid, Responsive, Blur)
* jQuery
* LocalStorage
* Clipboard API
* Promise-based modal dialog system

---

## 🗂 Directory Structure

```
.
├── index.html
├── css/
│   ├── style.css
│   └── modal.css
├── js/
│   ├── main.js
│   └── modal.js
└── img/
    └── logo.svg
```

---

## ▶ How to Use

1. Clone the repository
2. Open `index.html`
3. Everything works instantly (LocalStorage only)

---

## 📘 Learning Points

* Treating LocalStorage as a mini database
* Designing synchronized UI states
* jQuery event workflow
* Grid-based responsive design
* Tagging logic
* Promise-driven UX with custom modals

---

## ✨ Author

Chiyuria

---