import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from './database';
import logger from './logger';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-min-32-chars';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

export interface JWTPayload {
  id: string;
  email: string;
}

/**
 * Hash password with bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
}

/**
 * Compare password with hash
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcryptjs.compare(password, hash);
}

/**
 * Generate JWT token
 */
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as JWTPayload;
  } catch (error) {
    logger.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Create new user
 */
export async function createUser(email: string, username: string, password: string) {
  try {
    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      `INSERT INTO users (email, username, password_hash) 
       VALUES ($1, $2, $3) 
       RETURNING id, email, username, created_at`,
      [email, username, hashedPassword]
    );

    return result.rows[0];
  } catch (error) {
    if ((error as any).code === '23505') {
      throw new Error('Email or username already exists');
    }
    throw error;
  }
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string) {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0] || null;
}

/**
 * Get user by ID
 */
export async function getUserById(id: string) {
  const result = await pool.query(
    'SELECT id, email, username, first_name, last_name, avatar_url, is_active, created_at FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}

/**
 * Update user Meta tokens
 */
export async function updateUserMetaTokens(
  userId: string,
  accessToken: string,
  businessAccountId: string
) {
  const result = await pool.query(
    `UPDATE users 
     SET meta_access_token = $1, meta_business_account_id = $2, updated_at = CURRENT_TIMESTAMP
     WHERE id = $3
     RETURNING id, email, username`,
    [accessToken, businessAccountId, userId]
  );
  return result.rows[0];
}
