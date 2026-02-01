# AI Development Rules for ConvoyageOS

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom color palette
- **UI Components**: shadcn/ui library (built on Radix UI primitives)
- **Icons**: lucide-react
- **State Management**: React built-in hooks (useState, useEffect, useContext)
- **Forms**: react-hook-form with Zod validation
- **Authentication**: Custom in-memory auth store (would use Supabase in production)
- **APIs**: Next.js API routes
- **Deployment**: Vercel

## Library Usage Rules

### UI & Styling
- Use **shadcn/ui** components whenever possible for consistent design
- Use **lucide-react** for all icons
- Use **Tailwind CSS** classes for all styling - never write custom CSS
- Follow the existing color palette defined in globals.css

### Forms & Validation
- Use **react-hook-form** for all form handling
- Use **Zod** for form validation schema
- Always implement proper client-side validation with visual feedback

### Data Management
- Use the existing **in-memory stores** (authStore, convoyageStore) for data persistence
- For new features requiring data storage, create new stores following the same pattern
- Always implement proper error handling for data operations

### Authentication & Authorization
- Use the existing **authStore** for user management
- Implement role-based access control using the "client" | "driver" | "admin" roles
- Always check user roles before rendering protected content

### API Integration
- Use **Next.js API routes** for all backend functionality
- Follow the existing API pattern with proper HTTP status codes
- Implement proper error handling and validation in API routes

### Components
- Create new components in the appropriate directory (ui, client, driver, admin, etc.)
- Keep components small and focused - create new files for new components
- Use TypeScript interfaces for component props
- Implement proper accessibility attributes

### Routing
- Use Next.js App Router conventions
- Implement route protection using the DashboardLayout component
- Follow the existing route structure pattern

### Error Handling
- Always implement proper error boundaries
- Show user-friendly error messages
- Log errors appropriately for debugging

### Performance
- Use React.memo for components that render lists
- Implement proper loading states with spinners
- Optimize images with Next.js Image component when needed
