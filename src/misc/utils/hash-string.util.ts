const crypto = require('crypto');

export const hashStringUtil = (input: string): string => {
  return crypto.createHash('sha256').update(input).digest('hex');
};
