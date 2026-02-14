# Arquitectura de `src`

Regla aplicada:

- Se muestran **solo carpetas** dentro de `src`.
- Excepción: en `app` se muestra **todo** (carpetas y archivos).

```text
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
├── assets/                   # Static assets
├── components/               # Reusable UI components
│   ├── errors/               # Error-related components
│   ├── icons/                # Icon components
│   └── ui/                   # Shared UI primitives
├── configs/                  # App configuration
│   ├── navigation/           # Navigation setup
│   └── styles/               # Global styles and theme
├── constants/                # Global constants
├── hooks/                    # Custom React hooks
└── services/                 # Service layer
    ├── ai/                   # AI-related services
    └── backend/              # Backend integrations
        ├── cloud/            # Cloud backend providers
        └── local/            # Local backend providers
```
