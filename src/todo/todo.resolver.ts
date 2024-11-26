import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { ToDo } from './entity/todo.entity';
import { ToDoDto } from './dto/todo.dto';

@Resolver()
export class TodoResolver {

    constructor(private readonly todoService: TodoService) { }

    @Query(() => [ToDo])
    async todosByUserId(@Args('userId') userId: number) {
        return this.todoService.todosByUserId(userId);
    }

    // Mutation to create a todo
    @Mutation(() => ToDo)
    createTodo(@Args('todoDto') todoDto: ToDoDto){
        return this.todoService.createTodo(todoDto);
    }
}
