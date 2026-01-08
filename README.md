# Wall Preview

An interactive web application for previewing and configuring artwork on a virtual wall. Users can upload images, customize frame settings, position artworks, and view pricing information.

## Features

- **Image Upload**: Drag and drop or select up to 3 images
- **Artwork Configuration**: Customize size, frame style, effects, and borders
- **Interactive Wall Preview**: Drag and drop artworks to position them on a virtual wall
- **Real-time Pricing**: Calculate total price based on selected configurations
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Mobile-friendly**: Tab-based navigation for mobile screens

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Feature-Sliced Design (FSD)** - Architecture methodology
- **Shadcn/ui** - UI component library
- **Lucide React** - Icon library
- **ESLint + Prettier** - Code quality and formatting
- **Husky** - Git hooks

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)

If you don't have pnpm installed:

```bash
npm install -g pnpm
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Nikita1025/wall-preview.git
cd wall-preview
```

2. Install dependencies:

```bash
pnpm install
```

### Running the Project

#### Development Mode

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

#### Build for Production

Create a production build:

```bash
pnpm build
```

The built files will be in the `dist` directory.

#### Preview Production Build

Preview the production build locally:

```bash
pnpm preview
```

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors automatically
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

## Implementation Decisions

### Architecture: Feature-Sliced Design (FSD)

The project follows the **Feature-Sliced Design** methodology for scalable and maintainable code organization:

- **app/** - Application initialization and providers
- **pages/** - Page-level components (HomePage)
- **widgets/** - Complex UI blocks (Wall preview)
- **features/** - Business features (ImageUploader, Controls, PricingSummary)
- **entities/** - Business entities (currently unused)
- **shared/** - Reusable utilities, UI components, and styles

This structure ensures:

- Clear separation of concerns
- Predictable import rules (layers can only import from lower layers)
- Easy scalability and team collaboration
- Better code discoverability

### State Management

State is managed using React hooks (`useState`, `useCallback`) with business logic extracted into custom hooks:

- `useHomePage` - Main page state and handlers
- `useImageUploader` - Image upload logic
- `useWall` - Wall preview and drag handling
- `useArtworkFrame` - Individual artwork frame interactions

This approach keeps components clean and logic reusable.

### Styling: Tailwind CSS 4

- **Utility-first approach** for rapid UI development
- **CSS variables** for theming and design tokens
- **Responsive design** with mobile-first breakpoints
- **Custom theme colors** defined in `@theme` block

### Drag and Drop

Implemented using native Pointer Events API for:

- Better touch device support
- Smooth dragging without animation delays
- Performance optimization with `will-change` CSS property
- Boundary constraints to keep artworks within wall bounds

### Responsive Design

- **Mobile-first approach** with Tailwind breakpoints
- **Tab-based navigation** on mobile for Settings/Pricing
- **Flexible grid layout** that adapts to screen size
- **Touch-optimized** drag and drop interactions

### Code Quality

- **ESLint** with TypeScript and React rules
- **Prettier** for consistent code formatting
- **Husky** pre-commit hooks to ensure code quality
- **lint-staged** to run linters only on staged files

## Production Improvements

If this were to be deployed to production, here are the key improvements I would implement:

### Performance

1. **Image Optimization**
   - Implement image compression before upload
   - Use WebP format with fallbacks
   - Lazy loading for artwork images
   - Image CDN for serving optimized images

2. **Code Splitting**
   - Route-based code splitting
   - Lazy load heavy components (Wall preview)
   - Dynamic imports for features

3. **Memoization**
   - Use `React.memo` for expensive components
   - Optimize re-renders with `useMemo` and `useCallback`
   - Virtual scrolling if artwork list grows

4. **Bundle Optimization**
   - Tree shaking for unused code
   - Analyze bundle size with `vite-bundle-visualizer`
   - Optimize dependencies

### Backend Integration

1. **API Layer**
   - RESTful API for artwork management
   - Image upload to cloud storage (AWS S3, Cloudinary)
   - User authentication and authorization
   - Cart persistence in database

2. **State Management**
   - Consider Redux Toolkit or Zustand for complex state
   - Server state management with React Query
   - Optimistic updates for better UX

### User Experience

1. **Error Handling**
   - Comprehensive error boundaries
   - User-friendly error messages
   - Retry mechanisms for failed operations
   - Loading states and skeletons

2. **Accessibility**
   - ARIA labels and roles
   - Keyboard navigation support
   - Screen reader optimization
   - Focus management

3. **Features**
   - Undo/redo functionality
   - Save/load configurations
   - Share wall preview via URL
   - Print preview functionality
   - Multiple wall templates

### Monitoring & Analytics

1. **Error Tracking**
   - Sentry or similar service
   - Error logging and alerting

2. **Analytics**
   - User behavior tracking
   - Performance monitoring
   - Conversion tracking

3. **Performance Monitoring**
   - Web Vitals tracking
   - Real User Monitoring (RUM)

### DevOps

1. **CI/CD Pipeline**
   - Automated testing on PR
   - Automated deployments
   - Environment management

2. **Infrastructure**
   - Docker containerization
   - Kubernetes orchestration (if needed)
   - CDN for static assets

3. **Documentation**
   - API documentation
   - Component Storybook

## Project Structure

```
src/
├── app/                    # App initialization
│   ├── index.tsx          # Entry point
│   └── providers.tsx      # App providers
├── pages/                  # Pages
│   └── home/
│       ├── ui/            # HomePage component
│       ├── model/         # useHomePage hook
│       └── lib/           # Constants
├── widgets/                # Complex UI blocks
│   └── wall-preview/
│       ├── ui/            # Wall, ArtworkFrame
│       ├── model/         # useWall, useArtworkFrame
│       └── lib/           # Utility functions
├── features/               # Business features
│   ├── image-uploader/    # Image upload feature
│   ├── artwork-config/    # Artwork configuration
│   └── cart/              # Pricing and cart
└── shared/                 # Shared code
    ├── ui/                # Reusable UI components
    ├── lib/               # Utilities, types
    └── index.css          # Global styles
```
