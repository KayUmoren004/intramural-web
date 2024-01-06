import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
  NO_GROUP,
  createAction,
  ActionId,
  ActionImpl,
} from "kbar";
import Results from "./Results";
import { FiHome } from "react-icons/fi";

type KbarProps = {
  children: React.ReactNode;
};

const searchStyle = {
  padding: "12px 16px",
  fontSize: "16px",
  width: "100%",
  boxSizing: "border-box" as React.CSSProperties["boxSizing"],
  outline: "none",
  border: "none",
  background: "var(--background)",
  color: "var(--foreground)",
};

const animatorStyle = {
  maxWidth: "600px",
  width: "100%",
  background: "var(--background)",
  color: "var(--foreground)",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "var(--shadow)",
};

const Kbar = ({ children }: KbarProps) => {
  return (
    <KBarProvider
      options={{
        enableHistory: true,
      }}
      actions={actions}
    >
      <KBarPortal>
        <KBarPositioner>
          <KBarAnimator style={animatorStyle}>
            <KBarSearch style={searchStyle} />
            <Results />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
};

const actions = [
  {
    id: "homeAction",
    name: "Home",
    shortcut: ["h"],
    keywords: "back",
    section: "Navigation",
    perform: () => (window.location.pathname = "/"),
    icon: <FiHome />,
    subtitle: "Subtitles can help add more context.",
  },
  {
    id: "docsAction",
    name: "Docs",
    shortcut: ["g", "d"],
    keywords: "help",
    section: "Navigation",
    perform: () => window.open("/docs", "_blank"),
  },
  {
    id: "contactAction",
    name: "Contact",
    shortcut: ["c"],
    keywords: "email hello",
    section: "Navigation",
    perform: () => window.open("mailto:timchang@hey.com", "_blank"),
  },
  {
    id: "twitterAction",
    name: "Twitter",
    shortcut: ["g", "t"],
    keywords: "social contact dm",
    section: "Navigation",
    perform: () => window.open("https://twitter.com/timcchang", "_blank"),
  },
  createAction({
    name: "Github",
    shortcut: ["g", "h"],
    keywords: "sourcecode",
    section: "Navigation",
    perform: () => window.open("https://github.com/timc1/kbar", "_blank"),
  }),
];

export default Kbar;
