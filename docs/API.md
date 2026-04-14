# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All endpoints (except `/health`) require a JWT token in the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Health Check
```
GET /health
```
Returns server status.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Campaigns

#### List Campaigns
```
GET /campaigns
```

**Query Parameters:**
- `page` (number) - Page number (default: 1)
- `limit` (number) - Records per page (default: 10)
- `status` (string) - Filter by status: DRAFT, ACTIVE, PAUSED, COMPLETED

**Response:**
```json
{
  "campaigns": [
    {
      "id": "uuid",
      "name": "Summer Sale",
      "status": "ACTIVE",
      "budget": 5000,
      "start_date": "2024-01-01",
      "end_date": "2024-01-31",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 10
}
```

#### Get Campaign Details
```
GET /campaigns/:id
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Summer Sale",
  "description": "Summer campaign",
  "status": "ACTIVE",
  "budget": 5000,
  "start_date": "2024-01-01",
  "end_date": "2024-01-31",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

#### Create Campaign
```
POST /campaigns
```

**Request Body:**
```json
{
  "name": "Summer Sale",
  "description": "Summer campaign",
  "budget": 5000,
  "start_date": "2024-01-01",
  "end_date": "2024-01-31"
}
```

#### Update Campaign
```
PUT /campaigns/:id
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "status": "PAUSED",
  "budget": 7000
}
```

#### Delete Campaign
```
DELETE /campaigns/:id
```

**Response:**
```json
{
  "message": "Campaign deleted successfully"
}
```

### Analytics

#### Get Campaign Analytics
```
GET /analytics?campaign_id=<id>&start_date=<date>&end_date=<date>
```

**Query Parameters:**
- `campaign_id` (string, required) - Campaign UUID
- `start_date` (string) - Start date (YYYY-MM-DD)
- `end_date` (string) - End date (YYYY-MM-DD)

**Response:**
```json
{
  "data": [
    {
      "date": "2024-01-15",
      "impressions": 10000,
      "clicks": 250,
      "conversions": 50,
      "spend": 500,
      "revenue": 1500,
      "ctr": 2.5,
      "cpc": 2.0,
      "roas": 3.0
    }
  ],
  "summary": {
    "total_impressions": 100000,
    "total_clicks": 2500,
    "total_conversions": 500,
    "total_spend": 5000,
    "total_revenue": 15000,
    "avg_ctr": 2.5,
    "avg_cpc": 2.0,
    "avg_roas": 3.0
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request",
  "details": "Campaign name is required"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 404 Not Found
```json
{
  "error": "Not found",
  "message": "Campaign not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Real-time Updates (WebSocket)

Connect to WebSocket at: `ws://localhost:5000`

### Subscribe to Campaign Updates
```javascript
socket.emit('subscribe_campaign', campaignId);
```

### Receive Updates
```javascript
socket.on('campaign_update', (data) => {
  console.log('Campaign updated:', data);
});

socket.on('analytics_update', (data) => {
  console.log('Analytics updated:', data);
});
```

## Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per user

## Pagination

Use `page` and `limit` query parameters:
```
GET /campaigns?page=2&limit=20
```

Default limit is 10, maximum is 100.

---

For more information, visit the [main README](README.md)
