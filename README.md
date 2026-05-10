# これはなに？

演劇集団すいげつ旗揚げ公演の予約Webアプリケーションです

## Tech Stack

### Frontend

- React: UI framework
- TypeScript: Type safety
- Vite: Build tool
- Chakra-ui: UI components
- React Hook Form: Form management
- Zod: Validation
- TanStack Query: API state management

### API

- Google Apps Script

### Shared

- TypeScript
- Zod

### Hosting

- GitHub Pages

## Monorepo Structure

- /frontend ... Web app
- /api ... GAS backend
- /shared ... FE, BE共通で使うオブジェクト定義 / API 定義

## Setup

環境構築は googleドライブ を参照

## Commands

依存ライブラリのインストール

```bash
npm install
```

フロントWebapp ローカル起動
.env.exampleを参考に.env.developmentファイルのモック情報を設定した上で実行

```bash
npm run dev
```

フロントWebapp API Client自動生成
shared配下のAPI定義書からfetcherを自動生成します。生成結果には基本的に手動で触らなくてOK

```bash
npm run gen:api  -w frontend
```

APIの更新をGASへ反映
<br/>
GASへログイン

```bash
clasp login
```

ログイン後にはすいげつアカウントを選択

```bash
npm -w backend run push
```

build結果がbackend/dist配下に生成され、GASへ送られる。<br/>
GASのサイトを開き、デプロイ→デプロイの設定→鉛筆ボタン(編集)→バージョン→新バージョン→デプロイ

## Branch Strategy

main: production
feature/\* : development
