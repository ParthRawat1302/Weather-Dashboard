import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import { User } from '@shared/types';

export interface TokenPayload {
  userId: string;
  email: string;
}

export class TokenService {
  private accessSecret: Secret;
  private refreshSecret: Secret;
  private accessExpires: string;
  private refreshExpires: string;

  constructor() {
    this.accessSecret = process.env.JWT_ACCESS_SECRET as Secret;
    this.refreshSecret = process.env.JWT_REFRESH_SECRET as Secret;
    this.accessExpires = process.env.JWT_ACCESS_EXPIRES || '15m';
    this.refreshExpires = process.env.JWT_REFRESH_EXPIRES || '7d';
  }

  generateAccessToken(user: User): string {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
    };

    const options: SignOptions = {
      expiresIn: this.accessExpires as `${number}${'s' | 'm' | 'h' | 'd'}`,
      issuer: 'weather-app',
      audience: 'weather-app-client',
    };

    return jwt.sign(payload, this.accessSecret, options);
  }

  generateRefreshToken(user: User): string {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
    };

    const options: SignOptions = {
      expiresIn: this.refreshExpires as `${number}${'s' | 'm' | 'h' | 'd'}`,
      issuer: 'weather-app',
      audience: 'weather-app-client',
    };

    return jwt.sign(payload, this.refreshSecret, options);
  }

  verifyAccessToken(token: string): TokenPayload {
    return jwt.verify(token, this.accessSecret, {
      issuer: 'weather-app',
      audience: 'weather-app-client',
    }) as TokenPayload;
  }

  verifyRefreshToken(token: string): TokenPayload {
    return jwt.verify(token, this.refreshSecret, {
      issuer: 'weather-app',
      audience: 'weather-app-client',
    }) as TokenPayload;
  }
}

export const tokenService = new TokenService();
