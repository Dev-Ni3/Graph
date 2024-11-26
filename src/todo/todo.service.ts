import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as GRAPHQL_SCHEMA from '../db/schema';
import { ToDoDto } from './dto/todo.dto';
import { eq, sql } from 'drizzle-orm';
import { SequenceTable } from 'src/helpers/enum/sequence.enum';
import { todos } from '../db/schema'

@Injectable()
export class TodoService {

    constructor(@Inject('GRAPHQL') private ms: PostgresJsDatabase<typeof GRAPHQL_SCHEMA>) { }

    async todosByUserId(userId: number) {
        return await this.ms.select().from(GRAPHQL_SCHEMA.todos).where(eq(GRAPHQL_SCHEMA.todos.user_id, userId));
    }


    async createTodo(todoDto: ToDoDto) {
        let todo = await this.ms.insert(todos).values({
            id: sql`nextval(${SequenceTable.TODOS})`,
            title: todoDto.title,
            content: todoDto.content,
            user_id: +todoDto.user_id,
            created_at: new Date().toISOString()
        }).returning()

        return todo[0];
    }

}
