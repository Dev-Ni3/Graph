import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class UserDto {
    @Field()
    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @Field()
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

    @Field()
    @IsString()
    @IsNotEmpty({ message: 'Password is Required.' })
    password: string;
}

