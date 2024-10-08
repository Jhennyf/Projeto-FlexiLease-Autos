import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (userId: number) => {
  const secretKey = process.env.JWT_SECRET as string;
  return jwt.sign({ id: userId }, secretKey, { expiresIn: '12h' });
};

export default generateToken;
