# Architecture of `src`

Rule applied:

- Only **folders** inside `src` are shown.
- Exception: in `app` **everything** is shown (folders and files).
- Also, the new structural files you created in `styles` and `hooks` are included.

```sh
src/
├── app/                      # Expo Router app structure
│   ├── _layout.tsx           # Root app layout
│   ├── index.tsx             # App entry screen
│   └── (tabs)/               # Tabs navigation (screens)
│       ├── _layout.tsx       # Tabs layout container
│       ├── index.tsx         # Default tab screen
│       ├── message/          # Message tab
│       │   └── index.tsx     # Message screen
│       ├── plus/             # Plus tab
│       │   └── index.tsx     # Plus screen
│       ├── user/             # User/profile tab
│       │   └── index.tsx     # User screen
│       └── wallet/           # Wallet tab
│           └── index.tsx     # Wallet screen
├── assets/
├── components/               # Reusable UI components
│   ├── errors/               # Error-related components
│   ├── icons/                # Icon components
│   └── ui/                   # Shared UI primitives
├── configs/                  # App configuration
│   ├── navigation/           # Navigation setup
│   └── styles/               # Global styles and theme
│       ├── global.css        # Global style imports (Tailwind + Uniwind)
│       ├── styles.ts         # Central styles file
│       └── theme/            # Theme tokens by mode
│           ├── dark.ts       # Dark theme colors
│           └── light.ts      # Light theme colors
├── constants/                # Global constants
├── hooks/                    # Custom React hooks
│   ├── hooks.ts              # Central hooks file
│   └── theme/
│       └── use-theme.ts      # Theme hook
└── services/                 # Service layer
    ├── ai/                   # AI-related services
    └── backend/              # Backend integrations
        ├── cloud/            # Cloud backend providers
        └── local/            # Local backend providers
```
