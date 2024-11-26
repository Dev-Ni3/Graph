import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TodoModule } from './todo/todo.module';
import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';
import { AuthModule } from './auth/auth.module';
import * as GRAPHQL_SCHEMA from './db/schema'
import 'dotenv/config';
console.log(process.env.DATABASE_URL);
@Module({
  imports: [
    DrizzlePostgresModule.registerAsync({
      tag: 'GRAPHQL',
      useFactory() {
        return {
          postgres: {
            url: process.env.DATABASE_URL,
          },
          config: {
            schema: { ...GRAPHQL_SCHEMA },
          },
        };
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    })
    , UserModule, TodoModule, AuthModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
