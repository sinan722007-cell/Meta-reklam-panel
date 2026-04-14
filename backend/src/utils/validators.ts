export interface ValidationRule {
  field: string;
  rules: string[];
  message?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Email validation
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

/**
 * Password validation - min 8 chars, 1 uppercase, 1 number
 */
export function isValidPassword(password: string): boolean {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
  );
}

/**
 * Username validation - 3-30 chars, alphanumeric + underscore
 */
export function isValidUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
  return usernameRegex.test(username);
}

/**
 * Campaign name validation
 */
export function isValidCampaignName(name: string): boolean {
  return name.length > 0 && name.length <= 255;
}

/**
 * Budget validation
 */
export function isValidBudget(budget: number): boolean {
  return budget > 0 && budget <= 1000000;
}

/**
 * Date validation
 */
export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Validate user registration
 */
export function validateUserRegistration(
  email: string,
  username: string,
  password: string
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!email || !isValidEmail(email)) {
    errors.push({
      field: 'email',
      message: 'Invalid email address',
    });
  }

  if (!username || !isValidUsername(username)) {
    errors.push({
      field: 'username',
      message: 'Username must be 3-30 characters, alphanumeric and underscore only',
    });
  }

  if (!password || !isValidPassword(password)) {
    errors.push({
      field: 'password',
      message: 'Password must be at least 8 characters with uppercase and number',
    });
  }

  return errors;
}

/**
 * Validate campaign creation
 */
export function validateCampaignCreation(data: any): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name || !isValidCampaignName(data.name)) {
    errors.push({
      field: 'name',
      message: 'Campaign name is required and must be less than 255 characters',
    });
  }

  if (!data.budget || !isValidBudget(data.budget)) {
    errors.push({
      field: 'budget',
      message: 'Budget must be between 1 and 1,000,000',
    });
  }

  if (data.start_date && !isValidDate(data.start_date)) {
    errors.push({
      field: 'start_date',
      message: 'Invalid start date',
    });
  }

  if (data.end_date && !isValidDate(data.end_date)) {
    errors.push({
      field: 'end_date',
      message: 'Invalid end date',
    });
  }

  if (data.start_date && data.end_date) {
    const start = new Date(data.start_date);
    const end = new Date(data.end_date);
    if (start >= end) {
      errors.push({
        field: 'end_date',
        message: 'End date must be after start date',
      });
    }
  }

  return errors;
}
