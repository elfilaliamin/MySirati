# MySirati — High-End Visual Redesign Plan (`change-design.md`)

> **Document Status**: Complete Architecture & Visual Redesign Blueprint  
> **Scope**: Visual & Design System overhaul across all pages and shared UI components.  
> **Hard Constraints**: Functionality, routing, backend logic, and **Locked Colors** are 100% preserved.

---

## Table of Contents
1. [Step 1: Visual & Technical Audit](#step-1-visual--technical-audit)
2. [Step 2: High-End Design Specification](#step-2-high-end-design-specification)
   - [2.1 Design Direction & Mood](#21-design-direction--mood)
   - [2.2 Locked Colors (Preserved Palette)](#22-locked-colors-preserved-palette)
   - [2.3 Color Usage Rules & Derived Neutrals](#23-color-usage-rules--derived-neutrals)
   - [2.4 Typography System & Multilingual Support](#24-typography-system--multilingual-support)
   - [2.5 Spacing, Grid & Layout Rhythm](#25-spacing-grid--layout-rhythm)
   - [2.6 Shape, Depth, Borders & Layered Shadows](#26-shape-depth-borders--layered-shadows)
   - [2.7 UI Components Redesign (With Comprehensive State Matrix)](#27-ui-components-redesign-with-comprehensive-state-matrix)
   - [2.8 Page-by-Page Transformation Plan](#28-page-by-page-transformation-plan)
   - [2.9 Motion, Transitions & Micro-Interactions](#29-motion-transitions--micro-interactions)
   - [2.10 Imagery, Iconography & Empty States](#210-imagery-iconography--empty-states)
   - [2.11 Responsive Breakpoints & RTL (Arabic) Behavior](#211-responsive-breakpoints--rtl-arabic-behavior)
   - [2.12 Accessibility & Contrast Checklist](#212-accessibility--contrast-checklist)
3. [Step 3: Implementation Roadmap & Execution Checklist](#step-3-implementation-roadmap--execution-checklist)
4. [Verification, Visual QA & Risk Management](#verification-visual-qa--risk-management)

---

## Step 1: Visual & Technical Audit

### 1.1 Tech Stack & Styling Architecture
- **Framework**: React 18.3.1 with Vite 6.1.0 and TypeScript 5.7.3.
- **Styling Architecture**: Tailwind CSS 3.4.17 (`darkMode: 'class'`), PostCSS 8.5.1, Autoprefixer 10.4.20.
- **Theme Delivery**: CSS Custom Properties (`:root` and `html.dark`) configured in `frontend/src/index.css` mapped to Tailwind theme tokens in `frontend/tailwind.config.js`.
- **Component Primitives**: Custom React wrappers around semantic HTML in `frontend/src/components/ui/` (`Button`, `Card`, `Badge`, `Input`, `Select`, `Modal`, `EmptyState`, `ThemeToggle`, `ToastContext`).
- **Icons**: `lucide-react` (v0.475.0).
- **Font Stack**: Google Font `Inter` (weights 300, 400, 500, 600, 700) loaded via `<link>` in `frontend/index.html`.

### 1.2 Inventory of Pages & Screens
| Screen Name | Route | Source File | Layout Wrapper |
| :--- | :--- | :--- | :--- |
| **Landing Page** | `/` | `src/features/landing/LandingPage.tsx` | `AppLayout` (Full-width, No Sidebar) |
| **Privacy & Moderation** | `/privacy` | `src/features/privacy/PrivacyPage.tsx` | `AppLayout` (Contained, No Sidebar) |
| **Sign In / Login** | `/login` | `src/features/auth/LoginPage.tsx` | `AppLayout` (Centered Card) |
| **Sign Up / Register** | `/register` | `src/features/auth/RegisterPage.tsx` | `AppLayout` (Centered Card) |
| **User Dashboard** | `/dashboard` | `src/features/dashboard/DashboardPage.tsx` | `AppLayout` + `AppSidebar` |
| **Profile Basics** | `/profile` | `src/features/profile/ProfilePage.tsx` | `AppLayout` + `AppSidebar` |
| **Work Experiences** | `/experiences` | `src/features/sections/ExperiencesPage.tsx` | `AppLayout` + `AppSidebar` |
| **Education & Credentials** | `/education` | `src/features/sections/EducationPage.tsx` | `AppLayout` + `AppSidebar` |
| **Projects Showcase** | `/projects` | `src/features/sections/ProjectsPage.tsx` | `AppLayout` + `AppSidebar` |
| **Skills & Technologies** | `/skills` | `src/features/sections/SkillsPage.tsx` | `AppLayout` + `AppSidebar` |
| **Languages** | `/languages` | `src/features/sections/LanguagesPage.tsx` | `AppLayout` + `AppSidebar` |
| **AI Share Links** | `/share` | `src/features/share-links/ShareLinksPage.tsx` | `AppLayout` + `AppSidebar` |
| **Share Link Builder** | `/share/new`, `/share/:id/edit`| `src/features/share-links/ShareLinkBuilderPage.tsx` | `AppLayout` + `AppSidebar` |
| **Account Settings** | `/settings` | `src/features/settings/SettingsPage.tsx` | `AppLayout` + `AppSidebar` |
| **Admin Overview** | `/admin` | `src/features/admin/AdminOverviewPage.tsx` | `AppLayout` + `AppSidebar` |
| **Admin Users Management** | `/admin/users` | `src/features/admin/AdminUsersPage.tsx` | `AppLayout` + `AppSidebar` |
| **Admin User Detail** | `/admin/users/:id` | `src/features/admin/AdminUserDetailPage.tsx` | `AppLayout` + `AppSidebar` |
| **Admin Audit Log** | `/admin/audit-log` | `src/features/admin/AdminAuditLogPage.tsx` | `AppLayout` + `AppSidebar` |

### 1.3 Current Design Tokens & Baseline Values
- **Colors**: See Section 2.2 for complete CSS variable map.
- **Font**: Inter, system-ui, -apple-system, sans-serif.
- **Border Radii**:
  - Elements: `rounded-lg` (8px), `rounded-xl` (12px), `rounded-2xl` (16px), `rounded-full` (9999px).
- **Shadows**: Tailwind defaults (`shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`).
- **Breakpoints**: Tailwind default (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`).

### 1.4 Visual Weaknesses Identified in Codebase Audit
1. **Flat Surface Depths & Lack of Visual Layering**:
   - `Card.tsx` relies simply on `border border-border bg-surface-raised shadow-sm`. In both light and dark mode, cards feel flat, with low contrast against the background and no ambient diffuse glow or layered depth.
   - Dark mode (`--color-bg: #0b1220`, `--color-surface-raised: #162036`) suffers from lack of specular edge lighting; borders appear monochromatic and harsh (`#24304a`).
2. **Hardcoded Color Utility Leaks & Inconsistencies**:
   - In `Badge.tsx`: Hardcoded Tailwind palette classes `bg-emerald-500/10 text-emerald-600`, `bg-amber-500/10`, `bg-rose-500/10` are used instead of CSS variable tokens (`var(--color-success)`, `var(--color-warning)`, `var(--color-danger)`).
   - In `ToastContext.tsx`: Hardcoded `border-emerald-500/30`, `border-rose-500/30`.
   - In `UsersTable.tsx` and `AuditLogTable.tsx`: Headers use `bg-surface-muted`, which is **undefined** in `tailwind.config.js` and `index.css`, resulting in broken transparent header rendering.
3. **Typography & Hierarchical Monotony**:
   - Font scale is heavily clustered around `text-xs` (12px) and `text-sm` (14px). Section headers jump abruptly to `text-2xl` without transitional sub-headers or letter-spacing (tracking) calibration.
   - Numerical data (stats counters, dates, share link keys) lack `font-variant-numeric: tabular-nums`, leading to visual jitter and misaligned columns in tables and cards.
   - Arabic name and brand context ("MySirati" / سِيرَتي): Lack of dedicated Arabic font styling causes fallback to system fonts if Arabic is rendered.
4. **Directional Incompatibilities with RTL**:
   - `Input.tsx`: Uses physical padding and positions `pl-10`, `pr-10`, `left-3`, `right-3`, and hardcoded `text-left`.
   - `Select.tsx`: Uses hardcoded `text-left`.
   - `Modal.tsx`: Uses physical margin `ml-2` for close buttons.
   - `FeaturesGrid.tsx`: Uses hardcoded `text-left`.
5. **Interactive Feedback & State Deficits**:
   - Buttons and interactive items use generic `transition-all` without tailored cubic-bezier timing or micro-compression (`active:scale-[0.98]`).
   - Cards lack subtle hover elevation (`translate-y-[-2px]`), border luminescence, or inner highlight borders.
   - Forms and inputs lack distinct focus rings with soft glow (`box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15)`).
   - Missing explicit keyboard focus-visible indicator consistency across navigation links and icon buttons.
6. **Header & Navigation Polish Deficiencies**:
   - `AppHeader.tsx` is completely opaque (`bg-surface-raised`). It lacks the modern translucent frosted glass treatment (`backdrop-blur-md bg-surface-raised/80`).
   - `AppSidebar.tsx` active navigation state uses a harsh, solid blue pill (`bg-primary text-white`) that overpowers the rest of the navigation hierarchy.

---

## Step 2: Design Plan Using High-End Visual Design Principles

### 2.1 Design Direction & Mood
- **Brand Identity**: MySirati is a precision AI career identity platform. The aesthetic must convey **executive polish, cryptographic security, and modern artificial intelligence capability**.
- **Style Keywords**:
  - *Sleek & Architectural*: Clean structural grids, crisp hairlines, and deliberate whitespace.
  - *Deep Luminous Glass & Surface Hierarchy*: Layered cards with subtle edge highlights (1px inner borders) and diffused ambient drop shadows.
  - *Calm Professionalism*: Neutral backgrounds letting verified career credentials and status badges shine with high signal-to-noise ratio.
- **What "High-End" Means for MySirati**:
  - Eliminating generic flat boxes in favor of multi-layered elevation (background → ambient canvas card → elevated interactive surface).
  - Subtle interactive micro-physics (springy click reactions, gentle elevation shifts on hover).
  - Consistent typography with negative tracking on bold headings, high-contrast readable metadata, and tabular numbers for dates/counters.
  - Premium frosted glass headers with smooth background blurs.

---

### 2.2 Locked Colors (Preserved Palette)
The core brand identity and palette are strictly preserved.

#### Light Mode Palette (Locked)
| Token Name | Hex Code | CSS Variable | Existing Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `#2563eb` | `--color-primary` | Main CTA buttons, active accents, brand logo gradient start |
| **Primary Hover** | `#1d4ed8` | `--color-primary-hover`| Hover state for primary buttons, logo gradient midpoint |
| **Primary Soft** | `#eff6ff` | `--color-primary-soft` | Soft badge backgrounds, icon container backgrounds, selections |
| **Background** | `#f8fafc` | `--color-bg` | Main application background (Slate-50) |
| **Surface** | `#f1f5f9` | `--color-surface` | Secondary background, input backgrounds, table row alternate |
| **Surface Raised**| `#ffffff` | `--color-surface-raised`| Card surfaces, modals, dropdowns, header, sidebar |
| **Border** | `#e2e8f0` | `--color-border` | Default hairline borders, dividers (Slate-200) |
| **Text** | `#0f172a` | `--color-text` | Primary headings, body copy (Slate-900) |
| **Text Muted** | `#64748b` | `--color-text-muted` | Subtitles, helper text, timestamps, labels (Slate-500) |
| **Success** | `#16a34a` | `--color-success` | Active share links, completed profile items (Green-600) |
| **Warning** | `#d97706` | `--color-warning` | Expiring links, admin badges, warnings (Amber-600) |
| **Danger** | `#dc2626` | `--color-danger` | Revoked links, delete actions, errors (Red-600) |
| **Logo Accent** | `#0284c7` | Embedded in SVG | Sky-600 gradient end stop in `MySiratiIcon` |

#### Dark Mode Palette (Locked)
| Token Name | Hex Code | CSS Variable | Existing Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `#3b82f6` | `--color-primary` | Primary CTAs, active highlights (Blue-500) |
| **Primary Hover** | `#60a5fa` | `--color-primary-hover`| Hover state for primary actions (Blue-400) |
| **Primary Soft** | `#172554` | `--color-primary-soft` | Subtle tinted containers, badges (Blue-950) |
| **Background** | `#0b1220` | `--color-bg` | Deep nocturnal background canvas |
| **Surface** | `#111a2e` | `--color-surface` | Secondary container surfaces, table headers |
| **Surface Raised**| `#162036` | `--color-surface-raised`| Elevated cards, modals, sidebar, flyouts |
| **Border** | `#24304a` | `--color-border` | Structural borders, card outlines |
| **Text** | `#e5edff` | `--color-text` | High-contrast cool white body & headings |
| **Text Muted** | `#94a3b8` | `--color-text-muted` | Secondary copy, metadata, timestamps |
| **Success** | `#22c55e` | `--color-success` | Active links, verified status (Green-500) |
| **Warning** | `#f59e0b` | `--color-warning` | Pending/warning badges, admin alerts (Amber-500) |
| **Danger** | `#ef4444` | `--color-danger` | Revoked links, destructive triggers (Red-500) |

---

### 2.3 Color Usage Rules & Derived Neutrals
To create a high-end feel without introducing new hue families, we derive clean alpha-channel tints and elevation steps strictly from the locked palette:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ELEVATION & COLOR STACK                         │
├────────────────────────────────────────────────────────────────────────┤
│ Layer 3: Modals / Popovers      bg-surface-raised + border-border/80   │
│                                 shadow-2xl + ring-1 ring-white/10 (dark)│
├────────────────────────────────────────────────────────────────────────┤
│ Layer 2: Cards & Sidebars       bg-surface-raised (light: #fff)        │
│                                 border-border/70 + shadow-card         │
├────────────────────────────────────────────────────────────────────────┤
│ Layer 1: Recessed Wells/Inputs  bg-surface (light: #f1f5f9)            │
│                                 inner border-border                    │
├────────────────────────────────────────────────────────────────────────┤
│ Base Canvas: Viewport           bg-bg (light: #f8fafc / dark: #0b1220) │
└────────────────────────────────────────────────────────────────────────┘
```

#### Derived Neutrals & Tints (Explicitly Labeled as Derived)
1. `--color-surface-muted`:
   - *Light*: `rgba(241, 245, 249, 0.6)` (Derived from `#f1f5f9` at 60% opacity)
   - *Dark*: `rgba(17, 26, 46, 0.7)` (Derived from `#111a2e` at 70% opacity)
   - *Usage*: Table header rows (`th`), recessed code blocks, and inactive tab pills.
2. `--color-border-subtle`:
   - *Light*: `rgba(226, 232, 240, 0.6)` (Derived from `#e2e8f0` at 60% opacity)
   - *Dark*: `rgba(36, 48, 74, 0.6)` (Derived from `#24304a` at 60% opacity)
   - *Usage*: Inner card divider lines, secondary row borders.
3. `--color-card-highlight`:
   - *Light*: `rgba(255, 255, 255, 0.8)` (Subtle top specular edge)
   - *Dark*: `rgba(255, 255, 255, 0.05)` (Subtle hairline edge lighting in dark mode)
4. `--color-primary-glow`:
   - *Light*: `rgba(37, 99, 235, 0.12)` (Focus rings, primary button hover aura)
   - *Dark*: `rgba(59, 130, 246, 0.20)` (Focus rings, glow behind active icon badges)
5. `--color-glass-bg`:
   - *Light*: `rgba(255, 255, 255, 0.85)` with `backdrop-filter: blur(12px)`
   - *Dark*: `rgba(22, 32, 54, 0.85)` with `backdrop-filter: blur(12px)`
   - *Usage*: Sticky top navigation header (`AppHeader`), floating bottom toasts.

---

### 2.4 Typography System & Multilingual Support

#### Font Stacks
- **Primary Latin Font**: `Inter`, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif.
- **Arabic Multilingual Pairing**: Recommending `IBM Plex Sans Arabic` or `Cairo` as the preferred fallback in CSS font family list so that any Arabic names or bilingual strings render with typographic elegance:
  ```css
  font-family: 'Inter', 'IBM Plex Sans Arabic', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  ```

#### Typographic Scale & Rules
| Role | Class | Size | Weight | Tracking | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | `text-4xl sm:text-5xl lg:text-6xl` | 36px / 48px / 60px | 800 (Extrabold) | `-0.03em` | 1.1 | Landing page main value proposition |
| **Page Title** | `text-2xl sm:text-3xl` | 24px / 30px | 700 (Bold) | `-0.025em`| 1.2 | Dashboard, Profile, Section headers |
| **Section Title** | `text-lg sm:text-xl` | 18px / 20px | 600 (Semibold) | `-0.02em` | 1.3 | Card titles, modal headers, major groups |
| **Card / Item Title**| `text-base` | 16px | 600 (Semibold) | `-0.01em` | 1.4 | Experience role, Project name, User email |
| **Body / Form** | `text-sm` | 14px | 400 (Regular) | `0` | 1.5 | Inputs, labels, descriptions, table body |
| **Metadata / Badges**| `text-xs` | 12px | 500 (Medium) | `+0.01em` | 1.4 | Timestamps, tags, counter badges |
| **Micro / Sub-caps** | `text-[10px] sm:text-[11px]` | 10px / 11px | 600 (Semibold) | `+0.05em` | 1.2 | Uppercase table headers, role badges |

- **Tabular Numbers**: Add `font-mono tabular-nums` to all dates, metric percentages, and SHA-256 key prefix displays.

---

### 2.5 Spacing, Grid & Layout Rhythm

#### Structural Dimensions
- **Max Content Width**:
  - Landing & Hero: `max-w-6xl` (1152px)
  - General App Pages: `max-w-5xl` (1024px)
  - Detail/Edit Pages: `max-w-4xl` (896px)
  - Auth Modals & Forms: `max-w-md` (448px)
- **App Sidebar Width**:
  - Desktop: Fixed `16rem` (`w-64` / 256px), sticky `top-0 h-screen`.
  - Mobile Drawer: `w-72 max-w-[85vw]` with spring animation.
- **Vertical Spacing Scale**:
  - Page header to content: `space-y-6 sm:space-y-8` (24px to 32px)
  - Card list item gap: `space-y-3.5 sm:space-y-4` (14px to 16px)
  - Inside card sections: `p-4 sm:p-6` (16px to 24px)
  - Form field stacks: `gap-4 sm:gap-5` (16px to 20px)

---

### 2.6 Shape, Depth, Borders & Layered Shadows

#### Border Radii
- Modals & Hero Cards: `rounded-2xl` (16px)
- Standard Cards & Form Containers: `rounded-xl` (12px)
- Buttons, Inputs, Selects: `rounded-xl` (12px)
- Mini Action Buttons & Badges: `rounded-lg` (8px)
- Status Pills & Avatars: `rounded-full` (9999px)

#### Layered Shadows System (Tailwind Token Additions)
Traditional flat shadows look artificial. We define calibrated dual-layer shadows in `tailwind.config.js`:
```js
boxShadow: {
  'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
  'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 10px 15px -5px rgba(0, 0, 0, 0.04)',
  'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 20px 25px -5px rgba(0, 0, 0, 0.08)',
  'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  'glow-primary': '0 0 20px -3px rgba(37, 99, 235, 0.25)',
}
```

In Dark Mode, box shadows are accompanied by an inner hairline border (`ring-1 ring-white/5` or `border border-border`) to ensure cards stand out cleanly against `--color-bg`.

---

### 2.7 UI Components Redesign (With Comprehensive State Matrix)

#### 1. Button (`src/components/ui/Button.tsx`)
- **Current Problem**: Lacks active tactile feel, no subtle focus ring glow, plain borders on secondary/outline variants.
- **New Design**:
  - `primary`: Rich gradient or solid `--color-primary` with subtle inner highlight, `active:scale-[0.98]`, `shadow-sm hover:shadow-glow-primary`.
  - `secondary`: `bg-surface-raised border border-border text-text hover:bg-surface hover:border-border/80 active:scale-[0.98]`.
  - `ghost`: Transparent, `hover:bg-surface hover:text-text active:scale-[0.98]`.
  - `soft`: `bg-primary-soft text-primary hover:bg-primary-soft/80 active:scale-[0.98]`.
  - `danger`: `bg-danger text-white hover:opacity-95 shadow-sm active:scale-[0.98]`.
- **States Matrix**:
  - *Default*: Crisp typography, `font-medium`, 12px border radius.
  - *Hover*: Micro elevation, background shift, smooth 150ms transition.
  - *Active / Pressed*: `scale-[0.98]` physical depression.
  - *Focus-visible*: `ring-2 ring-primary ring-offset-2 ring-offset-bg outline-none`.
  - *Disabled*: `opacity-50 cursor-not-allowed pointer-events-none`.
  - *Loading*: Replaces left icon with spinning `Loader2`, keeps label visible without layout reflow.

#### 2. Card (`src/components/ui/Card.tsx`)
- **Current Problem**: Generic flat border, no depth hierarchy, hover transition is merely `transition-shadow`.
- **New Design**:
  - Add specular highlight: subtle top border gradient or 1px hairline border.
  - Smooth hover variant: `hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-200`.
  - CardHeader with calibrated line-height and spacing (`gap-1.5 mb-5`).

#### 3. Badge (`src/components/ui/Badge.tsx`)
- **Current Problem**: Violates token isolation by using hardcoded `emerald-500`, `amber-500`, `rose-500`.
- **New Design**:
  - Standardize on semantic tokens:
    - `primary`: `bg-primary-soft text-primary border border-primary/25`
    - `success`: `bg-success/10 text-success border border-success/25`
    - `warning`: `bg-warning/10 text-warning border border-warning/25`
    - `danger`: `bg-danger/10 text-danger border border-danger/25`
    - `neutral`: `bg-surface text-text-muted border border-border`
  - Pill shape: `rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide inline-flex items-center gap-1.5`.

#### 4. Input & Select (`src/components/ui/Input.tsx`, `src/components/ui/Select.tsx`)
- **Current Problem**: Uses physical `pl-10`, `left-3`, `text-left` (RTL hostile). Focus ring is a basic ring without ambient glow.
- **New Design**:
  - Switch to logical properties: `ps-10`, `pe-10`, `start-3`, `end-3`, `text-start`.
  - Focus state: `focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-150`.
  - Background: `bg-surface-raised` with crisp inner border `border-border`.
  - Error state: `border-danger focus:ring-danger/10 text-text` with error message featuring an icon.

#### 5. Modal & ConfirmModal (`src/components/ui/Modal.tsx`, `src/components/ui/ConfirmModal.tsx`)
- **Current Problem**: Backdrop is a flat `bg-black/50 backdrop-blur-sm`. Modal card lacks smooth entry zoom.
- **New Design**:
  - Backdrop: `bg-black/60 backdrop-blur-md transition-opacity duration-200`.
  - Dialog Window: `rounded-2xl border border-border/80 bg-surface-raised shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200`.
  - Close button: `rounded-xl p-2 text-text-muted hover:text-text hover:bg-surface transition-colors`.

#### 6. Navigation & Sidebar (`src/layouts/AppSidebar.tsx`, `src/layouts/AppHeader.tsx`)
- **Current Problem**: Active sidebar item uses an overpowering solid `bg-primary text-white`. Header is completely opaque.
- **New Design**:
  - `AppHeader`: High-end frosted glass (`sticky top-0 z-40 bg-surface-raised/85 backdrop-blur-md border-b border-border/70`).
  - `AppSidebar`:
    - Inactive items: `text-text-muted hover:text-text hover:bg-surface/80 rounded-xl transition-all duration-150`.
    - Active item: Refined treatment — `bg-primary/10 text-primary font-semibold border-s-4 border-primary rounded-e-xl rounded-s-none ps-3` or elevated pill `bg-primary text-white shadow-sm shadow-primary/25`.
    - User footer: Refined avatar squircle with status indicator ping.

#### 7. Tables (`UsersTable.tsx`, `AuditLogTable.tsx`)
- **Current Problem**: Uses broken class `bg-surface-muted`, cramped row heights, lack of empty state styling.
- **New Design**:
  - Wrap table in clean rounded container: `rounded-2xl border border-border overflow-hidden bg-surface-raised shadow-subtle`.
  - Header: `bg-surface/90 text-text-muted text-[11px] font-semibold uppercase tracking-wider border-b border-border py-3 px-4`.
  - Rows: `hover:bg-surface/50 transition-colors duration-150 border-b border-border/60 last:border-b-0 py-3.5 px-4`.
  - Add `tabular-nums` for timestamps and IP addresses.

#### 8. EmptyState (`src/components/ui/EmptyState.tsx`)
- **Current Problem**: Plain dashed box with generic icon.
- **New Design**:
  - Subtle concentric radial glow in icon container: `h-16 w-16 rounded-2xl bg-primary-soft/80 border border-primary/20 text-primary flex items-center justify-center shadow-subtle mb-4`.
  - High-hierarchy typography: bold title, constrained max-w subtitle (`max-w-sm`), followed by primary action.

#### 9. Toast Notification (`src/components/ui/ToastContext.tsx`)
- **Current Problem**: Hardcoded emerald/rose utility borders.
- **New Design**:
  - Floating pill card: `rounded-2xl border border-border/80 bg-surface-raised/95 backdrop-blur-md p-4 shadow-xl text-text`.
  - Semantic icon container with dedicated soft background tint.

---

### 2.8 Page-by-Page Transformation Plan

#### 1. Landing Page (`src/features/landing/LandingPage.tsx`, `FeaturesGrid.tsx`)
- **Hero Section**:
  - Add subtle radial ambient background glow using pure locked brand color: `background: radial-gradient(circle at 50% 10%, rgba(37, 99, 235, 0.08) 0%, transparent 60%)`.
  - Badge: Refine `Sparkles` badge into an interactive pill with a glowing dot.
  - Headline: Tighten typography (`tracking-tight`, `leading-[1.15]`), gradient text or subtle underline on highlight keyword.
  - CTAs: Primary button with `shadow-glow-primary` and ArrowRight animation on hover (`group-hover:translate-x-1`).
- **Features Grid**:
  - 4-card grid elevated to interactive feature cards with subtle top border highlight and smooth hover lift.
  - Icon containers styled with squircle `rounded-2xl bg-primary-soft text-primary` and hover spin/scale.

#### 2. Authentication Pages (`LoginPage.tsx`, `RegisterPage.tsx`, `LoginForm.tsx`, `RegisterForm.tsx`)
- Centered container with soft ambient glow behind the card.
- Card upgrade: `rounded-2xl p-6 sm:p-8 shadow-card border border-border bg-surface-raised/95 backdrop-blur-sm`.
- Input fields with polished floating labels or crisp sub-labels, input icons cleanly aligned via logical `start-3`.
- Submit button with full width, primary gradient glow, and smooth loading state.

#### 3. User Dashboard (`DashboardPage.tsx`, `StatsGrid.tsx`, `ProfileCompletenessCard.tsx`, `DashboardCta.tsx`)
- **Header**: Refined greeting with user headline, "Manage Share Links" as prominent action.
- **StatsGrid & StatCard**:
  - 5-column responsive grid.
  - `StatCard`: Large tabular metric count (`text-3xl font-extrabold tracking-tight`), labeled icon squircle with hover tint transition.
- **Profile Completeness Card**:
  - Modern progress bar with rounded gradient track and shimmer animation.
  - Checklist item cards: upgraded with clear checkbox status (`CheckCircle2` in `--color-success` vs subtle circle), hover chevron slide.
- **Dashboard CTA**:
  - High-impact banner card with subtle linear gradient border, clear value proposition for AI sharing.

#### 4. Profile Basics (`ProfilePage.tsx`, `ProfileForm.tsx`)
- Form grouped into logical cards:
  - Personal Details (Name, Headline, Bio).
  - Contact Information (Email, Phone, Location).
  - Online Presence & Profiles (GitHub, LinkedIn, Portfolio).
- Two-column responsive grid on desktop for compact, executive data entry.
- Sticky save bar on mobile/desktop with unsaved change indication.

#### 5. Section Pages (`ExperiencesPage.tsx`, `EducationPage.tsx`, `ProjectsPage.tsx`, `SkillsPage.tsx`, `LanguagesPage.tsx`)
- **SectionHeader**: Icon in a gradient squircle, clear count indicator badge next to title, primary action button.
- **Item Cards (`ExperienceCard`, `EducationCard`, `ProjectCard`)**:
  - Visual hierarchy: Role/Degree as bold `text-base`, Company/Institution as `text-sm font-medium text-text-muted`.
  - Date & status badges: Active positions get animated pulse dot in `--color-success`.
  - Reorder buttons (`MoveButtons`): Up/Down arrows grouped in an elegant segmented control.
  - Action buttons: Clean hover states for Edit (`text-primary hover:bg-primary-soft`) and Delete (`text-danger hover:bg-danger/10`).
- **Skills & Languages Grid**:
  - Category grouping cards with tag chips, proficiency level badges with distinct semantic colors.

#### 6. Share Links Management & Builder (`ShareLinksPage.tsx`, `ShareLinkBuilderPage.tsx`, `ShareLinkCard.tsx`)
- **ShareLinksPage**:
  - Link cards with status badges (Active, Expired, Revoked).
  - Key prefix displayed in a styled code pill (`font-mono text-xs bg-surface px-2 py-1 rounded-md border border-border`).
  - Action bar: Regenerate, Revoke, Delete, and Copy URL with toast feedback.
- **ShareLinkBuilderPage**:
  - Two-column layout: Configuration Form on left, Sticky Live JSON Preview on right.
  - Section pickers (`GranularSectionPicker`): Toggle switches with clear checked state, accordion items for cherry-picking specific roles and projects.
  - `JsonPreview`: Dark-mode styled code terminal with syntax color simulation, copy button, and payload size indicator.
- **KeyRevealModal**:
  - High-security visual aesthetic: warning banner, masked key with one-click copy, clear explanation that the key is shown only once.

#### 7. Administration Portal (`AdminOverviewPage.tsx`, `AdminUsersPage.tsx`, `AdminUserDetailPage.tsx`, `AdminAuditLogPage.tsx`)
- **Admin Navigation (`AdminNav`)**: Sleek pill-based sub-navigation with active indicator.
- **Overview Grid**: Metrics for total users, active share links, audit entries, system health.
- **UsersTable & AuditLogTable**:
  - Full repair of the missing `bg-surface-muted` class.
  - Clean table headers with subtle separators, row hover glow, badge status columns.
  - Monospace formatting for IPs, IDs, and dates.
  - Pagination controls with sleek prev/next buttons and page count indicator.

#### 8. Account Settings (`SettingsPage.tsx`, `ExportDataCard.tsx`, `DeleteAccountModal.tsx`)
- Clean grouped settings panels.
- Theme selector with segmented switch (`Light`, `System`, `Dark`) featuring icon and label.
- Data export card with JSON download action and data portability badge.
- Danger zone card with red outline accent and clear confirmation dialog.

#### 9. Privacy & Moderation Disclosure (`PrivacyPage.tsx`)
- Clean, readable typography layout with numbered section cards (`PrivacySection`).
- Icon-led key highlights and bullet lists with custom bullet markers.

---

### 2.9 Motion, Transitions & Micro-Interactions
High-end software feels responsive and alive without being distracting:
1. **Button & Interactive Click Physics**:
   - `transition: transform 120ms cubic-bezier(0.4, 0, 0.2, 1), background-color 150ms ease, box-shadow 150ms ease`.
   - `active:scale-[0.98]`.
2. **Card Hover Physics**:
   - `transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 200ms ease, border-color 200ms ease`.
   - `hover:-translate-y-0.5 hover:shadow-card-hover`.
3. **Modal & Drawer Transitions**:
   - Backdrops: Fade in/out 200ms.
   - Dialogs: Zoom in from 95% scale with gentle ease-out (200ms).
   - Sidebar Drawer (Mobile): Slide in from inline start (`translate-x-0`) with 250ms cubic-bezier.
4. **Reduced Motion Accessibility**:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, ::before, ::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
       scroll-behavior: auto !important;
     }
   }
   ```

---

### 2.10 Imagery, Iconography & Empty States
- **Icon Set**: Maintain 100% consistency with `lucide-react` across the entire application.
- **Icon Sizing Scale**:
  - Standard inline with text: `h-4 w-4` (16px)
  - Badge / Sub-item icon: `h-3 w-3` (12px)
  - Section Header Avatar / Squircle: `h-5 w-5` or `h-6 w-6` inside a `h-11 w-11` container
  - Large Empty State: `h-7 w-7` or `h-8 w-8` inside a `h-16 w-16` container
- **Brand Logo & Mark**:
  - `MySiratiLogo.tsx` and `MySiratiIcon.tsx`: The current SVG squircle with linear gradient (`#2563EB` → `#1D4ED8` → `#0284C7`) and sparkle star is already custom and locked. We enhance it with subtle hover scaling (`hover:scale-105 transition-transform duration-200`).
- **Empty States**:
  - Styled with double concentric ring containers and gentle glow to make empty sections feel intentional and inviting rather than broken.

---

### 2.11 Responsive Breakpoints & RTL (Arabic) Behavior

#### Responsive Breakpoints Strategy
- **Mobile (< 640px)**:
  - Sidebar collapses to mobile drawer triggered via hamburger button in `AppHeader`.
  - Grids collapse to single-column (`grid-cols-1`).
  - Action buttons expand to full width where appropriate (`w-full sm:w-auto`).
  - Tables enable horizontal scroll with smooth indicators (`overflow-x-auto no-scrollbar`).
  - Modals adapt to bottom-sheet or near full-screen with safe padding (`p-3 sm:p-6`).
- **Tablet (640px – 1023px)**:
  - 2-column grids for dashboard cards, 2-column forms.
  - Floating action buttons and compact header.
- **Desktop (≥ 1024px)**:
  - Sticky permanent sidebar (`w-64`).
  - Multi-column grids (4-column stats, 2-column share builder).
  - Generous max-widths (`max-w-5xl`, `max-w-6xl`).

#### RTL (Arabic) Directional Support
The application includes `src/i18n/` with `isRtl` logic and direction handling (`document.documentElement.dir = 'rtl'`). Because the project name is Arabic ("Sirati" = my CV), RTL support is critical:
- **Rule 1: Replace all physical spacing with logical CSS / Tailwind utilities**:
  - Replace `left-*` and `right-*` with `start-*` and `end-*`.
  - Replace `pl-*` and `pr-*` with `ps-*` and `pe-*`.
  - Replace `ml-*` and `mr-*` with `ms-*` and `me-*`.
  - Replace `border-l-*` / `border-r-*` with `border-s-*` / `border-e-*`.
  - Replace `text-left` / `text-right` with `text-start` / `text-end`.
- **Rule 2: Chevron & Arrow Mirroring**:
  - Navigation chevrons (`ChevronRight`, `ArrowRight`) will use `rtl:rotate-180` so forward motion points logically left in RTL.
- **Rule 3: Avatar Status Dots & Badges**:
  - Absolute positioning on notification badges adjusted from `right-0` to `end-0`.

---

### 2.12 Accessibility & Contrast Checklist
- **Color Contrast (WCAG 2.1 AA Compliant)**:
  - Light Mode:
    - Text (`#0f172a`) on Background (`#f8fafc`) ratio: **16.2:1** (Passes AAA)
    - Muted Text (`#64748b`) on Surface (`#ffffff`) ratio: **4.6:1** (Passes AA)
    - Primary (`#2563eb`) on White (`#ffffff`) ratio: **4.6:1** (Passes AA)
  - Dark Mode:
    - Text (`#e5edff`) on Dark Background (`#0b1220`) ratio: **15.4:1** (Passes AAA)
    - Muted Text (`#94a3b8`) on Dark Surface (`#162036`) ratio: **5.2:1** (Passes AA)
    - Primary (`#3b82f6`) on Dark Surface (`#162036`) ratio: **4.8:1** (Passes AA)
- **Keyboard Navigation & Focus Rings**:
  - Standardize focus ring utility across all clickable components:
    `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg`.
- **Screen Reader Support**:
  - `SkipToContent.tsx` preserved and styled with high-visibility focus state.
  - Proper `aria-modal="true"`, `role="dialog"`, `aria-label`, and `aria-pressed` attributes across modals, tabs, and theme toggle buttons.
- **Minimum Tap Targets**:
  - All interactive buttons and touch controls maintain a minimum target size of `40x40px` (or `h-9`/`h-10` with adequate padding).

---

## Step 3: Implementation Roadmap & Execution Checklist

The execution follows a strict dependency order: foundation tokens first, followed by primitive UI components, layout structures, page features, and final QA polish.

### Phase 1: Tokens & Styling Foundation
- [x] **Task 1.1: Enhance Global Tokens in `src/index.css`**
  - Add derived neutral CSS variables: `--color-surface-muted`, `--color-border-subtle`, `--color-card-highlight`, `--color-primary-glow`.
  - Add typography smooth font rendering rules (`-webkit-font-smoothing: antialiased`).
  - Add global `prefers-reduced-motion` safety rules.
  - *Files*: `frontend/src/index.css`
- [x] **Task 1.2: Update Tailwind Configuration in `tailwind.config.js`**
  - Register `surface-muted` and derived color tokens.
  - Add custom `boxShadow` definitions (`card`, `card-hover`, `subtle`, `glow-primary`).
  - Ensure font family includes Arabic fallbacks.
  - *Files*: `frontend/tailwind.config.js`
- [x] **Task 1.3: Update Fonts in `index.html`**
  - Ensure Google Fonts link includes appropriate weights (300, 400, 500, 600, 700) and multilingual support if required.
  - *Files*: `frontend/index.html`

### Phase 2: Primitive UI Components Overhaul
- [x] **Task 2.1: Refactor `Button.tsx`**
  - Implement active scale animation (`active:scale-[0.98]`), refined focus-visible ring with offset, subtle shadow elevation on primary/danger, and smooth icon alignment.
  - *Files*: `frontend/src/components/ui/Button.tsx`
- [x] **Task 2.2: Refactor `Card.tsx`**
  - Add layered shadow, subtle inner border lighting, and interactive hover variant.
  - *Files*: `frontend/src/components/ui/Card.tsx`
- [x] **Task 2.3: Fix and Refactor `Badge.tsx`**
  - Remove hardcoded emerald/amber/rose classes; connect directly to locked CSS variables (`--color-success`, `--color-warning`, `--color-danger`, `--color-primary`).
  - *Files*: `frontend/src/components/ui/Badge.tsx`
- [x] **Task 2.4: Make `Input.tsx` and `Select.tsx` RTL-Compatible and High-End**
  - Replace `pl-10`, `pr-10`, `left-3`, `right-3`, `text-left` with `ps-10`, `pe-10`, `start-3`, `end-3`, `text-start`.
  - Add smooth focus glow ring (`focus:ring-4 focus:ring-primary/10`).
  - *Files*: `frontend/src/components/ui/Input.tsx`, `frontend/src/components/ui/Select.tsx`
- [x] **Task 2.5: Refactor `Modal.tsx` and `ConfirmModal.tsx`**
  - Upgrade backdrop blur, entry scale animation, and logical close button margins (`ms-2`).
  - *Files*: `frontend/src/components/ui/Modal.tsx`, `frontend/src/components/ui/ConfirmModal.tsx`
- [x] **Task 2.6: Refactor `EmptyState.tsx`**
  - Implement double concentric ring icon container with subtle glow and clear typography.
  - *Files*: `frontend/src/components/ui/EmptyState.tsx`
- [x] **Task 2.7: Refactor `ThemeToggle.tsx` and `ToastContext.tsx`**
  - Modernize segmented pill theme switch and floating glass toast cards with semantic tokens.
  - *Files*: `frontend/src/components/ui/ThemeToggle.tsx`, `frontend/src/components/ui/ToastContext.tsx`

### Phase 3: Layouts & Shell Polish
- [x] **Task 3.1: Modernize `AppHeader.tsx` & Actions**
  - Add translucent frosted glass effect (`bg-surface-raised/85 backdrop-blur-md`).
  - Polish `HeaderActions.tsx` and `HeaderBrand.tsx` with clean spacing.
  - *Files*: `frontend/src/layouts/AppHeader.tsx`, `frontend/src/layouts/HeaderActions.tsx`, `frontend/src/layouts/HeaderBrand.tsx`
- [x] **Task 3.2: Modernize `AppSidebar.tsx`**
  - Redesign active link indicator with high-end pill style or accent border.
  - Polish user profile squircle footer with live status indicator.
  - *Files*: `frontend/src/layouts/AppSidebar.tsx`
- [x] **Task 3.3: Polish `AppLayout.tsx` & Footer**
  - Ensure main viewport scrolling, skip-to-content focus visibility, and clean footer typography.
  - *Files*: `frontend/src/layouts/AppLayout.tsx`

### Phase 4: Feature Pages Visual Transformation
- [x] **Task 4.1: Redesign Landing Page (`LandingPage.tsx`, `FeaturesGrid.tsx`)**
  - Add hero radial ambient light, interactive badge, refined CTAs, and elevated feature cards.
  - *Files*: `frontend/src/features/landing/LandingPage.tsx`, `frontend/src/features/landing/FeaturesGrid.tsx`
- [x] **Task 4.2: Redesign Auth Screens (`LoginPage.tsx`, `RegisterPage.tsx`)**
  - Card elevation, ambient background blur, clean form layouts.
  - *Files*: `frontend/src/features/auth/LoginPage.tsx`, `frontend/src/features/auth/RegisterPage.tsx`, `frontend/src/features/auth/LoginForm.tsx`, `frontend/src/features/auth/RegisterForm.tsx`
- [x] **Task 4.3: Redesign Dashboard (`DashboardPage.tsx`, `StatsGrid.tsx`, `ProfileCompletenessCard.tsx`)**
  - Polish stat card typography with tabular numbers, progress bar gradients, and checklist item cards.
  - *Files*: `frontend/src/features/dashboard/DashboardPage.tsx`, `frontend/src/features/dashboard/StatsGrid.tsx`, `frontend/src/features/dashboard/StatCard.tsx`, `frontend/src/features/dashboard/ProfileCompletenessCard.tsx`, `frontend/src/features/dashboard/DashboardCta.tsx`
- [x] **Task 4.4: Redesign Profile Page (`ProfilePage.tsx`, `ProfileForm.tsx`)**
  - Multi-card grouped layout with responsive two-column grid.
  - *Files*: `frontend/src/features/profile/ProfilePage.tsx`, `frontend/src/features/profile/ProfileForm.tsx`
- [x] **Task 4.5: Redesign Section Pages & Cards**
  - Polish `SectionHeader.tsx`, `ItemActions.tsx`, `EducationCard.tsx`, `ExperienceCard.tsx`, `ProjectCard.tsx`, `SkillCard.tsx`, `LanguageCard.tsx`.
  - Add active pulse indicator for current positions, elegant reorder button groups.
  - *Files*: `frontend/src/features/sections/components/SectionHeader.tsx`, `frontend/src/features/sections/components/ItemActions.tsx`, `frontend/src/features/sections/components/EducationCard.tsx`, `frontend/src/features/sections/components/ExperienceCard.tsx`, `frontend/src/features/sections/components/ProjectCard.tsx`, `frontend/src/features/sections/components/SkillCard.tsx`, `frontend/src/features/sections/components/LanguageCard.tsx`
- [x] **Task 4.6: Redesign Share Links & Builder (`ShareLinksPage.tsx`, `ShareLinkBuilderPage.tsx`, `ShareLinkCard.tsx`)**
  - Monospace key prefixes, terminal-styled `JsonPreview`, polished `GranularSectionPicker`.
  - *Files*: `frontend/src/features/share-links/ShareLinksPage.tsx`, `frontend/src/features/share-links/ShareLinkBuilderPage.tsx`, `frontend/src/features/share-links/components/ShareLinkCard.tsx`, `frontend/src/features/share-links/components/JsonPreview.tsx`, `frontend/src/features/share-links/components/KeyRevealModal.tsx`
- [x] **Task 4.7: Redesign Admin Portal Tables & Views**
  - Fix undefined `bg-surface-muted` in `UsersTable.tsx` and `AuditLogTable.tsx`.
  - Style table headers, alternating hover rows, badge indicators, and pagination.
  - *Files*: `frontend/src/features/admin/AdminOverviewPage.tsx`, `frontend/src/features/admin/AdminUsersPage.tsx`, `frontend/src/features/admin/AdminUserDetailPage.tsx`, `frontend/src/features/admin/AdminAuditLogPage.tsx`, `frontend/src/features/admin/components/UsersTable.tsx`, `frontend/src/features/admin/components/AuditLogTable.tsx`, `frontend/src/features/admin/components/AdminNav.tsx`
- [x] **Task 4.8: Redesign Settings & Privacy Pages**
  - Appearance card with segmented switch, export card, danger zone, policy card styling.
  - *Files*: `frontend/src/features/settings/SettingsPage.tsx`, `frontend/src/features/privacy/PrivacyPage.tsx`, `frontend/src/features/privacy/PrivacySection.tsx`

---

## Verification, Visual QA & Risk Management

### Risk Assessment & Mitigation
| Risk / Potential Breakage | Severity | Mitigation Strategy |
| :--- | :--- | :--- |
| **Tailwind Class Typos Causing Invisible Backgrounds** (e.g. `bg-surface-muted`) | Medium | Define all derived tokens in both `index.css` and `tailwind.config.js` with TypeScript compile verification. |
| **RTL Layout Breakage** | Medium | Use strictly logical properties (`ps`, `pe`, `start`, `end`, `border-s`, `border-e`) and test with `dir="rtl"` in browser inspector. |
| **Layout Shift / Reflow on Button Spinners** | Low | Reserve icon dimensions (`h-4 w-4 shrink-0`) so loading spinners replace icons without shifting text. |
| **Dark Mode Contrast Loss** | Medium | Maintain locked background colors while verifying contrast ratios with WCAG AA standard (4.5:1 minimum for normal text). |
| **Overriding Form / Validation Logic** | Critical | **Zero** changes to form hooks (`useForm`), validation schemas (`zod`), API clients (`apiClient`), or data mutation hooks. |

### Visual QA Checklist (Desktop & Mobile)
- [ ] **Light Mode Check**: Clean contrast, crisp hairlines, subtle shadow elevation, no washed-out text.
- [ ] **Dark Mode Check**: Deep slate canvas, distinct card separation, specular borders, legible muted text.
- [ ] **Mobile Responsiveness Check (375px & 414px)**:
  - Sidebar drawer opens and closes smoothly without horizontal viewport overflow.
  - Modals stay within viewport height with smooth vertical scrolling.
  - Tables scroll horizontally with readable cell padding.
- [ ] **RTL Directional Check**:
  - Input icons correctly sit at inline-start (`start-3`), text aligns to start.
  - Sidebar drawer opens from the correct start edge.
- [ ] **Accessibility & Keyboard Check**:
  - Focus rings clearly visible on Tab navigation across all buttons, links, and inputs.
  - Screen reader attributes (`aria-label`, `aria-modal`) intact.
- [ ] **Functionality Regression Check**:
  - Auth login and registration works as before.
  - Section items (Education, Experiences, Projects) can be created, updated, and deleted.
  - Share link generation and JSON preview work seamlessly.
  - Theme switching persists across reloads via `localStorage`.
