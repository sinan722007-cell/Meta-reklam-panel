# Development Guide

## Project Structure

```
Meta-reklam-panel/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── routes/          # API routes (to be created)
│   │   ├── controllers/     # Route handlers (to be created)
│   │   ├── services/        # Business logic (to be created)
│   │   ├── models/          # Database models (to be created)
│   │   ├── middleware/      # Express middleware (to be created)
│   │   └── index.ts         # Entry point
│   ├── migrations/          # Database migrations
│   └── tests/               # Unit tests (to be created)
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API services
│   │   ├── store/           # Zustand store
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx          # Root component
│   └── tests/               # Component tests
└── docs/                    # Documentation
```

## Backend Development

### File Organization

```
backend/src/
├── config/
│   ├── database.ts          # Database connection
│   ├── logger.ts            # Logging setup
│   └── redis.ts             # Redis client
├── routes/
│   ├── campaigns.ts         # Campaign routes
│   ├── analytics.ts         # Analytics routes
│   └── auth.ts              # Auth routes
├── controllers/
│   ├── campaignController.ts
│   └── analyticsController.ts
├── services/
│   ├── campaignService.ts
│   └── analyticsService.ts
├── models/
│   ├── Campaign.ts
│   ├── User.ts
│   └── Analytics.ts
├── middleware/
│   ├── auth.ts              # JWT verification
│   └── errorHandler.ts      # Error handling
└── utils/
    ├── validators.ts        # Input validation
    └── formatters.ts        # Data formatting
```

### Adding a New Route

1. Create controller:
```typescript
// src/controllers/campaignController.ts
export async function getCampaigns(req: Request, res: Response) {
  const campaigns = await pool.query('SELECT * FROM campaigns');
  res.json(campaigns.rows);
}
```

2. Create route:
```typescript
// src/routes/campaigns.ts
router.get('/', getCampaigns);
```

3. Register route in index.ts:
```typescript
import campaignRoutes from './routes/campaigns';
app.use('/api/campaigns', campaignRoutes);
```

## Frontend Development

### Component Structure

```typescript
// src/components/CampaignCard.tsx
interface Props {
  campaign: Campaign;
}

const CampaignCard: React.FC<Props> = ({ campaign }) => {
  return (
    <div className="card">
      {/* Component JSX */}
    </div>
  );
};

export default CampaignCard;
```

### Using Hooks

```typescript
// Custom hook
function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  
  useEffect(() => {
    fetchCampaigns().then(setCampaigns);
  }, []);
  
  return campaigns;
}

// Usage
const Dashboard = () => {
  const campaigns = useCampaigns();
  return <div>{campaigns.map(...)}</div>;
};
```

### API Service

```typescript
// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const campaignService = {
  list: () => api.get('/campaigns'),
  get: (id: string) => api.get(`/campaigns/${id}`),
  create: (data: Campaign) => api.post('/campaigns', data),
  update: (id: string, data: Partial<Campaign>) => 
    api.put(`/campaigns/${id}`, data),
  delete: (id: string) => api.delete(`/campaigns/${id}`),
};
```

## Testing

### Backend Tests

```typescript
// backend/tests/campaigns.test.ts
import { pool } from '../src/config/database';

describe('Campaigns', () => {
  it('should list all campaigns', async () => {
    const result = await pool.query('SELECT * FROM campaigns');
    expect(result.rows).toBeDefined();
  });
});
```

### Frontend Tests

```typescript
// frontend/src/components/Dashboard.test.tsx
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

describe('Dashboard', () => {
  it('renders dashboard', () => {
    render(<Dashboard />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
```

## Common Development Tasks

### Add a Database Table

1. Create migration SQL file:
```sql
-- migrations/002_add_new_table.sql
CREATE TABLE new_feature (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

2. Run migration:
```bash
docker-compose exec backend npm run db:migrate
```

### Add a New API Endpoint

1. Update database schema if needed
2. Create controller function
3. Create route handler
4. Add to router
5. Test with curl or Postman
6. Add frontend API service
7. Create React component

### Create a New React Component

```bash
# Create component directory
mkdir src/components/NewComponent
touch src/components/NewComponent/index.tsx
touch src/components/NewComponent/NewComponent.css
```

### Debugging

Backend:
```bash
# Enable debug logging
DEBUG=* npm run dev

# VS Code debugging - add to .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach",
      "port": 9229
    }
  ]
}
```

Frontend:
```bash
# React DevTools browser extension
# Redux DevTools (if using Redux)
```

## Performance Tips

### Backend
- Use database indexes for commonly queried fields
- Implement caching with Redis
- Use pagination for large result sets
- Monitor query performance

### Frontend
- Code split with React.lazy()
- Implement virtual scrolling for large lists
- Use React.memo for expensive components
- Optimize images and assets

## Code Style

### TypeScript
- Use strict mode
- Define interfaces for all object types
- Avoid `any` type
- Use const and let, not var

### React
- Use functional components
- Custom hooks for shared logic
- Prop validation with TypeScript
- Meaningful component names

### Naming Conventions
- Files: kebab-case (user-profile.ts)
- Functions: camelCase (getUserData)
- Classes: PascalCase (UserService)
- Constants: UPPER_SNAKE_CASE (API_KEY)

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

Happy coding! 🚀
