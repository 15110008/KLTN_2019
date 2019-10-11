export const PORT = process.env.PORT || 3000;

// salt
export const SALT_WORK_FACTOR = 10;

// jwt
export const JWT_SECRET = 'xxxx_333_111_xxx33300';

export const JWT_OPTIONS = {
  expiresIn: '10 days',
  audience: 'fb.com/LouisNg.Dev',
  issuer: 'ntluan15061997@gmail.com',
};
