import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const authorizationHeader = ctx.req.headers.authorization;

    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      try {
        const user = jwt.verify(token, 'test');
        ctx.user = user;
        return true;
      } catch (err) {
        throw new HttpException(
          'Invalid Token : ' + err.message,
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
  }
}
