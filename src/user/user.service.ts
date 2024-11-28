import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { users } from '../db/schema';
import { UserDto } from './dto/user.dto';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as GRAPHQL_SCHEMA from '../db/schema';
import { SequenceTable } from 'src/helpers/enum/sequence.enum';
import { sql, eq } from 'drizzle-orm';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('GRAPHQL') private ms: PostgresJsDatabase<typeof GRAPHQL_SCHEMA>,
    private readonly authService: AuthService,
  ) {}

  async findAllUsers() {
    const users = await this.ms.query.users.findMany();

    if (users.length <= 0) {
      throw new NotFoundException('Users not found');
    }

    return users;
  }

  async findUserById(id: number) {
    const user = await this.ms.select().from(users).where(eq(users.id, id));

    if (!user) {
      throw new NotFoundException('User Not Found.');
    }

    return user[0];
  }

  async register(userDto: UserDto) {
    const existingUser = await this.ms
      .select()
      .from(GRAPHQL_SCHEMA.users)
      .where(eq(GRAPHQL_SCHEMA.users.email, userDto.email));

    if (existingUser.length > 0) {
      throw new Error('User already exists');
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    const user = await this.ms
      .insert(users)
      .values({
        id: sql`nextval(${SequenceTable.USERS})`,
        name: userDto.name,
        email: userDto.email,
        password: hashedPassword,
        created_at: new Date().toISOString(),
      })
      .returning();

    return user[0];
  }

  async login(loginDto: LoginDto) {
    const email = loginDto.email;
    const password = loginDto.password;

    const user = await this.ms
      .select()
      .from(GRAPHQL_SCHEMA.users)
      .where(eq(GRAPHQL_SCHEMA.users.email, email));

    if (!user) {
      throw new Error('User not Found.');
    }

    // Compare the password with the hash stored in DB
    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      throw new Error('Password not Match.');
    }

    const payload = {
      sub: user[0].id,
      email: user[0].email,
    };

    const token = await this.authService.generateToken(payload);

    return {
      access_token: token.access_token,
    };
  }
}
