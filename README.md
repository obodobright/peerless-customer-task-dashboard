# Peerless Tasks Dashboard

A modern, responsive single-page application (SPA) built with React for managing customer tasks. This project demonstrates clean UI design, effective state management, API integration, and best practices in code organization.


## Tech Stack

- **React 18** - UI library with functional components and hooks
- **React Router** - Client-side routing
- **Styled Components** - CSS-in-JS styling solution
- **Context API** - State management
- **Axios** - HTTP client for API requests
- **Vite** - Fast build tool and development server
- **json-server** - Mock REST API server
- **Vitest** - Testing framework

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd customer-tasks-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

The application requires two servers to run:

1. **Start the mock API server** (in one terminal):
   ```bash
   npm run api
   ```
   This will start json-server on `http://localhost:3001`

2. **Start the React development server** (in another terminal):
   ```bash
   npm run dev
   ```
   This will start Vite on `http://localhost:3000` and automatically open in your browser.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run api` - Start the mock API server (json-server)
- `npm test` - Run tests
- `npm run test:ui` - Run tests with UI

## API Endpoints

The mock API server provides the following endpoints:

- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get a specific task
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

### Task Data Structure

```json
{
  "id": 1,
  "title": "Task title",
  "description": "Task description",
  "customerName": "Customer Name",
  "status": "pending" | "in-progress" | "completed",
  "priority": "low" | "medium" | "high",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```
## Testing

The project includes test setup with Vitest and React Testing Library. Example tests are provided for components.

Run tests with:
```bash
npm test
```

