import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

type PayloadType = {
  password: string,
  email: string,
};

const JWT_CONFIG: SignOptions = {
  algorithm: 'HS256',
};

const createToken = (payload: PayloadType): string => jwt.sign(payload, JWT_SECRET, JWT_CONFIG);

const verifyToken = (token: string): PayloadType => jwt.verify(token, JWT_SECRET) as PayloadType;

export { createToken, verifyToken, JWT_SECRET };