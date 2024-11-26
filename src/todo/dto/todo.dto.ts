import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class ToDoDto{
    @Field()
    @IsString()
    @IsNotEmpty()
    title:string;

    @Field()
    @IsString()
    @IsNotEmpty()
    content:string;

    @Field()
    @IsNumber()
    @IsNotEmpty()
    user_id:number;
}