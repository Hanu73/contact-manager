export function getBaseHeaders(): Record<string, string> {
  return { 'Content-type': 'application/json' };
}

export const VALID_EMAIL_DOMAINS = ['inmar', 'test'];
export const EMAIL_REGEX =
  '^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+.)?[a-zA-Z]+.)?(inmar).com$';

export const SUCCESS_ALERT_CLASS = 'alert-success';
export const ERROR_ALERT_CLASS = 'alert-danger';
export const WARNING_ALERT_CLASS = 'alert-warning';
