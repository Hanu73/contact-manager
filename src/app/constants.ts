export function getBaseHeaders(): Record<string, string> {
  return { 'Content-type': 'application/json' };
}

export const VALID_EMAIL_DOMAINS = ['inmar'];
export const EMAIL_REGEX =
  '^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+.)?[a-zA-Z]+.)?(inmar).com$';

export const SUCCESS_ALERT_CLASS = 'alert-success';
export const ERROR_ALERT_CLASS = 'alert-danger';
export const WARNING_ALERT_CLASS = 'alert-warning';
export const VALID_AADHAAR_ID_LENGTH = 12;
export const VALID_PHONE_NUMBER_LENGTH = 10;
