# OpenAI / Claude / DeepSeek API Provider Directory

## Overview

This is a full-stack web application that serves as a directory for third-party API providers offering OpenAI, Claude, and DeepSeek APIs. The application is built with a modern React frontend and Express.js backend, designed to help users discover and compare different API providers for learning and research purposes.

## System Architecture

The application follows a traditional client-server architecture with clear separation of concerns:

- **Frontend**: React-based SPA using Vite for bundling and development
- **Backend**: Express.js REST API server
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent UI
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing

## Key Components

### Frontend Architecture
- **Component-Based**: Uses shadcn/ui components for consistent design system
- **Internationalization**: Multi-language support with context-based language switching
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript implementation with shared types

### Backend Architecture
- **RESTful API**: Express.js server with structured route handling
- **Storage Abstraction**: Interface-based storage layer supporting both in-memory and database implementations
- **Type Safety**: Shared schema definitions between frontend and backend
- **Middleware**: Request logging and error handling middleware

### Database Schema
- **API Providers Table**: Stores information about third-party API providers including name, URL, tags, and metadata
- **Recommended Apps Table**: Contains curated applications that work with the API providers
- **Flexible Tagging**: JSON-based tag system for categorizing providers and apps

### UI Components
- **Providers Table**: Searchable and filterable table of API providers
- **Tags Legend**: Visual explanation of provider capabilities and features
- **Recommended Apps**: Grid layout showcasing compatible applications
- **Usage Guide**: Step-by-step instructions for using the APIs
- **Contribution Section**: Information for community contributions

## Data Flow

1. **Initial Load**: Client fetches API providers and recommended apps from REST endpoints
2. **Filtering**: Client-side filtering based on search terms and tag categories
3. **User Interactions**: Real-time UI updates with optimistic loading states
4. **Data Persistence**: All changes go through the backend API to ensure consistency

## External Dependencies

### Frontend Dependencies
- **React**: Core UI library with hooks-based architecture
- **TanStack Query**: Server state management and caching
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Consistent icon library

### Backend Dependencies
- **Express.js**: Web application framework
- **Drizzle ORM**: Type-safe database operations
- **Neon Database**: Serverless PostgreSQL provider
- **Zod**: Runtime type validation

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking
- **ESBuild**: Fast JavaScript bundler for production

## Deployment Strategy

The application is configured for deployment on Replit with the following setup:

- **Development**: `npm run dev` runs both frontend and backend in development mode
- **Build Process**: Vite builds the frontend, ESBuild bundles the backend
- **Production**: Serves static files through Express with API routes
- **Database**: Uses PostgreSQL module provided by Replit environment
- **Port Configuration**: Configured to run on port 5000 with external port 80

The build process creates optimized bundles for both client and server code, with the frontend assets served as static files by the Express server in production.

## Changelog

```
Changelog:
- June 27, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```