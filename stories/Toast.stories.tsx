import type { ReactNode } from "react";
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toast, toast } from "../src/toast";
import type { ToastProps } from "../src/toast";
import Button from "../src/button/Button";
import { Icon } from "../src";

// Define the args interface for toast options
interface ToastStoryArgs extends ToastProps {
  type: "success" | "error" | "warning" | "info";
  message: ReactNode;
  title?: string;
  duration?: number;
  dismissOnClick?: boolean;
}

const meta: Meta<ToastStoryArgs> = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    docs: {
      description: {
        component: `
Toast notifications for displaying messages to users. 

## Usage

Add the Toast component once to your app (usually in App.tsx or main.tsx):

\`\`\`tsx
import { Toast } from '@polyutils/components';

function App() {
  return (
    <div>
      {/* Your app content */}
  <Toast showLoadingBar={args.showLoadingBar} />
    </div>
  );
}
\`\`\`

Then use the toast function anywhere in your app:

\`\`\`tsx
import { toast } from '@polyutils/components';

// Success notification
toast.success('Operation completed successfully!');

// Error notification
toast.error('Something went wrong!');

// Warning notification
toast.warning('Please check your input');

// Info notification
toast.info('New update available');

// With custom title and duration
toast.success('Success!', { 
  title: 'Great job', 
  duration: 3000 
});
\`\`\`
        `,
      },
    },
    // ...existing code...
    showLoadingBar: {
      control: { type: "boolean" },
      description: "Show the loading/progress bar at the bottom of the toast",
    },
    stacked: {
      control: { type: "boolean" },
      description: "Stack toasts visually",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: { type: "select" },
      options: ["sync", "dark", "light", "colored"],
      description: "Theme for the toast appearance",
    },
    position: {
      control: { type: "select" },
      options: ["topRight", "topCenter", "topLeft", "bottomRight", "bottomCenter", "bottomLeft"],
      description: "Position of the toast container",
    },
    type: {
      control: { type: "select" },
      options: ["success", "error", "warning", "info"],
      description: "The type of toast notification",
    },
    message: {
      control: { type: "text" },
      description: "The main message content of the toast",
    },
    title: {
      control: { type: "text" },
      description: "Optional title for the toast",
    },
    duration: {
      control: { type: "number", min: 0, max: 20000, step: 500 },
      description: "Duration in milliseconds (0 = persistent)",
    },
    dismissOnClick: {
      control: { type: "boolean" },
      description: "Allow dismissing by clicking anywhere on the toast (removes × button)",
    },
    showLoadingBar: {
      control: { type: "boolean" },
      description: "Show the loading/progress bar at the bottom of the toast",
    },
    pauseOnHover: {
      control: { type: "boolean" },
      description: "Pause the dismiss countdown and loading bar when hovering the toast",
    },
    stacked: {
      control: { type: "boolean" },
      description: "Stack toasts visually",
    },
    draggable: {
      control: { type: "select" },
      options: ["touch", "always", "never"],
      description: "Enable swipe-to-dismiss behavior",
    }
  },
  args: {
    type: "success",
    message: "This is a toast notification!",
    title: undefined,
    duration: undefined,
    dismissOnClick: undefined,
    showLoadingBar: undefined,
    pauseOnHover: false,
    position: "topRight",
    theme: "light",
    stacked: undefined,
    draggable: "touch",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTypes: Story = {
  argTypes: { type: { control: false } },
  render: (args) => {
    const toastOptions = {
      title: args.title
    };
    return (
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
          <Button appearance="primary" size="small" onClick={() => toast.success(args.message, toastOptions)}>
            Success Toast
          </Button>
          <Button appearance="danger" size="small" onClick={() => toast.error(args.message, toastOptions)}>
            Error Toast
          </Button>
          <Button appearance="secondary" size="small" style={{ backgroundColor: "#f59e0b", color: "white" }} onClick={() => toast.warning(args.message, toastOptions)}>
            Warning Toast
          </Button>
          <Button appearance="secondary" size="small" style={{ backgroundColor: "#3b82f6", color: "white" }} onClick={() => toast.info(args.message, toastOptions)}>
            Info Toast
          </Button>
        </div>
        <Button appearance="default" size="small" onClick={() => toast.clear()}>
          Clear All
        </Button>
        <p style={{ fontSize: "14px", margin: 0 }}>
          Use the controls to change the message, title, duration, and dismiss behavior. Then click a button above to trigger a toast.
        </p>
        <Toast {...args} />
      </div>
    );
  },
};

export const SuccessToast: Story = {
  argTypes: { type: { control: false } },
  render: (args) => (
    <div style={{ padding: "20px" }}>
      <Button appearance="primary" size="small" onClick={() => toast.success(args.message, { title: args.title })}>
        Show Success Toast
      </Button>
      <Toast {...args} />
    </div>
  ),
};

export const ErrorToast: Story = {
  argTypes: { type: { control: false } },
  render: (args) => (
    <div style={{ padding: "20px" }}>
      <Button appearance="danger" size="small" onClick={() => toast.error(args.message, { title: args.title })}>
        Show Error Toast
      </Button>
      <Toast {...args} />
    </div>
  ),
};

export const WarningToast: Story = {
  argTypes: { type: { control: false } },
  render: (args) => (
    <div style={{ padding: "20px" }}>
      <Button appearance="secondary" size="small" style={{ backgroundColor: "#f59e0b", color: "white" }} onClick={() => toast.warning(args.message, { title: args.title })}>
        Show Warning Toast
      </Button>
      <Toast {...args} />
    </div>
  ),
};

export const InfoToast: Story = {
  argTypes: { type: { control: false } },
  render: (args) => (
    <div style={{ padding: "20px" }}>
      <Button appearance="secondary" size="small" style={{ backgroundColor: "#3b82f6", color: "white" }} onClick={() => toast.info(args.message, { title: args.title })}>
        Show Info Toast
      </Button>
      <Toast {...args} />
    </div>
  ),
};

export const WithCustomOptions: Story = {
  argTypes: { type: { control: false } },
  render: (args) => (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <Button appearance="primary" size="small" onClick={() => toast.success(args.message, { title: args.title?? "Custom Title", duration: args.duration ?? 10000 })}>
          Custom Title & Duration
        </Button>
        <Button appearance="secondary" size="small" style={{ backgroundColor: "#f59e0b", color: "white" }} onClick={() => toast.warning(args.message, { title: args.title, duration: 0, dismissOnClick: args.dismissOnClick })}>
          Persistent Toast
        </Button>
      </div>
      <Toast {...args} />
    </div>
  ),
};

export const FullyConfigurable: Story = {
  parameters: { controls: { disabled: false }, docs: { disable: true } },
  name: "Fully Configurable",
  render: (args) => {
    const handleShowToast = () => {
      const options: Partial<ToastProps> = {
        ...(args.title ? { title: args.title } : {}),
        ...(args.duration !== undefined ? { duration: args.duration } : {}),
        dismissOnClick: args.dismissOnClick
      };
      toast[args.type](args.message, options);
    };
    return (
      <div style={{ padding: "20px" }}>
        <Button
          appearance={
            args.type === "success" ? "primary" :
            args.type === "error" ? "danger" :
            "secondary"
          }
          size="small"
          style={
            args.type === "warning" ? { backgroundColor: "#f59e0b", color: "white" } :
            args.type === "info" ? { backgroundColor: "#3b82f6", color: "white" } :
            undefined
          }
          onClick={handleShowToast}
        >
          Show {args.type.charAt(0).toUpperCase() + args.type.slice(1)} Toast
        </Button>
        <div style={{ marginTop: "20px", fontSize: "14px", }}>
          <p><strong>Current Settings:</strong></p>
          <ul>
            <li>Type: {args.type}</li>
            <li>Message: "{args.message}"</li>
            {args.title && <li>Title: "{args.title}"</li>}
            <li>Duration: {args.duration === undefined ? "Default" : args.duration === 0 ? "Persistent" : `${args.duration}ms`}</li>
            <li>Dismiss on Click: {args.dismissOnClick ? "Yes" : "No"}</li>
            <li>Show Loading Bar: {args.showLoadingBar ? "Yes" : "No"}</li>
            <li>Pause on Hover: {args.pauseOnHover ? "Yes" : "No"}</li>
            <li>Position: {args.position}</li>
            <li>Theme: {args.theme}</li>
            <li>Stacked: {args.stacked ? "Yes" : "No"}</li>
            <li>Draggable: {args.draggable ? "Yes" : "No"}</li>
          </ul>
        </div>
        <Toast {...args} />
      </div>
    );
  },
};

export const DismissOnClick: Story = {
  argTypes: { type: { control: false } },
  render: (args) => (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
        <Button appearance="primary" size="small" onClick={() => toast.success(args.message, { title: args.title, duration: args.duration, dismissOnClick: true })}>
          Success (Dismiss on Click)
        </Button>
        <Button appearance="danger" size="small" onClick={() => toast.error(args.message, { title: args.title, duration: args.duration, dismissOnClick: true })}>
          Error (Dismiss on Click)
        </Button>
        <Button appearance="secondary" size="small" style={{ backgroundColor: "#3b82f6", color: "white" }} onClick={() => toast.info(args.message, { title: args.title })}>
          Regular Toast (with × button)
        </Button>
      </div>
      <p style={{ fontSize: "14px", margin: 0 }}>
        Compare the behavior: dismiss-on-click toasts show a pointer cursor and can be clicked anywhere to close.
        Regular toasts have the × button and default cursor.
      </p>
      <Toast {...args} />
    </div>
  ),
};

export const CustomIcon: Story = {
  args: {icons: { success: <Icon name="star" style={{ fontSize: 20, color: "lime" }} /> }, closeIcon: <Icon name="circle-close" style={{ fontSize: 20}}/>},
  argTypes: { type: { control: false } },
  name: "Custom Icon",
  render: (args) => {
    return (
      <div style={{ padding: "20px" }}>
        <Button appearance="primary" size="small" onClick={() => toast.success(args.message, { title: args.title })}>
          Show Custom Icon Toast
        </Button>
        <Toast {...args} />
      </div>
    );
  },
};

export const ElementMessage: Story = {
  name: "Element Message",
  args: {theme: "sync", closeIcon: null, duration: 0, dismissOnClick: false, position: "bottomRight", icons: { info: null }, draggable: "never" },
  argTypes: { type: { control: false }, message: { control: false } },
  render: (args) => {
    const handleShowToast = () => {
      const timeOutToast = toast.info(
        (
          <div className="auto-logout__warning" role="dialog" aria-live="polite" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <p style={{marginTop: 5}}>You will be logged out in 60 seconds due to inactivity.</p>
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
        ),
        {
          title: args.title
        }
      );
    };

    return (
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px", maxWidth: "420px" }}>
        <Button appearance="primary" size="small" onClick={handleShowToast}>
          Show JSX Message Toast
        </Button>
        <Toast {...args} />
      </div>
    );
  },
};

function ImperativeControlsDemo(args: ToastStoryArgs) {
  const [latestToastId, setLatestToastId] = useState<string | null>(null);

  const showToast = () => {
    const id = toast[args.type](args.message, {
      title: args.title,
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

  const handlePause = () => withToastId(id => toast.pause(id), "Trigger a toast first to capture its id.");
  const handleContinue = () => withToastId(id => toast.play(id), "Trigger a toast first to capture its id.");
  const handleIsActive = () =>
    withToastId(id => {
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
      <div style={{ fontSize: "14px"}}>
        Latest toast id: {latestToastId ?? "None yet"}
      </div>
      <Toast {...args} />
    </div>
  );
}

export const ImperativeControls: Story = {
  argTypes: { type: { control: false } },
  args: { position: "bottomRight" },
  render: (args) => <ImperativeControlsDemo {...args} />,
};
