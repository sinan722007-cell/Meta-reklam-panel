import { Router, Request, Response } from 'express';
import { authMiddleware, asyncHandler, AuthenticatedRequest } from '../middleware/auth';
import { AppError, errorHandler } from '../middleware/errorHandler';
import {
  createUser,
  getUserByEmail,
  getUserById,
  generateToken,
  comparePassword,
  updateUserMetaTokens,
} from '../config/auth';
import { validateUserRegistration } from '../utils/validators';
import logger from '../config/logger';

const router = Router();

/**
 * POST /api/auth/register
 * Register new user
 */
router.post(
  '/register',
  asyncHandler(async (req: Request, res: Response) => {
    const { email, username, password, confirmPassword } = req.body;

    // Validate inputs
    const errors = validateUserRegistration(email, username, password);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Check confirm password
    if (password !== confirmPassword) {
      return res.status(400).json({
        errors: [{ field: 'confirmPassword', message: 'Passwords do not match' }],
      });
    }

    // Create user
    const user = await createUser(email, username, password);

    // Generate token
    const token = generateToken({ id: user.id, email: user.email });

    logger.info(`User registered: ${user.email}`);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      token,
    });
  })
);

/**
 * POST /api/auth/login
 * Login user
 */
router.post(
  '/login',
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        errors: [{ field: 'email', message: 'Email and password are required' }],
      });
    }

    // Find user
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken({ id: user.id, email: user.email });

    logger.info(`User logged in: ${user.email}`);

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      token,
    });
  })
);

/**
 * GET /api/auth/me
 * Get current user
 */
router.get(
  '/me',
  authMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = await getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  })
);

/**
 * POST /api/auth/meta-connect
 * Connect Meta API credentials
 */
router.post(
  '/meta-connect',
  authMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { accessToken, businessAccountId } = req.body;

    if (!accessToken || !businessAccountId) {
      return res.status(400).json({
        errors: [{ field: 'general', message: 'Access token and business account ID are required' }],
      });
    }

    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = await updateUserMetaTokens(req.user.id, accessToken, businessAccountId);

    logger.info(`Meta account connected for user: ${user.email}`);

    res.json({
      message: 'Meta account connected successfully',
      user,
    });
  })
);

/**
 * POST /api/auth/logout
 * Logout user (client-side token deletion)
 */
router.post(
  '/logout',
  authMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    logger.info(`User logged out: ${req.user?.email}`);
    res.json({ message: 'Logged out successfully' });
  })
);

export default router;
