<!-- GSD:project-start source:PROJECT.md -->
## Project

**企业资料中台 / 食品行业 B 端系统**

这是一个基于现有代码继续演进的 brownfield 项目，不是从零开始的新系统。项目面向食品行业，目标是建设企业资料中台 / B 端系统，统一管理商品资料、素材、报价、客户询价、运费模板和 AI 文案辅助，并支持多渠道资料链接分发与企微协同；当前重点是继续推进 `apps/server` 的 NestJS + Prisma 改造成果，优先跑通后端主流程并为前后端对接做好准备。

**Core Value:** 先基于现有代码把“商品资料 → 素材/运费 → 客户询价 → 报价”主流程在真实数据库环境下稳定跑通，形成可验证、可对接的后端业务闭环。

### Constraints

- **Tech stack**: 后端继续采用 NestJS + Prisma —— 这是当前已有改造成果和后续演进基础
- **Brownfield**: 必须以已有项目继续演进为前提 —— 不从零设计、不推倒重做架构
- **Priority**: 近期交付以后端优先 —— 先完成核心 API、数据库联通和业务闭环，再推动前后端联调
- **Domain**: 食品行业字段优先 —— 保质期、批次、储存条件、合规资料必须优先纳入主链路设计
- **Delivery strategy**: 先跑通主流程，避免过度设计 —— roadmap 需要阶段明确、可执行、可验证
- **Frontend direction**: 后台前端倾向基于 Daymychen/art-design-pro 二开 —— 但当前阶段以接口与契约准备为主
- **WeCom scope**: 本阶段企微协同只做预留或基础接入位 —— 避免过早进入高复杂度整合
- **AI scope**: AI 文案辅助当前优先模板与记录闭环 —— 真实模型深度接入可后置
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Monorepo and package management
- pnpm workspace monorepo (`package.json`, `pnpm-workspace.yaml`).
- Workspace packages are split under `apps/*` and `packages/*`.
- Root scripts orchestrate parallel app development and recursive build/lint/typecheck (`package.json:8`).
## Languages and runtimes
- TypeScript across server, admin, portal, and shared package (`tsconfig.base.json:1`).
- Node.js >= 22 and pnpm >= 10 required (`package.json:4`).
- ESM-style setup is used in frontend/shared packages via `"type": "module"` (`apps/admin/package.json:4`, `apps/portal/package.json:4`, `packages/shared/package.json:4`).
## Applications
### Backend API
- NestJS backend in `apps/server`.
- Core packages: `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express` (`apps/server/package.json:15`).
- Dev runtime uses `tsx watch`; production runs compiled JS from `dist/` (`apps/server/package.json:5`).
### Admin frontend
- Vue 3 + Vue Router + Vite app in `apps/admin` (`apps/admin/package.json:11`).
- Type checking via `vue-tsc`; bundling via Vite (`apps/admin/package.json:7`).
- Current layout is a placeholder admin shell intended to connect with art-design-pro direction (`apps/admin/src/layouts/AdminLayout.vue:20`).
### Portal frontend
- Nuxt 4 app in `apps/portal` (`apps/portal/package.json:12`).
- Uses Vue 3 under Nuxt and a custom `app/` source directory (`apps/portal/nuxt.config.ts:1`).
- Runtime config currently exposes public site name only (`apps/portal/nuxt.config.ts:4`).
### Shared package
- `packages/shared` exports TypeScript constants/types shared across apps (`packages/shared/src/index.ts:1`).
## Data and persistence
- Prisma ORM is used on the backend (`apps/server/package.json:18`, `apps/server/src/common/prisma.ts:1`).
- Database provider is MySQL via `DATABASE_URL` (`apps/server/prisma/schema.prisma:4`).
- Prisma schema models core business data: users, customers, products, assets, channel links, inquiries, quotations, shipping, AI prompts/records/rules (`apps/server/prisma/schema.prisma:103`).
## Build and type systems
- Root TS config uses strict mode, ES2022 target, bundler module resolution, and path aliasing for `@qiye/shared` (`tsconfig.base.json:1`).
- Backend builds with `tsc`; frontend builds with Vite/Nuxt; shared package validates with `tsc --noEmit`.
## Styling
- Portal includes a global stylesheet at `app/assets/main.css` (`apps/portal/nuxt.config.ts:3`).
- No CSS framework dependency is currently declared in package manifests.
- PRD references Tailwind and Element Plus as intended direction, but they are not present in the current codebase (`PRD.md:12`).
## Generated artifacts present in repo
- Backend compiled output under `apps/server/dist/`.
- Admin built output under `apps/admin/dist/`.
- Nuxt generated artifacts under `apps/portal/.nuxt/`.
- `node_modules/` is checked into the working tree for at least some apps.
## Tooling status
- Lint scripts are placeholders that print "not configured yet" in all workspace packages (`apps/server/package.json:8`, `apps/admin/package.json:8`, `apps/portal/package.json:8`, `packages/shared/package.json:12`).
- Typecheck scripts exist for all packages.
- No dedicated test framework is declared in current package manifests.
## Deployment and infrastructure signals
- No Dockerfile, CI config, or deployment manifests were identified in the files reviewed.
- Backend starts as a standalone Node/Nest service listening on `SERVER_PORT` defaulting to 3000 (`apps/server/src/main.ts:4`).
- Admin and portal default to separate local ports 3100 and 3200 (`apps/admin/package.json:6`, `apps/portal/package.json:6`).
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Language and typing
- TypeScript is the default across the monorepo.
- Root TS config enables `strict` mode (`tsconfig.base.json:8`).
- Shared alias `@qiye/shared` is the standardized import path for shared primitives (`tsconfig.base.json:11`).
## File and module organization
- Backend follows NestJS conventions: `*.module.ts`, `*.controller.ts`, `*.service.ts` under domain folders.
- Frontend admin follows Vue SPA conventions with `layouts/`, `router/`, `views/`.
- Frontend portal follows Nuxt file-based routing under `app/pages/`.
- Shared package uses a single `src/index.ts` barrel export.
## Naming patterns
- Backend domain names are singular business nouns (`product`, `customer`, `quotation`, `shipping`, `ai`, `auth`).
- Prisma enums and models use PascalCase type names with snake_case enum values in many cases (`apps/server/prisma/schema.prisma:9`).
- Shared constants are exported in UPPER_SNAKE_CASE arrays with derived TypeScript union types (`packages/shared/src/index.ts:1`).
- Route paths in admin use slash-delimited business namespaces like `product/spu`, `sales/quotation`, `ai/prompt` (`apps/admin/src/router/modules/admin.ts:16`).
## Implementation style
- Semicolons are omitted consistently in reviewed TS/Vue files.
- Quotes are primarily single quotes.
- Backend services currently expose lightweight `getMeta()` methods as scaffolding placeholders (`apps/server/src/modules/product/product.service.ts:3`, `apps/server/src/modules/auth/auth.service.ts:3`, `apps/server/src/modules/ai/ai.service.ts:3`).
- Vue SFCs use `<script setup lang="ts">` in reviewed files (`apps/admin/src/layouts/AdminLayout.vue:1`, `apps/portal/app/pages/index.vue:1`).
## Architecture conventions
- Monorepo separates admin, portal, backend, and shared code rather than mixing them.
- Domain concepts are first defined in Prisma schema and mirrored selectively in shared constants.
- Placeholder-first approach is common: route shells and module stubs are added before end-to-end business logic.
## Tooling conventions
- Every package defines `build`, `lint`, and `typecheck` scripts, even where lint is not actually configured yet.
- Type safety is emphasized more than linting at current stage.
## Styling conventions
- Portal uses global CSS from `app/assets/main.css`.
- Admin uses `src/styles/index.css`.
- No current evidence of component library conventions or utility CSS framework usage in installed manifests.
## Gaps / inconsistencies
- PRD says B-end should be based on art-design-pro + Element Plus + Tailwind (`PRD.md:12`), but current admin code only contains a custom placeholder shell without those dependencies installed.
- Shared platform constants include fewer values than Prisma `PlatformType` enum (for example schema includes `wechat_channel` and `pinduoduo`, shared constants currently do not) (`packages/shared/src/index.ts:19`, `apps/server/prisma/schema.prisma:52`).
- Lint commands exist only as placeholders, so formatting/style consistency currently relies on developer discipline rather than enforced tooling.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## High-level shape
- Monorepo with three application surfaces plus one shared package:
- Product intent from PRD is a unified product-data, quotation, and asset platform serving customers, sales, and operations (`PRD.md:3`).
## Backend architecture
- Entry point bootstraps a Nest app, enables CORS, and listens on configurable port (`apps/server/src/main.ts:4`).
- Root module composes feature modules plus `PrismaModule` (`apps/server/src/app.module.ts:10`).
- Feature boundaries are module-per-domain:
- Current controllers/services are mostly scaffolded and expose metadata rather than full business workflows.
## Data architecture
- Prisma schema is the most complete expression of system design.
- Central aggregate appears to be `ProductSpu`, connected to:
- Customer and sales flow is modeled as:
- Shipping is modeled separately with template/rule entities and linked into quotations.
- AI content generation is modeled as templates + generation records + sensitive rules.
## Frontend architecture
### Admin
- SPA architecture using Vue Router (`apps/admin/src/router/index.ts:1`).
- Single root layout (`AdminLayout.vue`) wraps route-driven placeholder screens.
- Route structure maps directly to business modules such as product, assets, channel links, shipping, inquiries, quotations, and AI (`apps/admin/src/router/modules/admin.ts:4`).
- Current implementation is navigation skeleton rather than feature-complete screens.
### Portal
- Nuxt app with file-based routing under `app/pages/`.
- Current pages are static or placeholder-like and describe intended customer flows: browsing, compare, login, favorites, inquiries, profile, selections.
- Product detail route already reserves product-specific page shape using dynamic route param (`apps/portal/app/pages/products/[id].vue:1`).
## Shared code architecture
- `@qiye/shared` currently exposes domain constants/types such as roles, product status, storage conditions, and AI business types (`packages/shared/src/index.ts:1`).
- TS path aliasing in root config allows apps to consume shared package consistently (`tsconfig.base.json:11`).
## Flow boundaries
- Intended boundary is clear even though implementation is early:
## Architectural patterns in use
- Domain-oriented module partitioning on backend.
- Shared package for cross-app constants/types.
- Separate frontend apps instead of a single blended UI.
- Prisma-first domain modeling.
- Placeholder-first delivery: routes and module scaffolds are in place before full business logic.
## Notable limitations in current architecture
- No authenticated API flow wired between frontends and backend.
- No DTO/validation/service orchestration depth observed in reviewed backend modules.
- No background jobs, caching, messaging, or document generation pipeline found yet.
- No SSR-to-API integration or frontend data-fetch architecture identified beyond static pages.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
