import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ToDo {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  user_id: string;

  @Field()
  created_at: string;
}
