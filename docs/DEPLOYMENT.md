# Deployment Guide

## Docker Deployment

### Building Images

```bash
# Build all images
docker-compose build

# Build specific service
docker-compose build backend
docker-compose build frontend
```

### Running Containers

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Environment Variables

Create `.env` file with production values:

```bash
# Server
PORT=5000
NODE_ENV=production
CLIENT_URL=https://yourdomain.com

# Database (use managed service)
DATABASE_URL=postgresql://user:pass@db.provider.com:5432/meta_reklam_panel

# Security
JWT_SECRET=your-secure-secret-key-min-32-chars
```

## Production Deployment

### Option 1: AWS EC2

```bash
# SSH into instance
ssh -i your-key.pem ubuntu@your-instance

# Clone repository
git clone https://github.com/sinan722007-cell/Meta-reklam-panel.git

# Install Docker
sudo apt update
sudo apt install docker.io docker-compose

# Build and run
docker-compose build
docker-compose up -d
```

### Option 2: Heroku

```bash
# Create Heroku app
heroku create your-app-name

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:standard-0

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret

# Deploy
git push heroku main
```

### Option 3: Kubernetes

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: meta-panel-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: meta-panel-backend
  template:
    metadata:
      labels:
        app: meta-panel-backend
    spec:
      containers:
      - name: backend
        image: meta-panel-backend:latest
        ports:
        - containerPort: 5000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: meta-panel-secrets
              key: database-url
```

Deploy with:
```bash
kubectl apply -f deployment.yaml
```

## Database Migrations

```bash
# Run migrations
npm run db:migrate

# Rollback migrations
npm run db:rollback
```

## SSL/HTTPS

### Using Nginx

```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location /api {
        proxy_pass http://localhost:5000;
    }

    location / {
        proxy_pass http://localhost:3000;
    }
}
```

### Using Let's Encrypt

```bash
sudo certbot certonly --standalone -d yourdomain.com
```

## Monitoring

### Logs

```bash
# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Export logs
docker-compose logs > logs.txt
```

### Health Checks

```bash
curl http://localhost:5000/api/health
```

### Metrics

Enable Prometheus monitoring (optional):
```bash
docker run -d -p 9090:9090 prom/prometheus
```

## Backup & Recovery

### Database Backup

```bash
# Backup
docker-compose exec postgres pg_dump -U meta_panel_user meta_reklam_panel > backup.sql

# Restore
docker-compose exec -T postgres psql -U meta_panel_user meta_reklam_panel < backup.sql
```

### Volume Backup

```bash
docker run --rm -v meta_reklam_panel_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres-backup.tar.gz /data
```

## Scaling

### Horizontal Scaling

```bash
# Scale backend
docker-compose up -d --scale backend=3

# Use load balancer (e.g., HAProxy)
```

### Database Optimization

- Enable connection pooling
- Add indexes on frequently queried columns
- Archive old analytics data

## Troubleshooting

### Container won't start
```bash
docker-compose logs backend
docker-compose ps
```

### Database connection issues
```bash
docker-compose exec postgres pg_isready
```

### Out of memory
```bash
docker stats
docker-compose down && docker system prune -a
```

---

For more help, see [API Documentation](API.md) or [README](../README.md)
