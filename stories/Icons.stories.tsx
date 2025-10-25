import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentType, CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Icon } from "../src";
import {
  BellIcon,
  CalendarIcon,
  CameraIcon,
  CheckIcon,
  CircleCheckIcon,
  CircleCloseIcon,
  CircleExclamationIcon,
  CircleHalfFullIcon,
  CircleInfoIcon,
  CircleMinusIcon,
  CirclePlusIcon,
  CircleQuestionIcon,
  CloudsIcon,
  HeartIcon,
  HomeIcon,
  SearchIcon,
  StarIcon,
  UserIcon,
} from "../src/icons";
import { iconPaths, type IconName } from "../src/icons/IconRegistry";
const __TAGS__ = Symbol.for("poly:icon:tags");
const getTags = (name: IconName): string[] => {
  const el = iconPaths[name];
  const comp = el?.type;
  return (comp && comp[__TAGS__]) || [];
};

// Deterministic tag colors: stable palette + hash per tag
const TAG_PALETTE = [
  // Yellows / Oranges
  "#FFE08A",
  "#FFD166",
  "#FFB703",
  "#F8D49B",
  // Reds / Pinks
  "#F7B2B7",
  "#FF9AA2",
  "#FF6B6B",
  "#FF85A1",
  // Purples
  "#BFA6FF",
  "#A78BFA",
  "#C084FC",
  "#9B5DE5",
  // Blues / Cyans
  "#8FD3FF",
  "#7CC9FF",
  "#60A5FA",
  "#38BDF8",
  "#22D3EE",
  // Greens / Mints
  "#8EEACC",
  "#86EFAC",
  "#34D399",
  "#10B981",
  "#B2F5EA",
  // Neutrals
  "#D9D9D9",
  "#CBD5E1",
  "#E2E8F0",
  "#94A3B8",
  // Extras
  "#FDE68A",
  "#F59E0B",
  "#FB923C",
  "#F472B6",
  "#EC4899",
  "#E11D48",
  "#C026D3",
  "#7C3AED",
  "#4F46E5",
  "#0EA5E9",
  "#06B6D4",
  "#0891B2",
  "#14B8A6",
  "#22C55E",
  "#84CC16",
  "#65A30D",
  "#D1FAE5",
  "#E0E7FF",
  "#FAE8FF",
  "#FFE4E6",
  "#F1F5F9",
  "#E5E7EB",
  "#94D2BD",
  "#EE9B00",
] as const;

const hexToRgba = (hex: string, alpha: number) => {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Simple FNV-1a hash for stable index
const hashTag = (s: string): number => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const colorForTag = (
  tag: string,
  isDark: boolean
): { bg: string; border: string } => {
  const idx = hashTag(tag.toLowerCase()) % TAG_PALETTE.length;
  const base = TAG_PALETTE[idx];
  return isDark
    ? { bg: hexToRgba(base, 0.22), border: hexToRgba(base, 0.35) }
    : { bg: hexToRgba(base, 0.35), border: hexToRgba(base, 0.55) };
};

// Simplified theme detection - just check actual background color
const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      // Check the actual background color of the body or main container
      const bodyColor = getComputedStyle(document.body).backgroundColor;
      const documentColor = getComputedStyle(
        document.documentElement
      ).backgroundColor;

      // Convert rgb values to determine if background is dark
      const getRgbValues = (colorStr: string) => {
        const match = colorStr.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
          return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
        }
        return [255, 255, 255]; // default to white if can't parse
      };

      const bodyRgb = getRgbValues(bodyColor);
      const docRgb = getRgbValues(documentColor);

      // Calculate luminance to determine if background is dark
      const getLuminance = (r: number, g: number, b: number) => {
        return 0.299 * r + 0.587 * g + 0.114 * b;
      };

      const bodyLuminance = getLuminance(bodyRgb[0], bodyRgb[1], bodyRgb[2]);
      const docLuminance = getLuminance(docRgb[0], docRgb[1], docRgb[2]);

      // If either body or document has dark background (luminance < 128), consider it dark theme
      const isDarkTheme = bodyLuminance < 128 || docLuminance < 128;

      setIsDark(isDarkTheme);
    };

    // Check immediately and on a slower interval
    checkTheme();
    const interval = setInterval(checkTheme, 500);

    // Watch for class changes that might indicate theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return isDark;
};

// Custom Icon Grid Control Component
const IconGridControl = ({
  value,
  onChange,
  options,
}: {
  value: IconName;
  onChange: (value: IconName) => void;
  options: IconName[];
}) => {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const isDark = useTheme();
  const allTags = useMemo(() => {
    const s = new Set<string>();
    for (const n of options) {
      getTags(n).forEach((t) => s.add(String(t)));
    }
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [options]);

  const filteredIcons = options.filter((name) => {
    const q = search.trim().toLowerCase();
    const hasText = q.length > 0;
    const hasSelected = selectedTags.length > 0;
    if (!hasText && !hasSelected) return true;
    const tags = getTags(name).map(String);
    const nameMatch = hasText && name.toLowerCase().includes(q);
    const tagTextMatch =
      hasText && tags.some((t) => t.toLowerCase().includes(q));
    const selectedMatch =
      hasSelected && tags.some((t) => selectedTags.includes(t));

    // Logic:
    // - If tags are selected: (tag1 OR tag2 ... OR tagn) AND (search text in NAME only)
    // - If no tags selected: search text matches NAME or TAG text
    if (hasText && hasSelected) {
      return selectedMatch && nameMatch;
    }
    // If only tags selected, match any selected tag
    if (hasSelected) return selectedMatch;
    // If only text provided, match name or any tag text
    return nameMatch || tagTextMatch;
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 12,
        border: "1px solid var(--color-border, #e0e0e0)",
        borderRadius: "4px",
        padding: "12px",
        backgroundColor: "var(--color-surface, transparent)",
      }}
    >
      {/* Left: tag list (one per row) */}
      <div
        style={{
          width: 180,
          minWidth: 180,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          overflowY: "auto",
          maxHeight: 660,
        }}
      >
        {allTags.map((tag) => {
          const c = colorForTag(tag, isDark);
          const selected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() =>
                setSelectedTags((prev) =>
                  prev.includes(tag)
                    ? prev.filter((t) => t !== tag)
                    : [...prev, tag]
                )
              }
              title={selected ? `Remove filter: ${tag}` : `Add filter: ${tag}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "80%",
                padding: "6px 8px",
                borderRadius: 8,
                backgroundColor: c.bg,
                border: `1px solid ${c.border}`,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                color: "inherit",
              }}
            >
              <span>{tag}</span>
              {selected ? <Icon name="check" style={{ fontSize: 14 }} /> : null}
            </button>
          );
        })}
      </div>

      {/* Right: search + grid */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          maxHeight: 700,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Search input area with selected tag chips */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 6,
              width: "100%",
              border: "1px solid var(--color-border, #e0e0e0)",
              borderRadius: 8,
              padding: "6px 8px",
              background: "var(--color-surface, transparent)",
              position: "relative",
            }}
          >
            {selectedTags.map((tag) => {
              const c = colorForTag(tag, isDark);
              return (
                <span
                  key={tag}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "3px 6px",
                    borderRadius: 8,
                    backgroundColor: c.bg,
                    border: `1px solid ${c.border}`,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                  }}
                >
                  {tag}
                  <Button
                    appearance="transparent"
                    iconOnly
                    size="small"
                    icon={<Icon name="close" />}
                    onClick={() =>
                      setSelectedTags((prev) => prev.filter((t) => t !== tag))
                    }
                    aria-label={`Remove ${tag}`}
                    title={`Remove ${tag}`}
                    style={{ height: 18, width: 18, minWidth: 18 }}
                  />
                </span>
              );
            })}
            <input
              id="search-field"
              type="text"
              placeholder="Search icons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                minWidth: 80,
                border: "none",
                outline: "none",
                background: "transparent",
                padding: "6px 6px",
                fontSize: "14px",
              }}
            />
            {(search || selectedTags.length > 0) && (
              <Button
                appearance="transparent"
                iconOnly
                size="small"
                icon={<Icon name="close" weight={"bold"} />}
                onClick={() => {
                  setSearch("");
                  setSelectedTags([]);
                }}
                aria-label="Clear search"
                title="Clear search"
                style={{
                  position: "absolute",
                  right: 6,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            )}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
            gap: "8px",
            maxHeight: "600px",
            overflowY: "auto",
            padding: "4px",
          }}
        >
          {filteredIcons.map((iconName) => (
            <div
              key={iconName}
              onClick={() => onChange(iconName)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "8px",
                border: `2px solid ${
                  value === iconName
                    ? "var(--color-primary, #007acc)"
                    : isDark
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.15)"
                }`,
                borderRadius: "4px",
                cursor: "pointer",
                backgroundColor:
                  value === iconName
                    ? "var(--color-primary-bg, rgba(0, 122, 204, 0.1))"
                    : isDark
                      ? "rgba(255, 255, 255, 0.02)"
                      : "rgba(0, 0, 0, 0.05)",
                transition: "all 0.2s ease",
                fontSize: "10px",
                textAlign: "center",
                minHeight: "60px",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                if (value !== iconName) {
                  e.currentTarget.style.backgroundColor = isDark
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.borderColor = isDark
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,0,0,0.25)";
                }
              }}
              onMouseLeave={(e) => {
                if (value !== iconName) {
                  e.currentTarget.style.backgroundColor = isDark
                    ? "rgba(255, 255, 255, 0.02)"
                    : "rgba(0, 0, 0, 0.05)";
                  e.currentTarget.style.borderColor = isDark
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.15)";
                }
              }}
            >
              <div style={{ fontSize: "20px", marginBottom: "4px" }}>
                <Icon name={iconName} />
              </div>
              <span
                style={{
                  wordBreak: "break-word",
                  lineHeight: "1.2",
                  maxWidth: "100%",
                  fontSize: "9px",
                }}
              >
                {iconName}
              </span>
            </div>
          ))}
        </div>
        {filteredIcons.length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: "#666",
              padding: "20px",
              fontSize: "14px",
            }}
          >
            No icons found matching "{search}"
          </div>
        )}
        <div
          style={{
            marginTop: "8px",
            fontSize: "12px",
            color: "var(--pc-muted, #666)",
            textAlign: "center",
          }}
        >
          {filteredIcons.length} of {options.length} icons
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof Icon> = {
  title: "Components/Icons",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Icons inherit parent font-size and color. The `weight` prop controls stroke thickness (thin â†’ heavy or a custom number), and `spin` adds a simple rotation animation. Note: primarily filled icons may fix some stroke widths for visual balance, so parts of those icons can ignore `weight`.",
      },
    },
  },
  args: {
    name: "home",
  },
  argTypes: {
    name: {
      control: { type: "select" },
      options: Object.keys(iconPaths).sort(),
      description: "Icon name from the registry",
    },
    spin: {
      control: { type: "boolean" },
      description:
        "Makes the icon spin continuously - great for loading states",
    },
    weight: {
      control: { type: "select" },
      options: ["thin", "light", "normal", "medium", "bold", "heavy"],
      description:
        "Icon stroke thickness - try different weights to see the effect",
    },
    style: {
      control: { type: "object" },
      description: "CSS styles - try {fontSize: '32px', color: 'red'}",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;
type NamedStory = StoryObj<{
  icon: NamedIconKey;
  spin?: boolean;
  weight?: IconProps["weight"];
  style?: CSSProperties;
}>;

export const IconBrowser: Story = {
  argTypes: {
    name: {
      control: { type: "select", disable: true },
    },
    spin: {
      control: { type: "boolean", disable: true },
    },
    weight: {
      control: { type: "select", disable: true },
    },
    style: {
      control: { type: "object", disable: true },
    },
  },
  render: (args) => <IconBrowserComponent initialIcon={args.name} />,
};

export const Icons: Story = {
  args: {
    style: { fontSize: "36px", color: "currentColor" },
  },
  render: (args) => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <span>Icon: </span>
      <span>
        <Icon {...args} name={args.name} />
      </span>
    </div>
  ),
};

// Named (wrapped) icons demo
type NamedIconKey =
  | "home"
  | "search"
  | "star"
  | "heart"
  | "camera"
  | "bell"
  | "calendar"
  | "user"
  | "check";

import type { IconProps } from "../src/icons";

type NamedIconComponent = ComponentType<Omit<IconProps, "name">>;

const namedIcons: Record<NamedIconKey, NamedIconComponent> = {
  home: HomeIcon,
  search: SearchIcon,
  star: StarIcon,
  heart: HeartIcon,
  camera: CameraIcon,
  bell: BellIcon,
  calendar: CalendarIcon,
  user: UserIcon,
  check: CheckIcon,
};

export const NamedIcons: NamedStory = {
  argTypes: {
    icon: {
      control: { type: "select" },
      options: Object.keys(namedIcons),
      description: "Select a named icon to render",
    },
    spin: {
      control: { type: "boolean" },
      description: "Makes the icon spin continuously",
    },
    weight: {
      control: { type: "select" },
      options: ["thin", "light", "normal", "medium", "bold", "heavy"],
      description: "Icon stroke thickness",
    },
    style: {
      control: { type: "object" },
      description: "CSS styles - e.g., { fontSize: '32px', color: 'red' }",
    },
  },
  parameters: {
    controls: {
      exclude: ["name"],
    },
  },
  args: {
    icon: "home" as NamedIconKey,
    style: { fontSize: "36px", color: "currentColor" },
  },
  render: (args) => {
    const Cmp = namedIcons[args.icon];
    return (
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <span>Named Icon: </span>
        <span>
          <Cmp spin={args.spin} weight={args.weight} style={args.style} />
        </span>
      </div>
    );
  },
};

const example = `import { Icon } from "@polyutils/components";

function App() {
  return <Icon name="alarm-clock" weight="bold" style={{ fontSize: 24 }} />;
}`;

const example2 = `import { HomeIcon } from "@polyutils/components/icons";

function App() {
  return <HomeIcon weight="bold" style={{ fontSize: 24 }} />;
}`;

// Visual regression check for masked/clipPath icons: render many duplicates
type MaskedStory = StoryObj<{
  weight?: IconProps["weight"];
  style?: CSSProperties;
}>;

export const MaskedIconsGrid: MaskedStory = {
  argTypes: {
    weight: {
      control: { type: "select" },
      options: ["thin", "light", "normal", "medium", "bold", "heavy"],
      description: "Icon stroke thickness",
    },
    style: {
      control: { type: "object" },
      description: "CSS styles - e.g., { fontSize: '28px' }",
    },
  },
  args: {
    weight: "normal",
    style: { fontSize: "28px" },
  },
  render: (args) => {
    const maskedList: Array<
      [string, React.ComponentType<Omit<IconProps, "name">>]
    > = [
      ["CircleCheckIcon", CircleCheckIcon],
      ["CircleCloseIcon", CircleCloseIcon],
      ["CircleExclamationIcon", CircleExclamationIcon],
      ["CircleInfoIcon", CircleInfoIcon],
      ["CircleMinusIcon", CircleMinusIcon],
      ["CirclePlusIcon", CirclePlusIcon],
      ["CircleQuestionIcon", CircleQuestionIcon],
      ["CircleHalfFullIcon", CircleHalfFullIcon],
      ["CloudsIcon", CloudsIcon],
    ];
    return (
      <div style={{ display: "grid", gap: "16px" }}>
        {maskedList.map(([label, Cmp]) => (
          <div key={label}>
            <div style={{ marginBottom: 8, fontSize: 12, opacity: 0.8 }}>
              {label}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px",
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              {Array.from({ length: 9 }).map((_, i) => (
                <Cmp key={i} weight={args.weight} style={args.style} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const CustomColors: Story = {
  args: {
    name: "home",
  },
  render: (args) => (
    <div
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
        fontSize: "32px",
      }}
    >
      <Icon {...args} style={{ color: "red" }} />
      <Icon {...args} style={{ color: "blue" }} />
      <Icon {...args} style={{ color: "green" }} />
      <Icon {...args} style={{ color: "#ff6b35" }} />
      <div
        style={{
          color: "purple",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Icon {...args} />
        <span> Uses parent color</span>
      </div>
    </div>
  ),
};

export const DifferentSizesAndWeights: Story = {
  args: {
    name: "home",
  },
  render: (args) => (
    <div>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <span style={{ fontSize: "16px" }}>
          <Icon {...args} />
        </span>
        <span style={{ fontSize: "24px" }}>
          <Icon {...args} />
        </span>
        <span style={{ fontSize: "32px" }}>
          <Icon {...args} />
        </span>
        <span style={{ fontSize: "48px" }}>
          <Icon {...args} />
        </span>
        <span style={{ fontSize: "64px" }}>
          <Icon {...args} />
        </span>
        <span style={{ fontSize: "128px" }}>
          <Icon {...args} />
        </span>
        <span style={{ fontSize: "256px" }}>
          <Icon {...args} />
        </span>
        <span style={{ fontSize: "400px" }}>
          <Icon {...args} />
        </span>
      </div>
      <div style={{ display: "flex", gap: "100px", alignItems: "center" }}>
        <span style={{ fontSize: "48px" }}>
          <Icon {...args} weight={"thin"} />
        </span>
        <span style={{ fontSize: "48px" }}>
          <Icon {...args} weight={"light"} />
        </span>
        <span style={{ fontSize: "48px" }}>
          <Icon {...args} weight={"normal"} />
        </span>
        <span style={{ fontSize: "48px" }}>
          <Icon {...args} weight={"medium"} />
        </span>
        <span style={{ fontSize: "48px" }}>
          <Icon {...args} weight={"bold"} />
        </span>
        <span style={{ fontSize: "48px" }}>
          <Icon {...args} weight={"heavy"} />
        </span>
      </div>
    </div>
  ),
};

const IconBrowserComponent = ({ initialIcon }: { initialIcon: IconName }) => {
  const iconOptions = Object.keys(iconPaths).sort() as IconName[];
  const [selectedIcon, setSelectedIcon] = useState<IconName>(
    iconOptions[0] || initialIcon
  );
  const isDark = useTheme();
  const usageSnippet = `<Icon name="${selectedIcon}" />`;
  const selectedTags = getTags(selectedIcon);
  const [copyLabel, setCopyLabel] = useState("Copy to clipboard");
  const copyLabelTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyLabelTimeout.current) {
        clearTimeout(copyLabelTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    setCopyLabel("Copy to clipboard");
    if (copyLabelTimeout.current) {
      clearTimeout(copyLabelTimeout.current);
      copyLabelTimeout.current = null;
    }
  }, [usageSnippet]);

  const handleCopy = () => {
    if (!navigator.clipboard?.writeText) {
      return;
    }

    navigator.clipboard
      .writeText(usageSnippet)
      .then(() => {
        setCopyLabel("Copied");
        if (copyLabelTimeout.current) {
          clearTimeout(copyLabelTimeout.current);
        }
        copyLabelTimeout.current = setTimeout(() => {
          setCopyLabel("Copy to clipboard");
          copyLabelTimeout.current = null;
        }, 1500);
      })
      .catch(() => undefined);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "24px",
        maxWidth: "100%",
      }}
    >
      {/* Left side - Icon Grid Browser */}
      <div style={{ flex: 1, minWidth: "400px" }}>
        <h3 style={{ marginTop: 0, marginBottom: "8px" }}>
          Browse Icons ({iconOptions.length} total)
        </h3>
        <details style={{ marginBottom: "12px" }}>
          <summary style={{ cursor: "pointer" }}>Examples</summary>
          <div style={{ marginBottom: 20, position: "relative" }}>
            <pre>
              <code>{example}</code>
            </pre>
            <Button
              size="small"
              appearance="transparent"
              icon={<Icon name="copy" />}
              iconOnly
              shape="square"
              onClick={() => navigator.clipboard.writeText(example)}
              style={{
                position: "absolute",
                bottom: "0px",
                right: "0px",
              }}
            />
          </div>
          <div style={{ marginBottom: 20, position: "relative" }}>
            <pre>
              <code>{example2}</code>
            </pre>
            <Button
              size="small"
              appearance="transparent"
              icon={<Icon name="copy" />}
              iconOnly
              shape="square"
              onClick={() => navigator.clipboard.writeText(example2)}
              style={{
                position: "absolute",
                bottom: "0px",
                right: "0px",
              }}
            />
          </div>
        </details>
        <IconGridControl
          value={selectedIcon}
          onChange={setSelectedIcon}
          options={iconOptions}
        />
      </div>

      {/* Right side - Selected Icon Preview */}
      <div
        style={{
          flex: "0 0 300px",
          padding: "20px",
          border: "1px solid var(--color-border, #e0e0e0)",
          borderRadius: "8px",
          backgroundColor: "var(--color-surface, transparent)",
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: "16px" }}>
          Selected: {selectedIcon}
        </h3>

        {/* Large preview */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
            padding: "20px",
            backgroundColor: isDark
              ? "rgba(255, 255, 255, 0.02)"
              : "rgba(0, 0, 0, 0.05)",
            borderRadius: "4px",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.15)"}`,
          }}
        >
          <Icon name={selectedIcon} style={{ fontSize: "64px" }} />
        </div>

        {/* Different weights */}
        <div style={{ marginBottom: "20px" }}>
          <h4 style={{ fontSize: "14px", marginBottom: "8px" }}>Weights:</h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "8px",
            }}
          >
            {(
              ["thin", "light", "normal", "medium", "bold", "heavy"] as const
            ).map((weight) => (
              <div
                key={weight}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "12px",
                }}
              >
                <Icon
                  name={selectedIcon}
                  weight={weight}
                  style={{ fontSize: "18px" }}
                />
                <span>{weight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Spin animation */}
        <div style={{ marginBottom: "20px" }}>
          <h4 style={{ fontSize: "14px", marginBottom: "8px" }}>Animation:</h4>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Icon name={selectedIcon} spin style={{ fontSize: "24px" }} />
            <span style={{ fontSize: "12px" }}>spin=true</span>
          </div>
        </div>

        {/* Usage code */}
        <div>
          <h4 style={{ fontSize: "14px", marginBottom: "8px" }}>Usage:</h4>
          <div style={{ display: "flex", alignItems: "stretch", gap: "8px" }}>
            <code
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                padding: "8px",
                backgroundColor: isDark
                  ? "rgba(255, 255, 255, 0.02)"
                  : "rgba(0, 0, 0, 0.05)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.15)"}`,
                borderRadius: "4px",
                fontSize: "11px",
                wordBreak: "break-all",
              }}
            >
              {usageSnippet}
            </code>
            <Button
              appearance="transparent"
              size="small"
              icon={<Icon name="copy" />}
              iconOnly
              aria-label={copyLabel}
              title={copyLabel}
              onClick={handleCopy}
            />
          </div>
          {/* Tags */}
          <div style={{ marginTop: "10px" }}>
            <h4 style={{ fontSize: "14px", marginBottom: "6px" }}>Tags:</h4>
            <div style={{ fontSize: "12px", color: "var(--pc-muted, #666)" }}>
              {selectedTags && selectedTags.length > 0 ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "3px 8px",
                        borderRadius: "8px",
                        backgroundColor: colorForTag(tag, isDark).bg,
                        border: `1px solid ${colorForTag(tag, isDark).border}`,
                        boxShadow: isDark
                          ? "0 1px 2px rgba(0,0,0,0.5)"
                          : "0 1px 2px rgba(0,0,0,0.1)",
                        color: "inherit",
                        fontWeight: 600,
                        letterSpacing: "0.02em",
                        textTransform: "uppercase",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                "—"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
