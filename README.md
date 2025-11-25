# Next.js 16.0.1 + Storyblok Production Starter

This repository includes a **fully setup production-ready Next.js application** with the following integrations and configurations:

- ✅ **Storyblok** setup with multiple environments
- ✅ **Biome** configuration (Make sure to install Biome extension from vscode extension marketplace)
- ✅ **SonarQube** setup
- ✅ **Git pre-hooks** (via git hooks)
- ✅ **Multi-environment setup** (dev, stage, prod)
- ✅ **Production-grade structure**
- ✅ **Google Tag Manager,Google Consent Mode,Usercentric Cookiebot CMP**
- ✅ **Some Usefull Apps from storyblok that helps to improve workflow**
- ✅ **Sitemap**
- ✅ **Robot.tsx**

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <your-repo-name>
```

### 2.Install dependencies

```bash
pnpm install
```

### 3.Setup Git hooks

```bash
sh scripts/setup-hooks.sh

```

### 4.Setup Storyblok

Go to the package.json file and replace YOUR*SPACE_ID_WITHOUT*# with your SB space id. Also add STORYBLOK_ACCESS_TOKEN (access level: preview) in environment files. You can get the token from Storyblok space settings -> Access token.

## DO this Step each time you update storyblok schema to get the latest types and suggestions. Now run

```bash
storyblok login
pnpm pull-sb-components
pnpm generate-sb-types
```

To get the visual editing, go to the space settings -> visul editing and paste

```bash
https://localhost:3000/api/draft?slug=
```

change or add domain as your need.

### 5. Run the development server

Create a copy of .env.dev and name as .env.local.

```bash
pnpm dev
or
pnpm dev-https
```

### 5. Usefull functions

You will find some usefull function on utils.ts. and lib folder.

### 6. Google Tag Manager,Google Consent Mode,Usercentric Cookiebot CMP

Google Tag Manager,Google Consent Mode,Usercentric Cookiebot CMP all of them are integrated and commented out on src/app/[lang]/layout.tsx file.Uncomment based on your need.

### 7. Some Usefull Apps from storyblok that helps to improve workflow

Go to the Apps from your space sidebar.Then find them and click on install.
Apps :
Trash Bin,
Colorpicker,
Replace Asset,
Task Manager,
SEO

### 8. Sitemap,Robot.tsx

Head over to the sitemap and robot.txt file and change based on your project need.

# Use <storyblok.rns@selisegroup.com> account to get the initial schema template and create a new one from the existing Starter Template
