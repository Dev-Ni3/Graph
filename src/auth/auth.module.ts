// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';

@Module({
  imports: [JwtModule],
  providers: [AuthService, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
