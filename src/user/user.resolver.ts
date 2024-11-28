import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { Login } from './entities/login.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'findAllUsers' })
  @UseGuards(JwtAuthGuard)
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Query(() => User, { name: 'findUserById' })
  @UseGuards(JwtAuthGuard)
  findUserById(@Context('user') user: any) {
    return this.userService.findUserById(user.sub);
  }

  @Mutation(() => Login)
  async login(@Args('authDto') loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }

  @Mutation(() => User)
  async register(@Args('userDto') userDto: UserDto) {
    return this.userService.register(userDto);
  }
}
