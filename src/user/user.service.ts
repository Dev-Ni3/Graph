import { Inject, Injectable } from '@nestjs/common';
import { users } from '../db/schema';
import { UserDto } from './dto/user.dto';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as GRAPHQL_SCHEMA from '../db/schema'
import { SequenceTable } from 'src/helpers/enum/sequence.enum';
import { sql } from 'drizzle-orm';

@Injectable()
export class UserService {

    constructor(@Inject('GRAPHQL') private ms: PostgresJsDatabase<typeof GRAPHQL_SCHEMA>) { }

    async findAll() {
        console.log('teststststts')
        return await this.ms.query.users.findMany()
    }

    async create(userDto: UserDto) {

        let user = await this.ms.insert(users).values({
            id: sql`nextval(${SequenceTable.USERS})`,
            name: userDto.name,
            email: userDto.email,
            password: userDto.password,
            created_at: new Date().toISOString()
        }).returning();

        return user[0];
    }
}
