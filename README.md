# Hermes

A full-stack AI chat application for a daily in hand AI model,combines a LangChain-powered AI agent (Gemini + Mistral) with real-time internet search (Tavily) to answer questions with up-to-date information. Built with a Node.js/Express backend and a React frontend.

## Features

- **AI Chat with Web Search** — An agent built with LangChain decides when to call a `searchInternet` tool (powered by Tavily) to fetch current information before answering.
- **Multi-model support** — Uses Google Gemini (`gemini-flash-latest`) and Mistral (`mistral-medium-latest`) via `@langchain/google-genai` and `@langchain/mistralai`.
- **Auto-generated chat titles** — Each new conversation gets a short, descriptive title generated from the first message.
- **Authentication** — Email/password registration and login with JWT-based sessions, plus email verification via Nodemailer (using Gmail OAuth credentials).
- **Real-time updates** — Socket.IO is wired up for live communication between client and server.
- **Chat history** — Create, list, view messages for, and delete chats, all scoped to the logged-in user.

## Tech Stack

**Backend**
- Node.js, Express 5
- MongoDB with Mongoose
- LangChain (`langchain`, `@langchain/google-genai`, `@langchain/mistralai`)
- Tavily (`@tavily/core`) for internet search
- Socket.IO
- JWT (`jsonwebtoken`) + `bcryptjs` for auth
- Nodemailer for transactional email
- `express-validator` / `zod` for validation

**Frontend**
- React 19 + Vite
- Redux Toolkit / React Redux
- React Router
- Tailwind CSS
- Axios
- Socket.IO client
- `react-markdown` + `remark-gfm` for rendering AI responses

## Project Structure

```
perplexity/
├── Backend/
│   ├── server.js                # Entry point (HTTP server + Socket.IO + DB connect)
│   └── src/
│       ├── app.js               # Express app & middleware setup
│       ├── config/database.js   # MongoDB connection
│       ├── controllers/         # auth & chat controllers
│       ├── middleware/          # auth middleware
│       ├── models/              # user, chat, message schemas
│       ├── routes/              # /api/auth, /api/chats
│       ├── services/            # ai.service (LangChain agent), internet.service (Tavily), mail.service
│       ├── sockets/              # Socket.IO server setup
│       └── validators/          # request validation
└── Frontend/
    └── src/
        ├── app/                  # App shell, routes, Redux store
        └── features/
            ├── auth/             # auth UI & state
            └── chat/             # chat UI & state
```

## API Overview

**Auth** (`/api/auth`)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | Log in and receive a JWT |
| GET | `/get-me` | Get the current logged-in user (protected) |
| GET | `/verify-email` | Verify a user's email via token |

**Chats** (`/api/chats`)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/message` | Send a message to the AI agent (protected) |
| GET | `/` | List the user's chats (protected) |
| GET | `/:chatId/messages` | Get messages for a chat (protected) |
| DELETE | `/delete/:chatId` | Delete a chat (protected) |

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB instance (local or Atlas)
- API keys for Google Gemini, Mistral, and Tavily
- Google OAuth credentials for sending verification emails

### 1. Clone and install

```bash
git clone https://github.com/Div641/Hermes.git
cd Backend/Hermes
```

**Backend:**
```bash
cd Backend
npm install
```

**Frontend:**
```bash
cd ../Frontend
npm install
```

### 2. Configure environment variables

Create a `.env` file inside `Backend/` with the following:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_google_gemini_api_key
MISTRAL_API_KEY=your_mistral_api_key
TAVILY_API_KEY=your_tavily_api_key

GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
GOOGLE_REFRESH_TOKEN=your_google_oauth_refresh_token
GOOGLE_USER=your_gmail_address
```

### 3. Run the app

**Backend** (runs on `http://localhost:8000` by default):
```bash
cd Backend
npm run dev
```

**Frontend** (runs on `http://localhost:5173` by default):
```bash
cd Frontend
npm run dev
```

The backend is configured to accept requests from `http://localhost:5173` with credentials enabled, so make sure both are running for local development.

## How the AI Agent Works

1. A user sends a message via `/api/chats/message`.
2. `ai.service.js` builds an agent (via LangChain's `createAgent`) using the Mistral model, equipped with a `searchInternet` tool.
3. If the question needs current information, the agent calls the `searchInternet` tool, which queries Tavily and returns the top results.
4. The agent synthesizes a final answer from the conversation history and (if used) search results.
5. A separate call generates a short, descriptive title for new chats based on the first message.

