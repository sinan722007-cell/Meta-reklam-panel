import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import logger from './config/logger';
import { connectDatabase } from './config/database';

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes will be added here
app.get('/api/campaigns', (req: Request, res: Response) => {
  res.json({ message: 'Campaigns endpoint' });
});

app.get('/api/analytics', (req: Request, res: Response) => {
  res.json({ message: 'Analytics endpoint' });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Socket.IO real-time updates
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);

  socket.on('subscribe_campaign', (campaignId) => {
    socket.join(`campaign_${campaignId}`);
  });

  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
});

// Export io for use in routes
export { io };

const PORT = process.env.PORT || 5000;

// Start server
async function start() {
  try {
    await connectDatabase();
    logger.info('Database connected');

    httpServer.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
