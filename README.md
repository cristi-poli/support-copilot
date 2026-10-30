# Support Copilot

A full-stack customer support ticket management application built with Angular, TypeScript, Node.js, and Express.

The application allows users to submit customer support requests, automatically classify them using rule-based logic, assign a priority and suggested action, and manage the resulting support tickets.

## Features

- Submit customer support requests
- Automatic ticket categorization
- Priority assignment: LOW, MEDIUM, HIGH
- Suggested support actions
- Ticket status management
- Resolve tickets
- Filter tickets by status
- Load all tickets
- Clear all tickets
- Angular frontend connected to a REST API

## Technologies

### Frontend
- Angular
- TypeScript
- HTML
- CSS

### Backend
- Node.js
- Express
- TypeScript
- REST API
- JSON
- CORS

## Architecture

```text
User
  ↓
Angular Frontend
  ↓
HTTP / REST API
  ↓
Node.js + Express Backend
  ↓
Ticket classification and management
```

## API Endpoints

```text
POST   /analyze
GET    /tickets
PATCH  /tickets/:id/resolve
DELETE /tickets
```

## Running the Project

### Frontend

From the main project directory:

```bash
npm start
```

The Angular application runs at:

```text
http://localhost:4200
```

### Backend

Open another terminal:

```bash
cd backend
npx tsx server.ts
```

The backend runs at:

```text
http://localhost:3000
```

## Example

Input:

```text
I cannot login after changing my password.
```

Result:

```text
Category: Account Access
Priority: HIGH
Status: OPEN
Suggested Action: Verify the account and start the recovery process.
```

## What I Learned

This project helped me practice:

- Angular components and data binding
- TypeScript interfaces and methods
- HTTP requests with Angular HttpClient
- REST API development
- Node.js and Express
- Frontend-backend communication
- JSON data exchange
- Ticket state management
- Filtering data in Angular

## Future Improvements

- Persistent database storage
- User authentication
- Improved ticket dashboard
- Automated testing
- AI-based ticket classification
- LangChain integration