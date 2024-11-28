import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { ToDo } from './entity/todo.entity';
import { ToDoDto, UpdateToDoDto } from './dto/todo.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  // query to get user todos
  @Query(() => [ToDo])
  @UseGuards(JwtAuthGuard)
  async userTodos(@Context('user') user: any) {
    return this.todoService.userTodos(user.sub);
  }

  // Mutation to create a todo
  @Mutation(() => ToDo)
  @UseGuards(JwtAuthGuard)
  createTodo(@Context('user') user: any, @Args('todoDto') todoDto: ToDoDto) {
    return this.todoService.createTodo(todoDto, user.sub);
  }

  // Mutation to update a todo
  @Mutation(() => ToDo)
  @UseGuards(JwtAuthGuard)
  updateTodo(
    @Context('user') user: any,
    @Args('updatetodoDto') updatetodoDto: UpdateToDoDto,
    @Args('id') id: number,
  ) {
    return this.todoService.updateTodo(updatetodoDto, user.sub, id);
  }
}
