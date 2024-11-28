import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as GRAPHQL_SCHEMA from '../db/schema';
import { ToDoDto, UpdateToDoDto } from './dto/todo.dto';
import { and, eq, sql } from 'drizzle-orm';
import { SequenceTable } from 'src/helpers/enum/sequence.enum';
import { todos } from '../db/schema';

@Injectable()
export class TodoService {
  constructor(
    @Inject('GRAPHQL') private ms: PostgresJsDatabase<typeof GRAPHQL_SCHEMA>,
  ) {}

  async userTodos(userId: number) {
    const todos = await this.ms
      .select()
      .from(GRAPHQL_SCHEMA.todos)
      .where(eq(GRAPHQL_SCHEMA.todos.user_id, userId));

    if (todos.length <= 0) {
      throw new NotFoundException('Todos not found');
    }

    return todos;
  }

  async createTodo(todoDto: ToDoDto, userId: number) {
    const todo = await this.ms
      .insert(todos)
      .values({
        id: sql`nextval(${SequenceTable.TODOS})`,
        title: todoDto.title,
        content: todoDto.content,
        user_id: userId,
        created_at: new Date().toISOString(),
      })
      .returning();

    return todo[0];
  }

  async updateTodo(updateToDoDto: UpdateToDoDto, userId: number, id: number) {
    const todo = await this.ms.select().from(todos).where(eq(todos.id, id));

    if (todo.length <= 0) {
      throw new NotFoundException('Todo not found');
    }

    todo[0].title = updateToDoDto.title || todo[0].title;
    todo[0].content = updateToDoDto.content || todo[0].content;

    const updatedTodo = await this.ms
      .update(todos)
      .set({
        ...todo[0],
      })
      .where(and(eq(todos.id, id), eq(todos.user_id, userId)))
      .returning();

    return updatedTodo[0];
  }
}
