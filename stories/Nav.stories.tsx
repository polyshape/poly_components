import NavSmall from '../src/nav/NavSmall';
import { MemoryRouter, NavLink } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';
import { Nav, type NavItem, Button, ThemeToggle } from '../src';
import React from "react";

const meta: Meta<typeof Nav> = {
  title: 'Components/Nav',
  component: Nav,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['top', 'side'] },
    as: { table: { disable: true } },
    linkProp: {
      control: { type: 'text' },
      table: { disable: false },
      description: 'Prop name for navigation (e.g., "href", "to")',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Nav>;


const stop: React.MouseEventHandler = (e) => e.preventDefault();

const sample: NavItem[] = [
  { id: 'home', label: 'Home', href: '/home', end: true },
  {
    id: 'products',
    label: 'Products',
    to: '/products',
    onClick: stop,
    items: [
      { id: 'laptops', label: 'Laptops', to: '/products/laptops' },
      { id: 'phones', label: 'Phones', to: '/products/phones' },
      { id: 'accessories', label: 'Accessories', to: '/products/accessories' },
    ],
  },
  {
    id: 'partners',
    label: 'Partners',
    to: '/partners',
    onClick: stop,
    items: [
      { id: 'new-partner1', label: 'Partner 1', to: '/partners/new-partner1' },
      { id: 'new-partner2', label: 'Partner 2', to: '/partners/new-partner2' },
      { id: 'new-partner3', label: 'Partner 3', to: '/partners/new-partner3' },
      { id: 'new-partner4', label: 'Partner 4', to: '/partners/new-partner4' },
    ],
  },
  {
    id: 'customers',
    label: 'Customers',
    to: '/customers',
    onClick: stop,
    items: [
      { id: 'new-customer1', label: 'Customer 1', to: '/customers/new-customer1' },
      { id: 'new-customer2', label: 'Customer 2', to: '/customers/new-customer2' },
      { id: 'new-customer3', label: 'Customer 3', to: '/customers/new-customer3' },
      { id: 'new-customer4', label: 'Customer 4', to: '/customers/new-customer4' },
    ],
  },
  {
    id: 'company',
    label: 'Company',
    to: '/company',
    onClick: stop,
    items: [
      { id: 'about', label: 'About', to: '/company/about' },
      { id: 'careers', label: 'Careers', to: '/company/careers' },
    ],
  },
  { id: 'portfolio', label: 'Portfolio', to: '/portfolio', },
  { id: 'news', label: 'News', to: '/news', },
  { id: 'contact', label: 'Contact', to: '/contact', },
  { id: 'about_us', label: 'About', to: '/about_us', },
];

const sampleNoRouting: NavItem[] = [
  { id: 'home', label: 'Home', href: '/home', onClick: stop },
  {
    id: 'products',
    label: 'Products',
    href: '/products',
    onClick: stop,
    items: [
      { id: 'laptops', label: 'Laptops', href: '/products/laptops', onClick: stop },
      { id: 'phones', label: 'Phones', href: '/products/phones', onClick: stop },
      { id: 'accessories', label: 'Accessories', href: '/products/accessories', onClick: stop },
    ],
  },
  {
    id: 'partners',
    label: 'Partners',
    href: '/partners',
    onClick: stop,
    items: [
      { id: 'new-partner1', label: 'Partner 1', href: '/partners/new-partner1', onClick: stop },
      { id: 'new-partner2', label: 'Partner 2', href: '/partners/new-partner2', onClick: stop },
      { id: 'new-partner3', label: 'Partner 3', href: '/partners/new-partner3', onClick: stop },
      { id: 'new-partner4', label: 'Partner 4', href: '/partners/new-partner4', onClick: stop },
    ],
  },
  {
    id: 'customers',
    label: 'Customers',
    href: '/customers',
    onClick: stop,
    items: [
      { id: 'new-customer1', label: 'Customer 1', href: '/customers/new-customer1', onClick: stop },
      { id: 'new-customer2', label: 'Customer 2', href: '/customers/new-customer2', onClick: stop },
      { id: 'new-customer3', label: 'Customer 3', href: '/customers/new-customer3', onClick: stop },
      { id: 'new-customer4', label: 'Customer 4', href: '/customers/new-customer4', onClick: stop },
    ],
  },
  {
    id: 'company',
    label: 'Company',
    href: '/company',
    onClick: stop,
    items: [
      { id: 'about', label: 'About', href: '/company/about', onClick: stop },
      { id: 'careers', label: 'Careers', href: '/company/careers', onClick: stop },
    ],
  },
  { id: 'portfolio', label: 'Portfolio', href: '/portfolio', onClick: stop },
  { id: 'news', label: 'News', href: '/news', onClick: stop },
  { id: 'contact', label: 'Contact', href: '/contact', onClick: stop },
  { id: 'about_us', label: 'About', href: '/about_us', onClick: stop },
];

export const Top: Story = {
  args: { items: sampleNoRouting, variant: 'top' },
  render: (args) => <Nav {...args} />,
};

export const TopNoPadding: Story = {
  args: {
    items: sampleNoRouting, variant: 'top'
  },
  parameters: { layout: 'fullscreen' },
  render: (args) => <Nav {...args} />,
};

export const Side: Story = {
  args: { items: sampleNoRouting, variant: 'side', defaultOpenIds: ['partners', 'company'] },
  render: (args) => {
    const isSide = args.variant === 'side';
    const gridStyle = isSide
      ? { display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: 240 }
      : { display: 'grid', gridTemplateRows: '56px 1fr', minHeight: 240 };
    return (
      <div style={gridStyle}>
        <Nav {...args} />
        <div style={{ padding: 16 }}>Content</div>
      </div>
    );
  },
};

export const WithNavLink: Story = {
  args: { items: sample, variant: 'top', as: NavLink },
  render: (args) => (
    <MemoryRouter initialEntries={['/home']}>
      <Nav {...args} />
    </MemoryRouter>
  ),
};

export const PlainTextItem: Story = {
  args: {
    items: [
      { id: 'plain', label: 'Plain Text' },
      { id: 'link', label: 'Link', href: '/link', onClick: stop },
    ],
    variant: 'top',
  },
  render: (args) => <Nav {...args} />,
};

export const MobileOverlay: Story = {
  args: { items: sampleNoRouting, defaultOpenIds: ['partners', 'company'] },
  argTypes: {
    variant: { table: { disable: true } },
    showBorder: { table: { disable: true } },
    defaultOpenIds: { table: { disable: true } },
  },
  render: (args) => SmallNavOverlayDemo(args),
};

export const MobileOverlayWithNavLink: Story = {
  args: { items: sample, as: NavLink },
  argTypes: {
    variant: { table: { disable: true } },
    showBorder: { table: { disable: true } },
    defaultOpenIds: { table: { disable: true } },
  },
  render: (args) => SmallNavOverlayDemo(args, true),
};

export const MobileOverlayNoContainer: Story = {
  args: { items: sampleNoRouting },
  argTypes: {
    variant: { table: { disable: true } },
    showBorder: { table: { disable: true } },
    defaultOpenIds: { table: { disable: true } },
  },
  render: (args) => <NavSmall {...args} />,
};

// Top bar with brand logo, an action button, then Nav
export const TopWithBrandAndActions: Story = {
  args: { items: sample, variant: 'top', as: NavLink },
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <MemoryRouter initialEntries={['/home']}>
      <div className="demo-topbar" style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '8px 12px',
        background: 'var(--pc-nav-bg)'
      }}>
        {/* Brand */}
        <a className="demo-brand" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'var(--pc-fg)' }}>
          <img src="https://dummyimage.com/80x24/3406c9/e0e0e0.png&text=Brand" alt="Brand" style={{ display: 'block', width: 80, height: 24, objectFit: 'contain' }} />
        </a>
        {/* Action button (e.g., theme toggle) */}
        <Button appearance="secondary" size="small">Action</Button>
        {/* Nav grows to fill remaining space */}
        <div style={{ flexGrow: 1, minWidth: 0 }}>
          <Nav
            {...args}
            responsiveBreakpoint={500}
            showBorder={false}
            styles={{
              root: { flexGrow: 1 },
              menu: { gap: '1.7rem' },
              subMenu: { backgroundColor: 'var(--pc-nav-bg)', minWidth: '200px' },
              bar: { paddingTop: '8px', paddingRight: '0px' },
              link: { color: 'var(--pc-fg)', fontSize: '1.2rem', fontWeight: 600 },
              subLink: { fontWeight: 700, padding: '.7rem .9rem' },
            }}
          />
        </div>
      </div>
    </MemoryRouter>
  ),
};

// Consumer-like layout: brand, toggle, then Nav as last; centered row with max-width
export const TopConsumerCenteredSpaceBetween: Story = {
  args: { items: sample, variant: 'top', as: NavLink },
  parameters: { layout: 'fullscreen' },
  render: (args) => {
    const [slotWidth, setSlotWidth] = React.useState<number | null>(null);
    const slotRef = React.useRef<HTMLDivElement | null>(null);

    React.useLayoutEffect(() => {
      const el = slotRef.current;
      if (!el) return;
      const seed = () => {
        const w = el.getBoundingClientRect().width;
        if (w > 8) setSlotWidth(w);
      };
      const id = requestAnimationFrame(seed);
      const ro = new ResizeObserver(([entry]) => {
        const next = entry?.contentRect?.width ?? 0;
        if (next > 8) setSlotWidth(next);
      });
      ro.observe(el);
      return () => { cancelAnimationFrame(id); ro.disconnect(); };
    }, []);

    return (
      <MemoryRouter initialEntries={['/home']}>
        <div style={{ width: '100%', background: 'var(--pc-nav-bg)', borderBottom: '1px solid var(--pc-border)' }}>
          <div style={{
            margin: '0 auto',
            padding: '8px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            maxWidth: 1200,
          }}>
            {/* Brand */}
            <a style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'var(--pc-fg)' }}>
              <img src="https://dummyimage.com/96x28/3406c9/e0e0e0.png&text=Brand" alt="Brand" style={{ width: 96, height: 28, objectFit: 'contain' }} />
            </a>
            {/* Toggle */}
            <Button appearance="secondary" size="small" style={{ width: 64 }}>Toggle</Button>
            {/* Nav slot measured */}
            <div ref={slotRef} style={{ flex: '1 1 0px', minWidth: 0 }}>
              <Nav
                {...args}
                // Prefer explicit width; fallback to self-measure
                overflowAvailableWidth={typeof slotWidth === 'number' ? slotWidth : undefined}
                overflowMeasure="self"
                showBorder={false}
                responsiveBreakpoint={500}
                styles={{
                  root: { flex: '1 1 auto', minWidth: 0 },
                  bar: { paddingTop: '8px', paddingRight: 0, width: '100%' },
                  menu: { gap: '1.7rem' },
                  subMenu: { backgroundColor: 'var(--pc-nav-bg)', minWidth: '200px' },
                  link: { color: 'var(--pc-fg)', fontSize: '1.1rem', fontWeight: 600 },
                  subLink: { fontWeight: 700, padding: '.7rem .9rem' },
                }}
              />
            </div>
          </div>
        </div>
      </MemoryRouter>
    );
  },
};

// Exact consumer-like markup + CSS provided by user
export const TopExactConsumerLayout: Story = {
  args: { items: sample, variant: 'top', as: NavLink },
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <MemoryRouter initialEntries={['/home']}>
      <>
        <style>{`
        .nav {
          z-index: 2000;
          display: flex;
          background: var(--pc-nav-bg);
          backdrop-filter: blur(6px) saturate(1.05);
          border-bottom: 1px solid var(--border);
        }
        .nav__inner {
          margin: 0 auto;
          padding: 0.45rem 1.6rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--pc-nav-bg);
          gap: 3rem;
        }
        .brand__logo {
          height: 44px;
          display: block;
        }
        .menu { display: flex; }
        .menu > *:not(:last-child) {
          margin-right: 3.5rem;
          align-items: center;
        }
        .menu__item {
          color: var(--fg);
          text-decoration: none;
          font-weight: 600;
          font-size: 1.2rem;
          padding-bottom: 0.4rem;
          position: relative;
          transition: opacity 160ms ease, color 160ms ease;
        }
        .theme-toggle {
          background: #0e0e0e !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          padding: 0.3rem 0.5rem;
          margin-left: 0.75rem;
          width: 4rem;
          height: 2.5rem;
        }
        .theme-toggle:hover { opacity: 0.75; }
        `}</style>

        <div className="nav">
          <div className="nav__inner">
            <NavLink className="brand" to={'/home'}>
              <picture>
                <source srcSet="/logo.webp" type="image/webp" />
                <img src="/logo.png" alt="Brand" className="brand__logo" />
              </picture>
            </NavLink>
            <ThemeToggle className="theme-toggle" />
            <Nav
              {...args}
              items={sample}
              showBorder={false}
              responsiveBreakpoint={500}
              styles={{
                root: { flex: '1 1 auto', minWidth: 0 },
                menu: { gap: '1.7rem' },
                subMenu: { backgroundColor: 'var(--pc-nav-bg)', minWidth: '200px' },
                bar: { width: '100%', paddingTop: '8px', paddingRight: '0px' },
                link: { color: 'var(--pc-fg)', fontSize: '1.2rem', fontWeight: 600 },
                subLink: { fontWeight: 700, padding: '.7rem .9rem' },
              }}
            />
          </div>
        </div>
      </>
    </MemoryRouter>
  ),
};

function SmallNavOverlayDemo(args: any, withMemoryRouter = false) {
  const [width, setWidth] = React.useState(600);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isResizing = React.useRef(false);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      let newWidth = e.clientX - rect.left;
      newWidth = Math.max(320, Math.min(newWidth, 900));
      setWidth(newWidth);
    };
    const handleMouseUp = () => {
      isResizing.current = false;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const { variant: _variant, showBorder: _showBorder, ...navArgs } = args ?? {};
  const navSmallElement = (
    <NavSmall {...navArgs} styles={{ overlay: { position: "absolute", width: "100%", height: "90vh" } }} />
  );

  return (
    <div style={{ background: 'darkgray', padding: '10px' }}>
      <div
        className="navsmall-demo-container"
        ref={containerRef}
        style={{
          background: 'var(--pc-bg)',
          position: 'relative',
          width,
          height: '90vh',
          overflow: 'hidden',
          justifySelf: 'center',
          borderRadius: 18,
          boxShadow: '0 2px 20px rgba(0,0,0,0.5)',
          minWidth: 320,
          maxWidth: 900,
        }}
      >
        {/* Style override to scope overlay to container */}
        <style>{`
          .navsmall-demo-container [class*='overlay'] {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            max-height: 100% !important;
            align-items: flex-start !important;
            justify-content: flex-start !important;
          }
          .navsmall-demo-container [class*='menu'] {
            border-radius: 16px !important;
            margin: 0 !important;
            left: 0 !important;
            right: auto !important;
            margin-left: 0 !important;
            margin-right: auto !important;
            box-shadow: 0 8px 32px rgba(0,0,0,0.18) !important;
          }
          .navsmall-demo-container [class*='closeBtn'] {
            right: auto !important;
            left: 0 !important;
            margin-left: 8px !important;
          }
        `}</style>
        {withMemoryRouter ? (
          <MemoryRouter initialEntries={['/home']}>
            {navSmallElement}
          </MemoryRouter>
        ) : (
          navSmallElement
        )}
        {/* Resize handle */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 12,
            height: '100%',
            cursor: 'ew-resize',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            userSelect: 'none',
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            isResizing.current = true;
          }}
          title="Drag to resize"
        >
          <div style={{ width: 4, height: 40, borderRadius: 2, background: '#888', opacity: 0.5 }} />
        </div>
      </div>
    </div>
  );
}
