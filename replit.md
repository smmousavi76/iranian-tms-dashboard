# Iranian Treasury Management System (TMS)

## Overview

This is an enterprise-grade Treasury Management System designed for Iranian financial operations. The application provides real-time liquidity monitoring, cash flow forecasting, and multi-bank account management with comprehensive financial reporting capabilities. Built as a full-stack web application, it features a React-based frontend with RTL (Right-to-Left) support for Persian language, a Node.js/Express backend, and AI-powered financial analysis capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast HMR and optimized production builds
- **Wouter** for lightweight client-side routing (alternative to React Router)

**UI Component System**
- **shadcn/ui** design system with Radix UI primitives for accessible, composable components
- **Tailwind CSS** for utility-first styling with custom design tokens
- **RTL-first design** with mandatory `dir="rtl"` for Persian language support
- **Vazirmatn font** loaded from CDN for proper Persian typography

**State Management**
- **React Context API** for global currency mode (Rial/Toman) state management
- **TanStack Query (React Query)** for server state management, caching, and data fetching
- Local component state with React hooks for UI interactions

**Data Visualization**
- **Recharts** library for rendering financial charts (area charts, line charts)
- Custom chart components for cash flow forecasts with actual vs. predicted data visualization
- Support for confidence intervals in forecast displays

**Styling Architecture**
- CSS custom properties (CSS variables) for theme values (light/dark mode support)
- Professional color palette: Slate and Blue/Indigo tones for enterprise fintech aesthetic
- Responsive design with mobile-first breakpoints
- Dark theme support with localStorage persistence

### Backend Architecture

**Server Framework**
- **Express.js** REST API server with TypeScript
- **HTTP server** created with Node's built-in `http` module for WebSocket upgrade support
- Middleware stack: JSON body parsing, URL encoding, request logging

**API Design**
- RESTful endpoints for financial data operations
- `/api/chat` endpoint for AI-powered financial analysis using OpenAI integration
- Custom request/response logging middleware for debugging

**AI Integration**
- **OpenAI API** integration through Replit's AI Integrations service
- GPT-4o-mini model for conversational financial analysis
- Context-aware responses using current financial data (balances, forecasts, transactions)

**Build & Deployment**
- **esbuild** for server-side bundling with selective dependency bundling
- Production build outputs to `dist/` directory
- Static file serving for client assets in production
- Development mode with Vite middleware integration

### Data Storage Solutions

**Database System**
- **PostgreSQL** as the primary relational database
- **Drizzle ORM** for type-safe database queries and schema management
- Schema definition in TypeScript with Zod validation integration

**Current Schema**
- `users` table with UUID primary keys, username/password authentication
- Database migrations managed through `drizzle-kit` in `migrations/` directory
- Connection via `DATABASE_URL` environment variable

**Development Storage**
- In-memory storage implementation (`MemStorage`) for development/testing
- User management with CRUD operations through storage interface abstraction

**Mock Data Architecture** (Prototype Phase)
- TypeScript interfaces for BankAccount, Transaction, ForecastDataPoint entities
- Mock data in `client/src/data/mockData.ts` with realistic corporate treasury values
- Billions in account balances to simulate enterprise-scale operations
- Currency conversion logic (Rial ÷ 10 = Toman) applied at display layer

### Authentication & Authorization

**Current Implementation**
- Basic user schema with username/password fields
- Password storage (to be hashed in production implementation)
- Session management infrastructure prepared (connect-pg-simple for PostgreSQL sessions)

**Planned Authentication**
- Passport.js integration dependencies installed for future implementation
- JWT (jsonwebtoken) available for token-based auth
- Express-session with PostgreSQL session store for server-side sessions

### External Dependencies

**Third-Party Services**
- **Replit AI Integrations** - Provides OpenAI-compatible API access without requiring separate API keys
- OpenAI API (GPT-4o-mini) for financial analysis chatbot functionality

**Key NPM Packages**
- **UI Framework**: @radix-ui/* components (20+ component primitives)
- **Forms**: @hookform/resolvers, react-hook-form
- **Data Fetching**: @tanstack/react-query
- **Charts**: recharts, embla-carousel-react
- **Styling**: tailwindcss, autoprefixer, class-variance-authority, clsx
- **Date Handling**: date-fns (Jalali calendar implied by business requirements)
- **Validation**: zod, zod-validation-error
- **Database**: drizzle-orm, drizzle-zod, pg

**Development Tools**
- **TypeScript** compiler with strict mode enabled
- **Vite** plugins: @vitejs/plugin-react, Replit-specific development plugins
- **Build Tools**: tsx for TypeScript execution, esbuild for production bundling

**Design System Configuration**
- shadcn/ui configured with "new-york" style variant
- Component aliases configured for clean imports (@/components, @/lib, @/hooks)
- Tailwind configured with custom border radius, color system, and CSS variables

**Internationalization Considerations**
- RTL layout system throughout application
- Persian (Farsi) language support with proper typography
- Jalali calendar date formatting for Iranian business context
- Currency formatting with Rial/Toman conversion and thousand separators