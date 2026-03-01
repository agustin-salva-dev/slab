<div align="center">
    <img src="public/logo.webp" alt="Slab Logo" width="48" align="middle" style="margin-right: 8px;" />
    <img src="public/text-logo.webp" alt="Slab Text" width="70" align="middle" />
  <br />
  <br />
  <p><em>A blazingly fast, modern, and open-source URL shortener built with Performance and UX at its core.</em></p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-V4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
</div>

<br/>

<div align="center">
  <strong>
    <a href="#-user-interface--design-system">Dashboard</a> &nbsp;•&nbsp; 
    <a href="#️-the-slab-journey-from-concept-to-reality">Roadmap</a> &nbsp;•&nbsp; 
    <a href="#-getting-started">Contribute</a> &nbsp;•&nbsp; 
    <a href="https://github.com/agustin-salva-dev/slab/issues/new" target="_blank">Create Issue</a> &nbsp;•&nbsp; 
    <a href="https://x.com/agvsdev" target="_blank">X/Twitter</a>
  </strong>
</div>

<br/>

<div align="center">
  <kbd>
    <img src=".github/assets/home-full-links.png" alt="Slab Dashboard MVP" width="1000" />
  </kbd>

  <br/><br/>

  > *Slab's UI only use a dark-mode , high-contrast aesthetic with premium micro-interactions. Designed entirely in Figma before writing a single line of code.*

  <br/>

  <kbd>
    <img src=".github/assets/home-desktop.png" alt="Slab Landing Page" width="380" />
  </kbd>
  &nbsp;
  <kbd>
    <img src=".github/assets/login-desktop.png" alt="Slab Secure Auth" width="380" />
  </kbd>
</div>

<br />
<br />
<br />

> *Slab is more than just a link shortener; it is a meticulously crafted application demonstrating modern architecture, defensive user experience, and enterprise-grade performance patterns.*


## 🛠️ Tech Stack

- <img src="https://cdn.simpleicons.org/nextdotjs/white" width="16" align="center" /> **Framework:** Next.js 15 *(App Router)*

- <img src="https://cdn.simpleicons.org/typescript/3178C6" width="16" align="center" /> **Language:** TypeScript

- <img src="https://cdn.simpleicons.org/auth0/EB5424" width="16" align="center" /> **Auth:** Better-Auth

- <img src="https://cdn.simpleicons.org/postgresql/4169E1" width="16" align="center" /> **Database:** PostgreSQL & <img src="https://cdn.simpleicons.org/prisma/2D3748" width="16" align="middle" /> Prisma ORM

- <img src="https://cdn.simpleicons.org/zod/3E67B1" width="16" align="center" /> **Validation:** Zod

- <img src="https://cdn.simpleicons.org/nodedotjs/339933" width="16" align="center" /> **Background Jobs:** Inngest

- <img src="https://cdn.simpleicons.org/google/4285F4" width="16" align="center" /> **Security:** Google Safe Browsing API *(Malware & Phishing protection)*

- <img src="https://cdn.simpleicons.org/figma/F24E1E" width="16" align="center" /> **Design System:** Figma, [Quadratic UI](https://www.quadratic-ui.com/) *(Powered by Shadcn & Radix)*

- <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" width="16" align="center" /> **Styling:** Tailwind CSS v4

- <img src="https://cdn.simpleicons.org/lucide/FF6475" width="16" align="center" /> **Icons & Assets:** Lucide React, SVGL

  <br />

## 🧠 Engineering & Architecture Decisions

*Slab represents a leap from traditional MERN architectures to a unified Next.js stack, optimized for DX and raw speed.*

- 🚀 **Next.js & TypeScript:** Unified stack. End-to-end type safety, blazing-fast SSR, and secure Server Actions.

- 🗄️ **Prisma ORM:**  Replaced raw SQL for better scalability. Strict DB-to-client typing and effortless schema migrations.

- ⚡ **Inngest (Background Jobs):** 0ms redirect latency. Analytics are queued asynchronously at the Edge, never blocking the user.

- 🎛️ **Optimistic UI:** SWR-powered instant mutations. Zero loading spinners, fluid experience.

  <br />

## 🛣️ The Slab Journey: From Concept to Reality.

*Building Slab is an ongoing process of prioritizing performance and user experience. Here is the step-by-step evolution of the platform:*

**📍 Phase 1: Foundation & Design**
> *Establishing the brand identity and the technical roots.*
- 🎨 **UI/UX System:** Designed the logo and Figma prototypes prioritizing interaction states.
  
- 🏗️ **Architecture:** Evaluated and selected a modern, highly scalable stack (Next.js 15, Prisma, Inngest).

<br />

**📍 Phase 2: Core Layout & Secure Access**
> *Structuring the application and securing the doors.*
- 🌐 **Global Layout:** Scaffolded the App Router, landing page, and dynamic CSS-variable themes.
  
- 🔐 **Better-Auth Integration:** Rolled out a premium, secure login flow supporting OAuth (GitHub/Google).

<br />

**📍 Phase 3: The Link Engine**
> *The heart of Slab: making URL shortening instantaneous.*
- ⚡ **Optimistic Link Generation:** 0ms perceived latency for creating and managing links via `SWR`.
  
- 📊 **Data Capture:** Built the background tracking system to capture geolocation, device, and browser data on every click.
  
<br />

**📍 Phase 4: Scalability & Settings**
> *Giving users absolute and secure control over their data.*
- ⚙️ **Dashboard Hub:** Implemented persistent root layouts for seamless client-side routing.
  
- 🛡️ **Defensive Management:** Built strict Server Actions for profile updates, data exports, and multi-step account deletion.

---

### 🔮 What's Next? (Upcoming Features)
*Slab is constantly evolving. Here is what is on the immediate horizon:*

- 🔎 **Global Search Bar:** Instant search capabilities to easily find any generated link within the dashboard.
  
- 🏷️ **Smart Filters:** New UI controls to organize, sort, and filter links by status, creation date, and clicks.
  
- 📈 **Analytics Dashboard:** A dedicated, visual data-hub with charts and insights to analyze link performance and audience demographics.

<br />

## 🚀 Getting Started

### Prerequisites
*Before you begin, ensure you have the following installed on your machine:*

- <img src="https://cdn.simpleicons.org/nodedotjs/339933" width="14" align="middle" /> **[Node.js](https://nodejs.org/)** *(v20 or higher)*
  
- <img src="https://cdn.simpleicons.org/pnpm/F69220" width="14" align="middle" /> **[pnpm](https://pnpm.io/)** *(v9+)* - Essential for matching our lockfile and fast dependency installation.
  
- <img src="https://cdn.simpleicons.org/git/F05032" width="14" align="middle" /> **Git** installed on your machine.
  
- 🗄️ **PostgreSQL Database:** You need a connection string. You can run one locally (e.g., via Docker) or use a free cloud provider like [Neon](https://neon.tech/) or [Supabase](https://supabase.com/).
  
- 🔑 **OAuth Applications (For Login):** To enable authentication, you must create OAuth Apps in:
  - **GitHub Developer Settings:** To get your Client ID and Secret.
  - **Google Cloud Console:** To get your Google Client ID and Secret.


### 1. Clone the repository
```bash
git clone https://github.com/agustin-salva-dev/slab.git
cd slab
```
### 2. Install dependencies
```bash
pnpm install
```
### 3. Setup Environment Variables
*Create a .env file in the root directory based on original Slab .env.*
```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/slab"

# Authentication (Better-Auth)
BETTER_AUTH_SECRET="your-generated-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# Social Providers (Required for login features)
GITHUB_CLIENT_ID="your-github-id"
GITHUB_CLIENT_SECRET="your-github-secret"
GOOGLE_CLIENT_ID="your-google-id"
GOOGLE_CLIENT_SECRET="your-google-secret"
```

> 💡 *Tip: You can generate a random BETTER_AUTH_SECRET by running openssl rand -base64 32 in your terminal.*

### 4. Setup the Database
*Sync your Prisma schema with your PostgreSQL database:*
```bash
npx prisma generate
npx prisma db push
```

### 5. Run the Development Servers
*Because Slab relies heavily on background jobs, you will need two terminals running simultaneously (one for the Next.js frontend, one for the Inngest local dev server):*

#### Terminal 1 (Next.js App):
```bash
pnpm dev
```
#### Terminal 2 (Inngest Dev Server):
```bash
npx inngest-cli@latest dev
```

> *Visit http://localhost:3000 to see the application. The Inngest dashboard will be available at http://localhost:8288 to monitor your background events.*

<br />

## 📂 Project Structure

*Slab follows a feature-centric structure to maintain scalability. Instead of grouping files by type, we group them by domain features.*

```text
src/
├── app/               # Next.js App Router (Pages & Layouts)
├── components/        # UI Components separated by feature
│   ├── auth/          # Login, Modals, Providers
│   ├── icons/         # SVGL brand icons (e.g., BrandIcons.tsx)
│   ├── layout/        # Navbar, Footer, Drawers
│   ├── settings/      # Account, General, Security settings views
│   └── ui/            # Reusable atomic UI (Buttons, Inputs, Dialogs)
├── config/            # Site constants and configurations
├── inngest/           # Background workflow definitions
├── lib/               # 3rd party initializations (better-auth client)
├── server/            # Server-side logic
│   ├── actions/       # React Server Actions (Data mutations)
│   └── auth/          # Better-auth server configuration
└── utils/             # Helper functions (OS parsing, parsers)
```

<br />

## 🤝 Contributing Guidelines

*We welcome contributions! To maintain the high quality and performance of this codebase, PRs must adhere to these project-specific rules:*

### 1. Architecture & Feature-Based Structure
- **Respect the Folder Structure:** Components must be placed inside their respective feature folder in `src/components/`. If adding a new brand logo, it must go into `src/components/icons/BrandIcons.tsx` using SVGL format.
- **Server Actions for Mutations:** NEVER mutate sensitive data directly from the client. Always create a Server Action in `src/server/actions/`.

### 2. Design System & Styling (Strict)
- **Quadratic UI Ecosystem:** Our UI is designed in Figma and strictly implemented using [Quadratic UI](https://www.quadratic-ui.com/docs/getting-started/guides/quickstart) (built on top of Shadcn & Radix). Before adding or modifying components, please read their documentation to ensure standard adherence.
- **Custom Color Variables:** Any new global color added to Tailwind must be prefixed with `my-` (e.g., `my-background`, `my-secondary`). If the color is meant for highlights or alerts (like Red or Yellow), it MUST be prefixed with `my-accents-` (e.g., `my-accents-red`).

### 3. Database & Background Tasks
- **Prisma `$transaction`:** If an action involves multiple tables (e.g., registering a click AND updating a link count), wrap them in a transaction to prevent data corruption.
- **Inngest for Heavy Lifting:** Any non-critical path task (emails, analytics, data exports) MUST be offloaded to an Inngest function inside `src/inngest/`.

### 4. Commit Convention
*We follow [Conventional Commits](https://www.conventionalcommits.org/). Messages must be descriptive.*
> Example: `feat(settings): add server action for account deletion`

<br />

## 📝 License

*This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.*

---
> *Inspired by [Slug](https://github.com/pheralb/slug). Built for speed and scale by [Agvstindev](https://x.com/agvsdev).*

