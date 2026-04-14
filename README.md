# Meta Reklam Panel 🚀

Meta Ads Management Dashboard with Antigravity integration for real-time campaign tracking.

> A professional, full-stack application for managing Meta (Facebook) advertising campaigns with real-time analytics and Antigravity integration.

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791)](https://www.postgresql.org/)

## 🎯 Features

- **Dashboard**: Real-time campaign overview and KPI metrics
- **Campaign Management**: Create, edit, and manage campaigns
- **Analytics**: Detailed performance metrics and insights
- **Real-time Updates**: WebSocket integration for live data
- **Antigravity Integration**: Advanced tracking and attribution
- **Multi-user Support**: User management and authentication
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Docker Ready**: Full Docker and Docker Compose support
- **CI/CD Pipeline**: GitHub Actions workflow automation

## 🏗️ Project Structure

```
Meta-reklam-panel/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── config/         # Database & Logger configuration
│   │   └── index.ts        # Main server file
│   ├── migrations/         # Database migrations
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── frontend/               # React.js client application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   └── App.tsx         # Main app component
│   ├── public/             # Static files
│   ├── package.json
│   └── Dockerfile
├── .github/workflows/      # CI/CD configurations
├── docker-compose.yml      # Docker Compose setup
├── .env.example            # Environment variables template
└── README.md               # This file
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL 15
- **Cache**: Redis
- **Real-time**: Socket.io
- **Logging**: Winston

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **HTTP Client**: Axios
- **State Management**: Zustand
- **Router**: React Router v6

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **CI/CD**: GitHub Actions
- **Linting**: ESLint
- **Testing**: Jest

## 📋 Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- Docker & Docker Compose ([Download](https://www.docker.com/))
- PostgreSQL 15+ (or use Docker)
- Redis (or use Docker)
- Git

## 🚀 Quick Start

### Option 1: Using Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/sinan722007-cell/Meta-reklam-panel.git
cd Meta-reklam-panel

# Copy environment variables
cp .env.example .env

# Start all services
docker-compose up -d

# Initialize database
docker-compose exec backend npm run db:migrate

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# API Docs: http://localhost:5000/api/docs
```

### Option 2: Local Development

```bash
# Install dependencies for both backend and frontend
npm run install-all

# Configure environment variables
cp .env.example .env
# Edit .env with your credentials

# Start PostgreSQL and Redis (using Docker)
docker-compose up postgres redis -d

# Start development servers
npm run dev

# Backend will run on: http://localhost:5000
# Frontend will run on: http://localhost:3000
```

## 📦 Available Scripts

### Root Directory
```bash
npm run install-all        # Install dependencies for all packages
npm run dev               # Start both backend and frontend in dev mode
npm run build             # Build both backend and frontend
npm run test              # Run tests for all packages
npm run lint              # Lint all packages
npm run docker:build      # Build Docker images
npm run docker:up         # Start Docker containers
npm run docker:down       # Stop Docker containers
```

### Backend
```bash
cd backend
npm run dev              # Start development server with hot reload
npm run build            # Build TypeScript to JavaScript
npm run start            # Run production build
npm run test             # Run tests
npm run lint             # Run ESLint
npm run lint:fix         # Fix linting issues
```

### Frontend
```bash
cd frontend
npm start                # Start development server
npm run build            # Build for production
npm test                 # Run tests
npm run lint             # Run ESLint
```

## 🗄️ Database Setup

The database schema is automatically created when you run the migrations. Current tables include:

- `users` - User accounts and Meta API tokens
- `campaigns` - Advertising campaigns
- `ad_sets` - Ad set configurations
- `ads` - Individual advertisements
- `analytics` - Daily performance metrics
- `api_logs` - API request logging

To manually run migrations:

```bash
docker-compose exec backend psql -U meta_panel_user -d meta_reklam_panel -f migrations/001_initial_schema.sql
```

## 🔑 Environment Variables

Create a `.env` file from `.env.example`:

```bash
# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/meta_reklam_panel

# Meta API
META_API_VERSION=v18.0
META_ACCESS_TOKEN=your_token_here
META_BUSINESS_ACCOUNT_ID=your_account_id

# Antigravity
ANTIGRAVITY_API_KEY=your_key_here
ANTIGRAVITY_API_URL=https://api.antigravity.dev

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d

# Redis
REDIS_URL=redis://localhost:6379
```

## 🔐 API Endpoints

### Public Endpoints
- `GET /api/health` - Health check

### Authentication Required
- `GET /api/campaigns` - List all campaigns
- `POST /api/campaigns` - Create new campaign
- `GET /api/campaigns/:id` - Get campaign details
- `PUT /api/campaigns/:id` - Update campaign
- `DELETE /api/campaigns/:id` - Delete campaign
- `GET /api/analytics` - Get analytics data

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test -- --coverage

# Watch mode
npm run test -- --watch
```

## 📊 CI/CD Pipeline

This project uses GitHub Actions for automated testing and deployment:

1. **Backend CI** (`.github/workflows/backend-ci.yml`)
   - Runs on push to main/develop and PRs
   - Installs dependencies
   - Runs ESLint
   - Runs unit tests
   - Builds Docker image

2. **Frontend CI** (`.github/workflows/frontend-ci.yml`)
   - Runs on push to main/develop and PRs
   - Installs dependencies
   - Runs ESLint
   - Builds for production
   - Builds Docker image

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Development Guidelines
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sinan** - [@sinan722007-cell](https://github.com/sinan722007-cell)

## 📞 Support

For support, email support@metapanel.dev or open an [issue](https://github.com/sinan722007-cell/Meta-reklam-panel/issues).

## 🗺️ Roadmap

- [ ] Advanced segmentation tools
- [ ] A/B testing framework
- [ ] Custom reporting export (PDF, CSV)
- [ ] Mobile app (React Native)
- [ ] Machine learning-based optimization
- [ ] Multi-account management
- [ ] API rate limiting and monitoring
- [ ] Webhook integrations

## 🙋 FAQ

**Q: Can I use this without Docker?**
A: Yes, see Option 2 in Quick Start section.

**Q: What's the minimum Node.js version?**
A: Node.js 18 or higher is required.

**Q: How do I connect my Meta account?**
A: Add your token to the `.env` file and authenticate through the Settings page.

---

**Made with ❤️ by Sinan**
