import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast, toast } from '../src/toast';
import type { ToastProps } from '../src/toast';
import Button from '../src/button/Button';

// Define the args interface for toast options
interface ToastStoryArgs extends ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
  duration?: number;
  dismissOnClick?: boolean;
  globalDuration?: number;
  globalDismissOnClick?: boolean;
}

const meta: Meta<ToastStoryArgs> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
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
      control: { type: 'boolean' },
      description: 'Show the loading/progress bar at the bottom of the toast',
    },
    stacked: {
      control: { type: 'boolean' },
      description: 'Stack toasts visually',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['sync', 'dark', 'light', 'colored'],
      description: 'Theme for the toast appearance',
    },
    position: {
      control: { type: 'select' },
      options: ['topRight', 'topCenter', 'topLeft', 'bottomRight', 'bottomCenter', 'bottomLeft'],
      description: 'Position of the toast container',
    },
    type: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
      description: 'The type of toast notification',
    },
    message: {
      control: { type: 'text' },
      description: 'The main message content of the toast',
    },
    title: {
      control: { type: 'text' },
      description: 'Optional title for the toast',
    },
    duration: {
      control: { type: 'number', min: 0, max: 10000, step: 1000 },
      description: 'Duration in milliseconds (0 = persistent)',
    },
    dismissOnClick: {
      control: { type: 'boolean' },
      description: 'Allow dismissing by clicking anywhere on the toast (removes × button)',
    },
    showLoadingBar: {
      control: { type: 'boolean' },
      description: 'Show the loading/progress bar at the bottom of the toast',
    },
    pauseOnHover: {
      control: { type: 'boolean' },
      description: 'Pause the dismiss countdown and loading bar when hovering the toast',
    },
    draggable: {
      control: { type: 'select' },
      options: ['touch', 'always', 'never'],
      description: 'Enable swipe-to-dismiss behavior',
    },
    globalDuration: {
      control: { type: 'number', min: 0, max: 20000, step: 500 },
      description: 'Global default set on <Toast /> when per-toast duration is not provided'
    },
    globalDismissOnClick: {
      control: { type: 'boolean' },
      description: 'Global default set on <Toast /> when per-toast dismissOnClick is not provided'
    },
  },
  args: {
    type: 'success',
    message: 'This is a toast notification!',
    title: '',
    duration: 5000,
    dismissOnClick: false,
  showLoadingBar: true,
  pauseOnHover: false,
  position: 'topRight',
  theme: 'light',
  stacked: false,
    draggable: 'touch',
    globalDuration: undefined,
    globalDismissOnClick: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTypes: Story = {
  argTypes: { type: { control: false } },
  render: (args) => {
    const toastOptions = {
      title: args.title,
      duration: args.duration,
      dismissOnClick: args.dismissOnClick,
    };
    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <Button appearance="primary" size="small" onClick={() => toast.success(args.message, toastOptions)}>
            Success Toast
          </Button>
          <Button appearance="danger" size="small" onClick={() => toast.error(args.message, toastOptions)}>
            Error Toast
          </Button>
          <Button appearance="secondary" size="small" style={{ backgroundColor: '#f59e0b', color: 'white' }} onClick={() => toast.warning(args.message, toastOptions)}>
            Warning Toast
          </Button>
          <Button appearance="secondary" size="small" style={{ backgroundColor: '#3b82f6', color: 'white' }} onClick={() => toast.info(args.message, toastOptions)}>
            Info Toast
          </Button>
        </div>
        <Button appearance="default" size="small" onClick={() => toast.clear()}>
          Clear All
        </Button>
        <p style={{ fontSize: '14px', margin: 0 }}>
          Use the controls to change the message, title, duration, and dismiss behavior. Then click a button above to trigger a toast.
        </p>
        <Toast theme={args.theme} showLoadingBar={args.showLoadingBar} pauseOnHover={args.pauseOnHover} position={args.position} draggable={args.draggable} stacked={args.stacked} duration={args.globalDuration} dismissOnClick={args.globalDismissOnClick} />
      </div>
    );
  },
};

export const SuccessToast: Story = {
  argTypes: { type: { control: false } },
  render: (args) => (
    <div style={{ padding: '20px' }}>
      <Button appearance="primary" size="small" onClick={() => toast.success(args.message, { title: args.title, duration: args.duration, dismissOnClick: args.dismissOnClick })}>
        Show Success Toast
      </Button>
      <Toast theme={args.theme} showLoadingBar={args.showLoadingBar} pauseOnHover={args.pauseOnHover} position={args.position} draggable={args.draggable} stacked={args.stacked} duration={args.globalDuration} dismissOnClick={args.globalDismissOnClick} />
    </div>
  ),
};

export const ErrorToast: Story = {
  argTypes: { type: { control: false } },
  render: (args) => (
    <div style={{ padding: '20px' }}>
      <Button appearance="danger" size="small" onClick={() => toast.error(args.message, { title: args.title, duration: args.duration, dismissOnClick: args.dismissOnClick })}>
        Show Error Toast
      </Button>
      <Toast theme={args.theme} showLoadingBar={args.showLoadingBar} pauseOnHover={args.pauseOnHover} position={args.position} draggable={args.draggable} stacked={args.stacked} duration={args.globalDuration} dismissOnClick={args.globalDismissOnClick} />
    </div>
  ),
};

export const WarningToast: Story = {
  argTypes: { type: { control: false } },
  render: (args) => (
    <div style={{ padding: '20px' }}>
      <Button appearance="secondary" size="small" style={{ backgroundColor: '#f59e0b', color: 'white' }} onClick={() => toast.warning(args.message, { title: args.title, duration: args.duration, dismissOnClick: args.dismissOnClick })}>
        Show Warning Toast
      </Button>
      <Toast theme={args.theme} showLoadingBar={args.showLoadingBar} pauseOnHover={args.pauseOnHover} position={args.position} draggable={args.draggable} stacked={args.stacked} />
    </div>
  ),
};

export const InfoToast: Story = {
  argTypes: { type: { control: false } },
  render: (args) => (
    <div style={{ padding: '20px' }}>
      <Button appearance="secondary" size="small" style={{ backgroundColor: '#3b82f6', color: 'white' }} onClick={() => toast.info(args.message, { title: args.title, duration: args.duration, dismissOnClick: args.dismissOnClick })}>
        Show Info Toast
      </Button>
      <Toast theme={args.theme} showLoadingBar={args.showLoadingBar} pauseOnHover={args.pauseOnHover} draggable={args.draggable} stacked={args.stacked} duration={args.globalDuration} dismissOnClick={args.globalDismissOnClick} />
    </div>
  ),
};

export const WithCustomOptions: Story = {
  argTypes: { type: { control: false } },
  render: (args) => (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button appearance="primary" size="small" onClick={() => toast.success(args.message, { title: args.title, duration: args.duration, dismissOnClick: args.dismissOnClick })}>
          Custom Title & Duration
        </Button>
        <Button appearance="secondary" size="small" style={{ backgroundColor: '#f59e0b', color: 'white' }} onClick={() => toast.warning(args.message, { title: args.title, duration: 0, dismissOnClick: args.dismissOnClick })}>
          Persistent Toast
        </Button>
      </div>
      <Toast theme={args.theme} showLoadingBar={args.showLoadingBar} pauseOnHover={args.pauseOnHover} position={args.position} draggable={args.draggable} stacked={args.stacked} duration={args.globalDuration} dismissOnClick={args.globalDismissOnClick}/>
    </div>
  ),
};

export const FullyConfigurable: Story = {
  parameters: { controls: { disabled: false }, docs: { disable: true } },
  name: 'Fully Configurable',
  render: (args) => {
    const handleShowToast = () => {
      const options: any = {
        ...(args.title ? { title: args.title } : {}),
        ...(args.duration !== undefined ? { duration: args.duration } : {}),
        dismissOnClick: args.dismissOnClick
      };
      toast[args.type](args.message, options);
    };
    return (
      <div style={{ padding: '20px' }}>
        <Button
          appearance={
            args.type === 'success' ? 'primary' :
            args.type === 'error' ? 'danger' :
            'secondary'
          }
          size="small"
          style={
            args.type === 'warning' ? { backgroundColor: '#f59e0b', color: 'white' } :
            args.type === 'info' ? { backgroundColor: '#3b82f6', color: 'white' } :
            undefined
          }
          onClick={handleShowToast}
        >
          Show {args.type.charAt(0).toUpperCase() + args.type.slice(1)} Toast
        </Button>
        <div style={{ marginTop: '20px', fontSize: '14px', }}>
          <p><strong>Current Settings:</strong></p>
          <ul>
            <li>Type: {args.type}</li>
            <li>Message: "{args.message}"</li>
            {args.title && <li>Title: "{args.title}"</li>}
            <li>Duration: {args.duration === 0 ? 'Persistent' : `${args.duration}ms`}</li>
            <li>Dismiss on Click: {args.dismissOnClick ? 'Yes' : 'No'}</li>
          </ul>
        </div>
        <Toast theme={args.theme} showLoadingBar={args.showLoadingBar} pauseOnHover={args.pauseOnHover} position={args.position} draggable={args.draggable} stacked={args.stacked} />
      </div>
    );
  },
};

export const DismissOnClick: Story = {
  argTypes: { type: { control: false } },
  render: (args) => (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <Button appearance="primary" size="small" onClick={() => toast.success(args.message, { title: args.title, duration: args.duration, dismissOnClick: true })}>
          Success (Dismiss on Click)
        </Button>
        <Button appearance="danger" size="small" onClick={() => toast.error(args.message, { title: args.title, duration: args.duration, dismissOnClick: true })}>
          Error (Dismiss on Click)
        </Button>
        <Button appearance="secondary" size="small" style={{ backgroundColor: '#3b82f6', color: 'white' }} onClick={() => toast.info(args.message, { title: args.title, duration: args.duration, dismissOnClick: args.dismissOnClick })}>
          Regular Toast (with × button)
        </Button>
      </div>
      <p style={{ fontSize: '14px', margin: 0 }}>
        Compare the behavior: dismiss-on-click toasts show a pointer cursor and can be clicked anywhere to close.
        Regular toasts have the × button and default cursor.
      </p>
      <Toast theme={args.theme} showLoadingBar={args.showLoadingBar} pauseOnHover={args.pauseOnHover} position={args.position} draggable={args.draggable} stacked={args.stacked}/>
    </div>
  ),
};

const customSuccessIcon = (
  <span style={{ display: 'inline-flex', alignItems: 'center' }}>
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="11" fill="purple" />
      <path d="M7 11.5L10 14.5L15 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </span>
);

export const CustomIcon: Story = {
  argTypes: { type: { control: false } },
  name: 'Custom Icon',
  render: (args) => {
    return (
      <div style={{ padding: '20px' }}>
        <Button appearance="primary" size="small" onClick={() => toast.success(args.message, { title: args.title, duration: args.duration, dismissOnClick: args.dismissOnClick })}>
          Show Custom Icon Toast
        </Button>
        {/* Pass custom icon for success, fallback for others */}
        <Toast
          theme={args.theme}
          showLoadingBar={args.showLoadingBar}
          icons={{ success: customSuccessIcon }}
          closeIcon={<i className="fa-solid fa-circle-xmark"></i>}
          position={args.position}
          draggable={args.draggable}
          stacked={args.stacked}
          duration={args.globalDuration}
          dismissOnClick={args.globalDismissOnClick}
        />
      </div>
    );
  },
};

export const ImperativeControls: Story = {
  argTypes: { type: { control: false } },
  args: { position: 'bottomRight' },
  render: (args) => {
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

    const handlePause = () => withToastId(id => toast.pause(id), 'Trigger a toast first to capture its id.');
    const handleContinue = () => withToastId(id => toast.play(id), 'Trigger a toast first to capture its id.');
    const handleIsActive = () =>
      withToastId(id => {
        const active = toast.isActive(id);
        window.alert(active ? 'Toast is still active.' : 'Toast is no longer active.');
      }, 'Trigger a toast first to capture its id.');

    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '480px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
        <div style={{ fontSize: '14px'}}>
          Latest toast id: {latestToastId ?? 'None yet'}
        </div>
        <Toast
          theme={args.theme}
          showLoadingBar={args.showLoadingBar}
          pauseOnHover={args.pauseOnHover}
          position={args.position}
          draggable={args.draggable}
          stacked={args.stacked}
          duration={args.globalDuration}
          dismissOnClick={args.globalDismissOnClick}
        />
      </div>
    );
  },
};

export const GlobalDefaults: Story = {
  name: 'Global Defaults (no per-toast options)',
  render: (args) => (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <Button appearance="primary" size="small" onClick={() => toast.success(args.message)}>
          Success (uses global)
        </Button>
        <Button appearance="danger" size="small" onClick={() => toast.error(args.message)}>
          Error (uses global)
        </Button>
      </div>
      <p style={{ fontSize: '14px', margin: 0 }}>
        Set <code>globalDuration</code> and <code>globalDismissOnClick</code> controls to see how global defaults apply when no per-toast options are provided.
      </p>
      <Toast theme={args.theme} showLoadingBar={args.showLoadingBar} pauseOnHover={args.pauseOnHover} position={args.position} draggable={args.draggable} stacked={args.stacked} duration={args.globalDuration} dismissOnClick={args.globalDismissOnClick} />
    </div>
  ),
};
