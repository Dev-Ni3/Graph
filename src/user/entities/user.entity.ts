import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ToDo } from '../../todo/entity/todo.entity';

@ObjectType()
export class User {
    @Field(() => ID)
    id: number

    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field(() => [ToDo])
    todo: ToDo[];
}
