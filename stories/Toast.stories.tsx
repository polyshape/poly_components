import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button, CircleInfoIcon, Icon, type ToastProps } from "../src";
import { toast, Toast } from "../src/toast";

const DEFAULT_STYLES = {
  root: {},
  toast: {},
  title: {},
  message: {},
  closeButton: {},
} as const;

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  args: {
    duration: undefined,
    dismissOnClick: undefined,
    showLoadingBar: undefined,
    pauseOnHover: undefined,
    stacked: undefined,
    position: undefined,
    theme: "sync",
    draggable: undefined,
    role: undefined,
    styles: DEFAULT_STYLES,
    closeIcon: undefined,
    icons: undefined,
  },
  argTypes: {
    theme: {
      control: { type: "select" },
      options: ["sync", "dark", "light", "colored"],
    },
    position: {
      control: { type: "select" },
      options: ["topRight", "topCenter", "topLeft", "bottomRight", "bottomCenter", "bottomLeft"],
    },
    duration: {
      control: { type: "number", min: 0, max: 20000, step: 500 },
      description: "Duration in milliseconds (0 = persistent)",
    },
    draggable: {
      control: { type: "select" },
      options: ["touch", "always", "never"],
      description: "Enable swipe-to-dismiss behavior",
    },
    closeIcon: { control: false },
    icons: { control: false },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof Toast>;

function AllTypesRender(args: ToastProps) {
  const DEFAULT_TITLE = "Sample Title";
  const DEFAULT_MESSAGE = "This is a sample message.";
  const [title, setTitle] = useState<string>(DEFAULT_TITLE);
  const [message, setMessage] = useState<string>(DEFAULT_MESSAGE);
  const common = { title: title || undefined } as { title?: string };
  return (
    <div style={{ padding: 20, display: "grid", gap: 12 }}>
      <div style={{ display: "grid", gap: 8, maxWidth: 520 }}>
        <label style={{ display: "grid", gap: 4 }}>
          <span>Title</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Optional title" />
        </label>
        <label style={{ display: "grid", gap: 4 }}>
          <span>Message</span>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="Toast message" />
        </label>
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            appearance="outline"
            size="small"
            onClick={() => {
              setTitle(DEFAULT_TITLE);
              setMessage(DEFAULT_MESSAGE);
            }}
          >
            Reset Inputs
          </Button>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Button appearance="primary" size="small" styles={{ root: { backgroundColor: "#10b981" } }} onClick={() => toast.success(message, common)}>
          Success Toast
        </Button>
        <Button appearance="secondary" size="small" styles={{ root: { backgroundColor: "#ef4444" } }} onClick={() => toast.error(message, common)}>
          Error Toast
        </Button>
        <Button
          appearance="secondary"
          size="small"
          style={{ backgroundColor: "#f59e0b", color: "white" }}
          onClick={() => toast.warning(message, common)}
        >
          Warning Toast
        </Button>
        <Button
          appearance="secondary"
          size="small"
          style={{ backgroundColor: "#3b82f6", color: "white" }}
          onClick={() => toast.info(message, common)}
        >
          Info Toast
        </Button>
        <Button appearance="default" size="small" onClick={() => toast.clear()}>
          Clear All
        </Button>
      </div>
      <Toast {...args} />
    </div>
  );
}

export const AllTypes: Story = { render: (args) => <AllTypesRender {...args} /> };

function WithCustomOptionsRender(args: ToastProps) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <Button appearance="primary" size="small" onClick={() => toast.success("This is a toast notification!", { title: "Custom Title" })}>
          Custom Title & Duration
        </Button>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Button
            appearance="secondary"
            size="small"
            style={{ backgroundColor: "#f59e0b", color: "white" }}
            onClick={() => toast.warning("This is a toast notification!", { title: "Custom Title", duration: 0 })}
          >
            Persistent Toast
          </Button>
          <div style={{ position: "relative", display: "inline-block" }}>
            <CircleInfoIcon
              style={{ fontSize: "20px", color: "#6b7280", cursor: "pointer", outline: "none", WebkitTapHighlightColor: "transparent" }}
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
              onFocus={() => setShowInfo(true)}
              onBlur={() => setShowInfo(false)}
              onMouseDown={(e) => e.preventDefault()}
              tabIndex={0}
              aria-label="Info"
            />
            {showInfo && (
              <div
                role="tooltip"
                style={{
                  position: "absolute",
                  top: 10,
                  left: "100%",
                  transform: "translate(8px, -100%)",
                  background: "var(--pc-nav-bg, var(--pc-bg, #1f2937))",
                  color: "var(--pc-fg, #e5e7eb)",
                  border: "1px solid var(--pc-border, rgba(255,255,255,0.12))",
                  borderRadius: 6,
                  padding: "8px 10px",
                  fontSize: 12,
                  lineHeight: 1.3,
                  whiteSpace: "nowrap",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                  zIndex: 5,
                }}
              >
                This toast uses duration "0" within the "toast" call, so it ignores the prop
              </div>
            )}
          </div>
        </div>
      </div>
      <Toast {...args} />
    </div>
  );
}

export const WithCustomOptionsInToast: Story = {
  args: { duration: 10000 },
  render: (args) => <WithCustomOptionsRender {...args} />,
};

type FCType = "success" | "error" | "warning" | "info";
function FullyConfigurableRender(args: ToastProps) {
  const DEFAULT_TITLE = "Custom Title";
  const DEFAULT_MESSAGE = "This is a toast notification!";
  const [type, setType] = useState<FCType>("success");
  const [title, setTitle] = useState<string>(DEFAULT_TITLE);
  const [message, setMessage] = useState<string>(DEFAULT_MESSAGE);
  const handleShowToast = () => {
    const options: Partial<ToastProps> = {
      ...(title ? { title } : {}),
      ...(args.duration !== undefined ? { duration: args.duration } : {}),
      dismissOnClick: args.dismissOnClick,
    };
    const fn = type === "success" ? toast.success : type === "error" ? toast.error : type === "warning" ? toast.warning : toast.info;
    fn(message, options);
  };
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "grid", gap: 8, maxWidth: 540, marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span style={{ minWidth: 60 }}>Type:</span>
          {["success", "error", "warning", "info"].map((t) => (
            <label key={t} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <input type="radio" name="fc-type" value={t} checked={type === t} onChange={() => setType(t as FCType)} />
              {t}
            </label>
          ))}
        </div>
        <label style={{ display: "grid", gap: 4 }}>
          <span>Title</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Optional title" />
        </label>
        <label style={{ display: "grid", gap: 4 }}>
          <span>Message</span>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="Toast message" />
        </label>
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            appearance="outline"
            size="small"
            onClick={() => {
              setTitle(DEFAULT_TITLE);
              setMessage(DEFAULT_MESSAGE);
              setType("success");
            }}
          >
            Reset Inputs
          </Button>
        </div>
      </div>
      <Button
        appearance={type === "success" ? "primary" : "secondary"}
        size="small"
        style={
          type === "error"
            ? { backgroundColor: "#f44336", color: "white" }
            : type === "success"
              ? { backgroundColor: "#4caf50", color: "white" }
              : type === "warning"
                ? { backgroundColor: "#f59e0b", color: "white" }
                : type === "info"
                  ? { backgroundColor: "#3b82f6", color: "white" }
                  : undefined
        }
        onClick={handleShowToast}
      >
        Show {type[0].toUpperCase() + type.slice(1)} Toast
      </Button>
      <div style={{ marginTop: 12, fontSize: 14 }}>
        <p style={{ margin: 0 }}>
          <strong>Current Settings:</strong>
        </p>
        <ul>
          <li>Type: {type}</li>
          <li>Message: "{message}"</li>
          {title && <li>Title: "{title}"</li>}
          <li>Duration: {args.duration === undefined ? "Default" : args.duration === 0 ? "Persistent" : `${args.duration}ms`}</li>
          <li>Dismiss on Click: {args.dismissOnClick ? "Yes" : "No"}</li>
          <li>Show Loading Bar: {args.showLoadingBar ? "Yes" : "No"}</li>
          <li>Pause on Hover: {args.pauseOnHover ? "Yes" : "No"}</li>
          <li>Position: {args.position}</li>
          <li>Theme: {args.theme}</li>
          <li>Stacked: {args.stacked ? "Yes" : "No"}</li>
          <li>Draggable: {String(args.draggable ?? "touch")}</li>
        </ul>
      </div>
      <Toast {...args} />
    </div>
  );
}

export const FullyConfigurable: Story = {
  parameters: { controls: { disabled: false }, docs: { disable: true } },
  render: (args) => <FullyConfigurableRender {...args} />,
};

export const CustomIcon: Story = {
  args: {
    icons: { success: <Icon name="star" style={{ fontSize: 20, color: "lime" }} /> },
    closeIcon: <Icon name="circle-close" style={{ fontSize: 18 }} />,
  },
  argTypes: {
    icons: { control: false },
    closeIcon: { control: false },
  },
  render: (args) => (
    <div style={{ padding: 20 }}>
      <Button appearance="primary" size="small" onClick={() => toast.success("Toast with custom icon", { title: "Custom Icon" })}>
        Show Custom Icon Toast
      </Button>
      <Toast {...args} />
    </div>
  ),
};

function ElementMessageRender(args: ToastProps) {
  const DEFAULT_TITLE = "Warning!";
  const DEFAULT_MESSAGE = "You will be logged out in 60 seconds due to inactivity.";
  const [title, setTitle] = useState<string>(DEFAULT_TITLE);
  const [message, setMessage] = useState<string>(DEFAULT_MESSAGE);

  const handleShowToast = () => {
    const timeOutToast = toast.info(
      <div
        className="auto-logout__warning"
        role="dialog"
        aria-live="polite"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}
      >
        {title && <strong>{title}</strong>}
        <p style={{ marginTop: 5 }}>You will be logged out in 60 seconds due to inactivity.</p>
        <Button
          styles={{ root: { marginBottom: "12px" } }}
          appearance="primary"
          size="small"
          onClick={(event) => {
            event.stopPropagation();
            toast.remove(timeOutToast);
            toast.info("Your session has been extended.", { duration: 2000, dismissOnClick: true, draggable: "always" });
          }}
        >
          Stay Logged In
        </Button>
      </div>
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "grid", gap: 8, maxWidth: 560, marginBottom: 12 }}>
        <label style={{ display: "grid", gap: 4 }}>
          <span>Title</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Optional title" />
        </label>
        <label style={{ display: "grid", gap: 4 }}>
          <span>Message</span>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="Toast message (element)" />
        </label>
      </div>
      <Button appearance="primary" size="small" onClick={handleShowToast}>
        Show JSX Message Toast
      </Button>
      <Toast {...args} />
    </div>
  );
}

export const ElementMessage: Story = {
  args: { theme: "sync", closeIcon: null, duration: 0, dismissOnClick: false, position: "bottomRight", icons: { info: null }, draggable: "never" },
  render: (args) => <ElementMessageRender {...args} />,
};

function ImperativeControlsDemo(args: ToastProps) {
  const [latestToastId, setLatestToastId] = useState<string | null>(null);

  const showToast = () => {
    const id = toast.success("This is a toast notification!", {
      duration: args.duration,
      dismissOnClick: args.dismissOnClick,
    });
    setLatestToastId(id);
  };

  const withToastId = (action: (id: string) => void, fallbackMessage: string) => {
    if (!latestToastId) {
      window.alert(fallbackMessage);
      return;
    }
    action(latestToastId);
  };

  const handlePause = () => withToastId((id) => toast.pause(id), "Trigger a toast first to capture its id.");
  const handleContinue = () => withToastId((id) => toast.play(id), "Trigger a toast first to capture its id.");
  const handleIsActive = () =>
    withToastId((id) => {
      const active = toast.isActive(id);
      window.alert(active ? "Toast is still active." : "Toast is no longer active.");
    }, "Trigger a toast first to capture its id.");

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px", maxWidth: "480px" }}>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <Button appearance="primary" size="small" onClick={showToast}>
          Show Toast
        </Button>
        <Button appearance="secondary" size="small" onClick={handlePause}>
          Pause Toast
        </Button>
        <Button appearance="secondary" size="small" onClick={handleContinue}>
          Continue Toast
        </Button>
        <Button appearance="default" size="small" onClick={handleIsActive}>
          Is Active?
        </Button>
      </div>
      <div style={{ fontSize: "14px" }}>Latest toast id: {latestToastId ?? "None yet"}</div>
      <Toast {...args} />
    </div>
  );
}

export const ImperativeControls: Story = {
  args: { position: "bottomRight" },
  render: (args) => <ImperativeControlsDemo {...args} />,
};
