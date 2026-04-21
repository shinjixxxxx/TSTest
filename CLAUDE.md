# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## コマンド

```bash
npm run dev       # 開発サーバー起動（HMR有効）
npm run build     # TypeScript型チェック + Viteビルド
npm run lint      # ESLintによる静的解析
npm run preview   # ビルド成果物のプレビュー
```

テストフレームワークは現時点では未設定。

## アーキテクチャ概要

React 19 + TypeScript + Vite 構成のシングルページアプリケーション。

- **エントリポイント**: `index.html` → `src/main.tsx`（ReactのStrictModeでAppをマウント）
- **ルートコンポーネント**: `src/App.tsx`（現状はカウンターデモのみ）
- **スタイル**: `src/index.css`（グローバル変数・ベーススタイル）、`src/App.css`（コンポーネント固有、CSS Nesting使用）
- **`src/classTest/`**: 現在は空ディレクトリ

### TypeScript設定

`tsconfig.app.json` で `noUnusedLocals`・`noUnusedParameters`・`erasableSyntaxOnly` が有効。未使用変数・パラメータはビルドエラーになる。

### ESLint設定

型チェック連携のルールは現在無効（`eslint.config.js` はデフォルト構成）。本番向けには `README.md` 記載の `recommendedTypeChecked` への移行を検討すること。
