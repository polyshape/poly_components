import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button, Panel } from "../src";
import type { PanelProps } from "../src/panel/Panel.js";

const DEFAULT_STYLES = {
  root: {},
  backdrop: {},
  container: {},
  panel: {},
  header: {},
  title: {},
  subtitle: {},
  content: {},
  footer: {},
  closeButton: {},
} as const;

const meta: Meta<typeof Panel> = {
  title: "Components/Panel",
  component: Panel,
  tags: ["autodocs"],
  args: {
    title: undefined,
    subtitle: undefined,
    width: 380,
    side: "right",
    useNativeScrollbars: undefined,
    closeOnBackdropClick: undefined,
    disableAnimation: undefined,
    unmountOnClose: undefined,
    trapFocus: undefined,
    modeless: undefined,
    isOpen: undefined,
    styles: DEFAULT_STYLES,
  },
  argTypes: {
    side: { control: "radio", options: ["right", "left"] },
    width: { control: "number" },
    closeOnBackdropClick: { control: "boolean" },
    disableAnimation: { control: "boolean" },
    unmountOnClose: { control: "boolean" },
    trapFocus: { control: "boolean" },
    modeless: { control: "boolean" },
    useNativeScrollbars: { control: "boolean" },
    isOpen: { control: "boolean", description: "Controls visibility when provided" },
    styles: { control: "object", description: "Per-part style overrides" },
    footer: { control: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof Panel>;

const DEFAULT_MODAL_CONTENT = `<p>This is the main content of the modal, that will be passed down on rendering</p>
<p>You can pass html elements here!</p>
<button onclick="alert('Hello world!')">Click Me!</button>
<pre>
This is a pre element
It preserves    spaces
and line breaks
</pre>
<p>Let's also add some long text</p>
<span>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. In imperdiet tortor consequat elit laoreet, et gravida orci vehicula. Donec tempor nunc tortor, non lobortis neque imperdiet quis. Etiam vel magna enim. Fusce id leo facilisis, commodo neque a, convallis libero. Quisque bibendum erat at risus interdum, vitae faucibus est molestie. Aenean ipsum enim, porttitor aliquet elementum non, sagittis blandit nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam lacinia diam mattis iaculis. Suspendisse potenti. Morbi gravida ut metus non sagittis. Cras posuere non lorem ut lobortis. Etiam justo felis, rhoncus vel metus quis, consectetur ultrices nunc.

Nullam mauris tortor, tempus eu elementum sed, vulputate eget lacus. Aliquam rutrum pharetra magna, at suscipit odio scelerisque id. Praesent mattis accumsan ipsum, sed cursus felis interdum in. Cras lacinia tristique vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pretium at odio eget accumsan. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc aliquam libero urna, at luctus tortor scelerisque at. Suspendisse gravida tortor nisi, vel finibus arcu pharetra a. Suspendisse potenti. Praesent molestie varius felis, ut condimentum quam mollis id.

Nunc facilisis interdum nulla nec vulputate. Integer purus arcu, porta vitae ultrices id, blandit eu risus. Nunc pharetra a urna et iaculis. Donec vestibulum sem non efficitur vehicula. Suspendisse non egestas ex. Vivamus malesuada gravida massa et vestibulum. Phasellus mauris enim, fringilla eu arcu a, molestie vestibulum tortor. Proin accumsan dapibus arcu, in pretium velit interdum ac. Curabitur lacus tellus, gravida non ligula a, ultricies facilisis justo. Donec sem turpis, consectetur vel risus vitae, sagittis rutrum dolor. Integer in lacus sapien. Integer quis lobortis urna, ut dictum nibh. Vestibulum vel nisl at tellus commodo tincidunt. Nunc finibus non eros vel accumsan.

Phasellus in viverra mauris. Pellentesque fringilla erat sit amet ex venenatis, vitae volutpat massa accumsan. Aliquam pharetra risus odio, at placerat ligula accumsan eget. Aliquam non massa magna. Vivamus malesuada tristique mauris vel consequat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean quis turpis libero.
</span>
<p>No need to keep it simple!</p>`;

function PanelRender(args: PanelProps) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<string>(DEFAULT_MODAL_CONTENT);
  const visible = typeof args.isOpen === "boolean" ? args.isOpen : open;
  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "grid", gap: 8, marginBottom: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>Panel content (HTML string):</span>
          <textarea
            value={content}
            wrap="off"
            spellCheck={false}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            style={{ width: "90%", fontFamily: "monospace", minHeight: "200px" }}
          />
        </label>
      </div>
      <Button appearance="primary" onClick={() => setOpen(true)}>Open</Button>
      {visible ? (
        <Panel
          {...args}
          isOpen={visible}
          onClose={() => setOpen(false)}
          footer={(
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <Button appearance="subtle" onClick={() => setOpen(false)}>Cancel</Button>
              <Button appearance="primary">Save</Button>
            </div>
          )}
        >
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Panel>
      ) : null}
    </div>
  );
}

export const Basic: Story = {
  args: {
    title: "Panel Title",
    subtitle: "Optional subtitle",
  },
  render: (args) => <PanelRender {...args} />,
};

function CustomCloseIconElementRender(args: PanelProps) {
  const [open, setOpen] = useState(false);
  const visible = typeof args.isOpen === "boolean" ? args.isOpen : open;
  return (
    <div style={{ padding: 16 }}>
      <Button appearance="primary" onClick={() => setOpen(true)}>Open</Button>
      {visible ? (
        <Panel
          {...args}
          isOpen={visible}
          onClose={() => setOpen(false)}
          closeIcon={(
            <svg
              width={18}
              height={18}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.9" />
              <path d="M15 9 L9 15 M9 9 L15 15" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
            </svg>
          )}
        >
          <p>Passing any React node as closeIcon works.</p>
        </Panel>
      ) : null}
    </div>
  );
}

export const CustomCloseIconElement: Story = {
  args: {
    title: "Custom close icon element",
  },
  render: (args) => <CustomCloseIconElementRender {...args} />,
};

function LifecycleCallbacksRender(args: PanelProps) {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState<string[]>([]);
  const visible = typeof args.isOpen === "boolean" ? args.isOpen : open;

  const push = (e: string) => setEvents((prev) => [e, ...prev].slice(0, 6));

  return (
    <div style={{ padding: 16, display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <Button appearance="primary" onClick={() => setOpen(true)}>Open</Button>
      </div>
      {visible ? (
        <Panel
          {...args}
          isOpen={visible}
          onClose={() => setOpen(false)}
          onAfterOpen={() => push("after-open")}
          onAfterClose={() => push("after-close")}
        >
          <p>Open/close the panel and watch events below.</p>
        </Panel>
      ) : null}
      <div style={{ fontSize: 12, color: "var(--pc-fg)", opacity: 0.9 }}>
        <strong>Events:</strong> {events.join(" , ") || "-"}
      </div>
    </div>
  );
}

export const LifecycleCallbacks: Story = {
  args: {
    title: "Lifecycle callbacks",
    subtitle: "onAfterOpen / onAfterClose",
  },
  render: (args) => <LifecycleCallbacksRender {...args} />,
};

function PersistingContent() {
  const [value, setValue] = useState("I persist while hidden");
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <label style={{ display: "grid", gap: 6 }}>
        <span>Input value (kept when unmountOnClose=false):</span>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
      </label>
      <div style={{ fontSize: 12, opacity: 0.85 }}>
        Current: <code>{value}</code>
      </div>
    </div>
  );
}

function KeepMountedStateRender(args: PanelProps) {
  const [open, setOpen] = useState(false);
  const visible = typeof args.isOpen === "boolean" ? args.isOpen : open;

  return (
    <div style={{ padding: 16, display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <Button appearance="primary" onClick={() => setOpen(true)}>Open</Button>
      </div>
      <Panel
        {...args}
        isOpen={visible}
        onClose={() => setOpen(false)}
        footer={<div style={{ fontSize: 12, opacity: 0.8 }}>Toggle unmountOnClose in Controls to see difference.</div>}
      >
        <PersistingContent />
      </Panel>
    </div>
  );
}

export const KeepMountedState: Story = {
  args: {
    title: "Keep mounted (preserve state)",
    unmountOnClose: false,
  },
  render: (args) => <KeepMountedStateRender {...args} />,
};

function ModelessRender(args: PanelProps) {
  const [open, setOpen] = useState(false);
  const [clicks, setClicks] = useState(0);
  const visible = typeof args.isOpen === "boolean" ? args.isOpen : open;
  return (
    <div style={{ padding: 16, display: "grid", gap: 12 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
        <Button appearance="primary" onClick={() => setOpen(true)}>Open</Button>
        <Button onClick={() => setClicks(c => c + 1)}>Background button ({clicks})</Button>
      </div>
      <Panel
        {...args}
        isOpen={visible}
        onClose={() => setOpen(false)}
        title={args.title ?? "Modeless Panel"}
        modeless
        footer={<div>Try clicking the background button while open.</div>}
      >
        <p>This panel does not dim or block the page.</p>
      </Panel>
    </div>
  );
}

export const Modeless: Story = {
  args: {
    title: "Modeless (no overlay)",
  },
  parameters: {
    controls: { exclude: ["closeOnBackdropClick", "trapFocus", "modeless"] },
  },
  render: (args) => <ModelessRender {...args} />,
};

function RequestCloseAndNestedRender(args: PanelProps) {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [blockBackdrop, setBlockBackdrop] = useState(false);
  const [blockEscape, setBlockEscape] = useState(false);
  const [blockButton, setBlockButton] = useState(false);

  const onRequestClose = (reason: "backdrop" | "escape" | "closeButton") => {
    if (reason === "backdrop" && blockBackdrop) return false;
    if (reason === "escape" && blockEscape) return false;
    if (reason === "closeButton" && blockButton) return false;
    return true;
  };

  return (
    <>
      <Button appearance="primary" onClick={() => setOpen1(true)}>Open Level 1</Button>
      <div style={{ padding: 16, display: "grid", gap: 12 }}>

        {open1 ? (
          <Panel
            {...args}
            width={600}
            title={args.title ?? "Level 1"}
            isOpen={open1}
            onClose={() => setOpen1(false)}
            onRequestClose={onRequestClose}
            footer={(
              <div style={{ display: "flex", gap: 8, justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <input type="checkbox" checked={blockBackdrop} onChange={(e) => setBlockBackdrop(e.target.checked)} />
                    Block backdrop
                  </label>
                  <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <input type="checkbox" checked={blockEscape} onChange={(e) => setBlockEscape(e.target.checked)} />
                    Block Esc
                  </label>
                  <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <input type="checkbox" checked={blockButton} onChange={(e) => setBlockButton(e.target.checked)} />
                    Block close button
                  </label>
                </div>
                <Button appearance="primary" onClick={() => setOpen2(true)}>Open Level 2</Button>
              </div>
            )}
          >
            <p>Level 1 content. Use the footer to open the next level or block requests.</p>
          </Panel>
        ) : null}

        {open2 ? (
          <Panel
            {...args}
            width={400}
            title="Level 2"
            isOpen={open2}
            onClose={() => setOpen2(false)}
            onRequestClose={onRequestClose}
            footer={<Button appearance="primary" onClick={() => setOpen3(true)}>Open Level 3</Button>}
          >
            <p>Level 2 content.</p>
          </Panel>
        ) : null}

        {open3 ? (
          <Panel
            {...args}
            width={200}
            title="Level 3"
            isOpen={open3}
            onClose={() => setOpen3(false)}
            onRequestClose={onRequestClose}
          >
            <p>Level 3 content.</p>
          </Panel>
        ) : null}
      </div>
    </>
  );
}

export const RequestCloseAndNested: Story = {
  args: {
    title: "Request close + nested",
  },
  parameters: {
    controls: { exclude: ["width"] },
  },
  render: (args) => <RequestCloseAndNestedRender {...args} />,
};
