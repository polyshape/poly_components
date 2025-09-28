# @polyutils/components

Reusable React components for your projects.

## Installation

Install via npm:

```bash
npm install @polyutils/components
```

Make sure your project has **React** and **ReactDOM** installed (they are peer dependencies):

```bash
npm install react react-dom
```

**React Router DOM is optional.**
If you want automatic URL-based pagination, install it:

```bash
npm install react-router-dom
```

### Font Awesome Requirement

This package uses [Font Awesome](https://fontawesome.com).  
Ensure Font Awesome is loaded in your project:

**Option 1 — via CDN:**

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
/>
```

**Option 2 — via npm:**

```bash
npm install @fortawesome/fontawesome-free
```

And import it once in your app:

```ts
import "@fortawesome/fontawesome-free/css/all.min.css";
```

## Usage

### Example: Tabs

```tsx
import { useState } from "react";
import { Tabs, type Tab } from "@polyutils/components";

const tabs: Tab[] = [
  { key: 'tab_1', label: 'Tab 1', content: <div>Tab 1</div> },
  { key: 'tab_2', label: 'Tab 2', content: <div>Tab 2</div> },
];

export function TabsExample() {
  return (
    <Tabs
      tabs={tabs}
      defaultActive="tab_1"
      onChange={(key) => console.log('Tab changed', key)}
    />
  );
}

// Controlled usage
export function ControlledTabsExample() {
  const [active, setActive] = useState<Tab['key']>('tab_1');
  return <Tabs tabs={tabs} active={active} onChange={setActive} />;
}
```

Tabs manages its own active state when you provide `defaultActive`. Pass `active` to fully control it and handle `onChange` for side effects.

### Example: Pagination

```tsx
import { Pagination, usePagination } from "@polyutils/components";

const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

function Example() {
  // Automatically syncs with browser URL if React Router is configured
  const { visible, currentPage, totalPages, setPage } = usePagination(items, 5);

  return (
    <div>
      <ul>
        {visible.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setPage={setPage}
        delta={2}
      />
    </div>
  );
}
```

#### React Router Integration

To enable automatic URL synchronization with React Router, call the setup function once in your app's main entry point:

```tsx
// In your main.tsx/main.ts
import { setup } from "@polyutils/components/pagination/enableRouterIntegration";
import { useSearchParams } from "react-router-dom";

setup({ useSearchParams });
```

After setup, `usePagination` will automatically:

- Read the current page from URL parameters (`?page=3`)
- Update the URL when pagination changes
- Work with browser back/forward navigation
- Fall back to local state if React Router is not available

#### Manual State Management

You can provide custom page state management via options:

```tsx
const [page, setPage] = useState(1);
const { visible, currentPage, totalPages } = usePagination(items, 5, {
  getPage: () => page,
  setPageParam: setPage,
});
```

Use `getPage` and `setPageParam` options when you want full control over pagination state, or when using a different routing solution.

### Example: Button

```tsx
import { Button } from "@polyutils/components";

export function ButtonShowcase() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {/* Appearances */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Button appearance="primary">Primary</Button>
        <Button appearance="secondary">Secondary</Button>
        <Button appearance="outline">Outline</Button>
        <Button appearance="subtle">Subtle</Button>
        <Button appearance="transparent">Transparent</Button>
        <Button appearance="danger">Danger</Button>
      </div>

      {/* Sizes & shapes */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
        <Button shape="square">Square</Button>
        <Button shape="circular" icon={<i className="fa-solid fa-star" />} aria-label="Star" iconOnly />
      </div>

      {/* Icons and loading */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <Button icon={<i className="fa-solid fa-plus" />}>Add</Button>
        <Button iconAfter={<i className="fa-solid fa-arrow-right" />}>Next</Button>
        <Button loading appearance="primary">Loading…</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  );
}
```

### Example: Button dropdown

Turn any Button into a dropdown trigger by passing `menuItems`. Items can be anchors, spans, or even another Button. Use `menuTrigger` to choose hover/click behavior and `hideChevron` to remove the chevron if you prefer an icon-only look.

```tsx
import { Button } from "@polyutils/components";

export function ButtonDropdownExample() {
  return (
    <Button
      menuTrigger="click" // 'hover' | 'click' | 'both' (default: 'hover')
      styles={{
        dropdown: { minWidth: 220 },
        dropdownArrow: {
          size: 10,            // px
          top: 4,              // px from dropdown top
          right: '24px',       // or left: '50%'
          background: 'var(--pc-bg)',
          borderColor: 'var(--pc-border)',
          // offsetX: -6,     // optional nudge after auto-alignment
        },
      }}
      menuItems={[
        <a href="#docs" key="a" onClick={e => e.preventDefault()}>Anchor Item</a>,
        <span key="s">Span Item</span>,
        <Button key="b" appearance="subtle" size="small">Button Item</Button>,
      ]}
    >
      Actions
    </Button>
  );
}
```

Notes

- The small arrow aligns under the chevron; if you set `hideChevron`, it centers under the button. You can nudge it with `styles.dropdownArrow.offsetX` or fully override using `left`/`right`.

### Example: Toast Notifications

Toast notifications for displaying temporary messages to users. Add the `Toast` component once to your app, then use the `toast` function anywhere to trigger notifications.

#### Basic Usage

```tsx
import { Toast, toast } from "@polyutils/components";

// 1. Add Toast component once to your app (e.g. App.tsx or main.tsx)
export function App() {
  return (
    <div>
      {/* Your app content */}
      <main>
        <h1>My Application</h1>
        {/* ... rest of your app */}
      </main>
      
      {/* Add Toast component once and forget about it */}
      <Toast />
    </div>
  );
}

// 2. Use toast function anywhere in your app
export function ExampleComponent() {
  const handleSuccess = () => {
    toast.success('Operation completed successfully!');
  };

  const handleError = () => {
    toast.error('Something went wrong. Please try again.');
  };

  const handleWarning = () => {
    toast.warning('Please check your input before continuing.');
  };

  const handleInfo = () => {
    toast.info('New features are now available!');
  };

  const handleCustom = () => {
    toast.success('File uploaded successfully!', {
      title: 'Upload Complete',
      duration: 8000 // 8 seconds
    });
  };

  const handlePersistent = () => {
    toast.warning('Your session will expire soon', {
      duration: 0 // Won't auto-close
    });
  };

  return (
    <div>
      <button onClick={handleSuccess}>Success Toast</button>
      <button onClick={handleError}>Error Toast</button>
      <button onClick={handleWarning}>Warning Toast</button>
      <button onClick={handleInfo}>Info Toast</button>
      <button onClick={handleCustom}>Custom Options</button>
      <button onClick={handlePersistent}>Persistent Toast</button>
      
      <button onClick={() => toast.clear()}>Clear All Toasts</button>
    </div>
  );
}

// Custom icon and close button
<Toast
  icons={{ success: <i className="fa-solid fa-thumbs-up" style={{ color: 'lime' }} /> }}
  closeIcon={<i className="fa-solid fa-circle-xmark" />}
  showLoadingBar={false}
  pauseOnHover
  theme="colored"
/>

// Custom styles
<Toast
  styles={{
    toast: { borderRadius: 16, fontSize: 16 },
    closeButton: { color: '#333' },
  }}
/>
```

**Features:**

- **Simple API**: Just call `toast.success()`, `toast.error()`, `toast.warning()`, or `toast.info()`
- **Flexible positioning**: Render toasts in any corner with the `position` prop
- **Auto-removal**: Configurable duration (default 5 seconds)
- **Manual dismissal**: Built-in close button (hidden automatically when `dismissOnClick` is true)
- **Drag-to-dismiss**: Enable swipe gestures with `draggable="touch"` (default) or `draggable="always"`
- **Stacking**: Turn on `stacked` for a deck-style presentation
- **Optional titles**: Add context with custom titles
- **Persistent toasts**: Set `duration: 0` to prevent auto-close
- **Animations**: Smooth slide-in/slide-out transitions
- **Pause on hover**: Set `pauseOnHover` to pause both the loading bar and dismiss countdown
- **Custom icons and close button**: Pass `icons` and `closeIcon` props to customize
- **Theme prop**: Use the `theme` prop to control the toast appearance. Options:

  - `sync` (default): Syncs the toaster colors with the poly-components library
  - `dark`: Dark background, light text
  - `light`: Light background, dark text
  - `colored`: Type-based background and white icons
- **Show/hide loading bar**: Use `showLoadingBar` to toggle the progress bar
- **Imperative helpers**: Call `toast.pause(id)`, `toast.play(id)`, and `toast.isActive(id)` for fine-grained control

#### Toast component props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `position` | `'topRight' \| 'topCenter' \| 'topLeft' \| 'bottomRight' \| 'bottomCenter' \| 'bottomLeft'` | `topRight` | Where the toast stack appears. |
| `stacked` | `boolean` | `false` | Enables a deck-style cluster with hover expansion. |
| `draggable` | `'touch' \| 'always' \| 'never'` | `touch` | Allows swipe-to-dismiss gestures (`touch` targets touch/pen devices). |
| `showLoadingBar` | `boolean` | `true` | Toggles the progress bar for timed toasts. |
| `pauseOnHover` | `boolean` | `false` | Suspends the dismiss timer while hovered. |
| `theme` | `'sync' \| 'dark' \| 'light' \| 'colored'` | `sync` | Controls the toast color palette. |
| `styles` | `ToastStyleOverrides` | - | Fine-grained style overrides for the container, title, message, etc. |
| `icons` | `ToastIconOverrides` | - | Override the default icon per toast type (or hide with `null`). |
| `closeIcon` | `ReactNode \| null` | - | Provide a custom close icon or `null` to remove the button. |
| `role` | `string` | - | Override the ARIA role on the container (e.g., `status` or `alert`). |

#### Toast options (used with `toast.success`, `toast.error`, etc.)

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | - | Optional headline displayed above the message. |
| `duration` | `number` | `5000` | Auto-dismiss after the given milliseconds (`0` means persistent). |
| `dismissOnClick` | `boolean` | `false` | Allow clicking the body of the toast to dismiss it (hides the close button). |
| `paused` | `boolean` | `false` | Start the toast in a paused state until you call `toast.play(id)`. |

#### Imperative helpers

```tsx
const id = toast.success('Saved!');

toast.pause(id);            // freeze the countdown
// ...later
toast.play(id);      // resume the timer

if (!toast.isActive(id)) {
  console.log('Toast already dismissed');
}
```

### Example: Nav (top/side) and NavSmall (mobile)

Nav with `variant="top"` automatically switches to the mobile overlay navigation below the configured breakpoint. By default, `responsiveBreakpoint` is `850` (px). You usually do not need to import or render `NavSmall` yourself — just use `Nav` and adjust `responsiveBreakpoint` if needed.

Tip

- `responsiveBreakpoint={0}` disables the mobile switch entirely (NavSmall is never used).
- Using a very large number (e.g., `responsiveBreakpoint={Number.MAX_SAFE_INTEGER}`) forces the mobile overlay at all widths.

```tsx
import { Nav, NavSmall, type NavItem } from "@polyutils/components";

const items: NavItem[] = [
  { id: 'home', label: 'Home', href: '/home' },
  {
    id: 'products',
    label: 'Products',
    href: '/products',
    items: [
      { id: 'laptops', label: 'Laptops', href: '/products/laptops' },
      { id: 'phones', label: 'Phones', href: '/products/phones' },
    ],
  },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

// Top navigation with responsive switch to NavSmall under 850px
export function TopNav() {
  return (
    <Nav
      items={items}
      variant="top"
      responsiveBreakpoint={850} // configurable; defaults to 850
      // Disable underline if desired
      // showActiveUnderline={false}
    />
  );
}

// Side navigation (left rail)
export function SideNav() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: 300 }}>
      <Nav items={items} variant="side" defaultOpenIds={["products"]} />
      <div style={{ padding: 16 }}>Content</div>
    </div>
  );
}

// Mobile-only overlay nav (use directly if you want to control when it renders)
export function MobileOverlayNav() {
  return <NavSmall items={items} />;
}
```

With React Router, you can pass `as={NavLink}` and the Nav will set `to`/`href` as appropriate. You can also choose which prop to use via `linkProp`.

```tsx
import { Nav } from "@polyutils/components";
import { MemoryRouter, NavLink } from "react-router-dom";

export function TopNavWithRouter() {
  return (
    <MemoryRouter initialEntries={["/home"]}>
      <Nav items={items} variant="top" as={NavLink} />
    </MemoryRouter>
  );
}
```

#### Button className and inline styles

`Button` accepts `className` for custom classes and a `styles.root` object for inline overrides. Border shorthands are normalized (e.g., `border: "2px dashed red"`).

```tsx
// className example
<Button className="my-button" appearance="outline">Custom Class</Button>

// styles example (inline overrides win)
<Button
  appearance="secondary"
  styles={{
    root: {
      border: "2px dashed #D69D0D", // normalized to width/style/color
      padding: "0.75rem 1.25rem",
    },
  }}
>
  Styled Secondary
  
</Button>
```

## Styling

This package now uses **Griffel** for styling. All default styles (including hover, disabled, and active states) are built-in and automatically applied.

### Overriding styles

You can override specific styles using the `styles` prop. Inline overrides take precedence over default Griffel styles.

```tsx
<Pagination
  totalPages={totalPages}
  currentPage={currentPage}
  setPage={setPage}
  delta={2}
  styles={{
    root: { gap: "0.6rem" },
    button: { borderRadius: 4 },
    buttonActive: { background: "#fee", fontWeight: 900 },
    buttonDisabled: { opacity: 0.4 },
    ellipsis: { color: "#666" },
  }}
/>
```

Notes:

- Hover and active state visuals are included by default and require no extra CSS.
- For global theming, wrap your app in a custom Griffel renderer if needed.

## Theming

This library includes a simple theme system with a provider and hook.

### ThemeProvider Setup

```tsx
import { ThemeProvider, ThemeToggle } from "@polyutils/components";

export function App() {
  return (
    <ThemeProvider initialTheme="light">
      <header>
        <h1>My App</h1>
        <ThemeToggle appearance="subtle" size="medium" />
      </header>
      <main>
        {/* All content here gets automatic baseline theming */}
        <p>This paragraph, <a href="#">links</a>, and other elements are automatically themed.</p>
        <button>Regular HTML elements look great!</button>
      </main>
    </ThemeProvider>
  );
}
```

The ThemeProvider:

- Applies `theme-light`/`theme-dark` classes on `:root`
- Sets core CSS variables used by components: `--pc-fg`, `--pc-bg`, `--pc-border`, `--pc-accent`, `--pc-muted`
- Additionally, Tabs can read `--pc-card` if you define them
- Persists the last theme to `localStorage`
- Listens to OS theme changes when no explicit user choice has been made
- **Applies baseline styles to `<main>` elements automatically** for a polished, themed HTML experience

### Alternative: Custom containers

If you can't use `<main>` (e.g., multiple content areas), use the `scope` prop:

```tsx
<ThemeProvider scope=".app">
  <div className="app">
    {/* This div now gets the same baseline theming as <main> */}
    <p>Themed content with <a href="#">styled links</a></p>
  </div>
</ThemeProvider>
```

You can target multiple selectors: `scope=".app, .content, [data-theme-scope]"`

**Note:** The `scope` prop works *in addition* to `<main>` - both will receive baseline theming.

### Custom control with useTheme

```tsx
import { useTheme } from "@polyutils/components";

function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme ({theme})
    </button>
  );
}
```

### Overriding CSS variables

You can override the variables globally (e.g., for branding), for example:

```tsx
<ThemeProvider>
  <div
    style={{
      // customize variables in scope
      ['--pc-accent' as any]: '#0EA5E9',
      ['--pc-border' as any]: 'rgba(0,0,0,0.16)',
    }}
  >
    <Button appearance="primary">Brand Primary</Button>
  </div>
  {/* rest of app */}
  
</ThemeProvider>
```

Note: Components use these variables with sensible fallbacks, so existing styles continue to work without the provider.

### Update theme via plain CSS (no JS)

You can define the variables in your global CSS so they apply everywhere without inline styles. The `ThemeProvider` will toggle `theme-light` / `theme-dark` classes on `:root`.

Create a CSS file (e.g., `theme.css`):

```css
:root.theme-light {
  --pc-fg: #111111;
  --pc-bg: #ffffff;
  --pc-border: rgba(0, 0, 0, 0.12);
  --pc-accent: #D69D0D; /* brand accent */
}

:root.theme-dark {
  --pc-fg: #e7e7e7;
  --pc-bg: #0b0b0b;
  --pc-border: rgba(255, 255, 255, 0.18);
  --pc-accent: #D69D0D; /* same accent across themes (customize if desired) */
}
```

Import it once in your app entry (e.g., `main.tsx` or `App.tsx`):

```ts
import './theme.css';
```

From there, components like `Button` will pick up your CSS variables automatically.

Note: ThemeProvider respects your CSS overrides. If you define a token in your stylesheet (e.g., `:root.theme-dark { --pc-accent: #0EA5E9 }`), the provider won’t overwrite it. It only sets defaults for tokens that aren’t already defined, and then updates its own managed tokens on theme change.

### Override tokens via ThemeProvider

If you prefer passing overrides from code instead of CSS, supply a `tokens` prop. These values take precedence over both defaults and external CSS.

```tsx
import { ThemeProvider, type ThemeTokens } from "@polyutils/components";

const tokens: ThemeTokens = {
  "--pc-accent": "#0EA5E9",
  "--pc-bg": "#0e1424",
};

<ThemeProvider
  initialTheme="dark"
  tokens={tokens}
>
  <App />
</ThemeProvider>
```

### Pagination theming tokens

Pagination reads a small set of CSS variables. Defaults are provided, but you can override globally or per-scope.

- `--pc-page-bg`: button tile background (defaults to `var(--arrow-bg, rgba(255,255,255,0.5))` light, `var(--arrow-bg, rgba(255,255,255,0.04))` dark)
- `--pc-page-border`: tile border color (defaults to `var(--border, …)`)
- `--pc-page-hover-bg`: hover background (`color-mix` of `var(--primary-link, var(--pc-accent))` over `--pc-page-bg` at 12%)
- `--pc-page-active-bg`: active background (same mix at 18%)
- `--pc-page-active-border`: active border (mix with `var(--primary-link, var(--pc-accent))` over `var(--border)`, 40%)
- `--pc-page-ellipsis`: ellipsis color (falls back to `var(--muted)` then `inherit`)

Example (aligns with the defaults):

```css
:root.theme-dark {
  --arrow-bg: rgba(255,255,255,0.04);
  --border: rgba(255,255,255,0.08);
  --primary-link: #D69D0D;
  /* Optional explicit overrides */
  /* --pc-page-hover-bg: color-mix(in srgb, var(--primary-link) 12%, var(--arrow-bg)); */
  /* --pc-page-ellipsis: #cfd6e4; */
}

:root.theme-light {
  --arrow-bg: rgba(255,255,255,0.5);
  --border: rgba(0,0,0,0.12);
  --primary-link: #D69D0D;
}
```

### Spinner and Loading Overlay

This package includes a spinner (`Spinner`) and a global loading overlay (`LoadingOverlay`) managed by a lightweight context (`LoadingProvider`, `useLoading`).

- Render a spinner inline: use `Spinner` (defaults to `color: var(--pc-accent)`).
- Add a global overlay: wrap your app with `LoadingProvider`, place a single `LoadingOverlay` near the root, and call `useLoading().setLoadingState('loading' | null)` from anywhere to show/hide it.

#### Suspense example

You can toggle the global overlay automatically during lazy loading by using `LoadingSpinnerFallback` as a Suspense fallback.

```tsx
import React, { Suspense } from 'react';
import { LoadingProvider, LoadingOverlay, LoadingSpinnerFallback } from '@polyutils/components';

const LazyPage = React.lazy(() => import('./LazyPage'));

export function App() {
  return (
    <LoadingProvider>
      {/* Place once near the root so it can show for any loading state */}
      <LoadingOverlay />

      {/* When Suspense mounts the fallback, the overlay shows; it hides on unmount */}
      <Suspense fallback={<LoadingSpinnerFallback />}>
        <LazyPage />
      </Suspense>
    </LoadingProvider>
  );
}
```

Tip: For local demos, pass `dismissOnClick` to `LoadingOverlay` to allow clicking the backdrop to hide it.
