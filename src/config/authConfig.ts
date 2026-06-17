const defaultAllowedDomains = ['doralacademynv.org', 'student.doralacademynv.org'];

const parseAllowedDomains = (rawValue: string | undefined): string[] => {
  const domains = (rawValue ?? '')
    .split(',')
    .map((domain) => domain.trim().toLowerCase())
    .filter(Boolean);

  return domains.length ? domains : defaultAllowedDomains;
};

export const allowedEmailDomains = parseAllowedDomains(import.meta.env.VITE_ALLOWED_EMAIL_DOMAINS);

export function isAllowedEmailDomain(email: string | null | undefined): boolean {
  if (!email) {
    return false;
  }

  const parts = email.trim().toLowerCase().split('@');

  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    return false;
  }

  return allowedEmailDomains.includes(parts[1]);
}
