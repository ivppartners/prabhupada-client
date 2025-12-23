# Prabhupada.lt Client - AI Coding Instructions

## Project Overview
React audio player application for browsing and playing Lithuanian spiritual audio content (lectures, bhajans, kirtans). Vite-based SPA with React Router and custom state management.

## Architecture

### State Management Pattern
- **Custom Context-based state** in `StateContext.jsx` - NOT Redux/Zustand
- Uses Lithuanian action names: `gautasSarasas` (list received), `gautasIrasas` (item received)
- Two contexts: `StateContext` (state) and `DispatchContext` (dispatch)
- Import as: `import { useState, useDispatch } from "../StateContext"`
- Global state: `{ list: [], isLoaded: false, item: {} }`

### Routing Structure
```
/ → /lectures (default)
/lectures → Audio lectures listing
/bhajans → Bhajans listing
/kirtans → Kirtans listing  
/play/:id → Audio player view with track
```

All route components (`lectures.jsx`, `bhajans.jsx`, `kirtans.jsx`) follow identical pattern with different content types.

### Data Flow
1. Route component calls `getAudio()` on mount
2. Data fetched from REST API via axios (`dataService.js`)
3. Dispatch action `gautasSarasas` to populate global state
4. Components render from `list` in state
5. Audio player component receives track list + current ID via props

## Key Conventions

### Language
- **UI text and comments in Lithuanian** - this is intentional, not to be "fixed"
- Variable names use Lithuanian: `pavadinimas` (title), `dydis` (size), `vieta` (place)
- Keep this convention when adding features

### Environment Configuration
- Uses `.env.development` and `.env.production` files
- API URL: `REACT_APP_SERVER_PATH` (note: uses legacy CRA naming despite Vite)
- Vite config manually injects `process.env` for compatibility
- Dev server runs on port **3301** (non-standard)

### Component Patterns
- Layout wrapper (`layout.jsx`) provides navbar + hamburger menu
- All route components wrap content in `<Layout>`
- Data fetching in `useEffect` with empty deps array
- No loading states during initial render - components check `list.length`

## Critical Files

- `src/StateContext.jsx` - Global state reducer (Lithuanian action names)
- `src/dataService.js` - All API calls, axios config, file download logic
- `src/components/AudioPlayer.jsx` - Manages playback state, refs for audio element
- `vite.config.js` - Custom env var injection for `process.env` compatibility

## Development Workflow

```bash
npm run dev        # Dev server on localhost:3301
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # ESLint check
```

### API Integration
- Backend expected at `localhost:4001/api/` (dev) or `api.prabhupada.lt` (prod)
- Endpoints: `GET /api/` (list), `GET /api/:id` (item), `GET /api/play/:id` (playback), `GET /api/download/:id` (download)
- No auth/tokens currently implemented

### Audio Player Specifics
- Random thumbnail selection from `images.js` on each track load
- Uses `useRef` for `audioRef` and `progressBarRef` - don't convert to state
- Track navigation: handles next/previous with wrap-around
- Component hierarchy: AudioPlayer → DisplayTrack + Controls + ProgressBar

## Common Tasks

**Adding a new route:**
1. Create component in `src/routes/`
2. Import in `main.jsx` and add to `createBrowserRouter` array
3. Add nav link in `layout.jsx` menu-items
4. Follow existing pattern: use Layout wrapper, fetch with `getAudio()`, dispatch `gautasSarasas`

**Modifying API calls:**
- All changes go in `dataService.js`
- API base URL comes from `process.env.REACT_APP_SERVER_PATH`
- Download function uses `file-saver` library with blob response type

**State changes:**
- Add new action types in `reducer()` function in `StateContext.jsx`
- Follow naming pattern: Lithuanian verbs (e.g., `gautas` = received)
- Return new state object with spread operator

## Dependencies Notes
- Bootstrap 5 for styling (imported globally in `main.jsx`)
- dayjs for date formatting (not moment.js)
- react-icons for icon components
- React Router DOM v7 (uses `createBrowserRouter` not older patterns)
- React 19 (latest major version)
