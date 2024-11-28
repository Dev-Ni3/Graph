import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class ToDoDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  content: string;
}

@InputType()
export class UpdateToDoDto {
  @Field()
  @IsString()
  @IsOptional()
  title: string;

  @Field()
  @IsString()
  @IsOptional()
  content?: string;
}
