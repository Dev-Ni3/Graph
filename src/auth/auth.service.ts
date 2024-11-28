// src/auth/auth.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as GRAPHQL_SCHEMA from '../db/schema';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('GRAPHQL') private ms: PostgresJsDatabase<typeof GRAPHQL_SCHEMA>,
  ) {}

  // Simulate user authentication (replace with actual DB logic)
  async validateUser(email: string, password: string) {
    const user = await this.ms
      .select()
      .from(GRAPHQL_SCHEMA.users)
      .where(eq(GRAPHQL_SCHEMA.users.email, email));

    if (user && (await bcrypt.compare(password, user[0].password))) {
      return user;
    }
    return null;
  }

  async generateToken(payload: any) {
    return {
      access_token: jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }),
    };
  }
}
